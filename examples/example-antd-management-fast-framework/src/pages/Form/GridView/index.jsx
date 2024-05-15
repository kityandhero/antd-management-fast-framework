import { connect } from 'easy-soft-dva';
import {
  convertCollection,
  formatCollection,
  formatTarget,
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
  to,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildCustomGrid,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeGridView } from './codeSource';

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class RadioView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Form 交互示例',
      currentCodeTitle: 'GridView',
      currentCode: codeGridView,
    };
  }

  establishCardCollectionConfig = () => {
    const { metaData, currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: buildCustomGrid({
                list: [
                  {
                    label: fieldData.simpleId.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.simpleId.name,
                    }),
                    canCopy: true,
                  },
                  {
                    span: 2,
                    label: fieldData.title.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.title.name,
                    }),
                  },
                  {
                    label: fieldData.sort.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.sort.name,
                      convert: convertCollection.string,
                    }),
                  },
                  {
                    label: fieldData.subtitle.label,
                    value: '',
                    emptyValue: '空白值演示',
                  },
                  {
                    label: '百分比转换',
                    value: formatTarget({
                      target: 0.24,
                      format: formatCollection.percentage,
                    }),
                  },
                  {
                    label: '中文金额',
                    value: formatTarget({
                      target: 451.31,
                      format: formatCollection.chineseMoney,
                    }),
                  },
                  {
                    label: '日期格式化',
                    value: formatTarget({
                      target: new Date('2023-03-01 10:35:54'),
                      format: formatCollection.datetime,
                    }),
                  },
                  {
                    label: '金额格式化',
                    value: formatTarget({
                      target: 451.31,
                      format: formatCollection.money,
                    }),
                  },
                  {
                    label: '类型转换',
                    value: to({
                      target: 0.24,
                      convert: convertCollection.string,
                    }),
                  },
                  {
                    span: 2,
                    label: fieldData.description.label,
                    value: getValueByKey({
                      data: metaData,
                      key: fieldData.description.name,
                    }),
                  },
                ],
                props: {
                  bordered: true,
                  column: 3,
                  emptyStyle: {
                    color: '#cccccc',
                  },
                  emptyValue: '待完善',
                  labelStyle: {
                    width: '140px',
                  },
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '内嵌表格展示',
          },
          items: [
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                title: '标题标题',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '140px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                title: '标题标题',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: true,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.divider,
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  span: 2,
                  label: fieldData.title.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.title.name,
                  }),
                },
                {
                  label: fieldData.subtitle.label,
                  value: '',
                  emptyValue: '空白值演示',
                },
                {
                  label: '百分比转换',
                  value: formatTarget({
                    target: 0.24,
                    format: formatCollection.percentage,
                  }),
                },
                {
                  label: fieldData.simpleId.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.simpleId.name,
                  }),
                  canCopy: true,
                },
                {
                  label: fieldData.sort.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.sort.name,
                    convert: convertCollection.string,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: false,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
              },
            },
            {
              lg: 12,
              type: cardConfig.contentItemType.customGrid,
              list: [
                {
                  label: '中文金额',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.chineseMoney,
                  }),
                },
                {
                  label: '日期格式化',
                  value: formatTarget({
                    target: new Date('2023-03-01 10:35:54'),
                    format: formatCollection.datetime,
                  }),
                },
                {
                  label: '金额格式化',
                  value: formatTarget({
                    target: 451.31,
                    format: formatCollection.money,
                  }),
                },
                {
                  label: '类型转换',
                  value: to({
                    target: 0.24,
                    convert: convertCollection.string,
                  }),
                },
                {
                  span: 2,
                  label: fieldData.description.label,
                  value: getValueByKey({
                    data: metaData,
                    key: fieldData.description.name,
                  }),
                },
              ],
              props: {
                size: 'small',
                bordered: false,
                column: 2,
                emptyStyle: {
                  color: '#cccccc',
                },
                emptyValue: '待完善',
                labelStyle: {
                  width: '100px',
                },
                ellipsis: false,
              },
            },
          ],
        },
        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.flexSelect,
                label: '显示源代码',
                size: 'small',
                defaultValue: 'GridView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'GridView',
                    name: 'GridView',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'BaseView': {
                      code = codeBaseView;
                      break;
                    }

                    case 'GridView': {
                      code = codeGridView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(`当前显示 ${v} 源代码`);
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: currentCode,
              language: 'js',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
            },
          ],
        },
      ],
    };
  };
}

export default RadioView;
