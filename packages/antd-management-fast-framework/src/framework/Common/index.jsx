import React, { Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  Affix,
  Spin,
  Divider,
  Button,
  Space,
  Tooltip,
} from 'antd';
import {
  ContactsOutlined,
  FormOutlined,
  SaveOutlined,
  LoadingOutlined,
  ReloadOutlined,
  ToolOutlined,
} from '@ant-design/icons';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isFunction,
  defaultCommonState,
  isUndefined,
  recordText,
  refitCommonData,
  stringIsNullOrWhiteSpace,
  recordObject,
  formatDatetime,
  isArray,
  showRuntimeError,
  stringIsEmpty,
  showErrorMessage,
  isBoolean,
  toDatetime,
  isObject,
  copyToClipboard,
  inCollection,
  toString,
} from '../../utils/tools';
import { pretreatmentRequestParams } from '../../utils/requestAssistor';
import {
  defaultEmptyImage,
  cardConfig,
  datetimeFormat,
  contentConfig,
} from '../../utils/constants';
import FlexText from '../../customComponents/FlexText';
import ImageUpload from '../../customComponents/ImageUpload';
import VideoUpload from '../../customComponents/VideoUpload';
import ImageBox from '../../customComponents/ImageBox';
import HelpBox from '../../customComponents/HelpBox';
import HelpCard from '../../customComponents/HelpCard';
import IconInfo from '../../customComponents/IconInfo';
import FileBase64Upload from '../../customComponents/FileBase64Upload';
import FadeBox from '../../customComponents/AnimalBox/FadeBox';
import QueueBox from '../../customComponents/AnimalBox/QueueBox';

import {
  buildRadioItem,
  buildFormRadio,
  buildOptionItem,
  buildFormSelect,
  buildSearchFormSelect,
  buildFormNowTimeField,
  buildFormCreateTimeField,
  buildFormUpdateTimeField,
  buildSearchInput,
  buildSearchInputNumber,
  buildFormDisplay,
  buildFormHiddenWrapper,
  buildFormInput,
  buildFormInputFieldData,
  buildFormSwitch,
  buildFormPassword,
  buildFormOnlyShowText,
  buildSyntaxHighlighter,
  buildJsonView,
  buildFormOnlyShowSyntaxHighlighter,
  buildFormOnlyShowTextarea,
  buildFormText,
  buildFormInnerComponent,
  buildFormButton,
  buildFormActionItem,
  buildFormOnlyShowInput,
  buildFormInputNumber,
  buildFormTextArea,
  buildFormDatePicker,
  buildButton,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
} from '../../customComponents/FunctionComponent';
import { renderFormWhetherSelect } from '../../customComponents/FunctionSupplement/Whether';

import Core from '../Core';

import styles from './index.less';

class Common extends Core {
  loadDataAfterMount = true;

  lastRequestingData = { type: '', payload: {} };

  constructor(props) {
    super(props);

    const defaultState = defaultCommonState();

    this.state = {
      ...defaultState,
      ...{
        backPath: '',
        videoUploading: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();

    this.init();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;

  // 该方法必须重载覆盖
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getApiData = (props) => {
    const text = 'getApiData 方法需要重载实现';

    showRuntimeError({
      message: text,
    });

    return {
      metaOriginalData: {
        dataSuccess: false,
      },
    };
  };

  /**
   * 处理其他需要在组件挂在之后执行的流程
   *
   * @memberof Index
   */
  initOther = () => {};

  init = () => {
    if (this.loadDataAfterMount) {
      this.initLoad({});
    }

    this.initOther();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeFirstLoadRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeReLoadRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  beforeRequest = (submitData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetFirstRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetRequestResult = (submitData, responseData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterGetReLoadRequestResult = (submitData, responseData) => {};

  getRequestingData() {
    return this.lastRequestingData;
  }

  setRequestingData(params, callback) {
    const d =
      params == null
        ? { type: '', payload: {} }
        : { ...{ type: '', payload: {} }, ...params };

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkLoadRequestParams = (o) => {
    return true;
  };

  initLoad = ({ otherState = {}, callback = null }) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
    } = this.state;

    try {
      if ((loadApiPath || '') === '') {
        const text = 'loadApiPath需要配置';

        showRuntimeError({
          message: text,
        });

        recordObject(this);

        this.setState({
          dataLoading: false,
          loadSuccess: false,
          reloading: false,
          searching: false,
          refreshing: false,
          paging: false,
        });

        return;
      }

      let submitData = this.initLoadRequestParams() || {};

      submitData = pretreatmentRequestParams(submitData || {});

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

        const willSaveState = {
          ...{
            dataLoading: true,
            loadSuccess: false,
          },
          ...(otherState || {}),
        };

        this.setState(willSaveState);

        this.initLoadCore(submitData || {}, callback);
      }
    } catch (error) {
      recordText({ loadApiPath });

      throw error;
    }
  };

  adjustLoadApiPath = () => {
    return '';
  };

  initLoadCore = (requestData, callback) => {
    let loadApiPath = '';

    try {
      const { dispatch } = this.props;

      const requestingDataPre = this.getRequestingData();

      const loadApiCustomPath = this.adjustLoadApiPath();

      const loadApiPathCustom = stringIsNullOrWhiteSpace(loadApiCustomPath)
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
        this.setRequestingData({ type: loadApiPath, payload: requestData });

        dispatch({
          type: loadApiPath,
          payload: requestData,
        })
          .then(() => {
            const metaOriginalData = this.getApiData(this.props);

            if (isUndefined(metaOriginalData)) {
              return;
            }

            this.lastLoadParams = requestData;

            const { dataSuccess } = metaOriginalData;

            if (dataSuccess) {
              const {
                list: metaListData,
                data: metaData,
                extra: metaExtra,
              } = metaOriginalData;

              this.setState({
                metaData: metaData || null,
                metaExtra: metaExtra || null,
                metaListData: metaListData || [],
                metaOriginalData,
              });

              try {
                this.afterLoadSuccess({
                  metaData: metaData || null,
                  metaListData: metaListData || [],
                  metaExtra: metaExtra || null,
                  metaOriginalData: metaOriginalData || null,
                });
              } catch (e) {
                console.log(e);

                const text = `${toString(e)},place view in the console`;

                showErrorMessage({
                  message: text,
                });
              }
            }

            const { reloading: reloadingComplete } = this.state;

            if (reloadingComplete) {
              this.afterReloadSuccess();
              this.afterGetReLoadRequestResult(requestData, metaOriginalData);
            }

            this.setState({
              dataLoading: false,
              loadSuccess: dataSuccess,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false,
            });

            if (!firstLoadSuccess) {
              this.setState(
                {
                  firstLoadSuccess: true,
                },
                () => {
                  this.afterFirstLoadSuccess();

                  this.afterGetFirstRequestResult(
                    requestData,
                    metaOriginalData,
                  );
                },
              );
            }

            this.afterGetRequestResult(requestData, metaOriginalData);

            if (typeof callback === 'function') {
              callback();
            }

            this.clearRequestingData();
          })
          .catch((res) => {
            recordObject(res);
          });
      }
    } catch (error) {
      recordObject({ loadApiPath, requestData });

      throw error;
    }
  };

  pageListData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ paging: true } };

    this.initLoad({
      otherState: s,
      callback,
    });
  };

