import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig, logTemplate } from 'antd-management-fast-common';
import { convertOptionOrRadioData } from 'antd-management-fast-component';

import {
  renderCustomWebChannelRadio,
  renderCustomWebChannelSelect,
  renderFormWebChannelRadio,
  renderFormWebChannelSelect,
  renderSearchWebChannelSelect,
  renderWebChannelDropDown,
} from '../../../customSpecialComponents';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class FunctionExtraView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'FunctionExtraView 交互示例',
      currentCodeTitle: 'FunctionExtraView',
      currentCode: codeView,
      boxVisible: true,
    };
  }

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'FunctionExtra',
          },
          extra: {
            affix: true,
            list: [
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomWebChannelRadio({}),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderCustomWebChannelSelect({
                  style: {
                    minWidth: '230px',
                  },
                }),
              },
              {
                buildType: cardConfig.extraBuildType.divider,
              },
              {
                buildType: cardConfig.extraBuildType.component,
                component: renderWebChannelDropDown({
                  onClick: (o) => {
                    logTemplate(o);
                  },
                }),
              },
            ],
          },
          items: [
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderSearchWebChannelSelect({}),
            },
            {
              lg: 6,
              type: cardConfig.contentItemType.component,
              component: renderFormWebChannelSelect({}),
            },
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: renderFormWebChannelRadio({}),
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
                defaultValue: 'AnimalView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'AnimalView',
                    name: 'AnimalView',
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

                    case 'AnimalView': {
                      code = codeView;
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

export default FunctionExtraView;
