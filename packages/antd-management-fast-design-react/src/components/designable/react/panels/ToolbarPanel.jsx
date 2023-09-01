import React from 'react';

import { WorkspacePanel } from './WorkspacePanel';

export const ToolbarPanel = (properties) => {
  const WorkspacePanelItem = WorkspacePanel.Item;
  return (
    <WorkspacePanelItem
      {...properties}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 4,
        padding: '0 4px',
        ...properties.style,
      }}
    >
      {properties.children}
    </WorkspacePanelItem>
  );
};
