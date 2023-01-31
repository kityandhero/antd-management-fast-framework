export function defaultBaseState() {
  return {
    dataLoading: false,
    processing: false,
    reloading: false,
    searching: false,
    refreshing: false,
    paging: false,
    firstLoadSuccess: false,
    loadSuccess: false,
    urlParams: null,
    externalData: null,
  };
}

export function defaultCoreState() {
  const data = { ...defaultBaseState(), ...{ dataLoading: true } };

  return data;
}

export function defaultCommonState() {
  const data = {
    ...defaultCoreState(),
    ...{
      loadApiPath: '',
      pageName: '',
      metaData: null,
      metaExtra: null,
      metaListData: [],
      metaOriginalData: null,
    },
  };

  return data;
}

export function defaultListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      dateRangeFieldName: '发生时间',
      tableScroll: { x: 1520 },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTimeAlias: '',
      endTimeAlias: '',
      startTime: '',
      endTime: '',
      listViewMode: listViewConfig.viewMode.table,
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultPageListState() {
  const data = {
    ...defaultCommonState(),
    ...{
      paramsKey: '',
      loadApiPath: '',
      dateRangeFieldName: '发生时间',
      tableScroll: { x: 1520 },
      formValues: {},
      pageNo: 1,
      pageSize: 10,
      startTime: '',
      endTime: '',
      listViewMode: listViewConfig.viewMode.table,
      showSelect: false,
      selectedDataTableDataRows: [],
    },
  };

  return data;
}

export function defaultFormState() {
  const data = {
    ...defaultCommonState(),
    ...{ errorFieldName: '', submitApiPath: '' },
  };

  return data;
}
