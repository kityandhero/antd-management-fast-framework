import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import BaseInnerPageList from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';
import { fieldData } from '../../../Common/data';

@connect(({ administrativeDivision, schedulingControl }) => ({
  administrativeDivision,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'administrativeDivision/pageListOperateLog',
      dateRangeFieldName: '操作时间',
      administrativeDivisionId: null,
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
    const { administrativeDivisionId } = this.state;

    d[fieldData.administrativeDivisionId.name] = administrativeDivisionId;

    return d;
  };
}

export default PageList;
