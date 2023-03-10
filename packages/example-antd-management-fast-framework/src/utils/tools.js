import { getModelRemoteData } from 'easy-soft-dva';
import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { getLeftBarLogo, getLeftBarText } from 'antd-management-fast-common';

export function getSexName(value) {
  let result = '未知';

  switch (`${value}`) {
    case '1': {
      result = '男';
      break;
    }

    case '2': {
      result = '女';
      break;
    }

    default: {
      break;
    }
  }

  return result;
}

export function getLogo() {
  const { data } = {
    data: {},
    ...getModelRemoteData('global'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { logo } = {
    logo: '',
    ...platform,
  };

  return getLeftBarLogo(logo);
}

export function getTitle() {
  const { data } = {
    data: {},
    ...getModelRemoteData('global'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { shortName } = {
    shortName: '',
    ...platform,
  };

  if (checkStringIsNullOrWhiteSpace(shortName)) {
    return getLeftBarText();
  }

  return shortName;
}
