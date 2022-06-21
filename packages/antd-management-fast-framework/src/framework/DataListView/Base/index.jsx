import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Affix,
  Alert,
  BackTop,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Empty,
  Form,
  Layout,
  List,
  Pagination,
  Row,
  Space,
  Spin,
  Tooltip,
} from 'antd';
import React from 'react';
import {
  avatarImageLoadResultCollection,
  decorateAvatar,
} from '../../../customComponents/DecorateAvatar';
import FlexBox from '../../../customComponents/FlexBox';
import {
  adjustTableExpandConfig,
  buildColumnItem,
  buildColumnList,
  buildCustomSelect,
  buildPageHeaderContent,
  buildPageHeaderTagWrapper,
  buildPageHeaderTitle,
  buildTagList,
  pageHeaderExtraContent,
} from '../../../customComponents/FunctionComponent';
import StandardTableCustom from '../../../customComponents/StandardTableCustom';
import {
  cardConfig,
  datetimeFormat,
  iconCollection,
  listViewConfig,
  pageHeaderRenderType,
  searchCardConfig,
} from '../../../utils/constants';
import {
  buildFieldDescription,
  defaultListState,
  getDerivedStateFromPropsForUrlParams,
  isArray,
  isUndefined,
  showRuntimeError,
  showWarnMessage,
  toMoment,
  toNumber,
} from '../../../utils/tools';
import AuthorizationWrapper from '../../AuthorizationWrapper';
import BatchAction from '../BatchAction';
import ColumnSetting from '../ColumnSetting';
import DensityAction from '../DensityAction';
import styles from './index.less';

