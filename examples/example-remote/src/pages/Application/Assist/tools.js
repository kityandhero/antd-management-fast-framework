import { getValueByKey } from 'easy-soft-utility';

import { fieldData, statusCollection } from '../Common/data';

export function supplementApplicationId(o, properties) {
  const { externalData } = properties;

  const applicationId = getValueByKey({
    data: externalData,
    key: fieldData.applicationId.name,
  });

  const result = { ...o, applicationId: applicationId };

  return result;
}

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.start: {
      result = 'processing';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}
