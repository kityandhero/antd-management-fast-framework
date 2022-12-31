import nprogress from 'nprogress';
import { Component } from 'react';

import { defaultSettingsLayoutCustom } from 'antd-management-fast-common/es/utils/defaultSettingsSpecial';
import {
  defaultBaseState,
  getGuid,
  goToPath as goToPathCore,
  isEqual,
  isFunction,
  isObject,
  recordDebug,
  recordError,
  redirectToPath as redirectToPathCore,
  showInfoMessage,
} from 'antd-management-fast-common/es/utils/tools';

function filterModel(props) {
  const result = { ...props };

  delete result.loading;

  Object.entries(result).forEach((o) => {
    const [k, v] = o;

    if (isObject(v)) {
      if (!!v.fromRemote) {
        delete result[k];
      }
    }
  });

  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(a, b) {
  return isEqual(a, b);
}

class Base extends Component {
  mounted = false;

  /**
   *显示render次数开关，用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */
  keyPrefix = '';

  constructor(props) {
    super(props);

    this.mounted = false;

    const defaultState = defaultBaseState();

    this.state = defaultState;

    this.keyPrefix = getGuid();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    this.beforeDidMount();

    this.mounted = true;

    this.doDidMountTask();

    this.afterDidMount();
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProps, preState) {
    return this.doWhenGetSnapshotBeforeUpdate(preProps, preState);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProps, preState, snapshot);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatchComplete } = {
      ...{ dispatchComplete: true },
      ...nextState,
    };

    if (!!!dispatchComplete) {
      return false;
    }

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProps,
      nextState,
    );

    if ((checkComponentUpdate || null) != null) {
      return !!checkComponentUpdate;
    }

    const nextPropsIgnoreModel = filterModel(nextProps);
    const currentPropsIgnoreModel = filterModel(this.props);

    return (
      !shallowEqual(nextPropsIgnoreModel, currentPropsIgnoreModel) ||
      !shallowEqual(nextState, this.state)
    );
  }

  componentWillUnmount() {
    this.beforeUnmount();

    this.mounted = false;

    this.setState = () => {};

    this.afterUnmount();
  }

  doDidMountTask = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherCheckComponentUpdate = (nextProps, nextState) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {};

  beforeDidMount = () => {};

  afterDidMount = () => {};

  beforeUnmount = () => {};

  afterUnmount = () => {};

  getDispatch = () => {
    if (isObject(this.props)) {
      const { dispatch } = this.props;

      if (isFunction(dispatch)) {
        return dispatch;
      }
    }

    const text = 'please override getDispatch, and return a function';

    recordError(text);

    throw new Error(text);
  };

  getDispatchWrapper = () => {
    const dispatch = this.getDispatch();

    if (!isFunction(dispatch)) {
      recordError('dispatch not a function, please check getDispatch');
    }

    return dispatch;
  };

  dispatchApi = ({ type, payload }) => {
    const dispatch = this.getDispatchWrapper();

    recordDebug(`modal access: ${type}`);

    return dispatch({ type, payload });
  };

  goToPath = (path) => {
    const location = {
      pathname: path,
    };

    if (defaultSettingsLayoutCustom.getUseNprogress()) {
      nprogress.inc();

      setTimeout(() => {
        nprogress.done();
      }, 400);
    }

    goToPathCore(location);
  };

  redirectToPath = (path) => {
    const location = {
      pathname: path,
    };

    if (defaultSettingsLayoutCustom.getUseNprogress()) {
      nprogress.inc();

      setTimeout(() => {
        nprogress.done();
      }, 400);
    }

    redirectToPathCore(location);
  };

  checkHasMore = (pageNo, pageSize, total) => {
    if ((total || 0) <= 0) {
      return false;
    }

    return (pageNo || 0) * (pageSize || 0) < (total || 0);
  };

  showRenderCount() {
    if (this.showRenderCountInConsole) {
      this.renderCount += 1;

      const text = `render frequency: ${this.renderCount}`;

      showInfoMessage({
        message: text,
      });
    }
  }

  /**
   * check loading progress,if loading or load fail,return false,else return true
   * @returns bool
   */
  checkLoadingProgress() {
    const { dataLoading, loadSuccess } = this.state;

    return dataLoading || !loadSuccess;
  }

  /**
   * check operability,if loading or or processing or load fail,return false,else return true
   * @returns bool
   */
  checkOperability() {
    const { dataLoading, processing, loadSuccess } = this.state;

    return dataLoading || processing || !loadSuccess;
  }

  /**
   * check in progress,if loading or or processing,return false,else return true
   * @returns bool
   */
  checkInProgress() {
    const { dataLoading, processing } = this.state;

    return dataLoading || processing;
  }

  renderFurther() {
    return null;
  }

  render() {
    this.showRenderCount();

    return this.renderFurther();
  }
}

export default Base;
