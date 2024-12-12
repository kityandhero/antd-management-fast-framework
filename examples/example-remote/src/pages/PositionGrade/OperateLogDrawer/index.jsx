import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { switchControlAssist } from 'antd-management-fast-framework';

import { BasePageListDrawer } from '../../OperationLog/BasePageListDrawer';
import { fieldData } from '../Common/data';

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '6e2357dca2354c8ea3e086fcd61f2da8';

@connect(({ positionGrade, schedulingControl }) => ({
  positionGrade,
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
      loadApiPath: 'positionGrade/pageListOperateLog',
      positionGradeId: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    const d = o;

    d[fieldData.positionGradeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.positionGradeId.name,
      defaultValue: '',
    });

    return d;
  };
}

export { OperateLogDrawer };
