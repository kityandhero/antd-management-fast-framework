import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormFlowNodeApproverModeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

class BaseAddPointDrawer extends BaseAddDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { workflowId } = externalData;

    d.workflowId = workflowId;

    return d;
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '名称',
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
              type: cardConfig.contentItemType.component,
              component: renderFormFlowNodeApproverModeSelect({}),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '操作人模式为 ”指定人员“ 时, 需要选择人员作为审批人。',
        },
        {
          text: '操作人模式为 ”直属部门“ 时, 需要选择职级, 符合所选职级的直属部门人员作为审批人。',
        },
      ],
    };
  };
}

export { BaseAddPointDrawer };
