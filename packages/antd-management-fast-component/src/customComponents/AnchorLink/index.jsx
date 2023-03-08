import { Typography } from 'antd';
import React from 'react';

import { MemoFunction } from '../MemoFunction';

const { Link } = Typography;

function LinkCore(properties) {
  const { children } = properties;

  return <Link {...properties}>{children}</Link>;
}

const AnchorLink = MemoFunction(LinkCore);

export { AnchorLink };
