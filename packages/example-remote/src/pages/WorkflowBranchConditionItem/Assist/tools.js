import { flowStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowStatusCollection.enable: {
      result = 'processing';
      break;
    }

    case flowStatusCollection.disable: {
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
