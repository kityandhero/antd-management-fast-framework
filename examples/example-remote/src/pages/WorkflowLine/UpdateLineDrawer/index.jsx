import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

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
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { FromNodeSelectModalField } from '../../WorkflowNode/FromNodeSelectModalField';
import { ToNodeSelectModalField } from '../../WorkflowNode/ToNodeSelectModalField';
import { fieldData } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = '114db37a1cfd4a059bf045cadfb4cb9a';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class UpdateLineDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '更新流程线',
      loadApiPath: 'workflowLine/get',
      submitApiPath: 'workflowLine/updateLine',
      fromId: '',
      fromName: '',
      toId: '',
      toName: '',
    };
  }

  supplementLoadRequestParams = (o) => {
    return {
      ...this.supplementRequestParams(o),
    };
  };

  supplementSubmitRequestParams = (o) => {
    const { fromId, toId } = this.state;

    const d = this.supplementRequestParams(o);

    d[fieldData.fromId.name] = fromId;
    d[fieldData.toId.name] = toId;

    return d;
  };

  supplementRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldData.workflowLineId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowLineId.name,
    });

    return d;
  };

  doOtherAfterLoadSuccess = ({
    metaData,
    // eslint-disable-next-line no-unused-vars
    metaListData,
    // eslint-disable-next-line no-unused-vars
    metaExtra,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData,
  }) => {
    const fromId = getValueByKey({
      data: metaData,
      key: fieldData.fromId.name,
    });

    const fromName = getValueByKey({
      data: metaData,
      key: fieldData.fromName.name,
    });

    const toId = getValueByKey({
      data: metaData,
      key: fieldData.toId.name,
    });

    const toName = getValueByKey({
      data: metaData,
      key: fieldData.toName.name,
    });

    this.setState({ fromId, fromName, toId, toName });
  };

  afterFromNodeSelect = (d) => {
    const fromId = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    const fromName = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.name.name,
    });

    this.setState({
      fromId: fromId,
      fromName: fromName,
    });
  };

  afterFromNodeClearSelect = () => {
    this.setState({
      fromId: '',
      fromName: '',
    });
  };

  afterToNodeSelect = (d) => {
    const toId = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    const toName = getValueByKey({
      data: d,
      key: fieldDataWorkflowNode.name.name,
    });

    this.setState({
      toId: toId,
      toName: toName,
    });
  };

  afterToNodeClearSelect = () => {
    this.setState({
      toId: '',
      toName: '',
    });
  };

  renderPresetTitle = () => {
    return '更新流程线';
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
      values[fieldData.title.name] = getValueByKey({
        data: metaData,
        key: fieldData.title.name,
      });

      values[fieldData.description.name] = getValueByKey({
        data: metaData,
        key: fieldData.description.name,
      });

      values[fieldData.type.name] = getValueByKey({
        data: metaData,
        key: fieldData.type.name,
        convert: convertCollection.string,
      });

      values[fieldData.fromPosition.name] = getValueByKey({
        data: metaData,
        key: fieldData.fromPosition.name,
        convert: convertCollection.string,
      });

      values[fieldData.toPosition.name] = getValueByKey({
        data: metaData,
        key: fieldData.toPosition.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { externalData, fromName, toName } = this.state;

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
                  defaultValue={fromName || null}
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
                  defaultValue={toName || null}
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
                text: '变更线条的出发节点后，线条绑定的分支条件将会清空, 如当前线条存在并行的同类型的多分支线条, 请重新设置分支绑定条件',
              },
            ],
          },
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '标题设置',
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

export { UpdateLineDrawer };
