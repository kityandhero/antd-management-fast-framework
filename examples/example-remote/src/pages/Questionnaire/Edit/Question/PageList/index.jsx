import { connect } from 'easy-soft-dva';
import { checkHasAuthority } from 'easy-soft-utility';

import {
  columnFacadeMode,
  getDerivedStateFromPropertiesForUrlParameters,
  listViewConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import { DataMultiPageView } from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../../../customConfig';
import { PageListBindQuestionnaireDrawer } from '../../../../Question/PageListBindQuestionnaireDrawer';
import { fieldData as fieldDataQuestionnaireQuestion } from '../../../../QuestionnaireQuestion/Common/data';
import {
  checkNeedUpdateAssist,
  parseUrlParametersForSetState,
} from '../../../Assist/config';

const { InnerMultiPage } = DataMultiPageView;

@connect(({ questionnaireQuestion, question, schedulingControl }) => ({
  questionnaireQuestion,
  question,
  schedulingControl,
}))
class PageList extends InnerMultiPage {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'questionnaireQuestion/pageList',
      dateRangeFieldName: '操作时间',
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

  showPageListBindQuestionnaireDrawer = () => {
    PageListBindQuestionnaireDrawer.open();
  };

  afterPageListBindQuestionnaireDrawerClose = () => {
    this.refreshDataWithReloadAnimalPrompt({});
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
      text: '修改',
      icon: iconBuilder.edit(),
      disabled: !checkHasAuthority(
        accessWayCollection.questionnaireQuestion.get.permission,
      ),
      handleButtonClick: ({ handleData }) => {
        this.goToEdit(handleData);
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
            accessWayCollection.questionnaireQuestion.refreshCache.permission,
          ),
          confirm: true,
          title: '即将刷新缓存，确定吗？',
        },
      ],
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldDataQuestionnaireQuestion.questionTitle,
      width: 320,
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
      dataTarget: fieldDataQuestionnaireQuestion.questionnaireQuestionId,
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
    const { questionnaireId } = this.state;

    return (
      <>
        <PageListBindQuestionnaireDrawer
          externalData={{ questionnaireId }}
          afterClose={this.afterPageListBindQuestionnaireDrawerClose}
        />
      </>
    );
  };
}

export default PageList;
