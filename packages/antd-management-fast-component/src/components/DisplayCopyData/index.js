import React from 'react';

import { copyToClipboard } from 'antd-management-fast-common';

import { BaseComponent } from '../../bases';
import { AnchorLink } from '../AnchorLink';

class DisplayCopyData extends BaseComponent {
  static defaultProps = {
    label: '',
    data: null,
    copyMode: 'button',
  };

  renderFurther() {
    const { data, copyMode } = this.props;

    if (copyMode === 'click') {
      return (
        <span
          onClick={() => {
            copyToClipboard(data);
          }}
        >
          {data}
        </span>
      );
    }

    if (copyMode === 'button') {
      return (
        <>
          {data}
          {(data || null) === null ? null : (
            <AnchorLink
              style={{ marginLeft: '10px' }}
              onClick={() => {
                copyToClipboard(data);
              }}
            >
              [复制]
            </AnchorLink>
          )}
        </>
      );
    }

    return <>{data}</>;
  }
}

export { DisplayCopyData };
