import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-common';
import BaseUpdateFormTab from 'antd-management-fast-framework/es/framework/DataForm/BaseUpdateFormTab';

import {
  checkNeedUpdateAssist,
  parseUrlParamsForSetState,
} from '../Assist/config';

class TabPageBase extends BaseUpdateFormTab {
  goToUpdateWhenProcessed = true;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(
      nextProps,
      prevState,
      { id: '' },
      parseUrlParamsForSetState,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    console.log(this.state);

    const d = o;
    const { articleId } = this.state;

    d.articleId = articleId;

    return d;
  };
}

export default TabPageBase;
