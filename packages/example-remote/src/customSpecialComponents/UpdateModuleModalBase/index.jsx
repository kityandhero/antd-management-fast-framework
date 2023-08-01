import { Transfer } from 'antd';

import { cardConfig } from 'antd-management-fast-common';
import { EverySpace } from 'antd-management-fast-component';
import { DataModal } from 'antd-management-fast-framework';

import styles from './index.less';

const { BaseUpdateModal } = DataModal;

class UpdateModuleModalBase extends BaseUpdateModal {
  reloadWhenShow = false;

  resetDataAfterLoad = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      targetKeys: [],
      selectedKeys: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    const { externalData } = this.state;
    const { expansionSetCollection } = externalData;

    const metaListData = [];
    const targetKeys = [];

    for (const item of expansionSetCollection || []) {
      const o = item;

      o.key = item.indexNo;

      if (o.value === '1') {
        targetKeys.push(o.key);
      }

      metaListData.push(o);
    }

    this.setState({ metaListData, targetKeys });
  };

  supplementSubmitRequestParams = (data) => {
    const {
      externalData: { requestParams },
      targetKeys,
      metaListData,
    } = this.state;

    let o = data;

    let result = '';
    const temporary = [];

    for (const item of metaListData || []) {
      const c = item;

      c.value = '0';

      temporary.push(c);
    }

    for (const item of targetKeys || []) {
      temporary[item].value = '1';
    }

    for (const item of temporary || []) {
      result += item.value;
    }

    o.expansionSet = result;

    o = { ...o, ...requestParams };

    return o;
  };

  handleChange = (nextTargetKeys) => {
    this.setState({ targetKeys: nextTargetKeys });
  };

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    });
  };

  establishCardCollectionConfig = () => {
    const { metaListData, targetKeys, selectedKeys } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <>
                  <Transfer
                    // listStyle={{
                    //   width: 212,
                    // }}
                    className={styles.transferCustomizeList}
                    dataSource={metaListData}
                    titles={['未启用', '已启用']}
                    targetKeys={targetKeys}
                    selectedKeys={selectedKeys}
                    onChange={this.handleChange}
                    onSelectChange={this.handleSelectChange}
                    render={(item) => item.name}
                  />

                  <EverySpace size={24} direction="horizontal" />
                </>
              ),
            },
          ],
        },
      ],
    };
  };
}

export { UpdateModuleModalBase };
