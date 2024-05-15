import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';
import { DataForm } from 'antd-management-fast-framework';

import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState as parseUrlParametersForSetState,
} from '../../../businessAssists/config';

const { BaseUpdateFormTab } = DataForm;

class TabPageBase extends BaseUpdateFormTab {
  reloadHeaderOnSubmitSuccess = true;

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
    const { simpleId } = this.state;

    d.simpleId = simpleId;

    return d;
  };
}

export default TabPageBase;
