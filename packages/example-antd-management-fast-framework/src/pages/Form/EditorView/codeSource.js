export const code = `import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeEditorView } from './codeSource';

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
      pageTitle: 'Editor 示例',
      currentCodeTitle: 'EditorView',
      currentCode: codeEditorView,
    };
  }

  afterHtmlChange = ({ html, text }) => {
    this.htmlContent = html;
    this.textContent = text;
  };

  establishCardCollectionConfig = () => {
    const {
      currentCode,
      currentCodeTitle,

      initContent,
    } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '富文本编辑',
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
              lg: 24,
              type: cardConfig.contentItemType.tinymce,
              content: initContent,
              afterChange: this.afterHtmlChange,
            },
          ],
          instruction: [
            {
              title: '说明',
              showDivider: false,
              showNumber: true,
              list: [
                {
                  text: 'Html数据展示，空白将替换为Empty',
                },
              ],
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
                defaultValue: 'EditorView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'EditorView',
                    name: 'EditorView',
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

                    case 'EditorView': {
                      code = codeEditorView;
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
