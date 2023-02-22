import { Result } from 'antd';
import React from 'react';

export function Forbidden({ title, subTitle, extra, content = null }) {
  return (
    <Result status="403" title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
