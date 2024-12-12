import { showSimpleInfoMessage } from 'easy-soft-utility';

import { statusCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.start: {
      result = 'processing';
      break;
    }

    case statusCollection.stop: {
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

export function showOperateMessage() {
  const text = '操作需要一段时间生效，请等待片刻后查看!';

  showSimpleInfoMessage(text);
}
