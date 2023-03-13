import { BaseComponent } from 'antd-management-fast-component';

import {
  getCurrentOperator,
  transferLayoutAvatar,
} from '../../utils/currentOperatorAssist';

class Bootstrap extends BaseComponent {
  doOtherWorkAfterDidMount = () => {
    const { setInitialState } = this.props;

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
