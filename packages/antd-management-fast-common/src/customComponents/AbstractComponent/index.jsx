import nprogress from 'nprogress';
import { Component } from 'react';

import {
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

import { runtimeSettings } from '../../utils/dynamicSetting';
import { defaultBaseState } from '../../utils/meta';

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

  constructor(props) {
    super(props);

    this.mounted = false;

    const defaultState = defaultBaseState();

    this.state = {
      ...defaultState,
      ...{
        error: null,
        errorInfo: null,
        counter: 0,
      },
    };

    this.keyPrefix = getGuid();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    this.doDidMountTask();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { dispatchComplete } = {
      ...{ dispatchComplete: true },
      ...nextState,
    };

    if (!!!dispatchComplete) {
      return false;
    }

    this.adjustShowRenderCountInConsole(nextProps, nextState);

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProps,
      nextState,
    );

    if ((checkComponentUpdate || null) != null) {
      if (!!checkComponentUpdate) {
        this.doWorkBeforeUpdate(nextProps, nextState);

        return !!checkComponentUpdate;
      }
    }

    const nextPropsIgnoreModel = filterModel(nextProps);
    const currentPropsIgnoreModel = filterModel(this.props);

    const comparePropsResult = !shallowEqual(
      nextPropsIgnoreModel,
      currentPropsIgnoreModel,
    );

    const compareStateResult = !shallowEqual(nextState, this.state);

    const compareResult = comparePropsResult || compareStateResult;

    if (this.showRenderCountInConsole && compareResult) {
      logObject({
        message: 'shouldComponentUpdate:true',
        nextPropsIgnoreModel,
        currentPropsIgnoreModel,
        comparePropsResult,
        nextState,
        currentState: this.state,
        compareStateResult,
      });
    }

    if (compareResult) {
      this.doWorkBeforeUpdate(nextProps, nextState);
    }

    return compareResult;
  }

  componentDidCatchError(error, info) {
    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProps, preState) {
    return this.doWorkWhenGetSnapshotBeforeUpdate(preProps, preState);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProps, preState, snapshot);
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

  doWorkBeforeAdjustDidMount = () => {};

  doDidMountTask = () => {
    this.mounted = true;

    const checkNeedSignInDidMountResult = this.checkNeedSignInDidMount();

    if (!checkNeedSignInDidMountResult) {
      this.doWorkWhenCheckNeedSignInDidMountFail();
    } else {
      const checkPermissionResult = this.checkPermission();

      if (!checkPermissionResult) {
        this.doWorkWhenCheckPermission();
      } else {
        this.doWorkBeforeAdjustDidMount();

        this.doWorkAdjustDidMount();

        this.doWorkAfterAdjustDidMount();

        this.doWorkAfterDidMount();

        if (this.loadRemoteRequestAfterMount) {
          this.doLoadRemoteRequest();
        }

        this.doOtherRemoteRequest();

        this.doOtherWorkAfterDidMount();
      }
    }
  };

  doWorkAfterDidMount = () => {};

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  adjustShowRenderCountInConsole = (nextProps, nextState) => {};

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkBeforeUpdate = (nextProps, nextState) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {};

  doOtherCheckComponentUpdate = () => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
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

    if (runtimeSettings.getUseNprogress()) {
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

    if (runtimeSettings.getUseNprogress()) {
      nprogress.inc();

      setTimeout(() => {
        nprogress.done();
      }, 400);
    }

    navigateTo(location);
  };

  checkHasMore = (pageNo, pageSize, total) => {
    if ((total || 0) <= 0) {
      return false;
    }

    return (pageNo || 0) * (pageSize || 0) < (total || 0);
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
   * @param {*} remoteData [object] 远程返回数据
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  renderView() {
    return this.renderFurther();
  }

  render() {
    const { hidden } = this.props;

    if (hidden) {
      return null;
    }

    this.showRenderCount();

    return this.renderView();
  }
}

AbstractComponent.defaultProps = {
  ...defaultProps,
};

export { AbstractComponent };
