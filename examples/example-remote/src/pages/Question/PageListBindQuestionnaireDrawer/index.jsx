import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  checkHasAuthority,
  convertCollection,
  getValueByKey,
  toNumber,
  whetherNumber,
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
  getBusinessModeName,
  getQuestionStatusName,
  getQuestionTypeName,
} from '../../../customSpecialComponents';
import { bindRelationAction } from '../../QuestionnaireQuestion/Assist/action';
import { fieldData as fieldDataQuestionnaireQuestion } from '../../QuestionnaireQuestion/Common/data';
import { getStatusBadge } from '../Assist/tools';
import { fieldData, typeCollection } from '../Common/data';

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
          fieldData: fieldData.shortName,
        },
        {
          lg: 8,
          type: searchCardConfig.contentItemType.component,
          component: this.buildSearchCardButtonCore(),
        },
      ],
    };
  };

  establishListItemDropdownConfig = (record) => {
    return {
      size: 'small',
      icon: iconBuilder.select(),
      text: '绑定',
      disabled: !checkHasAuthority(
        accessWayCollection.questionnaireQuestion.bindRelation.permission,
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
      dataTarget: fieldData.image,
      width: 60,
      showRichFacade: true,
      facadeMode: columnFacadeMode.image,
    },
    {
      dataTarget: fieldData.title,
      align: 'left',
      showRichFacade: true,
      emptyValue: '--',
      formatValue: (value, record) => {
        const type = getValueByKey({
          data: record,
          key: fieldData.type.name,
          convert: convertCollection.number,
        });

        if (type !== typeCollection.judgment) {
          return value;
        }

        const whetherCorrect = getValueByKey({
          data: record,
          key: fieldData.whetherCorrect.name,
          convert: convertCollection.number,
        });

        return `（${whetherCorrect === whetherNumber.yes ? '✔' : '✖'}）${value}`;
      },
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
      dataTarget: fieldData.tagName,
      width: 100,
      showRichFacade: true,
      emptyValue: '--',
    },
    {
      dataTarget: fieldData.businessMode,
      width: 140,
      showRichFacade: true,
      emptyValue: '--',
      facadeConfigBuilder: (value) => {
        return {
          color: buildRandomHexColor({
            seed: toNumber(value) * 4 + 32,
          }),
        };
      },
      formatValue: (value) => {
        return getBusinessModeName({
          value: value,
        });
      },
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
