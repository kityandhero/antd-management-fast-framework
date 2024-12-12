import { connect } from 'easy-soft-dva';
import { getValueByKey } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { buildNowTimeFieldItem } from '../../../customSpecialComponents';
import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData as fieldDataPositionGrade } from '../../PositionGrade/Common/data';
import { PositionGradeSelectModalField } from '../../PositionGrade/SelectModalField';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { fieldData } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;

const visibleFlag = '14cc7f389c9b4a459734ec4e529f33ff';

@connect(({ workflowNodeApprover, schedulingControl }) => ({
  workflowNodeApprover,
  schedulingControl,
}))
class AddWorkflowNodeApprovePositionGradeDrawer extends BaseAddDrawer {
  destroyOnClose = true;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增节点审批职级',
      submitApiPath:
        modelTypeCollection.workflowNodeApproverTypeCollection
          .addPositionGradeBasicInfo,
      positionGradeId: '',
    };
  }

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { positionGradeId } = this.state;
    const { externalData } = this.props;

    d[fieldData.positionGradeId.name] = positionGradeId;

    d[fieldData.workflowId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowId.name,
    });

    d[fieldData.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowNodeId.name,
    });

    return d;
  };

  clearCustomerSelect = () => {
    this.setState({
      positionGradeId: '',
    });
  };

  afterCustomerSelect = (d) => {
    const positionGradeId = getValueByKey({
      data: d,
      key: fieldDataPositionGrade.positionGradeId.name,
      defaultValue: '0',
    });

    this.setState({
      positionGradeId: positionGradeId,
    });
  };

  afterCustomerClearSelect = () => {
    this.clearCustomerSelect();
  };

  establishCardCollectionConfig = () => {
    const { externalData } = this.props;

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
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: fieldDataWorkflowNode.name.label,
                  value: getValueByKey({
                    data: externalData,
                    key: fieldDataWorkflowNode.name.name,
                  }),
                },
              ],
              props: {
                bordered: true,
                size: 'small',
                column: 1,
                labelStyle: {
                  width: '90px',
                },
                emptyValue: '暂无',
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '审核人职级',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <PositionGradeSelectModalField
                  label={fieldData.positionGradeName.label}
                  afterSelectSuccess={(d) => {
                    this.afterCustomerSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.afterCustomerClearSelect();
                  }}
                />
              ),
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddWorkflowNodeApprovePositionGradeDrawer };
