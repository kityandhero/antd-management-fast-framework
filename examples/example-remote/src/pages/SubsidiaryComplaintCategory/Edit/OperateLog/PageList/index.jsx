import { connect } from 'easy-soft-dva';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../../../modelBuilders';
import BaseInnerPageList from '../../../../OperationLog/BaseInnerPageList';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';
import { fieldData } from '../../../Common/data';

@connect(({ subsidiaryComplaintCategory, schedulingControl }) => ({
  subsidiaryComplaintCategory,
  schedulingControl,
}))
class PageList extends BaseInnerPageList {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath:
        modelTypeCollection.subsidiaryComplaintCategoryTypeCollection
          .pageListOperateLog,
      dateRangeFieldName: '操作时间',
      subsidiaryComplaintCategoryId: null,
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
    const { subsidiaryComplaintCategoryId } = this.state;

    d[fieldData.subsidiaryComplaintCategoryId.name] =
      subsidiaryComplaintCategoryId;

    return d;
  };
}

export default PageList;
