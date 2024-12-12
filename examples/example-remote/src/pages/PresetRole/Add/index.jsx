import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormWebChannelSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddForm } = DataForm;

@connect(({ presetRole, schedulingControl }) => ({
  presetRole,
  schedulingControl,
}))
class Edit extends BaseAddForm {
  doOtherAfterSubmitSuccess = ({
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
    const { presetRoleId } = singleData;

    this.redirectToPath(
      `/permission/presetRole/edit/load/${presetRoleId}/1/basicInfo`,
    );
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.form(),
            text: '基本信息',
          },
          extra: {
            affix: true,
            list: [{ buildType: cardConfig.extraBuildType.save }],
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.name,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormWebChannelSelect({}),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export default Edit;
