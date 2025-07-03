import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  getValueByKey,
  toNumber,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  searchCardConfig,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataMultiPageView,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  getQuestionStatusName,
  getQuestionTypeName,
} from '../../../customSpecialComponents';
import { bindRelationAction } from '../../QuestionnaireQuestionRelation/Assist/action';
import { fieldData as fieldDataQuestionnaireQuestion } from '../../QuestionnaireQuestionRelation/Common/data';
import { getStatusBadge } from '../Assist/tools';
import { fieldData } from '../Common/data';

const { MultiPageDrawer } = DataMultiPageView;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '951a69342a164cf1a0a1c08dc2cb2221';

@connect(({ question, userSubsidiaryInfo, schedulingControl }) => ({
  question,
  userSubsidiaryInfo,
  schedulingControl,
}))
class PageListBindQuestionnaireDrawer extends MultiPageDrawer {
  reloadWhenShow = true;

  componentAuthority =
    accessWayCollection.question.pageListWithoutQuestionnaire.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '绑定到问卷',
      loadApiPath: 'question/pageListWithoutQuestionnaire',
      tableScrollX: 1320,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    return super.getDerivedStateFromProps(nextProperties, previousState);
  }

  supplementLoadRequestParams = (o) => {
    const d = { ...o };
    const { externalData } = this.state;

    d[fieldDataQuestionnaireQuestion.questionnaireId.name] = getValueByKey({
      data: externalData,
      key: fieldDataQuestionnaireQuestion.questionnaireId.name,
      defaultValue: '',
    });

    return d;
  };

  bind = (item) => {
    const { externalData } = this.props;

    const questionnaireId = getValueByKey({
      data: externalData,
      key: fieldDataQuestionnaireQuestion.questionnaireId.name,
    });

    const questionId = getValueByKey({
      data: item,
      key: fieldData.questionId.name,
    });

    bindRelationAction({
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

  renderPresetTitleIcon = () => null;

  establishSearchCardConfig = () => {
    return {
      list: [
        {
          lg: 16,
          type: searchCardConfig.contentItemType.input,
          fieldData: fieldData.title,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishPresetAboveTableAlertMessage = () => {
    return '此处仅列出不在问卷中的且位于启用状态的备选问题。';
  };

  establishPresetAboveTableAlertContainerStyle = () => {
    return {
      paddingBottom: '12px',
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      icon: iconBuilder.select(),
      text: '绑定',
      disabled: !checkHasAuthority(
        accessWayCollection.questionnaireQuestionRelation.bindRelation
          .permission,
      ),
      handleButtonClick: () => {
        this.bind(record);
      },
      confirm: true,
      title: '立即绑定到问卷，确定吗？',
    };
  };

  getColumnWrapper = () => [
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.type,
      width: 80,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 14 + 12,
          }),
        };
      },
      formatValue: (value) => {
        return getQuestionTypeName({
          value: value,
        });
      },
    },
    {
      dataTarget: fieldData.image,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.tagName,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.status,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
      facadeMode: columnFacadeMode.badge,
      facadeConfigBuilder: (value) => {
        return {
          status: getStatusBadge(value),
          text: getQuestionStatusName({
            value: value,
          }),
        };
      },
    },
    {
      dataTarget: fieldData.questionId,
      width: 120,
      showRichFacade: true,
      canCopy: true,
    },
    {
      dataTarget: fieldData.createTime,
      width: 160,
      showRichFacade: true,
      facadeMode: columnFacadeMode.datetime,
    },
  ];
}

export { PageListBindQuestionnaireDrawer };
