export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowCaseFormAttachmentId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowCaseFormAttachmentId } = currentState;

  const { workflowCaseFormAttachmentId: workflowCaseFormAttachmentIdPre } =
    preState;

  return workflowCaseFormAttachmentIdPre !== workflowCaseFormAttachmentId;
}
