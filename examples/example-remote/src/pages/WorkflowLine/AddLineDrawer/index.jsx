import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  buildNowTimeFieldItem,
  renderFormFlowLineFromPositionSelect,
  renderFormFlowLineToPositionSelect,
  renderFormFlowLineTypeSelect,
} from '../../../customSpecialComponents';
import { fieldData as fieldDataWorkflow } from '../../Workflow/Common/data';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { FromNodeSelectModalField } from '../../WorkflowNode/FromNodeSelectModalField';
import { ToNodeSelectModalField } from '../../WorkflowNode/ToNodeSelectModalField';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '6807d8021f2c4ef9bbcf2acfd350e0f2';

@connect(({ workflowLine, schedulingControl }) => ({
  workflowLine,
  schedulingControl,
}))
class AddLineDrawer extends BaseAddDrawer {
  destroyOnClose = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增流程线',
      submitApiPath: 'workflowLine/createLine',
      fromId: '',
      toId: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData, fromId, toId } = this.state;

    const workflowId = getValueByKey({
      data: externalData,
      key: fieldDataWorkflow.workflowId.name,
    });

    d[fieldData.workflowId.name] = workflowId;
    d[fieldData.fromId.name] = fromId;
    d[fieldData.toId.name] = toId;

    return d;
  };

  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      fromId: '',
      toId: '',
    });
  };

  afterFromNodeSelect = (d) => {
    const fromId = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    this.setState({
      fromId: fromId,
    });
  };

  afterFromNodeClearSelect = () => {
    this.setState({
      fromId: '',
    });
  };

  afterToNodeSelect = (d) => {
    const toId = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    this.setState({
      toId: toId,
    });
  };

  afterToNodeClearSelect = () => {
    this.setState({
      toId: '',
    });
  };

  renderPresetTitle = () => {
    return '新增流程线';
  };

  establishCardCollectionConfig = () => {
    const { externalData } = this.state;

    return {
      list: [
        {
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customSelect,
              component: renderFormFlowLineTypeSelect({}),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: (
                <FromNodeSelectModalField
                  externalData={externalData}
                  label={fieldData.fromName.label}
                  helper={fieldData.fromName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterFromNodeSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterFromNodeClearSelect();
                  }}
                />
              ),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowLineFromPositionSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: (
                <ToNodeSelectModalField
                  externalData={externalData}
                  label={fieldData.toName.label}
                  helper={fieldData.toName.helper}
                  afterSelectSuccess={(d) => {
                    this.afterToNodeSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterToNodeClearSelect();
                  }}
                />
              ),
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormFlowLineToPositionSelect({}),
              require: true,
            },
          ],
          instruction: {
            title: '说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '如当前线条存在并行的同类型的多分支线条, 请继续设置分支绑定条件',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '标题与描述',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: false,
            },
          ],
          instruction: {
            title: '说明',
            showDivider: false,
            showNumber: true,
            list: [
              {
                text: '设置的标题将会替换流程图线条中的标签文本',
              },
            ],
          },
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

export { AddLineDrawer };
