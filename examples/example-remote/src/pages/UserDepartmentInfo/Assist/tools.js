import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.normal: {
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
