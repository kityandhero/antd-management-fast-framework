import { Component } from 'react';

import { dispatch } from 'easy-soft-dva';
import {
  checkHasMore as checkHasMoreCore,
  getGuid,
  handleAuthenticationFail,
  handleAuthorizationFail,
  isFunction,
  isNumber,
  logCallTrack as logCallTrackCore,
  logError,
  logExecute,
  logRender as logRenderCore,
  logTrace,
  mergeTextMessage,
  navigateTo,
  redirectTo,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  defaultBaseState,
  filterUpdateModel,
  logRenderFurther,
  shallowUpdateEqual,
  shouldComponentUpdateResultShowType,
} from 'antd-management-fast-common';

const defaultProps = {
  showRenderCount: false,
  hidden: false,
};

/**
 * Refined PureComponent, it is usually used in load remote api scenarios
 */
class AbstractComponent extends Component {
  mounted = false;

  preventRender = false;

  forceUpdateWhenChildrenChange = true;

  //#region develop assist

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  showShouldComponentUpdateInConsole = shouldComponentUpdateResultShowType.none;

  renderCount = 0;

  showCallTrack = false;

  //#endregion

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */
  keyPrefix = '';

  loadRemoteRequestAfterMount = false;

  /**
   * 需要登录后才能访问
   */
  needSignIn = false;

  autoRedirectToSignIn = true;

  /**
   * 权限数据
   */
  componentAuthority = null;

  componentName = '';
  ignoreComparePropertyKeyCollection = [];

  //#region fieldConfig

  fieldConfig = {
    dateRangeFieldName: '发生时间',
  };

  //#endregion

  //#region filter values

  paramsKey = '';

  filterFormValues = {};

  filterNoFormValues = {};

  filterExtraValues = {
    startTimeAlias: '',
    startTime: '',
    endTimeAlias: '',
    endTime: '',
  };

  //#endregion

  //#region sorter values

  sorterValues = {};

  //#endregion

  //#region page Values

  pageValues = {
    pageNo: 1,
    frontendPageNo: 1,
    pageSize: 10,
  };

  //#endregion

  constructor(properties) {
    super(properties);

    this.mounted = false;
    this.componentName = this.constructor.name;

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
    const { dispatchComplete = true } = {
      dispatchComplete: true,
      ...nextState,
    };

    if (this.preventRender || !dispatchComplete) {
      logTrace(
        'ignore render',
        `preventRender: ${this.preventRender}, dispatchComplete: ${dispatchComplete}`,
      );

      return false;
    }

    // compare the children ref or value changed
    const childrenChanged =
      (nextProperties.children || '') != (this.props.children || '');

    if (this.forceUpdateWhenChildrenChange && childrenChanged) {
      return true;
    }

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProperties,
      nextState,
    );

    if ((checkComponentUpdate || null) != null && !!checkComponentUpdate) {
      this.doWorkBeforeUpdate(nextProperties, nextState);

      return !!checkComponentUpdate;
    }

    const nextPropertiesIgnoreModel = filterUpdateModel(
      nextProperties,
      this.ignoreComparePropertyKeyCollection,
    );
    const currentPropertiesIgnoreModel = filterUpdateModel(
      this.props,
      this.ignoreComparePropertyKeyCollection,
    );

    const comparePropertiesResult = !shallowUpdateEqual(
      nextPropertiesIgnoreModel,
      currentPropertiesIgnoreModel,
    );

    const compareStateResult = !shallowUpdateEqual(nextState, this.state);

    const compareResult = comparePropertiesResult || compareStateResult;

