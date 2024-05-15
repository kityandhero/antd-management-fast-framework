export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowDebugCaseFormAttachmentId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowDebugCaseFormAttachmentId } = currentState;

  const {
    workflowDebugCaseFormAttachmentId: workflowDebugCaseFormAttachmentIdPre,
  } = preState;

  return (
    workflowDebugCaseFormAttachmentIdPre !== workflowDebugCaseFormAttachmentId
  );
}
