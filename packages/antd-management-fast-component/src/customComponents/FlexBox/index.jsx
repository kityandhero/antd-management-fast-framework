import { Col, Row } from 'antd';
import { PureComponent } from 'react';

import { inCollection } from 'antd-management-fast-common/es/utils/core';

const flexAutoCollection = ['left', 'right', 'top', 'bottom'];

class FlexBox extends PureComponent {
  getDirection = () => {
    const { flexAuto } = this.props;

    if (!inCollection(flexAutoCollection, flexAuto)) {
      const text = 'flexAuto 只能配置为 left/right/top/bottom';

      showErrorMessage({
        message: text,
      });

      return 'horizontal';
    }

    return inCollection(['left', 'right'], flexAuto)
      ? 'horizontal'
      : inCollection(['top', 'bottom'], flexAuto)
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
      allowWrap,
      flexAuto: flexAutoSource,
      left,
      leftStyle,
      right,
      rightStyle,
      top,
      bottom,
      vertical,
    } = this.props;

    let direction = this.getDirection();

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
