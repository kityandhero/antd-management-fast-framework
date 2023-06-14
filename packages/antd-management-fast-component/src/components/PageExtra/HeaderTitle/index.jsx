import React, { PureComponent } from 'react';

import { IconInfo } from '../../IconInfo';
import { VerticalBox } from '../../VerticalBox';

class HeaderTitle extends PureComponent {
  render() {
    const { title, titlePrefix } = this.props;

    return (
      <div
        style={{
          display: 'block',
          maxWidth: '700px',
          height: '32px',
          overflow: 'hidden',
          // lineHeight: '32px',
          // whiteSpace: 'nowrap',
          // textOverflow: 'ellipsis',
        }}
      >
        <VerticalBox>
          <IconInfo
            block
            style={{
              fontSize: '18px',
            }}
            textPrefix={titlePrefix}
            text={title}
            separatorStyle={{
              paddingRight: '5px',
            }}
            ellipsis
          />
        </VerticalBox>
      </div>
    );
  }
}

HeaderTitle.defaultProps = {
  title: '',
  titlePrefix: '',
};

export { HeaderTitle };
