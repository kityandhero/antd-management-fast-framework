import { PureComponent } from 'react';
import { Row, Col } from 'antd';

class FlexBox extends PureComponent {
  render() {
    const {
      style: styleSource,
      allowWrap,
      flexAuto: flexAutoSource,
      left,
      leftStyle,
      right,
      rightStyle,
      top,
      bottom,
      direction: directionSource,
      vertical,
    } = this.props;

    let direction = directionSource;

    if (directionSource !== 'horizontal' && directionSource !== 'vertical') {
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
        <Row style={style}>
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

    const {
      // minHeight,
      bottomHeight,
    } = {
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
