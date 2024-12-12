import { flowNodeApproverStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowNodeApproverStatusCollection.normal: {
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
