export function getResolveBadge(v) {
  let result = 'default';

  switch (v) {
    case 1: {
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
