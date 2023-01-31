import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import {
  buildMenuHeaderRender,
  iconBuilder,
  IconInfo,
} from 'antd-management-fast-component';

import { defaultSettings } from '@/defaultSettings';

export const defaultFooterData = {
  copyright: defaultSettings.getCopyright(),
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
  const { global } = config;
  const { currentOperator } = {
    ...{
      currentOperator: { platform: { shortName: '' } },
    },
    ...(metaData || {}),
  };

  const { platform } = {
    ...{ platform: { shortName: '' } },
    ...(currentOperator || {}),
  };

  const { shortName } = { ...{ shortName: '' }, ...(platform || {}) };

  let shortNameData = shortName;

  if (checkStringIsNullOrWhiteSpace(shortNameData)) {
    shortNameData = defaultSettings.getLeftBarText();
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
