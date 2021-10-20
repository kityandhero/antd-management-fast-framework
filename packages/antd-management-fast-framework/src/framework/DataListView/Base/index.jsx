import React, { Fragment } from 'react';
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
  Space,
  Empty,
  Spin,
} from 'antd';
import {
  SearchOutlined,
  ReloadOutlined,
  LoadingOutlined,
  PictureOutlined,
  FormOutlined,
  BorderOuterOutlined,
  RightCircleOutlined,
} from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  defaultListState,
  buildFieldDescription,
  isArray,
  isUndefined,
  stringToMoment,
  getDerivedStateFromPropsForUrlParams,
  showRuntimeError,
  isFunction,
  isBoolean,
} from '../../../utils/tools';
import {
  searchCardConfig,
  datetimeFormat,
  pageHeaderRenderType,
  listViewConfig,
} from '../../../utils/constants';
import IconInfo from '../../../customComponents/IconInfo';
import {
  buildButton,
  buildDropdown,
  buildDropdownButton,
  buildDropdownEllipsis,
  buildButtonGroup,
  buildPageHeaderTitle,
  buildPageHeaderTagWrapper,
  buildPageHeaderContent,
  pageHeaderExtraContent,
  buildTagList,
  buildColumnList,
  buildColumnItem,
} from '../../../customComponents/FunctionComponent';
import {
  avatarImageLoadResultCollection,
  decorateAvatar,
} from '../../../customComponents/DecorateAvatar';
import StandardTableCustom from '../../../customComponents/StandardTableCustom';
import AuthorizationWrapper from '../../AuthorizationWrapper';
import QueueBox from '../../../customComponents/AnimalBox/QueueBox';
import FadeBox from '../../../customComponents/AnimalBox/FadeBox';
import RotateBox from '../../../customComponents/AnimalBox/RotateBox';

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
        showSelect: false,
        renderPageHeaderWrapper: true,
        listTitle: '检索结果',
        defaultAvatarIcon: <PictureOutlined />,
        listViewMode: listViewConfig.viewMode.list,
        avatarImageLoadResult: avatarImageLoadResultCollection.wait,
        showPageHeaderAvatar: false,
        tableSize: listViewConfig.tableSize.middle,
        counterSetColumnsOtherConfig: 0,
        renderSearchForm: true,
        showListViewItemActionSelect: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  afterLoadSuccess = ({
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
  }) => {
    this.doOtherAfterLoadSuccess({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {};

  onDateRangeChange = (dates, dateStrings) => {
    this.setState({
      startTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  };

  handleSelectRows = (rows) => {
    this.setState({
      selectedDataTableDataRows: rows,
    });
  };

  clearSelectRow = () => {
    this.setState({
      selectedDataTableDataRows: [],
    });
  };

  getSearchFormFieldsValue = (nameList, filter) => {
    const form = this.getSearchCard();

    if (form != null) {
      return form.getFieldsValue(nameList, filter);
    }

    return {};
  };

  getSearchFormFieldValue = (name) => {
    const form = this.getSearchCard();

    if (form != null) {
      return form.getFieldValue(name);
    }

    return null;
  };

  setSearchFormFieldsValue = (v) => {
    const form = this.getSearchCard();

    if (form != null) {
      form.setFieldsValue(v);

      this.afterSetSearchFormFieldsValue(v);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterSetSearchFormFieldsValue = (v) => {};

  getPageName = () => {
    const { pageName } = this.state;

    return pageName;
  };

  getColumnWrapper = () => {
    const text = 'getColumnWrapper 需要重载实现';

    showRuntimeError({
      message: text,
    });

    return [];
  };

  buildColumnFromWrapper = () => {
    const list = this.getColumnWrapper() || [];

    return this.buildColumnList(list);
  };

  buildColumnList = (list) => {
    return buildColumnList({
      columnList: list,
      attachedTargetName: this.constructor.name,
    });
  };

  buildColumnItem = (o) => {
    return buildColumnItem({
      column: o,
      attachedTargetName: this.constructor.name,
    });
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

  handleSearchReset = () => {
    // 需要继承重载
  };

  // 其他项重置
  handleAdditionalSearchReset = () => {};

  handleSearch = () => {
    if (this.checkWorkDoing()) {
      return;
    }

    const form = this.getSearchCard();

    const { validateFields } = form;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.searchData({ formValues: values });
      })
      .catch((error) => {
        const { errorFields } = error;

        if (!isUndefined(errorFields)) {
          const m = [];

          Object.values(errorFields).forEach((o) => {
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
          showRuntimeError({
            message: error,
          });
        }
      });
  };

  getSearchCard = () => {
    return this.formRef.current;
  };

  buildSearchCardContent = (config) => {
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
      list.forEach((co) => {
        listData.push(co);
      });
    }

    return (
      <>
        <Row gutter={24}>
          {listData.map((item, index) => {
            return this.buildSearchCardContentItem(item, index);
          })}
        </Row>

        {otherComponent}
      </>
    );
  };

  buildSearchCardContentItem = (contentItem, contentIndex) => {
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
        {type === searchCardConfig.contentItemType.input
          ? this.renderSearchInput(
              fieldData.label,
              fieldData.name,
              showHelper ? fieldData.helper : '',
              icon || <FormOutlined />,
              { ...{}, ...(contentItem.otherProps || {}) },
            )
          : null}

        {type === searchCardConfig.contentItemType.inputNumber
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

        {type === searchCardConfig.contentItemType.datePicker
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

        {type === searchCardConfig.contentItemType.customRangePicker
          ? this.buildSearchCardRangePickerCore(
              contentItem.dateRangeFieldName,
              {
                ...{},
                ...(otherProps || {}),
              },
            )
          : null}

        {type === searchCardConfig.contentItemType.onlyShowInput
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

        {type === searchCardConfig.contentItemType.customSelect
          ? contentItem.component
          : null}

        {type === searchCardConfig.contentItemType.customRadio
          ? contentItem.component
          : null}

        {type === searchCardConfig.contentItemType.innerComponent
          ? this.renderFormInnerComponent(
              fieldData.label,
              component,
              fieldData.helper,
              null,
              false,
            )
          : null}

        {type === searchCardConfig.contentItemType.component
          ? component || null
          : null}
      </Col>
    );
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.state;

    return {
      list: [
        {
          lg: 10,
          type: searchCardConfig.contentItemType.customRangePicker,
          dateRangeFieldName,
        },
        {
          lg: 6,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  buildSearchCardButtonCore = () => {
    const { dataLoading, reloading, searching } = this.state;

    return (
      <span className={styles.submitButtons}>
        <Button
          disabled={dataLoading || reloading || searching}
          type="primary"
          onClick={(e) => {
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
            this.handleSearchReset();
          }}
        >
          {reloading ? <LoadingOutlined /> : <ReloadOutlined />}
          重置
        </Button>
      </span>
    );
  };

  buildSearchCardButton = (ColMd = 6) => {
    return (
      <Col md={ColMd} sm={24}>
        {this.buildSearchCardButtonCore()}
      </Col>
    );
  };

  buildSearchCardRangePickerCore = (
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

  buildSearchCardRangePicker = (
    dateRangeFieldName,
    colLg = 8,
    rangePickerProps = null,
  ) => {
    return (
      <Col lg={colLg} md={12} sm={24} xs={24}>
        {this.buildSearchCardRangePickerCore(
          dateRangeFieldName,
          rangePickerProps,
        )}
      </Col>
    );
  };

  buildSearchCardRow = () => {
    const config = this.establishSearchCardConfig();

    if ((config || null) == null) {
      return null;
    }

    return this.buildSearchCardContent(config);
  };

  fillSearchCardInitialValues = () => {
    return {};
  };

  buildSearchCard = () => {
    const el = this.buildSearchCardRow();

    if ((el || null) == null) {
      return null;
    }

    return (
      <Form
        ref={this.formRef}
        initialValues={this.fillSearchCardInitialValues()}
        onSubmit={this.handleSearch}
        layout="horizontal"
      >
        {el}
      </Form>
    );
  };

  renderForm = () => this.buildSearchCard();

  // eslint-disable-next-line arrow-body-style
  buildTableOtherConfig = () => {
    // 可以配置额外的Table属性

    return {};
  };

  // eslint-disable-next-line arrow-body-style
  establishTableExpandableConfig = () => {
    // 可以配置额外的Table属性

    return null;
  };

  restoreColumnsOtherConfigArray = () => {
    const columnsOtherConfigArray = this.getColumn().map((item) => {
      return { dataIndex: item.dataIndex, show: true, fixed: item.fixed || '' };
    });

    this.columnsOtherConfig = columnsOtherConfigArray;
  };

  buildTableConfig = () => {
    const { tableSize } = this.state;

    const columns = this.getColumnMerged();
    const expandable = this.establishTableExpandableConfig();

    return {
      ...this.buildTableOtherConfig(),
      columns,
      size: tableSize,
      expandable,
    };
  };

  setTableSize = (key) => {
    this.setState({ tableSize: key });
  };

  setColumnsMap = (e) => {
    if (Object.keys(e || {}).length === 0) {
      this.restoreColumnsOtherConfigArray();
    } else {
      const columnsOtherConfigArrayChanged = (
        this.columnsOtherConfig || []
      ).map((item) => {
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
  setSortKeyColumns = (e) => {};

  getColumnsMap = () => {
    const o = {};

    (this.columnsOtherConfig || []).forEach((item) => {
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
  onBatchActionSelect = (key) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderTable = (config) => null;

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

  establishDataContainerExtraActionCollectionConfig = () => {
    return [];
  };

  buildDataContainerExtraActionCollection = () => {
    const configList = this.establishDataContainerExtraActionCollectionConfig();

    if (!isArray(configList)) {
      return [];
    }

    const components = [];

    configList.forEach((item, index) => {
      if ((item || null) != null) {
        const {
          hidden,
          buildType: itemBuildType,
          icon: itemIcon,
          text: itemText,
          component: itemComponent,
        } = {
          ...{
            buildType: listViewConfig.dataContainerExtraActionBuildType.button,
            hidden: false,
            icon: null,
            text: '',
            component: null,
          },
          ...item,
        };

        let itemHidden = hidden;

        if (
          !hidden &&
          itemBuildType ===
            listViewConfig.dataContainerExtraActionBuildType.component &&
          (itemComponent || null) == null
        ) {
          itemHidden = true;
        }

        if (!itemHidden) {
          const itemKey = `listView_dataContainerExtraAction_key_${index}`;

          let itemAdjust = item;

          switch (itemBuildType) {
            case listViewConfig.dataContainerExtraActionBuildType.generalButton:
              itemAdjust = this.renderGeneralButton(item);
              break;

            case listViewConfig.dataContainerExtraActionBuildType.button:
              itemAdjust = buildButton(item);
              break;

            case listViewConfig.dataContainerExtraActionBuildType.dropdown:
              itemAdjust = buildDropdown(item);
              break;

            case listViewConfig.dataContainerExtraActionBuildType
              .dropdownButton:
              itemAdjust = buildDropdownButton(item);
              break;

            case listViewConfig.dataContainerExtraActionBuildType
              .dropdownEllipsis:
              itemAdjust = buildDropdownEllipsis(item);
              break;

            case listViewConfig.dataContainerExtraActionBuildType.iconInfo:
              itemAdjust = <IconInfo icon={itemIcon} text={itemText} />;
              break;

            case listViewConfig.dataContainerExtraActionBuildType.component:
              itemAdjust = itemComponent || null;
              break;

            default:
              itemAdjust = item;
              break;
          }

          components.push(<Fragment key={itemKey}>{itemAdjust}</Fragment>);
        }
      }
    });

    return components;
  };

  renderExtraActionView = () => {
    const actions = this.buildDataContainerExtraActionCollection();

    if (isArray(actions) && actions.length > 0) {
      return (
        <Space split={<Divider type="vertical" />}>
          {actions.map((item) => {
            return item;
          })}
        </Space>
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
              onSelect={(key) => {
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

  adjustTabListAvailable = (tabListAvailable) => tabListAvailable;

  getTabListAvailable = () => {
    const tabListAvailable = [];

    (this.tabList || []).forEach((o) => {
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
  handleTabChange = (key) => {};

  onPageHeaderAvatarLoadErrorCallback = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  establishViewDataSource = () => {
    const text = 'establishViewDataSource 需要重载实现用来构建列表数据源';

    showRuntimeError({
      message: text,
    });

    return null;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  establishCardCollectionViewItemConfig = (record) => {
    const text = 'establishCardCollectionViewItemConfig 需要重载实现';

    showRuntimeError({
      message: text,
    });

    return null;
  };

  establishViewPaginationConfig = () => {
    return null;
  };

  establishPageHeaderActionExtraGroupConfig = () => null;

  establishPageHeaderActionExtraEllipsisConfig = () => null;

  buildPageHeaderAction = () => {
    const buttonGroupData = this.establishPageHeaderActionExtraGroupConfig();
    const ellipsisActionData =
      this.establishPageHeaderActionExtraEllipsisConfig();

    return (
      <>
        <div className={styles.buttonBox}>
          {(buttonGroupData || null) == null
            ? null
            : buildButtonGroup(buttonGroupData)}

          {(ellipsisActionData || null) == null ? null : (
            <Divider type="vertical" />
          )}

          {(ellipsisActionData || null) == null
            ? null
            : buildDropdownEllipsis(ellipsisActionData)}
        </div>
      </>
    );
  };

  establishPageHeaderTagCollectionConfig = () => [];

  establishPageHeaderTagConfig = () => {
    return buildTagList({
      list: this.establishPageHeaderTagCollectionConfig(),
    });
  };

  establishPageHeaderAvatarConfig = () => {
    return null;
  };

  establishPageHeaderTitlePrefix = () => {
    return '';
  };

  buildPageHeaderSubTitle = () => null;

  establishPageHeaderContentGridCollectionConfig = () => {
    return [];
  };

  establishPageHeaderContentGridConfig = () => {
    return {
      type: pageHeaderRenderType.descriptionGrid,
      list: this.establishPageHeaderContentGridCollectionConfig(),
    };
  };

  establishPageHeaderContentParagraphCollectionConfig = () => {
    return [];
  };

  establishPageHeaderContentParagraphConfig = () => {
    return {
      type: pageHeaderRenderType.paragraph,
      list: this.establishPageHeaderContentParagraphCollectionConfig(),
    };
  };

  establishPageHeaderContentActionCollectionConfig = () => {
    return [];
  };

  establishPageHeaderContentActionConfig = () => {
    return {
      type: pageHeaderRenderType.paragraph,
      list: this.establishPageHeaderContentActionCollectionConfig(),
    };
  };

  establishPageHeaderContentConfig = () => {
    return {
      list: [
        this.establishPageHeaderContentGridConfig(),
        this.establishPageHeaderContentParagraphConfig(),
        this.establishPageHeaderContentActionConfig(),
      ],
    };
  };

  renderPageHeaderContent = () => {
    return buildPageHeaderContent(
      this.establishPageHeaderContentConfig() || {},
    );
  };

  establishPageHeaderExtraContentConfig = () => null;

  renderPageHeaderExtraContent = () => {
    return pageHeaderExtraContent(this.establishPageHeaderExtraContentConfig());
  };

  renderCardExtraAction = () => {
    const { listViewMode, tableSize, refreshing } = this.state;

    if (listViewMode === listViewConfig.viewMode.table) {
      return (
        <>
          <DensityAction
            tableSize={tableSize}
            setTableSize={(key) => {
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
            setColumnsMap={(e) => {
              this.setColumnsMap(e);
            }}
            setSortKeyColumns={(key) => {
              this.setSortKeyColumns(key);
            }}
          />
        </>
      );
    }

    return (
      <>
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
    const text = 'renderListViewItemInner 需要重载实现';

    showRuntimeError({
      message: text,
    });

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
    const { dataLoading, reloading, processing } = this.state;

    return (
      <Spin spinning={dataLoading || reloading || processing}>
        <List
          itemLayout={this.renderListViewItemLayout()}
          size={this.renderListViewSize()}
          dataSource={this.establishViewDataSource()}
          pagination={this.establishViewPaginationConfig() || false}
          renderItem={(item, index) => {
            return this.renderListViewItem(item, index);
          }}
        />
      </Spin>
    );
  };

  renderTableView = () => {
    const {
      metaListData,
      tableScroll,
      showSelect,
      selectedDataTableDataRows,
      dataLoading,
      processing,
    } = this.state;

    const { styleSet, columns, expandable, size } = this.buildTableConfig();

    const paginationConfig = this.establishViewPaginationConfig() || false;

    const standardTableCustomOption = {
      loading: dataLoading || processing,
      showSelect,
      selectedRows: selectedDataTableDataRows,
      columns,
      size: size || null,
      onSelectRow: this.handleSelectRows,
      onChange: paginationConfig ? this.handleStandardTableChange : null,
    };

    standardTableCustomOption.data = {
      list: this.establishViewDataSource(),
      pagination: !!paginationConfig ? paginationConfig : false,
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    let expandableConfig = null;

    if ((expandable || null) != null) {
      const {
        checkNeedExpander,
        rowExpandable,
        expandPlaceholderIcon,
        expanderStyle,
        animalType: expandAnimalType,
        expandIconRotate,
        expandIcon: expandIconCustom,
        expandedRowRender: expandedRowRenderCustom,
      } = {
        ...{
          // 判断当前列表数据，如若列表所有数据都不需要显示展开按钮，则忽略其他配置
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          checkNeedExpander: null,
          rowExpandable: false,
          expandPlaceholderIcon: (
            <BorderOuterOutlined
              style={{
                color: '#ccc',
              }}
            />
          ),
          expanderStyle: null,
          animalType: listViewConfig.expandAnimalType.none,
          expandIconRotate: true,
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          expandIcon: ({ expanded, onExpand, record }) => {
            return <RightCircleOutlined />;
          },
          expandedRowRender: null,
        },
        ...(expandable || null),
      };

      let checkNeedExpanderResult = true;

      if (isBoolean(checkNeedExpander)) {
        checkNeedExpanderResult = checkNeedExpander;
      }

      if (isFunction(checkNeedExpander)) {
        const r = checkNeedExpander(metaListData);

        if (isBoolean(checkNeedExpander)) {
          checkNeedExpanderResult = r;
        }
      }

      expandableConfig = checkNeedExpanderResult
        ? {
            rowExpandable,
            expandIcon: ({
              expandable: canExpand,
              expanded,
              onExpand,
              record,
            }) => {
              if (!canExpand && (expandPlaceholderIcon || null) != null) {
                return expandPlaceholderIcon || null;
              }

              if (expandIconRotate) {
                return (
                  <RotateBox
                    rotate={expanded ? 90 : 0}
                    duration={200}
                    onClick={(e) => onExpand(record, e)}
                  >
                    {expandIconCustom({ expanded, onExpand, record })}
                  </RotateBox>
                );
              }

              return expandIconCustom({ expanded, onExpand, record });
            },
            expandedRowRender: isFunction(expandedRowRenderCustom)
              ? (record, index, indent, expanded) => {
                  let child = expandedRowRenderCustom(
                    record,
                    index,
                    indent,
                    expanded,
                  );

                  if (
                    expandAnimalType === listViewConfig.expandAnimalType.fade
                  ) {
                    child = <FadeBox show={expanded}>{child}</FadeBox>;
                  }

                  if (
                    expandAnimalType === listViewConfig.expandAnimalType.queue
                  ) {
                    child = <QueueBox show={expanded}>{child}</QueueBox>;
                  }

                  return <div style={expanderStyle || {}}>{child}</div>;
                }
              : null,
          }
        : {};
    }

    standardTableCustomOption.expandable = expandableConfig;

    return (
      <div className={styles.tableContainor}>
        <StandardTableCustom {...standardTableCustomOption} />
      </div>
    );
  };

  renderCardCollectionView = ({ list }) => {
    const { dataLoading, reloading, processing } = this.state;

    const listItem = isArray(list) ? list : [];
    const itemCount = listItem.length;

    return (
      <Spin spinning={dataLoading || reloading || processing}>
        <Space style={{ width: '100%' }} direction="vertical" size={24}>
          {itemCount > 0 ? (
            listItem.map((o, index) => {
              return this.buildCardCollectionItem({
                config: this.establishCardCollectionViewItemConfig(o),
                key: index,
              });
            })
          ) : dataLoading || reloading ? (
            <div style={{ height: '130px' }} />
          ) : (
            <Empty />
          )}
        </Space>

        {this.renderPaginationView()}
      </Spin>
    );
  };

  renderPaginationView = () => {
    return null;
  };

  renderView = () => {
    const { showSelect, listViewMode } = this.state;

    if (listViewMode === listViewConfig.viewMode.table) {
      return this.renderTableView();
    }

    if (listViewMode === listViewConfig.viewMode.list) {
      if (showSelect) {
        const text = 'MultiListView显示模式下不支持选择';

        showRuntimeError({
          message: text,
        });
      }

      return this.renderListView();
    }

    if (listViewMode === listViewConfig.viewMode.cardCollectionView) {
      if (showSelect) {
        const text = 'MultiListView显示模式下不支持选择';

        showRuntimeError({
          message: text,
        });
      }

      return this.renderCardCollectionView({
        list: this.establishViewDataSource(),
      });
    }

    const text = '未知的显示模式';

    showRuntimeError({
      message: text,
    });

    return null;
  };

  renderPageContent = () => {
    const { listViewMode, listTitle, renderSearchForm } = this.state;

    const extraAction = this.renderExtraActionView();

    const searchForm = this.renderForm();

    const hasPagination = this.renderPaginationView() != null;

    return (
      <div className={styles.containorBox}>
        <Space style={{ width: '100%' }} direction="vertical" size={24}>
          {this.buildToolBarWrapper()}

          {renderSearchForm && (searchForm || null) != null ? (
            <>
              <Card bordered={false} className={styles.containorSearch}>
                <div className={styles.tableListForm}>{searchForm}</div>
              </Card>
            </>
          ) : null}

          <Card
            title={listTitle}
            headStyle={{ borderBottom: '0px' }}
            bodyStyle={{
              paddingTop: '0',
              paddingBottom: hasPagination
                ? listViewMode === listViewConfig.viewMode.table
                  ? 0
                  : listViewMode === listViewConfig.viewMode.list
                  ? 20
                  : listViewMode === listViewConfig.viewMode.cardCollectionView
                  ? 0
                  : 0
                : listViewMode === listViewConfig.viewMode.table
                ? 0
                : listViewMode === listViewConfig.viewMode.list
                ? 20
                : listViewMode === listViewConfig.viewMode.cardCollectionView
                ? 20
                : 20,
            }}
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
        </Space>
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
          this.establishPageHeaderAvatarConfig(),
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
          title={buildPageHeaderTitle(
            this.getPageName(),
            this.establishPageHeaderTitlePrefix(),
          )}
          subTitle={this.buildPageHeaderSubTitle()}
          tags={buildPageHeaderTagWrapper(this.establishPageHeaderTagConfig())}
          extra={this.buildPageHeaderAction()}
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
