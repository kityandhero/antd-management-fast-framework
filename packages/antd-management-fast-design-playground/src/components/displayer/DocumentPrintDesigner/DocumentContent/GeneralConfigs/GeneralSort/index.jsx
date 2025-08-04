import { Button, Dropdown, Modal, Table } from 'antd';
import React, { PureComponent } from 'react';

import {
  isArray,
  isEmptyArray,
  isFunction,
  sortCollectionByKey,
  sortOperate,
  toMd5,
} from 'easy-soft-utility';

import {
  AnchorLink,
  buildColumnList,
  FlexBox,
  iconBuilder,
  VerticalBox,
} from 'antd-management-fast-component';

import { GeneralConfigContainer } from '../GeneralConfigContainer';

class GeneralSort extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      sortModalVisible: false,
      configureListTag: '',
      listData: [],
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { configureList } = nextProperties;
    const { configureListTag, listData } = previousState;

    let needUpdate = false;

    const configureListTagCompare = toMd5(JSON.stringify(configureList || []));

    if (configureListTagCompare != configureListTag) {
      needUpdate = true;
    }

    if (isArray(configureList) && isEmptyArray(listData)) {
      needUpdate = true;
    }

    if (needUpdate) {
      const list = configureList.map((o, index) => {
        const { title, key } = { title: '', key: '', ...o };

        return {
          title,
          key,
          sort: index + 1,
        };
      });

      return {
        listData: [...list],
        configureListTag: configureListTagCompare,
      };
    }

    return {};
  }

  openModal = () => {
    this.setState({ sortModalVisible: true });
  };

  closeModal = () => {
    this.setState({ sortModalVisible: false });
  };

  onSort = (key, o) => {
    const { listData } = this.state;

    const list = sortCollectionByKey({
      operate: key,
      item: o,
      list: listData,
      key: 'sort',
      sortInitialValue: 1,
    });

    this.setState({ listData: [...list] });
  };

  onOk = () => {
    const { onChange } = this.props;
    const { listData } = this.state;

    if (!isFunction(onChange)) {
      return;
    }

    onChange(listData || []);

    this.setState({ sortModalVisible: false });
  };

  render() {
    const { sortModalVisible, listData } = this.state;

    const that = this;

    const columns = buildColumnList({
      columnList: [
        {
          dataTarget: {
            label: '标题',
            name: 'title',
            helper: '',
          },
          align: 'left',
          showRichFacade: true,
          emptyValue: '--',
        },
        {
          dataTarget: {
            label: '标识',
            name: 'key',
            helper: '',
          },
          width: 120,
          showRichFacade: true,
          emptyValue: '--',
        },
        {
          dataTarget: {
            label: '操作',
            name: 'operate',
            helper: '',
          },
          width: 123,
          render: (value, record) => {
            // const { configureList, onMenuClick } = properties;

            const items = [
              {
                key: sortOperate.moveUp,
                label: '上移',
                icon: iconBuilder.arrowUp(),
                disabled: record.sort === 1,
              },
              {
                key: sortOperate.moveDown,
                label: '下移',
                icon: iconBuilder.arrowDown(),
                disabled: record.sort === (listData || []).length,
              },
            ];

            return (
              <Dropdown
                menu={{
                  items: items,
                  onClick: (event) => {
                    const { key } = event;

                    that.onSort(key, record);
                  },
                }}
              >
                <AnchorLink>{iconBuilder.retweet()} 排序</AnchorLink>
              </Dropdown>
            );
          },
        },
      ],
    });

    return (
      <>
        <GeneralConfigContainer>
          <FlexBox
            flexAuto="left"
            left={<VerticalBox>数据项：</VerticalBox>}
            right={<Button onClick={this.openModal}>排序</Button>}
          />
        </GeneralConfigContainer>

        <Modal
          width={980}
          title="文档数据排序"
          open={sortModalVisible}
          onOk={this.onOk}
          onCancel={this.closeModal}
        >
          <Table
            columns={columns}
            dataSource={listData}
            pagination={{
              hideOnSinglePage: true,
            }}
          />
        </Modal>
      </>
    );
  }
}

export { GeneralSort };
