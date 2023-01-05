import React from 'react';

import { copyToClipboard } from 'antd-management-fast-common/es/utils/tools';

import BaseComponent from '../BaseComponent';

class DisplayCopyData extends BaseComponent {
  static defaultProps = {
    label: '',
    data: null,
    copyMode: 'button',
  };

  render() {
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
            <a
              style={{ marginLeft: '10px' }}
              onClick={() => {
                copyToClipboard(data);
              }}
            >
              [复制]
            </a>
          )}
        </>
      );
    }

    return <>{data}</>;
  }
}

export default DisplayCopyData;
