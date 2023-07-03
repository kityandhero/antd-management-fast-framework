import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  getCurrentOperatorCache,
  getToken,
  handleSimulationAuthorizeExtra,
} from 'easy-soft-utility';

import { getDerivedStateFromPropertiesForUrlParameters } from 'antd-management-fast-common';

import { refreshCurrentOperator } from '../../utils/currentOperatorAssist';
import { SupplementWrapper } from '../CustomWrapper/SupplementWrapper';

class AuthorizationWrapper extends SupplementWrapper {
  componentAuthority = null;

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  checkAuthentication = () => {
    return (
      !checkStringIsNullOrWhiteSpace(getToken()) &&
      handleSimulationAuthorizeExtra()
    );
  };

  checkAuthorization = () => {
    return checkStringIsNullOrWhiteSpace(this.componentAuthority) ||
      checkHasAuthority(this.componentAuthority)
      ? true
      : false;
  };

  getCurrentOperator = () => {
    getCurrentOperatorCache();

    return getCurrentOperatorCache();
  };

  reloadCurrentOperator = ({ successCallback = null, failCallback = null }) => {
    refreshCurrentOperator({
      successCallback: successCallback,
      failCallback: failCallback,
    });
  };
}

export { AuthorizationWrapper };
