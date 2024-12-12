import { connect } from 'easy-soft-dva';
import { createDayJsDatetime, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { keyValueEditModeCollection } from '../../../customConfig';
import { buildKeyTag } from '../../../utils';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = '18caf3ff73694c7b9721f6d200b09bc0';

@connect(({ application, schedulingControl }) => ({
  application,
  schedulingControl,
}))
class UpdateKeyValueInfoModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  destroyOnClose = true;

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '设置应用键值信息',
      loadApiPath: 'application/get',
      submitApiPath: 'application/updateKeyValueInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    let d = this.supplementRequestParams(o);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const { externalData } = this.props;
    const { currentData, fieldData: targetFieldData } = externalData;

    let d = this.supplementRequestParams(o);

    if (targetFieldData != null) {
      d.tag = getValueByKey({
        data: currentData,
        key: buildKeyTag(targetFieldData.name),
        defaultValue: '',
      });
    }

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;
    const { currentData } = externalData;

    d.applicationId = getValueByKey({
      data: currentData,
      key: fieldData.applicationId.name,
    });

    return d;
  }

  buildFormLayout = () => {
    return 'vertical';
  };

  buildTitleSubTextPrefix = () => {
    return '当前应用';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
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
    const {
      externalData: { currentData, fieldData: targetFieldData },
      editMode,
    } = this.props;

    const values = {};

    if (targetFieldData != null) {
      switch (editMode) {
        case keyValueEditModeCollection.time: {
          values.value = getValueByKey({
            data: currentData,
            key: targetFieldData.name,
            convertBuilder: (v) => {
              if ((v || null) == null) {
                return null;
              }

              return createDayJsDatetime({
                datetime: v,
                format: 'YYYY-MM-DD HH:mm',
              });
            },
          });

          break;
        }

        default: {
          values.value = getValueByKey({
            data: currentData,
            key: targetFieldData.name,
          });
          break;
        }
      }
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const {
      externalData: { fieldData: targetFieldData },
      editMode,
    } = this.props;

    let editType = cardConfig.contentItemType.input;

    switch (editMode) {
      case keyValueEditModeCollection.time: {
        editType = cardConfig.contentItemType.timePicker;
        break;
      }

      case keyValueEditModeCollection.number: {
        editType = cardConfig.contentItemType.inputNumber;
        break;
      }

      case keyValueEditModeCollection.whether: {
        editType = cardConfig.contentItemType.whetherRadio;
        break;
      }

      default: {
        editType = cardConfig.contentItemType.input;
        break;
      }
    }

    const { label } = { label: '', ...targetFieldData };

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: editType,
              fieldData: {
                label,
                name: 'value',
                helper: '',
              },
            },
          ],
        },
      ],
    };
  };
}

export { UpdateKeyValueInfoModal };
