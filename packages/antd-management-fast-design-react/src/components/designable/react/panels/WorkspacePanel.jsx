import React from 'react';

import { usePrefix } from '../hooks';

const WorkspacePanelInner = (properties) => {
  const prefix = usePrefix('workspace-panel');

  return <div className={prefix}>{properties.children}</div>;
};

const Item = (properties) => {
  const prefix = usePrefix('workspace-panel-item');

  return (
    <div
      className={prefix}
      style={{
        ...properties.style,
        flexGrow: properties.flexable ? 1 : 0,
        flexShrink: properties.flexable ? 1 : 0,
      }}
    >
      {properties.children}
    </div>
  );
};

WorkspacePanelInner.Item = Item;

export const WorkspacePanel = WorkspacePanelInner;
