import React from 'react';
import { connect } from 'umi';
import { Form, Transfer } from 'antd';

import { isFunction } from '../../../utils/tools';
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

  formContentConfigData = () => {
    const { targetKeys, selectedKeys } = this.state;

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
                    titles={['未拥有', '已拥有']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={(item) => {
                      const {
                        additional: { createMode },
                      } = item;

                      return `${item.name} [${getAreaAgentRoleCreateModeName({
                        global: this.getGlobal(),
                        value: createMode,
                      })}]`;
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
