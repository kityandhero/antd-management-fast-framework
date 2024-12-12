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

import { fieldDataFlowCaseNextProcessNotification } from '../../../customConfig';

const { BaseVerticalFlexDrawer } = DataDrawer;

class BaseFlowCaseNextProcessNotificationPreviewDrawer extends BaseVerticalFlexDrawer {
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
                label:
                  fieldDataFlowCaseNextProcessNotification.flowCaseId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.flowCaseId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.workflowId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.workflowId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label:
                  fieldDataFlowCaseNextProcessNotification.flowCaseTitle.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.flowCaseTitle
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label:
                  fieldDataFlowCaseNextProcessNotification.workflowName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.workflowName
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.nextWorkflowNodeName
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification
                    .nextWorkflowNodeName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.nextWorkflowNodeId
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification
                    .nextWorkflowNodeId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification
                    .nextApproveUserRealName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification
                    .nextApproveUserRealName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.nextApproveUserId
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification
                    .nextApproveUserId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldDataFlowCaseNextProcessNotification.content.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.content.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label:
                  fieldDataFlowCaseNextProcessNotification.clientContent.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.clientContent
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label:
                  fieldDataFlowCaseNextProcessNotification.smsContent.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.smsContent.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label:
                  fieldDataFlowCaseNextProcessNotification.whetherReadNote
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.whetherReadNote
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.whetherClientSendNote
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification
                    .whetherClientSendNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.whetherSmsSendNote
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification
                    .whetherSmsSendNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.createTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.createTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.createOperatorId
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.createOperatorId
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.updateTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.updateTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseNextProcessNotification.updateOperatorId
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseNextProcessNotification.updateOperatorId
                    .name,
                  convert: convertCollection.string,
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

export { BaseFlowCaseNextProcessNotificationPreviewDrawer };
