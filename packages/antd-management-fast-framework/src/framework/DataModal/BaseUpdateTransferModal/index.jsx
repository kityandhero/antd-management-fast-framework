import { Transfer } from 'antd';
import React from 'react';

import { cardConfig } from 'antd-management-fast-common';

import { BaseUpdateModal } from '../BaseUpdateModal';

const primaryCallName = 'DataModal::BaseUpdateTransferModal';

/**
 * base update transfer modal
 * @namespace framework.DataModal
 * @class BaseUpdateTransferModal
 * @augments BaseUpdateModal
 */
class BaseUpdateTransferModal extends BaseUpdateModal {
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
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
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
