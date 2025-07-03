import { convertCollection, getValueByKey, toString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import {
  flowNodeApproveModeCollection,
  flowNodeApproverModeCollection,
} from '../../../customConfig';
import {
  buildNowTimeFieldItem,
  getFlowNodeApproveModeName,
  renderFormFlowNodeApproveModeSelect,
  renderFormFlowNodeApproverModeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

class BaseAddPointDrawer extends BaseAddDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      approveModeSelectable: true,
    };
  }

  adjustApproverModeListData = (list) => list;

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;
    const { workflowId } = externalData;

    d[fieldData.workflowId.name] = workflowId;

    const approverMode = getValueByKey({
      data: o,
      key: fieldData.approverMode.name,
      convert: convertCollection.string,
      defaultValue: '',
    });

    if (approverMode != toString(flowNodeApproverModeCollection.designated)) {
      d[fieldData.approveMode.name] = toString(
        flowNodeApproveModeCollection.oneOfApproval,
      );
    }

    return d;
  };

  // eslint-disable-next-line no-unused-vars
  onApproverModeChange = (v, option) => {
    const data = {};

    if (toString(v) !== toString(flowNodeApproverModeCollection.designated)) {
      data[fieldData.approveMode.name] = toString(
        flowNodeApproveModeCollection.oneOfApproval,
      );
    }

    this.setFormFieldsValue(data);

    this.setState({
      approveModeSelectable:
        toString(v) === toString(flowNodeApproverModeCollection.designated),
    });
  };

  establishCardCollectionConfig = () => {
    const { approveModeSelectable } = this.state;

    const that = this;

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
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowNodeApproverModeSelect({
                adjustListData: that.adjustApproverModeListData,
                onChange: this.onApproverModeChange,
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowNodeApproveModeSelect({}),
              require: true,
              hidden: !approveModeSelectable,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.approveMode,
              value: getFlowNodeApproveModeName({
                value: toString(flowNodeApproveModeCollection.oneOfApproval),
              }),
              require: true,
              hidden: approveModeSelectable,
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
