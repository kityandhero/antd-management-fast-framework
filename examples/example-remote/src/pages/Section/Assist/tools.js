import { toNumber } from 'easy-soft-utility';

import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  const statusAdjust = toNumber(status);

  switch (statusAdjust) {
    case statusCollection.online: {
      result = 'processing';
      break;
    }

    case statusCollection.offline: {
      result = 'error';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}
