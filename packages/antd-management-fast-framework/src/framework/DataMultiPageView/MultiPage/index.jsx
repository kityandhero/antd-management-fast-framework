import React from 'react';
import { Pagination, message } from 'antd';

import {
  defaultPageListState,
  getValue,
  dateToMoment,
  stringIsNullOrWhiteSpace,
  isNumber,
  isUndefined,
  showRuntimeError,
  recordObject,
} from '../../../utils/tools';
import {
  getParamsDataCache,
  setParamsDataCache,
} from '../../../utils/globalStorageAssist';
import FlexBox from '../../../customComponents/FlexBox';

import Base from '../../DataListView/Base';

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

  handleSearchReset = (checkWorkDoing = true) => {
    if (checkWorkDoing) {
      if (this.checkWorkDoing()) {
        return;
      }
    }

    const form = this.getSearchCard();

    const { pageSize } = this.state;

    form.resetFields();

    this.handleAdditionalSearchReset();

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
      const text = 'loadApiPath需要配置';

      showRuntimeError({
        message: text,
      });

      recordObject(this);

      return d;
    }

    if (this.useParamsKey) {
      if ((paramsKey || '') === '') {
        const text = 'paramsKey需要配置';

        showRuntimeError({
          message: text,
        });

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {
    const form = this.getSearchCard();
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  adjustRenderLoadRequestParamsWithKey = (d) => {};

  afterGetRequestResult = () => {
    const { paramsKey } = this.state;

    if (!stringIsNullOrWhiteSpace(paramsKey)) {
      setParamsDataCache(paramsKey, this.lastLoadParams);
    }
  };

  handleSearch = () => {
    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchCard();

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
          showRuntimeError({
            message: error,
          });
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

  handlePaginationChange = (page, pageSize) => {
    this.handleStandardTableChange(
      {
        current: page,
        pageSize,
      },
      {},
      {},
    );
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

  handlePaginationShowSizeChange = (current, size) => {
    this.setState({ pageNo: 1 });

    this.handleStandardTableChange(
      {
        current: 1,
        pageSize: size,
      },
      {},
      {},
    );
  };

  establishViewDataSource = () => {
    const { metaOriginalData } = this.state;

    const { list } = {
      ...{ list: [] },
      ...(metaOriginalData || {}),
    };

    return list;
  };

  establishViewPaginationConfig = () => {
    const { metaOriginalData } = this.state;

    const { pagination } = {
      ...{ pagination: {} },
      ...(metaOriginalData || {}),
    };

    const paginationConfig = { ...pagination };

    paginationConfig.onChange = this.handleListViewPaginationChange;

    return paginationConfig;
  };

  renderPaginationView = () => {
    const { pageNo, pageSize } = this.state;

    const paginationConfig = this.establishViewPaginationConfig();

    paginationConfig.onChange = this.handleListViewPaginationChange;

    return (
      <FlexBox
        style={{
          paddingTop: 16,
          paddingBottom: 16,
        }}
        right={
          <Pagination
            current={pageNo}
            pageSize={pageSize}
            size="small"
            showSizeChanger
            showQuickJumper
            showTotal={(total) => `共 ${total} 条信息`}
            {...paginationConfig}
            onChange={(page, size) => {
              this.handlePaginationChange(page, size);
            }}
            onShowSizeChange={(current, size) => {
              this.handlePaginationShowSizeChange(current, size);
            }}
          />
        }
      />
    );
  };
}

export default MultiPage;
