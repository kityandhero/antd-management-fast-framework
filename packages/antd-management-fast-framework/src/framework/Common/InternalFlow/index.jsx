import { Button } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isEmptyObject,
  isFunction,
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

class InternalFlow extends Core {
  reloadHeaderOnSubmitSuccess = true;

  showPageHeader = true;

  showReloadButton = true;

  contentWrapperType = contentConfig.wrapperType.page;

  showExtraActionDivider = false;

  loadRemoteRequestAfterMount = true;

  loadRemoteRequestDelay = 0;

  pageRemoteRequestDelay = 0;

  lastRequestingData = { type: '', payload: {} };

  constructor(properties) {
    super(properties);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,
      backPath: '',
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProperties, preState, snapshot) => false;

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

  // eslint-disable-next-line no-unused-vars
  beforeFirstLoadRequest = (submitData) => {};

  // eslint-disable-next-line no-unused-vars
  beforeReLoadRequest = (submitData) => {};

  // eslint-disable-next-line no-unused-vars
  beforeRequest = (submitData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line no-unused-vars
  afterGetReLoadRequestResult = (submitData, responseData) => {};

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(parameters, callback) {
    const d =
      parameters == null
        ? { type: '', payload: {} }
        : { type: '', payload: {}, ...parameters };

    this.lastRequestingData = d;

    if (isFunction(callback)) {
      callback();
    }
  }

  clearRequestingData() {
    this.setRequestingData({ type: '', payload: {} });
  }

  initLoadRequestParams = (o) => o || {};

  supplementLoadRequestParams = (o) => o || {};

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams = (o) => {
    return true;
  };

  initLoad = ({
    requestData: requestDataSource = {},
    otherState = {},
    delay = 0,
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

  adjustLoadApiPath = () => {
    return '';
  };

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

      beforeRequestSource();
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

          if (!isUndefined()) {
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
   * query page list data
   * @param {*} options
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

  reloadData = ({
    otherState = {},
    delay = 0,
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
          beforeRequest: beforeRequestSource,
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

  reloadDataWithReloadAnimalPrompt = ({
    otherState = {},
    delay = 500,
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

  searchData = ({
    otherState = {},
    delay = 0,
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
          beforeRequest: beforeRequestSource,
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

  resetData = ({
    otherState = {},
    delay = 0,
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
          beforeRequest: beforeRequestSource,
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

  refreshData = ({
    otherState = {},
    delay = 0,
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
          beforeRequest: beforeRequestSource,
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

  refreshDataWithReloadAnimalPrompt = ({
    otherState = {},
    delay = 500,
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
          beforeRequest: beforeRequestSource,
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

  afterFirstLoadSuccess = () => {};

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

  afterReloadSuccess = () => {};

  backToList = () => {
    const { backPath } = this.state;

    this.goToPath(backPath);
  };

  checkWorkDoing() {
    const { dataLoading, reloading, searching, refreshing, processing } =
      this.state;

    if (dataLoading || reloading || searching || refreshing || processing) {
      const text = '数据正在处理中，请稍等一下再点哦';

      showSimpleErrorMessage(text);

      return true;
    }

    return false;
  }

  validate = ({
    // eslint-disable-next-line no-unused-vars
    successCallback = null,
    // eslint-disable-next-line no-unused-vars
    failCallback = null,
    // eslint-disable-next-line no-unused-vars
    completeCallback = null,
  }) => {
    throw new Error(this.buildOverloadErrorText('validate'));
  };

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

  renderPresetOther = () => {
    return null;
  };

  renderPresetFormNowTimeField = (data) => {
    const { label, helper, formItemLayout } = {
      helper: '数据的添加时间',
      label: '添加时间',
      formItemLayout: null,
      ...data,
    };

    return buildFormNowTimeField({ label, helper, formItemLayout });
  };

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

  renderPresetFormRadioCore = (
    listDataSource,
    adjustListDataCallback = null,
  ) => {
    return buildRadioItem({ list: listDataSource, adjustListDataCallback });
  };

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

  renderPresetFormDisplay = (label, content, formItemLayout = {}) => {
    return buildFormOnlyShowText({
      label,
      value: content,
      helper: '',
      formItemLayout,
    });
  };

  renderPresetFormHiddenWrapper = (children, hidden = true) => {
    return buildFormHiddenWrapper({ children, hidden });
  };

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

  renderPresetFormButton = (config, formItemLayout = {}) => {
    return buildFormButton({
      config,
      formItemLayout,
    });
  };

  renderPresetFormActionItem = (component, formItemLayout = {}) => {
    return buildFormActionItem({
      component: component || null,
      formItemLayout,
    });
  };

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

  renderPresetFormText = (label, value, helper = null, formItemLayout = {}) => {
    return buildFormText({
      label,
      value,
      helper,
      formItemLayout,
    });
  };

  renderPresetFormRadio = (
    label,
    name,
    renderItem,
    helper = null,
    onChangeCallback = null,
    formItemLayout = null,
    required = false,
    innerProperties = null,
  ) => {
    return buildFormRadio({
      label,
      name,
      renderItem,
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      innerProps: innerProperties,
    });
  };

  renderPresetSearchFormSelect = (label, name, options, helper = null) => {
    return buildSearchFormSelect({ label, name, options, helper });
  };

  getOtherButtonDisabled = () => {
    return false;
  };

  getSaveButtonDisabled = () => {
    const { processing } = this.state;

    if (this.loadRemoteRequestAfterMount) {
      return this.checkOperability();
    }

    return processing;
  };

  getSaveButtonLoading = () => {
    if (this.loadRemoteRequestAfterMount) {
      return this.checkLoadingProgress();
    }

    return this.loadRemoteRequestAfterMount;
  };

  getSaveButtonProcessing = () => {
    const { processing } = this.state;

    return processing;
  };

  getSaveButtonIcon = () => {
    return iconBuilder.save();
  };

  getDisabledButtonIcon = () => {
    return iconBuilder.save();
  };

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

  renderPresetDisabledButton = (text = '') => {
    return (
      <Button type="primary" disabled>
        {this.getDisabledButtonIcon()}
        {text || '保存'}
      </Button>
    );
  };

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

  establishFormAdditionalConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishFormAdditionalConfig',
      emptyLogic,
    );

    return {};
  };

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

  beforeVideoUpload = (file) => {
    const isVideo = file.type === 'video/mp4';

    if (!isVideo) {
      const text = '请上传视频文件!';

      showSimpleRuntimeError(text);
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      const text = '视频文件不能超过3MB!';

      showSimpleRuntimeError(text);
    }

    return isVideo && isLt3M;
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentImageUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentImageUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentFileBase64UploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentVideoUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentVideoUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentAudioUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentAudioUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentFileUploadRemoteResponse = (response) => {
    const text = this.buildOverloadErrorText(
      'pretreatmentFileUploadRemoteResponse',
    );

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  establishToolBarConfig = () => {
    return null;
  };

  establishHelpConfig = () => {
    return null;
  };

  establishSiderTopAreaConfig = () => {
    return null;
  };

  establishSiderBottomAreaConfig = () => {
    return null;
  };

  establishPageContentLayoutSiderConfig = () => {
    return {};
  };

  establishPageContentLayoutConfig = () => {
    return {};
  };

  establishPageHeaderTitlePrefix = () => '';

  establishPageHeaderSubTitle = () => '';

  establishPageHeaderContentGridConfig = () => {
    return {
      gridConfig: null,
    };
  };

  establishPageHeaderContentParagraphConfig = () => {
    return { paragraph: null };
  };

  establishPageHeaderContentActionConfig = () => {
    return {
      actions: [],
    };
  };

  establishPageHeaderContentComponentConfig = () => {
    return {
      component: null,
    };
  };

  establishExtraActionConfig = () => null;

  establishExtraActionGroupConfig = () => null;

  establishExtraActionEllipsisConfig = () => null;
}

export { InternalFlow };
