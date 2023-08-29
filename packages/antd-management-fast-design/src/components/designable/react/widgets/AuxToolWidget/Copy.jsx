import { Button } from 'antd';
import React from 'react';

import { useOperation, usePrefix } from '../../hooks';
import { IconWidget } from '../IconWidget';

export const Copy = ({ node, style }) => {
  const operation = useOperation();
  const prefix = usePrefix('aux-copy');
  if (node === node.root) return null;
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        operation.cloneNodes([node]);
      }}
    >
      <IconWidget infer="Clone" />
    </Button>
  );
};

Copy.displayName = 'Copy';
