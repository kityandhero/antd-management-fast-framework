import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  filter,
  formatCollection,
  getValueByKey,
  toString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { flowNodeApproverModeCollection } from '../../../customConfig';
import { renderFormFlowNodeApproverModeSelect } from '../../../customSpecialComponents';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '5f059c0b10ed4cdeac4d2d20581f66da';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class UpdateBasicInfoDrawer extends BaseUpdateDrawer {
  reloadWhenShow = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑流程节点',
      loadApiPath: 'workflowNode/get',
      submitApiPath: 'workflowNode/updateBasicInfo',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
  };

  renderPresetTitle = () => {
    return '更新流程项';
  };

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

    if (metaData != null) {
      values[fieldData.name.name] = getValueByKey({
        data: metaData,
        key: fieldData.name.name,
      });

      values[fieldData.approverMode.name] = getValueByKey({
        data: metaData,
        key: fieldData.approverMode.name,
        convert: convertCollection.string,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

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
                adjustListData: (list) => {
                  const listAdjust = filter(list, (one) => {
                    const { flag } = one;

                    return checkInCollection(
                      [
                        toString(flowNodeApproverModeCollection.designated),
                        toString(
                          flowNodeApproverModeCollection.directlyAffiliatedDepartment,
                        ),
                      ],
                      toString(flag),
                    );
                  });

                  return listAdjust;
                },
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.typeNote,
              value: getValueByKey({
                data: metaData,
                key: fieldData.typeNote.name,
              }),
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
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '其他信息',
          },
          items: [
            {
              type: cardConfig.contentItemType.onlyShowInputDatetime,
              fieldData: fieldData.createTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.createTime.name,
                format: formatCollection.datetime,
              }),
            },
            {
              type: cardConfig.contentItemType.onlyShowInputDatetime,
              fieldData: fieldData.updateTime,
              value: getValueByKey({
                data: metaData,
                key: fieldData.updateTime.name,
                format: formatCollection.datetime,
              }),
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
          text: '操作人模式为 ”指定人员“ 时, 需要选择人员作为审批人。',
        },
        {
          text: '操作人模式为 ”直属部门“ 时, 需要选择职级, 符合所选职级的直属部门人员作为审批人。',
        },
      ],
    };
  };
}

export { UpdateBasicInfoDrawer };
