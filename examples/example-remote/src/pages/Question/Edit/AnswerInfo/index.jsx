import { Checkbox, Radio, Space, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import {
  cardConfig,
  getDerivedStateFromPropertiesForUrlParameters,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { accessWayCollection } from '../../../../customConfig';
import { fieldData as fieldDataQuestionItem } from '../../../QuestionItem/Common/data';
import { parseUrlParametersForSetState } from '../../Assist/config';
import { fieldData, typeCollection } from '../../Common/data';
import { TabPageBase } from '../../TabPageBase';

const { Paragraph } = Typography;

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class Index extends TabPageBase {
  componentAuthority = accessWayCollection.question.get.permission;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      loadApiPath: 'question/get',
      submitApiPath: 'question/updateAnswer',
      questionId: null,
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

  doOtherAfterLoadSuccess = ({
    // eslint-disable-next-line no-unused-vars
    metaData = null,
    // eslint-disable-next-line no-unused-vars
    metaListData = [],
    // eslint-disable-next-line no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line no-unused-vars
    metaOriginalData = null,
  }) => {};

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { questionId } = this.state;

    d[fieldData.questionId.name] = questionId;

    return d;
  };

  fillInitialValuesAfterLoad = ({
    // eslint-disable-next-line no-unused-vars
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
      values[fieldData.answer.name] = getValueByKey({
        data: metaData,
        key: fieldData.answer.name,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData } = this.state;

    const questionId = getValueByKey({
      data: metaData,
      key: fieldData.questionId.name,
      defaultValue: '',
      convert: convertCollection.string,
    });

    const type = getValueByKey({
      data: metaData,
      key: fieldData.type.name,
      convert: convertCollection.number,
    });

    const whetherCorrect = getValueByKey({
      data: metaData,
      key: fieldData.whetherCorrect.name,
      convert: convertCollection.number,
    });

    const listItem = getValueByKey({
      data: metaData,
      key: fieldData.listItem.name,
      convert: convertCollection.array,
    });

    return {
      list: [
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '题目预览',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <>
                  <Paragraph>
                    {getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                      formatBuilder: (v) => {
                        return `【题目】${v ?? ''}${type === typeCollection.judgment ? `（${whetherCorrect === whetherNumber.yes ? '✔' : '✖'}）` : ''}`;
                      },
                    })}
                  </Paragraph>

                  <div style={{ paddingLeft: '54px' }}>
                    <Space direction="vertical">
                      {listItem.map((o, index) => {
                        if (type === typeCollection.singleSelect) {
                          return (
                            <Radio
                              key={`${questionId}_item_${index}}`}
                              value={getValueByKey({
                                data: o,
                                key: fieldDataQuestionItem.questionItemId.name,
                                convert: convertCollection.string,
                              })}
                              checked={getValueByKey({
                                data: o,
                                key: fieldDataQuestionItem.whetherCorrect.name,
                                formatBuilder: (v) => {
                                  return toNumber(v) === whetherNumber.yes;
                                },
                              })}
                              disabled
                              style={{ color: '#000' }}
                            >
                              {getValueByKey({
                                data: o,
                                key: fieldDataQuestionItem.title.name,
                              })}
                            </Radio>
                          );
                        }

                        if (type === typeCollection.multiSelect) {
                          return (
                            <Checkbox
                              key={`${questionId}_item_${index}}`}
                              value={getValueByKey({
                                data: o,
                                key: fieldDataQuestionItem.questionItemId.name,
                                convert: convertCollection.string,
                              })}
                              checked={getValueByKey({
                                data: o,
                                key: fieldDataQuestionItem.whetherCorrect.name,
                                formatBuilder: (v) => {
                                  return toNumber(v) === whetherNumber.yes;
                                },
                              })}
                              disabled
                              style={{ color: '#000' }}
                            >
                              {getValueByKey({
                                data: o,
                                key: fieldDataQuestionItem.title.name,
                              })}
                            </Checkbox>
                          );
                        }

                        return null;
                      })}
                    </Space>
                  </div>
                </>
              ),
            },
          ],
        },
        {
          title: {
            icon: iconBuilder.contacts(),
            text: '详细答案解析',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.refresh,
              },
              {
                buildType: cardConfig.extraBuildType.save,
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.textarea,
              fieldData: fieldData.answer,
            },
          ],
        },
      ],
    };
  };
}

export default Index;
