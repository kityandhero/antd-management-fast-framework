export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { workflowRangeEffectiveExternalDepartmentRelationId: id };
}

// eslint-disable-next-line no-unused-vars
export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { workflowRangeEffectiveExternalDepartmentRelationId } = currentState;

  const {
    workflowRangeEffectiveExternalDepartmentRelationId:
      workflowRangeEffectiveExternalDepartmentRelationIdPre,
  } = preState;

  return (
    workflowRangeEffectiveExternalDepartmentRelationIdPre !==
    workflowRangeEffectiveExternalDepartmentRelationId
  );
}
