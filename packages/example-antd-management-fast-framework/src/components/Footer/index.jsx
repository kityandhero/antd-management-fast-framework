import React from 'react';
import { DefaultFooter } from '@ant-design/pro-components';

import { runtimeSettings } from 'antd-management-fast-common';
import { iconBuilder, IconInfo } from 'antd-management-fast-component';

const defaultFooterData = {
  copyright: runtimeSettings.getCopyright(),
  links: [
    {
      key: 'user',
      title: <IconInfo icon={iconBuilder.team()} text="个人中心" />,
      href: '/#/person/listRegUser',
      blankTarget: false,
    },
  ],
};

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: '#f0f2f5',
      }}
    >
      <DefaultFooter
        copyright={defaultFooterData.copyright}
        links={defaultFooterData.links}
      />
    </div>
  );
};

export default Footer;
