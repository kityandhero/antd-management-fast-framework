/* eslint-disable no-unused-vars */
import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
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
  accessWayCollection,
  fieldDataFlowCase,
  fieldDataFlowCaseProcessHistory,
  flowBranchConditionItemTargetComparisonModelCollection,
  flowBranchConditionItemTargetTypeCollection,
} from '../../../customConfig';
import {
  renderFormFlowBranchConditionItemTargetComparisonModeSelect,
  renderFormFlowBranchConditionItemTargetTypeSelect,
} from '../../../customSpecialComponents';
import { singleListAction } from '../../../pages/GeneralDiscourse/Assist/action';
import { typeCollection } from '../../../pages/GeneralDiscourse/Common/data';

const { BaseUpdateModal } = DataModal;

// eslint-disable-next-line no-unused-vars
function dataFormFieldConvert(o, index) {
  const { content, generalDiscourseId } = o;

  return {
    label: content,
    value: generalDiscourseId,
    disabled: false,
    ...o,
  };
}

const generalDiscourseName = '991d90f0881b4e14909c7e8f270e593f';

class BaseFlowCaseProcessHistoryPassModal extends BaseUpdateModal {
  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '同意审批',
      loadApiPath: '',
      submitApiPath: '',
      generalDiscourseList: [],
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.loadGeneralDiscourseList();
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

  onGeneralDiscourseChange = (v, option) => {
    const { content } = option;

    if (!checkStringIsNullOrWhiteSpace(content)) {
      const data = {};

      data[fieldDataFlowCaseProcessHistory.note.name] = content;
      data[generalDiscourseName] = null;

      this.setFormFieldsValue(data);
    }
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
    const { generalDiscourseList } = this.state;

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
              fieldData: {
                label: '快捷常用语',
                name: generalDiscourseName,
                helper: '',
              },
              listData: generalDiscourseList,
              dataConvert: dataFormFieldConvert,
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
