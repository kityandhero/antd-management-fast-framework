import React from 'react';

import { checkObjectIsNullOrEmpty } from 'easy-soft-utility';

import { BaseComponent } from '../../../BasicComponents';
import { FlexBox } from '../../FlexBox';

class SiderBox extends BaseComponent {
  renderFurther() {
    const { top, bottom } = this.props;

    if (checkObjectIsNullOrEmpty(top) && checkObjectIsNullOrEmpty(bottom)) {
      return null;
    }

    if (checkObjectIsNullOrEmpty(bottom)) {
      return top;
    }

    return (
      <FlexBox direction="vertical" flexAuto="top" top={top} bottom={bottom} />
    );
  }
}

SiderBox.defaultProps = {
  top: null,
  bottom: null,
};

export { SiderBox };
