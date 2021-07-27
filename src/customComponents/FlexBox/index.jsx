import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';

class FlexBox extends PureComponent {
  render() {
    const {
      style: styleSource,
      allowWrap,
      flexAuto: flexAutoSource,
      left,
      right,
      top,
      bottom,
      direction,
      vertical,
    } = this.props;

    if (direction !== 'horizontal' && direction !== 'vertical') {
      direction = 'horizontal';
    }

    if (direction === 'horizontal') {
      const flexAuto = flexAutoSource === 'left' ? 'left' : 'right';

      const style = {
        ...(styleSource || {}),
        ...(!(allowWrap || false) ? { flexWrap: 'nowrap' } : {}),
      };

      if (flexAuto === 'left') {
        return (
          <Row style={style}>
            <Col flex="auto">{left}</Col>
            {(right || null) == null ? null : <Col flex>{right}</Col>}
          </Row>
        );
      }

      return (
        <Row style={style}>
          <Col flex>{left}</Col>
          {(right || null) == null ? null : <Col flex="auto">{right}</Col>}
        </Row>
      );
    }

    const { minHeight, bottomHeight } = {
      ...{
        bottomHeight: '180rpx',
      },
      ...(vertical || {}),
    };

    const style = {
      height: '100%',
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'stretch',
      // minHeight: minHeight,
    };

    return (
      <div style={style}>
        <div
          style={{
            flex: '1 1 auto',
          }}
        >
          <div>{top}</div>
        </div>

        <div
          style={{
            flex: `0 1 ${bottomHeight}`,
          }}
        >
          {bottom}
        </div>
      </div>
    );
  }
}

FlexBox.defaultProps = {
  direction: 'horizontal',
  flexAuto: 'left',
  allowWrap: false,
  vertical: {
    minHeight: 'auto',
    bottomHeight: '180rpx',
  },
  left: null,
  right: null,
  top: null,
  bottom: null,
  style: null,
};

export default FlexBox;
