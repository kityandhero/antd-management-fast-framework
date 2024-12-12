import { flowCaseNextProcessApproveStatusCollection } from '../../../customConfig';

export function getFlowCaseNextProcessApproveStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseNextProcessApproveStatusCollection.normal: {
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
