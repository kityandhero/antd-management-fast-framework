import { Button, Space } from 'antd';

import { cardConfig } from 'antd-management-fast-common';
import { DataOperation } from 'antd-management-fast-framework';

import { changeTestValue } from '../Assist/action';

const { BaseView } = DataOperation;

class Index extends BaseView {
  loadRemoteRequestAfterMount = false;

  changeValue = () => {
    changeTestValue();
  };

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
                <Space>
                  <Button onClick={this.goToPageList}>文章管理</Button>
                  <Button
                    onClick={() => {
                      this.goToOperateCenter();
                    }}
                  >
                    个人中心
                  </Button>
                  <Button onClick={this.changeValue}>ChangeValue</Button>
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

export default Index;
