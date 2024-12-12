/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  convertCollection,
  filter,
  getValueByKey,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { singleListAction } from '../../WorkflowBranchCondition/Assist/action';
import { fieldData as fieldDataWorkflowFormDesign } from '../../WorkflowFormDesign/Common/data';
import { fieldData } from '../Common/data';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldConvert(o, index) {
  const { name, workflowBranchConditionId } = o;

  return {
    label: name,
    value: workflowBranchConditionId,
    disabled: false,
    ...o,
  };
}

const visibleFlag = '74776b1dc47a4dc4a4560ab11bf5b7ab';

@connect(({ workflowLine, workflowBranchCondition, schedulingControl }) => ({
  workflowLine,
  workflowBranchCondition,
  schedulingControl,
}))
class BindBranchConditionModal extends BaseUpdateModal {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '更新表单字段判断条件',
      loadApiPath: 'workflowLine/get',
      submitApiPath: 'workflowLine/setBranchConditionId',
      branchConditionList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadBranchConditionList();
  };

  supplementLoadRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = this.supplementRequestParams(o);

    return d;
  };

  supplementRequestParams(o) {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldData.workflowLineId.name] = getValueByKey({
      data: externalData,
      key: fieldData.workflowLineId.name,
    });

    return d;
  }

  loadBranchConditionList = () => {
    const { externalData } = this.props;

    singleListAction({
      target: this,
      handleData: {
        workflowNodeId: getValueByKey({
          data: externalData,
          key: fieldData.fromId.name,
        }),
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          branchConditionList: remoteListData,
        });
      },
    });
  };

  reloadBranchConditionList = () => {
    this.loadBranchConditionList();
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldData.title.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '110px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
  };

  fillInitialValuesAfterLoad = ({
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
      const workflowBranchConditionId = getValueByKey({
        data: metaData,
        key: fieldData.workflowBranchConditionId.name,
        convert: convertCollection.string,
      });

      values[fieldData.workflowBranchConditionId.name] =
        workflowBranchConditionId === zeroString
          ? null
          : workflowBranchConditionId;
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { branchConditionList } = this.state;

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
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.workflowBranchConditionId,
              listData: branchConditionList,
              dataConvert: dataFormFieldConvert,
              // onChange: this.onTargetNameChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadBranchConditionList();
                },
              }),
              require: false,
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
          text: '从节点出发的线条为唯一情况下，无需设置条件。',
        },
        {
          text: '变更线条的出发节点后, 需要重新设定绑定条件。',
        },
      ],
    };
  };
}

export { BindBranchConditionModal };
