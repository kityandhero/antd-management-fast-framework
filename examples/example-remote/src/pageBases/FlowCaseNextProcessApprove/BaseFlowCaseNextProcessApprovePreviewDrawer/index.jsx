import {
  convertCollection,
  formatCollection,
  getValueByKey,
} from 'easy-soft-utility';

import {
  buildCustomGrid,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import { DataDrawer } from 'antd-management-fast-framework';

import { fieldDataFlowCaseNextProcessApprove } from '../../../customConfig';

const { BaseVerticalFlexDrawer } = DataDrawer;

class BaseFlowCaseNextProcessApprovePreviewDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '流程实例下一流转信息',
      loadApiPath: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  supplementLoadRequestParams = (o) => {
    throw new Error('supplementLoadRequestParams need overrode to implement');
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此图例显示的流程表单打印概览, 仅可查看。',
        },
        {
          text: '设置为非独占行的单元, 若前一个单元为独占, 则此单元也将转换为行布局, 宽度设置将无效。',
        },
        {
          text: '打印预览需要关闭设计模式。',
        },
      ],
    };
  };

  establishPresetContentContainorInnerTopStyle = () => {
    return {
      backgroundColor: '#ccc',
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            paddingTop: '16px',
            paddingBottom: '16px',
            paddingLeft: '10px',
            paddingRight: '10px',
          }}
        >
          {buildCustomGrid({
            list: [
              {
                span: 1,
                label: fieldDataFlowCaseNextProcessApprove.flowCaseId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.flowCaseId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseNextProcessApprove.workflowId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.workflowId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldDataFlowCaseNextProcessApprove.flowCaseTitle.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.flowCaseTitle.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldDataFlowCaseNextProcessApprove.workflowName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.workflowName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeName
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeName
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.nextWorkflowNodeId
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessApprove.nextApproveUserRealName
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove
                    .nextApproveUserRealName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessApprove.nextApproveUserId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.nextApproveUserId
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseNextProcessApprove.createTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.createTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseNextProcessApprove.updateTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessApprove.updateTime.name,
                  format: formatCollection.datetime,
                }),
              },
            ],
            props: {
              bordered: true,
              size: 'small',
              column: 2,
              labelStyle: {
                width: '160px',
              },
              emptyValue: '暂无',
              emptyStyle: {
                color: '#ccc',
              },
              ellipsis: false,
            },
          })}
        </div>
      </ScrollFacadeBox>
    );
  };
}

export { BaseFlowCaseNextProcessApprovePreviewDrawer };
