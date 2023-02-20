import {
  checkHasAuthority,
  isFunction,
  logException,
  redirectTo,
  showSimpleRuntimeError,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { SupplementWrapper } from '../CustomWrapper/SupplementWrapper';

class AuthorizationWrapper extends SupplementWrapper {
  componentAuthority = null;

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
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

      showSimpleRuntimeError(text);

      redirectTo('/exception/404');
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
    })
      .then(() => {
        if (isFunction(callback)) {
          // eslint-disable-next-line promise/no-callback-in-promise
          callback();
        }

        return;
      })
      .catch((error) => {
        logException(error);
      });
  };
}

export { AuthorizationWrapper };
