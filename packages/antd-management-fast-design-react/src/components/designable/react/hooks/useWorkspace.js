import { useContext } from 'react';
import { globalThisPolyfill } from '@designable/shared';

import { WorkspaceContext } from '../context';

import { useDesigner } from './useDesigner';

export const useWorkspace = (id) => {
  const designer = useDesigner();
  const context = useContext(WorkspaceContext);
  const workspaceId = id || context?.id;

  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId);
  }

  if (globalThisPolyfill['__DESIGNABLE_WORKSPACE__']) {
    return globalThisPolyfill['__DESIGNABLE_WORKSPACE__'];
  }

  return designer.workbench.currentWorkspace;
};
