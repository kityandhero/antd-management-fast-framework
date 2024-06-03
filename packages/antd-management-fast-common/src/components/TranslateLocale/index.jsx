import React from 'react';

import { formatMessage } from '../../utils/meta';

/**
 * Translate Locale Component.
 * @function
 * @param {Object} option 配置项.
 * @param {string} option.id id.
 * @param {Object} option.style style object.
 * @example
 * <TranslateLocale key={itemKey} id={locale} />
 */
export function TranslateLocale({ id, style }) {
  return <div style={style}>{formatMessage({ id })}</div>;
}
