import { Result } from 'antd';
import React from 'react';

export function Warn({ title, subTitle, extra, content = null }) {
  return (
    <Result status="warning" title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
