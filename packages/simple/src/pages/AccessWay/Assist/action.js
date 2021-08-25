import { getPathValue, ellipsis } from 'antd-management-fast-framework/lib/utils/tools';

import { fieldData, mediaItemData } from '../Common/data';

export function setOnlineAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/setOnline',
    params: {
      accessWayId: getPathValue(record, fieldData.accessWayId.name),
    },
    getApiData: (props) => {
      const {
        areaAgent: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function setOnlineConfirmAction({ target, record, successCallback, successMessage }) {
  confirmActionCore({
    title: `设置为正在上线状态`,
    content: `将要设为正在上线状态，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      setOnlineAction({ target: t, record: r, successCallback: sc, successMessage });
    },
  });
}

export function setOfflineAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/setOnline',
    params: {
      accessWayId: getPathValue(record, fieldData.accessWayId.name),
    },
    getApiData: (props) => {
      const {
        areaAgent: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function setOfflineConfirmAction({ target, record, successCallback, successMessage }) {
  confirmActionCore({
    title: `设置为下线状态`,
    content: `将要设为下线状态，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      setOfflineAction({ target: t, record: r, successCallback: sc, successMessage });
    },
  });
}

export async function refreshCacheAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'accessWay/refreshCache',
    params: {
      areaAgentId: getPathValue(record, fieldData.areaAgentId.name),
    },
    getApiData: (props) => {
      const {
        areaAgent: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheConfirmAction({
  target,
  record,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `刷新缓存`,
    content: `即将刷新“${ellipsis(getPathValue(record, fieldData.name.name), 40)}”的缓存，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      refreshCacheAction({ target: t, record: r, successCallback: sc, successMessage });
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
