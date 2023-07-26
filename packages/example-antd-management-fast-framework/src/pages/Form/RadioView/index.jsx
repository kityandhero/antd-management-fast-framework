import { Radio } from 'antd';

import { connect } from 'easy-soft-dva';
import {
  buildRandomHexColor,
  logDebug,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  ColorText,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeRadioView } from './codeSource';

const optionList = [
  {
    flag: '1',
    name: '选项1',
    description: '描述1',
  },
  {
    flag: '2',
    name: '选项2',
    description: '描述3',
  },
  {
    flag: '3',
    name: '选项3',
    disabled: true,
    description: '描述3',
  },
];

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
      pageTitle: 'Radio 示例',
      currentCodeTitle: 'RadioView',
      currentCode: codeRadioView,
    };
  }

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '示例',
          },
          extra: {
            affix: true,
            split: false,
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
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio1,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v, event) => {
                logDebug(event, `selectValue -> ${v}`);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio4,
              listData: optionList,
              dataConvert: (o, index) => {
                const { flag, name } = o;

                return {
                  label: name,
                  value: flag,
                  disabled: false,
                  alias: `alias${index}`,
                  ...o,
                };
              },
              renderItem: (item, index) => {
                const { label, value, disabled = false } = item;

                return (
                  <Radio
                    key={`radio_${index}`}
                    value={value}
                    disabled={disabled}
                  >
                    <ColorText
                      text={label}
                      color={buildRandomHexColor({ seed: index * 10 })}
                    />
                  </Radio>
                );
              },
              onChange: (v) => {
                logDebug({ selectValue: v });
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.radio,
              fieldData: fieldData.radio2,
              button: true,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v) => {
                logDebug({ selectValue: v });
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
                defaultValue: 'RadioView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'RadioView',
                    name: 'RadioView',
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

                    case 'RadioView': {
                      code = codeRadioView;
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

  renderPresetPageFooter = () => {
    return 'PageFooter';
  };
}

export default RadioView;
