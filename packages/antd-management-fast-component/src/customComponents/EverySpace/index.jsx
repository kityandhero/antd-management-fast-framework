import React, { PureComponent } from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

class EverySpace extends PureComponent {
  render() {
    const { size, direction, backgroundColor, margin, borderRadius } =
      this.props;

    if (size <= 0) {
      return null;
    }

    if (direction !== 'vertical' && direction !== 'horizontal') {
      return null;
    }

    const customStyle = {
      ...{},
      ...(checkStringIsNullOrWhiteSpace(backgroundColor || '')
        ? {}
        : { backgroundColor }),
      ...(checkStringIsNullOrWhiteSpace(margin || '') ? {} : { margin }),
      ...(checkStringIsNullOrWhiteSpace(borderRadius || '')
        ? {}
        : { borderRadius }),
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

export { EverySpace };
