import { checkHasAuthority } from 'antd-management-fast-common/es/utils/authority';
import {
  getDerivedStateFromPropsForUrlParams,
  isFunction,
  redirectToPath,
  showRuntimeError,
} from 'antd-management-fast-common/es/utils/tools';

import SupplementWrapper from '../CustomWrapper/SupplementWrapper';

class AuthorizationWrapper extends SupplementWrapper {
  componentAuthority = null;

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  doDidMountTask = () => {
    let needDoOther = false;

    if (this.componentAuthority == null) {
      this.init();

      needDoOther = true;
    } else if (this.checkAuthority(this.componentAuthority)) {
      this.init();

      needDoOther = true;
    } else {
      const text = `缺少权限：${this.componentAuthority}`;

      showRuntimeError({
        message: text,
      });

      redirectToPath('/exception/404');
    }

    if (needDoOther) {
      this.adjustWhenDidMount();
    }
  };

  checkAuthority = (auth) => checkHasAuthority(auth);

  getCurrentOperator = () => {
    const {
      global: { currentOperator },
    } = this.props;

    return currentOperator;
  };

  reloadCurrentOperator = (callback = null) => {
    this.dispatchApi({
      type: 'global/getCurrentOperator',
      payload: { force: true },
    }).then(() => {
      if (isFunction(callback)) {
        callback();
      }
    });
  };
}

export default AuthorizationWrapper;
