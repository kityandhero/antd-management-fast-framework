import { flowCaseStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseStatusCollection.inApprovalProcess: {
      result = 'processing';
      break;
    }

    case flowCaseStatusCollection.refuse: {
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
