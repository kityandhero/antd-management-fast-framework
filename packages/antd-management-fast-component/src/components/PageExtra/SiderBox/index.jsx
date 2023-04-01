import React from 'react';

import { checkObjectIsNullOrEmpty } from 'easy-soft-utility';

import { BaseComponent } from '../../../bases';
import { FlexBox } from '../../FlexBox';

import styles from './index.less';

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
      <FlexBox
        className={styles['amf-layout-sider-box']}
        direction="vertical"
        flexAuto="top"
        top={top}
        bottom={bottom}
      />
    );
  }
}

SiderBox.defaultProps = {
  top: null,
  bottom: null,
};

export { SiderBox };
