import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData, fieldDataMapConfig } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '24ed28a2d0cb4c47b772ee254754c63c';

@connect(({ yonYouImportHistory, schedulingControl }) => ({
  yonYouImportHistory,
  schedulingControl,
}))
class SetMapConfigModal extends BaseUpdateModal {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑信息',
      loadApiPath: 'yonYouImportHistory/get',
      submitApiPath: 'yonYouImportHistory/setMapConfig',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { yonYouImportHistoryId } = externalData;

    d.yonYouImportHistoryId = yonYouImportHistoryId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    let yonYouImportHistoryId = '';

    if ((externalData || null) != null) {
      yonYouImportHistoryId = externalData.yonYouImportHistoryId || '';
    }

    d.yonYouImportHistoryId = yonYouImportHistoryId;

    return d;
  };

  buildNotificationDescription = (
    // eslint-disable-next-line no-unused-vars
    singleData,
    // eslint-disable-next-line no-unused-vars
    listData,
    // eslint-disable-next-line no-unused-vars
    extraData,
    // eslint-disable-next-line no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line no-unused-vars
    submitData,
  ) => {
    return `信息更新成功。`;
  };

  buildTitleSubTextPrefix = () => {
    return '键名映射';
  };

  buildTitleSubTextAlign = () => {
    return 'center';
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.originalName.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '120px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
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
      const mapConfig = metaData.mapConfig;

      values[fieldDataMapConfig.organization.name] = getValueByKey({
        data: mapConfig,
        key: fieldDataMapConfig.organization.name,
      });

      values[fieldDataMapConfig.personnelCode.name] = getValueByKey({
        data: mapConfig,
        key: fieldDataMapConfig.personnelCode.name,
      });

      values[fieldDataMapConfig.name.name] = getValueByKey({
        data: mapConfig,
        key: fieldDataMapConfig.name.name,
      });

      values[fieldDataMapConfig.gender.name] = getValueByKey({
        data: mapConfig,
        key: fieldDataMapConfig.gender.name,
      });

      values[fieldDataMapConfig.phone.name] = getValueByKey({
        data: mapConfig,
        key: fieldDataMapConfig.phone.name,
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
              type: cardConfig.contentItemType.input,
              fieldData: fieldDataMapConfig.organization,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldDataMapConfig.personnelCode,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldDataMapConfig.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldDataMapConfig.gender,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldDataMapConfig.phone,
              require: true,
            },
          ],
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '配置键名映射用于数据导入。',
        },
      ],
    };
  };
}

export { SetMapConfigModal };