    switch (this.showShouldComponentUpdateInConsole) {
      case shouldComponentUpdateResultShowType.none: {
        break;
      }

      case shouldComponentUpdateResultShowType.all: {
        logTrace(
          {
            propsHaveChanges: comparePropertiesResult,
            stateHaveChanges: compareStateResult,
            currentProps: currentPropertiesIgnoreModel,
            nextProps: nextPropertiesIgnoreModel,
            currentState: this.state,
            nextState,
            childrenChanged,
          },
          `${this.constructor.name}::shouldComponentUpdate -> ${
            compareResult ? 'true' : 'false'
          } -> ${compareResult ? 'will render' : 'ignore render'}`,
        );

        break;
      }

      case shouldComponentUpdateResultShowType.willRender: {
        if (compareResult) {
          logTrace(
            {
              propsHaveChanges: comparePropertiesResult,
              stateHaveChanges: compareStateResult,
              currentProps: currentPropertiesIgnoreModel,
              nextProps: nextPropertiesIgnoreModel,
              currentState: this.state,
              nextState,
              childrenChanged,
            },
            `${this.constructor.name}::shouldComponentUpdate -> true -> will render`,
          );
        }

        break;
      }

      case shouldComponentUpdateResultShowType.ignoreRender: {
        if (!compareResult) {
          logTrace(
            {
              propsHaveChanges: comparePropertiesResult,
              stateHaveChanges: compareStateResult,
              currentProps: currentPropertiesIgnoreModel,
              nextProps: nextPropertiesIgnoreModel,
              currentState: this.state,
              nextState,
            },
            `${this.constructor.name}::shouldComponentUpdate -> false -> ignore render`,
          );
        }

        break;
      }

      default: {
        break;
      }
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

  // eslint-disable-next-line no-unused-vars
  judgeShowRenderCountInConsole = () => {
    const { showRenderCount } = this.props;

    return this.showRenderCountInConsole || !!showRenderCount || false;
  };

  increaseCounter(callback) {
    const { counter } = this.state;

    this.setState(
      {
        counter: (isNumber(counter) ? toNumber(counter) : 0) + 1,
      },
      () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    );

    logExecute('increaseCounter', `counter: ${counter}`);
  }

  doDidMountTask = () => {
    this.mounted = true;

    const checkAuthenticationResult = this.checkAuthentication();

    if (checkAuthenticationResult) {
      const checkAuthorizationResult = this.checkAuthorization();

      if (checkAuthorizationResult) {
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
        this.doWorkWhenCheckAuthorizationFail();
      }
    } else {
      this.doWorkWhenCheckAuthenticationFail();
    }
  };

  checkAuthentication = () => {
    return true;
  };

  checkAuthorization = () => {
    return true;
  };

  doWorkWhenCheckAuthenticationFail = () => {
    logExecute('doWorkWhenCheckAuthenticationFail');

    handleAuthenticationFail();
  };

  doWorkWhenCheckAuthorizationFail = () => {
    logExecute('doWorkWhenCheckAuthorizationFail');

    handleAuthorizationFail();
  };

  doOtherCheckComponentUpdate = () => {
    return null;
  };

  doWorkBeforeAdjustDidMount = () => {};

  doWorkAdjustDidMount = () => {};

  doWorkAfterAdjustDidMount = () => {};

  doWorkAfterDidMount = () => {};

  doLoadRemoteRequest = () => {};

  doOtherRemoteRequest = () => {};

  doOtherWorkAfterDidMount = () => {};

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (nextProperties, nextState) => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {};

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProperties, preState) => {
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

  dispatchApi = ({ type, payload, alias = 'data' }) => {
    return dispatch({ type, payload, alias });
  };

  goToPath = (path, withProgress = false) => {
    const location = {
      pathname: path,
    };

    navigateTo({ ...location, withProgress });
  };

  redirectToPath = (path, withProgress = false) => {
    const location = {
      pathname: path,
    };

    redirectTo({ ...location, withProgress });
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
    if (this.judgeShowRenderCountInConsole()) {
      this.renderCount += 1;

      const text = mergeTextMessage(
        `renderFrequency: ${this.renderCount}`,
        this.constructor.name,
      );

      logTrace(text);
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

  logRender(message) {
    logRenderCore(this.constructor.name, message);
  }

  /**
   * log call track
   * @param {*} message
   * @returns
   */
  logCallTrack(data, message) {
    if (!this.showCallTrack) {
      return;
    }

    logCallTrackCore(data, message);
  }

  renderFurther() {
    return null;
  }

  setPageValue(o) {
    this.pageValues = {
      ...this.pageValues,
      ...o,
    };

    this.logCallTrack(this.pageValues, 'setPageValue');
  }

  openPreventRender() {
    this.preventRender = true;

    logTrace(
      'openPreventRender',
      `preventRender change to ${this.preventRender}`,
    );
  }

  closePreventRender() {
    this.preventRender = false;

    logTrace(
      'closePreventRender',
      `preventRender change to ${this.preventRender}`,
    );
  }

  /**
   * render the practical view
   */
  renderPracticalView() {
    logRenderFurther(this.constructor.name);

    if (!this.checkAuthentication() || !this.checkAuthorization()) {
      return null;
    }

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
