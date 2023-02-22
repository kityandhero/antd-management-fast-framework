import { Result } from 'antd';
import React from 'react';

export function Success({ title, subTitle, extra, content = null }) {
  return (
    <Result status="success" title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
