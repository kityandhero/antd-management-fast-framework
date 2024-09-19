import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';

import { ProgressBar } from 'antd-management-fast-component';

@connect(({ progressBarControl }) => ({
  progressBarControl,
}))
class TopProgressBar extends PureComponent {
  getProperties = () => {
    return {
      ...this.props,
    };
  };

  render() {
    const {
      progressBarControl: { progressing },
    } = this.getProperties();

    return (
      <ProgressBar
        progressing={progressing || false}
        minimum={0.03}
        showSpinner={false}
      />
    );
  }
}

export { TopProgressBar };
