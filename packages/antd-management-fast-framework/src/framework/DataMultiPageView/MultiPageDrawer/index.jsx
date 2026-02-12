import { Card, Col, Divider, List, Row, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import React from 'react';

import {
  checkObjectIsNullOrEmpty,
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logCallTrack,
  mergeArrowText,
  toString,
} from 'easy-soft-utility';

import {
  cardConfig,
  contentConfig,
  emptyLogic,
  listViewConfig,
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';
import { PageExtra } from 'antd-management-fast-component';

import {
  DrawerExtra,
  LoadingOverlay,
  ReloadAnimalPrompt,
} from '../../../components';
import { switchControlAssist } from '../../../utils';
import { ColumnSetting } from '../../DataListView/ColumnSetting';
import { DensityAction } from '../../DataListView/DensityAction';
import { RefreshButton } from '../../DataListView/RefreshButton';
import { MultiPage } from '../MultiPage';

import styles from '../../DataListView/Drawer/index.less';

const { ContentBox, SiderBox } = PageExtra;

const primaryCallName = 'DataMultiPageView::MultiPageDrawer';

/**
 * DataMultiPageView.MultiPageDrawer
 * @namespace
 */
class MultiPageDrawer extends MultiPage {
  /**
   * 可见性标记，通过构造函数赋值，请务必不要使用其他渠道赋值。
   * @member {string}
   */
  visibleFlag = '';

  affixPaginationBar = false;

  contentWrapperType = contentConfig.wrapperType.drawer;

  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  reloadWhenShow = true;

  reloadAnimalPrompt = true;

  reloadAnimalPromptComplete = false;

  useTableDensityAction = false;

  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties);

    if (checkStringIsNullOrWhiteSpace(visibleFlag || '')) {
      throw new Error(
        mergeArrowText(
          this.componentName,
          'constructor(properties, visibleFlag)',
          `visibleFlag disallow empty`,
        ),
      );
    }

    this.state = {
      ...this.state,
      listViewMode: listViewConfig.viewMode.table,
      tableScrollY: 'calc(100% - 47px)',
      overlayButtonOpenText: '打开浮层',
      overlayButtonCloseText: '关闭浮层',
    };

    this.restoreSearch = false;
    this.visibleFlag = visibleFlag;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData: externalData || null };
  }

  /**
   * 构建附加的分页配置
   */
  establishTableAdditionalConfig = () => {
    this.logCallTrack({}, primaryCallName, 'establishTableAdditionalConfig');

    return {
      style: {
        padding: '0px',
        height: '100%',
      },
    };
  };

  getVisibleFlag() {
    this.logCallTrack({}, primaryCallName, 'getVisibleFlag');

    const { flag } = this.props;

    return flag || this.visibleFlag;
  }

  adjustAfterCloseParameter = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'adjustAfterCloseParameter',
      emptyLogic,
    );

    return null;
  };

  /**
   * 当可见性变为显示时执行
   */
  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      this.logCallTrace(
        {},
        primaryCallName,
        'doOtherWhenChangeVisibleToShow',
        'trigger',
        'handleSearchReset',
      );

      this.handleSearchReset({});
    } else if (this.reloadWhenShow) {
      this.logCallTrace(
        {
          parameter: {
            delay: 500,
          },
        },
        primaryCallName,
        'doOtherWhenChangeVisibleToShow',
        'trigger',
        'reloadDataWithReloadAnimalPrompt',
      );

      this.reloadDataWithReloadAnimalPrompt({
        delay: 500,
      });
    }
  };

  /**
   * 切换为显示状态后，doOtherWhenChangeVisibleToShow 执行后的附加逻辑, 默认为空逻辑，可根据需要重载
   * @function
   * @example
   * executeAfterDoOtherWhenChangeVisibleToShow = () => {}
   */
  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToShow',
      emptyLogic,
    );
  };

  /**
   * 切换为隐藏状态后的额外执行逻辑, 在 doOtherWhenChangeVisible 中根据可见状态自动触发，当前为空逻辑，可根据需要重载。
   * @function
   * @example
   * doOtherWhenChangeVisibleToHide = () => {}
   */
  doOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 切换为隐藏状态后的额外附加执行逻辑, 在 doOtherWhenChangeVisible 中根据可见状态自动触发，排在 doOtherWhenChangeVisibleToHide 之后触发，当前为空逻辑，可根据需要重载。
   * @function
   * @example
   * executeAfterDoOtherWhenChangeVisibleToHide = () => {}
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 当可见性变更后的附加执行
   */
  executeOtherAfterDoOtherWhenChangeVisible = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeOtherAfterDoOtherWhenChangeVisible',
      emptyLogic,
    );
  };

  /**
   * 当可见性发生变化时执行
   */
  doOtherWhenChangeVisible = (currentVisible) => {
    this.logCallTrack(
      {
        parameter: { currentVisible },
      },
      primaryCallName,
      'doOtherWhenChangeVisible',
    );

    if (currentVisible) {
      this.doOtherWhenChangeVisibleToShow();
      this.executeAfterDoOtherWhenChangeVisibleToShow();
    } else {
      const { afterClose } = this.props;

      if (isFunction(afterClose)) {
        this.logCallTrace(
          {},
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
        );

        afterClose(this.adjustAfterCloseParameter());
      } else {
        this.logCallTrace(
          {},
          primaryCallName,
          'doOtherWhenChangeVisible',
          'trigger',
          'afterClose',
          emptyLogic,
        );
      }

      this.doOtherWhenChangeVisibleToHide();
      this.executeAfterDoOtherWhenChangeVisibleToHide();
    }

    this.executeOtherAfterDoOtherWhenChangeVisible(currentVisible);
  };

  onClose = () => {
    const { onClose: triggerClose } = this.props;

    if (isFunction(triggerClose)) {
      this.logCallTrace({}, primaryCallName, 'trigger', 'onClose');

      triggerClose();
    } else {
      this.logCallTrace({}, primaryCallName, 'trigger', 'onClose', emptyLogic);
    }

    switchControlAssist.close(this.getVisibleFlag());
  };

  /**
   * 选择数据
   * @param {*} handleData
   */
  selectRecord = ({ handleData }) => {
    this.logCallTrack(
      {
        parameter: { handleData },
      },
      primaryCallName,
      'selectRecord',
    );

    const { afterSelectSuccess, hideDrawerAfterSelect } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(handleData);
    }

    if (hideDrawerAfterSelect) {
      this.hideDrawer();
    }
  };

  /**
   * 渲染标题图标，默认为空，可根据需要重载。
   * @function
   * @returns {Object} 标题图标
   * @example
   * renderPresetTitleIcon = () => null
   */
  renderPresetTitleIcon = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetTitleIcon', emptyLogic);

    return null;
  };

  /**
   * 创建标题前缀文字，默认为空，可根据需要重载。
   * @function
   * @returns {string} 标题前缀文本
   * @example
   * buildTitlePrevText = () => ""
   */
  buildTitlePrevText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitlePrevText', emptyLogic);

    return '';
  };

  buildTitleText = () => {
    this.logCallTrace(
      {},
      primaryCallName,
      'buildTitleText',
      'getPresetPageTitle',
    );

    const { title } = this.props;

    return checkStringIsNullOrWhiteSpace(title)
      ? this.getPresetPageTitle()
      : title;
  };

  buildTitleSubText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleSubText', emptyLogic);

    return '';
  };

  hideDrawer = () => {
    this.logCallTrack({}, primaryCallName, 'hideDrawer');

    this.onClose();
  };

  establishPaginationViewStyle = () => {
    this.logCallTrack({}, primaryCallName, 'establishPaginationViewStyle');

    return {
      paddingTop: 10,
      paddingBottom: 10,
    };
  };

  renderPresetListMainViewContainor = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetListMainViewContainor');

    const { firstLoadSuccess, listTitle, tableSize, listViewMode } = this.state;

    const extraAction = this.renderPresetExtraActionView();
    const searchForm = this.renderPresetForm();

    return (
      <div
        className={styles.tableList}
        style={{ height: '100%', overflow: 'hidden' }}
      >
        <div
          className={classNames(styles.containorBox, styles.backendPagination)}
          style={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {this.showSearchForm && (searchForm || null) != null ? (
            <div style={{ flex: 0 }}>
              <Card
                variant="borderless"
                className={styles.containorSearch}
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
              >
                <div className={styles.tableListForm}>
                  {this.renderPresetForm()}
                </div>
              </Card>

              <div style={{ height: '1px', backgroundColor: '#f0f2f5' }} />
            </div>
          ) : null}

          <div style={{ flex: 'auto', overflow: 'hidden' }}>
            <Card
              title={
                <Row>
                  <Col flex="70px"> {listTitle}</Col>
                  <Col flex="auto">
                    <QueueAnim>
                      {this.reloadWhenShow && this.reloadAnimalPrompt ? (
                        <ReloadAnimalPrompt
                          hide={!firstLoadSuccess}
                          flag={this.viewAnimalPromptFlag}
                        />
                      ) : null}
                    </QueueAnim>
                  </Col>
                </Row>
              }
              style={{
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
              styles={{
                header: {
                  borderBottom: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  flex: 0,
                },
                body: {
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  flex: 'auto',
                  overflow: 'hidden',
                  // height: 'calc(100vh - 103px)',
                },
              }}
              variant="borderless"
              className={styles.containorTable}
              extra={
                <Space
                  orientation="horizontal"
                  separator={<Divider orientation="vertical" />}
                >
                  {extraAction}

                  {this.renderPresetBatchAction()}

                  <div>
                    {listViewMode === listViewConfig.viewMode.table &&
                    this.useTableDensityAction ? (
                      <DensityAction
                        tableSize={tableSize}
                        setTableSize={(key) => {
                          this.setTableSize(key);
                        }}
                      />
                    ) : null}

                    <Tooltip title="刷新本页">
                      <RefreshButton
                        flag={[this.viewLoadingFlag, this.viewReloadingFlag]}
                        onRefresh={() => {
                          this.refreshData({});
                        }}
                      />
                    </Tooltip>

                    {listViewMode === listViewConfig.viewMode.table ? (
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
                    ) : null}
                  </div>
                </Space>
              }
            >
              <div
                style={{
                  height: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ flex: 0 }}>{this.renderPresetAboveTable()}</div>

                <div style={{ flex: 'auto', overflow: 'hidden' }}>
                  {this.renderPresetListMainView()}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {this.renderPresetOther()}
      </div>
    );
  };

  /**
   * 渲染内容容器。
   * @function
   * @returns {Object} 渲染结果
   */
  renderPresetContentContainor = () => {
    return (
      <div
        className={styles.contentContainor}
        style={{
          paddingBottom: 0,
          height: '100%',
          overflow: 'hidden',
          ...(this.showSearchForm ? {} : { paddingTop: 0 }),
          backgroundColor: '#fff',
        }}
      >
        {this.renderPresetListMainViewContainor()}
      </div>
    );
  };

  renderPresetDrawerInner = () => {
    return (
      <div
        className={styles.mainContainor}
        style={{ height: '100%', overflow: 'hidden' }}
      >
        {this.renderPresetContentContainor()}
      </div>
    );
  };

  renderPresetListView = () => {
    return (
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ flex: 'auto', overflow: 'hidden' }}>
          <LoadingOverlay
            flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
            fill
          >
            <List
              style={{ height: '100%', overflow: 'auto' }}
              className={styles.list}
              itemLayout={this.establishListViewItemLayout()}
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
          </LoadingOverlay>
        </div>

        <div style={{ flex: 0 }}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              boxShadow: 'inset 0px 9px 8px -5px rgba(5, 5, 5, 0.06)',
            }}
          >
            <div style={{ flex: 'auto' }} />

            {this.renderPresetPaginationView()}
          </div>
        </div>
      </div>
    );
  };

  renderOverlayContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderOverlayContent', emptyLogic);

    return null;
  };

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    if (this.showCallProcess) {
      this.logCallTrack({}, primaryCallName, 'renderFurther');
    } else {
      logCallTrack(
        {},
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'renderFurther',
          'showCallProcess',
          toString(this.showCallProcess),
        ),
        {
          color: renderFurtherColorWhenNoCallProcess,
          prefix: renderFurtherPrefixWhenNoCallProcess,
        },
      );
    }

    const { width } = this.props;
    const { listViewMode, overlayButtonOpenText, overlayButtonCloseText } =
      this.state;

    const that = this;

    const layoutConfig = this.establishPageContentLayoutConfig() ?? {};
    const siderConfig = this.establishPageContentLayoutSiderConfig() ?? {};
    const contentConfig = this.establishPageContentLayoutContentConfig();

    layoutConfig.style = {
      ...layoutConfig.style,
      height: '100%',
    };

    siderConfig.style = {
      ...siderConfig.style,
      marginTop: '24px',
      borderRadius: 0,
    };

    siderConfig.theme = 'light';

    contentConfig.style = {
      ...contentConfig.style,
      height: '100%',
    };

    const siderTop = this.renderPresetSiderTopArea();
    const siderBottom = this.renderPresetSiderBottomArea();

    const siderBody =
      checkObjectIsNullOrEmpty(siderTop) &&
      checkObjectIsNullOrEmpty(siderBottom) ? null : (
        <SiderBox
          top={siderTop}
          bottom={
            checkObjectIsNullOrEmpty(siderTop)
              ? siderBottom
              : checkObjectIsNullOrEmpty(siderBottom)
                ? this.buildCardCollectionArea({
                    mode: cardConfig.wrapperType.page,
                    list: [{}],
                  })
                : siderBottom
          }
        />
      );

    return (
      <DrawerExtra
        flag={this.getVisibleFlag()}
        icon={this.renderPresetTitleIcon()}
        titlePrefix={this.buildTitlePrevText()}
        title={this.buildTitleText()}
        subtitle={this.buildTitleSubText()}
        destroyOnHidden={false}
        className={styles.containorBox}
        width={width}
        placement="right"
        overlayContent={this.renderOverlayContent()}
        overlayButtonOpenText={overlayButtonOpenText}
        overlayButtonCloseText={overlayButtonCloseText}
        onClose={this.onClose}
        styles={{
          body: {
            padding: 0,
            overflowY: 'hidden',
            overflowX: 'auto',
          },
        }}
        afterOpenChange={(v) => {
          that.doOtherWhenChangeVisible(v);
        }}
      >
        {listViewMode === listViewConfig.viewMode.table ? (
          <div
            style={{
              height: '100%',
            }}
          >
            <ContentBox
              layoutConfig={layoutConfig}
              siderConfig={siderConfig}
              siderBody={siderBody}
              contentConfig={contentConfig}
              contentBody={this.renderPresetDrawerInner()}
            />
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.list ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            <ContentBox
              layoutConfig={layoutConfig}
              siderConfig={siderConfig}
              siderBody={siderBody}
              contentConfig={contentConfig}
              contentBody={this.renderPresetDrawerInner()}
            />
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.cardCollectionView ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            <ContentBox
              layoutConfig={layoutConfig}
              siderConfig={siderConfig}
              siderBody={siderBody}
              contentConfig={contentConfig}
              contentBody={this.renderPresetDrawerInner()}
            />
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.customView ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            <ContentBox
              layoutConfig={layoutConfig}
              siderConfig={siderConfig}
              siderBody={siderBody}
              contentConfig={contentConfig}
              contentBody={this.renderPresetDrawerInner()}
            />
          </div>
        ) : null}
      </DrawerExtra>
    );
  }
}

MultiPageDrawer.defaultProps = {
  title: '',
  hideDrawerAfterSelect: true,
  confirmSelect: true,
  width: 820,
};

export { MultiPageDrawer };
