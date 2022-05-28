import { defaultSettings } from '@/defaultSettings';
import { TeamOutlined } from '@ant-design/icons';
import { buildMenuHeaderRender } from 'antd-management-fast-framework/es/customComponents/FunctionComponent';
import IconInfo from 'antd-management-fast-framework/es/customComponents/IconInfo';
import { stringIsNullOrWhiteSpace } from 'antd-management-fast-framework/es/utils/tools';

export const defaultFooterData = {
  copyright: defaultSettings.getCopyright(),
  links: [
    {
      key: 'user',
      title: <IconInfo icon={<TeamOutlined />} text="个人中心" />,
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
    ...(global || {}),
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

  return buildMenuHeaderRender({ logoDom, collapsed, navTheme, shortName: shortNameData });
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
