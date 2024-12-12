import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSqlContentDrawer } from '../BaseSqlContentDrawer';

const visibleFlag = '759d016e26c142eaa5c66066138627f9';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class SqlContentBusinessDrawer extends BaseSqlContentDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'sqlEntity/getBusiness',
    };
  }
}

export { SqlContentBusinessDrawer };
