/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  convertCollection,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  toString,
  zeroString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import {
  accessWayCollection,
  fieldDataFlowCase,
  fieldDataFlowCaseProcessHistory,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
  flowDebugApproverModeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { singleListAction } from '../../../pages/GeneralDiscourse/Assist/action';
import { typeCollection } from '../../../pages/GeneralDiscourse/Common/data';
import { singleListAction as singleListApproverAction } from '../../../pages/WorkflowNodeApprover/Assist/action';
import { fieldData as fieldDataWorkflowNodeApprover } from '../../../pages/WorkflowNodeApprover/Common/data';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldApproverConvert(o, index) {
  const { userRealName, userId } = o;

  return {
    label: userRealName,
    value: userId,
    disabled: false,
    ...o,
  };
}

// eslint-disable-next-line no-unused-vars
function dataFormFieldGeneralDiscourseConvert(o, index) {
  const { content, generalDiscourseId } = o;

  return {
    label: content,
    value: generalDiscourseId,
    disabled: false,
    ...o,
  };
}

const approveUserName = '2fcc037383244eeb81d6c71053a79601';

const generalDiscourseName = '991d90f0881b4e14909c7e8f270e593f';

class BaseFlowCaseProcessHistoryPassModal extends BaseUpdateModal {
  approveUserId = '';

  approveUserRealName = '';

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '同意审批',
      loadApiPath: '',
      submitApiPath: '',
      generalDiscourseList: [],
      approverList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
    this.loadApproverList();
  };

  // eslint-disable-next-line no-unused-vars
  getFlowCaseId = (o) => {
    throw new Error('getFlowCaseId need overrode to implement');
  };

  getFlowCaseIdName = () => {
    throw new Error('getFlowCaseIdName need overrode to implement');
  };

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[this.getFlowCaseIdName()] = this.getFlowCaseId(externalData);

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.props;

    d[fieldDataFlowCaseProcessHistory.flowCaseId.name] =
      this.getFlowCaseId(externalData);

    d[fieldDataFlowCaseProcessHistory.approveUserId.name] =
      this.approveUserId ?? '';

    delete d[generalDiscourseName];
    delete d[approveUserName];

    return d;
  };

  loadGeneralDiscourseList = () => {
    const { externalData } = this.props;

    singleListAction({
      target: this,
      handleData: {
        type: typeCollection.workflow,
      },
      successCallback: ({ target, remoteListData }) => {
        target.setState({
          generalDiscourseList: remoteListData,
        });
      },
    });
  };

  reloadGeneralDiscourseList = () => {
    this.loadGeneralDiscourseList();
  };

  loadApproverList = () => {
    const { externalData } = this.props;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

    if (debugApproverMode === flowDebugApproverModeCollection.debugUser) {
      this.approveUserId = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserId.name,
        convert: convertCollection.string,
      });
      this.approveUserRealName = getValueByKey({
        data: externalData,
        key: fieldDataFlowCase.flowDebugUserRealName.name,
        convert: convertCollection.string,
      });
    }

    singleListApproverAction({
      target: this,
      handleData: {
        workflowNodeId: getValueByKey({
          data: externalData,
          key: fieldDataFlowCase.nextApproveWorkflowNodeId.name,
          defaultValue: '',
        }),
      },
      successCallback: ({ target, remoteListData }) => {
        if (
          debugApproverMode ===
            flowDebugApproverModeCollection.flowConfiguration &&
          isArray(remoteListData) &&
          !isEmptyArray(remoteListData) &&
          remoteListData.length === 1
        ) {
          const firstData = remoteListData[0];

          const userId = getValueByKey({
            data: firstData,
            key: fieldDataWorkflowNodeApprover.userId.name,
            convert: convertCollection.string,
          });

          const userRealName = getValueByKey({
            data: firstData,
            key: fieldDataWorkflowNodeApprover.userRealName.name,
            convert: convertCollection.string,
          });

          target.approveUserId = userId;
          target.approveUserRealName = userRealName;
        }

        target.setState({
          approverList: [...remoteListData],
        });
      },
    });
  };

  reloadApproverList = () => {
    this.loadApproverList();
  };

  onGeneralDiscourseChange = (v, option) => {
    const { content } = option;

    if (!checkStringIsNullOrWhiteSpace(content)) {
      const data = {};

      data[fieldDataFlowCaseProcessHistory.note.name] = content;
      data[generalDiscourseName] = null;

      this.setFormFieldsValue(data);
    }
  };

  onApproverChange = (v, option) => {
    this.approveUserId = v;
  };

  buildTitleSubText = () => {
    const { metaData } = this.state;

    return getValueByKey({
      data: metaData,
      key: fieldDataFlowCase.title.name,
    });
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '100px',
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

    return values;
  };

  establishCardCollectionConfig = () => {
    const { externalData, generalDiscourseList, approverList } = this.state;

    const debugApproverMode = getValueByKey({
      data: externalData,
      key: fieldDataFlowCase.debugApproverMode.name,
      convert: convertCollection.number,
    });

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
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: {
                label: '审批人',
                name: approveUserName,
                helper: '',
              },
              value: this.approveUserRealName,
              hidden:
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  approverList.length !== 1) ||
                !checkHasAuthority(
                  accessWayCollection.workflowNodeApprover.singleList
                    .permission,
                ),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '审批人',
                name: approveUserName,
                helper: '',
              },
              listData: approverList,
              dataConvert: dataFormFieldApproverConvert,
              onChange: this.onApproverChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadApproverList();
                },
              }),
              hidden:
                debugApproverMode ===
                  flowDebugApproverModeCollection.debugUser ||
                (debugApproverMode ===
                  flowDebugApproverModeCollection.flowConfiguration &&
                  approverList.length === 1) ||
                !checkHasAuthority(
                  accessWayCollection.workflowNodeApprover.singleList
                    .permission,
                ),
              require: true,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.select,
              fieldData: {
                label: '快捷常用语',
                name: generalDiscourseName,
                helper: '',
              },
              listData: generalDiscourseList,
              dataConvert: dataFormFieldGeneralDiscourseConvert,
              onChange: this.onGeneralDiscourseChange,
              addonAfter: buildButton({
                text: '',
                icon: iconBuilder.reload(),
                handleClick: () => {
                  this.reloadGeneralDiscourseList();
                },
              }),
              hidden: !checkHasAuthority(
                accessWayCollection.generalDiscourse.singleList.permission,
              ),
              require: false,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldDataFlowCaseProcessHistory.note,
              require: true,
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
          text: '选择常用语可以快速填充审批意见。',
        },
      ],
    };
  };
}

export { BaseFlowCaseProcessHistoryPassModal };
