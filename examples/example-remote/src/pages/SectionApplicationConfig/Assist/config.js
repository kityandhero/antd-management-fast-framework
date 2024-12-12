export function parseUrlParametersForSetState({ urlParams }) {
  const { id } = urlParams;

  return { sectionApplicationConfig: id };
}

export function checkNeedUpdateAssist(
  currentState,
  preProperties,
  preState,
  // eslint-disable-next-line no-unused-vars
  snapshot,
) {
  const { sectionApplicationConfig } = currentState;

  const { sectionApplicationConfig: sectionApplicationConfigPre } = preState;

  return sectionApplicationConfigPre !== sectionApplicationConfig;
}
