export const code = `import { Select } from 'antd';

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

import { code as codeSelectView } from './codeSource';

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
      pageTitle: 'Select 示例',
      currentCodeTitle: 'SelectView',
      currentCode: codeSelectView,
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
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.select1,
              listData: optionList,
              dataConvert: dataConvert,
              onChange: (v, option) => {
                logDebug(option, \`selectValue -> \${v}\`);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.select,
              fieldData: fieldData.select2,
              listData: optionList,
              dataConvert: dataConvert,
              renderItem: (item, index) => {
                const { label, value, disabled = false } = item;

                return (
                  <Select.Option
                    key={\`radio_\${index}\`}
                    value={value}
                    disabled={disabled}
                  >
                    <ColorText
                      text={label}
                      color={buildRandomHexColor({ seed: index * 10 })}
                    />
                  </Select.Option>
                );
              },
              onChange: (v, option) => {
                logDebug(option, \`selectValue -> \${v}\`);
              },
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.whetherSelect,
              fieldData: fieldData.selectWhether,
              // listData: optionList,
              // dataConvert: dataConvert,
              // onChange: (v, option) => {
              //   logDebug(option, \`selectValue -> \${v}\`);
              // },
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
                defaultValue: 'SelectView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'SelectView',
                    name: 'SelectView',
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

                    case 'SelectView': {
                      code = codeSelectView;
                      break;
                    }
                  }

                  that.setState({
                    currentCodeTitle: v,
                    currentCode: code,
                  });

                  showSimpleInfoMessage(\`当前显示 \${v} 源代码\`);
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
`;
