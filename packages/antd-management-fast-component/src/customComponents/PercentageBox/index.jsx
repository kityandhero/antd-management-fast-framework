import React, { PureComponent } from 'react';

import { isMoney, toRound } from 'easy-soft-utility';

class PercentageBox extends PureComponent {
  render() {
    const { value } = this.props;

    let v = value;

    if (!isMoney(v)) {
      v = toRound(v * 100, 1);
    }

    return <span>{v}%</span>;
  }
}

PercentageBox.defaultProps = {
  value: 0,
};

export { PercentageBox };
