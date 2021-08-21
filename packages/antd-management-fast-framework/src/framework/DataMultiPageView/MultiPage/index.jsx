import React from 'react';
import { List, Spin, Tooltip, Button, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import {
  defaultPageListState,
  getValue,
  dateToMoment,
  stringIsNullOrWhiteSpace,
  isNumber,
  isUndefined,
  showRuntimeErrorMessage,
} from '../../../utils/tools';
import { listViewModeCollection } from '../../../utils/constants';
import {
  getParamsDataCache,
  setParamsDataCache,
} from '../../../utils/globalStorageAssist';

import Base from '../../DataListView/Base';
import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';
import StandardTableCustom from '../../../customComponents/StandardTableCustom';

import styles from './index.less';

class MultiPage extends Base {
  lastLoadParams = null;

  useParamsKey = true;

  constructor(props) {
    super(props);

    const defaultState = defaultPageListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = (checkWorkDoing = true) => {
    if (checkWorkDoing) {
      if (this.checkWorkDoing()) {
        return;
      }
    }

    const form = this.getSearchForm();

    const { pageSize } = this.state;

    form.resetFields();

    this.handleFormOtherReset();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize,
      },
      () => {
        this.reloadData();
      },
    );
  };

  /**
   * 轻微调整初始化请求数据体
   *
   * @memberof PagerList
   */
  adjustLoadRequestParams = (o) => o || {};

  /**
   * 创建初始化请求数据体
   *
   * @memberof PagerList
   */
  initLoadRequestParams = (o) => {
    let d = o || {};

    const { paramsKey, loadApiPath, formValues, filters, sorter } = this.state;

    if ((loadApiPath || '') === '') {
      showRuntimeErrorMessage('loadApiPath需要配置');
      return d;
    }

    if (this.useParamsKey) {
      if ((paramsKey || '') === '') {
        showRuntimeErrorMessage('paramsKey需要配置');
        return d;
      }

      d = getParamsDataCache(paramsKey);

      this.useParamsKey = false;
    } else {
      const {
        startTimeAlias,
        endTimeAlias,
        pageNo,
        pageSize,
        startTime,
        endTime,
      } = this.state;

      if (!stringIsNullOrWhiteSpace(startTime)) {
        if (!stringIsNullOrWhiteSpace(startTimeAlias)) {
          d[startTimeAlias] = startTime;
        } else {
          d.startTime = startTime;
        }
      }

      if (!stringIsNullOrWhiteSpace(endTime)) {
        if (!stringIsNullOrWhiteSpace(endTimeAlias)) {
          d[endTimeAlias] = endTime;
        } else {
          d.endTime = endTime;
        }
      }

      d = {
        ...d,
        ...{
          ...(formValues || {}),
          ...(filters || {}),
          ...{ pageNo, pageSize },
          ...(sorter || {}),
        },
      };

      delete d.dateRange;
    }

    return this.adjustLoadRequestParams(d);
  };

  // eslint-disable-next-line no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {
    const form = this.getSearchForm();
    const { urlParams } = this.state;

    let pageKey = 'no';

    if (urlParams != null) {
      pageKey = urlParams.pageKey || 'no';
    }

    const p = submitData;

    if (pageKey === 'key' && p != null) {
      if (p.startTime && p.endTime) {
        p.dateRange = [dateToMoment(p.startTime), dateToMoment(p.endTime)];
        // p.dateRange = `${p.startTime}-${p.endTime}`;
      }

      const d = form.getFieldsValue();

      Object.keys(d).forEach((key) => {
        const c = p[key] === 0 ? 0 : p[key] || null;

        if (c != null) {
          const obj = {};
          obj[key] = isNumber(c) ? `${c}` : c;
          form.setFieldsValue(obj);
        }
      });

      this.adjustRenderLoadRequestParamsWithKey(d);
    }
  };

  // eslint-disable-next-line no-unused-vars
  adjustRenderLoadRequestParamsWithKey = (d) => {};

  afterGetRequestResult = () => {
    const { paramsKey } = this.state;

    if (!stringIsNullOrWhiteSpace(paramsKey)) {
      setParamsDataCache(paramsKey, this.lastLoadParams);
    }
  };

  handleSearch = (e) => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchForm();

    const { validateFields } = form;
    const { pageSize } = this.state;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values, pageNo: 1, pageSize });
      })
      .catch((error) => {
        const { errorFields } = error;

        if (!isUndefined(errorFields)) {
          const m = [];

          Object.values(errorFields).forEach((o) => {
            m.push(o.errors[0]);
          });

          const maxLength = 5;
          let beyondMax = false;

          if (m.length > maxLength) {
            m.length = maxLength;

            beyondMax = true;
          }

          let errorMessage = m.join(', ');

          if (beyondMax) {
            errorMessage += ' ...';
          }

          message.warn(errorMessage);
        } else {
          showRuntimeErrorMessage(error);
        }
      });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    if (this.checkWorkDoing()) {
      return;
    }

    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      formValues,
      filters,
    };

    if (sorter.field) {
      params.sorter = { sorter: `${sorter.field}_${sorter.order}` };
    }

    this.pageListData(params);
  };

  handleListViewPaginationChange = (page, pageSize) => {
    if (this.checkWorkDoing()) {
      return;
    }

    const { formValues } = this.state;

    const params = {
      pageNo: page,
      pageSize,
      formValues,
    };

    this.pageListData(params);
  };

  renderTableView = () => {
    const {
      tableScroll,
      showSelect,
      selectedDataTableDataRows,
      metaOriginalData,
      dataLoading,
      processing,
    } = this.state;

    const { styleSet, columns, expandable, size } = this.buildTableConfig();

    const standardTableCustomOption = {
      loading: dataLoading || processing,
      data: metaOriginalData || { list: [], pagination: {} },
      showSelect,
      selectedRows: selectedDataTableDataRows,
      columns,
      size,
      onSelectRow: this.handleSelectRows,
      onChange: this.handleStandardTableChange,
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    standardTableCustomOption.expandable = {
      ...{},
      ...(expandable || {}),
    };

    return (
      <div className={styles.tableContainor}>
        <StandardTableCustom {...standardTableCustomOption} />
      </div>
    );
  };

  renderListView = () => {
    const { metaOriginalData, dataLoading, reloading, processing } = this.state;

    const { list, pagination } = metaOriginalData || {
      list: [],
      pagination: {},
    };

    const paginationConfig = { ...pagination };

    paginationConfig.onChange = this.handleListViewPaginationChange;

    return (
      <Spin spinning={dataLoading || reloading || processing}>
        <List
          itemLayout={this.renderListViewItemLayout()}
          size={this.renderListViewSize()}
          dataSource={list}
          pagination={paginationConfig}
          renderItem={(item, index) => {
            return this.renderListViewItem(item, index);
          }}
        />
      </Spin>
    );
  };

  renderView = () => {
    const { showSelect, listViewMode } = this.state;

    if (listViewMode === listViewModeCollection.table) {
      return this.renderTableView();
    }

    if (listViewMode === listViewModeCollection.list) {
      if (showSelect) {
        showRuntimeErrorMessage('MultiListView显示模式下不支持选择');
      }

      return this.renderListView();
    }

    showRuntimeErrorMessage('未知的显示模式');

    return null;
  };

  renderCardExtraAction = () => {
    const { listViewMode, tableSize, refreshing } = this.state;

    if (listViewMode === listViewModeCollection.table) {
      return (
        <>
          <DensityAction
            tableSize={tableSize}
            setTableSize={(key) => {
              this.setTableSize(key);
            }}
          />

          <Tooltip title="刷新本页">
            <Button
              shape="circle"
              style={{
                color: '#000',
                border: 0,
              }}
              loading={refreshing}
              icon={<ReloadOutlined />}
              onClick={() => {
                this.refreshData();
              }}
            />
          </Tooltip>

          <ColumnSetting
            columns={this.getColumn()}
            columnsMap={this.getColumnsMap()}
            setColumnsMap={(e) => {
              this.setColumnsMap(e);
            }}
            setSortKeyColumns={(key) => {
              this.setSortKeyColumns(key);
            }}
          />
        </>
      );
    }

    return (
      <>
        <Tooltip title="刷新本页">
          <Button
            shape="circle"
            style={{
              color: '#000',
              border: 0,
            }}
            loading={refreshing}
            icon={<ReloadOutlined />}
            onClick={() => {
              this.refreshData();
            }}
          />
        </Tooltip>
      </>
    );
  };
}

export default MultiPage;