const { Content, Sider } = Layout;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class ListBase extends AuthorizationWrapper {
  /**
   * 使用远端分页
   */
  useRemotePagination = true;

  /**
   * 使用前台模拟分页，有助于优化长列表页面交互操作导致的延迟
   */
  useFrontendPagination = false;

  useFrontendPagination = false;

  showSearchForm = true;

  affixPaginationBar = true;

  formRef = React.createRef();

  pageSizeAdditional = 0;

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
        defaultAvatarIcon: iconCollection.picture,
        listViewMode: listViewConfig.viewMode.list,
        avatarImageLoadResult: avatarImageLoadResultCollection.wait,
        showPageHeaderAvatar: false,
        tableSize: listViewConfig.tableSize.middle,
        counterSetColumnsOtherConfig: 0,
        showListViewItemActionSelect: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  afterDidMount = () => {
    const { pageSize } = this.state;

    this.pageSizeAdditional = pageSize;
  };

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

  getCanUseFrontendPagination = () => {
    return !!this.useRemotePagination ? false : !!this.useFrontendPagination;
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

    if (!form) {
      const text = '查询表单不存在';

      showErrorMessage({
        message: text,
      });
    }

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

          showWarnMessage({
            message: errorMessage,
          });
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
              icon || iconCollection.form,
              { ...{}, ...(contentItem.otherProps || {}) },
            )
          : null}

        {type === searchCardConfig.contentItemType.inputNumber
          ? this.renderSearchInputNumber(
              fieldData.label,
              fieldData.name,
              fieldData.helper,
              icon || iconCollection.form,
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
              contentItem.icon || iconCollection.form,
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

        {type === cardConfig.contentItemType.flexSelect
          ? buildCustomSelect(contentItem)
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
          {searching ? iconCollection.loading : iconCollection.search}
          查询
        </Button>
        <Button
          disabled={dataLoading || reloading || searching}
          style={{ marginLeft: 8 }}
          onClick={() => {
            this.handleSearchReset();
          }}
        >
          {reloading ? iconCollection.loading : iconCollection.reload}
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
      valueList.push(toMoment({ data: startTime }));
    }

    if ((endTime || null) != null) {
      valueList.push(toMoment({ data: endTime }));
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
  establishTableAdditionalConfig = () => {
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
      ...this.establishTableAdditionalConfig(),
      columns,
      size: tableSize,
      tableLayout: 'fix',
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

    return this.buildByExtraBuildType({
      keyPrefix: 'listView_dataContainerExtraActionItem_',
      configList,
    });
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

  adjustViewDataSource = () => {
    return this.establishViewDataSource();
  };

  adjustFrontendPaginationViewDataSource = () => {
    return this.adjustViewDataSource();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  establishCardCollectionViewItemConfig = (record) => {
    const text = 'establishCardCollectionViewItemConfig 需要重载实现';

    showRuntimeError({
      message: text,
    });

    return null;
  };

  /**
   * 不要在框架之外重载或覆盖该该函数，否则分页视图将功能异常
   */
  establishViewPaginationConfig = () => {
    return null;
  };

  /**
   *
   * @returns build开始得方法不应再框架外部进行重写
   */
  buildPageSizeOptionList = () => {
    let pageSizeList = [10, 20, 50, 100];

    pageSizeList.push(toNumber(this.pageSizeAdditional));

    pageSizeList = [...new Set(pageSizeList)].sort((a, b) => {
      return a - b;
    });

    return pageSizeList;
  };

  /**
   * 不要在框架之外重载或覆盖该该函数，否则分页视图将功能异常
   */
  supplementPaginationConfig = () => {
    const { pageNo, pageSize } = this.state;

    const config = {
      ...{
        size: 'default',
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => {
          return `${range[0]}-${range[1]} 共 ${total} 条信息`;
        },
        pageSizeOptions: this.buildPageSizeOptionList(),
      },
      ...this.establishViewPaginationConfig(),
      ...{
        current: pageNo,
        pageSize: pageSize,
      },
    };

    return config;
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

  establishPaginationViewStyle = () => {
    return {
      paddingTop: 16,
      paddingBottom: 16,
    };
  };

  /**
   * 配置StandardTable切换页面时需要引发的事项
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    this.handleAdditionalStandardTableChange(pagination, filtersArg, sorter);
  };

  /**
   * 配置额外的StandardTable切换页面时需要引发的事项
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAdditionalStandardTableChange = (pagination, filtersArg, sorter) => {};

  /**
   * 配置Pagination切换页面时需要引发的事项,用于listView/cardView
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  handlePaginationChange = (page, pageSize) => {
    this.handleAdditionalPaginationChange(page, pageSize);
  };

  /**
   * 配置额外的Pagination切换页面时需要引发的事项,用于listView/cardView
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleAdditionalPaginationChange = (page, pageSize) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handlePaginationShowSizeChange = (current, size) => {
    this.setState({ pageNo: 1 });
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

  buildPaginationBar = () => {
    const paginationConfig = this.supplementPaginationConfig();

    const style = this.establishPaginationViewStyle();

    const bar = (
      <FlexBox
        style={style}
        right={
          <Pagination
            {...paginationConfig}
            onChange={(page, size) => {
              this.handlePaginationChange(page, size);
            }}
            onShowSizeChange={(current, size) => {
              this.handlePaginationShowSizeChange(current, size);
            }}
          />
        }
      />
    );

    if (this.affixPaginationBar) {
      return (
        <Affix offsetBottom={0}>
          <div style={{ background: '#fff' }}>{bar}</div>
        </Affix>
      );
    }

    return bar;
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
              icon={iconCollection.reload}
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
            icon={iconCollection.reload}
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

    let actionSelect = null;

    if (showListViewItemActionSelect || false) {
      actionSelect = this.renderListViewItemActionSelect(record, index);
    }

    if (actionSelect == null) {
      return [...(isArray(actionOthers) ? actionOthers : [])];
    }

    const list = [...(isArray(actionOthers) ? actionOthers : []), actionSelect];

    return list.length === 0 ? null : list;
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
          dataSource={
            this.getCanUseFrontendPagination()
              ? this.adjustFrontendPaginationViewDataSource()
              : this.adjustViewDataSource()
          }
          pagination={false}
          renderItem={(item, index) => {
            return this.renderListViewItem(item, index);
          }}
        />

        {this.renderPaginationView()}
      </Spin>
    );
  };

  /**
   * 构建分页视图
   * frontendPagination配置仅用在前台模拟分页时
   */
  renderTableView = () => {
    const { metaListData, tableScroll, showSelect, selectedDataTableDataRows } =
      this.state;

    const { styleSet, columns, expandable, size } = this.buildTableConfig();

    const standardTableCustomOption = {
      loading: this.checkInProgress(),
      showSelect,
      selectedRows: selectedDataTableDataRows,
      columns,
      size: size || null,
      onSelectRow: this.handleSelectRows,
      onChange: this.handleStandardTableChange,
      expandable: adjustTableExpandConfig({
        list: metaListData,
        config: expandable,
      }),
      showPagination:
        this.useRemotePagination || !!this.getCanUseFrontendPagination(),
    };

    standardTableCustomOption.data = {
      list: this.adjustViewDataSource(),
      pagination: this.supplementPaginationConfig(),
    };

    if ((styleSet || null) != null) {
      standardTableCustomOption.style = styleSet;
    }

    if ((tableScroll || null) != null) {
      standardTableCustomOption.scroll = tableScroll;
    }

    return (
      <div className={styles.tableContainor}>
        <StandardTableCustom {...standardTableCustomOption} />
      </div>
    );
  };

  renderCardCollectionView = () => {
    const { dataLoading, reloading, processing } = this.state;

    const listItem = this.getCanUseFrontendPagination()
      ? this.adjustFrontendPaginationViewDataSource()
      : this.adjustViewDataSource();
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
    return this.buildPaginationBar();
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

      return this.renderCardCollectionView();
    }

    const text = '未知的显示模式';

    showRuntimeError({
      message: text,
    });

    return null;
  };

  buildCardCollectionArea = (config = null) => {
    if (config == null) {
      return null;
    }

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
      <Space style={{ width: '100%' }} direction="vertical" size={24}>
        {listData.map((item, index) => {
          return this.buildCardCollectionItem({
            mode,
            justify: justifyGeneral,
            align: alignGeneral,
            config: item,
            key: index,
          });
        })}
      </Space>
    );
  };

  renderSiderArea = () => {
    const topArea = this.renderSiderTopArea();

    const bottomArea = this.renderSiderBottomArea();

    if ((bottomArea || null) == null) {
      return topArea;
    }

    return <FlexBox direction="vertical" top={topArea} bottom={bottomArea} />;
  };

  renderContentArea = () => {
    const { listTitle } = this.state;

    const extraAction = this.renderExtraActionView();

    const searchForm = this.renderForm();

    const hasPagination = this.renderPaginationView() != null;

    var gridView = (
      <Card
        title={listTitle}
        headStyle={{ borderBottom: '0px' }}
        bodyStyle={{
          paddingTop: '0',
          paddingBottom: hasPagination ? 0 : 24,
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
    );

    if (!this.showSearchForm || (searchForm || null) == null) {
      return gridView;
    }

    return (
      <div
        style={{
          backgroundColor: '#f0f2f5',
        }}
      >
        <Space style={{ width: '100%' }} direction="vertical" size={24}>
          <Card bordered={false} className={styles.containorSearch}>
            <div className={styles.tableListForm}>{searchForm}</div>
          </Card>

          {gridView}
        </Space>
      </div>
    );
  };

  establishPageContentLayoutSiderConfig = () => {
    return {};
  };

  establishPageContentLayoutConfig = () => {
    return {};
  };

  renderPageContent = () => {
    const siderArea = this.renderSiderArea();
    const contentArea = this.renderContentArea();

    const layoutSiderConfig = this.establishPageContentLayoutSiderConfig();
    let layoutConfig = this.establishPageContentLayoutConfig();

    const { position: siderPosition } = {
      ...{
        position: 'left',
      },
      ...(layoutSiderConfig || {}),
    };

    const siderConfig = {
      ...{
        width: 300,
        style: {
          ...{
            backgroundColor: '#fff',
            borderRadius: '4px',
            overflowX: 'auto',
            overflowY: 'hidden',
          },
          ...(siderPosition === 'left'
            ? { marginRight: '24px' }
            : { marginLeft: '24px' }),
        },
      },
      ...(layoutSiderConfig || {}),
    };

    layoutConfig = {
      ...{
        breakpoint: 'sm',
        style: {
          backgroundColor: '#f0f2f5',
          minHeight: 'auto',
        },
      },
      ...(layoutConfig || {}),
    };

    const inner =
      siderArea == null ? (
        contentArea
      ) : (
        <Layout {...layoutConfig}>
          {siderPosition === 'left' ? (
            <Sider {...siderConfig}>{siderArea}</Sider>
          ) : null}

          <Content
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          >
            {contentArea}
          </Content>

          {siderPosition !== 'left' ? (
            <Sider {...siderConfig}>{siderArea}</Sider>
          ) : null}
        </Layout>
      );

    const toolbar = this.buildToolBarWrapper();

    const help = this.buildHelpWrapper();

    if ((toolbar || null) != null || (help || null) != null) {
      return (
        <div className={styles.containorBox} style={{ overflowX: 'hidden' }}>
          <Space style={{ width: '100%' }} direction="vertical" size={24}>
            {toolbar}

            {inner}

            {help}
          </Space>
        </div>
      );
    }

    return inner;
  };

  renderPageBody = () => {
    return (
      <>
        {this.renderPageContent()}

        {this.renderOther()}
      </>
    );
  };

  renderFurther() {
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
          extra={this.buildExtraAction()}
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
