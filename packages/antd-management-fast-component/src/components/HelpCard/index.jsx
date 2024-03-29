import { Card } from 'antd';
import React, { PureComponent } from 'react';

import { HelpBox } from '../HelpBox';

class HelpCard extends PureComponent {
  render() {
    const { border, compact, helpBoxProps } = this.props;

    return (
      <Card
        style={
          border
            ? {}
            : {
                borderTop: '0',
                borderBottom: '0',
                borderLeft: '0',
                borderRight: '0',
              }
        }
        styles={{
          body: compact
            ? {
                paddingTop: '0',
                paddingBottom: '0',
              }
            : {
                paddingTop: '12px',
                paddingBottom: '12px',
              },
        }}
      >
        <HelpBox {...helpBoxProps} />
      </Card>
    );
  }
}

HelpCard.defaultProps = {
  border: true,
  compact: false,
  helpBoxProps: {
    title: '帮助信息',
    showNumber: true,
    list: [],
  },
};

export { HelpCard };
