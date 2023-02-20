import React from 'react';
import { useLocation, useParams } from '@umijs/max';

import {
  setCurrentLocation,
  setCurrentParameters,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { applicationInit } from '../../utils/bootstrap';

const AnalysisRouteParameters = () => {
  try {
    const location = useLocation();

    setCurrentLocation(location);
  } catch (error) {
    console.log(error);

    setCurrentLocation({});
  }

  try {
    const routeParameters = useParams();

    setCurrentParameters(routeParameters);
  } catch (error) {
    console.log(error);

    setCurrentParameters({});
  }

  return <></>;
};

class Bootstrap extends BaseComponent {
  doWorkBeforeAdjustDidMount = () => {
    applicationInit();
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
