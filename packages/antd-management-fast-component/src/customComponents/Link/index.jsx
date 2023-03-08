import { Typography } from 'antd';
import React from 'react';

import { checkStringIsNullOrWhiteSpace } from 'easy-soft-utility';

import { MemoFunction } from '../MemoFunction';

const { Link: LineItem } = Typography;

function LinkCore({ href = '', target = '', children }) {
  const p = {
    ...(checkStringIsNullOrWhiteSpace(href) ? {} : { href }),
    ...(checkStringIsNullOrWhiteSpace(target) ? {} : { target }),
  };

  return <LineItem {...p}>{children}</LineItem>;
}

const Link = MemoFunction(LinkCore);

export { Link };
