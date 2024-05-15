import { connect } from 'easy-soft-dva';
import {
  getValueByKey,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig, logTemplate } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import {
  SelectDrawerField,
  SelectModalField,
} from '../../../businessComponents/SelectField';
import { fieldData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
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
      pageTitle: 'SelectField 示例',
      currentCodeTitle: 'SelectFieldView',
      currentCode: codeSelectFieldView,
      selectData: null,
    };
  }

  afterSelect = (o) => {
    logTemplate(o);

    this.setState({ selectData: o });
  };

  clearSelect = () => {
    this.setState({ selectData: null });
  };

  establishCardCollectionConfig = () => {
    const { selectData, currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'SelectField 示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.onlyShowInput,
              fieldData: fieldData.title,
              value: getValueByKey({
                data: selectData,
                key: fieldData.title.name,
                defaultValue: '目前没有文章被选中',
              }),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: (
                <SelectDrawerField
                  label="选择文章"
                  text="选择文章【Drawer】"
                  helper=""
                  afterSelectSuccess={(d) => {
                    this.afterSelect(d);
                  }}
                  afterClearSelect={this.clearSelect}
                />
              ),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.customSelect,
              component: (
                <SelectModalField
                  label="选择文章"
                  text="选择文章【Modal】"
                  labelWidth={90}
                  helper=""
                  afterSelectSuccess={(d) => {
                    this.afterSelect(d);
                  }}
                  afterClearSelect={this.clearSelect}
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

export default SelectFieldView;
