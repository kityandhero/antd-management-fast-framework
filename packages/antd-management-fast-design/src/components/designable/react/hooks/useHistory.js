import { useWorkspace } from './useWorkspace';

export const useHistory = (workspaceId) => {
  const workspace = useWorkspace(workspaceId);
  return workspace?.history;
};
