import { BaseComponent } from 'antd-management-fast-component';

import { loadApplicationInitialData } from '../../utils/bootstrap';
import {
  getCurrentOperator,
  transferLayoutAvatar,
} from '../../utils/currentOperatorAssist';

class Bootstrap extends BaseComponent {
  doOtherWorkAfterDidMount = () => {
    const { setInitialState } = this.props;

    loadApplicationInitialData();

    getCurrentOperator({
      successCallback: (data) => {
        const layoutAvatar = transferLayoutAvatar({
          currentOperator: data,
        });

        setInitialState((preInitialState) => {
          let { layoutAvatar: preLayoutAvatar = {} } = {
            layoutAvatar: {},
            ...preInitialState,
          };

          const v = {
            ...preLayoutAvatar,
            layoutAvatar,
          };
          console.log(v);
          return v;
        });
      },
    });
  };

  renderFurther() {
    return null;
  }
}

export { Bootstrap };
