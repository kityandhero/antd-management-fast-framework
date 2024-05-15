import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.normal: {
      result = 'processing';
      break;
    }

    case statusCollection.invalid: {
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
