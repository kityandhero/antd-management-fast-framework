import React from 'react';
import { useLocation, useParams } from '@umijs/max';

import { logError } from 'easy-soft-utility';

import {
  setCurrentLocation,
  setCurrentParameters,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { loadApplicationInitialData } from '../../utils/bootstrap';

const AnalysisRouteParameters = () => {
  try {
    const location = useLocation();

    setCurrentLocation(location);
  } catch (error) {
    logError(error);

    setCurrentLocation({});
  }

  try {
    const routeParameters = useParams();

    setCurrentParameters(routeParameters);
  } catch (error) {
    logError(error);

    setCurrentParameters({});
  }

  return <></>;
};

class Bootstrap extends BaseComponent {
  doWorkBeforeAdjustDidMount = () => {
    loadApplicationInitialData();
  };

  renderFurther() {
    return (
      <>
        <AnalysisRouteParameters />
      </>
    );
  }
}

export { Bootstrap };
