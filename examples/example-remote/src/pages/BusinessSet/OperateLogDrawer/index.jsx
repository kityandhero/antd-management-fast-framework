import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '29ec6fb069c74bb5afe6aba8d05ae751';

@connect(({ businessSet, schedulingControl }) => ({
  businessSet,
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
      loadApiPath: 'businessSet/pageListOperateLog',
      businessSetId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.businessSetId.name] = getValueByKey({
      data: externalData,
      key: fieldData.businessSetId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
