import { logCallTrack, mergeArrowText, toString } from 'easy-soft-utility';

import {
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';
import { BaseComponent } from 'antd-management-fast-component';

import { loadApplicationInitialData } from '../../utils/bootstrap';
import {
  getCurrentOperator,
  transferLayoutAvatar,
} from '../../utils/currentOperatorAssist';

const primaryCallName = 'Bootstrap';

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

          return v;
        });
      },
    });
  };

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    if (this.showCallProcess) {
      this.logCallTrack({}, primaryCallName, 'renderFurther');
    } else {
      logCallTrack(
        {},
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'renderFurther',
          'showCallProcess',
          toString(this.showCallProcess),
        ),
        {
          color: renderFurtherColorWhenNoCallProcess,
          prefix: renderFurtherPrefixWhenNoCallProcess,
        },
      );
    }

    return null;
  }
}

export { Bootstrap };
