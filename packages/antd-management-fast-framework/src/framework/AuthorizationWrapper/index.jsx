import {
  checkHasAuthority,
  checkStringIsNullOrWhiteSpace,
  getToken,
  handleSimulationAuthorizeExtra,
  isArray,
  isFunction,
  logException,
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
    const {
      global: { currentOperator },
    } = this.props;

    return currentOperator;
  };

  reloadCurrentOperator = ({ successCallback = null, failCallback = null }) => {
    const that = this;

    that
      .dispatchApi({
        type: 'global/getCurrentOperator',
        payload: { force: true },
      })
      .then((remoteData) => {
        const { dataSuccess } = remoteData;

        if (dataSuccess) {
          const { list, data, extra } = {
            data: {},
            list: [],
            extra: {},
            ...remoteData,
          };

          if (isFunction(successCallback)) {
            // eslint-disable-next-line promise/no-callback-in-promise
            successCallback({
              data: data || {},
              list: isArray(list) ? list : [],
              extra: extra || {},
              originalData: remoteData || {},
            });
          }
        } else {
          if (isFunction(failCallback)) {
            // eslint-disable-next-line promise/no-callback-in-promise
            failCallback({ originalData: remoteData || {} });
          }
        }

        return;
      })
      .catch((error) => {
        const { message } = error;

        logException(message);
      });
  };
}

export { AuthorizationWrapper };
