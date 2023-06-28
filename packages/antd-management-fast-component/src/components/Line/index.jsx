import React, { PureComponent } from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isNumber,
  isString,
  toNumber,
} from 'easy-soft-utility';

const directionCollection = ['horizontal', 'vertical'];

const defaultProps = {
  direction: 'horizontal',
  margin: '',
  color: '',
  width: 0,
  height: 0,
  transparent: false,
  borderRadius: 0,
};

class Line extends PureComponent {
  getDirection = () => {
    const { direction: directionSource } = this.props;

    const direction = checkInCollection(directionCollection, directionSource)
      ? directionSource
      : 'horizontal';

    return direction;
  };

  getColor = () => {
    const { color, transparent } = this.props;

    if (transparent) {
      return {
        backgroundColor: 'transparent',
      };
    }

    if (isString(color)) {
      if (checkStringIsNullOrWhiteSpace(color)) {
        return {};
      }

      return {
        backgroundColor: color,
        backgroundImage: 'null',
      };
    }

    if (isArray(color)) {
      const a = color.filter(
        (o) => isString(o) && !checkStringIsNullOrWhiteSpace(o),
      );

      if (a.length > 0) {
        return {
          backgroundColor: 'null',
          backgroundImage: `linear-gradient(45deg, ${a.join(',')})`,
        };
      }
    }

    return {};
  };

  getStyle = () => {
    const { margin, width, height, borderRadius } = this.props;

    const direction = this.getDirection();

    let displayStyle = {};
    let sizeStyle = {};
    let marginStyle = {};
    let colorStyle = this.getColor();

    switch (direction) {
      case 'horizontal': {
        displayStyle = {
          display: 'block',
        };

        sizeStyle = {
          ...(isNumber(width) && toNumber(width) > 0
            ? { width: `${width}px` }
            : { width: '100%' }),
          ...(isNumber(height) && toNumber(height) > 0
            ? { height: `${height}px` }
            : { height: '1px' }),
        };
        break;
      }

      default: {
        displayStyle = {
          display: 'inline-block',
        };

        sizeStyle = {
          ...(isNumber(width) && toNumber(width) > 0
            ? { width: `${width}px` }
            : { width: '1px' }),
          ...(isNumber(height) && toNumber(height) > 0
            ? { height: `${height}px` }
            : { height: '100%' }),
        };
        break;
      }
    }

    if (!checkStringIsNullOrWhiteSpace(margin)) {
      marginStyle = {
        margin: isNumber(margin) ? `${margin}px` : margin,
      };
    }

    return {
      ...displayStyle,
      ...sizeStyle,
      ...(borderRadius > 0 ? { borderRadius: `${borderRadius}px` } : {}),
      ...marginStyle,
      ...colorStyle,
    };
  };

  render() {
    const style = this.getStyle();

    return <div style={style} />;
  }
}

Line.defaultProps = {
  ...defaultProps,
};

export { Line };
