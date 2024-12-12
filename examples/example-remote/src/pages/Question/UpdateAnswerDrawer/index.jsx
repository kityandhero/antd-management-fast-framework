import { Checkbox, Radio, Space, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  toNumber,
  whetherNumber,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';
import {
  DataDrawer,
  switchControlAssist,
} from 'antd-management-fast-framework';

import { fieldData as fieldDataQuestionItem } from '../../QuestionItem/Common/data';
import { fieldData, typeCollection } from '../Common/data';

const { BaseUpdateDrawer } = DataDrawer;

const visibleFlag = 'd3f287ec3d3241b591ad9bbbf249b049';

const { Paragraph } = Typography;

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class UpdateAnswerDrawer extends BaseUpdateDrawer {
  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '编辑答案解析',
      loadApiPath: 'question/get',
      submitApiPath: 'question/updateAnswer',
    };
  }

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.questionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionId.name,
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.questionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionId.name,
    });

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
                                key: fieldDataQuestionItem.questionId.name,
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
                                key: fieldDataQuestionItem.questionId.name,
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

export { UpdateAnswerDrawer };
