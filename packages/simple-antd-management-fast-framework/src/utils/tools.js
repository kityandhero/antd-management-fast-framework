export function getSexName(value) {
  let result = '未知';

  switch (`${value}`) {
    case '1':
      result = '男';
      break;

    case '2':
      result = '女';
      break;

    default:
      break;
  }

  return result;
}
