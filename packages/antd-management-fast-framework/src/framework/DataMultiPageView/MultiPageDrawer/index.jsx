import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  List,
  Row,
  Spin,
  Tag,
  Tooltip,
} from 'antd';
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import { ReadOutlined } from '@ant-design/icons';

import { isFunction, notificationTypeCollection } from 'easy-soft-utility';

import {
  contentConfig,
  listViewConfig,
  notify,
} from 'antd-management-fast-common';
import {
  buildListViewItemActionSelect,
  iconBuilder,
} from 'antd-management-fast-component';

import { ColumnSetting } from '../../DataListView/ColumnSetting';
import { DensityAction } from '../../DataListView/DensityAction';
import { MultiPage } from '../MultiPage';

import styles from './index.less';

class MultiPageDrawer extends MultiPage {
  loadRemoteRequestAfterMount = false;

  resetDataAfterLoad = false;

  reloadWhenShow = true;

  constructor(properties) {
    super(properties);

    this.restoreSearch = false;

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,

      visible: false,
      reloadAnimalShow: false,
      listViewMode: listViewConfig.viewMode.table,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { visible, externalData } = nextProperties;

    return { visible: visible || false, externalData: externalData || null };
  }

  doWorkWhenDidUpdate = (preProperties, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre !== visible) {
      this.doOtherWhenChangeVisible(preProperties, preState, snapshot, visible);
    }
  };

  /**
   * 当可见性发生变化时执行
   */
  doOtherWhenChangeVisible = (
    preProperties,
    preState,
    snapshot,
    currentVisible,
  ) => {
    if (currentVisible) {
      this.doOtherWhenChangeVisibleToShow(preProperties, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToShow(
        preProperties,
        preState,
        snapshot,
      );
    } else {
      this.doOtherWhenChangeVisibleToHide(preProperties, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToHide(
        preProperties,
        preState,
        snapshot,
      );
    }

    this.executeOtherAfterDoOtherWhenChangeVisible(
      preProperties,
      preState,
      snapshot,
    );
  };

  /**
   * 当可见性变为显示时执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true });

      this.handleSearchReset(false, 700);
    } else if (this.reloadWhenShow) {
      this.reloadData(
        { reloadAnimalShow: true },
        () => {
          this.setState({ reloadAnimalShow: false });
        },
        700,
      );
    }
  };

  /**
   * 当可见性变为显示时附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToShow = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变为隐藏时执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  // eslint-disable-next-line no-unused-vars
  doOtherWhenChangeVisibleToHide = (preProperties, preState, snapshot) => {};

  /**
   * 当可见性变为显示后附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToHide = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变更后的附加执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeOtherAfterDoOtherWhenChangeVisible = (
    // eslint-disable-next-line no-unused-vars
    preProperties,
    // eslint-disable-next-line no-unused-vars
    preState,
    // eslint-disable-next-line no-unused-vars
    snapshot,
  ) => {};

  onClose = () => {
    const { afterClose } = this.props;

    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  renderPresetTitleIcon = () => <ReadOutlined className={styles.titleIcon} />;

  hideDrawer = () => {
    this.onClose();
  };

  selectRecord = ({ handleData }) => {
    const { afterSelectSuccess, hideDrawerAfterSelect } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(handleData);
    }

    if (hideDrawerAfterSelect) {
      this.hideDrawer();
    } else {
      notify({
        type: notificationTypeCollection.success,
        placement: 'bottomLeft',
        message: '操作结果',
        description: '选择成功',
      });
    }
  };

  establishWrapperTypeConfig = () => {
    return { mode: contentConfig.wrapperType.drawer };
  };

  renderPresetListMainViewContainor = () => {
    const {
      reloadAnimalShow,
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
                      {reloadAnimalShow ? (
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
                        this.refreshData();
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
    const { visible, listViewMode } = this.state;

    return (
      <Drawer
        title={
          <span>
            {this.renderPresetTitleIcon()}
            {this.getPresetPageName()}
          </span>
        }
        destroyOnClose={false}
        className={styles.containorBox}
        width={widthDrawer}
        placement="right"
        open={visible || false}
        onClose={this.onClose}
        bodyStyle={{
          padding: 0,
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
      </Drawer>
    );
  }
}

MultiPageDrawer.defaultProps = {
  hideDrawerAfterSelect: true,
  confirmSelect: true,
  width: 820,
};

export { MultiPageDrawer };
