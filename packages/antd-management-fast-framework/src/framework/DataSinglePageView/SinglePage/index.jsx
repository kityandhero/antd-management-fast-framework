import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  logException,
  logObject,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
  toNumber,
} from 'easy-soft-utility';

import { defaultListState, emptyLogic } from 'antd-management-fast-common';

import { Base } from '../../DataListView/Base';

class SinglePage extends Base {
  /**
   * 使用远端分页
   */
  useRemotePagination = false;

  /**
   * 使用前台模拟分页，有助于优化长列表页面交互操作导致的延迟
   */
  useFrontendPagination = true;

  constructor(properties) {
    super(properties);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
    };
  }

  handleSearchReset = () => {
    const form = this.getSearchCard();

    if (form) {
      form.resetFields();
    }

    this.handleAdditionalSearchReset();

    this.filterFormValues = {};
    this.filterNoFormValues = {};
    this.filterExtraValues = {
      ...this.filterExtraValues,
      startTime: '',
      endTime: '',
    };

    this.resetData({});
  };

  /**
   * 轻微调整初始化请求数据体
   *
   * @memberof PagerList
   */
  adjustLoadRequestParams = (o) => o || {};

  initLoadRequestParams = (o = {}) => {
    let d = o;

    const { loadApiPath } = this.state;

    const { sorter } = this.sorterValues;

    if ((loadApiPath || '') === '') {
      const text = 'loadApiPath需要配置';

      showSimpleRuntimeError(text);

      logObject(this);

      return d;
    }

    this.logCallTrack(
      {
        parameter: o,
        paramsKey: this.paramsKey,
        filterFormValues: this.filterFormValues,
        filterNoFormValues: this.filterNoFormValues,
        sorterValues: this.sorterValues,
        pageValues: this.pageValues,
      },
      'DataMultiPageView::SinglePage',
      'initLoadRequestParams',
    );

    const { startTimeAlias, endTimeAlias, startTime, endTime } =
      this.filterFormValues;

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
      ...this.filterFormValues,
      ...this.filterNoFormValues,
      ...sorter,
    };

    delete d.dateRange;

    return this.adjustLoadRequestParams(d);
  };

  handleSearch = () => {
    this.logCallTrack({}, 'DataSinglePageView::SinglePage', 'handleSearch');

    if (this.checkWorkDoing()) {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePage',
        'handleSearch',
        'ignore on working',
      );

      return;
    }

    const form = this.getSearchCard();

    if (!form) {
      const text = '查询表单不存在';

      showSimpleErrorMessage(text);
    }

    const { validateFields } = form;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          // eslint-disable-next-line promise/always-return
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values });
      })
      .catch((error) => {
        const { errorFields, message } = error;

        if (!isUndefined()) {
          logException(message);
        }

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
   * 构建列表数据
   * @returns
   */
  establishViewDataSource = () => {
    const { metaOriginalData } = this.state;

    const { list } = {
      list: [],
      ...metaOriginalData,
    };

    return list;
  };

  adjustFrontendPaginationViewDataSource = () => {
    const { pageNo, pageSize } = this.pageValues;

    return this.buildFrontendPaginationListData({
      pageNo,
      pageSize,
    });
  };

  buildFrontendPaginationListData = ({ pageNo, pageSize }) => {
    const list = this.adjustViewDataSource();

    const useFrontendPagination = this.getCanUseFrontendPagination();

    const listData = useFrontendPagination
      ? list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      : list;

    this.logCallTrack(
      {
        parameter: {
          pageNo,
          pageSize,
        },
        useFrontendPagination,
        listData,
      },
      'DataSinglePageView::SinglePage',
      'buildFrontendPaginationListData',
    );

    return listData;
  };

  /**
   * 构建附加的分页配置
   * @returns
   */
  establishTableAdditionalConfig = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePage',
      'establishTableAdditionalConfig',
      emptyLogic,
    );

    return {};
  };

  /**
   * 不要在框架之外重载或覆盖该该函数，否则分页视图将功能异常
   */
  establishViewPaginationConfig = () => {
    const list = this.establishViewDataSource();

    const paginationConfig = { total: (list || []).length };

    return paginationConfig;
  };

  /**
   * 配置Pagination切换页面时需要引发的事项,用于listView/cardView
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  handlePaginationChange = (page, size) => {
    this.logCallTrack(
      {
        parameter: { page, size },
      },
      'DataSinglePageView::SinglePage',
      'handlePaginationChange',
    );

    this.setPageValue({
      pageNo: page,
      pageSize: size,
      frontendPageNo: page,
    });

    this.handleAdditionalPaginationChange(page, size);

    if (this.getCanUseFrontendPagination()) {
      this.increaseCounter({});
    }
  };

  /**
   * 当页码变动时的附加执行行为
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  handleAdditionalStandardTableChange = (
    pagination,
    filtersArgument,
    sorter,
    extra,
  ) => {
    const { current: frontendPageNoSource } = pagination;

    const frontendPageNo = toNumber(frontendPageNoSource);

    this.logCallTrack(
      {
        frontendPageNo,
        pagination,
        filtersArgument,
        sorter,
        extra,
      },
      'DataSinglePageView::SinglePage',
      'handleAdditionalStandardTableChange',
    );

    this.setPageValue({
      pageNo: frontendPageNo,
      frontendPageNo,
    });
  };

  /**
   * 获取当前的前端模拟分页当前页码
   * @returns
   */
  getFrontendPageNo = () => {
    const { frontendPageNo } = this.pageValues;

    return toNumber(frontendPageNo);
  };

  renderPresetPaginationView = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePage',
      'renderPresetPaginationView',
    );

    if (!this.getCanUseFrontendPagination()) {
      return null;
    }

    return this.buildPaginationBar();
  };
}

export { SinglePage };
