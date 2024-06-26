import { Transfer } from 'antd';
import React from 'react';

import { cardConfig } from 'antd-management-fast-common';

import { BaseUpdateModal } from '../BaseUpdateModal';

const primaryCallName = 'DataModal::BaseUpdateTransferModal';

/**
 * base update transfer modal
 * @namespace framework.DataModal
 * @class BaseUpdateTransferModal
 * @extends BaseUpdateModal
 */
class BaseUpdateTransferModal extends BaseUpdateModal {
  /**
   * 构造函数
   * @param {Object} properties 属性值集合。
   * @param {string} visibleFlag 可见性标记。
   */
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      width: 712,
      targetKeys: [],
      selectedKeys: [],
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  buildTargetKeys = () => {
    throw new Error(this.buildOverloadErrorText('buildTargetKeys'));
  };

  doOtherWhenChangeVisibleToShow = () => {
    this.logCallTrack({}, primaryCallName, 'doOtherWhenChangeVisibleToShow');

    this.logCallTrace(
      {},
      primaryCallName,
      'doOtherWhenChangeVisibleToShow',
      'trigger',
      'buildTargetKeys',
    );

    this.setState(
      {
        targetKeys: this.buildTargetKeys(),
      },
      () => {
        this.logCallTrace(
          {},
          primaryCallName,
          'doOtherWhenChangeVisibleToShow',
          'trigger',
          'reloadData',
        );

        this.reloadData({});
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
    throw new Error(this.buildOverloadErrorText('buildDataSource'));
  };

  buildTransferTitle = () => {
    return ['未拥有', '已拥有'];
  };

  // eslint-disable-next-line no-unused-vars
  buildItem = (o) => {
    throw new Error(this.buildOverloadErrorText('buildItem'));
  };

  /**
   * 构造 Card 配置集合。
   * @function
   */
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
