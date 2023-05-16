import {
  Affix,
  Alert,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  List,
  Pagination,
  Row,
  Space,
} from 'antd';
import classNames from 'classnames';
import React, { Fragment } from 'react';

import {
  buildFieldDescription,
  createDayJsDatetime,
  datetimeFormat,
  isArray,
  isUndefined,
  logException,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
  showSimpleWarnMessage,
  toNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  columnFacadeMode,
  defaultListState,
  emptyLogic,
  formNameCollection,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
  searchCardConfig,
} from 'antd-management-fast-common';
import {
  adjustTableExpandConfig,
  avatarImageLoadResultCollection,
  buildColumnList,
  buildDropdown,
  buildFlexSelect,
  FlexBox,
  FormExtra,
  iconBuilder,
  StandardTable,
} from 'antd-management-fast-component';

import { LoadingOverlay } from '../../../components';
import { AuthorizationWrapper } from '../../AuthorizationWrapper';
import { BatchAction } from '../BatchAction';
import { ColumnSetting } from '../ColumnSetting';
import { DensityAction } from '../DensityAction';
import { EmptyCardCollection } from '../EmptyCardCollection';
import { RefreshButton } from '../RefreshButton';
import { ResetButton } from '../ResetButton';
import { SearchButton } from '../SearchButton';

import './index.less';

const classPrefix = `amf-data-list-view-base`;

const { Item: FormItem } = Form;
const { RangePicker } = DatePicker;
const { DatePickerItem, ComponentItem, OnlyShowInputItem } = FormExtra;

const primaryCallName = 'DataListView::Base';

class Base extends AuthorizationWrapper {
  /**
   * 使用远端分页
   */
  useRemotePagination = true;

  /**
   * 使用前台模拟分页，有助于优化长列表页面交互操作导致的延迟, 默认 true
   */
  useFrontendPagination = true;

  showSearchForm = true;

  affixPaginationBar = true;

  formRef = React.createRef();

  pageSizeAdditional = 0;

  columnOperateVisible = true;

  columnOperateWidth = 106;

  columnOperateFixed = 'right';

  /**
   * 显示选择按钮
   */
  showListViewItemActionSelect = false;

  /**
   * 使用表格密度配置
   */
  useTableDensityAction = true;

