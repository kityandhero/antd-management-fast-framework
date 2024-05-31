import { Button } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isEmptyObject,
  isFunction,
  isNumber,
  isUndefined,
  logDevelop,
  logException,
  logObject,
  pretreatmentRequestParameters,
  showErrorMessage,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
  toNumber,
} from 'easy-soft-utility';

import {
  contentConfig,
  defaultCommonState,
  emptyLogic,
  getCurrentLocation,
  getDerivedStateFromPropertiesForUrlParameters,
  getVideoUploadMaxSize,
} from 'antd-management-fast-common';
import {
  buildFormActionItem,
  buildFormButton,
  buildFormCreateTimeField,
  buildFormHiddenWrapper,
  buildFormInput,
  buildFormInputFieldData,
  buildFormNowTimeField,
  buildFormOnlyShowText,
  buildFormOnlyShowTextarea,
  buildFormPassword,
  buildFormRadio,
  buildFormText,
  buildFormUpdateTimeField,
  buildRadioItem,
  buildSearchFormSelect,
  buildSearchInput,
  buildSearchInputNumber,
  iconBuilder,
} from 'antd-management-fast-component';

import { ElasticityExtraButton } from '../../../components/ElasticityExtraButton';
import { loadMetaData } from '../../../utils/metaDataAssist';
import { progressBarControlAssist } from '../../../utils/progressBarControlAssist';
import { reloadAnimalPromptControlAssist } from '../../../utils/reloadAnimalPromptControlAssist';
import { Core } from '../../Core';

const primaryCallName = 'Common::InternalFlow';

/**
 * 构建流程相关。
 * @namespace Common
 * @class InternalFlow
 * @extends Core
 */
class InternalFlow extends Core {
  /**
   * 在提交成功时刷新页头部数据，默认 true。
   * @member {boolean}
   */
  reloadHeaderOnSubmitSuccess = true;

  /**
   * 显示页头部，默认 true。
   * @member {boolean}
   */
  showPageHeader = true;

  /**
   * 显示重载按钮，默认 true。
   * @member {boolean}
   */
  showReloadButton = true;

  /**
   * 页包裹模式，默认 contentConfig.wrapperType.page
   * @member {string}
   */
  contentWrapperType = contentConfig.wrapperType.page;

  /**
   * 显示额外动作分割线，默认 false。
   * @member {boolean}
   */
  showExtraActionDivider = false;

  /**
   * 挂载完成后自动执行数据加载，默认 true。
   * @member {boolean}
   */
  loadRemoteRequestAfterMount = true;

  /**
   * 挂载完成后自动执行数据加载的延迟时间，默认 0。
   * @member {number}
   */
  loadRemoteRequestDelay = 0;

  /**
   * 分页数据加载的延迟时间，默认 0。
   * @member {number}
   */
  pageRemoteRequestDelay = 0;

  /**
   * 最后请求值。
   * @member {Object}
   */
  lastRequestingData = { type: '', payload: {} };

  /**
   * 构造函数
   */
  constructor(properties) {
    super(properties);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,
      backPath: '',
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  /**
   * 检测是否需要更新。
   * @function
   * @param {Object} preProperties 先前属性值。
   * @param {Object} preState 先前 state 值。
   * @param {Object} snapshot 快照。
   * @returns {boolean} 检测结果。
   */
  checkNeedUpdate = (preProperties, preState, snapshot) => {
    this.logCallTrack(
      {
        preProperties,
        preState,
        snapshot,
      },
      primaryCallName,
      'afterFirstLoadSuccess',
      emptyLogic,
      'return false',
    );

    return false;
  };

  /**
   * 执行远程数据加载请求。
   * @function
   */
  doLoadRemoteRequest = () => {
    this.logCallTrack({}, primaryCallName, 'doLoadRemoteRequest');

    const that = this;

    progressBarControlAssist.start();

    that.startLoading();

    that.openPreventRender();

    that.initLoad({
      delay: that.loadRemoteRequestDelay,
      completeCallback: () => {
        that.closePreventRender();

        that.stopLoading();

        progressBarControlAssist.stop();
      },
    });
  };

  /**
   * 首次执行远程数据加载请求的前置处理，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} requestData 请求参数。
   * @example
   * beforeFirstLoadRequest = () => {}
   */
  beforeFirstLoadRequest = (requestData) => {
    this.logCallTrack(
      { requestData },
      primaryCallName,
      'beforeFirstLoadRequest',
      emptyLogic,
    );
  };

  /**
   * 执行重载请求的前置处理，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} requestData 请求参数。
   * @example
   * beforeReLoadRequest = () => {}
   */
  beforeReLoadRequest = (requestData) => {
    this.logCallTrack(
      { requestData },
      primaryCallName,
      'beforeReLoadRequest',
      emptyLogic,
    );
  };

  /**
   * 执行请求的前置处理，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} requestData 请求参数。
   * @example
   * beforeReLoadRequest = () => {}
   */
  beforeRequest = (requestData) => {
    this.logCallTrack(
      { requestData },
      primaryCallName,
      'beforeRequest',
      emptyLogic,
    );
  };

  /**
   * 首次获取请求结果后的处理，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} requestData 请求参数。
   * @param {Object} responseData 返回数据。
   * @example
   * afterGetFirstRequestResult = () => {}
   */
  afterGetFirstRequestResult = (requestData, responseData) => {
    this.logCallTrack(
      {
        requestData,
        responseData,
      },
      primaryCallName,
      'afterGetFirstRequestResult',
      emptyLogic,
    );
  };

  /**
   * 获取请求结果后的处理，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} requestData 请求参数。
   * @param {Object} responseData 返回数据。
   * @example
   * afterGetRequestResult = () => {}
   */
  afterGetRequestResult = (requestData, responseData) => {
    this.logCallTrack(
      { requestData, responseData },
      primaryCallName,
      'afterGetRequestResult',
      emptyLogic,
    );
  };

  /**
   * 获取重载结果后的处理，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} requestData 请求参数。
   * @param {Object} responseData 返回数据。
   * @example
   * afterGetReLoadRequestResult = () => {}
   */
  afterGetReLoadRequestResult = (requestData, responseData) => {
    this.logCallTrack(
      {
        requestData,
        responseData,
      },
      primaryCallName,
      'afterGetReLoadRequestResult',
      emptyLogic,
    );
  };

  /**
   * 获取请求数据。
   * @function
   */
  getRequestingData() {
    this.logCallTrack({}, primaryCallName, 'getRequestingData');

    return this.lastRequestingData;
  }

  /**
   * 设置请求数据。
   * @function
   * @param {Object} parameters 参数。
   * @param {Function} callback 回调处理。
   */
  setRequestingData(parameters, callback) {
    this.logCallTrack({}, primaryCallName, 'setRequestingData');

    const d =
      parameters == null
        ? { type: '', payload: {} }
        : { type: '', payload: {}, ...parameters };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  /**
   * 清理请求数据。
   * @function
   */
  clearRequestingData() {
    this.logCallTrack({}, primaryCallName, 'clearRequestingData');

    this.setRequestingData({ type: '', payload: {} });
  }

  /**
   * 初始化加载请求参数，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} o 参数。
   * @returns {Object} 处理结果。
   * @example
   * initLoadRequestParams = (o) => o
   */
  initLoadRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'initLoadRequestParams',
      emptyLogic,
      'return source',
    );

    return o || {};
  };

