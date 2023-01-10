import React from 'react';
import { useLocation, useParams } from 'umi';

import {
  setCurrentLocation,
  setCurrentParams,
} from 'antd-management-fast-common/es/utils/routeAssist';
import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';

import { applicationInit } from '../../utils/bootstrap';

const AnalysisRouteParams = () => {
  try {
    const location = useLocation();

    setCurrentLocation(location);
  } catch (error) {
    console.log(error);

    setCurrentLocation({});
  }

  try {
    const routeParams = useParams();

    setCurrentParams(routeParams);
  } catch (error) {
    console.log(error);

    setCurrentParams({});
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
        <AnalysisRouteParams />
      </>
    );
  }
}

export default Bootstrap;
