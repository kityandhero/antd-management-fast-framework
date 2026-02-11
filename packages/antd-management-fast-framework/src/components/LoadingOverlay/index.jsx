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
  getProperties = () => {
    return {
      flag: '',
      fill: false,
      minHeight: null,
      maxHeight: null,
      ...this.props,
    };
  };

  getStyle = () => {
    const { minHeight, maxHeight, fill } = this.getProperties();

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
      overflow: 'hidden',
    };
    return { ...minHeightStyle, ...maxHeightStyle, ...(fill ? fillStyle : {}) };
  };

  render() {
    const { children, switchControl, flag, fill } = this.getProperties();

    const result = switchControlAssist.check(switchControl, flag);

    const innerStyle = this.getStyle();

    const hasInnerStyle = !isEmptyObject(innerStyle);

    return (
      <Spin
        spinning={result}
        style={fill ? { height: '100%', width: '100%' } : {}}
        classNames={{ root: fill ? (styles.fill ?? null) : null }}
      >
        {hasInnerStyle ? <div style={innerStyle}>{children}</div> : children}
      </Spin>
    );
  }
}

export { LoadingOverlay };
