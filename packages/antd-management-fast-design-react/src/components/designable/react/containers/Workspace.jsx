import React, { Fragment, useMemo, useRef } from 'react';

import { WorkspaceContext } from '../context';
import { useDesigner } from '../hooks';

export const Workspace = ({ id, title, description, ...properties }) => {
  const oldId = useRef();
  const designer = useDesigner();

  const workspace = useMemo(() => {
    if (!designer) return;

    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current);

      if (old) {
        old.viewport.detachEvents();
      }
    }

    const workspace = {
      id: id || 'index',
      title,
      description,
    };

    designer.workbench.ensureWorkspace(workspace);

    oldId.current = workspace.id;

    return workspace;
  }, [id, designer]);

  return (
    <Fragment>
      <WorkspaceContext.Provider value={workspace}>
        {properties.children}
      </WorkspaceContext.Provider>
    </Fragment>
  );
};
