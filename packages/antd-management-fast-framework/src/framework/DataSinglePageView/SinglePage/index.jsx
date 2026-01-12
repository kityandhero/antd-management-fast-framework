import {
  checkStringIsNullOrWhiteSpace,
  logObject,
  showSimpleRuntimeError,
  toNumber,
} from 'easy-soft-utility';

import { defaultListState, emptyLogic } from 'antd-management-fast-common';

import { Base } from '../../DataListView/Base';

const primaryCallName = 'DataSinglePageView::SinglePage';

/**
 * DataSinglePageView.SinglePage
 * @namespace
 */
class SinglePage extends Base {
  /**
   * 使用远端分页
   */
  useRemotePagination = false;

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

  /**
   * 轻微调整初始化请求数据体
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
      primaryCallName,
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

  /**
   * 构建列表数据
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
      primaryCallName,
      'buildFrontendPaginationListData',
    );

    return listData;
  };

  /**
   * 构建附加的分页配置
   */
  establishTableAdditionalConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTableAdditionalConfig',
      emptyLogic,
    );

    return {};
  };

  /**
   * 不要在框架之外重载或覆盖该该函数，否则分页视图将功能异常
   */
  establishViewPaginationConfig = () => {
    this.logCallTrack({}, primaryCallName, 'establishViewPaginationConfig');

    const list = this.establishViewDataSource();

    const paginationConfig = { total: (list || []).length };

    return paginationConfig;
  };

  /**
   * 配置Pagination切换页面时需要引发的事项,用于listView/cardView
   * @param {number} page
   * @param {number} size
   */
  handlePaginationChange = (page, size) => {
    this.logCallTrack(
      {
        parameter: { page, size },
      },
      primaryCallName,
      'handlePaginationChange',
    );

    this.logCallTrace(
      {
        pageNo: page,
        pageSize: size,
        frontendPageNo: page,
      },
      primaryCallName,
      'handlePaginationChange',
      'trigger',
      'setPageValue',
    );

    this.setPageValue({
      pageNo: page,
      pageSize: size,
      frontendPageNo: page,
    });

    this.logCallTrace(
      {
        page,
        size,
      },
      primaryCallName,
      'handlePaginationChange',
      'trigger',
      'handleAdditionalPaginationChange',
    );

    this.handleAdditionalPaginationChange(page, size);

    if (this.getCanUseFrontendPagination()) {
      this.logCallTrace(
        {},
        primaryCallName,
        'handlePaginationChange',
        'trigger',
        'increaseCounter',
      );

      this.increaseCounter({});
    }
  };

  /**
   * 当页码变动时的附加执行行为
   * @param {*} pagination
   * @param {*} filtersArgument
   * @param {*} sorter
   * @param {Object} extra
   */
  handleAdditionalStandardTableChange = (
    pagination,
    filtersArgument,
    sorter,
    extra,
  ) => {
    const { current: frontendPageNoSource, pageSize } = pagination;

    const frontendPageNo = toNumber(frontendPageNoSource);

    this.logCallTrack(
      {
        frontendPageNo,
        pagination,
        filtersArgument,
        sorter,
        extra,
      },
      primaryCallName,
      'handleAdditionalStandardTableChange',
    );

    this.logCallTrace(
      {
        pageNo: frontendPageNo,
        frontendPageNo,
      },
      primaryCallName,
      'handleAdditionalStandardTableChange',
      'trigger',
      'setPageValue',
    );

    this.setPageValue({
      pageNo: frontendPageNo,
      pageSize,
      frontendPageNo,
    });

    this.increaseCounter({});
  };

  /**
   * 获取当前的前端模拟分页当前页码
   */
  getFrontendPageNo = () => {
    const { frontendPageNo } = this.pageValues;

    return toNumber(frontendPageNo);
  };

  renderPresetPaginationView = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPaginationView');

    if (!this.getCanUseFrontendPagination()) {
      return null;
    }

    return this.buildPaginationBar();
  };
}

export { SinglePage };
