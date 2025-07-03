import { statusCollection, typeCollection } from '../Common/data';

export function getStatusBadge(status) {
  let result = 'default';

  switch (status) {
    case statusCollection.online: {
      result = 'processing';
      break;
    }

    case statusCollection.offline: {
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

export function getTypeName(type) {
  let result = 'default';

  switch (type) {
    case typeCollection.singleSelect: {
      result = '单选题';
      break;
    }

    case typeCollection.multiSelect: {
      result = '多选题';
      break;
    }

    case typeCollection.judgment: {
      result = '判断题';
      break;
    }

    default: {
      result = '未知题目类型';
      break;
    }
  }

  return result;
}
