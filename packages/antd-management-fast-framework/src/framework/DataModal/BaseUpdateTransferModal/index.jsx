import React from 'react';
import { Transfer } from 'antd';

import { formContentConfig } from '../../../utils/constants';
import BaseUpdateModal from '../BaseUpdateModal';

class BaseUpdateTransferModal extends BaseUpdateModal {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        width: 712,
        targetKeys: [],
        selectedKeys: [],
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildTargetKeys = (preProps, preState, snapshot) => {
    throw new Error('buildTargetKeys need overload');
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherWhenChangeVisible = (preProps, preState, snapshot) => {
    this.setState(
      {
        targetKeys: this.buildTargetKeys(preProps, preState, snapshot),
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  buildItem = (o) => {
    throw new Error('buildItem need overload');
  };

  formContentConfigData = () => {
    const { dataLoading, processing, targetKeys, selectedKeys } = this.state;

    return {
      list: [
        {
          spinning: dataLoading || processing,
          items: [
            {
              lg: 24,
              type: formContentConfig.contentItemType.component,
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

export default BaseUpdateTransferModal;
