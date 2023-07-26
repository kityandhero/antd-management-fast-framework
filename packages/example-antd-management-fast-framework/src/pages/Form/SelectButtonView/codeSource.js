export const code = `import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig, selectModeCollection } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import { SelectButton } from '../../../businessComponents/SelectButton';
import { fieldData } from '../../../businessData/data';
import { BaseView }  from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeSelectFieldView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class SelectFieldView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Animal 交互示例',
      currentCodeTitle: 'SelectFieldView',
      currentCode: codeSelectFieldView,
      selectData: null,
    };
  }

  afterSelect = (o) => {
    console.log('-----------------------------');
    console.log(o);
  };

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'SelectField 高级选择',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.customSelect,
              component: (
                <SelectButton
                  selectMode={selectModeCollection.drawer}
                  label={fieldData.title.label}
                  text="选择文章"
                  valueText={''}
                  helper={fieldData.title.helper}
                  afterSelect={(d) => {
                    this.afterSelect(d);
                  }}
                  afterClearSelect={() => {
                    this.clearSelect();
                  }}
                />
              ),
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
                defaultValue: 'SelectFieldView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'SelectFieldView',
                    name: 'SelectFieldView',
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

                    case 'SelectFieldView': {
                      code = codeSelectFieldView;
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

export default SelectFieldView;
`;
