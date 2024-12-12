import { connect } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormManagementChannelSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddModal } = DataModal;

const visibleFlag = '95de63ac5c4a489c9323d8851b656bcb';

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class AddModal extends BaseAddModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增预设角色',
      submitApiPath: 'presetRole/addBasicInfo',
    };
  }

  checkSubmitRequestParams = (o) => {
    if (checkStringIsNullOrWhiteSpace(o.name)) {
      const text = '请输入角色名称!';

      showSimpleErrorMessage(text);

      return false;
    }

    return true;
  };

  buildNotificationDescription = ({
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
  }) => {
    return `操作成功：已成功添加预设角色 ，请继续设定拥有的模块 `;
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

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormManagementChannelSelect({}),
              require: true,
            },
          ],
        },
      ],
    };
  };
}

export default AddModal;
