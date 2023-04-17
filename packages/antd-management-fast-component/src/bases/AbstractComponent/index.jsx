import { Component } from 'react';

import { dispatch } from 'easy-soft-dva';
import {
  checkHasMore as checkHasMoreCore,
  getGuid,
  handleAuthenticationFail,
  handleAuthorizationFail,
  isFunction,
  isNumber,
  logCallTrace as logCallTraceCore,
  logCallTrack as logCallTrackCore,
  logError,
  logRender as logRenderCore,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  navigateTo,
  redirectTo,
  showSimpleErrorMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  defaultBaseState,
  filterUpdateModel,
  shallowUpdateEqual,
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

  //#region view control

  preventRender = false;

  forceUpdateWhenChildrenChange = true;

  //#endregion

  //#region develop assist

  /**
   *显示render次数开关, 用于开发时候调试页面渲染性能
   */
  showRenderCountInConsole = false;

  renderCount = 0;

  /**
   * show process call information，display call track and call trace in console
   */
  showCallProcess = false;

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
      this.logCallTrack(
        {},
        'AbstractComponent',
        'shouldComponentUpdate',
        `preventRender: ${this.preventRender}, dispatchComplete: ${dispatchComplete}, force ignore render`,
      );

      return false;
    } else {
      this.logCallTrack(
        {
          parameter: { nextProperties, nextState },
        },
        'AbstractComponent',
        'shouldComponentUpdate',
        `preventRender: ${this.preventRender}, dispatchComplete: ${dispatchComplete}, use normal render check`,
      );
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

    this.logCallTrace(
      compareResult
        ? {
            propsHaveChanges: comparePropertiesResult,
            stateHaveChanges: compareStateResult,
            currentProps: currentPropertiesIgnoreModel,
            nextProps: nextPropertiesIgnoreModel,
            currentState: this.state,
            nextState,
            childrenChanged,
          }
        : {},
      'AbstractComponent',
      'shouldComponentUpdate',
      compareResult ? 'true' : 'false',
      compareResult ? 'will render' : 'ignore render',
    );

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

    logTrace(this.componentName, 'Unmount');
  }

  // eslint-disable-next-line no-unused-vars
  judgeShowRenderCountInConsole = () => {
    const { showRenderCount } = this.props;

    return this.showRenderCountInConsole || !!showRenderCount || false;
  };

  increaseCounter({ callback = null }) {
    const { counter } = this.state;

    const nextCounter = (isNumber(counter) ? toNumber(counter) : 0) + 1;

    this.logCallTrack(
      {},
      'AbstractComponent',
      'increaseCounter',
      `next counter: ${nextCounter}`,
    );

    this.setState(
      {
        counter: nextCounter,
      },
      () => {
        if (isFunction(callback)) {
          callback();
        }
      },
    );
  }

  doDidMountTask = () => {
    this.logCallTrack({}, 'AbstractComponent', 'doDidMountTask');

    this.mounted = true;

    const checkAuthenticationResult = this.checkAuthentication();

    if (checkAuthenticationResult) {
      this.logCallTrace(
        {},
        'AbstractComponent',
        'doDidMountTask',
        'checkAuthenticationResult',
        true,
      );

      const checkAuthorizationResult = this.checkAuthorization();

      if (checkAuthorizationResult) {
        this.logCallTrace(
          {},
          'AbstractComponent',
          'doDidMountTask',
          'checkAuthorizationResult',
          true,
        );

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
        this.logCallTrace(
          {},
          'AbstractComponent',
          'doDidMountTask',
          'checkAuthorizationResult',
          false,
        );

        this.doWorkWhenCheckAuthorizationFail();
      }
    } else {
      this.logCallTrace(
        {},
        'AbstractComponent',
        'doDidMountTask',
        'checkAuthenticationResult',
        false,
      );

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
    this.logCallTrack(
      {},
      'AbstractComponent',
      'doWorkWhenCheckAuthenticationFail',
    );

    handleAuthenticationFail();
  };

  doWorkWhenCheckAuthorizationFail = () => {
    this.logCallTrack(
      {},
      'AbstractComponent',
      'doWorkWhenCheckAuthorizationFail',
    );

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

  logRender(message) {
    logRenderCore(this.constructor.name, message);
  }

  /**
   * log call track
   * @param {*} message
   */
  logCallTrack(data, ...messages) {
    if (!this.showCallProcess) {
      return;
    }

    logCallTrackCore(data, mergeArrowText(this.componentName, ...messages));
  }

  /**
   * log call trace
   * @param {*} message
   */
  logCallTrace(data, ...messages) {
    if (!this.showCallProcess) {
      return;
    }

    logCallTraceCore(data, mergeArrowText(this.componentName, ...messages));
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

    this.logCallTrace(
      'openPreventRender',
      `preventRender change to ${this.preventRender}`,
    );
  }

  closePreventRender() {
    this.preventRender = false;

    this.logCallTrace(
      'closePreventRender',
      `preventRender change to ${this.preventRender}`,
    );
  }

  /**
   * render the practical view
   */
  renderPracticalView() {
    if (!this.checkAuthentication() || !this.checkAuthorization()) {
      return null;
    }

    this.logCallTrace({}, '-------------render start----------------');

    const c = this.renderFurther();

    this.logCallTrace({}, '-------------render end------------------');

    return c;
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
