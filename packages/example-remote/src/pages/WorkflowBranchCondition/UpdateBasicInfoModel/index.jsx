import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormFlowBranchConditionJudgmentModeSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

const visibleFlag = '9303d879778542f28efae80f6e302e18';

@connect(({ workflowBranchCondition, schedulingControl }) => ({
  workflowBranchCondition,
  schedulingControl,
}))
class UpdateBasicInfoModal extends BaseUpdateModal {
  showCallProcess = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑分支条件基本信息',
      loadApiPath: 'workflowBranchCondition/get',
      submitApiPath: 'workflowBranchCondition/updateBasicInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementSubmitRequestParams = (o) => {
    const { image } = this.state;
    const d = this.supplementRequestParams(o);

    d.value = image;

    return d;
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowBranchConditionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowBranchConditionId.name,
    });

    return d;
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
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      const judgmentMode = getValueByKey({
        data: metaData,
        key: fieldData.judgmentMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.judgmentMode.name] =
        judgmentMode === zeroString ? null : judgmentMode;
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '基本信息',
          },
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
              component: renderFormFlowBranchConditionJudgmentModeSelect({}),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
              require: false,
            },
          ],
        },
      ],
    };
  };
}

export { UpdateBasicInfoModal };
