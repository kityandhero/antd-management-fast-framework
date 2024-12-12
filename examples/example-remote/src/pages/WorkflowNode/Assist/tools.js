import { flowNodeStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowNodeStatusCollection.normal: {
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
