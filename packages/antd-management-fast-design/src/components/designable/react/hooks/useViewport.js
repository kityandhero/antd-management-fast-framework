import { useWorkspace } from './useWorkspace';

export const useViewport = (workspaceId) => {
  const workspace = useWorkspace(workspaceId);
  return workspace?.viewport;
};
