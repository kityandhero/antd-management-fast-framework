import React from 'react';

import { formatMessage } from '../../utils/meta';

export function TranslateLocale({ id, style }) {
  return <div style={style}>{formatMessage({ id })}</div>;
}
