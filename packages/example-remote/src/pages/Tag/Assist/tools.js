import { getValueByKey, handleItem } from 'easy-soft-utility';

import { fieldData, statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.enable: {
      result = 'processing';
      break;
    }

    case statusCollection.disable: {
      result = 'warning';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}

export function handleItemWhetherRecommend({ target, handleData, remoteData }) {
  const tagId = getValueByKey({
    data: handleData,
    key: fieldData.tagId.name,
  });

  handleItem({
    target,
    value: tagId,
    compareValueHandler: (o) => {
      const { tagId: v } = o;

      return v;
    },
    handler: (d) => {
      const o = d;

      o[fieldData.whetherRecommend.name] = getValueByKey({
        data: remoteData,
        key: fieldData.whetherRecommend.name,
      });

      return d;
    },
  });
}

export function handleItemSort({ target, handleData, remoteData }) {
  const tagId = getValueByKey({
    data: handleData,
    key: fieldData.tagId.name,
  });

  handleItem({
    target,
    value: tagId,
    compareValueHandler: (o) => {
      const { tagId: v } = o;

      return v;
    },
    handler: (d) => {
      const o = d;

      o[fieldData.sort.name] = getValueByKey({
        data: remoteData,
        key: fieldData.sort.name,
      });

      return d;
    },
  });
}

export function handleItemType({ target, handleData, remoteData }) {
  const tagId = getValueByKey({
    data: handleData,
    key: fieldData.tagId.name,
  });

  handleItem({
    target,
    value: tagId,
    compareValueHandler: (o) => {
      const { tagId: v } = o;

      return v;
    },
    handler: (d) => {
      const o = d;

      o[fieldData.type.name] = getValueByKey({
        data: remoteData,
        key: fieldData.type.name,
      });

      return d;
    },
  });
}

export function handleItemStatus({ target, handleData, remoteData }) {
  const tagId = getValueByKey({
    data: handleData,
    key: fieldData.tagId.name,
  });

  handleItem({
    target,
    value: tagId,
    compareValueHandler: (o) => {
      const { tagId: v } = o;

      return v;
    },
    handler: (d) => {
      const o = d;

      o[fieldData.status.name] = getValueByKey({
        data: remoteData,
        key: fieldData.status.name,
      });

      return d;
    },
  });
}
