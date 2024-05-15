import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { renderFormFlowBranchConditionJudgmentModeSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddModal } = DataModal;

const visibleFlag = '152aeb2b7303458ca31a848d0a9985b4';

@connect(({ workflowBranchCondition, schedulingControl }) => ({
  workflowBranchCondition,
  schedulingControl,
}))
class AddBasicInfoModel extends BaseAddModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增审批流程',
      submitApiPath: 'workflowBranchCondition/addBasicInfo',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const { image } = this.state;
    const d = this.supplementRequestParams(o);

    d.value = image;

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
  }

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

export { AddBasicInfoModel };
