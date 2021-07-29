import React from 'react';
import {
  Form,
  Row,
  Col,
  Card,
  Alert,
  List,
  Tooltip,
  Button,
  DatePicker,
  BackTop,
  Divider,
  message,
  Badge,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  LoadingOutlined,
  PictureOutlined,
  FormOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  defaultListState,
  buildFieldDescription,
  isArray,
  isUndefined,
  stringToMoment,
  recordText,
  getDerivedStateFromPropsForUrlParams,
  showRuntimeErrorMessage,
  stringIsNullOrWhiteSpace,
  isFunction,
  copyToClipboard,
  replaceTargetText,
  formatDatetime,
  formatMoney,
} from '../../../utils/tools';
import {
  searchFormContentConfig,
  columnFacadeMode,
  defaultEmptyImage,
  datetimeFormat,
  contentConfig,
  pageHeaderRenderType,
} from '../../../utils/constants';
import EverySpace from '../../../customComponents/EverySpace';
import IconInfo from '../../../customComponents/IconInfo';
import EllipsisCustom from '../../../customComponents/EllipsisCustom';
import Ellipsis from '../../../customComponents/Ellipsis';
import ImageBox from '../../../customComponents/ImageBox';
import HelpCard from '../../../customComponents/HelpCard';
import {
  buildButtonGroup,
  buildDropdownEllipsis,
  pageHeaderTitle,
  pageHeaderTagWrapper,
  pageHeaderContent,
  pageHeaderExtraContent,
  buildTagList,
} from '../../../customComponents/FunctionComponent';
import {
  avatarImageLoadResultCollection,
  decorateAvatar,
} from '../../../customComponents/DecorateAvatar';
import { tableSizeConfig } from '../../../customComponents/StandardTableCustom';
import AuthorizationWrapper from '../../AuthorizationWrapper';

import DensityAction from '../DensityAction';
import ColumnSetting from '../ColumnSetting';
import BatchAction from '../BatchAction';

