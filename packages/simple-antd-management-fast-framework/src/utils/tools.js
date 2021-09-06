import { useIntl } from 'umi';

/**
 * 语言渲染封装器
 * @param {*} o 语言配置
 * @returns
 */
function FormatMessageWrapper(o) {
  const { formatMessage: formatMessageUseIntl } = useIntl();

  return formatMessageUseIntl(o);
}

/**
 * 语言渲染封装器
 * @param {*} o 语言配置
 * @returns
 */
export function formatMessage(o) {
  return FormatMessageWrapper(o);
}

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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
