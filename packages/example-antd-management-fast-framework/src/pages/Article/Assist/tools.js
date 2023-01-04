import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.online:
      result = 'processing';
      break;

    case statusCollection.offline:
      result = 'warning';
      break;

    default:
      result = 'default';
      break;
  }

  return result;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
