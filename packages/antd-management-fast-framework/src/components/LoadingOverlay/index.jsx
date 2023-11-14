import { Spin } from 'antd';
import React, { PureComponent } from 'react';

import { connect } from 'easy-soft-dva';
import { isEmptyObject, isNumber, isString } from 'easy-soft-utility';

import { switchControlAssist } from '../../utils/switchControlAssist';

import styles from './index.less';

@connect(({ switchControl }) => ({
  switchControl,
}))
class LoadingOverlay extends PureComponent {
  getStyle = () => {
    const { minHeight, maxHeight, fill } = this.props;

    const minHeightStyle = fill
      ? {}
      : isNumber(minHeight)
        ? { minHeight: `${minHeight}px` }
        : isString(minHeight)
          ? { minHeight }
          : {};

    const maxHeightStyle = fill
      ? {}
      : isNumber(maxHeight)
        ? { maxHeight: `${maxHeight}px` }
        : isString(maxHeight)
          ? { maxHeight }
          : {};

    const fillStyle = {
      height: '100%',
      width: '100%',
      overflow: 'auto',
    };
    return { ...minHeightStyle, ...maxHeightStyle, ...(fill ? fillStyle : {}) };
  };

  render() {
    const { children, switchControl, flag, fill } = this.props;

    const result = switchControlAssist.check(switchControl, flag);

    const innerStyle = this.getStyle();

    const hasInnerStyle = !isEmptyObject(innerStyle);

    return (
      <Spin
        spinning={result}
        style={fill ? { height: '100%', width: '100%' } : {}}
        wrapperClassName={fill ? styles.fill : null}
      >
        {hasInnerStyle ? <div style={innerStyle}>{children}</div> : children}
      </Spin>
    );
  }
}

LoadingOverlay.defaultProps = {
  flag: '',
  fill: false,
  minHeight: null,
  maxHeight: null,
};

export { LoadingOverlay };
