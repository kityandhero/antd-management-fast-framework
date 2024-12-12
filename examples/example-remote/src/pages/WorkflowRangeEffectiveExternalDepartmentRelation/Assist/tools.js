import { flowLineStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowLineStatusCollection.normal: {
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
