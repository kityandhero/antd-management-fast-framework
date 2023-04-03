import { mergeTextMessage } from 'easy-soft-utility';

import {
  defaultFormState,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';

import { DataCore } from '../DataCore';

class DataLoad extends DataCore {
  constructor(properties) {
    super(properties);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,

      showReloadButton: true,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
    );
  }

  doOtherWhenChangeVisibleToShow = (preProperties, preState, snapshot) => {
    const { urlParams } = this.state;

    const { urlParams: urlParametersPrevious } = preState;

    if (
      (urlParams || null) == null ||
      (urlParametersPrevious || null) == null
    ) {
      return;
    }

    const { op } = urlParams;

    const { op: previousOp } = urlParametersPrevious;

    const { dataLoading } = this.state;

    if (
      !dataLoading &&
      ((previousOp === 'load' && op === 'update') ||
        this.checkNeedUpdate(preProperties, preState, snapshot)) &&
      this.reloadByUrlOp
    ) {
      this.reloadData({});
    }
  };

  afterLoadSuccess = ({
    metaData,
    metaListData,
    metaExtra,
    metaOriginalData,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      mergeTextMessage('DataSingleView::DataLoad', 'afterLoadSuccess'),
    );

    this.fillData({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    this.doOtherAfterLoadSuccess({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });
  };

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {};

  fillData = ({
    metaData = null,
    metaListData = [],
    metaExtra = null,
    metaOriginalData = null,
  }) => {
    this.logCallTrack(
      {
        parameter: {
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        },
      },
      mergeTextMessage('DataSingleView::DataLoad', 'fillData'),
    );

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(initialValues);

      this.afterFillForm({
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      });
    }
  };

  afterFillForm = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {};
}

export { DataLoad };
