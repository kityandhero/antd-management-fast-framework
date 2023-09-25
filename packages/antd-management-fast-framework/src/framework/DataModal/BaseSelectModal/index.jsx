import { isFunction, refitCommonData } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildFormSelect,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';

import { switchControlAssist } from '../../../utils/switchControlAssist';
import { BaseLoadModal } from '../BaseLoadModal';

const primaryCallName = 'DataModal::BaseSelectModal';

class BaseSelectModal extends BaseLoadModal {
  submitWithForm = false;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      currentRecord: null,
    };
  }

  supplementLoadRequestParams = (o) => {
    const { externalData } = this.props;

    return { ...o, ...externalData };
  };

  /**
   * 当可见性变为隐藏后附加的执行
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'executeAfterDoOtherWhenChangeVisibleToHide',
    );

    this.setState({
      currentRecord: null,
    });
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    return values;
  };

  getOtherButtonDisabled = () => {
    const { metaListData, currentRecord } = this.state;

    const optionCount = (metaListData || []).length;

    return optionCount === 0 || (currentRecord || null) == null;
  };

  onChange = (value, selectData, option, list) => {
    this.logCallTrack(
      {
        parameter: {
          value,
          selectData,
          option,
          list,
        },
      },
      primaryCallName,
      'onChange',
    );

    this.setState({
      currentRecord: selectData,
    });
  };

  handleOk = () => {
    this.logCallTrack({}, primaryCallName, 'handleOk');

    const { afterSelectSuccess } = this.props;

    if (isFunction(afterSelectSuccess)) {
      const { currentRecord } = this.state;

      afterSelectSuccess(currentRecord);
    }

    switchControlAssist.close(this.getVisibleFlag());
  };

  transferData = (o, index) => {
    return convertOptionOrRadioData(o, index);
  };

  establishFormAdditionalConfig = () => {
    this.logCallTrack({}, primaryCallName, 'establishFormAdditionalConfig');

    const { labelWidth } = this.props;

    return {
      labelCol: {
        flex: `${labelWidth}px`,
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  establishCardCollectionConfig = () => {
    this.logCallTrack({}, primaryCallName, 'establishCardCollectionConfig');

    const { label, helper } = this.props;
    const { metaListData } = this.state;

    this.logCallTrace({}, primaryCallName, 'transferData');

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              fieldData: {
                label: label,
                name: 'value',
                helper: helper,
              },
              component: buildFormSelect({
                label: label,
                name: 'value',
                list: refitCommonData(metaListData),
                dataConvert: this.transferData,
                onChange: this.onChange,
                helper: helper,
              }),
            },
          ],
        },
      ],
    };
  };
}

BaseSelectModal.defaultProps = {
  label: 'Label',
  helper: '',
  labelWidth: 80,
};

export { BaseSelectModal };
