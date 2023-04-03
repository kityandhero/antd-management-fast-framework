import { Typography } from 'antd';
import React, { PureComponent } from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { VerticalBox } from '../../VerticalBox';

const { Text } = Typography;

class HeaderSubTitle extends PureComponent {
  render() {
    const { text } = this.props;

    if (checkStringIsNullOrWhiteSpace(text)) {
      return null;
    }

    return (
      <VerticalBox
        style={{
          height: '31px',
          paddingBottom: '1px',
        }}
        align="bottom"
      >
        <Text style={{ color: '#888' }}>{text}</Text>
      </VerticalBox>
    );
  }
}

HeaderSubTitle.defaultProps = {
  text: '',
};

export { HeaderSubTitle };
