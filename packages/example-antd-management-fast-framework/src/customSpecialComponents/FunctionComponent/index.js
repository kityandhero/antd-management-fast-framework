import { useIntl } from 'umi';

function FormatMessageWrapper(o) {
  const { formatMessage: formatMessageUseIntl } = useIntl();

  return formatMessageUseIntl(o);
}

export function formatMessage(o) {
  return FormatMessageWrapper(o);
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
