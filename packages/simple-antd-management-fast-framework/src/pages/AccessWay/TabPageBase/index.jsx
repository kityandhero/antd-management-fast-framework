import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common/es/utils/tools';
import BaseUpdateFormTab from 'antd-management-fast-framework/es/framework/DataForm/BaseUpdateFormTab';

import {
  checkNeedUpdateAssist,
  parseUrlParamsForSetState,
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

  apiDataConvert = (props) => {
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
