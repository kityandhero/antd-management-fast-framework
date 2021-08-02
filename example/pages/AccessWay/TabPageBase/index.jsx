import { getDerivedStateFromPropsForUrlParams } from '../../../../src/utils/tools';
import BaseUpdateFormTab from '../../../../src/framework/DataForm/BaseUpdateFormTab';

import {
  parseUrlParamsForSetState,
  checkNeedUpdateAssist,
} from '../Assist/config';

class BaseEditTab extends BaseUpdateFormTab {
  goToUpdateWhenProcessed = true;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  getApiData = (props) => {
    const {
      accessWay: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { accessWayId } = this.state;

    d.accessWayId = accessWayId;

    return d;
  };
}

export default BaseEditTab;
