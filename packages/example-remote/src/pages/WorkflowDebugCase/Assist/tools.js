import { flowCaseStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseStatusCollection.created: {
      result = 'default';
      break;
    }

    case flowCaseStatusCollection.inApprovalProcess: {
      result = 'processing';
      break;
    }

    case flowCaseStatusCollection.refuse: {
      result = 'warning';
      break;
    }

    case flowCaseStatusCollection.success: {
      result = 'success';
      break;
    }

    default: {
      result = 'default';
      break;
    }
  }

  return result;
}
