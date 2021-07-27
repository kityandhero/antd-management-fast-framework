import { getDerivedStateFromPropsForUrlParams, defaultFormState } from '@/utils/tools';

import DataCore from '../DataCore';

class DataLoad extends DataCore {
  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        showReloadButton: true,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParamsPrev } = preState;

    if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
      return;
    }

    const { op } = urlParams;

    const { op: prevOp } = urlParamsPrev;

    const { dataLoading } = this.state;

    if (!dataLoading) {
      if (
        (prevOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProps, preState, snapshot)
      ) {
        if (this.reloadByUrlOp) {
          this.reloadData();
        }
      }
    }
  };

  afterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {
    this.fillForm(metaData, metaListData, metaExtra, metaOriginalData);

    this.doOtherAfterLoadSuccess(metaData, metaListData, metaExtra, metaOriginalData);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  doOtherAfterLoadSuccess = (metaData, metaListData, metaExtra, metaOriginalData) => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fillForm = (metaData, metaListData, metaExtra, metaOriginalData) => {
    const initialValues = this.buildInitialValues(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    );

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(initialValues);

      this.afterFillForm(metaData, metaListData, metaExtra, metaOriginalData);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterFillForm = (metaData, metaListData, metaExtra, metaOriginalData) => {};
}

export default DataLoad;
