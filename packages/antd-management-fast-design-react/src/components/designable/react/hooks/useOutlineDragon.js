import { useOperation } from './useOperation';

export const useOutlineDragon = (workspaceId) => {
  const operation = useOperation(workspaceId);
  return operation?.outlineDragon;
};
