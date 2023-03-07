import { Typography } from 'antd';
import React from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { VerticalBox } from '../../VerticalBox';

const { Text } = Typography;

class HeaderSubTitle extends BaseComponent {
  renderFurther() {
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