  /**
   * 追加加载请求参数，默认为空逻辑，可根据需要重载。
   * @function
   * @param {Object} o 参数。
   * @returns {Object} 处理结果。
   * @example
   * supplementLoadRequestParams = (o) => o
   */
  supplementLoadRequestParams = (o) => {
    this.logCallTrack(
      {},
      primaryCallName,
      'supplementLoadRequestParams',
      emptyLogic,
      'return source',
    );

    return o || {};
  };

  /**
   * 检测加载请求参数，默认检测通过，可根据需要重载。
   * @function
   * @param {Object} o 参数。
   * @returns {boolean} 检测结果。
   * @example
   * checkLoadRequestParams = (o) => true
   */
  checkLoadRequestParams = (o) => {
    this.logCallTrack(
      {
        parameter: o,
      },
      primaryCallName,
      'checkLoadRequestParams',
      emptyLogic,
      'return true',
    );

    return true;
  };

  /**
   * 执行加载。
   * @function
   * @param {Object} option 配置项。
   * @param {Object} [option.requestData={}] 请求参数。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  initLoad = ({
    requestData: requestDataSource = {},
    otherState = {},
    delay = 0,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          requestData: requestDataSource,
          otherState,
          delay,
        },
      },
      primaryCallName,
      'initLoad',
    );

    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
    } = this.state;

    if (checkStringIsNullOrWhiteSpace(loadApiPath)) {
      const text = 'loadApiPath需要配置';

      showSimpleRuntimeError(text);

      if (isFunction(completeCallback)) {
        this.logCallTrace(
          {},
          primaryCallName,
          'initLoad',
          'check loadApiPath fail',
          'trigger',
          'completeCallback',
        );

        completeCallback();
      }

      return;
    }

    if (isFunction(prepareRequestSource)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'initLoadCore',
        'trigger',
        'prepareRequest',
      );

      prepareRequestSource();
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'initLoadCore',
        'trigger',
        'prepareRequest',
        emptyLogic,
      );
    }

    let submitData = this.initLoadRequestParams(requestDataSource) || {};

    submitData = pretreatmentRequestParameters(submitData || {});

    submitData = this.supplementLoadRequestParams(submitData || {});

    const checkResult = this.checkLoadRequestParams(submitData || {});

    if (!checkResult) {
      showErrorMessage('check load request params fail');

      if (isFunction(completeCallback)) {
        this.logCallTrace(
          {},
          primaryCallName,
          'initLoad',
          'check load request params fail',
          'trigger',
          'completeCallback',
        );

        completeCallback();
      }
    }

    if (!firstLoadSuccess) {
      this.beforeFirstLoadRequest(submitData || {});
    }

    if (reloadingBefore) {
      this.beforeReLoadRequest(submitData || {});
    }

    this.beforeRequest(submitData || {});

    const willSaveState = {
      ...otherState,
    };

    if (isEmptyObject(willSaveState)) {
      this.initLoadCore({
        requestData: submitData || {},
        delay,
        beforeRequest: beforeRequestSource,
        successCallback,
        failCallback,
        completeCallback,
      });
    } else {
      this.setState(willSaveState, () => {
        this.initLoadCore({
          requestData: submitData || {},
          delay,
          beforeRequest: beforeRequestSource,
          successCallback,
          failCallback,
          completeCallback,
        });
      });
    }
  };

  /**
   * 调整加载接口配置，默认为空，可根据需要重载。
   * @function
   * @returns {string} 要调整为的请求入口。
   * @example
   * adjustLoadApiPath = () => ""
   */
  adjustLoadApiPath = () => {
    this.logCallTrack({}, primaryCallName, 'adjustLoadApiPath', emptyLogic);

    return '';
  };

