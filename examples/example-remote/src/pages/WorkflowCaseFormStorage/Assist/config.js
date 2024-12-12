export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseFormStorageId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseFormStorageId } = currentState;

  const { workflowId: workflowCaseFormStorageIdPre } = preState;

  return workflowCaseFormStorageIdPre !== workflowCaseFormStorageId;
}
