import BaseComponent from 'antd-management-fast-component/es/customComponents/BaseComponent';
import { applicationInit } from 'antd-management-fast-framework/es/utils/bootstrap';

class Bootstrap extends BaseComponent {
  doWorkBeforeAdjustDidMount = () => {
    applicationInit(runtimeSettings);
  };

  renderFurther() {
    return <></>;
  }
}

export default Bootstrap;
