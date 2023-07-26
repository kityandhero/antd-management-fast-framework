import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeHighlighterView } from './codeSource';

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class HighlighterView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Data 示例',
      currentCodeTitle: 'HighlighterView',
      currentCode: codeHighlighterView,
    };
  }

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'syntaxHighlighter',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: fieldData.syntaxHighlighter,
              value: `SELECT * FROM (SELECT row_number() over (ORDER BY [simple].[sort] DESC, [simple].[create_time] DESC) AS rowId, ISNULL([simple].[id],0) AS [SimpleId] FROM simple WHERE 1=1 AND [simple].[platform_id] = 1504634917793959936 AND [simple].[business_mode] = 400 AND [simple].[status] IN ('0','10') ) as t where rowId between 1 and 10`,
              language: 'sql',
              innerProps: {
                showLineNumbers: false,
                wrapLines: false,
              },
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
                defaultValue: 'HighlighterView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'HighlighterView',
                    name: 'HighlighterView',
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

                    case 'HighlighterView': {
                      code = codeHighlighterView;
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

export default HighlighterView;
