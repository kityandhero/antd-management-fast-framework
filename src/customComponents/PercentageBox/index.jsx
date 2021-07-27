import React, { PureComponent } from 'react';

import { isMoney, roundToTarget } from '@/utils/tools';

class PercentageBox extends PureComponent {
  render() {
    const { value } = this.props;

    let v = value;

    if (!isMoney(v)) {
      v = roundToTarget(v * 100, 1);
    }

    return <span>{v}%</span>;
  }
}

PercentageBox.defaultProps = {
  value: 0,
};

export default PercentageBox;
