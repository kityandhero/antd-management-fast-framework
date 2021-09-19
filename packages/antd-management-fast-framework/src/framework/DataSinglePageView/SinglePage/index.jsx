import React from 'react';
import { Spin, List, message } from 'antd';

import {
  defaultListState,
  stringIsNullOrWhiteSpace,
  showRuntimeError,
  isUndefined,
} from '../../../utils/tools';
import { listViewModeCollection } from '../../../utils/constants';

import Base from '../../DataListView/Base';
import StandardTableCustom from '../../../customComponents/StandardTableCustom';

class SinglePage extends Base {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleFormReset = () => {
    const form = this.getSearchForm();

    form.resetFields();

    this.handleFormOtherReset();

    this.setState(
      {
        formValues: {},
        startTime: '',
        endTime: '',
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

  initLoadRequestParams = (o = {}) => {
    let d = o;

    const { loadApiPath, formValues, filters, sorter } = this.state;

    if ((loadApiPath || '') === '') {
      const text = 'loadApiPath需要配置';

      showRuntimeError({
        message: text,
      });

      recordObject(this);

      return d;
    }

    const { startTimeAlias, endTimeAlias, startTime, endTime } = this.state;

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
        ...(sorter || {}),
      },
    };

    delete d.dateRange;

    return this.adjustLoadRequestParams(d);
  };

  handleSearch = (e) => {
    // if ((e || null) != null) {
    //   e.preventDefault();
    // }

    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchForm();

    const { validateFields } = form;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values });
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
          showRuntimeError({
            message: error,
          });
        }
      });
  };

  renderListView = () => {
    const { metaOriginalData, dataLoading, reloading, processing } = this.state;

    const { list } = metaOriginalData || { list: [] };

    return (
      <Spin spinning={dataLoading || reloading || processing}>
        <List
          itemLayout={this.renderListViewItemLayout()}
          size={this.renderListViewSize()}
          dataSource={list}
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
        const text = 'MultiListView显示模式下不支持选择';

        showRuntimeError({
          message: text,
        });
      }

      return this.renderListView();
    }

    const text = '未知的显示模式';

    showRuntimeError({
      message: text,
    });

    return null;
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

    const { styleSet, columns, expandable } = this.buildTableConfig();

    const standardTableCustomOption = {
      loading: dataLoading || processing,
      data: metaOriginalData || { list: [] },
      showSelect,
      pagination: false,
      selectedRows: selectedDataTableDataRows,
      columns,
      onSelectRow: this.handleSelectRows,
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    standardTableCustomOption.expandable = {
      ...{
        rowExpandable: false,
        expandedRowRender: null,
      },
      ...(expandable || {}),
    };

    return <StandardTableCustom {...standardTableCustomOption} />;
  };
}

export default SinglePage;
