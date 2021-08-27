import { getDerivedStateFromPropsForUrlParams } from 'antd-management-fast-framework/lib/utils/tools';
import BaseUpdateFormTab from 'antd-management-fast-framework/lib/framework/DataForm/BaseUpdateFormTab';

import { parseUrlParamsForSetState, checkNeedUpdateAssist } from '../Assist/config';

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

  getApiData = (props) => {
    const {
      article: { data },
    } = props;

    return data;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkNeedUpdate = (preProps, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProps, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { articleId } = this.state;

    d.articleId = articleId;

    return d;
  };
}

export default TabPageBase;