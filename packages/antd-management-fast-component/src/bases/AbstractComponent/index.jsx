import { Component } from 'react';

import { dispatch } from 'easy-soft-dva';
import {
  checkHasMore as checkHasMoreCore,
  getGuid,
  handleAuthenticationFail,
  handleAuthorizationFail,
  isFunction,
  isNumber,
  logCallResult as logCallResultCore,
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
  toString,
} from 'easy-soft-utility';

import {
  defaultBaseState,
  emptyLogic,
  filterUpdateModel,
  shallowUpdateEqual,
} from 'antd-management-fast-common';

const defaultProps = {
  showRenderCount: false,
  hidden: false,
};

const primaryCallName = 'bases::AbstractComponent';

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

  showCallProcessSwitchPromptComplete = false;

  showUnmountInConsole = false;

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
  static getDerivedStateFromProps(nextProperties, previousState) {
    return null;
  }

  componentDidMount() {
    this.logCallTrack({}, primaryCallName, 'componentDidMount');

    this.doDidMountTask();

    this.logCallTrace(
      this,
      primaryCallName,
      'componentDidMount complete',
      'instance information',
    );
  }

  shouldComponentUpdate(nextProperties, nextState) {
    const { dispatchComplete = true } = {
      dispatchComplete: true,
      ...nextState,
    };

    if (this.preventRender || !dispatchComplete) {
      this.logCallTrack(
        {},
        primaryCallName,
        'shouldComponentUpdate',
        `preventRender: ${this.preventRender}, dispatchComplete: ${dispatchComplete}, force ignore render`,
      );

      return false;
    } else {
      this.logCallTrack(
        {
          parameter: { nextProperties, nextState },
        },
        primaryCallName,
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

    this.logCallTrace(
      {},
      primaryCallName,
      'shouldComponentUpdate',
      'trigger',
      'doOtherCheckComponentUpdate',
    );

    const checkComponentUpdate = this.doOtherCheckComponentUpdate(
      nextProperties,
      nextState,
    );

    if ((checkComponentUpdate || null) != null && !!checkComponentUpdate) {
      this.logCallTrace(
        {},
        primaryCallName,
        'shouldComponentUpdate',
        'trigger',
        'doWorkBeforeUpdate',
      );

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
      primaryCallName,
      'shouldComponentUpdate',
      compareResult ? 'true' : 'false',
      compareResult ? 'will render' : 'ignore render',
    );

    if (compareResult) {
      this.logCallTrace(
        {},
        primaryCallName,
        'shouldComponentUpdate',
        'trigger',
        'doWorkBeforeUpdate',
      );

      this.doWorkBeforeUpdate(nextProperties, nextState);
    }

    return compareResult;
  }

  componentDidCatchError(error, info) {
    this.logCallTrack(
      {
        error,
        info,
      },
      primaryCallName,
      'componentDidCatchError',
    );

    this.logCallTrace(
      {},
      primaryCallName,
      'componentDidCatchError',
      'trigger',
      'doWhenCatchError',
    );

    this.doWhenCatchError(error, info);
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProperties, preState) {
    this.logCallTrack({}, primaryCallName, 'getSnapshotBeforeUpdate');

    this.logCallTrace(
      {},
      primaryCallName,
      'componentDidUpdate',
      'trigger',
      'getSnapshotBeforeUpdate',
    );

    return this.doWorkWhenGetSnapshotBeforeUpdate(preProperties, preState);
  }

  componentDidUpdate(preProperties, preState, snapshot) {
    this.logCallTrack({}, primaryCallName, 'componentDidUpdate');

    this.logCallTrace(
      {},
      primaryCallName,
      'componentDidUpdate',
      'trigger',
      'doWorkWhenDidUpdate',
    );

    this.doWorkWhenDidUpdate(preProperties, preState, snapshot);
  }

  componentWillUnmount() {
    this.logCallTrack({}, primaryCallName, 'componentWillUnmount');

    this.logCallTrace(
      {},
      primaryCallName,
      'componentWillUnmount',
      'trigger',
      'doWorkBeforeUnmount',
    );

    this.doWorkBeforeUnmount();

    this.mounted = false;

    this.logCallTrace(
      {},
      primaryCallName,
      'componentWillUnmount',
      'trigger',
      'doWorkAfterUnmount',
    );

    this.doWorkAfterUnmount();

    this.setState = () => {};

    if (this.showUnmountInConsole) {
      logTrace(this.componentName, 'Unmount');
    }
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
      primaryCallName,
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
    this.logCallTrack({}, primaryCallName, 'doDidMountTask');

    this.mounted = true;

    this.logCallTrace(
      {},
      primaryCallName,
      'doDidMountTask',
      'trigger',
      'checkAuthentication',
    );

    const checkAuthenticationResult = this.checkAuthentication();

    if (checkAuthenticationResult) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doDidMountTask',
        'checkAuthenticationResult',
        true,
      );

      this.logCallTrace(
        {},
        primaryCallName,
        'doDidMountTask',
        'trigger',
        'checkAuthorization',
      );

      const checkAuthorizationResult = this.checkAuthorization();

      if (checkAuthorizationResult) {
        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'checkAuthorizationResult',
          true,
        );

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doWorkBeforeAdjustDidMount',
        );

        this.doWorkBeforeAdjustDidMount();

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doWorkAdjustDidMount',
        );

        this.doWorkAdjustDidMount();

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doWorkAfterAdjustDidMount',
        );

        this.doWorkAfterAdjustDidMount();

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doWorkAfterDidMount',
        );

        this.doWorkAfterDidMount();

        if (this.loadRemoteRequestAfterMount) {
          this.logCallTrace(
            {},
            primaryCallName,
            'doDidMountTask',
            'trigger',
            'doLoadRemoteRequest',
          );

          this.doLoadRemoteRequest();
        }

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doOtherRemoteRequest',
        );

        this.doOtherRemoteRequest();

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doOtherWorkAfterDidMount',
        );

        this.doOtherWorkAfterDidMount();
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'checkAuthorizationResult',
          false,
        );

        this.logCallTrace(
          {},
          primaryCallName,
          'doDidMountTask',
          'trigger',
          'doWorkWhenCheckAuthorizationFail',
        );

        this.doWorkWhenCheckAuthorizationFail();
      }
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'doDidMountTask',
        'checkAuthenticationResult',
        false,
      );

      this.logCallTrace(
        {},
        primaryCallName,
        'doDidMountTask',
        'trigger',
        'doWorkWhenCheckAuthenticationFail',
      );

      this.doWorkWhenCheckAuthenticationFail();
    }
  };

  checkAuthentication = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'checkAuthentication',
      'default value',
      toString(true),
    );

    return true;
  };

  checkAuthorization = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'checkAuthorization',
      'default value',
      toString(true),
    );

    return true;
  };

  doWorkWhenCheckAuthenticationFail = () => {
    this.logCallTrack({}, primaryCallName, 'doWorkWhenCheckAuthenticationFail');

    this.logCallTrace(
      {},
      primaryCallName,
      'doWorkWhenCheckAuthenticationFail',
      'trigger',
      'handleAuthenticationFail',
    );

    handleAuthenticationFail();
  };

  doWorkWhenCheckAuthorizationFail = () => {
    this.logCallTrack({}, primaryCallName, 'doWorkWhenCheckAuthorizationFail');

    this.logCallTrace(
      {},
      primaryCallName,
      'doWorkWhenCheckAuthorizationFail',
      'trigger',
      'handleAuthorizationFail',
    );

    handleAuthorizationFail();
  };

  doOtherCheckComponentUpdate = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doOtherCheckComponentUpdate',
      emptyLogic,
    );

    return null;
  };

  doWorkBeforeAdjustDidMount = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doWorkBeforeAdjustDidMount',
      emptyLogic,
    );
  };

  doWorkAdjustDidMount = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doWorkAdjustDidMount',
      emptyLogic,
    );
  };

  doWorkAfterAdjustDidMount = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doWorkAfterAdjustDidMount',
      emptyLogic,
    );
  };

  doWorkAfterDidMount = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doWorkAfterDidMount',
      emptyLogic,
    );
  };

  doLoadRemoteRequest = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doLoadRemoteRequest',
      emptyLogic,
    );
  };

  doOtherRemoteRequest = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doOtherRemoteRequest',
      emptyLogic,
    );
  };

  doOtherWorkAfterDidMount = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doDidMountTask',
      'doOtherWorkAfterDidMount',
      emptyLogic,
    );
  };

  // eslint-disable-next-line no-unused-vars
  doWorkBeforeUpdate = (nextProperties, nextState) => {
    this.logCallTrack({}, primaryCallName, 'doWorkBeforeUpdate', emptyLogic);
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    this.logCallTrack({}, primaryCallName, 'doWorkWhenDidUpdate', emptyLogic);
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProperties, preState) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doWorkWhenGetSnapshotBeforeUpdate',
      emptyLogic,
    );

    return null;
  };

  doWhenCatchError = (error, info) => {
    showSimpleErrorMessage('error occurred, please view in console.');

    logError({
      error,
      info,
    });
  };

  doWorkBeforeUnmount = () => {
    this.logCallTrack({}, primaryCallName, 'doWorkBeforeUnmount', emptyLogic);
  };

  doWorkAfterUnmount = () => {
    this.logCallTrack({}, primaryCallName, 'doWorkAfterUnmount', emptyLogic);
  };

  dispatchApi = ({
    type,
    payload,
    alias = 'data',
    pretreatmentSuccessCallback = null,
    pretreatmentFailCallback = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          type,
          payload,
          alias,
          pretreatmentSuccessCallback,
          pretreatmentFailCallback,
        },
      },
      primaryCallName,
      'dispatchApi',
    );

    return dispatch({
      type,
      payload,
      alias,
      pretreatmentSuccessCallback: pretreatmentSuccessCallback || null,
      pretreatmentFailCallback: pretreatmentFailCallback || null,
    });
  };

  goToPath = (path, withProgress = false) => {
    this.logCallTrack(
      {
        parameter: {
          path,
          withProgress,
        },
      },
      primaryCallName,
      'goToPath',
    );

    const location = {
      pathname: path,
    };

    navigateTo({ ...location, withProgress });
  };

  redirectToPath = (path, withProgress = false) => {
    this.logCallTrack(
      {
        parameter: {
          path,
          withProgress,
        },
      },
      primaryCallName,
      'redirectToPath',
    );

    const location = {
      pathname: path,
    };

    redirectTo({ ...location, withProgress });
  };

  checkHasMore = (pageNo, pageSize, total) => {
    this.logCallTrack(
      {
        parameter: {
          pageNo,
          pageSize,
          total,
        },
      },
      primaryCallName,
      'checkHasMore',
    );

    return checkHasMoreCore({ pageNo, pageSize, total });
  };

  /**
   * 当登录失败时调用
   * @param {*} remoteData [object] 远程返回数据
   * @param {*} callback [function] 登录失败回调函数
   */
  doWhenAuthorizeFail = (remoteData, callback) => {
    this.logCallTrack(
      {
        parameter: {
          remoteData,
        },
      },
      primaryCallName,
      'doWhenAuthorizeFail',
    );

    if (isFunction(callback)) {
      callback(remoteData);
    }
  };

  /**
   * 登录失败时的回调定义
   * @param {Object} remoteData [object] 远程返回数据
   */
  authorizeFailCallback = (remoteData) => {
    this.logCallTrack(
      {
        parameter: {
          remoteData,
        },
      },
      primaryCallName,
      'doWhenAuthorizeFail',
      emptyLogic,
    );
  };

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

  promptCallProcessSwitch = () => {};

  /**
   * log call track
   * @param {*} message
   */
  logCallTrack(data, ...messages) {
    if (!this.showCallProcess) {
      this.promptCallProcessSwitch();

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
      this.promptCallProcessSwitch();

      return;
    }

    logCallTraceCore(data, mergeArrowText(this.componentName, ...messages));
  }

  /**
   * log call result
   * @param {*} message
   */
  logCallResult(data, ...messages) {
    if (!this.showCallProcess) {
      this.promptCallProcessSwitch();

      return;
    }

    logCallResultCore(data, mergeArrowText(this.componentName, ...messages));
  }

  buildOverloadErrorText(...texts) {
    return mergeArrowText(
      this.componentName,
      'need overrode to implement',
      ...texts,
    );
  }

  renderFurther() {
    return null;
  }

  setPageValue(o) {
    this.logCallTrack(
      {
        parameter: {
          o,
        },
      },
      primaryCallName,
      'setPageValue',
    );

    this.pageValues = {
      ...this.pageValues,
      ...o,
    };

    this.logCallTrack(this.pageValues, 'setPageValue');
  }

  openPreventRender() {
    this.logCallTrack({}, primaryCallName, 'openPreventRender');

    this.preventRender = true;

    this.logCallTrace(
      'openPreventRender',
      `preventRender change to ${this.preventRender}`,
    );
  }

  closePreventRender(triggerRender = false) {
    this.logCallTrack(
      {
        parameter: {
          triggerRender,
        },
      },
      primaryCallName,
      'closePreventRender',
    );

    this.preventRender = false;

    this.logCallTrace(
      'closePreventRender',
      `preventRender change to ${this.preventRender}`,
    );

    if (triggerRender && isFunction(this.increaseCounter)) {
      this.increaseCounter({});
    }
  }

  /**
   * render the practical view
   */
  renderPracticalView() {
    this.logCallTrack({}, primaryCallName, 'renderPracticalView');

    if (!this.checkAuthentication() || !this.checkAuthorization()) {
      return null;
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'renderPracticalView',
      'trigger',
      'renderFurther',
    );

    this.logCallTrace({}, '-------------render further start----------------');

    const c = this.renderFurther();

    this.logCallTrace({}, '-------------render further end------------------');

    return c;
  }

  render() {
    const { hidden } = this.props;

    if (hidden) {
      this.logCallTrack({}, primaryCallName, 'render', emptyLogic);

      return null;
    }

    this.logCallTrack({}, primaryCallName, 'render');

    this.showRenderCount();

    this.logCallTrace(
      {},
      primaryCallName,
      'render',
      'trigger',
      'renderPracticalView',
    );

    return this.renderPracticalView();
  }
}

AbstractComponent.defaultProps = {
  ...defaultProps,
};

export { AbstractComponent };
