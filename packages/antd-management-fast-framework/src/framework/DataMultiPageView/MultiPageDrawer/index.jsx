import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Row,
  Spin,
  Tag,
  Tooltip,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  mergeArrowText,
  notificationTypeCollection,
} from 'easy-soft-utility';

import {
  contentConfig,
  emptyLogic,
  listViewConfig,
  notify,
} from 'antd-management-fast-common';
import {
  buildListViewItemActionSelect,
  iconBuilder,
} from 'antd-management-fast-component';

import { DrawerExtra } from '../../../components/DrawerExtra';
import { switchControlAssist } from '../../../utils/switchControlAssist';
import { ColumnSetting } from '../../DataListView/ColumnSetting';
import { DensityAction } from '../../DataListView/DensityAction';
import { MultiPage } from '../MultiPage';

import styles from './index.less';

class MultiPageDrawer extends MultiPage {
  visibleFlag = '';

  contentWrapperType = contentConfig.wrapperType.drawer;

  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  reloadWhenShow = true;

  reloadAnimalPrompt = true;

  reloadAnimalPromptComplete = false;

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

    this.restoreSearch = false;
    this.visibleFlag = visibleFlag;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { externalData } = nextProperties;

    return { externalData: externalData || null };
  }

  getVisibleFlag() {
    this.logCallTrack(
      {},
      'DataMultiPageView::MultiPageDrawer',
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
      'DataMultiPageView::MultiPageDrawer',
      'doOtherWhenChangeVisibleToShow',
    );

    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      this.logCallTrace(
        {},
        'DataMultiPageView::MultiPageDrawer',
        'doOtherWhenChangeVisibleToShow',
        'handleSearchReset',
      );

      this.handleSearchReset({});
    } else if (this.reloadWhenShow) {
      this.logCallTrace(
        {},
        'DataMultiPageView::MultiPageDrawer',
        'doOtherWhenChangeVisibleToShow',
        'reloadData',
      );

      this.reloadData({
        completeCallback: () => {
          this.reloadAnimalPromptComplete = true;

          this.logCallTrace(
            {},
            'DataMultiPageView::MultiPageDrawer',
            'doOtherWhenChangeVisibleToShow',
            'reloadData',
            'reloadAnimalPromptComplete',
            true,
          );
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
      'DataMultiPageView::MultiPageDrawer',
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
      'DataMultiPageView::MultiPageDrawer',
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
      'DataMultiPageView::MultiPageDrawer',
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
      'DataMultiPageView::MultiPageDrawer',
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
      'DataMultiPageView::MultiPageDrawer',
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
    this.logCallTrack({}, 'DataMultiPageView::MultiPageDrawer', 'onClose');

    switchControlAssist.close(this.getVisibleFlag());

    const { afterClose } = this.props;

    if (isFunction(afterClose)) {
      this.logCallTrace(
        {},
        'DataMultiPageView::MultiPageDrawer',
        'onClose',
        'afterClose',
      );

      afterClose();
    } else {
      this.logCallTrace(
        {},
        'DataMultiPageView::MultiPageDrawer',
        'onClose',
        'afterClose',
        'afterClose not set, ignore',
      );
    }
  };

  renderPresetTitleIcon = () => {
    this.logCallTrack(
      {},
      'DataMultiPageView::MultiPageDrawer',
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
    this.logCallTrack({}, 'DataMultiPageView::MultiPageDrawer', 'hideDrawer');

    this.onClose();
  };

  selectRecord = ({ handleData }) => {
    this.logCallTrack(
      {
        parameter: { handleData },
      },
      'DataMultiPageView::MultiPageDrawer',
      'selectRecord',
    );

    const { afterSelectSuccess, hideDrawerAfterSelect } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(handleData);
    }

    if (hideDrawerAfterSelect) {
      this.hideDrawer();
    } else {
      notify({
        type: notificationTypeCollection.success,
        placement: 'bottom-left',
        message: '操作结果',
        description: '选择成功',
      });
    }
  };

  renderPresetListMainViewContainor = () => {
    this.logCallTrack(
      {},
      'DataMultiPageView::MultiPageDrawer',
      'renderPresetListMainViewContainor',
    );

    const {
      listTitle,
      tableSize,
      dataLoading,
      reloading,
      processing,
      refreshing,
      listViewMode,
    } = this.state;

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
                    <QueueAnim>
                      {this.reloadWhenShow &&
                      this.reloadAnimalPrompt &&
                      !this.reloadAnimalPromptComplete ? (
                        <div key="3069dd18-f530-43ab-b96d-a86f8079358f">
                          <Tag color="gold">即将刷新</Tag>
                        </div>
                      ) : null}
                    </QueueAnim>
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
              <Spin
                spinning={dataLoading || reloading || processing}
                wrapperClassName={styles.spinListView}
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
              </Spin>
            </Card>
          </div>
        </div>

        {this.renderPresetOther()}
      </div>
    );
  };

  renderPresetContentContainor = () => {
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

  establishPaginationViewStyle = () => {
    return {
      paddingTop: 10,
      paddingBottom: 10,
    };
  };

  renderPresetListView = () => {
    const { listViewMode } = this.state;

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
              ? { flex: 'auto', overflow: 'hidden' }
              : {}
          }
        >
          <List
            style={
              listViewMode === listViewConfig.viewMode.list
                ? { height: '100%', overflow: 'auto' }
                : {}
            }
            className={styles.list}
            itemLayout={this.renderPresetListViewItemLayout()}
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
        </div>

        <div
          style={
            listViewMode === listViewConfig.viewMode.list
              ? { flex: 0, paddingTop: 0, paddingBottom: 0 }
              : {}
          }
        >
          <div
            style={
              listViewMode === listViewConfig.viewMode.list
                ? {
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
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

            {this.renderPresetPaginationView()}
          </div>
        </div>
      </div>
    );
  };

  renderPresetListViewItemActionSelect = (item, index) => {
    const that = this;

    return buildListViewItemActionSelect({
      index,
      selectData: item,
      selectCallback: (data) => that.selectRecord({ handleData: data || null }),
    });
  };

  renderFurther() {
    const { width: widthDrawer } = this.props;
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
        width={widthDrawer}
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

MultiPageDrawer.defaultProps = {
  hideDrawerAfterSelect: true,
  confirmSelect: true,
  width: 820,
};

export { MultiPageDrawer };
