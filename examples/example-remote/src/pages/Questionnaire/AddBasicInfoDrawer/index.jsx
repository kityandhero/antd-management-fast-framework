import { connect } from 'easy-soft-dva';
import {
  checkInCollection,
  filter,
  toNumber,
  toString,
  whetherString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  FunctionSupplement,
  iconBuilder,
} from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { accessWayCollection } from '../../../customConfig';
import {
  buildNowTimeFieldItem,
  renderFormBusinessModeSelect,
  renderFormQuestionnaireQuestionCreateModeSelect,
} from '../../../customSpecialComponents';
import { fieldData, questionCreateModeCollection } from '../Common/data';

const { BaseAddDrawer } = DataDrawer;
const {
  Whether: { renderFormWhetherSelect },
} = FunctionSupplement;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '48979415b4834d5c85802fbadb2280af';

@connect(({ questionnaire, schedulingControl }) => ({
  questionnaire,
  schedulingControl,
}))
class AddBasicInfoDrawer extends BaseAddDrawer {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  componentAuthority =
    accessWayCollection.questionnaire.addBasicInfo.permission;

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '新增问卷',
      submitApiPath: 'questionnaire/addBasicInfo',
      image: '',
      currentQuestionCreateMode: '',
    };
  }

  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.setState({
      image: '',
      currentQuestionCreateMode: '',
    });
  };

  supplementSubmitRequestParams = (o) => {
    const d = { ...o };

    const { image } = this.state;

    d[fieldData.image.name] = image;

    return d;
  };

  afterImageUploadSuccess = (image) => {
    this.setState({ image: image });
  };

  onQuestionCreateModeChange = (o) => {
    const valueAdjust = toNumber(o);

    this.setState({
      currentQuestionCreateMode: toString(o),
    });

    if (valueAdjust === questionCreateModeCollection.random) {
      const value = {};

      value[fieldData.whetherGroupDisplay.name] = whetherString.no;
      value[fieldData.whetherRandomOrder.name] = whetherString.no;

      this.setFormFieldsValue(value);
    }
  };

  fillDefaultInitialValues = () => {
    const values = {};

    values[fieldData.questionCreateMode.name] = toString(
      questionCreateModeCollection.global,
    );
    values[fieldData.whetherGroupDisplay.name] = whetherString.no;
    values[fieldData.whetherRandomOrder.name] = whetherString.no;
    values[fieldData.sort.name] = 0;

    return values;
  };

  establishCardCollectionConfig = () => {
    const { image, currentQuestionCreateMode } = this.state;

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
              type: cardConfig.contentItemType.input,
              fieldData: fieldData.title,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormBusinessModeSelect({}),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.inputNumber,
              fieldData: fieldData.sort,
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormQuestionnaireQuestionCreateModeSelect({
                adjustListData: (list) => {
                  const listAdjust = filter(list, (one) => {
                    const { flag } = one;

                    return checkInCollection(
                      [
                        toString(questionCreateModeCollection.global),
                        toString(questionCreateModeCollection.random),
                      ],
                      toString(flag),
                    );
                  });

                  return listAdjust;
                },
                onChange: this.onQuestionCreateModeChange,
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormWhetherSelect({
                name: fieldData.whetherGroupDisplay.name,
                label: fieldData.whetherGroupDisplay.label,
                helper: fieldData.whetherGroupDisplay.helper,
                innerProps: {
                  disabled:
                    toNumber(currentQuestionCreateMode) ===
                    questionCreateModeCollection.random,
                },
              }),
              require: true,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.component,
              component: renderFormWhetherSelect({
                name: fieldData.whetherRandomOrder.name,
                label: fieldData.whetherRandomOrder.label,
                helper: fieldData.whetherRandomOrder.helper,
                innerProps: {
                  disabled:
                    toNumber(currentQuestionCreateMode) ===
                    questionCreateModeCollection.random,
                },
              }),
              require: true,
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.picture(),
            text: '图例上传',
            subText: '[上传后需点击保存按钮保存!]',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.imageUpload,
              image: image,
              action: `/questionnaire/uploadImage`,
              afterUploadSuccess: (imageData) => {
                this.afterImageUploadSuccess(imageData);
              },
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '简介 - 描述 - 备注',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.description,
            },
          ],
        },
        buildNowTimeFieldItem({}),
      ],
    };
  };
}

export { AddBasicInfoDrawer };
