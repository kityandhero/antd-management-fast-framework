import React, { Fragment } from 'react';
import { observer } from '@formily/reactive-react';

export const NodeTitleWidget = observer((properties) => {
  const takeNode = () => {
    const node = properties.node;
    if (node?.componentName === '$$ResourceNode$$') {
      return node.children[0];
    }
    return node;
  };
  const node = takeNode();
  return (
    <Fragment>{node?.getMessage('title') || node?.componentName}</Fragment>
  );
});