  /**
   * 执行加载核心逻辑。
   * @function
   * @param {Object} option 配置项。
   * @param {Object} option.requestData 请求参数。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  initLoadCore = ({
    requestData,
    delay = 0,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          requestData,
          delay,
        },
      },
      primaryCallName,
      'initLoadCore',
    );

    if (isFunction(beforeRequestSource)) {
      this.logCallTrace(
        {},
        primaryCallName,
        'initLoadCore',
        'trigger',
        'beforeRequest',
      );

      beforeRequestSource(requestData);
    } else {
      this.logCallTrace(
        {},
        primaryCallName,
        'initLoadCore',
        'trigger',
        'beforeRequest',
        emptyLogic,
      );
    }

    const delayTime = toNumber(delay);

    if (delayTime <= 0) {
      this.logCallTrace(
        {
          parameter: {
            requestData,
            delay,
          },
        },
        primaryCallName,
        'initLoadCore',
        'load from api without delay',
      );

      this.loadFromApi({
        requestData,
        successCallback,
        failCallback,
        completeCallback,
      });
    } else {
      if (delayTime > 0) {
        this.logCallTrace(
          {
            parameter: {
              requestData,
              delay,
            },
          },
          primaryCallName,
          'initLoadCore',
          'load from api delay',
          delayTime,
        );
      }

      const that = this;

      setTimeout(() => {
        that.loadFromApi({
          requestData,
          successCallback,
          failCallback,
          completeCallback,
        });
      }, delayTime);
    }
  };

  /**
   * 远程加载。
   * @function
   * @param {Object} option 配置项。
   * @param {Object} option.requestData 请求参数。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  loadFromApi = ({
    requestData,
    successCallback = null,
    failCallback = null,
    completeCallback = null,
  }) => {
    let loadApiPath = '';

    const that = this;

    try {
      const loadApiCustomPath = this.adjustLoadApiPath();

      const loadApiPathCustom = checkStringIsNullOrWhiteSpace(loadApiCustomPath)
        ? {}
        : {
            loadApiPath: loadApiCustomPath,
          };

      const { loadApiPath: loadApiPathValue, firstLoadSuccess } = {
        ...this.state,
        ...loadApiPathCustom,
      };

      loadApiPath = loadApiPathValue || '';

      that.setRequestingData({ type: loadApiPath, payload: requestData });

      this.logCallTrack(
        {
          loadApiPath,
          requestData,
        },
        primaryCallName,
        'loadFromApi',
      );

      that
        .dispatchApi({
          type: loadApiPath,
          payload: requestData,
        })
        .then((metaOriginalData) => {
          that.logCallTrace({}, primaryCallName, 'loadFromApi', 'success');

          let willSaveToState = {
            dataLoading: false,
            loadSuccess: false,
            reloading: false,
            searching: false,
            refreshing: false,
            dispatchComplete: true,
          };

          if (isUndefined(metaOriginalData)) {
            that.logCallTrace(
              {},
              primaryCallName,
              'loadFromApi',
              'metaOriginalData is undefined',
              'ignore execute continue logic',
            );

            logException('api request result is undefined');

            that.setState(willSaveToState);

            return;
          }

          that.lastLoadParams = requestData;

          const { dataSuccess } = metaOriginalData;

          willSaveToState = {
            ...willSaveToState,

            loadSuccess: dataSuccess,
          };

          if (dataSuccess) {
            const {
              list: metaListData,
              data: metaData,
              extra: metaExtra,
            } = metaOriginalData;

            willSaveToState = {
              metaData: metaData || null,
              metaExtra: metaExtra || null,
              metaListData: metaListData || [],
              metaOriginalData,
              ...willSaveToState,
            };

            that.afterLoadSuccess({
              metaData: metaData || null,
              metaListData: metaListData || [],
              metaExtra: metaExtra || null,
              metaOriginalData: metaOriginalData || null,
            });
          }

          const { reloading: reloadingComplete } = that.state;

          if (reloadingComplete) {
            that.afterReloadSuccess();
            that.afterGetReLoadRequestResult(requestData, metaOriginalData);
          }

          if (!firstLoadSuccess) {
            willSaveToState = {
              ...willSaveToState,

              firstLoadSuccess: true,
            };
          }

          that.setState(willSaveToState);

          if (!firstLoadSuccess) {
            that.afterFirstLoadSuccess();

            that.afterGetFirstRequestResult(requestData, metaOriginalData);
          }

          that.afterGetRequestResult(requestData, metaOriginalData);

          if (isFunction(successCallback)) {
            successCallback(metaOriginalData);
          }

          that.clearRequestingData();

          if (isFunction(completeCallback)) {
            that.logCallTrace(
              {
                parameter: {
                  requestData,
                },
              },
              primaryCallName,
              'loadFromApi',
              'trigger',
              'completeCallback',
            );

            completeCallback();
          }

          return metaOriginalData;
        })
        .catch((error) => {
          that.logCallTrace({}, primaryCallName, 'loadFromApi', 'fail');

          const { message } = error;

          if (!isUndefined(message)) {
            logException(message);
          }

          if (isFunction(failCallback)) {
            this.logCallTrace(
              {
                parameter: {
                  requestData,
                },
              },
              primaryCallName,
              'loadFromApi',
              'trigger',
              'failCallback',
            );

            failCallback(error);
          }

          if (isFunction(completeCallback)) {
            this.logCallTrace(
              {
                parameter: {
                  requestData,
                },
              },
              primaryCallName,
              'loadFromApi',
              'trigger',
              'completeCallback',
            );

            completeCallback();
          }
        });
    } catch (error) {
      logObject({ loadApiPath, requestData });

      if (isFunction(completeCallback)) {
        this.logCallTrace(
          {
            parameter: {
              requestData,
            },
          },
          primaryCallName,
          'loadFromApi',
          'trigger',
          'completeCallback',
        );

        completeCallback();
      }

      that.setState({
        dataLoading: false,
        loadSuccess: false,
        reloading: false,
        searching: false,
        refreshing: false,
        dispatchComplete: true,
      });

      throw error;
    }
  };

  /**
   * 分页加载。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {Object} option.requestData 请求参数。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  pageListData = ({
    otherState = {},
    requestData = {},
    delay = 0,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: { otherState, requestData, delay },
      },
      primaryCallName,
      'pageListData',
    );

    const that = this;

    that.openPreventRender();

    that.startLoading();

    const s = { ...otherState };

    that.initLoad({
      requestData,
      otherState: s,
      delay: delay || 0,
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopLoading();

        if (isFunction(completeCallbackSource)) {
          completeCallbackSource();
        }

        that.closePreventRender(true);
      },
    });
  };

  /**
   * 重载数据。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  reloadData = ({
    otherState = {},
    delay = 0,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          otherState,
          delay,
          prepareRequest: prepareRequestSource || null,
          beforeRequest: beforeRequestSource || null,
          successCallback,
          failCallback,
          completeCallback: completeCallbackSource,
        },
      },
      primaryCallName,
      'reloadData',
    );

    const that = this;

    that.openPreventRender();

    that.startReloading();

    that.logCallTrace({}, primaryCallName, 'reloadData', 'trigger', 'initLoad');

    that.initLoad({
      otherState,
      delay: delay || 0,
      prepareRequest: prepareRequestSource || null,
      beforeRequest: beforeRequestSource || null,
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopReloading();

        if (isFunction(completeCallbackSource)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'reloadData',
            'trigger',
            'completeCallback',
          );

          completeCallbackSource();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'reloadData',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }

        that.closePreventRender(true);
      },
    });
  };

  /**
   * 重载数据【显示重载提示效果】。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  reloadDataWithReloadAnimalPrompt = ({
    otherState = {},
    delay = 500,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          otherState,
          delay,
          prepareRequest: prepareRequestSource || null,
          beforeRequest: beforeRequestSource,
          successCallback,
          failCallback,
          completeCallback: completeCallbackSource,
        },
      },
      primaryCallName,
      'reloadDataWithReloadAnimalPrompt',
    );

    const that = this;

    that.openPreventRender();

    that.startReloading();

    that.logCallTrace(
      {},
      primaryCallName,
      'reloadDataWithReloadAnimalPrompt',
      'trigger',
      'initLoad',
    );

    that.initLoad({
      otherState,
      delay: delay || 0,
      prepareRequest: prepareRequestSource || null,
      beforeRequest: () => {
        reloadAnimalPromptControlAssist.show(this.viewAnimalPromptFlag);

        if (isFunction(beforeRequestSource)) {
          beforeRequestSource();
        }
      },
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopReloading();

        if (isFunction(completeCallbackSource)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'reloadDataWithReloadAnimalPrompt',
            'trigger',
            'completeCallback',
          );

          completeCallbackSource();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'reloadDataWithReloadAnimalPrompt',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }

        that.closePreventRender(true);

        reloadAnimalPromptControlAssist.hide(this.viewAnimalPromptFlag, 1000);
      },
    });
  };

  /**
   * 检索数据。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  searchData = ({
    otherState = {},
    delay = 0,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          otherState,
          delay,
          prepareRequest: prepareRequestSource || null,
          beforeRequest: beforeRequestSource || null,
          successCallback,
          failCallback,
          completeCallback: completeCallbackSource,
        },
      },
      primaryCallName,
      'searchData',
    );

    const that = this;

    that.openPreventRender();

    that.startSearching();

    that.logCallTrace({}, primaryCallName, 'searchData', 'initLoad');

    this.initLoad({
      otherState,
      delay: delay || 0,
      prepareRequest: prepareRequestSource || null,
      beforeRequest: beforeRequestSource || null,
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopSearching();

        if (isFunction(completeCallbackSource)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'searchData',
            'trigger',
            'completeCallback',
          );

          completeCallbackSource();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'searchData',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }

        that.closePreventRender(true);
      },
    });
  };

  /**
   * 重置数据。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  resetData = ({
    otherState = {},
    delay = 0,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          otherState,
          delay,
          prepareRequest: prepareRequestSource || null,
          beforeRequest: beforeRequestSource || null,
          successCallback,
          failCallback,
          completeCallback: completeCallbackSource,
        },
      },
      primaryCallName,
      'resetData',
    );

    const that = this;

    that.openPreventRender();

    that.startResetting();

    that.logCallTrace({}, primaryCallName, 'resetData', 'trigger', 'initLoad');

    this.initLoad({
      otherState,
      delay: delay || 0,
      prepareRequest: prepareRequestSource || null,
      beforeRequest: beforeRequestSource || null,
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopResetting();

        if (isFunction(completeCallbackSource)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'resetData',
            'trigger',
            'completeCallback',
          );

          completeCallbackSource();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'resetData',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }

        that.closePreventRender(true);
      },
    });
  };

  /**
   * 刷新数据。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  refreshData = ({
    otherState = {},
    delay = 0,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          otherState,
          delay,
          prepareRequest: prepareRequestSource || null,
          beforeRequest: beforeRequestSource || null,
          successCallback,
          failCallback,
          completeCallback: completeCallbackSource,
        },
      },
      primaryCallName,
      'refreshData',
    );

    const that = this;

    that.openPreventRender();

    that.startRefreshing();

    that.logCallTrace(
      {},
      primaryCallName,
      'refreshData',
      'trigger',
      'initLoad',
    );

    that.initLoad({
      otherState,
      delay: delay || 0,
      prepareRequest: prepareRequestSource || null,
      beforeRequest: beforeRequestSource || null,
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopRefreshing();

        if (isFunction(completeCallbackSource)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'refreshData',
            'trigger',
            'completeCallback',
          );

          completeCallbackSource();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'refreshData',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }

        that.closePreventRender(true);
      },
    });
  };

  /**
   * 刷新数据【显示刷新提示效果】。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.otherState 请求前的 state 赋值。
   * @param {number} option.delay 请求延迟值。
   * @param {Function} option.prepareRequest 请求前准备逻辑。
   * @param {Function} option.beforeRequest 请求预处理。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  refreshDataWithReloadAnimalPrompt = ({
    otherState = {},
    delay = 500,
    prepareRequest: prepareRequestSource = null,
    beforeRequest: beforeRequestSource = null,
    successCallback = null,
    failCallback = null,
    completeCallback: completeCallbackSource = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          otherState,
          delay,
          prepareRequest: prepareRequestSource || null,
          beforeRequest: beforeRequestSource || null,
          successCallback,
          failCallback,
          completeCallback: completeCallbackSource,
        },
      },
      primaryCallName,
      'refreshDataWithReloadAnimalPrompt',
    );

    const that = this;

    that.openPreventRender();

    that.startRefreshing();

    that.logCallTrace(
      {},
      primaryCallName,
      'refreshDataWithReloadAnimalPrompt',
      'trigger',
      'initLoad',
    );

    that.initLoad({
      otherState,
      delay: delay || 0,
      prepareRequest: prepareRequestSource || null,
      beforeRequest: () => {
        reloadAnimalPromptControlAssist.show(this.viewAnimalPromptFlag);

        if (isFunction(beforeRequestSource)) {
          beforeRequestSource();
        }
      },
      successCallback: successCallback || null,
      failCallback: failCallback || null,
      completeCallback: () => {
        that.stopRefreshing();

        if (isFunction(completeCallbackSource)) {
          that.logCallTrace(
            {},
            primaryCallName,
            'refreshDataWithReloadAnimalPrompt',
            'trigger',
            'completeCallback',
          );

          completeCallbackSource();
        } else {
          that.logCallTrace(
            {},
            primaryCallName,
            'refreshDataWithReloadAnimalPrompt',
            'trigger',
            'completeCallback',
            emptyLogic,
          );
        }

        that.closePreventRender(true);

        reloadAnimalPromptControlAssist.hide(this.viewAnimalPromptFlag, 1000);
      },
    });
  };

  /**
   * 重载全局数据。
   * @function
   * @param {*} option 配置项。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   */
  reloadGlobalData = ({ successCallback = null, failCallback = null }) => {
    this.logCallTrack({}, primaryCallName, 'reloadGlobalData');

    this.logCallTrace(
      {},
      primaryCallName,
      'reloadGlobalData',
      'trigger',
      'loadMetaData',
    );

    loadMetaData({
      successCallback: successCallback,
      failCallback: failCallback,
    });
  };

