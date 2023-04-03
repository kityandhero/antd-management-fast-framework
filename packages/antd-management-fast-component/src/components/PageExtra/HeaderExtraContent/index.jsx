import { Col, Row } from 'antd';
import React, { PureComponent } from 'react';

import { formatDatetime } from 'easy-soft-utility';

class HeaderExtraContent extends PureComponent {
  render() {
    const {
      textLabel = '描述',
      text = '',
      timeLabel = '时间',
      time = new Date(),
    } = this.props;

    const textStyle = {
      fontSize: '20px',
    };

    return (
      <Row>
        <Col xs={24} sm={12}>
          <div>{timeLabel}</div>
          <div style={textStyle}>
            {formatDatetime({
              data: time,
              format: 'HH:mm:ss',
              defaultValue: '--',
            })}

            <br />

            {formatDatetime({
              data: time,
              format: 'YYYY-MM-DD',
            })}
          </div>
        </Col>

        <Col xs={24} sm={12}>
          <div>{textLabel}</div>
          <div style={textStyle}>{text}</div>
        </Col>
      </Row>
    );
  }
}

HeaderExtraContent.defaultProps = {
  textLabel: '描述',
  text: '',
  tileLabel: '时间',
  time: new Date(),
};

export { HeaderExtraContent };
