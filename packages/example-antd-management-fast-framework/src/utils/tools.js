import { getModelRemoteData } from 'antd-management-fast-common/es/utils/dva';
import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import { stringIsNullOrWhiteSpace } from 'antd-management-fast-common/es/utils/tools';

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

  return runtimeSettings.getLeftBarLogo(logo);
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
    return runtimeSettings.getLeftBarText();
  }

  return shortName;
}
