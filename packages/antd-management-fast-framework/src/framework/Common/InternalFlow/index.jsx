import { Button } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEqual,
  isFunction,
  isUndefined,
  logDevelop,
  logException,
  logObject,
  logText,
  pretreatmentRequestParameters,
  setLocalMetaData,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
  toNumber,
  toString,
} from 'easy-soft-utility';

import {
  contentConfig,
  defaultCommonState,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import {
  buildButton,
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

import { getMetaData } from '../../../utils/metaDataAssist';
import { Core } from '../../Core';

let metaData = {};

class InternalFlow extends Core {
  showPageHeader = true;

  contentTabMode = false;

  contentWrapperType = contentConfig.wrapperType.page;

  showExtraActionDivider = false;

  loadRemoteRequestAfterMount = true;

  lastRequestingData = { type: '', payload: {} };

  constructor(properties) {
    super(properties);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,

      backPath: '',
      showReloadButton: false,
    };

    metaData = getMetaData();
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProperties, preState, snapshot) => false;

  getMetaData = () => {
    return metaData;
  };

  doLoadRemoteRequest = () => {
    this.initLoad({});
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

  initLoad = ({ otherState = {}, delay = 0, callback = null }) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
    } = this.state;

    try {
      if ((loadApiPath || '') === '') {
        const text = 'loadApiPath需要配置';

        showSimpleRuntimeError(text);

        logObject(this);

        this.setState({
          dataLoading: false,
          loadSuccess: false,
          reloading: false,
          searching: false,
          refreshing: false,
          paging: false,
          dispatchComplete: true,
        });

        return;
      }

      const willSaveState = {
        dataLoading: true,
        loadSuccess: false,
        ...otherState,
      };

      this.setState(willSaveState, () => {
        this.setState(
          {
            dispatchComplete: false,
          },
          () => {
            let submitData = this.initLoadRequestParams() || {};

            submitData = pretreatmentRequestParameters(submitData || {});

            submitData = this.supplementLoadRequestParams(submitData || {});

            const checkResult = this.checkLoadRequestParams(submitData || {});

            if (checkResult) {
              if (!firstLoadSuccess) {
                this.beforeFirstLoadRequest(submitData || {});
              }

              if (reloadingBefore) {
                this.beforeReLoadRequest(submitData || {});
              }

              this.beforeRequest(submitData || {});

              this.initLoadCore({
                requestData: submitData || {},
                delay,
                callback,
              });
            } else {
              this.setState({
                dataLoading: false,
                loadSuccess: false,
                reloading: false,
                searching: false,
                refreshing: false,
                paging: false,
                dispatchComplete: true,
              });
            }
          },
        );
      });
    } catch (error) {
      logText({ loadApiPath });

      throw error;
    }
  };

  adjustLoadApiPath = () => {
    return '';
  };

  initLoadCore = ({ requestData, delay = 0, callback }) => {
    const delayTime = toNumber(delay);

    if (delayTime <= 0) {
      this.loadFromApi({
        requestData,
        callback,
      });
    } else {
      const that = this;

      setTimeout(() => {
        that.loadFromApi({
          requestData,
          callback,
        });
      }, delayTime);
    }
  };

  loadFromApi = ({ requestData, callback }) => {
    let loadApiPath = '';

    const that = this;

    try {
      const requestingDataPre = this.getRequestingData();

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

      // 处理频繁的相同请求
      if (
        !isEqual(requestingDataPre, {
          type: loadApiPath,
          payload: requestData,
        })
      ) {
        that.setRequestingData({ type: loadApiPath, payload: requestData });

        that
          .dispatchApi({
            type: loadApiPath,
            payload: requestData,
          })
          .then((metaOriginalData) => {
            let willSaveToState = {
              dataLoading: false,
              loadSuccess: false,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
              dispatchComplete: true,
            };

            if (isUndefined(metaOriginalData)) {
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

              try {
                that.afterLoadSuccess({
                  metaData: metaData || null,
                  metaListData: metaListData || [],
                  metaExtra: metaExtra || null,
                  metaOriginalData: metaOriginalData || null,
                });
              } catch (error_) {
                logObject(error_);

                const text = `${toString(error_)},place view in the console`;

                showSimpleErrorMessage(text);
              }
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

            if (isFunction(callback)) {
              // eslint-disable-next-line promise/no-callback-in-promise
              callback();
            }

            that.clearRequestingData();

            return;
          })
          .catch((error) => {
            logObject(error);

            that.setState({
              dataLoading: false,
              loadSuccess: false,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
              dispatchComplete: true,
            });
          });
      }
    } catch (error) {
      logObject({ loadApiPath, requestData });

      that.setState({
        dataLoading: false,
        loadSuccess: false,
        reloading: false,
        searching: false,
        refreshing: false,
        paging: false,
        dispatchComplete: true,
      });

      throw error;
    }
  };

  pageListData = (otherState, callback = null, delay = 0) => {
    const s = { ...otherState, paging: true };

    this.initLoad({
      otherState: s,
      delay: delay || 0,
      callback: callback || null,
    });
  };

  reloadData = (otherState, callback = null, delay = 0) => {
    const s = {
      ...otherState,
      reloading: true,
    };

    this.initLoad({
      otherState: s,
      delay: delay || 0,
      callback: callback || null,
    });
  };

  searchData = (otherState, callback = null, delay = 0) => {
    const s = { ...otherState, searching: true };

    this.initLoad({
      otherState: s,
      delay: delay || 0,
      callback,
    });
  };

  refreshData = (otherState, callback = null, delay = 0) => {
    const s = {
      ...otherState,
      refreshing: true,
    };

    this.initLoad({
      otherState: s,
      delay: delay || 0,
      callback,
    });
  };

  reloadGlobalData = ({ successCallback = null, failCallback = null }) => {
    this.dispatchApi({
      type: 'global/getMetaData',
      payload: { force: true },
    })
      .then((remoteData) => {
        const { dataSuccess } = remoteData;

        if (dataSuccess) {
          const { list, data, extra } = {
            data: {},
            list: [],
            extra: {},
            ...remoteData,
          };

          if (isFunction(successCallback)) {
            // eslint-disable-next-line promise/no-callback-in-promise
            successCallback({
              data: data || {},
              list: isArray(list) ? list : [],
              extra: extra || {},
              originalData: remoteData || {},
            });

            setLocalMetaData(data || {});
          }
        } else {
          if (isFunction(failCallback)) {
            // eslint-disable-next-line promise/no-callback-in-promise
            failCallback({ originalData: remoteData || {} });
          }
        }

        return;
      })
      .catch((error) => {
        logException(error);
      });
  };

  afterFirstLoadSuccess = () => {};

  afterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    logDevelop(this.componentName, 'afterLoadSuccess do nothing, ');
  };

  afterReloadSuccess = () => {};

  backToList = () => {
    const { backPath } = this.state;

    this.goToPath(backPath);
  };

  checkWorkDoing() {
    const {
      dataLoading,
      reloading,
      searching,
      refreshing,
      paging,
      processing,
    } = this.state;

    if (
      dataLoading ||
      reloading ||
      searching ||
      refreshing ||
      paging ||
      processing
    ) {
      const text = '数据正在处理中，请稍等一下再点哦';

      showSimpleErrorMessage(text);

      return true;
    }

    return false;
  }

  reloadByUrl() {
    const {
      location: { pathname },
    } = this.props;

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
    processing = false,
    hidden = false,
  }) => {
    const that = this;

    const buttonDisabled = this.getSaveButtonDisabled();
    const buttonProcessing = this.getSaveButtonProcessing();
    const ico = (icon || null) == null ? this.getSaveButtonIcon() : icon;

    return buildButton({
      type: 'primary',
      text: text || '保存',
      icon: ico,
      hidden,
      disabled: disabled || buttonDisabled,
      processing: processing || buttonProcessing,
      handleClick: (error) => {
        if (isFunction(handleClick)) {
          handleClick(error);
        } else {
          that.validate(error);
        }
      },
    });
  };

  establishFormAdditionalConfig = () => {
    return {};
  };

  renderPresetRefreshButton = (properties = null) => {
    const { size, text } = {
      size: 'default',
      text: '刷新',
      ...properties,
    };

    return buildButton({
      title: '刷新当前数据',
      placement: 'top',
      size,
      text,
      icon: iconBuilder.reload(),
      disabled: this.checkOperability(),
      handleClick: this.reloadData,
    });
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
    const text = '需要在继承中重新实现 pretreatmentImageUploadRemoteResponse';

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    const text =
      '需要在继承中重新实现 pretreatmentFileBase64UploadRemoteResponse';

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentVideoUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentVideoUploadRemoteResponse';

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentAudioUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentAudioUploadRemoteResponse';

    showSimpleRuntimeError(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentFileUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentFileUploadRemoteResponse';

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

  establishExtraActionConfig = () => null;

  establishExtraActionGroupConfig = () => null;

  establishExtraActionEllipsisConfig = () => null;
}

export { InternalFlow };
