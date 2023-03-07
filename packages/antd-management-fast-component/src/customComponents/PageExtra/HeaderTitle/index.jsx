import React from 'react';

import { isArray, toString } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { IconInfo } from '../../IconInfo';

class HeaderTitle extends BaseComponent {
  renderFurther() {
    const { title, titlePrefix } = this.props;

    let nameList = [];

    nameList = isArray(title)
      ? title.map((o, index) => ({
          key: `title_${index}`,
          text: toString(o),
        }))
      : [
          {
            key: `title_1`,
            text: toString(title),
          },
        ];

    return (
      <span
        style={{
          display: 'block',
          maxWidth: '700px',
          height: '32px',
          overflow: 'hidden',
          lineHeight: '32px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        <IconInfo
          style={{
            fontSize: '18px',
          }}
          textPrefix={titlePrefix}
          text={
            <>
              {nameList.map((o) => (
                <span key={o.key}>{o.text}</span>
              ))}
            </>
          }
          separatorStyle={{
            paddingRight: '5px',
          }}
          ellipsis
        />
      </span>
    );
  }
}

HeaderTitle.defaultProps = {
  title: '',
  titlePrefix: '',
};

export { HeaderTitle };
