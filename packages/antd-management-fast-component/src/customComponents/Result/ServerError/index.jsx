import { Result } from 'antd';
import React from 'react';

export function ServerError({ title, subTitle, extra, content = null }) {
  return (
    <Result status="500" title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
