import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePageListSelectDrawer } from '../BasePageListSelectDrawer';

const visibleFlag = '17db236b4072425aa8f295b1131fe4d2';

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class PageListWithQuestionSelectDrawer extends BasePageListSelectDrawer {
  static close() {
    switchControlAssist.close(visibleFlag);
  }

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      // 页面加载时自动加载的远程请求
      loadApiPath: 'tag/pageListWithQuestion',
    };
  }
}

export { PageListWithQuestionSelectDrawer };
