import React, { PureComponent } from 'react';

import {
  buildRGBColorFromHexColor,
  checkStringIsNullOrWhiteSpace,
  isFunction,
} from 'easy-soft-utility';

import { FadeBox } from '../AnimalBox';
import { CenterBox } from '../CenterBox';

const defaultProps = {
  visible: false,
  color: '#000000',
  transparent: false,
  alpha: 0.5,
  image: '',
  zIndex: 810,
  duration: 300,
  animal: 'ease-in',
  onClick: null,
};

class Overlay extends PureComponent {
  processing = false;

  visibilityChanged = false;

  startCountMonitor = false;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      counter: 0,
    };
  }

  getStyle = () => {
    const { color, alpha, image, zIndex, transparent } = this.props;

    const position = 'absolute';
    const width = '100%';
    const height = '100%';

    let v = {};

    return {
      ...v,
      top: '0',
      left: '0',
      position,
      width,
      height,
      zIndex,
      ...(checkStringIsNullOrWhiteSpace(image)
        ? {
            backgroundColor:
              transparent || color === 'transparent'
                ? 'transparent'
                : `rgba(${buildRGBColorFromHexColor(color, '')}, ${alpha})`,
          }
        : {
            backgroundImage: image,
          }),
    };
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (this.processing) {
      return;
    }

    if (isFunction(onClick)) {
      onClick();
    }
  };

  render() {
    const { visible, animal, duration, children } = this.props;

    const style = this.getStyle();

    return (
      <FadeBox
        visible={visible}
        duration={duration}
        animal={animal}
        style={style}
        onClick={this.triggerClick}
      >
        {children ? <CenterBox>{children}</CenterBox> : null}
      </FadeBox>
    );
  }
}

Overlay.defaultProps = {
  ...defaultProps,
};

export { Overlay };
