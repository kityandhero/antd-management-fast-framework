import React from 'react';

import { connect } from 'easy-soft-dva';

import { BaseComponent, ProgressBar } from 'antd-management-fast-component';

@connect(({ progressControl }) => ({
  progressControl,
}))
class TopProgressBar extends BaseComponent {
  renderFurther() {
    const {
      progressControl: { progressing },
    } = this.props;

    return (
      <ProgressBar
        progressing={progressing || false}
        minimum={0.03}
        showSpinner={false}
      />
    );
  }
}

TopProgressBar.defaultProps = {};

export { TopProgressBar };
