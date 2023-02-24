import {
  checkStringIsNullOrWhiteSpace,
  getParametersDataCache,
  getValue,
  isUndefined,
  logObject,
  setParametersDataCache,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { defaultPageListState } from 'antd-management-fast-common';

import { Base } from '../../DataListView/Base';

class MultiPage extends Base {
  /**
   * 使用远端分页
   */
  useRemotePagination = true;

  /**
   * 使用前台模拟分页，有助于优化长列表页面交互操作导致的延迟
   */
  useFrontendPagination = false;

  lastLoadParams = null;

  /**
   * 是否恢复之前检索条件
   */
  restoreSearch = false;

  /**
   * 恢复检索是否完成
   */
  restoreSearchComplete = false;

  constructor(properties) {
    super(properties);

    const defaultState = defaultPageListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleSearchReset = (checkWorkDoing = true, delay = 0) => {
    if (checkWorkDoing && this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchCard();

    const { pageSize } = this.state;

    if (form) {
      form.resetFields();
    }

    this.handleAdditionalSearchReset();

    this.reloadData(
      {
        formValues: {},
        startTime: '',
        endTime: '',
        pageNo: 1,
        pageSize,
      },
      null,
      delay,
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

    if (checkStringIsNullOrWhiteSpace(loadApiPath)) {
      const text = 'loadApiPath需要配置';

      showSimpleRuntimeError(text);

      logObject(this);

      return d;
    }

    if (this.restoreSearch && !this.restoreSearchComplete) {
      if (checkStringIsNullOrWhiteSpace(paramsKey)) {
        const text = 'paramsKey需要配置';

        showSimpleRuntimeError(text);

        return d;
      }

      d = getParametersDataCache(paramsKey);

      this.restoreSearchComplete = true;

      this.restoreQueryDataBeforeFirstRequest(d);
    } else {
      const {
        startTimeAlias,
        endTimeAlias,
        pageNo,
        pageSize,
        startTime,
        endTime,
      } = this.state;

      if (!checkStringIsNullOrWhiteSpace(startTime)) {
        if (checkStringIsNullOrWhiteSpace(startTimeAlias)) {
          d.startTime = startTime;
        } else {
          d[startTimeAlias] = startTime;
        }
      }

      if (!checkStringIsNullOrWhiteSpace(endTime)) {
        if (checkStringIsNullOrWhiteSpace(endTimeAlias)) {
          d.endTime = endTime;
        } else {
          d[endTimeAlias] = endTime;
        }
      }

      d = {
        ...d,

        ...formValues,
        ...filters,
        pageNo,
        pageSize,
        ...sorter,
      };

      delete d.dateRange;
    }

    return this.adjustLoadRequestParams(d);
  };

  // eslint-disable-next-line no-unused-vars
  restoreQueryDataBeforeFirstRequest = (d) => {
    setTimeout(() => {
      const text =
        '启用恢复之前查询状态功能需要重新实现 "restoreQueryDataBeforeFirstRequest" 方法,通过该方法填充视图中的各项查询条件 ';

      showSimpleWarnMessage(text);
    }, 1500);
  };

  afterGetRequestResult = () => {
    const { paramsKey } = this.state;

    if (!checkStringIsNullOrWhiteSpace(paramsKey)) {
      setParametersDataCache(paramsKey, this.lastLoadParams);
    }
  };

  handleSearch = () => {
    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchCard();

    if (!form) {
      const text = '查询表单不存在';

      showSimpleErrorMessage(text);
    }

    const { validateFields } = form;
    const { pageSize } = this.state;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          // eslint-disable-next-line promise/always-return
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values, pageNo: 1, pageSize });
      })
      .catch((error) => {
        const { errorFields } = error;

        if (isUndefined(errorFields)) {
          showSimpleRuntimeError(error);
        } else {
          const m = [];

          for (const o of Object.values(errorFields)) {
            m.push(o.errors[0]);
          }

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

          showSimpleWarningMessage(errorMessage);
        }
      });
  };

  /**
   * 配置StandardTable切换页面时需要引发的事项
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  handleStandardTableChange = (pagination, filtersArgument, sorter) => {
    if (this.checkWorkDoing()) {
      return;
    }

    const { formValues } = this.state;

    // eslint-disable-next-line unicorn/no-array-reduce
    const filters = Object.keys(filtersArgument).reduce((object, key) => {
      const newObject = { ...object };
      newObject[key] = getValue(filtersArgument[key]);
      return newObject;
    }, {});

    const parameters = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
      formValues,
      filters,
    };

    if (sorter.field) {
      parameters.sorter = { sorter: `${sorter.field}_${sorter.order}` };
    }

    this.pageListData(parameters);

    this.handleAdditionalStandardTableChange(
      pagination,
      filtersArgument,
      sorter,
    );
  };

  handlePaginationChange = (page, pageSize) => {
    if (this.checkWorkDoing()) {
      return;
    }

    const { formValues } = this.state;

    const parameters = {
      pageNo: page,
      pageSize,
      formValues,
    };

    this.pageListData(parameters);

    this.handleAdditionalPaginationChange(page, pageSize);
  };

  establishViewDataSource = () => {
    const { metaOriginalData } = this.state;

    const { list } = {
      list: [],
      ...metaOriginalData,
    };

    return list;
  };

  establishViewPaginationConfig = () => {
    const { metaOriginalData } = this.state;

    const { pagination } = {
      pagination: {},
      ...metaOriginalData,
    };

    const paginationConfig = { ...pagination };

    return paginationConfig;
  };
}

export { MultiPage };
