import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
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
      miniAuto,
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
        const { width } = { width: '', ...rightStyle };

        return (
          <Row style={style} className={className}>
            <Col
              flex="auto"
              style={{ ...leftStyle, ...(miniAuto ? { width: '0' } : {}) }}
            >
              {left}
            </Col>

            {(right || null) == null ? null : (
              <Col
                flex={checkStringIsNullOrWhiteSpace(width) ? true : width}
                style={rightStyle || null}
              >
                {right}
              </Col>
            )}
          </Row>
        );
      }

      const { width } = { width: '', ...leftStyle };

      return (
        <Row style={style} className={className}>
          <Col
            flex={checkStringIsNullOrWhiteSpace(width) ? true : width}
            style={leftStyle || null}
          >
            {left}
          </Col>

          {(right || null) == null ? null : (
            <Col
              flex="auto"
              style={{ ...rightStyle, ...(miniAuto ? { width: '0' } : {}) }}
            >
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
            ...(flexAuto === 'bottom'
              ? {}
              : {
                  flex: '1 1 auto',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }),
          }}
        >
          {top}
        </div>

        <div
          style={{
            ...bottomStyle,
            ...(flexAuto === 'bottom'
              ? {
                  flex: '1 1 auto',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                }
              : {}),
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
  miniAuto: false,
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
