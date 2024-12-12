import { flowCaseNextProcessNotificationStatusCollection } from '../../../customConfig';

export function getFlowCaseNextProcessNotificationStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseNextProcessNotificationStatusCollection.normal: {
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
