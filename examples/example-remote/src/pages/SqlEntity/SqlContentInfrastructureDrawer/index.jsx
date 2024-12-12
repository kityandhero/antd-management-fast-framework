import { connect } from 'easy-soft-dva';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BaseSqlContentDrawer } from '../BaseSqlContentDrawer';

const visibleFlag = '491677ab1ede462d9263faa42527e792';

@connect(({ sqlEntity, schedulingControl }) => ({
  sqlEntity,
  schedulingControl,
}))
class SqlContentInfrastructureDrawer extends BaseSqlContentDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'sqlEntity/getInfrastructure',
    };
  }
}

export { SqlContentInfrastructureDrawer };
