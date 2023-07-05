import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { BaseInnerOperationLogPageList } from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class PageList extends BaseInnerOperationLogPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'user/pageListOperateLog',
      dateRangeFieldName: '操作时间',
      dataPreviewDrawerVisible: false,
      userId: null,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { userId } = this.state;

    d.userId = userId;

    return d;
  };
}

export default PageList;
