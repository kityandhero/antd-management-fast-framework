import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function singleTreeListWithDefaultProvinceAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'administrativeDivision/singleTreeListWithDefaultProvince',
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export async function refreshSingleTreeListWithDefaultProvinceCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'administrativeDivision/refreshSingleTreeListWithDefaultProvinceCache',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithDefaultCityAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'administrativeDivision/singleTreeListWithDefaultCity',
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export async function refreshSingleTreeListWithDefaultCityCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'administrativeDivision/refreshSingleTreeListWithDefaultCityCache',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithCrossingLevelAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'administrativeDivision/singleTreeListWithCrossingLevel',
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export async function refreshSingleTreeListWithCrossingLevelCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'administrativeDivision/refreshSingleTreeListWithCrossingLevelCache',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'administrativeDivision/refreshCache',
    params: {
      administrativeDivisionId: getValueByKey({
        data: handleData,
        key: fieldData.administrativeDivisionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
