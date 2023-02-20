import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { getCopyright, getLeftBarText } from 'antd-management-fast-common';
import {
  buildMenuHeaderRender,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

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

export function menuHeaderRender(logoDom, config) {
  const { currentOperator } = {
    currentOperator: { platform: { shortName: '' } },
  };

  const { platform } = {
    platform: { shortName: '' },
    ...currentOperator,
  };

  const { shortName } = { shortName: '', ...platform };

  let shortNameData = shortName;

  if (checkStringIsNullOrWhiteSpace(shortNameData)) {
    shortNameData = getLeftBarText();
  }

  const {
    collapsed,
    settings: { navTheme },
  } = config;

  return buildMenuHeaderRender({
    logoDom,
    collapsed,
    navTheme,
    shortName: shortNameData,
  });
}
