import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {
  Drawer,
  Card,
  Divider,
  List,
  Pagination,
  Tag,
  Tooltip,
  Button,
  Row,
  Col,
  Spin,
} from 'antd';
import { ReloadOutlined, ReadOutlined } from '@ant-design/icons';

import { isFunction, notify } from '../../../utils/tools';
import {
  listViewModeCollection,
  notificationTypeCollection,
  contentConfig,
} from '../../../utils/constants';
import { buildListViewItemActionSelect } from '../../../customComponents/FunctionComponent';

import DensityAction from '../../DataListView/DensityAction';
import ColumnSetting from '../../DataListView/ColumnSetting';

import MultiPage from '../MultiPage';

import styles from './index.less';

class MultiPageDrawer extends MultiPage {
  loadDataAfterMount = false;

  reloadWhenShow = true;

  constructor(props) {
    super(props);

    this.useParamsKey = false;

    const s = this.state;
    s.dataLoading = false;

    this.state = {
      ...s,
      ...{
        visible: false,
        reloadAnimalShow: false,
        listViewMode: listViewModeCollection.table,
        showListViewItemActionSelect: true,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible, externalData } = nextProps;

    return { visible: visible || false, externalData: externalData || null };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { visible: visiblePre } = preState;
    const { visible } = this.state;

    if (visiblePre === false && visible === true) {
      this.doOtherWhenChangeVisible(preProps, preState, snapshot);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    const { firstLoadSuccess } = this.state;

    // 未加载数据过数据的时候，进行加载
    if (!firstLoadSuccess) {
      // 设置界面效果为加载中，减少用户误解
      this.setState({ dataLoading: true });
      const that = this;

      setTimeout(() => {
        that.handleFormReset(false);
      }, 700);
    } else if (this.reloadWhenShow) {
      this.setState({ reloadAnimalShow: true });
      const that = this;

      setTimeout(() => {
        that.reloadData({}, () => {
          that.setState({ reloadAnimalShow: false });
        });
      }, 700);
    }

    this.executeAfterDoOtherWhenChangeVisible();
  };

  executeAfterDoOtherWhenChangeVisible = () => {};

  onClose = () => {
    const { afterClose } = this.props;

    if (typeof afterClose === 'function') {
      afterClose();
    }
  };

  renderTitleIcon = () => <ReadOutlined className={styles.titleIcon} />;

  hideDrawer = () => {
    this.onClose();
  };

  selectRecord = (e, record) => {
    const { afterSelectSuccess, hideDrawerAfterSelect } = this.props;

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(record);
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

  onPaginationChange = (page, pageSize) => {
    this.handleStandardTableChange(
      {
        current: page,
        pageSize,
      },
      {},
      {},
    );
  };

  onPaginationShowSizeChange = (current, size) => {
    this.setState({ pageNo: 1 });

    this.handleStandardTableChange(
      {
        current: 1,
        pageSize: size,
      },
      {},
      {},
    );
  };

  buildWrapperTypeConfig = () => {
    return { mode: contentConfig.wrapperType.drawer };
  };

  renderViewContainor = () => {
    const {
      reloadAnimalShow,
      listTitle,
      tableSize,
      dataLoading,
      reloading,
      processing,
      refreshing,
      listViewMode,
      renderSearchForm,
    } = this.state;

    const extraAction = this.renderExtraAction();
    const searchForm = this.renderForm();

    return (
      <div
        className={styles.tableList}
        style={
          listViewMode === listViewModeCollection.list
            ? { height: '100%', overflow: 'hidden' }
            : {}
        }
      >
        <div
          className={styles.containorBox}
          style={
            listViewMode === listViewModeCollection.list
              ? {
                  height: '100%',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }
              : {}
          }
        >
          {renderSearchForm && (searchForm || null) != null ? (
            <div
              style={
                listViewMode === listViewModeCollection.list ? { flex: 0 } : {}
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
              listViewMode === listViewModeCollection.list
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
                listViewMode === listViewModeCollection.list
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

                  {listViewMode === listViewModeCollection.table ? (
                    <DensityAction
                      tableSize={tableSize}
                      setTableSize={key => {
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

                  {listViewMode === listViewModeCollection.table ? (
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
                    listViewMode === listViewModeCollection.list
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
                      listViewMode === listViewModeCollection.list
                        ? { flex: 0 }
                        : {}
                    }
                  >
                    {this.renderAboveTable()}
                  </div>

                  <div
                    style={
                      listViewMode === listViewModeCollection.list
                        ? { flex: 'auto', overflow: 'hidden', paddingTop: 5 }
                        : {}
                    }
                  >
                    {this.renderView()}
                  </div>
                </div>
              </Spin>
            </Card>
          </div>
        </div>

        {this.renderOther()}
      </div>
    );
  };

  renderContentContainor = () => {
    const { listViewMode, renderSearchForm } = this.state;

    return (
      <div
        className={styles.contentContainor}
        style={{
          ...(listViewMode === listViewModeCollection.list
            ? { paddingBottom: 0, height: '100%', overflow: 'hidden' }
            : { paddingBottom: 0 }),
          ...(renderSearchForm ? {} : { paddingTop: 0 }),
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
          listViewMode === listViewModeCollection.list
            ? { height: '100%', overflow: 'hidden' }
            : {}
        }
      >
        {this.renderContentContainor()}
      </div>
    );
  };

  renderListView = () => {
    const { metaOriginalData, listViewMode, pageNo, pageSize } = this.state;

    const { list, pagination } = metaOriginalData || {
      list: [],
      pagination: {},
    };

    return (
      <div
        style={
          listViewMode === listViewModeCollection.list
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
            listViewMode === listViewModeCollection.list
              ? { flex: 'auto', overflow: 'hidden' }
              : {}
          }
        >
          <List
            style={
              listViewMode === listViewModeCollection.list
                ? { height: '100%', overflow: 'auto' }
                : {}
            }
            className={styles.list}
            itemLayout={this.renderListViewItemLayout()}
            dataSource={list}
            // pagination={pagination}
            renderItem={(item, index) => {
              return this.renderListViewItem(item, index);
            }}
          />
        </div>

        <div
          style={
            listViewMode === listViewModeCollection.list
              ? { flex: 0, paddingTop: 10, paddingBottom: 10 }
              : {}
          }
        >
          <div
            style={
              listViewMode === listViewModeCollection.list
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
                listViewMode === listViewModeCollection.list
                  ? { flex: 'auto' }
                  : {}
              }
            />

            <Pagination
              current={pageNo}
              pageSize={pageSize}
              size="small"
              showSizeChanger
              showQuickJumper
              showTotal={total => `共 ${total} 条信息`}
              {...pagination}
              onChange={(page, size) => {
                this.onPaginationChange(page, size);
              }}
              onShowSizeChange={(current, size) => {
                this.onPaginationShowSizeChange(current, size);
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  renderListViewItemActionSelect = (item, index) => {
    const that = this;

    return buildListViewItemActionSelect({
      index,
      selectData: item,
      selectCallback: (e, data) => that.selectRecord(e, data),
    });
  };

  render() {
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
        {listViewMode === listViewModeCollection.list ? (
          <div
            style={{
              height: 'calc(100vh - 55px)',
            }}
          >
            {this.renderDrawerInner()}
          </div>
        ) : (
          this.renderDrawerInner()
        )}
      </Drawer>
    );
  }
}

MultiPageDrawer.defaultProps = {
  hideDrawerAfterSelect: true,
  confirmSelect: true,
};

export default MultiPageDrawer;
