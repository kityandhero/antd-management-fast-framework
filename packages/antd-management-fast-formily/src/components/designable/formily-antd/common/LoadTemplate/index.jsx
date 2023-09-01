import React from 'react';

import { NodeActionsWidget } from 'antd-management-fast-design-react';

export const LoadTemplate = (properties) => {
  return (
    <NodeActionsWidget>
      {properties.actions?.map((action, key) => {
        return <NodeActionsWidget.Action {...action} key={key} />;
      })}
    </NodeActionsWidget>
  );
};
