import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { modelTypeCollection } from '../../../modelBuilders';
import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = 'acef031cbb904d18b940be64e7122a41';

@connect(({ applicationCustomerFeedback, schedulingControl }) => ({
  applicationCustomerFeedback,
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
      loadApiPath:
        modelTypeCollection.applicationCustomerFeedbackTypeCollection
          .pageListOperateLog,
      applicationCustomerFeedbackId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.applicationCustomerFeedbackId.name] = getValueByKey({
      data: externalData,
      key: fieldData.applicationCustomerFeedbackId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
