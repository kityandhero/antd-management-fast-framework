import React from 'react';

import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';

import { applicationInit } from '../../utils/bootstrap';

class BootstrapRemote extends BaseComponent {
  doWorkBeforeAdjustDidMount = () => {
    applicationInit();
  };

  renderFurther() {
    return <></>;
  }
}

export default BootstrapRemote;
