import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import BaseSimpleSinglePageSelectDrawer from '../../BaseSimpleSinglePageSelectDrawer';

const visibleFlag = 'de266a61e4b24705afda59a125f81952';

@connect(({ simple, schedulingControl }) => ({
  simple,
  schedulingControl,
}))
class SimpleSinglePageFrontendPaginationSelectDrawer extends BaseSimpleSinglePageSelectDrawer {
  // 使用模拟分页, 默认 false, 不使用二次选择确认时可不用特殊指定
  useFrontendPagination = true;

  // 指定使用选择确认模式, 默认 false, 不使用二次选择确认时可不用特殊指定
  confirmSelect = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);
  }
}

export default SimpleSinglePageFrontendPaginationSelectDrawer;
