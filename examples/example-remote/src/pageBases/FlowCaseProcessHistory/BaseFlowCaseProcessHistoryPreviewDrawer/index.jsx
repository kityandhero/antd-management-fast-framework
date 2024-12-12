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

import { fieldDataFlowCaseProcessHistory } from '../../../customConfig';

const { BaseVerticalFlexDrawer } = DataDrawer;

class BaseFlowCaseProcessHistoryPreviewDrawer extends BaseVerticalFlexDrawer {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '实例审批历史信息',
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
                span: 2,
                label: fieldDataFlowCaseProcessHistory.flowCaseTitle.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.flowCaseTitle.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseProcessHistory.approveWorkflowNodeName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.approveWorkflowNodeName
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseProcessHistory.approveWorkflowNodeTypeNote
                    .label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory
                    .approveWorkflowNodeTypeNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.approveUserName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.approveUserName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.approveUserId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.approveUserId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.approveActionNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.approveActionNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label:
                  fieldDataFlowCaseProcessHistory.approveActionModeNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.approveActionModeNote
                    .name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldDataFlowCaseProcessHistory.note.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.note.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.inWorkflowLineId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.inWorkflowLineId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.statusNote.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.statusNote.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 2,
                label: fieldDataFlowCaseProcessHistory.workflowName.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.workflowName.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.flowCaseId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.flowCaseId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.workflowId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.workflowId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.createTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.createTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.createOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.createOperatorId.name,
                  convert: convertCollection.string,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.updateTime.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.updateTime.name,
                  format: formatCollection.datetime,
                }),
              },
              {
                span: 1,
                label: fieldDataFlowCaseProcessHistory.updateOperatorId.label,
                value: getValueByKey({
                  data: metaData,
                  key: fieldDataFlowCaseProcessHistory.updateOperatorId.name,
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

export { BaseFlowCaseProcessHistoryPreviewDrawer };
