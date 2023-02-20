import React from 'react';
import { DefaultFooter } from '@ant-design/pro-components';

import { getCopyright } from 'antd-management-fast-common/src';
import { iconBuilder, IconInfo } from 'antd-management-fast-component';

function getDefaultFooterData() {
  return {
    copyright: getCopyright(),
    links: [
      {
        key: 'user',
        title: <IconInfo icon={iconBuilder.team()} text="个人中心" />,
        href: '/#/person/listRegUser',
        blankTarget: false,
      },
    ],
  };
}

const Footer = () => {
  const defaultFooterData = getDefaultFooterData();

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
