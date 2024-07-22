import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { getLeftBarText } from 'antd-management-fast-common';
import { buildMenuHeaderRender } from 'antd-management-fast-component';

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
