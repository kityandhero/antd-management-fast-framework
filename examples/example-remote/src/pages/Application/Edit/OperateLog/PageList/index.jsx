import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import BaseInnerPageList from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'application/pageListOperateLog',
      dateRangeFieldName: '操作时间',
      applicationId: null,
      currentRecord: null,
    };
  }

  /**
   * get derived state from props
   * @static
   * @param {Object} nextProperties
   * @param {Object} previousState
   * @returns {Object}
   */
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
    const { applicationId } = this.state;

    d.applicationId = applicationId;

    return d;
  };
}

export default PageList;
