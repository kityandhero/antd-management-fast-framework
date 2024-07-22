import { getCopyright } from 'antd-management-fast-common';
import { iconBuilder, IconInfo } from 'antd-management-fast-component';

export const defaultFooterData = {
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
