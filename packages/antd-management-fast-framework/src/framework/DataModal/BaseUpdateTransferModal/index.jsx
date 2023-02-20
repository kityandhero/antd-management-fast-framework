import { Transfer } from 'antd';
import React from 'react';

import { cardConfig } from 'antd-management-fast-common';

import { BaseUpdateModal } from '../BaseUpdateModal';

class BaseUpdateTransferModal extends BaseUpdateModal {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      width: 712,
      targetKeys: [],
      selectedKeys: [],
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  // eslint-disable-next-line no-unused-vars
  buildTargetKeys = (preProperties, preState, snapshot) => {
    throw new Error('buildTargetKeys need overload');
  };

  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
    this.setState(
      {
        targetKeys: this.buildTargetKeys(preProperties, preState, snapshot),
      },
      () => {
        this.reloadData();
      },
    );
  };

  handleChange = (nextTargetKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });
  };

  buildDataSource = () => {
    throw new Error('buildDataSource need overload');
  };

  buildTransferTitle = () => {
    return ['未拥有', '已拥有'];
  };

  // eslint-disable-next-line no-unused-vars
  buildItem = (o) => {
    throw new Error('buildItem need overload');
  };

  establishCardCollectionConfig = () => {
    const { targetKeys, selectedKeys } = this.state;

    return {
      list: [
        {
          spinning: this.checkInProgress(),
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div>
                  <Transfer
                    listStyle={{
                      width: 312,
                    }}
                    dataSource={this.buildDataSource()}
                    titles={this.buildTransferTitle()}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={(item) => {
                      return this.buildItem(item);
                    }}
                  />
                </div>
              ),
            },
          ],
        },
      ],
    };
  };
}

export { BaseUpdateTransferModal };
