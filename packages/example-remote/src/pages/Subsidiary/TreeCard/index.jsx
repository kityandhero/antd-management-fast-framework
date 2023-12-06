import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataOperation } from 'antd-management-fast-framework';

const { BaseView } = DataOperation;

@connect(({ section, schedulingControl }) => ({
  section,
  schedulingControl,
}))
class Index extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'subsidiary/singleTreeList',
    };
  }

  goToPageList = (node) => {
    const { code } = node;

    this.goToPath(`/organization/subsidiary/pageList/no/${code}`);
  };

  establishCardCollectionConfig = () => {
    const { metaListData } = this.state;

    return {
      list: [
        {
          title: {
            text: '栏目导航',
          },
          extra: {
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
                size: 'small',
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: iconBuilder.download(),
              onSelect: (selectedKeys, { node }) => {
                this.goToPageList(node);
              },
              treeData: [
                {
                  key: '-10000',
                  title: '全部公司',
                  code: '-10000',
                },
                ...metaListData,
              ],
            },
          ],
        },
      ],
    };
  };

  renderFurther() {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  }
}

export default Index;
