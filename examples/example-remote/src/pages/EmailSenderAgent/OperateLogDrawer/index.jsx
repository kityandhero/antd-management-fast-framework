import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '9816d855cfa1483dadd44d6eb60591cc';

@connect(({ emailSenderAgent, schedulingControl }) => ({
  emailSenderAgent,
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
      loadApiPath: 'emailSenderAgent/pageListOperateLog',
      emailSenderAgentId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.emailSenderAgentId.name] = getValueByKey({
      data: externalData,
      key: fieldData.emailSenderAgentId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
