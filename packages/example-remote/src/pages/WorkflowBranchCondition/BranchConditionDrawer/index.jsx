import { Collapse, Space } from 'antd';

import { connect } from 'easy-soft-dva';
import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { extraBuildType } from 'antd-management-fast-common';
import {
  buildButton,
  iconBuilder,
  ScrollFacadeBox,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import { fieldData as fieldDataWorkflowNode } from '../../WorkflowNode/Common/data';
import { AddBasicInfoModel } from '../AddBasicInfoModel';
import { refreshCacheAction } from '../Assist/action';
import { fieldData } from '../Common/data';
import { UpdateBasicInfoModal } from '../UpdateBasicInfoModel';

const { BaseVerticalFlexDrawer } = DataDrawer;

const visibleFlag = 'bcc0fad276c24177920a39bc32a2a1d1';

@connect(({ workflowNode, workflowBranchCondition, schedulingControl }) => ({
  workflowNode,
  workflowBranchCondition,
  schedulingControl,
}))
class BranchConditionDrawer extends BaseVerticalFlexDrawer {
  useFormWrapper = false;

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
      pageTitle: '工作流节点分支条件设置',
      loadApiPath: 'workflowNode/get',
      workflowNodeId: null,
      currentBranchCondition: null,
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

    d[fieldDataWorkflowNode.workflowNodeId.name] = getValueByKey({
      data: externalData,
      key: fieldDataWorkflowNode.workflowNodeId.name,
    });

    return d;
  };

  refreshCache = (r) => {
    refreshCacheAction({
      target: this,
      handleData: r,
    });
  };

  showAddBasicInfoModel = () => {
    AddBasicInfoModel.open();
  };

  afterAddBasicInfoModelClose = () => {
    this.refreshData({});
  };

  showUpdateBasicInfoModal = (o) => {
    this.setState(
      {
        currentBranchCondition: o,
      },
      () => {
        UpdateBasicInfoModal.open();
      },
    );
  };

  afterUpdateBasicInfoModalClose = () => {
    this.refreshData({});
  };

  establishExtraActionConfig = () => {
    return {
      list: [
        {
          buildType: extraBuildType.generalExtraButton,
          icon: iconBuilder.plusCircle(),
          type: 'primary',
          text: '新增条件',
          handleClick: this.showAddBasicInfoModel,
        },
      ],
    };
  };

  establishHelpConfig = () => {
    return {
      title: '操作提示',
      list: [
        {
          text: '点击箭头展开或折叠条件内容。',
        },
        {
          text: '不同条件的执行结果不能相互重叠。',
        },
      ],
    };
  };

  renderPresetContentContainorInnerTop = () => {
    const { metaData } = this.state;

    const { listBranchCondition } = {
      listBranchCondition: [],
      ...metaData,
    };

    const items = listBranchCondition.map((o) => {
      const workflowBranchConditionId = getValueByKey({
        data: o,
        key: fieldData.workflowBranchConditionId.name,
        convert: convertCollection.string,
      });

      const name = getValueByKey({
        data: o,
        key: fieldData.name.name,
        convert: convertCollection.string,
      });

      return {
        key: workflowBranchConditionId,
        label: name,
        children: <div>111</div>,
        extra: (
          <Space>
            {buildButton({
              text: '编辑信息',
              size: 'small',
              icon: iconBuilder.edit(),
              handleData: o,
              handleClick: ({ handleData }) => {
                this.showUpdateBasicInfoModal(handleData);
              },
            })}

            {buildButton({
              text: '增加项',
              size: 'small',
              icon: iconBuilder.plusCircle(),
              handleData: o,
              handleClick: ({ handleData }) => {
                this.showUpdateBasicInfoModal(handleData);
              },
            })}

            {buildButton({
              text: '刷新缓存',
              size: 'small',
              icon: iconBuilder.reload(),
              handleData: o,
              handleClick: ({ handleData }) => {
                this.refreshCache(handleData);
              },
            })}
          </Space>
        ),
      };
    });

    return (
      <ScrollFacadeBox
        style={{
          height: '100%',
          width: '100%',
          overflowY: 'auto',
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
          <Collapse
            // defaultActiveKey={['1']}
            // onChange={onChange}
            collapsible="icon"
            expandIconPosition={'start'}
            items={items}
          />
        </div>
      </ScrollFacadeBox>
    );
  };

  renderPresetOther = () => {
    const { metaData, currentBranchCondition } = this.state;

    return (
      <>
        <AddBasicInfoModel
          externalData={metaData}
          afterClose={() => {
            this.afterAddBasicInfoModelClose();
          }}
        />

        <UpdateBasicInfoModal
          externalData={currentBranchCondition}
          afterClose={() => {
            this.afterAddBasicInfoModelClose();
          }}
        />
      </>
    );
  };
}

export { BranchConditionDrawer };
