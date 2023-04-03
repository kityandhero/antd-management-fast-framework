import React from 'react';

import { connect } from 'easy-soft-dva';

import { BaseComponent, ProgressBar } from 'antd-management-fast-component';

@connect(({ progressBarControl }) => ({
  progressBarControl,
}))
class TopProgressBar extends BaseComponent {
  renderFurther() {
    const {
      progressBarControl: { progressing },
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
