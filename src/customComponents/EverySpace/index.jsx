import React, { PureComponent } from 'react';

import { stringIsNullOrWhiteSpace } from '@/utils/tools';

class EverySpace extends PureComponent {
  render() {
    const { size, direction, backgroundColor, margin, borderRadius } = this.props;

    if (size <= 0) {
      return null;
    }

    if (direction !== 'vertical' && direction !== 'horizontal') {
      return null;
    }

    const customStyle = {
      ...{},
      ...(stringIsNullOrWhiteSpace(backgroundColor || '') ? {} : { backgroundColor }),
      ...(stringIsNullOrWhiteSpace(margin || '') ? {} : { margin }),
      ...(stringIsNullOrWhiteSpace(borderRadius || '') ? {} : { borderRadius }),
    };

    return (
      <>
        {direction === 'horizontal' ? (
          <div
            style={{
              ...{
                height: `${size}px`,
              },
              ...customStyle,
            }}
          />
        ) : null}

        {direction === 'vertical' ? (
          <div
            style={{
              ...{
                height: `100%`,
                width: `${size}px`,
              },
              ...customStyle,
            }}
          />
        ) : null}
      </>
    );
  }
}

EverySpace.defaultProps = {
  size: 10,
  direction: 'vertical',
  backgroundColor: '',
  margin: '',
  borderRadius: '',
};

export default EverySpace;
