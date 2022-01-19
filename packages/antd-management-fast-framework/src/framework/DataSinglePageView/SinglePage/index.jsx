import { message } from 'antd';

import {
  defaultListState,
  stringIsNullOrWhiteSpace,
  showRuntimeError,
  isUndefined,
  toNumber,
} from '../../../utils/tools';

import Base from '../../DataListView/Base';

class SinglePage extends Base {
  /**
   * 使用远端分页
   */
  useRemotePagination = false;

  /**
   * 使用前台模拟分页，有助于优化长列表页面交互操作导致的延迟
   */
  useFrontendPagination = true;

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
      ...{
        frontendPageNo: 1,
      },
    };
  }

  handleSearchReset = () => {
    const form = this.getSearchCard();

    if ((form || null) != null) {
      form.resetFields();
    }

    this.handleAdditionalSearchReset();

    this.reloadData({
      formValues: {},
      startTime: '',
      endTime: '',
    });
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

  handleSearch = () => {
    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchCard();

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

  /**
   * 构建列表数据
   * @returns
   */
  establishViewDataSource = () => {
    const { metaOriginalData } = this.state;

    const { list } = {
      ...{ list: [] },
      ...(metaOriginalData || {}),
    };

    return list;
  };

  adjustFrontendPaginationViewDataSource = () => {
    const { pageNo, pageSize } = this.state;

    return this.buildFrontendPaginationListData({
      pageNo,
      pageSize,
    });
  };

  buildFrontendPaginationListData = ({ pageNo, pageSize }) => {
    const list = this.adjustViewDataSource();

    const listData = !!this.getCanUseFrontendPagination()
      ? list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
      : list;

    return listData;
  };

  /**
   * 构建附加的分页配置
   * @returns
   */
  establishTableAdditionalConfig = () => {
    return {};
  };

  /**
   * 不要在框架之外重载或覆盖该该函数，否则分页视图将功能异常
   */
  establishViewPaginationConfig = () => {
    return null;
  };

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
  handlePaginationChange = (page, pageSize) => {
    this.setState({ pageNo: page, frontendPageNo: page });

    this.handleAdditionalPaginationChange(page, pageSize);
  };

  /**
   * 当页码变动时的附加执行行为
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAdditionalStandardTableChange = (pagination, filtersArg, sorter) => {
    const { current: frontendPageNoSource } = pagination;

    const frontendPageNo = toNumber(frontendPageNoSource);

    this.setState({ pageNo: frontendPageNo, frontendPageNo });
  };

  /**
   * 获取当前的前端模拟分页当前页码
   * @returns
   */
  getFrontendPageNo = () => {
    const { frontendPageNo } = this.state;

    return toNumber(frontendPageNo);
  };

  renderPaginationView = () => {
    if (!!!this.getCanUseFrontendPagination()) {
      return null;
    }

    return this.buildPaginationBar();
  };
}

export default SinglePage;
