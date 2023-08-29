import { useWorkspace } from './useWorkspace';

export const useOutline = (workspaceId) => {
  const workspace = useWorkspace(workspaceId);
  return workspace?.outline;
};
