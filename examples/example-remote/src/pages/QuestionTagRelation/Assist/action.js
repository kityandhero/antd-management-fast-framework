import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'questionTagRelation/add',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addBatchAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'questionTagRelation/addBatch',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
      }),
      tagIdCollection: getValueByKey({
        data: handleData,
        key: 'tagIdCollection',
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'questionTagRelation/remove',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
      }),
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
        defaultValue: '',
      }),
    },
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
    api: 'questionTagRelation/refreshCache',
    params: {
      questionTagRelationId: getValueByKey({
        data: handleData,
        key: fieldData.questionTagRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
