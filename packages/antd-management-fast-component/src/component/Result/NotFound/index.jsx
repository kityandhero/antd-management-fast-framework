import { Result } from 'antd';
import React from 'react';

export function NotFound({ title, subTitle, extra, content = null }) {
  return (
    <Result status="404" title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
