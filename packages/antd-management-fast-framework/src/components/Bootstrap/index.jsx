import { BaseComponent } from 'antd-management-fast-component';

import { getCurrentOperator } from '../../utils';

class Bootstrap extends BaseComponent {
  doOtherWorkAfterDidMount = () => {
    getCurrentOperator({});
  };

  renderFurther() {
    return null;
  }
}

export { Bootstrap };
