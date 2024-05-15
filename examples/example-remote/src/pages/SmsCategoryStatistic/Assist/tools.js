export function supplementPlanSaleId(o, properties) {
  const { externalData } = properties;
  const { smsCategoryStatisticId } = externalData;

  const result = { ...o, smsCategoryStatisticId: smsCategoryStatisticId || '' };

  return result;
}
