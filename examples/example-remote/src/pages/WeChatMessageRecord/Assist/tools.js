import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'error';

  switch (status) {
    case statusCollection.yes: {
      result = 'success';
      break;
    }

    case statusCollection.no: {
      result = 'default';
      break;
    }

    default: {
      result = 'error';
      break;
    }
  }

  return result;
}
