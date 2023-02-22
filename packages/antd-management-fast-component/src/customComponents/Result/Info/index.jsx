import { Result } from 'antd';
import React from 'react';

export function Info({ title, subTitle, extra, content = null }) {
  return (
    <Result title={title} subTitle={subTitle} extra={extra}>
      {content}
    </Result>
  );
}
