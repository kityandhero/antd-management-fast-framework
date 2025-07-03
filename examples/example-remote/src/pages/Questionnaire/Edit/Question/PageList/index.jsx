import { connect } from 'easy-soft-dva';
import {
  checkHasAuthority,
  getValueByKey,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  dropdownExpandItemType,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { PageListBindQuestionnaireDrawer } from '../../../../Question/PageListBindQuestionnaireDrawer';
import { PracticeModal } from '../../../../Question/PracticeModal';
import { unbindRelationAction } from '../../../../QuestionnaireQuestionRelation/Assist/action';
import { fieldData as fieldDataQuestionnaireQuestion } from '../../../../QuestionnaireQuestionRelation/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ questionnaireQuestionRelation, question, schedulingControl }) => ({
  questionnaireQuestionRelation,
  question,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'questionnaireQuestionRelation/pageList',
      dateRangeFieldName: '绑定时间',
      questionnaireId: null,
      currentRecord: null,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return getDerivedStateFromPropertiesForUrlParameters(
      nextProperties,
      previousState,
      { id: '' },
      parseUrlParametersForSetState,
    );
  }

  checkNeedUpdate = (preProperties, preState, snapshot) => {
    return checkNeedUpdateAssist(this.state, preProperties, preState, snapshot);
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { questionnaireId } = this.state;

    d[fieldDataQuestionnaireQuestion.questionnaireId.name] = questionnaireId;

    return d;
  };

  handleMenuClick = ({ key, handleData }) => {
    switch (key) {
      case 'unbind': {
        this.unbind(handleData);
        break;
      }

      case 'refreshCache': {
        this.refreshCache(handleData);
        break;
      }

      default: {
        showSimpleErrorMessage('can not find matched key');
        break;
      }
    }
  };

  unbind = (item) => {
    const questionnaireId = getValueByKey({
      data: item,
      key: fieldDataQuestionnaireQuestion.questionnaireId.name,
    });

    const questionId = getValueByKey({
      data: item,
      key: fieldDataQuestionnaireQuestion.questionId.name,
    });

    unbindRelationAction({
      target: this,
      handleData: {
        questionnaireId: questionnaireId || 0,
        questionId: questionId || 0,
      },
      successCallback: ({ target }) => {
        target.refreshData({});
      },
    });
  };

  showPageListBindQuestionnaireDrawer = () => {
    PageListBindQuestionnaireDrawer.open();
  };

  afterPageListBindQuestionnaireDrawerClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
  };

  showPracticeModal = (item) => {
    this.setState({ currentRecord: item }, () => {
      PracticeModal.open();
    });
  };

  establishDataContainerExtraActionCollectionConfig = () => {
    return [
      {
        buildType:
          listViewConfig.dataContainerExtraActionBuildType.generalButton,
        type: 'default',
        icon: iconBuilder.plusSquare(),
        text: '新增问题',
        handleClick: this.showPageListBindQuestionnaireDrawer,
      },
    ];
  };

  establishListItemDropdownConfig = (item) => {
    return {
      size: 'small',
      text: '测试',
      icon: iconBuilder.bug(),
      disabled: !checkHasAuthority(
        accessWayCollection.question.practice.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.showPracticeModal(handleData);
      },
      handleData: item,
      handleMenuClick: ({ key, handleData }) => {
        this.handleMenuClick({ key, handleData });
      },
      items: [
        {
          key: 'refreshCache',
          icon: iconBuilder.reload(),
          text: '刷新缓存',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaireQuestionRelation.refreshCache
              .permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
        {
          type: dropdownExpandItemType.divider,
        },
        {
          key: 'unbind',
          icon: iconBuilder.delete(),
          text: '解绑',
          hidden: !checkHasAuthority(
            accessWayCollection.questionnaireQuestionRelation.unbindRelation
              .permission,
          ),
          confirm: true,
          title: '即将解绑关系 (即从问卷中移除该问题)，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataQuestionnaireQuestion.questionTitle,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldDataQuestionnaireQuestion.questionTypeNote,
      width: 120,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget:
        fieldDataQuestionnaireQuestion.questionnaireQuestionRelationId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldDataQuestionnaireQuestion.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];

  renderPresetOther = () => {
    const { questionnaireId, currentRecord } = this.state;

    return (
      <>
        <PageListBindQuestionnaireDrawer
          externalData={{ questionnaireId }}
          afterClose={this.afterPageListBindQuestionnaireDrawerClose}
        />

        <PracticeModal externalData={currentRecord} />
      </>
    );
  };
}

export default PageList;
