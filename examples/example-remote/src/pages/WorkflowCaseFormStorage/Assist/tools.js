import { flowCaseFormStorageStatusCollection } from '../../../customConfig';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case flowCaseFormStorageStatusCollection.normal: {
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
