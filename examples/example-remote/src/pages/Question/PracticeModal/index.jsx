import { Button, Checkbox, Radio, Space, Typography } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  getValueByKey,
  toNumber,
  toString,
  whetherNumber,
  whetherString,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { ColorText } from 'antd-management-fast-component';
import { DataModal, switchControlAssist } from 'antd-management-fast-framework';

import { fieldData as fieldDataQuestionItem } from '../../QuestionItem/Common/data';
import { practiceAction } from '../Assist/action';
import { getTypeName } from '../Assist/tools';
import { fieldData, typeCollection } from '../Common/data';

const { Paragraph } = Typography;
const { BaseUpdateModal } = DataModal;

// 显隐控制标记, 必须设置, 标记需要全局唯一
const visibleFlag = '1cd0bc39bdcb4418895622c3860436e1';

@connect(({ question, schedulingControl }) => ({
  question,
  schedulingControl,
}))
class PracticeModal extends BaseUpdateModal {
  showFooter = false;

  selectValue = '';

  static open() {
    switchControlAssist.open(visibleFlag);
  }

  constructor(properties) {
    super(properties, visibleFlag);

    this.state = {
      ...this.state,
      pageTitle: '测试题目',
      loadApiPath: 'question/get',
      submitApiPath: 'question/practice',
      /**
       * 题目测验是否已完成
       */
      practiceComplete: false,
      /**
       * 题目测验结果
       */
      practiceResult: false,
    };
  }

  /**
   * 显示前执行值初始化
   */
  executeAfterDoOtherWhenChangeVisibleToShow = () => {
    this.setState({
      practiceComplete: false,
      practiceResult: false,
    });
  };

  /**
   * 窗体关闭后执行值的初始化
   */
  executeAfterDoOtherWhenChangeVisibleToHide = () => {
    this.setState({
      practiceComplete: false,
      practiceResult: false,
    });
  };

  supplementLoadRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.questionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionId.name,
      defaultValue: '',
    });

    return d;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;
    const { externalData } = this.state;

    d[fieldData.questionId.name] = getValueByKey({
      data: externalData,
      key: fieldData.questionId.name,
      defaultValue: '',
    });

    d.value = this.selectValue;

    return d;
  };

  practice = () => {
    const { metaData } = this.state;

    practiceAction({
      target: this,
      handleData: {
        questionId: getValueByKey({
          data: metaData,
          key: fieldData.questionId.name,
          defaultValue: '',
        }),
        value: this.selectValue,
      },
      successCallback: ({ target, remoteData }) => {
        const {
          practice: { result },
        } = remoteData;

        target.setState({
          practiceComplete: true,
          practiceResult: toNumber(result) === whetherNumber.yes,
        });
      },
    });
  };

  onSingleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    this.selectValue = toString(value);
  };

  onMultiSelectChange = (values) => {
    this.selectValue = values.join(',');
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        flex: '80px',
      },
      wrapperCol: {
        flex: 'auto',
      },
    };
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
      values[fieldData.whetherCorrect.name] = getValueByKey({
        data: metaData,
        key: fieldData.whetherCorrect.name,
        convert: convertCollection.string,
      });
    }

    return values;
  };

  establishCardCollectionConfig = () => {
    const { metaData, practiceComplete, practiceResult } = this.state;

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

    const listItem = getValueByKey({
      data: metaData,
      key: fieldData.listItem.name,
      convert: convertCollection.array,
    });

    const judgmentComponent = (
      <Radio.Group name={questionId} onChange={this.onSingleSelectChange}>
        <Space direction="vertical">
          <Radio
            key={`${questionId}_item_whether_${whetherString.yes}}`}
            value={whetherString.yes}
            style={{ color: '#000' }}
            disabled={practiceComplete}
          >
            ✔
          </Radio>

          <Radio
            key={`${questionId}_item_whether_${whetherString.no}}`}
            value={whetherString.no}
            style={{ color: '#000' }}
            disabled={practiceComplete}
          >
            ✖
          </Radio>
        </Space>
      </Radio.Group>
    );

    const singleSelectComponent = (
      <Radio.Group name={questionId} onChange={this.onSingleSelectChange}>
        <Space direction="vertical">
          {listItem.map((o, index) => {
            return (
              <Radio
                key={`${questionId}_item_${index}}`}
                value={getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.questionItemId.name,
                  convert: convertCollection.string,
                })}
                style={{ color: '#000' }}
                disabled={practiceComplete}
              >
                {getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.title.name,
                })}

                {practiceComplete
                  ? `（${
                      getValueByKey({
                        data: o,
                        key: fieldDataQuestionItem.whetherCorrect.name,
                        formatBuilder: (v) => {
                          return toNumber(v) === whetherNumber.yes;
                        },
                      })
                        ? '✔'
                        : '✖'
                    }）`
                  : null}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    );

    const multoSelectComponent = (
      <Checkbox.Group name={questionId} onChange={this.onMultiSelectChange}>
        <Space direction="vertical">
          {listItem.map((o, index) => {
            return (
              <Checkbox
                key={`${questionId}_item_${index}}`}
                value={getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.questionItemId.name,
                  convert: convertCollection.string,
                })}
                style={{ color: '#000' }}
                disabled={practiceComplete}
              >
                {getValueByKey({
                  data: o,
                  key: fieldDataQuestionItem.title.name,
                })}

                {practiceComplete
                  ? `（${
                      getValueByKey({
                        data: o,
                        key: fieldDataQuestionItem.whetherCorrect.name,
                        formatBuilder: (v) => {
                          return toNumber(v) === whetherNumber.yes;
                        },
                      })
                        ? '✔'
                        : '✖'
                    }）`
                  : null}
              </Checkbox>
            );
          })}
        </Space>
      </Checkbox.Group>
    );

    return {
      list: [
        {
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
                        return `【${getTypeName(type)}】${v ?? ''}`;
                      },
                    })}
                  </Paragraph>

                  <div style={{ paddingLeft: '10px' }}>
                    {type === typeCollection.judgment
                      ? judgmentComponent
                      : null}

                    {type === typeCollection.singleSelect
                      ? singleSelectComponent
                      : null}

                    {type === typeCollection.multiSelect
                      ? multoSelectComponent
                      : null}
                  </div>
                </>
              ),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              innerProps: {
                style: {
                  margin: '24px 0 24px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowTextByFlexText,
              hidden: !practiceComplete,
              value: `【答题结果】回答${practiceResult ? '正确' : '错误'}`,
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              hidden: !practiceComplete,
              text: (
                <ColorText text="答案解析" textStyle={{ fontSize: '14px' }} />
              ),
              innerProps: {
                orientation: 'left',
                style: {
                  margin: '10px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowText,
              hidden: !practiceComplete,
              value: getValueByKey({
                data: metaData,
                key: fieldData.answer.name,
                convert: convertCollection.string,
              }),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
              hidden: !practiceComplete,
              innerProps: {
                style: {
                  margin: '0 0 24px 0',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ paddingLeft: '10px' }}>
                  <Button
                    disabled={practiceComplete || this.checkLoadingProgress()}
                    onClick={this.practice}
                  >
                    提交答案
                  </Button>
                </div>
              ),
            },
          ],
        },
      ],
    };
  };
}

export { PracticeModal };
