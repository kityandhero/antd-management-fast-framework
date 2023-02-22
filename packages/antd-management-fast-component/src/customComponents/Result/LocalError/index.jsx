import { Result } from 'antd';
import React from 'react';

export function LocalError({ title, subTitle, extra, content = null }) {
  return (
    <Result status="error" title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
