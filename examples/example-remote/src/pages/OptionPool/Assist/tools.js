import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.enable: {
      result = 'success';
      break;
    }

    case statusCollection.disable: {
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
