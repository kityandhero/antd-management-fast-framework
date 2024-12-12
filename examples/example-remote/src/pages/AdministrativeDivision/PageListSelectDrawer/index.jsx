import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePageListSelectDrawer } from '../BasePageListSelectDrawer';

const visibleFlag = '5df4cc0399f9401899f84b21b99b5406';

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
// 组件基类, 仅为代码复用性设计, 具体使用时请自行考虑
class PageListSelectDrawer extends BasePageListSelectDrawer {
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
      loadApiPath: 'administrativeDivision/pageList',
    };
  }
}

export { PageListSelectDrawer };