  constructor(properties) {
    super(properties);

    this.lastLoadParams = null;

    this.columnsOtherConfig = [];

    const defaultState = defaultListState();

    this.state = {
      ...this.state,
      ...defaultState,
      showSelect: false,
      listTitle: '检索结果',
      defaultAvatarIcon: iconBuilder.picture(),
      listViewMode: listViewConfig.viewMode.list,
      avatarImageLoadResult: avatarImageLoadResultCollection.wait,
      showPageHeaderAvatar: false,
      tableSize: listViewConfig.tableSize.middle,
      counterSetColumnsOtherConfig: 0,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  doWorkAfterDidMount = () => {
    const { pageSize } = this.pageValues;

    this.pageSizeAdditional = pageSize;
  };

  afterLoadSuccess = ({
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
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

    this.doOtherAfterLoadSuccess({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
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
    return this.useRemotePagination ? false : !!this.useFrontendPagination;
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

  // eslint-disable-next-line no-unused-vars
  afterSetSearchFormFieldsValue = (value) => {};

  getPresetPageName = () => {
    const { pageTitle } = this.state;

    return pageTitle;
  };

  getColumnWrapper = () => {
    const text = 'getColumnWrapper 需要重载实现';

    showSimpleRuntimeError(text);

    return [];
  };

  buildColumnFromWrapper = () => {
    const list = this.getColumnWrapper() || [];

    let hasCustomOperate = false;

    for (const o of list) {
      const { dataTarget: dt } = {
        dataTarget: {},
        ...o,
      };

      const { name } = {
        name: '',
        ...dt,
      };

      if (name === formNameCollection.customOperate.name) {
        hasCustomOperate = true;
      }
    }

    return this.buildColumnList([
      ...list,
      ...(hasCustomOperate
        ? []
        : [
            {
              dataTarget: formNameCollection.customOperate,
              width: this.columnOperateWidth,
              fixed: this.columnOperateFixed,
              showRichFacade: true,
              facadeMode: columnFacadeMode.dropdown,
              hidden: !this.columnOperateVisible,
              configBuilder: (value, record) => {
                const o = this.establishListItemDropdownConfig(record);

                return o || null;
              },
            },
          ]),
    ]);
  };

  buildColumnList = (list) => {
    return buildColumnList({
      columnList: list,
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
        if (columnsSource.length === columnsOtherConfigArray.length) {
          for (const [index, item] of columnsSource.entries()) {
            const c = { ...item, ...columnsOtherConfigArray[index] };

            const { show } = c || { show: true };

            if (show) {
              columns.push(c);
            }
          }
        } else {
          this.restoreColumnsOtherConfigArray();
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
    this.logCallTrack({}, primaryCallName, 'handleSearch');

    if (this.checkWorkDoing()) {
      this.logCallTrace(
        {},
        primaryCallName,
        'handleSearch',
        'ignore on working',
      );

      return;
    }

    const form = this.getSearchCard();

    if (!form) {
      const text = '查询表单不存在';

      showSimpleErrorMessage(text);
    }

    const { validateFields } = form;

    validateFields()
      .then((fieldsValue) => {
        const values = {
          ...fieldsValue,
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        };

        this.filterFormValues = values;

        this.searchData({});

        return values;
      })
      .catch((error) => {
        const { errorFields, message } = error;

        if (!isUndefined()) {
          logException(message);
        }

        if (isUndefined(errorFields)) {
          showSimpleRuntimeError(error);
        } else {
          const m = [];

          for (const o of Object.values(errorFields)) {
            m.push(o.errors[0]);
          }

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

          showSimpleWarnMessage(errorMessage);
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
      otherComponent: null,
      list: [],
      ...config,
    };
    const { otherComponent, list } = configData;

    const listData = [];

    if (isArray(list)) {
      for (const co of list) {
        listData.push(co);
      }
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
      innerProps,
    } = {
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
      innerProps: null,
      ...contentItem,
    };

    const fieldData = {
      label: '',
      name: '',
      helper: '',
      ...fieldDataValue,
    };

    let lg = (lgValue || 6) <= 0 ? 6 : lgValue;

    lg = lg > 24 ? 24 : lg;

    return (
      <Col key={contentItemKey} lg={lg || 6} md={md} sm={sm} xs={xs}>
        {type === searchCardConfig.contentItemType.input
          ? this.renderPresetSearchInput(
              fieldData.label,
              fieldData.name,
              showHelper ? fieldData.helper : '',
              icon || iconBuilder.form(),
              { ...contentItem.innerProps },
            )
          : null}

        {type === searchCardConfig.contentItemType.inputNumber
          ? this.renderPresetSearchInputNumber(
              fieldData.label,
              fieldData.name,
              fieldData.helper,
              icon || iconBuilder.form(),
              {
                ...contentItem.innerProps,
              },
            )
          : null}

        {type === searchCardConfig.contentItemType.datePicker ? (
          <DatePickerItem
            label={fieldData.label}
            name={fieldData.name}
            required={false}
            helper={fieldData.helper}
            datePickerProps={{ ...innerProps }}
          />
        ) : null}

        {type === searchCardConfig.contentItemType.customRangePicker
          ? this.buildSearchCardRangePickerCore(
              contentItem.dateRangeFieldName,
              {
                ...innerProps,
              },
            )
          : null}

        {type === searchCardConfig.contentItemType.onlyShowInput ? (
          <OnlyShowInputItem
            label={fieldData.label}
            value={contentItem.value}
            helper={fieldData.helper || ''}
            icon={contentItem.icon || iconBuilder.form()}
            innerProps={{
              ...contentItem.innerProps,
              disabled: true,
            }}
          />
        ) : null}

        {type === searchCardConfig.contentItemType.customSelect
          ? contentItem.component
          : null}

        {type === cardConfig.contentItemType.flexSelect
          ? buildFlexSelect(contentItem)
          : null}

        {type === searchCardConfig.contentItemType.customRadio
          ? contentItem.component
          : null}

        {type === searchCardConfig.contentItemType.innerComponent ? (
          <ComponentItem
            label={fieldData.label}
            innerComponent={component}
            helper={fieldData.helper}
            formItemLayout={null}
            requiredForShow={false}
          />
        ) : null}

        {type === searchCardConfig.contentItemType.component
          ? component || null
          : null}
      </Col>
    );
  };

  establishSearchCardConfig = () => {
    const { dateRangeFieldName } = this.fieldConfig;

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
    return (
      <span
        className={classNames(`${classPrefix}_tableListForm_submitButtons`)}
      >
        <SearchButton
          loadingFlag={this.viewLoadingFlag}
          searchingFlag={this.viewSearchingFlag}
          onSearch={(event) => {
            this.handleSearch(event);
          }}
        />

        <ResetButton
          loadingFlag={this.viewLoadingFlag}
          resettingFlag={this.viewResettingFlag}
          onReset={() => {
            this.handleSearchReset();
          }}
        />
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
    rangePickerProperties = null,
  ) => {
    const { startTime, endTime } = this.filterExtraValues;

    const valueList = [];

    if ((startTime || null) != null) {
      valueList.push(
        createDayJsDatetime(startTime, datetimeFormat.yearMonthDay),
      );
    }

    if ((endTime || null) != null) {
      valueList.push(createDayJsDatetime(endTime, datetimeFormat.yearMonthDay));
    }

    const p = {
      style: { width: '100%' },
      showTime: { format: 'HH:mm' },
      value: valueList,
      format: datetimeFormat.yearMonthDayHourMinute,
      placeholder: ['开始时间', '结束时间'],
      onChange: (dates, dateStrings) => {
        this.onDateRangeChange(dates, dateStrings);
      },
      ...rangePickerProperties,
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
    rangePickerProperties = null,
  ) => {
    this.logCallTrack({}, primaryCallName, 'buildSearchCardRangePicker');

    return (
      <Col lg={colLg} md={12} sm={24} xs={24}>
        {this.buildSearchCardRangePickerCore(
          dateRangeFieldName,
          rangePickerProperties,
        )}
      </Col>
    );
  };

  buildSearchCardRow = () => {
    this.logCallTrack({}, primaryCallName, 'buildSearchCardRow');

    const config = this.establishSearchCardConfig();

    if ((config || null) == null) {
      return null;
    }

    return this.buildSearchCardContent(config);
  };

  fillSearchCardInitialValues = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'fillSearchCardInitialValues',
      emptyLogic,
    );

    return {};
  };

  buildSearchCard = () => {
    const element = this.buildSearchCardRow();

    if ((element || null) == null) {
      return null;
    }

    return (
      <Form
        ref={this.formRef}
        initialValues={this.fillSearchCardInitialValues()}
        onSubmit={this.handleSearch}
        layout="horizontal"
      >
        {element}
      </Form>
    );
  };

  renderPresetForm = () => this.buildSearchCard();

  establishTableAdditionalConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTableAdditionalConfig',
      emptyLogic,
    );

    return {};
  };

  establishTableExpandableConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishTableExpandableConfig',
      emptyLogic,
    );

    return null;
  };

  restoreColumnsOtherConfigArray = () => {
    this.logCallTrack({}, primaryCallName, 'restoreColumnsOtherConfigArray');

    const columnsOtherConfigArray = this.getColumn().map((item) => {
      return { dataIndex: item.dataIndex, show: true, fixed: item.fixed || '' };
    });

    this.columnsOtherConfig = columnsOtherConfigArray;
  };

  buildTableConfig = () => {
    this.logCallTrack({}, primaryCallName, 'buildTableConfig');

    const { tableSize } = this.state;

    const columns = this.getColumnMerged();
    const expandable = this.establishTableExpandableConfig();

    const result = {
      ...this.establishTableAdditionalConfig(),
      columns,
      size: tableSize,
      tableLayout: 'fix',
      expandable,
    };

    this.logCallTrace(result, primaryCallName, 'buildTableConfig', 'result');

    return result;
  };

  setTableSize = (key) => {
    this.setState({ tableSize: key });
  };

  setColumnsMap = (event) => {
    if (Object.keys(event || {}).length === 0) {
      this.restoreColumnsOtherConfigArray();
    } else {
      const columnsOtherConfigArrayChanged = (
        this.columnsOtherConfig || []
      ).map((item) => {
        const { dataIndex } = item;

        if (!isUndefined(event[dataIndex])) {
          const d = event[dataIndex];

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

  // eslint-disable-next-line no-unused-vars
  setSortKeyColumns = (event) => {};

  getColumnsMap = () => {
    const o = {};

    for (const item of this.columnsOtherConfig || []) {
      const { dataIndex } = item;

      const temporary = { ...item };

      if (temporary.delete) {
        temporary.delete('dataIndex');
      }

      o[`${dataIndex}`] = temporary;
    }

    return o;
  };

  // eslint-disable-next-line no-unused-vars
  onBatchActionSelect = (key) => {};

  // eslint-disable-next-line no-unused-vars
  renderPresetTable = (config) => null;

  renderPresetAlertContent = () => {
    return '';
  };

  renderPresetAlertOption = () => {};

  renderPresetAboveTable = () => {
    const content = this.renderPresetAlertContent();
    const option = this.renderPresetAlertOption();

    if (!content && !option) {
      return null;
    }

    return (
      <div
        className={classNames(`${classPrefix}_containorTable_alertContainor`)}
      >
        <Alert
          message={
            <div
              className={classNames(
                `${classPrefix}_containorTable_alertContainor_alertInfo`,
              )}
            >
              <div
                className={classNames(
                  `${classPrefix}_containorTable_alertContainor_alertInfo_alertContent`,
                )}
              >
                {content}
              </div>
              {option && (
                <div
                  className={classNames(
                    `${classPrefix}_containorTable_alertContainor_alertInfo_alertOption`,
                  )}
                >
                  {option}
                </div>
              )}
            </div>
          }
          type="info"
          showIcon
        />
      </div>
    );
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishDataContainerExtraActionCollectionConfig',
      emptyLogic,
    );

    return [];
  };

  establishDataContainerExtraAffixConfig = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'establishDataContainerExtraAffixConfig',
      emptyLogic,
    );

    return {};
  };

  buildDataContainerExtraActionCollection = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'buildDataContainerExtraActionCollection',
    );

    const configList = this.establishDataContainerExtraActionCollectionConfig();

    if (!isArray(configList)) {
      return [];
    }

    return this.buildByExtraBuildType({
      keyPrefix: 'listView_dataContainerExtraActionItem_',
      configList,
    });
  };

  renderPresetExtraActionView = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetExtraActionView');

    const actions = this.buildDataContainerExtraActionCollection();

    if (!isArray(actions) || actions.length <= 0) {
      return null;
    }

    return (
      <Space split={<Divider type="vertical" />}>
        {actions.map((item) => {
          return item;
        })}
      </Space>
    );
  };

  renderPresetBatchActionMenu = () => [];

  renderPresetBatchAction = () => {
    const { showSelect, selectedDataTableDataRows } = this.state;

    const selectRows = isArray(selectedDataTableDataRows)
      ? selectedDataTableDataRows
      : [];

    if (showSelect) {
      const batchActionMenu = this.renderPresetBatchActionMenu();

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

  onPageHeaderAvatarLoadError = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  establishViewDataSource = () => {
    const text = 'establishViewDataSource 需要重载实现用来构建列表数据源';

    showSimpleRuntimeError(text);

    return null;
  };

  adjustViewDataSource = () => {
    return this.establishViewDataSource();
  };

  adjustFrontendPaginationViewDataSource = () => {
    return this.adjustViewDataSource();
  };

  // eslint-disable-next-line no-unused-vars
  establishCardCollectionViewItemConfig = (record) => {
    const text = 'establishCardCollectionViewItemConfig 需要重载实现';

    showSimpleRuntimeError(text);

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
    const { pageNo, pageSize } = this.pageValues;

    const pageSizeOptions = this.buildPageSizeOptionList();
    const paginationConfig = this.establishViewPaginationConfig();

    const config = {
      size: 'default',
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => {
        return `${range[0]}-${range[1]} 共 ${total} 条信息`;
      },
      pageSizeOptions,
      ...paginationConfig,
      defaultCurrent: pageNo,
      defaultPageSize: pageSize,
    };

    this.logCallTrack(
      {
        pageValues: this.pageValues,
        pageSizeOptions,
        paginationConfig,
        config,
      },
      primaryCallName,
      'supplementPaginationConfig',
    );

    return config;
  };

  establishPageHeaderTagCollectionConfig = () => [];

  establishPageHeaderAvatarConfig = () => {
    return null;
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
   * @param {*} extra
   */
  handleStandardTableChange = (pagination, filtersArgument, sorter, extra) => {
    this.logCallTrack(
      {
        pagination,
        filtersArgument,
        sorter,
        extra,
      },
      primaryCallName,
      'handleStandardTableChange',
    );

    this.handleAdditionalStandardTableChange(
      pagination,
      filtersArgument,
      sorter,
      extra,
    );
  };

  /**
   * 配置额外的StandardTable切换页面时需要引发的事项
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   * @param {*} extra
   */
  handleAdditionalStandardTableChange = (
    // eslint-disable-next-line no-unused-vars
    pagination,
    // eslint-disable-next-line no-unused-vars
    filtersArgument,
    // eslint-disable-next-line no-unused-vars
    sorter,
    // eslint-disable-next-line no-unused-vars
    extra,
  ) => {};

  /**
   * 配置Pagination切换页面时需要引发的事项,用于listView/cardView
   * @param {*} page
   * @param {*} size
   */
  handlePaginationChange = (page, size) => {
    this.handleAdditionalPaginationChange(page, size);
  };

  /**
   * 配置额外的Pagination切换页面时需要引发的事项,用于listView/cardView
   * @param {*} pagination
   * @param {*} filtersArg
   * @param {*} sorter
   */
  // eslint-disable-next-line no-unused-vars
  handleAdditionalPaginationChange = (page, size) => {};

  handlePaginationShowSizeChange = (current, size) => {
    this.logCallTrack(
      {
        parameter: {
          current,
          size,
        },
      },
      primaryCallName,
      'handlePaginationShowSizeChange',
    );

    this.setPageValue({ pageNo: 1 });
  };

  establishPageHeaderExtraContentConfig = () => null;

  buildPaginationBar = () => {
    this.logCallTrack({}, primaryCallName, 'buildPaginationBar');

    const paginationConfig = this.supplementPaginationConfig();

    const style = this.establishPaginationViewStyle();

    this.logCallTrace(
      {
        paginationConfig,
        style,
      },
      primaryCallName,
      'buildPaginationBar',
      'object',
    );

    const bar = (
      <FlexBox
        style={style}
        flexAuto="left"
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
          <div style={{ background: 'transparent' }}>{bar}</div>
        </Affix>
      );
    }

    return bar;
  };

  renderPresetCardExtraAction = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetCardExtraAction');

    const { listViewMode, tableSize } = this.state;

    console.log(this.useTableDensityAction);
    console.log('---------------------------------------------------');

    if (listViewMode === listViewConfig.viewMode.table) {
      return (
        <>
          {this.useTableDensityAction ? (
            <DensityAction
              tableSize={tableSize}
              setTableSize={(key) => {
                this.setTableSize(key);
              }}
            />
          ) : null}

          <RefreshButton
            flag={[this.viewLoadingFlag, this.viewReloadingFlag]}
            onRefresh={() => {
              this.refreshData({});
            }}
          />

          <ColumnSetting
            columns={this.getColumn()}
            columnsMap={this.getColumnsMap()}
            setColumnsMap={(event) => {
              this.setColumnsMap(event);
            }}
            setSortKeyColumns={(key) => {
              this.setSortKeyColumns(key);
            }}
          />
        </>
      );
    }

    return (
      <RefreshButton
        flag={[this.viewLoadingFlag, this.viewReloadingFlag]}
        onRefresh={() => {
          this.refreshData({});
        }}
      />
    );
  };

  renderPresetListViewItem = (record, index) => {
    this.logCallTrack({}, primaryCallName, 'renderPresetListViewItem');

    return (
      <List.Item
        actions={this.renderPresetListViewItemActions(record, index)}
        extra={this.renderPresetListViewItemExtra(record, index)}
      >
        {this.renderPresetListViewItemInner(record, index)}
      </List.Item>
    );
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemInner = (record, index) => {
    const text = 'renderPresetListViewItemInner 需要重载实现';

    showSimpleRuntimeError(text);

    return null;
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemExtra = (record, index) => {
    return null;
  };

  renderPresetListViewItemActions = (record, index) => {
    const actionOthers = this.renderPresetListViewItemActionOthers(
      record,
      index,
    );

    let actionSelect = null;

    if (this.showListViewItemActionSelect || false) {
      actionSelect = this.renderPresetListViewItemActionSelect(record, index);
    }

    if (actionSelect == null) {
      return [...(isArray(actionOthers) ? actionOthers : [])];
    }

    const list = [...(isArray(actionOthers) ? actionOthers : []), actionSelect];

    return list.length === 0 ? null : list;
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemActionOthers = (record, index) => {
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetListViewItemActionSelect = (record, index) => {
    return null;
  };

  renderPresetListViewItemLayout = () => {
    return 'horizontal';
  };

  renderPresetListViewSize = () => {
    return 'default';
  };

  renderPresetListView = () => {
    return (
      <LoadingOverlay flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}>
        <List
          itemLayout={this.renderPresetListViewItemLayout()}
          size={this.renderPresetListViewSize()}
          dataSource={
            this.getCanUseFrontendPagination()
              ? this.adjustFrontendPaginationViewDataSource()
              : this.adjustViewDataSource()
          }
          pagination={false}
          renderItem={(item, index) => {
            return this.renderPresetListViewItem(item, index);
          }}
        />

        {this.renderPresetPaginationView()}
      </LoadingOverlay>
    );
  };

  /**
   * 构建分页视图
   * frontendPagination配置仅用在前台模拟分页时
   */
  renderPresetTableView = () => {
    this.logCallTrace({}, primaryCallName, 'renderPresetTableView');

    const {
      metaListData,
      tableScrollX,
      tableScrollY,
      showSelect,
      selectedDataTableDataRows,
    } = this.state;

    const {
      style: styleSet,
      columns,
      expandable,
      size,
    } = this.buildTableConfig();

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

    standardTableCustomOption.scroll = {
      ...(tableScrollX > 0 ? { x: tableScrollX } : {}),
      ...(tableScrollY == null ? {} : { y: tableScrollY }),
    };

    this.logCallTrace(
      {
        metaListData,
        tableScrollX,
        tableScrollY,
        showSelect,
        selectedDataTableDataRows,
        standardTableCustomOption,
      },
      primaryCallName,
      'renderPresetTableView',
    );

    return (
      <LoadingOverlay
        flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
        fill
      >
        <StandardTable {...standardTableCustomOption} />
      </LoadingOverlay>
    );
  };

  renderPresetCardCollectionView = () => {
    const listItem = this.getCanUseFrontendPagination()
      ? this.adjustFrontendPaginationViewDataSource()
      : this.adjustViewDataSource();
    const itemCount = listItem.length;

    return (
      <LoadingOverlay flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}>
        <Space style={{ width: '100%' }} direction="vertical" size={14}>
          {itemCount > 0 ? (
            listItem.map((o, index) => {
              return this.buildCardCollectionItem({
                config: this.establishCardCollectionViewItemConfig(o),
                key: index,
              });
            })
          ) : (
            <EmptyCardCollection
              flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
            />
          )}
        </Space>

        {this.renderPresetPaginationView()}
      </LoadingOverlay>
    );
  };

  // eslint-disable-next-line no-unused-vars
  renderPresetCustomItemView = (item) => {
    logException('renderPresetCustomItemView need override for custom view');

    return null;
  };

  renderPresetCustomView = () => {
    const listItem = this.getCanUseFrontendPagination()
      ? this.adjustFrontendPaginationViewDataSource()
      : this.adjustViewDataSource();
    const itemCount = listItem.length;

    return (
      <LoadingOverlay flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}>
        <Space style={{ width: '100%' }} direction="vertical" size={14}>
          {itemCount > 0 ? (
            listItem.map((o, index) => {
              return (
                <Fragment key={`item_${index}`}>
                  {this.renderPresetCustomItemView(o)}
                </Fragment>
              );
            })
          ) : (
            <EmptyCardCollection
              flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
            />
          )}
        </Space>

        {this.renderPresetPaginationView()}
      </LoadingOverlay>
    );
  };

  renderPresetPaginationView = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPaginationView');

    return this.buildPaginationBar();
  };

  renderPresetListMainView = () => {
    const { showSelect, listViewMode } = this.state;

    if (listViewMode === listViewConfig.viewMode.table) {
      return this.renderPresetTableView();
    }

    if (listViewMode === listViewConfig.viewMode.list) {
      if (showSelect) {
        const text = 'MultiListView显示模式下不支持选择 list view';

        showSimpleRuntimeError(text);
      }

      return this.renderPresetListView();
    }

    if (listViewMode === listViewConfig.viewMode.cardCollectionView) {
      if (showSelect) {
        const text = 'MultiListView显示模式下不支持选择 card collection view';

        showSimpleRuntimeError(text);
      }

      return this.renderPresetCardCollectionView();
    }

    if (listViewMode === listViewConfig.viewMode.customView) {
      if (showSelect) {
        const text = 'MultiListView显示模式下不支持选择 custom view';

        showSimpleRuntimeError(text);
      }

      return this.renderPresetCustomView();
    }

    const text = '未知的显示模式';

    showSimpleRuntimeError(text);

    return null;
  };

  renderPresetContentArea = () => {
    const { listTitle } = this.state;

    const affixConfig = {
      affix: false,
      offsetTop: 10,
      ...this.establishDataContainerExtraAffixConfig(),
    };

    const extraAction = this.renderPresetExtraActionView();

    const searchForm = this.renderPresetForm();

    const hasPagination = this.renderPresetPaginationView() != null;

    const { affix, offsetTop } = affixConfig;

    const extraView = affix ? (
      <Affix offsetTop={toNumber(offsetTop)}>
        <div>
          {extraAction}

          {extraAction == null ? null : <Divider type="vertical" />}

          {this.renderPresetBatchAction()}

          {this.renderPresetCardExtraAction()}
        </div>
      </Affix>
    ) : (
      <>
        {extraAction}

        {extraAction == null ? null : <Divider type="vertical" />}

        {this.renderPresetBatchAction()}

        {this.renderPresetCardExtraAction()}
      </>
    );

    let gridView = (
      <Card
        title={listTitle}
        headStyle={{ borderBottom: '0px' }}
        bodyStyle={{
          paddingTop: '0',
          paddingBottom: hasPagination ? 0 : 24,
        }}
        bordered={false}
        className={classNames(`${classPrefix}_containorTable`)}
        extra={extraView}
      >
        <div>
          {this.renderPresetAboveTable()}

          {this.renderPresetListMainView()}
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
        <Space style={{ width: '100%' }} direction="vertical" size={14}>
          <Card
            bordered={false}
            className={classNames(`${classPrefix}_containorSearch`)}
          >
            <div className={classNames(`${classPrefix}_tableListForm`)}>
              {searchForm}
            </div>
          </Card>

          {gridView}
        </Space>
      </div>
    );
  };

  establishPageContentLayoutConfig = () => {
    return {};
  };

  establishListItemDropdownConfig = (record) => {
    if ((record || null) == null) {
      return null;
    }

    return null;
  };

  renderPresetListItemDropdown = (record) => {
    const config = this.establishListItemDropdownConfig(record);

    config.placement = 'topRight';

    return buildDropdown(config);
  };
}

export { Base };
