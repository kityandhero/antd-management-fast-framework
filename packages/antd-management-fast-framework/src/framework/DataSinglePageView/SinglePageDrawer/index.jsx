import { Button, Card, Col, Divider, List, Row, Tooltip } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  mergeArrowText,
} from 'easy-soft-utility';

import {
  contentConfig,
  emptyLogic,
  listViewConfig,
} from 'antd-management-fast-common';
import {
  buildListViewItemActionSelect,
  iconBuilder,
} from 'antd-management-fast-component';

import {
  DrawerExtra,
  LoadingOverlay,
  ReloadAnimalPrompt,
} from '../../../components';
import {
  reloadAnimalPromptControlAssist,
  switchControlAssist,
} from '../../../utils';
import { ColumnSetting } from '../../DataListView/ColumnSetting';
import { DensityAction } from '../../DataListView/DensityAction';
import { SinglePage } from '../SinglePage';

import styles from './index.less';

class SinglePageDrawer extends SinglePage {
  visibleFlag = '';

  contentWrapperType = contentConfig.wrapperType.drawer;

  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  reloadWhenShow = true;

  reloadAnimalPrompt = true;

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
    };

    this.visibleFlag = visibleFlag;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData };
  }

  getVisibleFlag() {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'getVisibleFlag',
    );

    const { flag } = this.props;

    return flag || this.visibleFlag;
  }

  /**
   * 当可见性变为显示时执行
   */
  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'doOtherWhenChangeVisibleToShow',
    );

    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePageDrawer',
        'doOtherWhenChangeVisibleToShow',
        'trigger',
        'handleSearchReset',
      );

      // 设置界面效果为加载中，减少用户误解
      this.handleSearchReset({});
    } else if (this.reloadWhenShow) {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePageDrawer',
        'doOtherWhenChangeVisibleToShow',
        'trigger',
        'reloadData',
      );

      const that = this;

      that.reloadData({
        delay: 400,
        beforeRequest: () => {
          reloadAnimalPromptControlAssist.show();
        },
        completeCallback: () => {
          reloadAnimalPromptControlAssist.hide(1000);
        },
      });
    }
  };

  /**
   * 当可见性变为显示时附加的执行
   */
  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
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
      'DataSinglePageView::SinglePageDrawer',
      'doOtherWhenChangeVisibleToHide',
      emptyLogic,
    );
  };

  /**
   * 当可见性变为显示后附加的执行
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
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
      'DataSinglePageView::SinglePageDrawer',
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
      'DataSinglePageView::SinglePageDrawer',
      'doOtherWhenChangeVisible',
    );

    if (currentVisible) {
      this.doOtherWhenChangeVisibleToShow();
      this.executeAfterDoOtherWhenChangeVisibleToShow();
    } else {
      this.doOtherWhenChangeVisibleToHide();
      this.executeAfterDoOtherWhenChangeVisibleToHide();
    }

    this.executeOtherAfterDoOtherWhenChangeVisible(currentVisible);
  };

  onClose = () => {
    this.logCallTrack({}, 'DataSinglePageView::SinglePageDrawer', 'onClose');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePageDrawer',
        'onClose',
        'trigger',
        'afterClose',
      );

      afterClose();
    } else {
      this.logCallTrace(
        {},
        'DataSinglePageView::SinglePageDrawer',
        'onClose',
        'trigger',
        'afterClose',
        emptyLogic,
      );
    }
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
      'DataSinglePageView::SinglePageDrawer',
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
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'renderPresetTitleIcon',
    );

    return iconBuilder.read();
  };

  buildTitlePrevText = () => {
    this.logCallTrack({}, 'DataDrawer::Base', 'buildTitlePrevText', emptyLogic);

    return '';
  };

  buildTitleText = () => {
    this.logCallTrack({}, 'DataDrawer::Base', 'buildTitleText', emptyLogic);

    const { pageTitle } = this.state;

    return pageTitle || this.getPresetPageName();
  };

  buildTitleSubText = () => {
    this.logCallTrack({}, 'DataDrawer::Base', 'buildTitleSubText', emptyLogic);

    return '';
  };

  hideDrawer = () => {
    this.logCallTrack({}, 'DataSinglePageView::SinglePageDrawer', 'hideDrawer');

    this.onClose();
  };

  renderPresetListMainViewContainor = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'renderPresetListMainViewContainor',
    );

    const { firstLoadSuccess, listTitle, tableSize, refreshing, listViewMode } =
      this.state;

    const extraAction = this.renderPresetExtraActionView();
    const searchForm = this.renderPresetForm();

    return (
      <div
        className={styles.tableList}
        style={
          listViewMode === listViewConfig.viewMode.list
            ? { height: '100%', overflow: 'hidden' }
            : {}
        }
      >
        <div
          className={styles.containorBox}
          style={
            listViewMode === listViewConfig.viewMode.list
              ? {
                  height: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }
              : {}
          }
        >
          {this.showSearchForm && (searchForm || null) != null ? (
            <div
              style={
                listViewMode === listViewConfig.viewMode.list ? { flex: 0 } : {}
              }
            >
              <Card
                bordered={false}
                className={styles.containorSearch}
                bodyStyle={{
                  padding: 0,
                }}
              >
                <div className={styles.tableListForm}>
                  {this.renderPresetForm()}
                </div>
              </Card>

              <div style={{ height: '1px', backgroundColor: '#f0f2f5' }} />
            </div>
          ) : null}

          <div
            style={
              listViewMode === listViewConfig.viewMode.list
                ? { flex: 'auto', overflow: 'hidden' }
                : {}
            }
          >
            <Card
              title={
                <Row>
                  <Col flex="70px"> {listTitle}</Col>
                  <Col flex="auto">
                    {this.reloadWhenShow && this.reloadAnimalPrompt ? (
                      <ReloadAnimalPrompt
                        visible={firstLoadSuccess}
                        flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
                      />
                    ) : null}
                  </Col>
                </Row>
              }
              style={
                listViewMode === listViewConfig.viewMode.list
                  ? {
                      height: '100%',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }
                  : {}
              }
              headStyle={{
                borderBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                flex: 0,
              }}
              bodyStyle={{
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                flex: 'auto',
                overflow: 'hidden',
                // height: 'calc(100vh - 103px)',
              }}
              bordered={false}
              className={styles.containorTable}
              extra={
                <>
                  {extraAction}

                  {extraAction == null ? null : <Divider type="vertical" />}

                  {this.renderPresetBatchAction()}

                  {listViewMode === listViewConfig.viewMode.table ? (
                    <DensityAction
                      tableSize={tableSize}
                      setTableSize={(key) => {
                        this.setTableSize(key);
                      }}
                    />
                  ) : null}

                  <Tooltip title="刷新本页">
                    <Button
                      shape="circle"
                      className={styles.iconAction}
                      loading={refreshing}
                      icon={iconBuilder.reload()}
                      onClick={() => {
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
                </>
              }
            >
              <div
                style={
                  listViewMode === listViewConfig.viewMode.list
                    ? {
                        height: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                      }
                    : {}
                }
              >
                <div
                  style={
                    listViewMode === listViewConfig.viewMode.list
                      ? { flex: 0 }
                      : {}
                  }
                >
                  {this.renderPresetAboveTable()}
                </div>

                <div
                  style={
                    listViewMode === listViewConfig.viewMode.list
                      ? { flex: 'auto', overflow: 'hidden', paddingTop: 5 }
                      : {}
                  }
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
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'renderPresetContentContainor',
    );

    const { listViewMode } = this.state;

    return (
      <div
        className={styles.contentContainor}
        style={{
          ...(listViewMode === listViewConfig.viewMode.list
            ? {
                paddingBottom: 0,
                height: '100%',
                overflow: 'hidden',
              }
            : { paddingBottom: 0 }),
          ...(this.showSearchForm ? {} : { paddingTop: 0 }),

          backgroundColor: '#fff',
        }}
      >
        {this.renderPresetListMainViewContainor()}
      </div>
    );
  };

  renderPresetDrawerInner = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'renderPresetDrawerInner',
    );

    const { listViewMode } = this.state;

    return (
      <div
        className={styles.mainContainor}
        style={
          listViewMode === listViewConfig.viewMode.list
            ? { height: '100%', overflow: 'hidden' }
            : {}
        }
      >
        {this.renderPresetContentContainor()}
      </div>
    );
  };

  renderPresetListView = () => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'renderPresetListView',
    );

    const { listViewMode } = this.state;

    const list = this.getCanUseFrontendPagination()
      ? this.adjustFrontendPaginationViewDataSource()
      : this.adjustViewDataSource();

    const bottomBar = this.renderPresetPaginationView();

    return (
      <div
        style={
          listViewMode === listViewConfig.viewMode.list
            ? {
                height: '100%',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }
            : {}
        }
      >
        <div
          style={
            listViewMode === listViewConfig.viewMode.list
              ? {
                  flex: 'auto',
                  overflow: 'hidden',
                }
              : {}
          }
        >
          <LoadingOverlay
            flag={[this.viewLoadingFlag, this.viewRefreshingFlag]}
            fill
          >
            <List
              style={
                listViewMode === listViewConfig.viewMode.list
                  ? { height: '100%', overflow: 'auto' }
                  : {}
              }
              itemLayout={this.renderPresetListViewItemLayout()}
              dataSource={list}
              renderItem={(item, index) => {
                return this.renderPresetListViewItem(item, index);
              }}
            />
          </LoadingOverlay>
        </div>

        {(bottomBar || null) == null ? null : (
          <div
            style={
              listViewMode === listViewConfig.viewMode.list ? { flex: 0 } : {}
            }
          >
            <div
              style={
                listViewMode === listViewConfig.viewMode.list
                  ? {
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      boxShadow: '0 -4px 8px 0px rgb(5 5 5 / 6%)',
                    }
                  : {}
              }
            >
              <div
                style={
                  listViewMode === listViewConfig.viewMode.list
                    ? { flex: 'auto' }
                    : {}
                }
              />

              {bottomBar}
            </div>
          </div>
        )}
      </div>
    );
  };

  renderPresetListViewItemActionSelect = (item, index) => {
    this.logCallTrack(
      {},
      'DataSinglePageView::SinglePageDrawer',
      'renderPresetListViewItemActionSelect',
    );

    const that = this;

    return buildListViewItemActionSelect({
      index,
      selectData: item,
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };

  renderFurther() {
    const { width } = this.props;
    const { listViewMode } = this.state;

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
        onClose={this.onClose}
        bodyStyle={{
          padding: 0,
          overflowY: 'hidden',
          overflowX: 'auto',
        }}
        afterOpenChange={(v) => {
          that.doOtherWhenChangeVisible(v);
        }}
      >
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

        {listViewMode === listViewConfig.viewMode.table
          ? this.renderPresetDrawerInner()
          : null}
      </DrawerExtra>
    );
  }
}

SinglePageDrawer.defaultProps = {
  hideDrawerAfterSelect: true,
  confirmSelect: true,
  width: 820,
};

export { SinglePageDrawer };
