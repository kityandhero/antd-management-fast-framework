import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '7f7e0ff509a74702aa517162da46ccdc';

@connect(({ callCenterCategory, schedulingControl }) => ({
  callCenterCategory,
  schedulingControl,
}))
class OperateLogDrawer extends BasePageListDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      loadApiPath: 'callCenterCategory/pageListOperateLog',
      callCenterCategoryId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.callCenterCategoryId.name] = getValueByKey({
      data: externalData,
      key: fieldData.callCenterCategoryId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
