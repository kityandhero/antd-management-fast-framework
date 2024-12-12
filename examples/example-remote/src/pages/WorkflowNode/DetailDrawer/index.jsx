import { Divider, Table } from 'antd';

import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { buildCustomGrid } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import {
  accessWayCollection,
  flowNodeApproverModeCollection,
} from '../../../customConfig';
import { AddAttachmentModal } from '../../WorkflowDebugCaseFormAttachment/AddAttachmentModal';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../WorkflowNodeApprover/Common/data';
import { fieldData } from '../Common/data';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'eb965c312f1a4580a41a8983d5a657f0';

@connect(({ workflowNode, schedulingControl }) => ({
  workflowNode,
  schedulingControl,
}))
class WorkflowNodeDetailDrawer extends BaseVerticalFlexDrawer {
  componentAuthority = accessWayCollection.workflowNode.get.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  static close() {
    switchControlAssist.close(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '工作流节点信息',
      loadApiPath: 'workflowNode/get',
      workflowNodeId: null,
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

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '此处显示的下一审批节点的信息以及审批人信息。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const { listApprover } = {
      listApprover: [],
      ...metaData,
    };

    const grid = buildCustomGrid({
      list: [
        {
          span: 2,
          label: fieldData.name.label,
          value: getValueByKey({
            data: metaData,
            key: fieldData.name.name,
          }),
        },
        {
          span: 2,
          label: fieldData.description.label,
          value: getValueByKey({
            data: metaData,
            key: fieldData.description.name,
          }),
        },
      ],
      props: {
        bordered: true,
        column: 2,
        size: 'small',
        labelStyle: {
          width: '80px',
        },
        emptyValue: '暂无',
        emptyStyle: {
          color: '#ccc',
        },
      },
    });

    const approverMode = getValueByKey({
      data: metaData,
      key: fieldData.approverMode.name,
      convert: convertCollection.number,
    });

    const columns = [];

    if (approverMode === flowNodeApproverModeCollection.designated) {
      columns.push(
        {
          title: fieldDataWorkflowNodeApprover.userId.label,
          dataIndex: fieldDataWorkflowNodeApprover.userId.name,
          key: fieldDataWorkflowNodeApprover.userId.name,
          ellipsis: true,
        },
        {
          title: fieldDataWorkflowNodeApprover.userRealName.label,
          dataIndex: fieldDataWorkflowNodeApprover.userRealName.name,
          key: fieldDataWorkflowNodeApprover.userRealName.name,
          width: '120px',
        },
      );
    }

    if (
      approverMode ===
      flowNodeApproverModeCollection.directlyAffiliatedDepartment
    ) {
      columns.push(
        {
          title: fieldDataWorkflowNodeApprover.positionGradeId.label,
          dataIndex: fieldDataWorkflowNodeApprover.positionGradeId.name,
          key: fieldDataWorkflowNodeApprover.positionGradeId.name,
          ellipsis: true,
        },
        {
          title: fieldDataWorkflowNodeApprover.positionGradeName.label,
          dataIndex: fieldDataWorkflowNodeApprover.positionGradeName.name,
          key: fieldDataWorkflowNodeApprover.positionGradeName.name,
          width: '120px',
        },
      );
    }

    return (
      <div style={{ padding: '10px' }}>
        {grid}

        <Divider />

        <Table
          columns={columns}
          size="small"
          dataSource={listApprover}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </div>
    );
  };

  renderPresetOther = () => {
    const { metaData } = this.state;

    return (
      <>
        <AddAttachmentModal
          externalData={metaData}
          afterClose={this.afterAddAttachmentModalClose}
        />
      </>
    );
  };
}

export { WorkflowNodeDetailDrawer };
