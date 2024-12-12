export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseFormStorageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseFormStorageId } = currentState;

  const { workflowDebugCaseFormStorageId: workflowDebugCaseFormStorageIdPre } =
    preState;

  return workflowDebugCaseFormStorageIdPre !== workflowDebugCaseFormStorageId;
}
