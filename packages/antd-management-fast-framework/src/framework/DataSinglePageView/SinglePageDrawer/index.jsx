import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {
  Drawer,
  Card,
  List,
  Divider,
  Tag,
  Tooltip,
  Button,
  Row,
  Col,
} from 'antd';
import { ReloadOutlined, ReadOutlined } from '@ant-design/icons';

import { isFunction } from '../../../utils/tools';
import { listViewConfig, contentConfig } from '../../../utils/constants';
import { buildListViewItemActionSelect } from '../../../customComponents/FunctionComponent';

import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';

import SinglePage from '../SinglePage';

import styles from './index.less';

class SinglePageDrawer extends SinglePage {
  loadDataAfterMount = false;

  resetDataAfterLoad = false;

  reloadWhenShow = true;

  constructor(props) {
    super(props);

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,
      ...{
        visible: false,
        reloadAnimalShow: false,
        listViewMode: listViewConfig.viewMode.table,
        showListViewItemActionSelect: true,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible, externalData };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre !== visible) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot, visible);
    }
  };

  /**
   * 当可见性发生变化时执行
   */
  doOtherWhenChangeVisible = (preProps, preState, snapshot, currentVisible) => {
    if (currentVisible) {
      this.doOtherWhenChangeVisibleToShow(preProps, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToShow(
        preProps,
        preState,
        snapshot,
      );
    } else {
      this.doOtherWhenChangeVisibleToHide(preProps, preState, snapshot);
      this.executeAfterDoOtherWhenChangeVisibleToHide(
        preProps,
        preState,
        snapshot,
      );
    }

    this.executeOtherAfterDoOtherWhenChangeVisible(
      preProps,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToShow = (preProps, preState, snapshot) => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变为隐藏时执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisibleToHide = (preProps, preState, snapshot) => {};

  /**
   * 当可见性变为显示后附加的执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeAfterDoOtherWhenChangeVisibleToHide = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot,
  ) => {};

  /**
   * 当可见性变更后的附加执行
   * @param {*} preProps
   * @param {*} preState
   * @param {*} snapshot
   */
  executeOtherAfterDoOtherWhenChangeVisible = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preState,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    snapshot,
  ) => {};

  onClose = () => {
    const { afterClose } = this.props;
    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  selectRecord = ({ handleData }) => {
    const { afterSelectSuccess, hideDrawerAfterSelect } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(handleData);
    }

    if (hideDrawerAfterSelect) {
      this.hideDrawer();
    }
  };

  renderTitleIcon = () => <ReadOutlined className={styles.titleIcon} />;

  hideDrawer = () => {
    this.onClose();
  };

  establishWrapperTypeConfig = () => {
    return { mode: contentConfig.wrapperType.drawer };
  };

  renderViewContainor = () => {
    const { reloadAnimalShow, listTitle, tableSize, refreshing, listViewMode } =
      this.state;

    const extraAction = this.renderExtraActionView();
    const searchForm = this.renderForm();

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
                <div className={styles.tableListForm}>{this.renderForm()}</div>
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

                  {this.renderBatchAction()}

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
                      icon={<ReloadOutlined />}
                      onClick={() => {
                        this.refreshData();
                      }}
                    />
                  </Tooltip>

                  {listViewMode === listViewConfig.viewMode.table ? (
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
                  {this.renderAboveTable()}
                </div>

                <div
                  style={
                    listViewMode === listViewConfig.viewMode.list
                      ? { flex: 'auto', overflow: 'hidden', paddingTop: 5 }
                      : {}
                  }
                >
                  {this.renderView()}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {this.renderOther()}
      </div>
    );
  };

  renderContentContainor = () => {
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
          ...{
            backgroundColor: '#fff',
          },
        }}
      >
        {this.renderViewContainor()}
      </div>
    );
  };

  renderDrawerInner = () => {
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
        {this.renderContentContainor()}
      </div>
    );
  };

  renderListView = () => {
    const { dataLoading, listViewMode } = this.state;

    const list = this.getCanUseFrontendPagination()
      ? this.adjustFrontendPaginationViewDataSource()
      : this.adjustViewDataSource();

    const bottomBar = this.renderPaginationView();

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
            loading={dataLoading}
            itemLayout={this.renderListViewItemLayout()}
            dataSource={list}
            renderItem={(item, index) => {
              return this.renderListViewItem(item, index);
            }}
          />
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

  renderListViewItemActionSelect = (item, index) => {
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
            {this.renderTitleIcon()}
            {this.getPageName()}
          </span>
        }
        destroyOnClose={false}
        className={styles.containorBox}
        width={widthDrawer}
        placement="right"
        visible={visible || false}
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
            {this.renderDrawerInner()}
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.cardCollectionView ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            {this.renderDrawerInner()}
          </div>
        ) : null}

        {listViewMode === listViewConfig.viewMode.table
          ? this.renderDrawerInner()
          : null}
      </Drawer>
    );
  }
}

SinglePageDrawer.defaultProps = {
  hideDrawerAfterSelect: true,
  confirmSelect: true,
  width: 820,
};

export default SinglePageDrawer;
