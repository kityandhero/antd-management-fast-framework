import { BaseComponent } from 'antd-management-fast-component';

import { loadApplicationInitialData } from '../../utils/bootstrap';

class Bootstrap extends BaseComponent {
  doWorkBeforeAdjustDidMount = () => {
    loadApplicationInitialData();
  };

  renderFurther() {
    return null;
  }
}

export { Bootstrap };
