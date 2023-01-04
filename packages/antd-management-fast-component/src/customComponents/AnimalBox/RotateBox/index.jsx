import TweenOne from 'rc-tween-one';
import React, { PureComponent } from 'react';

import { isFunction } from 'antd-management-fast-common/es/utils/tools';

class RotateBox extends PureComponent {
  render() {
    const {
      rotate: rotateCustom,
      duration: durationCustom,
      onClick,
      children,
    } = this.props;

    return (
      <div
        onClick={() => {
          if (isFunction(onClick)) {
            onClick();
          }
        }}
      >
        <TweenOne
          animation={{
            rotate: rotateCustom,
            duration: durationCustom,
          }}
        >
          {children}
        </TweenOne>
      </div>
    );
  }
}

RotateBox.defaultProps = {
  rotate: 0,
  duration: 1000,
  onClick: null,
};

export default RotateBox;