  reloadData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ reloading: true } };

    this.initLoad({
      otherState: s,
      callback,
    });
  };

  searchData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ searching: true } };

    this.initLoad({
      otherState: s,
      callback,
    });
  };

  refreshData = (callback = null) => {
    this.initLoad({
      otherState: {
        refreshing: true,
      },
      callback,
    });
  };

  reloadGlobalData = (callback = null) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/getMetaData',
      payload: { force: true },
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };

  afterFirstLoadSuccess = () => {};

  afterLoadSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {};

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

      showErrorMessage({
        message: text,
      });

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

  renderOther = () => {
    return null;
  };

  renderFormNowTimeField = (data) => {
    const { label, helper, formItemLayout } = {
      ...{ helper: '数据的添加时间', label: '添加时间', formItemLayout: null },
      ...(data || {}),
    };

    return buildFormNowTimeField({ label, helper, formItemLayout });
  };

  renderFormCreateTimeField = (
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

  renderFormUpdateTimeField = (
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

  renderFormRadioCore = (listDataSource, adjustListDataCallback = null) => {
    return buildRadioItem({ list: listDataSource, adjustListDataCallback });
  };

  renderFormOptionCore = (listDataSource, adjustListDataCallback = null) => {
    return buildOptionItem({
      list: listDataSource,
      adjustListDataCallback,
    });
  };

  renderSearchInput = (
    label,
    name,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildSearchInput({
      label,
      name,
      helper,
      icon,
      inputProps,
      canOperate,
      formItemLayout,
    });
  };

  renderSearchInputNumber = (
    label,
    name,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildSearchInputNumber({
      label,
      name,
      helper,
      icon,
      inputProps,
      canOperate,
      formItemLayout,
    });
  };

  renderFormDisplay = (
    label,
    content,
    formItemLayout = {},
    useDisplayBoxStyle = true,
  ) => {
    return buildFormDisplay({
      label,
      content,
      formItemLayout,
      useDisplayBoxStyle,
    });
  };

  renderFormHiddenWrapper = (children, hidden = true) => {
    return buildFormHiddenWrapper({ children, hidden });
  };

  renderFormInputFieldData = (
    fieldData,
    required = false,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
    reminderPrefix = '输入',
    hidden = false,
  ) => {
    return buildFormInputFieldData({
      fieldData,
      required,
      icon,
      inputProps,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden,
    });
  };

  renderFormInput = (
    label,
    name,
    required = false,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
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
      inputProps,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden,
    });
  };

  renderFormSwitch = (
    label,
    name,
    required = false,
    helper = null,
    otherProps = {},
    canOperate = true,
    formItemLayout = {},
    hidden = false,
  ) => {
    return buildFormSwitch({
      label,
      name,
      required,
      helper,
      otherProps,
      canOperate,
      formItemLayout,
      hidden,
    });
  };

  renderFormPassword = (
    label,
    name,
    required = false,
    helper = null,
    icon = <FormOutlined />,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildFormPassword({
      label,
      name,
      required,
      helper,
      icon,
      inputProps,
      canOperate,
      formItemLayout,
    });
  };

  renderFormOnlyShowText = (
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

  renderSyntaxHighlighter = (language, value) => {
    return buildSyntaxHighlighter({
      language,
      value,
    });
  };

  renderJsonView = (value, theme = 'monokai') => {
    return buildJsonView({
      value,
      theme,
    });
  };

  renderFormInnerComponent = (
    label,
    innerComponent,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    return buildFormInnerComponent({
      label,
      innerComponent,
      helper,
      formItemLayout,
      requiredForShow,
    });
  };

  renderFormButton = (config, formItemLayout = {}) => {
    return buildFormButton({
      config,
      formItemLayout,
    });
  };

  renderFormActionItem = (component, formItemLayout = {}) => {
    return buildFormActionItem({
      component: component || null,
      formItemLayout,
    });
  };

  renderFormOnlyShowSyntaxHighlighter = (
    language,
    label,
    value,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    return buildFormOnlyShowSyntaxHighlighter({
      language,
      label,
      value,
      helper,
      formItemLayout,
      requiredForShow,
    });
  };

  renderFormOnlyShowTextarea = (
    label,
    value,
    helper = null,
    textAreaProps = { disabled: true },
    formItemLayout = {},
  ) => {
    return buildFormOnlyShowTextarea({
      label,
      value,
      helper,
      textAreaProps,
      formItemLayout,
    });
  };

  renderFormText = (label, value, helper = null, formItemLayout = {}) => {
    return buildFormText({
      label,
      value,
      helper,
      formItemLayout,
    });
  };

  renderFormOnlyShowInput = (
    label,
    value,
    helper = null,
    icon = <FormOutlined />,
    inputProps = { disabled: true },
    formItemLayout = {},
  ) => {
    return buildFormOnlyShowInput({
      label,
      value,
      helper,
      icon,
      inputProps,
      formItemLayout,
    });
  };

  renderFormInputNumber = (
    label,
    name,
    required = false,
    helper = null,
    icon = <FormOutlined />,
    inputNumberProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildFormInputNumber({
      label,
      name,
      required,
      helper,
      icon,
      inputNumberProps,
      canOperate,
      formItemLayout,
    });
  };

  renderFormTextArea = (
    label,
    name,
    required = false,
    helper = null,
    textAreaProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildFormTextArea({
      label,
      name,
      required,
      helper,
      textAreaProps,
      canOperate,
      formItemLayout,
    });
  };

  renderFormDatePicker = (
    label,
    name,
    required = false,
    helper = null,
    datePickerProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    return buildFormDatePicker({
      label,
      name,
      required,
      helper,
      datePickerProps,
      canOperate,
      formItemLayout,
    });
  };

  renderFormSelect = (
    label,
    name,
    renderItemFunction,
    helper = null,
    onChangeCallback = null,
    formItemLayout = null,
    required = false,
    otherProps = null,
  ) => {
    return buildFormSelect({
      label,
      name,
      renderItemFunction,
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    });
  };

  renderFormRadio = (
    label,
    name,
    renderItemFunction,
    helper = null,
    onChangeCallback = null,
    formItemLayout = null,
    required = false,
    otherProps = null,
  ) => {
    return buildFormRadio({
      label,
      name,
      renderItemFunction,
      helper,
      onChangeCallback,
      formItemLayout,
      required,
      otherProps,
    });
  };

  renderSearchFormSelect = (label, name, options, helper = null) => {
    return buildSearchFormSelect({ label, name, options, helper });
  };

  getOtherButtonDisabled = () => {
    return false;
  };

  getSaveButtonDisabled = () => {
    const { dataLoading, processing, loadSuccess } = this.state;

    if (this.loadDataAfterMount) {
      return dataLoading || processing || !loadSuccess;
    }

    return processing;
  };

  getSaveButtonLoading = () => {
    if (this.loadDataAfterMount) {
      const { dataLoading, loadSuccess } = this.state;

      return dataLoading || !loadSuccess;
    }

    return this.loadDataAfterMount;
  };

  getSaveButtonProcessing = () => {
    const { processing } = this.state;

    return processing;
  };

  getSaveButtonIcon = () => {
    return <SaveOutlined />;
  };

  getDisabledButtonIcon = () => {
    return <SaveOutlined />;
  };

  renderDisabledButton = (text = '') => {
    return (
      <Button type="primary" disabled>
        {this.getDisabledButtonIcon()}
        {text || '保存'}
      </Button>
    );
  };

  renderSaveButton = ({
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

    return this.renderGeneralButton({
      type: 'primary',
      text: text || '保存',
      icon: ico,
      hidden,
      disabled: disabled || buttonDisabled,
      processing: processing || buttonProcessing,
      handleClick: (e) => {
        if (isFunction(handleClick)) {
          handleClick(e);
        } else {
          that.validate(e);
        }
      },
    });
  };

  renderGeneralButton = ({
    key = null,
    type,
    size,
    text,
    icon,
    handleClick,
    danger = false,
    disabled = false,
    hidden = false,
    confirm = false,
    processing = false,
    handleData = null,
    style = null,
    showIcon = true,
  }) => {
    if (hidden) {
      return null;
    }

    return buildButton({
      key,
      type,
      size,
      text,
      icon,
      handleClick,
      danger: danger || false,
      disabled,
      processing,
      hidden,
      confirm,
      handleData: handleData ?? null,
      style: style || null,
      showIcon,
    });
  };

  establishFormAdditionalConfig = () => {
    return {};
  };

  renderRefreshButton = () => {
    const { dataLoading, reloading, processing, loadSuccess } = this.state;

    return (
      <Button
        disabled={dataLoading || reloading || processing || !loadSuccess}
        onClick={this.reloadData}
      >
        <IconInfo
          icon={reloading ? <LoadingOutlined /> : <ReloadOutlined />}
          text="刷新"
        />
      </Button>
    );
  };

  getUploadTokenObject = () => {
    const text = '需要在继承中重新实现 getUploadTokenObject';

    showRuntimeError({
      message: text,
    });

    throw new Error(text);
  };

  beforeVideoUpload = (file) => {
    const isVideo = file.type === 'video/mp4';

    if (!isVideo) {
      const text = '请上传视频文件!';

      showRuntimeError({
        message: text,
      });
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      const text = '视频文件不能超过3MB!';

      showRuntimeError({
        message: text,
      });
    }

    return isVideo && isLt3M;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pretreatmentImageUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentImageUploadRemoteResponse';

    showRuntimeError({
      message: text,
    });

    throw new Error(text);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    const text =
      '需要在继承中重新实现 pretreatmentFileBase64UploadRemoteResponse';

    showRuntimeError({
      message: text,
    });

    throw new Error(text);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pretreatmentVideoUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentVideoUploadRemoteResponse';

    showRuntimeError({
      message: text,
    });

    throw new Error(text);
  };

  establishToolBarConfig = () => {
    return null;
  };

  buildToolBar = () => {
    const config = this.establishToolBarConfig();

    if ((config || null) == null) {
      return null;
    }

    const { stick, title, tools } = {
      ...{ stick: false, title: '工具栏', tools: [] },
      ...config,
    };

    if (!isArray(tools)) {
      const text = '工具栏配置数据无效';

      showErrorMessage({
        message: text,
      });

      recordObject(config);

      return null;
    }

    const toolList = tools.map((o, index) => {
      return { ...o, ...{ key: `toolItem_${index}` } };
    });

    const bar = (
      <div className={styles.cardContainor}>
        <Card
          title={<IconInfo icon={<ToolOutlined />} text={title || '工具栏'} />}
          bordered={false}
          bodyStyle={{ padding: 0 }}
          extra={
            <Space split={<Divider type="vertical" />}>
              {toolList.map((o) => {
                const { hidden } = { ...{ hidden: false }, ...(o ?? {}) };

                if (hidden) {
                  return null;
                }

                return (
                  <Tooltip key={o.key} title={o.title || ''}>
                    {o.component}
                  </Tooltip>
                );
              })}
            </Space>
          }
        />
      </div>
    );

    if (isBoolean(stick) && stick) {
      return <Affix offsetTop={0}>{bar}</Affix>;
    }

    return bar;
  };

  buildToolBarWrapper = () => {
    const toolBar = this.buildToolBar();

    if ((toolBar || null) == null) {
      return null;
    }

    return toolBar;
  };

  establishWrapperTypeConfig = () => {
    return { mode: contentConfig.wrapperType.page };
  };

  establishHelpConfig = () => {
    return null;
  };

  buildHelp = () => {
    const wrapperTypeConfig = this.establishWrapperTypeConfig() || {
      mode: contentConfig.wrapperType.page,
    };

    const configData = {
      ...{ mode: contentConfig.wrapperType.page },
      ...(wrapperTypeConfig || {}),
    };
    const { mode } = configData;

    const config = this.establishHelpConfig();

    if ((config || null) == null) {
      return null;
    }

    const { title, showNumber, list } = {
      ...{ title: '操作帮助', showNumber: true, list: [] },
      ...config,
    };

    if (!isArray(list)) {
      const text = '帮助条目数据无效';

      showErrorMessage({
        message: text,
      });

      recordObject(config);

      return null;
    }

    return (
      <HelpCard
        border={
          mode !== contentConfig.wrapperType.model &&
          mode !== contentConfig.wrapperType.drawer
        }
        compact={mode === contentConfig.wrapperType.model}
        helpBoxProps={{
          title: title || '操作帮助',
          showNumber: showNumber || false,
          list,
        }}
      />
    );
  };

  buildHelpWrapper = () => {
    const help = this.buildHelp();

    if ((help || null) == null) {
      return null;
    }

    return help;
  };

  buildCardCollection = (config) => {
    const formContentWrapperTypeConfig = this.establishWrapperTypeConfig() || {
      mode: cardConfig.wrapperType.page,
    };
    const configData = {
      ...{
        mode: cardConfig.wrapperType.page,
        justify: 'start',
        align: 'top',
      },
      ...(formContentWrapperTypeConfig || {}),
      ...{ list: [] },
      ...(config || {}),
    };
    const {
      mode,
      justify: justifyGeneral,
      align: alignGeneral,
      list,
    } = configData;

    const listData = [];

    if (isArray(list)) {
      list.forEach((co, ci) => {
        listData.push(co);

        if (ci !== list.length - 1) {
          listData.push('');
        }
      });
    }

    return (
      <>
        <Space style={{ width: '100%' }} direction="vertical" size={24}>
          {this.buildToolBarWrapper()}

          {listData.map((item, index) => {
            return this.buildCardCollectionItem({
              mode,
              justify: justifyGeneral,
              align: alignGeneral,
              config: item,
              key: index,
            });
          })}

          {this.buildHelpWrapper()}
        </Space>
      </>
    );
  };

  buildCardCollectionItem = ({
    config: cardItemConfig,
    key: cardItemKey,
    mode = cardConfig.wrapperType.page,
    justify: justifyGeneral = 'start',
    align: alignGeneral = 'top',
  }) => {
    const key = `cardCollectionItem_key_${cardItemKey}`;

    if ((cardItemConfig || null) == null) {
      return null;
    }

    const {
      title,
      size,
      bordered,
      useAnimal,
      animalType,
      extra,
      hidden,
      cardType,
      cardBodyStyle,
      spinning,
      items: contentItems,
      otherComponent,
      formItemLayout,
      instruction,
      justify: justifyRow,
      align: alignRow,
    } = {
      ...{
        title: '',
        size: 'default',
        bordered: false,
        useAnimal: false,
        animalType: cardConfig.animalType.none,
        extra: null,
        hidden: false,
        cardType: cardConfig.renderType.normal,
        cardBodyStyle: {},
        items: [],
        otherComponent: null,
        formItemLayout: null,
        instruction: null,
        justify: 'start',
        align: 'top',
      },
      ...(cardItemConfig || {}),
    };

    if (hidden || false) {
      return null;
    }

    const {
      image,
      icon,
      text,
      subText,
      addonBefore: titleAddonBefore,
      addonAfter: titleAddonAfter,
    } = {
      ...{
        image: '',
        icon: null,
        text: '',
        subText: '',
        addonBefore: null,
        addonAfter: null,
      },
      ...(title || {}),
    };

    const {
      affix,
      split,
      list: extraItemList,
    } = {
      ...{ affix: false, split: false, list: [] },
      ...(extra || {}),
    };

    const imageVisible = !stringIsNullOrWhiteSpace(image);

    const iconAdjust = imageVisible ? icon : icon || <ContactsOutlined />;

    const extraListData = [];

    if (isArray(extraItemList)) {
      extraItemList.forEach((eo, ei) => {
        if ((eo || null) != null) {
          extraListData.push(eo);

          if (ei !== extraItemList.length - 1) {
            extraListData.push('');
          }
        }
      });
    }

    const extraItems = this.buildEveryCardActionList({
      keyPrefix: `formContent_key_${cardItemKey}_extra`,
      configList: extraListData,
    });

    const hasExtraItems = extraItems.length > 0;

    let cardTypeBodyStyle = {};

    if (cardType === cardConfig.renderType.help) {
      cardTypeBodyStyle = {
        paddingTop: '12px',
        paddingBottom: '12px',
      };
    }

    const card = (
      <Card
        title={
          cardItemKey === 0 &&
          mode !== cardConfig.wrapperType.page ? null : (text || '') === '' &&
            (subText || '') === '' ? null : (
            <>
              <FlexText
                icon={iconAdjust || null}
                text={text || ''}
                subText={subText || ''}
                addonBefore={
                  (titleAddonBefore || null) == null ? null : titleAddonBefore
                }
                addonAfter={
                  (titleAddonAfter || null) == null ? null : titleAddonAfter
                }
              />
            </>
          )
        }
        style={imageVisible ? { position: 'relative' } : {}}
        headStyle={
          imageVisible
            ? {
                paddingLeft: '66px',
              }
            : {}
        }
        size={size || 'default'}
        bordered={bordered}
        extra={
          hasExtraItems ? (
            mode === cardConfig.wrapperType.page && affix ? (
              <Affix offsetTop={20}>
                <Space
                  split={
                    isBoolean(split) ? (
                      split ? (
                        <Divider type="vertical" />
                      ) : null
                    ) : (
                      split
                    )
                  }
                >
                  {extraItems}
                </Space>
              </Affix>
            ) : (
              <>
                <Space
                  split={
                    isBoolean(split) ? (
                      split ? (
                        <Divider type="vertical" />
                      ) : null
                    ) : (
                      split
                    )
                  }
                >
                  {extraItems}
                </Space>
              </>
            )
          ) : null
        }
        bodyStyle={
          mode === cardConfig.wrapperType.model
            ? {
                ...(cardBodyStyle || {}),
                ...(cardTypeBodyStyle || {}),
                ...{
                  paddingBottom: 0,
                },
              }
            : {
                ...(cardBodyStyle || {}),
                ...(cardTypeBodyStyle || {}),
              }
        }
      >
        <Spin spinning={spinning || false}>
          <>
            {this.buildCardCollectionItemContent({
              mode,
              justify: justifyRow || justifyGeneral,
              align: alignRow || alignGeneral,
              items: isArray(contentItems)
                ? contentItems.map((o) => {
                    return {
                      ...o,
                      ...{ formItemLayout: formItemLayout || null },
                    };
                  })
                : [],
              index: cardItemKey,
            })}

            {otherComponent || null}

            {isObject(instruction ?? false) || isArray(instruction ?? false) ? (
              isArray(instruction ?? false) ? (
                instruction.map((o, indexHelpBox) => {
                  if ((o ?? null) == null) {
                    return null;
                  }

                  const keyHelpBox = `${key}_HelpBox_$${indexHelpBox}`;

                  return <HelpBox key={keyHelpBox} {...o} />;
                })
              ) : (
                <HelpBox {...instruction} />
              )
            ) : null}
          </>
        </Spin>

        {imageVisible ? (
          <div
            style={{
              position: 'absolute',
              width: '36px',
              left: '24px',
              top: '11px',
            }}
          >
            <ImageBox
              src={image}
              circle
              lazyLoad
              errorOverlayVisible
              showErrorOverlay
              loadingEffect
              preview
              previewSimpleMask
            />
          </div>
        ) : null}
      </Card>
    );

    return (
      <div key={key} className={styles.cardContainor}>
        {isBoolean(useAnimal) && animalType === cardConfig.animalType.fade ? (
          <FadeBox>{card}</FadeBox>
        ) : null}

        {isBoolean(useAnimal) && animalType === cardConfig.animalType.queue ? (
          <QueueBox>{card}</QueueBox>
        ) : null}

        {!isBoolean(useAnimal) ||
        (isBoolean(useAnimal) &&
          !inCollection(
            [cardConfig.animalType.fade, cardConfig.animalType.queue],
            animalType,
          ))
          ? card
          : null}
      </div>
    );
  };

  buildCardCollectionItemContent = ({
    mode,
    justify,
    align,
    gutter = 24,
    items: contentItems,
    index: contentIndex,
  }) => {
    return (
      <Row justify={justify} align={align} gutter={gutter || 24}>
        {isArray(contentItems)
          ? contentItems.map((contentItem, contentItemIndex) => {
              const contentItemKey = `formContent_key_${contentIndex}_content_${contentItemIndex}`;

              const {
                lg: lgValue,
                md,
                sm,
                xs,
                type,
                require,
                fieldData: fieldDataValue,
                hidden,
                canOperate,
                formItemLayout,
              } = {
                ...{
                  lg: 6,
                  md: 12,
                  sm: 24,
                  xs: 24,
                  require: false,
                  type: '',
                  fieldData: {
                    label: '',
                    name: '',
                    helper: '',
                  },
                  hidden: false,
                  canOperate: true,
                  formItemLayout: null,
                },
                ...(contentItem || {}),
              };

              if (hidden) {
                return null;
              }

              const fieldData = {
                ...{
                  label: '',
                  name: '',
                  helper: '',
                },
                ...(fieldDataValue || {}),
              };

              let lg =
                (lgValue || 6) < 12 && mode !== cardConfig.wrapperType.page
                  ? 12
                  : lgValue;

              lg = lg > 12 && mode !== cardConfig.wrapperType.page ? 24 : lg;
              lg = lg > 24 ? 24 : lg;

              if (type === cardConfig.contentItemType.placeholder) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  />
                );
              }

              if (type === cardConfig.contentItemType.divider) {
                return (
                  <Col
                    key={contentItemKey}
                    lg={lg}
                    md={lg || md}
                    sm={lg || sm}
                    xs={lg || xs}
                  >
                    <Divider {...{ ...{}, ...(contentItem.otherProps || {}) }}>
                      {stringIsNullOrWhiteSpace(contentItem.text || '')
                        ? null
                        : contentItem.text}
                    </Divider>
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.imageUpload) {
                const uploadProps = {
                  ...{
                    image: contentItem.image || '',
                    action: contentItem.action || '',
                    tokenSet: this.getUploadTokenObject(),
                    multiple: contentItem.multiple || false,
                    fileList: contentItem.fileList || [],
                    showUploadList: contentItem.showUploadList || false,
                    listType: contentItem.listType || 'picture-card',
                    disabled: contentItem.disabled || false,
                  },
                  ...(contentItem.uploadProps || {}),
                };

                return (
                  <Col key={contentItemKey} lg={24} md={md} sm={sm} xs={xs}>
                    <ImageUpload
                      {...uploadProps}
                      pretreatmentRemoteResponse={
                        this.pretreatmentImageUploadRemoteResponse
                      }
                      afterUploadSuccess={(image) => {
                        if (isFunction(contentItem.afterUploadSuccess)) {
                          contentItem.afterUploadSuccess(image);
                        }
                      }}
                      onItemChange={contentItem.onItemChange || null}
                      onItemRemove={contentItem.onItemRemove || null}
                    />
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.imageShow) {
                const imageBoxProps = {
                  ...{
                    loadingEffect: true,
                    errorOverlayVisible: true,
                    showErrorIcon: false,
                    alt: '',
                  },
                  ...(contentItem.imageBoxProps || {}),
                };

                const imageBoxContainorStyle = {
                  ...{ width: '120px' },
                  ...(contentItem.imageBoxContainorStyle || {}),
                };

                const imageBox = (
                  <ImageBox
                    src={contentItem.image || defaultEmptyImage}
                    preview={!stringIsEmpty(contentItem.image || '')}
                    {...imageBoxProps}
                  />
                );

                return (
                  <Col key={contentItemKey} lg={24} md={24} sm={24} xs={24}>
                    <div style={imageBoxContainorStyle}>{imageBox}</div>
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.imageListShow) {
                let imageBoxListContainorStyle = null;

                const imageBoxProps = {
                  ...{
                    loadingEffect: true,
                    errorOverlayVisible: true,
                    showErrorIcon: false,
                    alt: '',
                  },
                  ...(contentItem.imageBoxProps || {}),
                };

                if ((contentItem.imageBoxListContainorStyle || null) != null) {
                  imageBoxListContainorStyle =
                    contentItem.imageBoxListContainorStyle;
                }

                const imageBoxContainorStyle = {
                  ...{ width: '120px' },
                  ...(contentItem.imageBoxContainorStyle || {}),
                };

                const imageItemShowList = [];

                const ignoreEmpty = contentItem.ignoreEmpty || false;

                (isArray(contentItem.imageList)
                  ? contentItem.imageList
                  : []
                ).forEach((imageOne, imageIndex) => {
                  const imageKey = `contentItem_${contentIndex}_imageList_item_${imageIndex}`;

                  if (ignoreEmpty) {
                    if (!stringIsNullOrWhiteSpace(imageOne)) {
                      imageItemShowList.push({
                        key: imageKey,
                        imageBoxContainorStyle,
                        component: (
                          <ImageBox
                            src={imageOne || defaultEmptyImage}
                            preview={!stringIsEmpty(imageOne || '')}
                            {...imageBoxProps}
                          />
                        ),
                      });
                    }
                  } else {
                    imageItemShowList.push({
                      key: imageKey,
                      imageBoxContainorStyle,
                      component: (
                        <ImageBox
                          src={imageOne || defaultEmptyImage}
                          preview={!stringIsEmpty(imageOne || '')}
                          {...imageBoxProps}
                        />
                      ),
                    });
                  }
                });

                const imageListContainor = (
                  <Space>
                    {imageItemShowList.map((o) => {
                      return (
                        <div key={o.key} style={o.imageBoxContainorStyle}>
                          {o.component}
                        </div>
                      );
                    })}
                  </Space>
                );

                return (
                  <Col key={contentItemKey} lg={24} md={24} sm={24} xs={24}>
                    {imageBoxListContainorStyle == null ? (
                      imageListContainor
                    ) : (
                      <div style={imageBoxListContainorStyle}>
                        {imageListContainor}
                      </div>
                    )}
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.fileBase64Upload) {
                const uploadProps = {
                  ...(contentItem.uploadProps || {}),
                  ...{
                    fileBase64: contentItem.fileBase64 || '',
                    action: contentItem.action || '',
                    tokenSet: this.getUploadTokenObject(),
                  },
                };

                return (
                  <Col key={contentItemKey} lg={24} md={24} sm={24} xs={24}>
                    {this.renderFormInnerComponent(
                      fieldData.label,
                      <FileBase64Upload
                        {...uploadProps}
                        pretreatmentRemoteResponse={
                          this.pretreatmentFileBase64UploadRemoteResponse
                        }
                        afterUploadSuccess={(fileBase64) => {
                          if (isFunction(contentItem.afterUploadSuccess)) {
                            contentItem.afterUploadSuccess(fileBase64);
                          }
                        }}
                      />,
                      fieldData.helper,
                      null,
                      require,
                    )}
                  </Col>
                );
              }

              if (type === cardConfig.contentItemType.videoUpload) {
                const uploadProps = {
                  ...(contentItem.uploadProps || {}),
                  ...{
                    video: contentItem.video || '',
                    showPreview: contentItem.showPreview || false,
                    action: contentItem.action || '',
                    tokenSet: this.getUploadTokenObject(),
                  },
                };

                return (
                  <Col
                    key={contentItemKey}
                    lg={lg || 6}
                    md={md}
                    sm={sm}
                    xs={xs}
                  >
                    {this.renderFormInnerComponent(
                      fieldData.label,
                      <VideoUpload
                        {...uploadProps}
                        pretreatmentRemoteResponse={
                          this.pretreatmentVideoUploadRemoteResponse
                        }
                        afterChangeSuccess={(video) => {
                          if (isFunction(contentItem.afterChangeSuccess)) {
                            contentItem.afterChangeSuccess(video);
                          }
                        }}
                      />,
                      fieldData.helper,
                      formItemLayout,
                      require,
                    )}
                  </Col>
                );
              }

              return (
                <Col key={contentItemKey} lg={lg || 6} md={md} sm={sm} xs={xs}>
                  {type === cardConfig.contentItemType.text
                    ? this.renderFormText(
                        fieldData.label,
                        contentItem.value || '',
                        fieldData.helper,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.input
                    ? this.renderFormInput(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        contentItem.icon || <FormOutlined />,
                        { ...{}, ...(contentItem.otherProps || {}) },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.password
                    ? this.renderFormPassword(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        contentItem.icon || <FormOutlined />,
                        { ...{}, ...(contentItem.otherProps || {}) },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.inputNumber
                    ? this.renderFormInputNumber(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        contentItem.icon || <FormOutlined />,
                        { ...{}, ...(contentItem.otherProps || {}) },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.switch
                    ? this.renderFormSwitch(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        {
                          ...{},
                          ...(contentItem.otherProps || {}),
                          ...{ checked: contentItem.checked || false },
                        },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.flexText ? (
                    <FlexText
                      {...{
                        ...{
                          style: {
                            margin: '5px 0',
                          },
                        },
                        ...(contentItem.flexTextProps || {}),
                      }}
                    />
                  ) : null}

                  {type ===
                  cardConfig.contentItemType.onlyShowTextByFlexText ? (
                    <FlexText
                      style={{
                        margin: '5px 0',
                      }}
                      icon={null}
                      textPrefix={fieldData.label || ''}
                      text={contentItem.value || ''}
                    />
                  ) : null}

                  {type === cardConfig.contentItemType.datePicker
                    ? this.renderFormDatePicker(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        { ...{}, ...(contentItem.otherProps || {}) },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.textarea
                    ? this.renderFormTextArea(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        {
                          ...{ autoSize: { minRows: 3, maxRows: 5 } },
                          ...(contentItem.otherProps || {}),
                        },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.onlyShowTextarea
                    ? this.renderFormOnlyShowTextarea(
                        fieldData.label,
                        contentItem.value,
                        fieldData.helper || '',
                        {
                          ...{ autoSize: { minRows: 3, maxRows: 5 } },
                          ...(contentItem.otherProps || {}),
                          ...{
                            disabled: true,
                            placeholder: `暂无${fieldData.label}信息`,
                          },
                        },
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.onlyShowInput
                    ? this.renderFormOnlyShowInput(
                        fieldData.label,
                        contentItem.value,
                        fieldData.helper || '',
                        contentItem.icon || <FormOutlined />,
                        {
                          ...{},
                          ...(contentItem.otherProps || {}),
                          ...{
                            disabled: true,
                            placeholder: `暂无${fieldData.label}信息`,
                          },
                          ...(contentItem.canCopy || false
                            ? {
                                addonAfter: this.renderGeneralButton({
                                  style: {
                                    border: '0px solid #d9d9d9',
                                    backgroundColor: '#fafafa',
                                    height: '30px',
                                  },
                                  icon: null,
                                  showIcon: false,
                                  disabled: stringIsNullOrWhiteSpace(
                                    contentItem.value || '',
                                  ),
                                  text: '点击复制',
                                  handleClick: () => {
                                    copyToClipboard(contentItem.value || '');
                                  },
                                }),
                              }
                            : {}),
                        },
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.onlyShowInputDatetime
                    ? this.renderFormOnlyShowInput(
                        fieldData.label,
                        formatDatetime({
                          data: toDatetime(contentItem.value),
                          format: datetimeFormat.yearMonthDayHourMinute,
                        }),
                        fieldData.helper || '',
                        contentItem.icon || <FormOutlined />,
                        {
                          ...{},
                          ...(contentItem.otherProps || {}),
                          ...{
                            disabled: true,
                            placeholder: `暂无${fieldData.label}信息`,
                          },
                        },
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.select
                    ? this.renderFormSelect(
                        fieldData.label,
                        fieldData.name,
                        () => {
                          return this.renderFormOptionCore(
                            refitCommonData(
                              isFunction(contentItem.pretreatmentData)
                                ? contentItem.pretreatmentData(
                                    isArray(contentItem.listData)
                                      ? contentItem.listData
                                      : [],
                                  )
                                : isArray(contentItem.listData)
                                ? contentItem.listData
                                : [],
                            ),
                          );
                        },
                        fieldData.helper || '',
                        isFunction(contentItem.onChangeCallback)
                          ? contentItem.onChangeCallback
                          : null,
                        formItemLayout,
                        true,
                        { ...{}, ...(contentItem.otherProps || {}) },
                      )
                    : null}

                  {type === cardConfig.contentItemType.whetherSelect
                    ? renderFormWhetherSelect({
                        label: fieldData.label,
                        name: fieldData.name,
                        helper: fieldData.helper,
                        onChangeCallback: contentItem.onChangeCallback,
                        formItemLayout,
                        required: true,
                        otherProps: {
                          ...{},
                          ...(contentItem.otherProps || {}),
                        },
                      })
                    : null}

                  {type === cardConfig.contentItemType.customSelect
                    ? contentItem.component
                    : null}

                  {type === cardConfig.contentItemType.radio
                    ? this.renderFormSelect(
                        fieldData.label,
                        fieldData.name,
                        () => {
                          return this.renderFormRadioCore(
                            refitCommonData(
                              isArray(contentItem.listData)
                                ? contentItem.listData
                                : [],
                            ),
                          );
                        },
                        fieldData.helper || '',
                        isFunction(contentItem.onChangeCallback)
                          ? contentItem.onChangeCallback
                          : null,
                        formItemLayout,
                        true,
                        { ...{}, ...(contentItem.otherProps || {}) },
                      )
                    : null}

                  {type === cardConfig.contentItemType.whetherRadio
                    ? this.renderFormWhetherRadio(
                        fieldData.label,
                        fieldData.name,
                        fieldData.helper,
                        contentItem.onChangeCallback,
                        formItemLayout,
                        true,
                        { ...{}, ...(contentItem.otherProps || {}) },
                      )
                    : null}

                  {type === cardConfig.contentItemType.customRadio
                    ? contentItem.component
                    : null}

                  {type === cardConfig.contentItemType.onlyShowText
                    ? this.renderFormOnlyShowText(
                        fieldData.label,
                        contentItem.value,
                        (
                          isUndefined(contentItem.showHelper)
                            ? false
                            : contentItem.showHelper || false
                        )
                          ? fieldData.helper || ''
                          : '',
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.innerComponent
                    ? this.renderFormInnerComponent(
                        fieldData.label,
                        contentItem.component,
                        fieldData.helper,
                        formItemLayout,
                        require,
                      )
                    : null}

                  {type === cardConfig.contentItemType.save
                    ? this.renderFormActionItem(
                        this.renderSaveButton(contentItem.config || {}),
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.button
                    ? this.renderFormButton(
                        contentItem.config || {},
                        formItemLayout,
                      )
                    : null}

                  {type === cardConfig.contentItemType.actionList ? (
                    <Space
                      split={
                        isBoolean(contentItem.split || false) ? (
                          contentItem.split || false ? (
                            <Divider type="vertical" />
                          ) : null
                        ) : (
                          contentItem.split
                        )
                      }
                    >
                      {this.buildEveryCardActionList({
                        keyPrefix: `form_card_${contentIndex}_action_key`,
                        configList: contentItem.config || [],
                      })}
                    </Space>
                  ) : null}

                  {type === cardConfig.contentItemType.component
                    ? contentItem.component || null
                    : null}

                  {type === cardConfig.contentItemType.jsonView
                    ? this.renderJsonView(contentItem.value)
                    : null}

                  {type === cardConfig.contentItemType.nowTime
                    ? this.renderFormNowTimeField({ formItemLayout })
                    : null}
                </Col>
              );
            })
          : null}
      </Row>
    );
  };

  buildEveryCardActionList = ({ keyPrefix = '', configList }) => {
    const list = [];

    (isArray(configList) ? configList : []).forEach((item, index) => {
      if ((item || null) != null) {
        const {
          hidden,
          buildType,
          icon,
          text,
          component: componentSource,
        } = {
          ...{
            hidden: false,
            buildType: null,
            icon: null,
            text: '',
            component: null,
          },
          ...item,
        };

        if (!hidden) {
          const itemKey = `${keyPrefix || 'formAction'}_${index}`;

          let itemAdjust = item;

          switch (buildType) {
            case cardConfig.extraBuildType.refresh:
              itemAdjust = this.renderRefreshButton();
              break;

            case cardConfig.extraBuildType.save:
              itemAdjust = this.renderSaveButton(item);
              break;

            case cardConfig.extraBuildType.generalButton:
              itemAdjust = this.renderGeneralButton(item);
              break;

            case cardConfig.extraBuildType.button:
              itemAdjust = buildButton(item);
              break;

            case cardConfig.extraBuildType.dropdown:
              itemAdjust = buildDropdown(item);
              break;

            case cardConfig.extraBuildType.dropdownButton:
              itemAdjust = buildDropdownButton(item);
              break;

            case cardConfig.extraBuildType.dropdownEllipsis:
              itemAdjust = buildDropdownEllipsis(item);
              break;

            case cardConfig.extraBuildType.iconInfo:
              itemAdjust = <IconInfo icon={icon} text={text} />;
              break;

            case cardConfig.extraBuildType.component:
              itemAdjust = componentSource || null;
              break;

            default:
              recordObject({
                message: '未找到匹配的构建模式',
                config: item,
              });

              itemAdjust = null;
              break;
          }

          list.push(<Fragment key={itemKey}>{itemAdjust}</Fragment>);
        }
      }
    });

    return list;
  };
}

export default Common;
