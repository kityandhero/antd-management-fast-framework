import { aggregateCollection, statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.failSend: {
      result = 'error';
      break;
    }

    case statusCollection.alreadySend: {
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

export function getAggregateBadge(status) {
  let result = 'default';

  switch (status) {
    case aggregateCollection.alreadyAggregate: {
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