import styles from './index.less';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ListBase extends AuthorizationWrapper {
  formRef = React.createRef();

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    this.columnsOtherConfig = [];

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
      ...{
        renderPageHeaderWrapper: true,
        listTitle: '检索结果',
        defaultAvatarIcon: <PictureOutlined />,
        avatarImageLoadResult: avatarImageLoadResultCollection.wait,
        showPageHeaderAvatar: false,
        tableSize: tableSizeConfig.middle,
        counterSetColumnsOtherConfig: 0,
        renderSearchForm: true,
        showListViewItemActionSelect: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.doOtherAfterLoadSuccess(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
  ) => {};

  onDateRangeChange = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedDataTableDataRows: rows,
    });
  };

  clearSelectRow = () => {
    this.setState({
      selectedDataTableDataRows: [],
    });
  };

  setSearchFormFieldsValue = v => {
    const form = this.getSearchForm();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetSearchFormFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetSearchFormFieldsValue = v => {};

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  getColumnWrapper = () => [];

  buildColumnFromWrapper = () => {
    const list = this.getColumnWrapper() || [];

    return this.buildColumnList(list);
  };

  buildColumnList = list => {
    return (isArray(list) ? list : []).map(o => {
      return this.buildColumnItem(o);
    });
  };

  buildColumnItem = o => {
    const d = { ...o };

    const { dataTarget, showHelper, placeholder } = {
      ...{ showHelper: false, placeholder: false },
      ...(o || {}),
    };

    if (placeholder || false) {
      return d;
    }

    if ((dataTarget || null) == null) {
      const text = `错误的列配置,缺少dataTarget:${JSON.stringify({
        el: this.constructor.name,
        column: o,
      })}`;

      showRuntimeErrorMessage(text);

      recordText(text);
    } else {
      const { label, name, helper } = dataTarget;

      if ((label || null) == null || (name || null) == null) {
        const text = `错误的列配置，dataTarget内容缺失:${JSON.stringify({
          column: o,
        })}`;

        showRuntimeErrorMessage(text);

        recordText(text);
      } else {
        d.title = showHelper ? (
          <IconInfo
            icon={<InfoCircleOutlined />}
            iconPosition="right"
            iconTooltip={helper}
            text={label}
          />
        ) : (
          label
        );
        d.dataIndex = name;
      }
    }

    const {
      align,
      showRichFacade,
      facadeMode,
      facadeConfig: facadeConfigSource,
      facadeConfigBuilder,
      sorter,
    } = {
      ...{
        align: 'center',
        showRichFacade: false,
        facadeMode: null,
        facadeConfig: {},
        facadeConfigBuilder: () => {},
        sorter: false,
      },
      ...d,
    };

    d.align = align;
    d.sorter = sorter;

    if (!isFunction(d.render) && showRichFacade) {
      const { canCopy, emptyValue } = {
        ...{ canCopy: false, emptyValue: null },
        ...d,
      };

      let tooltipPlacement = 'top';

      if (align === 'left') {
        tooltipPlacement = 'topLeft';
      }

      if (align === 'right') {
        tooltipPlacement = 'topRight';
      }

      d.render = (value, record) => {
        let val = value;

        let facadeConfig = facadeConfigSource || {};

        if (isFunction(facadeConfigBuilder)) {
          facadeConfig = {
            ...facadeConfig,
            ...(facadeConfigBuilder(value, record) || {}),
          };
        }

        if (
          stringIsNullOrWhiteSpace(facadeMode) ||
          facadeMode === columnFacadeMode.ellipsis
        ) {
          if (isFunction(d.formatValue)) {
            val = d.formatValue(value, record);
          }

          const { color } = {
            ...{ color: null },
            ...facadeConfig,
          };

          if (stringIsNullOrWhiteSpace(val)) {
            return emptyValue;
          }

          if (canCopy) {
            return (
              <>
                <EllipsisCustom
                  style={{ ...((color || null) == null ? {} : { color }) }}
                  tooltip={{ placement: tooltipPlacement }}
                  lines={1}
                  removeChildren
                  extraContent={
                    <>
                      <a
                        onClick={() => {
                          copyToClipboard(val);
                        }}
                      >
                        {replaceTargetText(val, '***', 2, 6)}
                      </a>
                    </>
                  }
                >
                  {val || emptyValue} [点击复制]
                </EllipsisCustom>
              </>
            );
          }

          return (
            <>
              <Ellipsis
                style={{ ...((color || null) == null ? {} : { color }) }}
                tooltip={{ placement: tooltipPlacement }}
                lines={1}
              >
                {val || emptyValue}
              </Ellipsis>
            </>
          );
        }

        if (facadeMode === columnFacadeMode.datetime) {
          const { color, datetimeFormat: datetimeFormatValue } = {
            ...{
              color: null,
              datetimeFormat: datetimeFormat.yearMonthDayHourMinuteSecond,
            },
            ...facadeConfig,
          };

          val = stringIsNullOrWhiteSpace(val)
            ? ''
            : formatDatetime(val, datetimeFormatValue) || '';

          return (
            <>
              <Ellipsis
                style={{ ...((color || null) == null ? {} : { color }) }}
                tooltip={{ placement: tooltipPlacement }}
                lines={1}
              >
                {val || emptyValue}
              </Ellipsis>
            </>
          );
        }

        if (facadeMode === columnFacadeMode.money) {
          const { color } = {
            ...{ color: null },
            ...facadeConfig,
          };

          val = stringIsNullOrWhiteSpace(val) ? '' : val;

          return (
            <>
              <Ellipsis
                style={{ ...((color || null) == null ? {} : { color }) }}
                tooltip={{ placement: tooltipPlacement }}
                lines={1}
              >
                {formatMoney(val) || emptyValue}
              </Ellipsis>
            </>
          );
        }

        if (facadeMode === columnFacadeMode.image) {
          if (isFunction(d.formatValue)) {
            val = d.formatValue(value, record);
          }

          const { imageWidth, circle, previewSimpleMask } = {
            ...{ imageWidth: '30px', circle: true, previewSimpleMask: true },
            ...facadeConfig,
          };

          return (
            <>
              <Row>
                <Col flex="auto" />
                <Col>
                  <div
                    style={{
                      width: imageWidth,
                    }}
                  >
                    <ImageBox
                      src={val || defaultEmptyImage}
                      circle={circle}
                      loadingEffect
                      errorOverlayVisible
                      showErrorIcon={false}
                      alt=""
                      preview={!stringIsNullOrWhiteSpace(val)}
                      previewSimpleMask={previewSimpleMask}
                    />
                  </div>
                </Col>
                <Col flex="auto" />
              </Row>
            </>
          );
        }

        if (facadeMode === columnFacadeMode.badge) {
          if (isFunction(d.formatValue)) {
            val = d.formatValue(value, record);
          }

          const { status, text } = {
            ...{ status: 'default', text: '' },
            ...facadeConfig,
          };

          return (
            <>
              <Badge status={status} text={text} />
            </>
          );
        }

        throw new Error(`无效的渲染模式：${facadeMode}`);
      };
    }

    return d;
  };

  getColumn = () => {
    return this.buildColumnFromWrapper();
  };

  getColumnMerged = () => {
    let columns = [];

    const columnsSource = this.getColumn();

    const columnsOtherConfigArray = this.columnsOtherConfig || [];

    if (isArray(columnsOtherConfigArray)) {
      if (columnsOtherConfigArray.length > 0) {
        if (columnsSource.length !== columnsOtherConfigArray.length) {
          this.restoreColumnsOtherConfigArray();
        } else {
          columnsSource.forEach((item, index) => {
            const c = { ...item, ...columnsOtherConfigArray[index] };

            const { show } = c || { show: true };

            if (show) {
              columns.push(c);
            }
          });
        }
      } else {
        this.restoreColumnsOtherConfigArray();
        columns = columnsSource;
      }
    } else {
      columns = columnsSource;
    }

    return columns;
  };

  handleFormReset = () => {
    // 需要继承重载
  };

  // 其他项重置
  handleFormOtherReset = () => {};

  handleSearch = e => {
    e.preventDefault();

    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchForm();

    const { validateFields } = form;

    validateFields()
      .then(fieldsValue => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values });
      })
      .catch(error => {
        const { errorFields } = error;

        if (!isUndefined(errorFields)) {
          const m = [];

          Object.values(errorFields).forEach(o => {
            m.push(o.errors[0]);
          });

          const maxLength = 5;
          let beyondMax = false;

          if (m.length > maxLength) {
            m.length = maxLength;

            beyondMax = true;
          }

          let errorMessage = m.join(', ');

          if (beyondMax) {
            errorMessage += ' ...';
          }

          message.warn(errorMessage);
        } else {
          showRuntimeErrorMessage(error);
        }
      });
  };

  getSearchForm = () => {
    return this.formRef.current;
  };

  buildSearchFormContent = config => {
    if ((config || null) == null) {
      return null;
    }

    const configData = {
      ...{ otherComponent: null, list: [] },
      ...(config || {}),
    };
    const { otherComponent, list } = configData;

    const listData = [];

    if (isArray(list)) {
      list.forEach(co => {
        listData.push(co);
      });
    }

    return (
      <>
        <Row gutter={24}>
          {listData.map((item, index) => {
            return this.buildSearchFormContentItem(item, index);
          })}
        </Row>

        {otherComponent}
      </>
    );
  };

  buildSearchFormContentItem = (contentItem, contentIndex) => {
    const contentItemKey = `searchFormContent_key_${contentIndex}`;

    const {
      lg: lgValue,
      md,
      sm,
      xs,
      type,
      fieldData: fieldDataValue,
      icon,
      showHelper,
      component,
      otherProps,
    } = {
      ...{
        lg: 6,
        md: 12,
        sm: 24,
        xs: 24,
        type: '',
        icon: null,
        fieldData: {
          label: '',
          name: '',
          helper: '',
        },
        showHelper: false,
        component: null,
        otherProps: null,
      },
      ...(contentItem || {}),
    };

    const fieldData = {
      ...{
        label: '',
        name: '',
        helper: '',
      },
      ...(fieldDataValue || {}),
    };

    let lg = (lgValue || 6) <= 0 ? 6 : lgValue;

    lg = lg > 24 ? 24 : lg;

    return (
      <Col key={contentItemKey} lg={lg || 6} md={md} sm={sm} xs={xs}>
        {type === searchFormContentConfig.contentItemType.input
          ? this.renderSearchInput(
              fieldData.label,
              fieldData.name,
              showHelper ? fieldData.helper : '',
              icon || <FormOutlined />,
              { ...{}, ...(contentItem.otherProps || {}) },
            )
          : null}

        {type === searchFormContentConfig.contentItemType.inputNumber
          ? this.renderSearchInputNumber(
              fieldData.label,
              fieldData.name,
              fieldData.helper,
              {
                ...{},
                ...(contentItem.otherProps || {}),
              },
            )
          : null}

        {type === searchFormContentConfig.contentItemType.datePicker
          ? this.renderFormDatePicker(
              fieldData.label,
              fieldData.name,
              false,
              fieldData.helper,
              {
                ...{},
                ...(otherProps || {}),
              },
            )
          : null}

        {type === searchFormContentConfig.contentItemType.customRangePicker
          ? this.renderSimpleFormRangePickerCore(
              contentItem.dateRangeFieldName,
              {
                ...{},
                ...(otherProps || {}),
              },
            )
          : null}

        {type === searchFormContentConfig.contentItemType.onlyShowInput
          ? this.renderFormOnlyShowInput(
              fieldData.label,
              contentItem.value,
              fieldData.helper || '',
              contentItem.icon || <FormOutlined />,
              {
                ...{},
                ...(contentItem.otherProps || {}),
                ...{ disabled: true },
              },
            )
          : null}

        {type === searchFormContentConfig.contentItemType.customSelect
          ? contentItem.component
          : null}

        {type === searchFormContentConfig.contentItemType.customRadio
          ? contentItem.component
          : null}

        {type === searchFormContentConfig.contentItemType.innerComponent
          ? this.renderFormInnerComponent(
              fieldData.label,
              component,
              fieldData.helper,
              null,
              false,
            )
          : null}

        {type === searchFormContentConfig.contentItemType.component
          ? component || null
          : null}
      </Col>
    );
  };

  searchFormContentConfigData = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 10,
          type: searchFormContentConfig.contentItemType.customRangePicker,
          dateRangeFieldName,
        },
        {
          lg: 6,
          type: searchFormContentConfig.contentItemType.component,
          component: this.renderSimpleFormButtonCore(),
        },
      ],
    };
  };

  renderSimpleFormButtonCore = () => {
    const { dataLoading, reloading, searching } = this.state;

    return (
      <span className={styles.submitButtons}>
        <Button
          disabled={dataLoading || reloading || searching}
          type="primary"
          onClick={e => {
            this.handleSearch(e);
          }}
        >
          {searching ? <LoadingOutlined /> : <SearchOutlined />}
          查询
        </Button>
        <Button
          disabled={dataLoading || reloading || searching}
          style={{ marginLeft: 8 }}
          onClick={() => {
            this.handleFormReset();
          }}
        >
          {reloading ? <LoadingOutlined /> : <ReloadOutlined />}
          重置
        </Button>
      </span>
    );
  };

  renderSimpleFormButton = (ColMd = 6) => {
    return (
      <Col md={ColMd} sm={24}>
        {this.renderSimpleFormButtonCore()}
      </Col>
    );
  };

  renderSimpleFormRangePickerCore = (
    dateRangeFieldName,
    rangePickerProps = null,
  ) => {
    const { startTime, endTime } = this.state;

    const valueList = [];

    if ((startTime || null) != null) {
      valueList.push(stringToMoment(startTime));
    }

    if ((endTime || null) != null) {
      valueList.push(stringToMoment(endTime));
    }

    const p = {
      ...{
        style: { width: '100%' },
        showTime: { format: 'HH:mm' },
        value: valueList,
        format: datetimeFormat.yearMonthDayHourMinute,
        placeholder: ['开始时间', '结束时间'],
        onChange: (dates, dateStrings) => {
          this.onDateRangeChange(dates, dateStrings);
        },
        ...(rangePickerProps || {}),
      },
    };

    return (
      <FormItem
        label={dateRangeFieldName}
        rules={[
          {
            required: false,
            message: buildFieldDescription(dateRangeFieldName, '选择'),
          },
        ]}
      >
        <RangePicker {...p} />
      </FormItem>
    );
  };

  renderSimpleFormRangePicker = (
    dateRangeFieldName,
    colLg = 8,
    rangePickerProps = null,
  ) => {
    return (
      <Col lg={colLg} md={12} sm={24} xs={24}>
        {this.renderSimpleFormRangePickerCore(
          dateRangeFieldName,
          rangePickerProps,
        )}
      </Col>
    );
  };

  renderSimpleFormRow = () => {
    const searchFormContentConfigData = this.searchFormContentConfigData();

    if ((searchFormContentConfigData || null) == null) {
      return null;
    }

    return this.buildSearchFormContent(searchFormContentConfigData);
  };

  renderSimpleFormInitialValues = () => {
    return {};
  };

  renderSimpleForm = () => {
    const el = this.renderSimpleFormRow();

    if ((el || null) == null) {
      return null;
    }

    return (
      <Form
        ref={this.formRef}
        initialValues={this.renderSimpleFormInitialValues()}
        onSubmit={this.handleSearch}
        layout="horizontal"
      >
        {el}
      </Form>
    );
  };

  renderForm = () => this.renderSimpleForm();

  // eslint-disable-next-line arrow-body-style
  buildTableOtherConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  // eslint-disable-next-line arrow-body-style
  buildTableExpandableConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  restoreColumnsOtherConfigArray = () => {
    const columnsOtherConfigArray = this.getColumn().map(item => {
      return { dataIndex: item.dataIndex, show: true, fixed: item.fixed || '' };
    });

    this.columnsOtherConfig = columnsOtherConfigArray;
  };

  buildTableConfig = () => {
    const { tableSize } = this.state;

    const columns = this.getColumnMerged();
    const expandable = this.buildTableExpandableConfig();

    return {
      ...this.buildTableOtherConfig(),
      columns,
      size: tableSize,
      expandable,
    };
  };

  setTableSize = key => {
    this.setState({ tableSize: key });
  };

  setColumnsMap = e => {
    if (Object.keys(e || {}).length === 0) {
      this.restoreColumnsOtherConfigArray();
    } else {
      const columnsOtherConfigArrayChanged = (
        this.columnsOtherConfig || []
      ).map(item => {
        const { dataIndex } = item;

        if (!isUndefined(e[dataIndex])) {
          const d = e[dataIndex];

          d.show = isUndefined(d.show) ? true : d.show;

          return { ...item, ...d };
        }

        return item;
      });

      this.columnsOtherConfig = columnsOtherConfigArrayChanged;
    }

    const { counterSetColumnsOtherConfig } = this.state;

    this.setState({
      counterSetColumnsOtherConfig: counterSetColumnsOtherConfig + 1,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSortKeyColumns = e => {};

  getColumnsMap = () => {
    const o = {};

    (this.columnsOtherConfig || []).forEach(item => {
      const { dataIndex } = item;

      const temp = { ...{}, ...item };

      if (temp.delete) {
        temp.delete('dataIndex');
      }

      o[`${dataIndex}`] = temp;
    });

    return o;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onBatchActionSelect = key => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderTable = config => null;

  renderAlertContent = () => {
    return '';
  };

  renderAlertOption = () => {};

  renderAboveTable = () => {
    const content = this.renderAlertContent();
    const option = this.renderAlertOption();

    if (!content && !option) {
      return null;
    }

    return (
      <div className={styles.alertContainor}>
        <Alert
          message={
            <div className={styles.alertInfo}>
              <div className={styles.alertContent}>{content}</div>
              {option && <div className={styles.alertOption}>{option}</div>}
            </div>
          }
          type="info"
          showIcon
        />
      </div>
    );
  };

  renderExtraButtonList = () => null;

  renderExtraAction = () => {
    const buttonList = this.renderExtraButtonList();

    if (isArray(buttonList)) {
      const list = [];

      buttonList.forEach((eo, ei) => {
        list.push(eo);

        if (ei !== buttonList.length - 1) {
          list.push('');
        }
      });

      return (
        <>
          {list.map((item, index) => {
            const key = `extraAction_button_${index}`;

            if (stringIsNullOrWhiteSpace(item)) {
              return <Divider key={key} type="vertical" />;
            }

            return <span key={key}>{item}</span>;
          })}
        </>
      );
    }

    return null;
  };

  renderBatchActionMenu = () => [];

  renderBatchAction = () => {
    const { showSelect, selectedDataTableDataRows } = this.state;

    const selectRows = isArray(selectedDataTableDataRows)
      ? selectedDataTableDataRows
      : [];

    if (showSelect) {
      const batchActionMenu = this.renderBatchActionMenu();

      if ((batchActionMenu || []).length > 0) {
        return (
          <>
            <BatchAction.Button
              onSelect={key => {
                this.onBatchActionSelect(key);
              }}
              menus={batchActionMenu}
              disabled={selectRows.length === 0}
            >
              批量操作
            </BatchAction.Button>

            <Divider type="vertical" />
          </>
        );
      }
    }

    return null;
  };

  buildOtherTabProps = () => {
    const tabListAvailable = this.getTabListAvailable();

    if (tabListAvailable.length > 0) {
      return {
        type: 'card',
        size: 'small',
        tabBarStyle: {
          marginBottom: 0,
        },
        tabBarGutter: 3,
      };
    }

    return null;
  };

  adjustTabListAvailable = tabListAvailable => tabListAvailable;

  getTabListAvailable = () => {
    const tabListAvailable = [];

    (this.tabList || []).forEach(o => {
      const v = typeof o.show === 'undefined' ? true : o.show === true;

      if (v) {
        tabListAvailable.push(o);
      }
    });

    return this.adjustTabListAvailable(tabListAvailable);
  };

  getTabActiveKey = () => {
    const {
      match,
      location: { pathname },
    } = this.props;

    return pathname
      .replace(/\//g, '-')
      .replace(`${match.url.replace(/\//g, '-')}-`, '')
      .replace(/-/g, '/');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleTabChange = key => {};

  onPageHeaderAvatarLoadErrorCallback = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  pageHeaderActionExtraGroup = () => null;

  pageHeaderActionExtraEllipsis = () => null;

  pageHeaderAction = () => {
    const buttonGroupData = this.pageHeaderActionExtraGroup();
    const ellipsisActionData = this.pageHeaderActionExtraEllipsis();

    return (
      <>
        <div className={styles.buttonBox}>
          {buildButtonGroup(buttonGroupData)}
          {(ellipsisActionData || null) == null ? null : (
            <Divider type="vertical" />
          )}
          {buildDropdownEllipsis(ellipsisActionData)}
        </div>
      </>
    );
  };

  pageHeaderTagList = () => [];

  pageHeaderTag = () => {
    return buildTagList({ list: this.pageHeaderTagList() });
  };

  pageHeaderAvatar = () => {
    return null;
  };

  pageHeaderTitlePrefix = () => {
    return '';
  };

  pageHeaderSubTitle = () => null;

  pageHeaderContentGridData = () => {
    return [];
  };

  pageHeaderContentGridConfig = () => {
    return {
      type: pageHeaderRenderType.descriptionGrid,
      list: this.pageHeaderContentGridData(),
    };
  };

  pageHeaderContentParagraphData = () => {
    return [];
  };

  pageHeaderContentParagraphConfig = () => {
    return {
      type: pageHeaderRenderType.paragraph,
      list: this.pageHeaderContentParagraphData(),
    };
  };

  pageHeaderContentActionData = () => {
    return [];
  };

  pageHeaderContentActionConfig = () => {
    return {
      type: pageHeaderRenderType.paragraph,
      list: this.pageHeaderContentActionData(),
    };
  };

  pageHeaderContentData = () => {
    return {
      list: [
        this.pageHeaderContentGridConfig(),
        this.pageHeaderContentParagraphConfig(),
        this.pageHeaderContentActionConfig(),
      ],
    };
  };

  renderPageHeaderContent = () => {
    return pageHeaderContent(this.pageHeaderContentData() || {});
  };

  pageHeaderExtraContentData = () => null;

  renderPageHeaderExtraContent = () => {
    return pageHeaderExtraContent(this.pageHeaderExtraContentData());
  };

  renderCardExtraAction = () => {
    const { tableSize, refreshing } = this.state;

    return (
      <>
        <DensityAction
          tableSize={tableSize}
          setTableSize={key => {
            this.setTableSize(key);
          }}
        />

        <Tooltip title="刷新本页">
          <Button
            shape="circle"
            style={{
              color: '#000',
              border: 0,
            }}
            loading={refreshing}
            icon={<ReloadOutlined />}
            onClick={() => {
              this.refreshData();
            }}
          />
        </Tooltip>

        <ColumnSetting
          columns={this.getColumn()}
          columnsMap={this.getColumnsMap()}
          setColumnsMap={e => {
            this.setColumnsMap(e);
          }}
          setSortKeyColumns={key => {
            this.setSortKeyColumns(key);
          }}
        />
      </>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItem = (record, index) => {
    return (
      <List.Item
        actions={this.renderListViewItemActions(record, index)}
        extra={this.renderListViewItemExtra(record, index)}
      >
        {this.renderListViewItemInner(record, index)}
      </List.Item>
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemInner = (record, index) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemExtra = (record, index) => {
    return null;
  };

  renderListViewItemActions = (record, index) => {
    const { showListViewItemActionSelect } = this.state;

    const actionOthers = this.renderListViewItemActionOthers(record, index);

    let actionSelect = [];

    if (showListViewItemActionSelect || false) {
      actionSelect = this.renderListViewItemActionSelect(record, index);
    }

    if (actionSelect == null) {
      return [...(isArray(actionOthers) ? actionOthers : [])];
    }

    return [...(isArray(actionOthers) ? actionOthers : []), actionSelect];
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemActionOthers = (record, index) => {
    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderListViewItemActionSelect = (record, index) => {
    return null;
  };

  renderListViewItemLayout = () => {
    return 'horizontal';
  };

  renderListViewSize = () => {
    return 'default';
  };

  renderListView = () => {
    showRuntimeErrorMessage('需要重载实现renderListView');

    return null;
  };

  buildWrapperTypeConfig = () => {
    return { mode: contentConfig.wrapperType.page };
  };

  buildToolBarConfig = () => {
    return null;
  };

  buildToolBar = () => {
    const config = this.buildToolBarConfig();

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
              {toolList.map(o => {
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

  buildToolBarWrapper = () => {
    const toolBar = this.buildToolBar();

    if ((toolBar || null) == null) {
      return null;
    }

    return <>{toolBar}</>;
  };

  buildHelpConfig = () => {
    return null;
  };

  buildHelp = () => {
    const formContentWrapperTypeConfig = this.buildWrapperTypeConfig() || {
      mode: contentConfig.wrapperType.page,
    };

    const configData = {
      ...{ mode: contentConfig.wrapperType.page },
      ...(formContentWrapperTypeConfig || {}),
    };
    const { mode } = configData;

    const config = this.buildHelpConfig();

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
    const formContentWrapperTypeConfig = this.buildWrapperTypeConfig() || {
      mode: contentConfig.wrapperType.page,
    };

    const configData = {
      ...{ mode: contentConfig.wrapperType.page },
      ...(formContentWrapperTypeConfig || {}),
    };
    const { mode } = configData;

    const help = this.buildHelp();

    if ((help || null) == null) {
      return null;
    }

    return (
      <>
        {mode !== contentConfig.wrapperType.model ? (
          <EverySpace size={22} direction="horizontal" />
        ) : null}

        {help}
      </>
    );
  };

  renderPageContent = () => {
    const { listTitle, renderSearchForm } = this.state;

    const extraAction = this.renderExtraAction();

    const searchForm = this.renderForm();

    return (
      <div className={styles.containorBox}>
        {this.buildToolBarWrapper()}

        {renderSearchForm && (searchForm || null) != null ? (
          <>
            <Card bordered={false} className={styles.containorSearch}>
              <div className={styles.tableListForm}>{searchForm}</div>
            </Card>

            <EverySpace size={24} direction="horizontal" />
          </>
        ) : null}

        <Card
          title={listTitle}
          headStyle={{ borderBottom: '0px' }}
          bodyStyle={{ paddingTop: '0', paddingBottom: 10 }}
          bordered={false}
          className={styles.containorTable}
          extra={
            <>
              {extraAction}

              {extraAction == null ? null : <Divider type="vertical" />}

              {this.renderBatchAction()}

              {this.renderCardExtraAction()}
            </>
          }
        >
          <div className={styles.tableList}>
            {this.renderAboveTable()}
            {this.renderView()}
          </div>
        </Card>

        {this.buildHelpWrapper()}
      </div>
    );
  };

  renderPageBody = () => {
    return (
      <>
        {this.renderPageContent()}

        {this.renderOther()}
      </>
    );
  };

  render() {
    const {
      renderPageHeaderWrapper,
      showPageHeaderAvatar,
      defaultAvatarIcon,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    const tabListAvailable = this.getTabListAvailable();

    const avatarProps = showPageHeaderAvatar
      ? decorateAvatar(
          this.pageHeaderAvatar(),
          defaultAvatarIcon,
          showPageHeaderAvatar,
          dataLoading,
          reloading,
          avatarImageLoadResult,
          () => {
            this.onPageHeaderAvatarLoadErrorCallback();
          },
        )
      : null;

    if (renderPageHeaderWrapper || false) {
      return (
        <PageHeaderWrapper
          avatar={avatarProps}
          title={pageHeaderTitle(
            this.getPageName(),
            this.pageHeaderTitlePrefix(),
          )}
          subTitle={this.pageHeaderSubTitle()}
          tags={pageHeaderTagWrapper(this.pageHeaderTag())}
          extra={this.pageHeaderAction()}
          tabActiveKey={this.getTabActiveKey()}
          content={this.renderPageHeaderContent()}
          extraContent={this.renderPageHeaderExtraContent()}
          tabList={tabListAvailable}
          onTabChange={this.handleTabChange}
          tabProps={this.buildOtherTabProps()}
        >
          {this.renderPageBody()}

          <BackTop />
        </PageHeaderWrapper>
      );
    }

    return (
      <>
        {this.renderPageBody()}

        <BackTop />
      </>
    );
  }
}

export default ListBase;
