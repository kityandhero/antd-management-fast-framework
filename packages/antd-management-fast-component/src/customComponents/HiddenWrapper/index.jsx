import React from 'react';

import { BaseComponent } from '../BaseComponent';

class HiddenWrapper extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['children'];

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
