import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '1c420a332c874934adc656fb9cac9324';

@connect(({ user, schedulingControl }) => ({
  user,
  schedulingControl,
}))
class ResetSignetPasswordModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '重置印章密码',
      loadApiPath: 'user/get',
      submitApiPath: 'user/resetSignetPassword',
    };
  }

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

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { userId } = externalData;

    d.userId = userId;

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.userId.name] = getValueByKey({
      data: externalData,
      key: fieldData.userId.name,
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
    return `重置印章密码成功。`;
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

  buildTitleSubTextPrefix = () => {
    return fieldData.loginName.label;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.loginName.name,
    });
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.signetPassword,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.password,
              fieldData: fieldData.signetPasswordVerify,
            },
          ],
        },
      ],
    };
  };
}

export default ResetSignetPasswordModal;
