import {
  checkStringIsNullOrWhiteSpace,
  getParametersDataCache,
  getValue,
  logObject,
  setParametersDataCache,
  showSimpleRuntimeError,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { defaultPageListState } from 'antd-management-fast-common';

import { Base } from '../../DataListView/Base';

const primaryCallName = 'DataMultiPageView::MultiPage';

const parameterCachePrefix = 'amf-parameter';

function buildParameterCacheKey(parametersKey) {
  return `${parameterCachePrefix}-${parametersKey}`;
}

/**
 * DataMultiPageView.MultiPage
 * @namespace
 */
class MultiPage extends Base {
  /**
   * 使用远端分页
   */
  useRemotePagination = true;

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

  supplementPageLoadRequestParams = () => {};

  supplementLoadRequestParams = (o) => {
    this.logCallTrack(
      { parameter: o },
      primaryCallName,
      'supplementLoadRequestParams',
    );

    this.logCallTrace({}, primaryCallName, 'supplementPageLoadRequestParams');

    const result = { ...o, ...this.supplementPageLoadRequestParams() };

    this.logCallResult(result, primaryCallName, 'supplementLoadRequestParams');

    return result;
  };

  handleSearchReset = () => {
    this.logCallTrack({}, primaryCallName, 'handleSearchReset');

    this.logCallTrace({}, primaryCallName, 'resetTargetSearch');

    this.resetTargetSearch();

    this.logCallTrace({}, primaryCallName, 'handleAdditionalSearchReset');

    this.handleAdditionalSearchReset();

    this.logCallTrace({}, primaryCallName, 'setPageValue');

    this.setPageValue({ pageNo: 1 });

    this.filterFormValues = {};
    this.filterNoFormValues = {};
    this.filterExtraValues = {
      ...this.filterExtraValues,
      startTime: '',
      endTime: '',
    };

    this.logCallTrace({}, primaryCallName, 'handleSearchResetState');

    const stateAdjust = this.handleSearchResetState() || {};

    this.logCallTrace(
      {
        otherState: stateAdjust,
      },
      primaryCallName,
      'resetData',
    );

    this.resetData({ otherState: stateAdjust });
  };

  /**
   * 轻微调整初始化请求数据体
   */
  adjustLoadRequestParams = (o) => o || {};

  /**
   * 创建初始化请求数据体
   */
  initLoadRequestParams = (o) => {
    let d = o || {};

    const { loadApiPath } = this.state;

    if (checkStringIsNullOrWhiteSpace(loadApiPath)) {
      const text = 'loadApiPath需要配置';

      showSimpleRuntimeError(text);

      logObject(this);

      return d;
    }

    const { pageNo, pageSize } = {
      pageNo: 1,
      pageSize: 10,
      ...this.pageValues,
    };

    this.logCallTrack(
      {
        parameter: o,
        paramsKey: this.paramsKey,
        filterFormValues: this.filterFormValues,
        filterNoFormValues: this.filterNoFormValues,
        sorterValues: this.sorterValues,
        pageValues: { pageNo, pageSize },
      },
      primaryCallName,
      'initLoadRequestParams',
    );

    if (this.restoreSearch && !this.restoreSearchComplete) {
      if (checkStringIsNullOrWhiteSpace(this.paramsKey)) {
        const text = 'paramsKey需要配置';

        showSimpleRuntimeError(text);

        return d;
      }

      d = getParametersDataCache(buildParameterCacheKey(this.paramsKey));

      this.restoreSearchComplete = true;

      this.restoreQueryDataBeforeFirstRequest(d);
    } else {
      const { startTimeAlias, endTimeAlias, startTime, endTime } =
        this.filterExtraValues;

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
        ...this.sorterValues,
        pageNo,
        pageSize,
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
    if (checkStringIsNullOrWhiteSpace(this.paramsKey)) {
      return;
    }

    setParametersDataCache(
      buildParameterCacheKey(this.paramsKey),
      this.lastLoadParams,
    );
  };

  /**
   * 配置StandardTable切换页面时需要引发的事项
   * @param {Object} pagination
   * @param {Object} filtersArgument
   * @param {Object} sorter
   * @param {Object} sorter
   */
  handleStandardTableChange = (pagination, filtersArgument, sorter, extra) => {
    if (this.checkWorkDoing()) {
      this.logCallTrack(
        {
          pagination,
          filtersArgument,
          sorter,
          extra,
        },
        primaryCallName,
        'handleStandardTableChange',
        'checkWorkDoing',
        'true',
        'ignore',
      );

      return;
    }

    this.logCallTrack(
      {
        pagination,
        filtersArgument,
        sorter,
        extra,
      },
      primaryCallName,
      'handleStandardTableChange',
    );

    // eslint-disable-next-line unicorn/no-array-reduce
    const filters = Object.keys(filtersArgument).reduce((object, key) => {
      const newObject = { ...object };
      newObject[key] = getValue(filtersArgument[key]);
      return newObject;
    }, {});

    this.filterNoFormValues = filters;

    const parameterAdjust = {
      ...this.filterFormValues,
      ...this.filterNoFormValues,
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };

    if (sorter.field) {
      parameterAdjust.sorter = {
        sorter: `${sorter.field}_${sorter.order}` || '',
      };

      this.sorterValues = parameterAdjust.sorter;
    }

    this.logCallTrace(
      {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      },
      primaryCallName,
      'handleStandardTableChange',
      'setPageValue',
    );

    this.setPageValue({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });

    this.logCallTrace(
      {
        requestData: parameterAdjust,
        delay: this.pageRemoteRequestDelay,
      },
      primaryCallName,
      'handleStandardTableChange',
      'pageListData',
    );

    this.pageListData({
      requestData: parameterAdjust,
      delay: this.pageRemoteRequestDelay,
    });

    this.logCallTrace(
      {
        requestData: parameterAdjust,
        delay: this.pageRemoteRequestDelay,
      },
      primaryCallName,
      'handleStandardTableChange',
      'trigger',
      'handleAdditionalStandardTableChange',
    );

    this.handleAdditionalStandardTableChange(
      pagination,
      filtersArgument,
      sorter,
      extra,
    );
  };

  handlePaginationChange = (page, pageSize) => {
    if (this.checkWorkDoing()) {
      return;
    }

    this.logCallTrack(
      {
        parameter: {
          page,
          pageSize,
        },
      },
      primaryCallName,
      'handlePaginationChange',
    );

    const requestData = {
      pageNo: page,
      pageSize,
      ...this.filterFormValues,
    };

    this.setPageValue({
      pageNo: page,
      pageSize,
    });

    this.pageListData({
      requestData,
      delay: this.pageRemoteRequestDelay,
    });

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

    delete paginationConfig.current;
    delete paginationConfig.pageSize;

    this.logCallTrack(
      {
        paginationConfig,
      },
      primaryCallName,
      'establishViewPaginationConfig',
    );

    return paginationConfig;
  };
}

export { MultiPage };
