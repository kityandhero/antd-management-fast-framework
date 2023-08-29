import React from 'react';

import { Simulator } from '../containers';

import { WorkspacePanel } from './WorkspacePanel';

export const ViewportPanel = (properties) => {
  return (
    <WorkspacePanel.Item {...properties} flexable>
      <Simulator>{properties.children}</Simulator>
    </WorkspacePanel.Item>
  );
};
