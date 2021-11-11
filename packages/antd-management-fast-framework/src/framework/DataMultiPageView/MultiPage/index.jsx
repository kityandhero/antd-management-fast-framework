import { message } from 'antd';

import {
  defaultPageListState,
  stringIsNullOrWhiteSpace,
  isUndefined,
  showRuntimeError,
  recordObject,
  showWarnMessage,
} from '../../../utils/tools';
import {
  getParamsDataCache,
  setParamsDataCache,
} from '../../../utils/globalStorageAssist';

import Base from '../../DataListView/Base';

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

    if (this.restoreSearch && !!!this.restoreSearchComplete) {
      if ((paramsKey || '') === '') {
        const text = 'paramsKey需要配置';

        showRuntimeError({
          message: text,
        });

        return d;
      }

      d = getParamsDataCache(paramsKey);

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
  restoreQueryDataBeforeFirstRequest = (d) => {
    setTimeout(() => {
      const text =
        '启用恢复之前查询状态功能需要重新实现 ”restoreQueryDataBeforeFirstRequest“ 方法,通过该方法填充视图中的各项查询条件 ';

      showWarnMessage({
        message: text,
      });
    }, 1500);
  };

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

  /**
   * 配置StandardTable切换页面时需要引发的事项
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
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

    this.handleAdditionalStandardTableChange(pagination, filtersArg, sorter);
  };

  handlePaginationChange = (page, pageSize) => {
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

    this.handleAdditionalPaginationChange(page, pageSize);
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

    return paginationConfig;
  };
}

export default MultiPage;
