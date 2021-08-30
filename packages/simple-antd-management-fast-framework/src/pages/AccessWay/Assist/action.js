import { getPathValue, ellipsis } from 'antd-management-fast-framework/lib/utils/tools';
import {
  actionCore,
  confirmActionCore,
} from 'antd-management-fast-framework/lib/utils/actionAssist';

import { fieldData } from '../Common/data';

export function setOnlineAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/setOnline',
    params: {
      accessWayId: getPathValue(handleData, fieldData.accessWayId.name),
    },
    getApiData: (props) => {
      const {
        accessWay: { data },
      } = props;

      return data;
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setOnlineConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `设置为正在上线状态`,
    content: `将要设为正在上线状态，确定吗？`,
    target,
    handleData,
    successCallback,
    okAction: ({ target: t, handleData: r, successCallback: sc }) => {
      setOnlineAction({ target: t, handleData: r, successCallback: sc, successMessage });
    },
  });
}

export function setOfflineAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/setOffline',
    params: {
      accessWayId: getPathValue(handleData, fieldData.accessWayId.name),
    },
    getApiData: (props) => {
      const {
        accessWay: { data },
      } = props;

      return data;
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setOfflineConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `设置为下线状态`,
    content: `将要设为下线状态，确定吗？`,
    target,
    handleData,
    successCallback,
    okAction: ({ target: t, handleData: r, successCallback: sc }) => {
      setOfflineAction({ target: t, handleData: r, successCallback: sc, successMessage });
    },
  });
}

export async function refreshCacheAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/refreshCache',
    params: {
      accessWayId: getPathValue(handleData, fieldData.accessWayId.name),
    },
    getApiData: (props) => {
      const {
        accessWay: { data },
      } = props;

      return data;
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `刷新缓存`,
    content: `即将刷新“${ellipsis(
      getPathValue(handleData, fieldData.name.name),
      40,
    )}”的缓存，确定吗？`,
    target,
    handleData,
    successCallback,
    okAction: ({ target: t, handleData: r, successCallback: sc }) => {
      refreshCacheAction({ target: t, handleData: r, successCallback: sc, successMessage });
    },
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