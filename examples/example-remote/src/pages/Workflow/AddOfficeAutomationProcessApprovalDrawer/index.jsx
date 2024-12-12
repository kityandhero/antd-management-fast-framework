import { connect } from 'easy-soft-dva';
import { getValueByKey, toString, whetherString } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { flowEffectiveRangeCollection } from '../../../customConfig';
import {
  buildNowTimeFieldItem,
  renderFormFlowEffectiveRangeSelect,
} from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '6bf399dddf004debb9b27d4dc26aadb1';

@connect(({ workflow, schedulingControl }) => ({
  workflow,
  schedulingControl,
}))
class AddOfficeAutomationProcessApprovalDrawer extends BaseAddDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增审批流程',
      submitApiPath: 'workflow/addOfficeAutomationProcessApproval',
    };
  }

  doAfterSubmitSuccess = ({
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
    const workflowId = getValueByKey({
      data: singleData,
      key: fieldData.workflowId.name,
    });

    this.goToPath(`/flow/workflow/edit/load/${workflowId}/1/basicInfo`);
  };

  fillDefaultInitialValues = () => {
    const v = {};

    v[fieldData.effectiveRange.name] = toString(
      flowEffectiveRangeCollection.rangeEffective,
    );
    v[fieldData.whetherAllowMultibranch.name] = whetherString.yes;
    v[fieldData.whetherAllowMultiEnd.name] = whetherString.no;

    return v;
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
              type: cardConfig.contentItemType.component,
              component: renderFormFlowEffectiveRangeSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.whetherAllowMultibranch,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.whetherAllowMultiEnd,
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
              require: false,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddOfficeAutomationProcessApprovalDrawer };
