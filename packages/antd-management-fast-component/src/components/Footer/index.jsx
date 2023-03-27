import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';

import { getCopyright } from 'antd-management-fast-common/src';

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
