import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';

import {
  checkInCollection,
  isFunction,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

const flexAutoCollection = ['left', 'right', 'top', 'bottom'];

class FlexBox extends PureComponent {
  getDirection = () => {
    const { flexAuto } = this.props;

    if (!checkInCollection(flexAutoCollection, flexAuto)) {
      const text = 'flexAuto 只能配置为 left/right/top/bottom';

      showSimpleErrorMessage(text);

      return 'horizontal';
    }

    return checkInCollection(['left', 'right'], flexAuto)
      ? 'horizontal'
      : checkInCollection(['top', 'bottom'], flexAuto)
        ? 'vertical'
        : 'horizontal';
  };

  triggerClick = () => {
    const { onClick } = this.props;

    if (isFunction(onClick)) {
      onClick();
    }
  };

  render() {
    const {
      style: styleSource,
      className,
      allowWrap,
      flexAuto: flexAutoSource,
      left,
      leftStyle,
      right,
      rightStyle,
      top,
      topStyle,
      bottom,
      bottomStyle,
    } = this.props;

    let direction = this.getDirection();

    let flexAuto = '';

    if (direction === 'horizontal') {
      flexAuto = flexAutoSource === 'left' ? 'left' : 'right';

      const style = {
        ...styleSource,
        ...(allowWrap || false ? {} : { flexWrap: 'nowrap' }),
      };

      if (flexAuto === 'left') {
        return (
          <Row style={style} className={className}>
            <Col flex="auto" style={leftStyle || null}>
              {left}
            </Col>
            {(right || null) == null ? null : (
              <Col flex style={rightStyle || null}>
                {right}
              </Col>
            )}
          </Row>
        );
      }

      return (
        <Row style={style} className={className}>
          <Col flex style={leftStyle || null}>
            {left}
          </Col>

          {(right || null) == null ? null : (
            <Col flex="auto" style={rightStyle || null}>
              {right}
            </Col>
          )}
        </Row>
      );
    }

    if (top == null || bottom == null) {
      if (top == null && bottom == null) {
        return null;
      }

      if (top == null) {
        return bottom;
      }

      if (bottom == null) {
        return top;
      }
    }

    flexAuto = flexAutoSource === 'top' ? 'top' : 'bottom';

    const style = {
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'stretch',
    };

    return (
      <div style={style} className={className}>
        <div
          style={{
            ...topStyle,
            ...(flexAuto === 'bottom' ? {} : { flex: '1 1 auto' }),
          }}
        >
          {top}
        </div>

        <div
          style={{
            ...bottomStyle,
            ...(flexAuto === 'bottom' ? { flex: '1 1 auto' } : {}),
          }}
        >
          {bottom}
        </div>
      </div>
    );
  }
}

FlexBox.defaultProps = {
  flexAuto: 'left',
  allowWrap: false,
  left: null,
  leftStyle: {},
  right: null,
  rightStyle: {},
  top: null,
  topStyle: {},
  bottom: null,
  bottomStyle: {},
  style: null,
  className: null,
};

export { FlexBox };
