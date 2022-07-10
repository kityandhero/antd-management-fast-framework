import { Button, Space } from 'antd';

import BaseView from 'antd-management-fast-framework/es/framework/DataOperation/BaseView';
import { cardConfig } from 'antd-management-fast-framework/es/utils/constants';

class Index extends BaseView {
  loadDataAfterMount = false;

  goToPageList = (node) => {
    const { code } = node;

    this.goToPath(`/news/article/pageList/no/${code}`);
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            text: '快捷导航',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <Space>
                  <Button>文章管理</Button>
                  <Button>个人中心</Button>
                </Space>
              ),
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
