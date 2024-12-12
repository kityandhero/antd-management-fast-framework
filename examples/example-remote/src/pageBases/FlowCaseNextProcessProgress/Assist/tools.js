import { flowCaseNextProcessProgressStatusCollection } from '../../../customConfig';

export function getFlowCaseNextProcessProgressStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseNextProcessProgressStatusCollection.normal: {
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
