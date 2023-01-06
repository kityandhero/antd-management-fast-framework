import { getModelRemoteData } from 'antd-management-fast-common/es/utils/dva';
import { stringIsNullOrWhiteSpace } from 'antd-management-fast-common/es/utils/tools';

import { defaultSettings } from '../defaultSettings';

export function getSexName(value) {
  let result = '未知';

  switch (`${value}`) {
    case '1':
      result = '男';
      break;

    case '2':
      result = '女';
      break;

    default:
      break;
  }

  return result;
}

export function getLogo() {
  const { data } = {
    ...{
      data: {},
    },
    ...getModelRemoteData('global'),
  };

  const { platform } = {
    ...{
      platform: { logo: '' },
    },
    ...(data || {}),
  };

  const { logo } = {
    ...{
      logo: '',
    },
    ...(platform || {}),
  };

  return defaultSettings.getLeftBarLogo(logo);
}

export function getTitle() {
  const { data } = {
    ...{
      data: {},
    },
    ...getModelRemoteData('global'),
  };

  const { platform } = {
    ...{
      platform: { logo: '' },
    },
    ...(data || {}),
  };

  const { shortName } = {
    ...{
      shortName: '',
    },
    ...(platform || {}),
  };

  if (stringIsNullOrWhiteSpace(shortName)) {
    return defaultSettings.getLeftBarText();
  }

  return shortName;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
