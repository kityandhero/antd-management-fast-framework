import {
  defaultFormState,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';

import { DataCore } from '../DataCore';

const primaryCallName = 'DataSingleView::DataLoad';

/**
 * data load
 * @namespace framework.DataSingleView
 * @class DataLoad
 * @extends DataCore
 */
class DataLoad extends DataCore {
  constructor(properties) {
    super(properties);

    this.lastLoadParams = null;

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
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

    if (
      (previousOp === 'load' && op === 'update') ||
      this.checkNeedUpdate(preProperties, preState, snapshot)
    ) {
      this.reloadData({});
    }
  };

  /**
   * 加载数据成功后执行。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   */
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
      primaryCallName,
      'afterLoadSuccess',
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

  /**
   * 加载数据成功后的额外执行逻辑，在 afterLoadSuccess 调用后触发。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   * @example
   * doOtherAfterLoadSuccess = () => {}
   */
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

  /**
   * 填充数据。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   */
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
      primaryCallName,
      'fillData',
      this.useFormWrapper ? '' : 'current useFormWrapper set to false ignore',
    );

    if (!this.useFormWrapper) {
      return;
    }

    this.logCallTrace(
      {},
      primaryCallName,
      'fillData',
      'trigger',
      'buildInitialValues',
    );

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    this.logCallTrace(
      {},
      primaryCallName,
      'fillData',
      'trigger',
      'getTargetForm',
    );

    const form = this.getTargetForm();

    if (form != null) {
      form.setFieldsValue(initialValues);

      this.logCallTrace(
        {},
        primaryCallName,
        'fillData',
        'trigger',
        'afterFillForm',
      );

      this.afterFillForm({
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      });
    }
  };

  /**
   * 填充数据后触发逻辑。
   * @function
   * @param {*} option 配置项。
   * @param {Object} option.metaData 单体数据。
   * @param {Array} option.metaListData 列表数据。
   * @param {Object} option.metaExtra 额外数据。
   * @param {Object} option.metaOriginalData 原始数据。
   * @example
   * afterFillForm = () => {}
   */
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
