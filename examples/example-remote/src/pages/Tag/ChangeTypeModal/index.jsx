import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormTagTypeSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '2a5bc9dad0c64b20bc9370ad8d8463d8';

@connect(({ tag, schedulingControl }) => ({
  tag,
  schedulingControl,
}))
class ChangeTypeModal extends BaseUpdateModal {
  showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '适用类别设置',
      loadApiPath: 'tag/get',
      submitApiPath: 'tag/updateType',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { tagId } = externalData;

    d.tagId = tagId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.tagId.name] = getValueByKey({
      data: externalData,
      key: fieldData.tagId.name,
    });

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData = null,
    // eslint-disable-next-line no-unused-vars
    listData = [],
    // eslint-disable-next-line no-unused-vars
    extraData = null,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData = null,
    // eslint-disable-next-line no-unused-vars
    submitData = null,
  ) => {
    return `排序值更新成功。`;
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '80px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.name.name,
    });
  };

  fillInitialValuesAfterLoad = ({
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.type.name] = getValueByKey({
        data: metaData,
        key: fieldData.type.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormTagTypeSelect({}),
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export { ChangeTypeModal };
