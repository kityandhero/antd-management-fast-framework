import React from 'react';
import {
  Form,
  Row,
  Col,
  Card,
  Affix,
  Spin,
  Divider,
  Button,
  Input,
  InputNumber,
  Switch,
  DatePicker,
  message,
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
import ReactJson from 'react-json-view';
import SyntaxHighlighter from 'react-syntax-highlighter';

import {
  getDerivedStateFromPropsForUrlParams,
  isEqual,
  isFunction,
  defaultCommonState,
  buildFieldDescription,
  buildFieldHelper,
  isUndefined,
  recordText,
  refitCommonData,
  isInvalid,
  searchFromList,
  stringIsNullOrWhiteSpace,
  recordObject,
  isObject,
  getGuid,
  formatDatetime,
  isArray,
  showRuntimeErrorMessage,
  stringIsEmpty,
  showErrorMessage,
  isBoolean,
  toDatetime,
  isNull,
  checkFromConfig,
} from '../../utils/tools';
import { pretreatmentRequestParams } from '../../utils/requestAssistor';
import {
  defaultEmptyImage,
  formContentConfig,
  unlimitedWithStringFlag,
  datetimeFormat,
} from '../../utils/constants';
import EverySpace from '../../customComponents/EverySpace';
import FlexText from '../../customComponents/FlexText';
import FlexBox from '../../customComponents/FlexBox';
import ImageUpload from '../../customComponents/ImageUpload';
import VideoUpload from '../../customComponents/VideoUpload';
import ImageBox from '../../customComponents/ImageBox';
import HelpCard from '../../customComponents/HelpCard';
import IconInfo from '../../customComponents/IconInfo';
import FileBase64Upload from '../../customComponents/FileBase64Upload';
import {
  buildFormRadioItem,
  buildFormRadio,
  buildFormOptionItem,
  buildFormSelect,
  buildSearchFormSelect,
} from '../../customComponents/FunctionComponent';

import Core from '../Core';

import styles from './index.less';

const FormItem = Form.Item;
const { TextArea, Password } = Input;

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

  // eslint-disable-next-line no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => false;

  // 该方法必须重载覆盖
  // eslint-disable-next-line no-unused-vars
  getApiData = (props) => {
    showRuntimeErrorMessage('getApiData 方法需要重载实现');

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
      this.initLoad();
    }

    this.initOther();
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

  // eslint-disable-next-line no-unused-vars
  checkLoadRequestParams = (o) => {
    return true;
  };

  initLoad = (callback = null) => {
    const {
      loadApiPath,
      firstLoadSuccess,
      reloading: reloadingBefore,
      dataLoading,
      loadSuccess,
    } = this.state;

    try {
      if ((loadApiPath || '') === '') {
        showRuntimeErrorMessage('loadApiPath需要配置');

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

        if (dataLoading && !loadSuccess) {
          this.initLoadCore(submitData || {}, callback);
        } else {
          this.setState(
            {
              dataLoading: true,
              loadSuccess: false,
            },
            () => {
              this.initLoadCore(submitData || {}, callback);
            },
          );
        }
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

              this.afterLoadSuccess(
                metaData || null,
                metaListData || [],
                metaExtra || null,
                metaOriginalData,
              );
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

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  reloadData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ reloading: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  searchData = (otherState, callback = null) => {
    const s = { ...(otherState || {}), ...{ searching: true } };

    this.setState(s, () => {
      this.initLoad(callback);
    });
  };

  refreshData = (callback = null) => {
    this.setState({ refreshing: true }, () => {
      this.initLoad(callback);
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

  afterLoadSuccess = (
    // eslint-disable-next-line no-unused-vars
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  ) => {};

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
      message.info('数据正在处理中，请稍等一下再点哦');

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

    const title = label || '添加时间';

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          value={formatDatetime(
            new Date(),
            datetimeFormat.yearMonthDayHourMinute,
          )}
          addonBefore={<FormOutlined />}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </FormItem>
    );
  };

  renderFormCreateTimeField = (
    // eslint-disable-next-line no-unused-vars
    name = 'createTime',
    helper = '数据的添加时间',
    label = '添加时间',
    formItemLayout = null,
  ) => {
    const title = label || '添加时间';

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          addonBefore={<FormOutlined />}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </FormItem>
    );
  };

  renderFormUpdateTimeField = (
    // eslint-disable-next-line no-unused-vars
    name = 'updateTime',
    helper = '数据的最后修改时间',
    label = '最后修改时间',
    formItemLayout = null,
  ) => {
    const title = label || '最后修改时间';

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...(formItemLayout || {})}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input
          addonBefore={<FormOutlined />}
          disabled
          placeholder={buildFieldDescription(resultCheck.label)}
        />
      </FormItem>
    );
  };

  renderFormRadioCore = (listDataSource, adjustListDataCallback = null) => {
    return buildFormRadioItem({ list: listDataSource, adjustListDataCallback });
  };

  renderFormOptionCore = (listDataSource, adjustListDataCallback = null) => {
    return buildFormOptionItem({
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
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
        >
          <Input {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <Input {...otherInputProps} />
      </FormItem>
    );
  };

  renderSearchInputNumber = (
    label,
    name,
    helper = null,
    inputProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        style: { width: '100%' },
        min: 0,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
        >
          <InputNumber {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
      >
        <InputNumber {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormDisplay = (
    label,
    content,
    formItemLayout = {},
    useDisplayBoxStyle = true,
  ) => {
    const title = label;

    let labelText = 'object';

    if (isObject(title)) {
      showRuntimeErrorMessage('label必须为文本');

      recordObject(label);
    } else {
      labelText = title;
    }

    return (
      <FormItem {...formItemLayout} label={labelText}>
        <div className={useDisplayBoxStyle ? styles.displayBox : null}>
          {content}
        </div>
      </FormItem>
    );
  };

  renderFormHiddenWrapper = (children, hidden = true) => {
    if (hidden) {
      return <div className={styles.hidden}>{children}</div>;
    }

    return <>{children}</>;
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
    return this.renderFormInput(
      fieldData.label || null,
      fieldData.name || null,
      required,
      fieldData.helper || null,
      icon,
      inputProps,
      canOperate,
      formItemLayout,
      reminderPrefix,
      hidden,
    );
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
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: canOperate
          ? buildFieldDescription(title, reminderPrefix)
          : '暂无数据',
        disabled: !canOperate,
      },
      ...(inputProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return this.renderFormHiddenWrapper(
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
            },
          ]}
        >
          <Input {...otherInputProps} />
        </FormItem>,
        hidden,
      );
    }

    return this.renderFormHiddenWrapper(
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Input {...otherInputProps} />
      </FormItem>,
      hidden,
    );
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
    const title = label;

    const otherSwitchProps = {
      ...{
        disabled: !canOperate,
      },
      ...(otherProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return this.renderFormHiddenWrapper(
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
            },
          ]}
        >
          <FlexBox
            left={`是否开启${label}:`}
            right={<Switch {...otherSwitchProps} />}
          />
        </FormItem>,
        hidden,
      );
    }

    return this.renderFormHiddenWrapper(
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <FlexBox
          left={`是否开启${label}：`}
          right={<Switch {...otherSwitchProps} />}
        />
      </FormItem>,
      hidden,
    );
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
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: buildFieldDescription(title, '输入'),
      },
      ...(inputProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
            },
          ]}
        >
          <Password {...otherInputProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Password {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormOnlyShowText = (
    label,
    value,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    const title = label;

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        className={requiredForShow ? styles.formItemOnlyShowText : null}
        // style={{ marginBottom: 0 }}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        {value}
      </FormItem>
    );
  };

  renderSyntaxHighlighter = (language, value) => {
    return (
      <>
        {isObject(value) ? (
          <SyntaxHighlighter
            showLineNumbers
            wrapLines
            lineProps={{ style: { paddingBottom: 8 } }}
            language={language}
            // style={docco}
          >
            {language === 'javascript'
              ? JSON.stringify(value || {}, null, '    ')
              : value}
          </SyntaxHighlighter>
        ) : (
          <SyntaxHighlighter
            showLineNumbers
            wrapLines
            lineProps={{ style: { paddingBottom: 8 } }}
            language={language}
            // style={docco}
          >
            {language === 'javascript'
              ? JSON.stringify(JSON.parse(value || null), null, '    ')
              : value}
          </SyntaxHighlighter>
        )}
      </>
    );
  };

  renderJsonView = (value) => {
    return (
      <>
        {isObject(value) ? (
          <ReactJson
            src={value}
            theme="monokai"
            name={false}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
          />
        ) : (
          <ReactJson
            src={JSON.parse(value || '{}')}
            theme="monokai"
            name={false}
            displayDataTypes={false}
            displayObjectSize={false}
            enableClipboard={false}
          />
        )}
      </>
    );
  };

  renderFormInnerComponent = (
    label,
    innerComponent,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    const title = label;

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        className={requiredForShow ? styles.formItemOnlyShowText : null}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        {innerComponent}
      </FormItem>
    );
  };

  renderFormOnlyShowSyntaxHighlighter = (
    language,
    label,
    value,
    helper = null,
    formItemLayout = {},
    requiredForShow = false,
  ) => {
    return this.renderFormInnerComponent(
      label,
      this.renderSyntaxHighlighter(language, value),
      helper,
      formItemLayout,
      requiredForShow,
    );
  };

  renderFormOnlyShowTextarea = (
    label,
    value,
    helper = null,
    textAreaProps = { disabled: true },
    formItemLayout = {},
  ) => {
    const title = label;

    const otherTextAreaProps = {
      ...{
        placeholder: '暂无数据',
        value: stringIsNullOrWhiteSpace(value || '') ? '' : value,
      },
      ...(textAreaProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <TextArea {...otherTextAreaProps} />
      </FormItem>
    );
  };

  renderFormText = (label, value, helper = null, formItemLayout = {}) => {
    const title = label;

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        {value}
      </FormItem>
    );
  };

  renderFormOnlyShowInput = (
    label,
    value,
    helper = null,
    icon = <FormOutlined />,
    inputProps = { disabled: true },
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputProps = {
      ...{
        addonBefore: icon,
        placeholder: '暂无数据',
        value: stringIsNullOrWhiteSpace(value || '') ? '' : value,
      },
      ...(inputProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required: false,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <Input {...otherInputProps} />
      </FormItem>
    );
  };

  renderFormInputNumber = (
    label,
    name,
    required = false,
    helper = null,
    inputNumberProps = {},
    canOperate = true,
    formItemLayout = {},
  ) => {
    const title = label;

    const otherInputNumberProps = {
      ...{
        style: { width: '100%' },
        min: 0,
        placeholder: buildFieldDescription(title, '输入'),
        disabled: !canOperate,
      },
      ...(inputNumberProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
            },
          ]}
        >
          <InputNumber {...otherInputNumberProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <InputNumber {...otherInputNumberProps} />
      </FormItem>
    );
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
    const title = label;

    const otherTextAreaProps = {
      ...{
        placeholder: buildFieldDescription(title, '输入'),
        disabled: !canOperate,
      },
      ...(textAreaProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
          rules={[
            {
              required,
              message: buildFieldDescription(resultCheck.label),
            },
          ]}
        >
          <TextArea {...otherTextAreaProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <TextArea {...otherTextAreaProps} />
      </FormItem>
    );
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
    const title = label;

    const otherDatePickerProps = {
      ...{
        style: { width: '100%' },
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        inputReadOnly: true,
        placeholder: buildFieldDescription(title, '选择'),
      },
      ...(datePickerProps || {}),
    };

    const resultCheck = checkFromConfig({
      label: title,
      name: '',
      helper,
    });

    if (!canOperate) {
      return (
        <FormItem
          {...formItemLayout}
          label={resultCheck.label}
          name={resultCheck.name}
          extra={
            stringIsNullOrWhiteSpace(resultCheck.helper || '')
              ? null
              : buildFieldHelper(resultCheck.helper)
          }
        >
          <DatePicker {...otherDatePickerProps} />
        </FormItem>
      );
    }

    return (
      <FormItem
        {...formItemLayout}
        label={resultCheck.label}
        name={resultCheck.name}
        extra={
          stringIsNullOrWhiteSpace(resultCheck.helper || '')
            ? null
            : buildFieldHelper(resultCheck.helper)
        }
        rules={[
          {
            required,
            message: buildFieldDescription(resultCheck.label),
          },
        ]}
      >
        <DatePicker {...otherDatePickerProps} />
      </FormItem>
    );
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

  renderDisabledButton = (buttonText = '') => {
    return (
      <Button type="primary" disabled>
        {this.getDisabledButtonIcon()}
        {buttonText || '保存'}
      </Button>
    );
  };

  renderSaveButton = (buttonText = '', onClick = null) => {
    return this.renderGeneralButton({
      text: buttonText || '保存',
      onClick:
        onClick == null
          ? (e) => {
              this.validate(e);
            }
          : onClick,
    });
  };

  renderGeneralButton = ({ key = null, type, size, text, icon, onClick }) => {
    const buttonDisabled = this.getSaveButtonDisabled();
    const buttonProcessing = this.getSaveButtonProcessing();
    const ico = (icon || null) == null ? this.getSaveButtonIcon() : icon;

    return (
      <Button
        key={key || getGuid()}
        type={type || 'primary'}
        size={size || null}
        disabled={buttonDisabled}
        onClick={(e) => {
          if (isFunction(onClick)) {
            onClick(e);
          } else {
            showErrorMessage('onClick is not function');
          }
        }}
      >
        {buttonProcessing ? <LoadingOutlined /> : ico}
        {text || 'button'}
      </Button>
    );
  };

  buildOtherFormProps = () => {
    return {};
  };

  renderRefreshButton = () => {
    const { dataLoading, reloading, processing, loadSuccess } = this.state;

    return (
      <Button
        disabled={dataLoading || reloading || processing || !loadSuccess}
        onClick={this.reloadData}
      >
        {reloading ? <LoadingOutlined /> : <ReloadOutlined />}
        刷新
      </Button>
    );
  };

  getUploadTokenObject = () => {
    const text = '需要在继承中重新实现 getUploadTokenObject';

    showRuntimeErrorMessage(text);

    throw new Error(text);
  };

  beforeVideoUpload = (file) => {
    const isVideo = file.type === 'video/mp4';

    if (!isVideo) {
      showRuntimeErrorMessage('请上传视频文件!');
    }
    const isLt3M = file.size / 1024 / 1024 < 3;
    if (!isLt3M) {
      showRuntimeErrorMessage('视频文件不能超过3MB!');
    }

    return isVideo && isLt3M;
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentImageUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentImageUploadRemoteResponse';

    showRuntimeErrorMessage(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentFileBase64UploadRemoteResponse = (response) => {
    const text =
      '需要在继承中重新实现 pretreatmentFileBase64UploadRemoteResponse';

    showRuntimeErrorMessage(text);

    throw new Error(text);
  };

  // eslint-disable-next-line no-unused-vars
  pretreatmentVideoUploadRemoteResponse = (response) => {
    const text = '需要在继承中重新实现 pretreatmentVideoUploadRemoteResponse';

    showRuntimeErrorMessage(text);

    throw new Error(text);
  };

  buildFormContentWrapperTypeConfig = () => {
    return { mode: formContentConfig.wrapperType.page };
  };

  buildFormContentToolBarConfig = () => {
    return null;
  };

  buildFormContentToolBar = () => {
    const config = this.buildFormContentToolBarConfig();

    if ((config || null) == null) {
      return null;
    }

    const { stick, title, tools } = {
      ...{ stick: false, title: '工具栏', tools: [] },
      ...config,
    };

    if (!isArray(tools)) {
      showErrorMessage('工具栏配置数据无效');

      recordObject(config);

      return null;
    }

    const toolList = tools.map((o, index) => {
      return { ...o, ...{ key: `toolItem_${index}` } };
    });

    const bar = (
      <div style={{ backgroundColor: 'rgb(240, 242, 245)' }}>
        <Card
          title={<IconInfo icon={<ToolOutlined />} text={title || '工具栏'} />}
          bordered={false}
          bodyStyle={{ padding: 0 }}
          extra={
            <Space split={<Divider type="vertical" />}>
              {toolList.map((o) => {
                return (
                  <Tooltip key={o.key} title={o.title || ''}>
                    {o.component}
                  </Tooltip>
                );
              })}
            </Space>
          }
        />

        <EverySpace size={2} direction="horizontal" />
      </div>
    );

    if (isBoolean(stick) && stick) {
      return (
        <>
          <Affix offsetTop={0}>{bar}</Affix>
          <EverySpace size={20} direction="horizontal" />
        </>
      );
    }

    return (
      <>
        {bar}
        <EverySpace size={20} direction="horizontal" />
      </>
    );
  };

  buildFormContentToolBarWrapper = () => {
    const toolBar = this.buildFormContentToolBar();

    if ((toolBar || null) == null) {
      return null;
    }

    return <>{toolBar}</>;
  };

  buildFormContentHelpConfig = () => {
    return null;
  };

  buildFormContentHelp = () => {
    const formContentWrapperTypeConfig =
      this.buildFormContentWrapperTypeConfig() || {
        mode: formContentConfig.wrapperType.page,
      };

    const configData = {
      ...{ mode: formContentConfig.wrapperType.page },
      ...(formContentWrapperTypeConfig || {}),
    };
    const { mode } = configData;

    const config = this.buildFormContentHelpConfig();

    if ((config || null) == null) {
      return null;
    }

    const { title, showNumber, list } = {
      ...{ title: '操作帮助', showNumber: true, list: [] },
      ...config,
    };

    if (!isArray(list)) {
      showErrorMessage('帮助条目数据无效');

      recordObject(config);

      return null;
    }

    return (
      <HelpCard
        border={
          mode !== formContentConfig.wrapperType.model &&
          mode !== formContentConfig.wrapperType.drawer
        }
        compact={mode === formContentConfig.wrapperType.model}
        helpBoxProps={{
          title: title || '操作帮助',
          showNumber: showNumber || false,
          list,
        }}
      />
    );
  };

  buildFormContentHelpWrapper = () => {
    const formContentWrapperTypeConfig =
      this.buildFormContentWrapperTypeConfig() || {
        mode: formContentConfig.wrapperType.page,
      };

    const configData = {
      ...{ mode: formContentConfig.wrapperType.page },
      ...(formContentWrapperTypeConfig || {}),
    };
    const { mode } = configData;

    const help = this.buildFormContentHelp();

    if ((help || null) == null) {
      return null;
    }

    return (
      <>
        {mode !== formContentConfig.wrapperType.model ? (
          <EverySpace size={22} direction="horizontal" />
        ) : null}

        {help}
      </>
    );
  };

  buildFormContent = (config) => {
    const formContentWrapperTypeConfig =
      this.buildFormContentWrapperTypeConfig() || {
        mode: formContentConfig.wrapperType.page,
      };
    const configData = {
      ...{ mode: formContentConfig.wrapperType.page },
      ...(formContentWrapperTypeConfig || {}),
      ...{ list: [] },
      ...(config || {}),
    };
    const { mode, list } = configData;

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
        {this.buildFormContentToolBarWrapper()}

        {listData.map((item, index) => {
          const key = `formContent_key_${index}`;

          if (stringIsNullOrWhiteSpace(item)) {
            return <EverySpace key={key} size={24} direction="horizontal" />;
          }

          const {
            title,
            extra,
            hidden,
            cardType,
            cardBodyStyle,
            spinning,
            items: contentItems,
            otherComponent,
            formItemLayout,
          } = {
            ...{
              title: '',
              extra: null,
              hidden: false,
              cardType: formContentConfig.cardType.normal,
              cardBodyStyle: {},
              items: [],
              otherComponent: null,
              formItemLayout: null,
            },
            ...(item || {}),
          };

          if (hidden || false) {
            return null;
          }

          const {
            icon,
            text,
            subText,
            addonBefore: titleAddonBefore,
            addonAfter: titleAddonAfter,
          } = {
            ...{
              icon: <ContactsOutlined />,
              text: '',
              subText: '',
              addonBefore: null,
              addonAfter: null,
            },
            ...(title || {}),
          };
          const { affix, list: extraItemList } = {
            ...{ affix: false, list: [] },
            ...(extra || {}),
          };

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

          const extraItems = extraListData.map((extraItem, extraItemIndex) => {
            const extraItemKey = `formContent_key_${index}_extra_${extraItemIndex}`;

            if (stringIsNullOrWhiteSpace(extraItem)) {
              return <Divider key={extraItemKey} type="vertical" />;
            }

            return <span key={extraItemKey}>{extraItem}</span>;
          });

          const hasExtraItems = extraItems.length > 0;

          let cardTypeBodyStyle = {};

          if (cardType === formContentConfig.cardType.help) {
            cardTypeBodyStyle = {
              paddingTop: '12px',
              paddingBottom: '12px',
            };
          }

          return (
            <Card
              key={key}
              title={
                index === 0 &&
                mode !== formContentConfig.wrapperType.page ? null : (text ||
                    '') === '' && (subText || '') === '' ? null : (
                  <>
                    <FlexText
                      icon={icon || null}
                      text={text || ''}
                      subText={subText || ''}
                      addonBefore={
                        (titleAddonBefore || null) == null
                          ? null
                          : titleAddonBefore
                      }
                      addonAfter={
                        (titleAddonAfter || null) == null
                          ? null
                          : titleAddonAfter
                      }
                    />
                  </>
                )
              }
              bordered={false}
              extra={
                hasExtraItems ? (
                  mode === formContentConfig.wrapperType.page && affix ? (
                    <Affix offsetTop={20}>
                      <div>{extraItems}</div>
                    </Affix>
                  ) : (
                    <>
                      <div>{extraItems}</div>
                    </>
                  )
                ) : null
              }
              bodyStyle={
                mode === formContentConfig.wrapperType.model
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
                  {this.buildFormContentItem(
                    mode,
                    isArray(contentItems)
                      ? contentItems.map((o) => {
                          return {
                            ...o,
                            ...{ formItemLayout: formItemLayout || null },
                          };
                        })
                      : [],
                    index,
                  )}

                  {otherComponent || null}
                </>
              </Spin>
            </Card>
          );
        })}

        {this.buildFormContentHelpWrapper()}
      </>
    );
  };

  buildFormContentItem = (mode, contentItems, contentIndex) => {
    return (
      <Row gutter={24}>
        {isArray(contentItems)
          ? contentItems.map((contentItem, contentItemIndex) => {
              const contentItemKey = `formContent_key_${contentIndex}_content_${contentItemIndex}`;

              const {
                lg: lgValue,
                type,
                require,
                fieldData: fieldDataValue,
                hidden,
                canOperate,
                formItemLayout,
              } = {
                ...{
                  lg: 6,
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
                (lgValue || 6) < 12 &&
                mode !== formContentConfig.wrapperType.page
                  ? 12
                  : lgValue;

              lg =
                lg > 12 && mode !== formContentConfig.wrapperType.page
                  ? 24
                  : lg;
              lg = lg > 24 ? 24 : lg;

              if (type === formContentConfig.contentItemType.imageUpload) {
                const uploadProps = {
                  ...(contentItem.uploadProps || {}),
                  ...{
                    image: contentItem.image || '',
                    action: contentItem.action || '',
                    tokenSet: this.getUploadTokenObject(),
                  },
                };

                return (
                  <Col key={contentItemKey} lg={24} md={12} sm={24} xs={24}>
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

              if (type === formContentConfig.contentItemType.imageShow) {
                let imageBoxContainorStyle = null;

                const imageBoxProps = {
                  ...{
                    loadingEffect: true,
                    errorOverlayVisible: true,
                    showErrorIcon: false,
                    alt: '',
                  },
                  ...(contentItem.imageBoxProps || {}),
                };

                if ((contentItem.imageBoxContainorStyle || null) != null) {
                  imageBoxContainorStyle = contentItem.imageBoxContainorStyle;
                }

                const imageBox = (
                  <ImageBox
                    src={contentItem.image || defaultEmptyImage}
                    preview={!stringIsEmpty(contentItem.image || '')}
                    {...imageBoxProps}
                  />
                );

                return (
                  <Col key={contentItemKey} lg={24} md={12} sm={24} xs={24}>
                    {imageBoxContainorStyle == null ? (
                      imageBox
                    ) : (
                      <div style={imageBoxContainorStyle}>{imageBox}</div>
                    )}
                  </Col>
                );
              }

              if (type === formContentConfig.contentItemType.fileBase64Upload) {
                const uploadProps = {
                  ...(contentItem.uploadProps || {}),
                  ...{
                    fileBase64: contentItem.fileBase64 || '',
                    action: contentItem.action || '',
                    tokenSet: this.getUploadTokenObject(),
                  },
                };

                return (
                  <Col key={contentItemKey} lg={24} md={12} sm={24} xs={24}>
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

              if (type === formContentConfig.contentItemType.videoUpload) {
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
                    md={12}
                    sm={24}
                    xs={24}
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
                <Col key={contentItemKey} lg={lg || 6} md={12} sm={24} xs={24}>
                  {type === formContentConfig.contentItemType.text
                    ? this.renderFormText(
                        fieldData.label,
                        contentItem.value || '',
                        fieldData.helper,
                        formItemLayout,
                      )
                    : null}

                  {type === formContentConfig.contentItemType.input
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

                  {type === formContentConfig.contentItemType.password
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

                  {type === formContentConfig.contentItemType.inputNumber
                    ? this.renderFormInputNumber(
                        fieldData.label,
                        fieldData.name,
                        require,
                        fieldData.helper,
                        { ...{}, ...(contentItem.otherProps || {}) },
                        canOperate,
                        formItemLayout,
                      )
                    : null}

                  {type === formContentConfig.contentItemType.switch
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

                  {type === formContentConfig.contentItemType.flexText ? (
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
                  formContentConfig.contentItemType.onlyShowTextByFlexText ? (
                    <FlexText
                      style={{
                        margin: '5px 0',
                      }}
                      icon={null}
                      textPrefix={fieldData.label || ''}
                      text={contentItem.value || ''}
                    />
                  ) : null}

                  {type === formContentConfig.contentItemType.datePicker
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

                  {type === formContentConfig.contentItemType.textarea
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

                  {type === formContentConfig.contentItemType.onlyShowTextarea
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

                  {type === formContentConfig.contentItemType.onlyShowInput
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
                        },
                        formItemLayout,
                      )
                    : null}

                  {type ===
                  formContentConfig.contentItemType.onlyShowInputDatetime
                    ? this.renderFormOnlyShowInput(
                        fieldData.label,
                        formatDatetime(
                          toDatetime(contentItem.value),
                          datetimeFormat.yearMonthDayHourMinute,
                        ),
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

                  {type === formContentConfig.contentItemType.select
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

                  {type === formContentConfig.contentItemType.whetherSelect
                    ? this.renderFormWhetherSelect(
                        fieldData.label,
                        fieldData.name,
                        fieldData.helper,
                        contentItem.onChangeCallback,
                        formItemLayout,
                        true,
                        { ...{}, ...(contentItem.otherProps || {}) },
                      )
                    : null}

                  {type === formContentConfig.contentItemType.customSelect
                    ? contentItem.component
                    : null}

                  {type === formContentConfig.contentItemType.radio
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

                  {type === formContentConfig.contentItemType.whetherRadio
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

                  {type === formContentConfig.contentItemType.customRadio
                    ? contentItem.component
                    : null}

                  {type === formContentConfig.contentItemType.onlyShowText
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

                  {type === formContentConfig.contentItemType.innerComponent
                    ? this.renderFormInnerComponent(
                        fieldData.label,
                        contentItem.component,
                        fieldData.helper,
                        formItemLayout,
                        require,
                      )
                    : null}

                  {type === formContentConfig.contentItemType.component
                    ? contentItem.component || null
                    : null}

                  {type === formContentConfig.contentItemType.jsonView
                    ? this.renderJsonView(contentItem.value)
                    : null}

                  {type === formContentConfig.contentItemType.nowTime
                    ? this.renderFormNowTimeField({ formItemLayout })
                    : null}
                </Col>
              );
            })
          : null}
      </Row>
    );
  };
}

export default Common;
