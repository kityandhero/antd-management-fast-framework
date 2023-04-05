import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isArray, isString } from 'easy-soft-utility';

@connect(({ switchControl }) => ({
  switchControl,
}))
class LoadingOverlay extends PureComponent {
  getCheckResult() {
    const { switchControl, flag } = this.props;

    if (isArray(flag)) {
      let result = false;

      for (const o of flag) {
        if (!isString(o)) {
          continue;
        }

        result = !!switchControl[o];

        if (result) {
          break;
        }
      }

      return result;
    } else {
      if (!isString(flag)) {
        return false;
      }

      return !!switchControl[flag];
    }
  }

  render() {
    const { children } = this.props;

    const spinning = this.getCheckResult();

    return <Spin spinning={spinning}>{children}</Spin>;
  }
}

export { LoadingOverlay };
