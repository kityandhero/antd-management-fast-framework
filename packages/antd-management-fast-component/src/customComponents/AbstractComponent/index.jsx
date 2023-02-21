import nprogress from 'nprogress';
import { Component } from 'react';

import {
  checkHasMore as checkHasMoreCore,
  getGuid,
  isEqual,
  isFunction,
  isNumber,
  isObject,
  logConfig,
  logDebug,
  logError,
  logExecute,
  logObject,
  logText,
  navigateTo,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import { defaultBaseState, getUseNprogress } from 'antd-management-fast-common';

function filterModel(properties) {
  const result = { ...properties };

  delete result.loading;

  for (const o of Object.entries(result)) {
    const [k, v] = o;

    if (isObject(v) && !!v.fromRemote) {
      delete result[k];
    }
  }

  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false.
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(a, b) {
  return isEqual(a, b);
}

const defaultProps = {
  showRenderCount: false,
  hidden: false,
};

class AbstractComponent extends Component {
  mounted = false;

  loadRemoteRequestAfterMount = false;

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */
  keyPrefix = '';

  /**
   * 需要登录后才能访问
   */
  needSignIn = false;

  autoRedirectToSignIn = true;

  /**
   * 权限数据
   */
  componentAuthority = null;

  constructor(properties) {
    super(properties);

    this.mounted = false;

    const defaultState = defaultBaseState();

    this.state = {
      ...defaultState,

      error: null,
      errorInfo: null,
      counter: 0,
    };

    this.keyPrefix = getGuid();
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(_nextProperties, _previousState) {
    return null;
  }

  componentDidMount() {
    this.doDidMountTask();
  }

  shouldComponentUpdate(nextProperties, nextState) {
    const { dispatchComplete } = {
      dispatchComplete: true,
      ...nextState,
    };

    if (!dispatchComplete) {
      return false;
    }

    this.adjustShowRenderCountInConsole(nextProperties, nextState);

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProperties,
      nextState,
    );

    if ((checkComponentUpdate || null) != null && !!checkComponentUpdate) {
      this.doWorkBeforeUpdate(nextProperties, nextState);

      return !!checkComponentUpdate;
    }

    const nextPropertiesIgnoreModel = filterModel(nextProperties);
    const currentPropertiesIgnoreModel = filterModel(this.props);

    const comparePropertiesResult = !shallowEqual(
      nextPropertiesIgnoreModel,
      currentPropertiesIgnoreModel,
    );

    const compareStateResult = !shallowEqual(nextState, this.state);

    const compareResult = comparePropertiesResult || compareStateResult;

    if (this.showRenderCountInConsole && compareResult) {
      logObject({
        message: 'shouldComponentUpdate:true',
        nextPropsIgnoreModel: nextPropertiesIgnoreModel,
        currentPropsIgnoreModel: currentPropertiesIgnoreModel,
        comparePropsResult: comparePropertiesResult,
        nextState,
        currentState: this.state,
        compareStateResult,
      });
    }

    if (compareResult) {
      this.doWorkBeforeUpdate(nextProperties, nextState);
    }

    return compareResult;
  }

  componentDidCatchError(error, info) {
    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProperties, preState) {
    return this.doWorkWhenGetSnapshotBeforeUpdate(preProperties, preState);
  }

  componentDidUpdate(preProperties, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProperties, preState, snapshot);
  }

  componentWillUnmount() {
    this.doWorkBeforeUnmount();

    this.mounted = false;

    this.doWorkAfterUnmount();

    this.setState = () => {};
  }

  increaseCounter(callback) {
    const { counter } = this.state;

    this.setState(
      {
        counter: isNumber(counter) ? toNumber(counter) : 0 + 1,
      },
      () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    );
  }

  doDidMountTask = () => {
    this.mounted = true;

    const checkNeedSignInDidMountResult = this.checkNeedSignInDidMount();

    if (checkNeedSignInDidMountResult) {
      const checkPermissionResult = this.checkPermission();

      if (checkPermissionResult) {
        this.doWorkBeforeAdjustDidMount();

        this.doWorkAdjustDidMount();

        this.doWorkAfterAdjustDidMount();

        this.doWorkAfterDidMount();

        if (this.loadRemoteRequestAfterMount) {
          this.doLoadRemoteRequest();
        }

        this.doOtherRemoteRequest();

        this.doOtherWorkAfterDidMount();
      } else {
        this.doWorkWhenCheckPermission();
      }
    } else {
      this.doWorkWhenCheckNeedSignInDidMountFail();
    }
  };

  checkNeedSignInDidMount = () => {
    return true;
  };

  checkPermission = () => {
    return true;
  };

  doWorkWhenCheckNeedSignInDidMountFail = () => {
    logExecute('doWorkWhenCheckNeedSignInDidMountFail');
    logConfig(
      'doWorkWhenCheckNeedSignInDidMountFail do nothing,if you need,you can override it: doWorkWhenCheckNeedSignInDidMountFail = () => {}',
    );
  };

  doWorkWhenCheckPermissionFail = () => {
    logExecute('doWorkWhenCheckPermissionFail');
    logConfig(
      'doWorkWhenCheckPermissionFail do nothing,if you need,you can override it: doWorkWhenCheckPermissionFail = () => {}',
    );
  };

  // eslint-disable-next-line no-unused-vars
  adjustShowRenderCountInConsole = (_nextProperties, _nextState) => {};

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (_nextProperties, _nextState) => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (_preProperties, _preState, _snapshot) => {};

  doOtherCheckComponentUpdate = () => {
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (_preProperties, _preState) => {
    return null;
  };

  doWhenCatchError = (error, info) => {
    showSimpleErrorMessage('error occurred, please view in console.');

    logError({
      error,
      info,
    });
  };

  doWorkBeforeUnmount = () => {};

  doWorkAfterUnmount = () => {};

  getMetaData = () => {
    const text = 'please override getMetaData, and return a object';

    logError(text);

    throw new Error(text);
  };

  getDispatch = () => {
    const text = 'please override getDispatch, and return a function';

    logError(text);

    throw new Error(text);
  };

  getDispatchWrapper = () => {
    const dispatch = this.getDispatch();

    if (!isFunction(dispatch)) {
      logError('dispatch not a function, please check getDispatch');
    }

    return dispatch;
  };

  dispatchApi = ({ type, payload, alias = 'data' }) => {
    const dispatch = this.getDispatchWrapper();

    logDebug(`model access: ${type}`);

    return dispatch({ type, payload, alias });
  };

  goToPath = (path) => {
    const location = {
      pathname: path,
    };

    if (getUseNprogress()) {
      nprogress.inc();

      setTimeout(() => {
        nprogress.done();
      }, 400);
    }

    navigateTo(location);
  };

  redirectToPath = (path) => {
    const location = {
      pathname: path,
    };

    if (getUseNprogress()) {
      nprogress.inc();

      setTimeout(() => {
        nprogress.done();
      }, 400);
    }

    navigateTo(location);
  };

  checkHasMore = (pageNo, pageSize, total) => {
    return checkHasMoreCore({ pageNo, pageSize, total });
  };

  /**
   * 当登录失败时调用
   * @param {*} remoteData [object] 远程返回数据
   * @param {*} callback [function] 登录失败回调函数
   */
  // eslint-disable-next-line no-unused-vars
  doWhenAuthorizeFail = (remoteData, callback) => {
    if (isFunction(callback)) {
      callback(remoteData);
    }
  };

  /**
   * 登录失败时的回调定义
   * @param {Object} remoteData [object] 远程返回数据
   */
  // eslint-disable-next-line no-unused-vars
  authorizeFailCallback = (remoteData) => {};

  showRenderCount() {
    if (this.showRenderCountInConsole) {
      this.renderCount += 1;

      this.constructor.name;

      const text = `${this.constructor.name},renderFrequency:${this.renderCount}`;

      logText(text);
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

  /**
   * render the practical view
   */
  renderPracticalView() {
    return this.renderFurther();
  }

  render() {
    const { hidden } = this.props;

    if (hidden) {
      return null;
    }

    this.showRenderCount();

    return this.renderPracticalView();
  }
}

AbstractComponent.defaultProps = {
  ...defaultProps,
};

export { AbstractComponent };
