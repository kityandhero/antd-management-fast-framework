export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowRangeEffectiveSubsidiaryRelationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowRangeEffectiveSubsidiaryRelationId } = currentState;

  const {
    workflowRangeEffectiveSubsidiaryRelationId:
      workflowRangeEffectiveSubsidiaryRelationIdPre,
  } = preState;

  return (
    workflowRangeEffectiveSubsidiaryRelationIdPre !==
    workflowRangeEffectiveSubsidiaryRelationId
  );
}
