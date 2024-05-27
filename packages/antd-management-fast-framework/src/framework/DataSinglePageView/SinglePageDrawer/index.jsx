import { Card, Col, Divider, List, Row, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logCallTrack,
  mergeArrowText,
  toString,
} from 'easy-soft-utility';

import {
  contentConfig,
  emptyLogic,
  listViewConfig,
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';

import {
  DrawerExtra,
  LoadingOverlay,
  ReloadAnimalPrompt,
} from '../../../components';
import { switchControlAssist } from '../../../utils';
import { ColumnSetting } from '../../DataListView/ColumnSetting';
import { DensityAction } from '../../DataListView/DensityAction';
import { RefreshButton } from '../../DataListView/RefreshButton';
import { SinglePage } from '../SinglePage';

import styles from '../../DataListView/Drawer/index.less';

const primaryCallName = 'DataSinglePageView::SinglePageDrawer';

/**
 * DataSinglePageView.SinglePageDrawer
 * @namespace
 */
class SinglePageDrawer extends SinglePage {
  visibleFlag = '';

  affixPaginationBar = false;

  contentWrapperType = contentConfig.wrapperType.drawer;

  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  reloadWhenShow = true;

  reloadAnimalPrompt = true;

  useTableDensityAction = false;

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

    this.visibleFlag = visibleFlag;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData };
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

      // 设置界面效果为加载中，减少用户误解
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

      const that = this;

      that.reloadDataWithReloadAnimalPrompt({
        delay: 500,
      });
    }
  };

  /**
   * 当可见性变为显示时附加的执行
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
   * 当可见性变为隐藏时执行
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
   * 当可见性变为隐藏后附加的执行
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

  renderPresetTitleIcon = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetTitleIcon', emptyLogic);

    return null;
  };

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
          className={classNames(
            styles.containorBox,
            this.useFrontendPagination
              ? styles.frontendPagination
              : styles.noneFrontendPagination,
          )}
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
                bordered={false}
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
                    {this.reloadWhenShow && this.reloadAnimalPrompt ? (
                      <ReloadAnimalPrompt
                        hide={!firstLoadSuccess}
                        flag={this.viewAnimalPromptFlag}
                      />
                    ) : null}
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
                },
              }}
              bordered={false}
              className={styles.containorTable}
              extra={
                <Space
                  direction="horizontal"
                  split={<Divider type="vertical" />}
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

                <div
                  style={{
                    flex: 'auto',
                    overflow: 'hidden',
                  }}
                >
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

  renderPresetContentContainor = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetContentContainor');

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
    this.logCallTrack({}, primaryCallName, 'renderPresetDrawerInner');

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
    this.logCallTrack({}, primaryCallName, 'renderPresetListView');

    const list = this.getCanUseFrontendPagination()
      ? this.adjustFrontendPaginationViewDataSource()
      : this.adjustViewDataSource();

    const bottomBar = this.renderPresetPaginationView();

    return (
      <div
        style={{
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 'auto',
            overflow: 'hidden',
          }}
        >
          <LoadingOverlay
            flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
            fill
          >
            <List
              style={{ height: '100%', overflow: 'auto' }}
              itemLayout={this.establishListViewItemLayout()}
              dataSource={list}
              renderItem={(item, index) => {
                return this.renderPresetListViewItem(item, index);
              }}
            />
          </LoadingOverlay>
        </div>

        {(bottomBar || null) == null ? null : (
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

              {bottomBar}
            </div>
          </div>
        )}
      </div>
    );
  };

  renderOverlayContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderOverlayContent', emptyLogic);

    return null;
  };

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

    return (
      <DrawerExtra
        flag={this.getVisibleFlag()}
        icon={this.renderPresetTitleIcon()}
        titlePrefix={this.buildTitlePrevText()}
        title={this.buildTitleText()}
        subtitle={this.buildTitleSubText()}
        destroyOnClose={false}
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
            {this.renderPresetDrawerInner()}
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.list ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            {this.renderPresetDrawerInner()}
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.cardCollectionView ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            {this.renderPresetDrawerInner()}
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.customView ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            {this.renderPresetDrawerInner()}
          </div>
        ) : null}
      </DrawerExtra>
    );
  }
}

SinglePageDrawer.defaultProps = {
  title: '',
  hideDrawerAfterSelect: true,
  confirmSelect: true,
  width: 820,
};

export { SinglePageDrawer };
