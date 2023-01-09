import React from 'react';
import { DefaultFooter } from '@ant-design/pro-components';

import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import IconInfo from 'antd-management-fast-component/es/customComponents/IconInfo';

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
    <DefaultFooter
      copyright={defaultFooterData.copyright}
      links={defaultFooterData.links}
    />
  );
};

export default Footer;
