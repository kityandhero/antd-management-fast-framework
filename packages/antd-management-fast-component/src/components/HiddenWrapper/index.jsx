import React from 'react';

import { BaseComponent } from '../../bases';

class HiddenWrapper extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['children'];

  /**
   * 渲染主入口。
   * @function
   * @returns {Object} 渲染结果
   */
  renderFurther() {
    const { hidden, children } = this.props;

    if (hidden) {
      return <div style={{ display: 'hidden' }}>{children}</div>;
    }

    return children;
  }
}

HiddenWrapper.defaultProps = {
  hidden: true,
};

export { HiddenWrapper };
