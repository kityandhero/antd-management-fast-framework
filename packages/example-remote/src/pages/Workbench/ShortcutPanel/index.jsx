import { Button, Space } from 'antd';

import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { DataOperation } from 'antd-management-fast-framework';

const { BaseView } = DataOperation;

@connect(({ testModel }) => ({
  testModel,
}))
class ShortcutPanel extends BaseView {
  loadRemoteRequestAfterMount = false;

  goToPageList = () => {
    this.goToPath(`/news/article/pageList`);
  };

  goToOperateCenter = () => {
    this.goToPath(`/currentOperator/setting`);
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
                <Space style={{ width: '100%' }} direction="vertical">
                  <Button onClick={this.goToPageList}>文章管理</Button>
                  <Button
                    onClick={() => {
                      this.goToOperateCenter();
                    }}
                  >
                    个人中心
                  </Button>
                </Space>
              ),
            },
          ],
        },
      ],
    };
  };

  renderFurther() {
    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
  }
}

export default ShortcutPanel;
