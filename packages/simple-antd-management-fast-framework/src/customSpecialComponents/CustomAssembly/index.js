import { stringIsNullOrWhiteSpace } from 'antd-management-fast-common/es/utils/tools';
import { buildMenuHeaderRender } from 'antd-management-fast-component/es/customComponents/FunctionComponent';
import { iconBuilder } from 'antd-management-fast-component/es/customComponents/Icon';
import IconInfo from 'antd-management-fast-component/es/customComponents/IconInfo';

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

  if (stringIsNullOrWhiteSpace(shortNameData)) {
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
