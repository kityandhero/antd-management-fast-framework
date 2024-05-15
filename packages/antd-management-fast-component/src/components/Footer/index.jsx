import React from 'react';
// eslint-disable-next-line import/named
import { DefaultFooter } from '@ant-design/pro-components';

import { getCopyright } from 'antd-management-fast-common';

const Footer = ({ links }) => {
  return (
    <div
      style={
        {
          // backgroundColor: '#f0f2f5',
        }
      }
    >
      <DefaultFooter copyright={getCopyright()} links={links} />
    </div>
  );
};

export { Footer };
