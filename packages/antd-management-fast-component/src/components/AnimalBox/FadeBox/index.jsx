import React, { PureComponent } from 'react';

import {
  checkInCollection,
  isFunction,
  isNumber,
  toNumber,
} from 'easy-soft-utility';

const animalCollection = [
  'ease-in',
  'linear',
  'ease',
  'ease-out',
  'ease-in-out',
];

const defaultProps = {
  visible: false,
  style: null,
  duration: 300,
  animal: 'ease-in',
  onClick: null,
};

class FadeBox extends PureComponent {
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

  getAnimal = () => {
    const { animal } = this.props;

    return checkInCollection(animalCollection, animal)
      ? animal
      : defaultProps.animal;
  };

  getDuration = () => {
    const { duration } = this.props;

    if (isNumber(duration)) {
      const d = toNumber(duration);

      if (d <= 0) {
        return defaultProps.duration;
      }

      return d;
    }

    return defaultProps.duration;
  };

  getStyle = () => {
    const { visible, style: styleSource } = this.props;
    const { counter } = this.state;

    const animal = this.getAnimal();
    const duration = this.getDuration();

    let v = {};

    if (visible) {
      v = {
        visibility: 'visible',
        opacity: '1',
      };

      this.visibilityChanged = false;
    } else {
      if (counter <= 0 && !this.startCountMonitor) {
        v = {
          visibility: 'hidden',
          opacity: '0',
        };

        this.startCountMonitor = true;
      } else {
        v = {
          ...(this.visibilityChanged
            ? {
                visibility: 'hidden',
              }
            : {
                visibility: 'visible',
              }),

          opacity: '0',
        };

        if (!this.visibilityChanged) {
          this.visibilityChanged = !this.visibilityChanged;
          this.processing = true;

          const that = this;

          setTimeout(() => {
            that.setState({
              counter: counter + 1,
            });

            that.processing = false;
          }, duration + 10);
        }
      }
    }

    return {
      ...v,
      ...styleSource,
      transition: `opacity ${duration}ms ${animal}`,
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
    const { children } = this.props;

    const style = this.getStyle();

    return (
      <div style={style} onClick={this.triggerClick}>
        {children}
      </div>
    );
  }
}

FadeBox.defaultProps = {
  ...defaultProps,
};

export { FadeBox };