  /**
   * 首次加载数据成功后执行，默认为空逻辑，可根据需要重载。
   * @function
   * @example
   * afterFirstLoadSuccess = () => {}
   */
  afterFirstLoadSuccess = () => {
    this.logCallTrack({}, primaryCallName, 'afterFirstLoadSuccess', emptyLogic);
  };

  /**
   * 加载数据成功后执行。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   */
  afterLoadSuccess = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      primaryCallName,
      'afterLoadSuccess',
    );

    logDevelop(this.componentName, 'afterLoadSuccess do nothing, ');
  };

  /**
   * 重载数据成功后执行。
   * @function
   * @example
   * afterReloadSuccess = () => {}
   */
  afterReloadSuccess = () => {
    this.logCallTrack({}, primaryCallName, 'afterReloadSuccess', emptyLogic);
  };

  /**
   * 返回列表。
   * @function
   */
  backToList = () => {
    this.logCallTrack({}, primaryCallName, 'backToList');

    const { backPath } = this.state;

    this.goToPath(backPath);
  };

  /**
   * 检测是否有作业正在处理中。
   * @function
   * @returns {boolean} 检测结果。
   */
  checkWorkDoing() {
    this.logCallTrack({}, primaryCallName, 'checkWorkDoing');

    const { dataLoading, reloading, searching, refreshing, processing } =
      this.state;

    if (dataLoading || reloading || searching || refreshing || processing) {
      const text = '数据正在处理中，请稍等一下再点哦';

      showSimpleErrorMessage(text);

      return true;
    }

    return false;
  }

  /**
   * 数据校验。
   * @function
   * @param {Object} option 配置项。
   * @param {Function} option.successCallback 请求成功后的回调。
   * @param {Function} option.failCallback 请求失败后的回调。
   * @param {Function} option.completeCallback 请求完成后的回调，成功或失败后都将触发。
   */
  validate = ({
    // eslint-disable-next-line no-unused-vars
    successCallback = null,
    // eslint-disable-next-line no-unused-vars
    failCallback = null,
    // eslint-disable-next-line no-unused-vars
    completeCallback = null,
  }) => {
    this.logCallTrack({}, primaryCallName, 'validate', emptyLogic);

    throw new Error(this.buildOverloadErrorText('validate'));
  };

  /**
   * 根据 Url 触发重载。
   * @function
   */
  reloadByUrl() {
    this.logCallTrack({}, primaryCallName, 'reloadByUrl');

    const { pathname } = getCurrentLocation();

    this.logCallTrace(
      {},
      primaryCallName,
      'reloadByUrl',
      'trigger redirect',
      'change url',
      'load to update',
    );

    this.redirectToPath(pathname.replace('/load/', '/update/'));
  }

  /**
   * 渲染其他预设逻辑。
   * @function
   */
  renderPresetOther = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetOther', emptyLogic);

    return null;
  };

  /**
   * 渲染预设表单当前时间项。
   * @function
   * @param {Object} data 配置数据。
   */
  renderPresetFormNowTimeField = (data) => {
    const { label, helper, formItemLayout } = {
      helper: '数据的添加时间',
      label: '添加时间',
      formItemLayout: null,
      ...data,
    };

    return buildFormNowTimeField({ label, helper, formItemLayout });
  };

  /**
   * 渲染预设表单创建时间项。
   * @function
   * @param {string} name 名称。
   * @param {string} helper 说明。
   * @param {string} label 标签。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormCreateTimeField = (
    name = 'createTime',
    helper = '数据的添加时间',
    label = '添加时间',
    formItemLayout = null,
  ) => {
    return buildFormCreateTimeField({
      name,
      helper,
      label,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单更新时间项。
   * @function
   * @param {string} name 名称。
   * @param {string} helper 说明。
   * @param {string} label 标签。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormUpdateTimeField = (
    name = 'updateTime',
    helper = '数据的最后修改时间',
    label = '最后修改时间',
    formItemLayout = null,
  ) => {
    return buildFormUpdateTimeField({
      name,
      helper,
      label,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单单选项。
   * @function
   * @param {Array} listDataSource 列表数据源。
   * @param {Function} adjustListDataCallback 调整回调。
   * @returns {Object} 渲染结果
   */
  renderPresetFormRadioCore = (
    listDataSource,
    adjustListDataCallback = null,
  ) => {
    return buildRadioItem({ list: listDataSource, adjustListDataCallback });
  };

  /**
   * 渲染预设表单搜索文本输入项。
   * @function
   * @param {string} name 名称。
   * @param {string} helper 说明。
   * @param {string} label 标签。
   * @param {Object} icon 图标。
   * @param {Object} innerProperties 内部组件属性配置。
   * @param {boolean} canOperate 是否可操作。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetSearchInput = (
    label,
    name,
    helper = null,
    icon = iconBuilder.form(),
    innerProperties = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildSearchInput({
      label,
      name,
      helper,
      icon,
      innerProps: innerProperties,
      canOperate,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单搜索数字输入项。
   * @function
   * @param {string} name 名称。
   * @param {string} helper 说明。
   * @param {string} label 标签。
   * @param {Object} icon 图标。
   * @param {Object} innerProperties 内部组件属性配置。
   * @param {boolean} canOperate 是否可操作。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetSearchInputNumber = (
    label,
    name,
    helper = null,
    icon = iconBuilder.form(),
    innerProperties = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildSearchInputNumber({
      label,
      name,
      helper,
      icon,
      innerProps: innerProperties,
      canOperate,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单显示项。
   * @function
   * @param {string} label 标签。
   * @param {string} content 内容。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormDisplay = (label, content, formItemLayout = {}) => {
    return buildFormOnlyShowText({
      label,
      value: content,
      helper: '',
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单隐藏项。
   * @function
   * @param {string} children 内部内容。
   * @param {boolean} hidden 隐藏状态。
   * @returns {Object} 渲染结果
   */
  renderPresetFormHiddenWrapper = (children, hidden = true) => {
    return buildFormHiddenWrapper({ children, hidden });
  };

  /**
   * 渲染预设表单输入项。
   * @function
   * @param {Object} fieldData 字段数据。
   * @param {boolean} required 必填设置。
   * @param {Object} icon 图标。
   * @param {Object} innerProperties 内部组件属性配置。
   * @param {boolean} canOperate 是否可操作。
   * @param {Object} formItemLayout 表单布局。
   * @param {string} reminderPrefix 提醒前缀。
   * @param {boolean} hidden 隐藏状态。
   * @returns {Object} 渲染结果
   */
  renderPresetFormInputFieldData = (
    fieldData,
    required = false,
    icon = iconBuilder.form(),
    innerProperties = {},
    canOperate = true,
    formItemLayout = {},
    reminderPrefix = '输入',
    hidden = false,
  ) => {
    return buildFormInputFieldData({
      fieldData,
      required,
      icon,
      innerProps: innerProperties,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden,
    });
  };

  /**
   * 渲染预设表单输入框。
   * @function
   * @param {string} name 名称。
   * @param {string} helper 说明。
   * @param {string} label 标签。
   * @param {boolean} required 必填设置。
   * @param {Object} icon 图标。
   * @param {Object} innerProperties 内部组件属性配置。
   * @param {boolean} canOperate 是否可操作。
   * @param {Object} formItemLayout 表单布局。
   * @param {string} reminderPrefix 提醒前缀。
   * @param {boolean} hidden 隐藏状态。
   * @returns {Object} 渲染结果
   */
  renderPresetFormInput = (
    label,
    name,
    required = false,
    helper = null,
    icon = iconBuilder.form(),
    innerProperties = {},
    canOperate = true,
    formItemLayout = {},
    reminderPrefix = '输入',
    hidden = false,
  ) => {
    return buildFormInput({
      label,
      name,
      required,
      helper,
      icon,
      innerProps: innerProperties,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden,
    });
  };

  /**
   * 渲染预设表单密码框。
   * @function
   * @param {string} name 名称。
   * @param {string} helper 说明。
   * @param {string} label 标签。
   * @param {boolean} required 必填设置。
   * @param {Object} icon 图标。
   * @param {Object} innerProperties 内部组件属性配置。
   * @param {boolean} canOperate 是否可操作。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormPassword = (
    label,
    name,
    required = false,
    helper = null,
    icon = iconBuilder.form(),
    innerProperties = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildFormPassword({
      label,
      name,
      required,
      helper,
      icon,
      innerProps: innerProperties,
      canOperate,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单纯展示框。
   * @function
   * @param {string} label 标签。
   * @param {string} value 值。
   * @param {string} helper 说明。
   * @param {Object} formItemLayout 表单布局。
   * @param {boolean} requiredForShow 是否显示*标。
   * @returns {Object} 渲染结果
   */
  renderPresetFormOnlyShowText = (
    label,
    value,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    return buildFormOnlyShowText({
      label,
      value,
      helper,
      formItemLayout,
      requiredForShow,
    });
  };

  /**
   * 渲染预设表单按钮。
   * @function
   * @param {Object} config 配置。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormButton = (config, formItemLayout = {}) => {
    return buildFormButton({
      config,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单动作项。
   * @function
   * @param {Object} component 组件。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormActionItem = (component, formItemLayout = {}) => {
    return buildFormActionItem({
      component: component || null,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单纯展示文本域。
   * @function
   * @param {string} label 标签。
   * @param {string} value 值。
   * @param {string} helper 说明。
   * @param {Object} textAreaProperties 内部属性配置。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormOnlyShowTextarea = (
    label,
    value,
    helper = null,
    textAreaProperties = null,
    formItemLayout = {},
  ) => {
    return buildFormOnlyShowTextarea({
      label,
      value,
      helper,
      innerProps: textAreaProperties || { disabled: true },
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单纯展示文本。
   * @function
   * @param {string} label 标签。
   * @param {string} value 值。
   * @param {string} helper 说明。
   * @param {Object} formItemLayout 表单布局。
   * @returns {Object} 渲染结果
   */
  renderPresetFormText = (label, value, helper = null, formItemLayout = {}) => {
    return buildFormText({
      label,
      value,
      helper,
      formItemLayout,
    });
  };

  /**
   * 渲染预设表单单选项。
   * @function
   * @param {string} label 标签。
   * @param {string} name 名称。
   * @param {Function} renderItem 项渲染。
   * @param {string} helper 说明。
   * @param {Function} onChange 值变更回调。
   * @param {Object} formItemLayout 表单布局。
   * @param {boolean} required 是否显示必填*标。
   * @param {Object} innerProperties 内部组件属性配置。
   * @returns {Object} 渲染结果
   */
  renderPresetFormRadio = (
    label,
    name,
    renderItem,
    helper = null,
    onChange = null,
    formItemLayout = null,
    required = false,
    innerProperties = null,
  ) => {
    return buildFormRadio({
      label,
      name,
      renderItem,
      helper,
      onChangeCallback: onChange,
      formItemLayout,
      required,
      innerProps: innerProperties,
    });
  };

  /**
   * 渲染预设搜索表单下拉选择项。
   * @function
   * @param {string} label 标签。
   * @param {string} name 名称。
   * @param {Function} option 配置项。
   * @param {string} helper 说明。
   * @returns {Object} 渲染结果
   */
  renderPresetSearchFormSelect = (label, name, options, helper = null) => {
    return buildSearchFormSelect({ label, name, options, helper });
  };

  /**
   * 获取其他按钮是否为禁用状态。
   * @function
   */
  getOtherButtonDisabled = () => {
    return false;
  };

  /**
   * 获取保存按钮是否为禁用状态。
   * @function
   */
  getSaveButtonDisabled = () => {
    const { processing } = this.state;

    if (this.loadRemoteRequestAfterMount) {
      return this.checkOperability();
    }

    return processing;
  };

  /**
   * 获取保存按钮是否为加载中状态。
   * @function
   */
  getSaveButtonLoading = () => {
    if (this.loadRemoteRequestAfterMount) {
      return this.checkLoadingProgress();
    }

    return this.loadRemoteRequestAfterMount;
  };

  /**
   * 获取保存按钮是否为处理中状态。
   * @function
   */
  getSaveButtonProcessing = () => {
    const { processing } = this.state;

    return processing;
  };

  /**
   * 获取保存按钮图标。
   * @function
   */
  getSaveButtonIcon = () => {
    return iconBuilder.save();
  };

  /**
   * 获取禁用状态下保存按钮图标。
   * @function
   */
  getDisabledButtonIcon = () => {
    return iconBuilder.save();
  };

  /**
   * 获取页面标题。
   * @function
   */
  getPresetPageTitle = () => {
    this.logCallTrack({}, primaryCallName, 'getPresetPageTitle');

    this.logCallTrace(
      {},
      primaryCallName,
      'getPresetPageTitle',
      'state',
      'pageTitle',
    );

    const { pageTitle } = this.state;

    return pageTitle;
  };

  /**
   * 渲染预设的禁用按钮
   * @function
   * @param {string} text 按钮文字。
   * @returns {Object} 渲染结果
   */
  renderPresetDisabledButton = (text = '') => {
    return (
      <Button type="primary" disabled>
        {this.getDisabledButtonIcon()}
        {text || '保存'}
      </Button>
    );
  };

  /**
   * 渲染预设的保存按钮
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.icon 图标。
   * @param {string} option.text 按钮文字。
   * @param {Function} option.handleClick 按钮回调。
   * @param {boolean} option.disabled 是否禁用状态。
   * @param {boolean} option.hidden 是否隐藏状态。
   * @returns {Object} 渲染结果
   */
  renderPresetSaveButton = ({
    icon,
    text,
    handleClick,
    disabled = false,
    hidden = false,
  }) => {
    const that = this;

    const buttonDisabled = this.getSaveButtonDisabled();
    const ico = (icon || null) == null ? this.getSaveButtonIcon() : icon;

    return (
      <ElasticityExtraButton
        flag={[
          this.viewLoadingFlag,
          this.viewReloadingFlag,
          this.viewRefreshingFlag,
          this.viewProcessingFlag,
        ]}
        type="primary"
        text={text || '保存'}
        icon={ico}
        hidden={hidden}
        disabled={disabled || buttonDisabled}
        handleClick={({ completeCallback }) => {
          if (isFunction(handleClick)) {
            handleClick({ completeCallback });
          } else {
            that.validate({ completeCallback });
          }
        }}
      />
    );
  };

  /**
   * 构建表单额外配置，默认为空，可根据需要重载。
   * @function
   * @example
   * establishFormAdditionalConfig = () => {}
   */
  establishFormAdditionalConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishFormAdditionalConfig',
      emptyLogic,
    );

    return {};
  };

  /**
   * 渲染预设刷新按钮。
   * @function
   * @param {Object} properties 内部组件属性配置。
   * @returns {Object} 渲染结果
   */
  renderPresetRefreshButton = (properties = null) => {
    const { size, text } = {
      size: 'default',
      text: '刷新',
      ...properties,
    };

    return (
      <ElasticityExtraButton
        flag={[
          this.viewLoadingFlag,
          this.viewReloadingFlag,
          this.viewRefreshingFlag,
          this.viewProcessingFlag,
        ]}
        title="刷新当前数据"
        placement="top"
        size={size}
        text={text}
        icon={iconBuilder.reload()}
        interimIcon={iconBuilder.loading()}
        disabled={this.checkOperability()}
        handleClick={() => {
          this.reloadData({});
        }}
      />
    );
  };

  /**
   * 视频上传预处理。
   * @function
   * @param {Object} file 文件。
   */
  beforeVideoUpload = (file) => {
    const isVideo = file.type === 'video/mp4';

    if (!isVideo) {
      const text = '请上传视频文件!';

      showSimpleRuntimeError(text);
    }

    let uploadMaxSize = getVideoUploadMaxSize();

    if (!isNumber(uploadMaxSize) || uploadMaxSize <= 0) {
      uploadMaxSize = 10;
    }

    const allowUploadSize = file.size / 1024 / 1024 < uploadMaxSize;

    if (!allowUploadSize) {
      const text = `视频文件不能超过${uploadMaxSize}MB!`;

      showSimpleRuntimeError(text);
    }

    return isVideo && allowUploadSize;
  };

  /**
   * 预处理图片上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  // eslint-disable-next-line no-unused-vars
  pretreatmentImageUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentImageUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  /**
   * 预处理文件Base64上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  // eslint-disable-next-line no-unused-vars
  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentFileBase64UploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  /**
   * 预处理视频上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  // eslint-disable-next-line no-unused-vars
  pretreatmentVideoUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentVideoUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  /**
   * 预处理音频上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  // eslint-disable-next-line no-unused-vars
  pretreatmentAudioUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentAudioUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  /**
   * 预处理文件上传结果。
   * @function
   * @param {Object} response 上传结果。
   */
  // eslint-disable-next-line no-unused-vars
  pretreatmentFileUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentFileUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  /**
   * 构建工具栏配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishToolBarConfig = () => { return null; }
   */
  establishToolBarConfig = () => {
    return null;
  };

  /**
   * 构建提示栏配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishHelpConfig = () => { return null; }
   */
  establishHelpConfig = () => {
    return null;
  };

  /**
   * 构建侧边栏上部配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishSiderTopAreaConfig = () => { return null; }
   */
  establishSiderTopAreaConfig = () => {
    return null;
  };

  /**
   * 构建侧边栏下部配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishPageContentLayoutSiderConfig = () => { return null; }
   */
  establishSiderBottomAreaConfig = () => {
    return null;
  };

  /**
   * 构建页面内容侧栏布局配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishPageContentLayoutSiderConfig = () => { return {}; }
   */
  establishPageContentLayoutSiderConfig = () => {
    return {};
  };

  /**
   * 构建页面内容布局配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishPageHeaderSubTitle = () => { return {}; }
   */
  establishPageContentLayoutConfig = () => {
    return {};
  };

  /**
   * 构建页面头部标题前缀，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {string} 前缀文本
   * @example
   * establishPageHeaderSubTitle = () => ''
   */
  establishPageHeaderTitlePrefix = () => '';

  /**
   * 构建页面头部子标题，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {string} 子标题
   * @example
   * establishPageHeaderSubTitle = () => ''
   */
  establishPageHeaderSubTitle = () => '';

  /**
   * 构建页面头部内容表格配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishPageHeaderContentGridConfig = () => { return { gridConfig: null }; }
   */
  establishPageHeaderContentGridConfig = () => {
    return {
      gridConfig: null,
    };
  };

  /**
   * 构建页面头部内容段落配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishPageHeaderContentActionConfig = () => { return { paragraph: null }; }
   */
  establishPageHeaderContentParagraphConfig = () => {
    return { paragraph: null };
  };

  /**
   * 构建页面头部内容动作配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishPageHeaderContentActionConfig = () => { return { actions: [] }; }
   */
  establishPageHeaderContentActionConfig = () => {
    return {
      actions: [],
    };
  };

  /**
   * 构建页面头部内容组件配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishExtraActionConfig = () => { return { component: null }; }
   */
  establishPageHeaderContentComponentConfig = () => {
    return {
      component: null,
    };
  };

  /**
   * 构建Extra区域动作配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishExtraActionConfig = () => null
   */
  establishExtraActionConfig = () => null;

  /**
   * 构建Extra区域动作组配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishExtraActionGroupConfig = () => null
   */
  establishExtraActionGroupConfig = () => null;

  /**
   * 构建Extra区域下拉动作配置，默认为空逻辑，可根据需要重载。
   * @function
   * @returns {Object} 配置数据
   * @example
   * establishExtraActionEllipsisConfig = () => null
   */
  establishExtraActionEllipsisConfig = () => null;
}

export { InternalFlow };
