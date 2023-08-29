import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';

import { PlaygroundDrawer } from '../../../businessComponents/Drawers/PlaygroundDrawer';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeModalView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class ModalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Modal 交互示例',
      currentCodeTitle: 'ModalView',
      currentCode: codeModalView,
    };
  }

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击显示 PlaygroundModalExtra',
            text: '显示 PlaygroundModalExtra',
            handleClick: () => {
              PlaygroundDrawer.open();
            },
            disabled: false,
          }),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    const that = this;

    return {
      list: [
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
                defaultValue: 'ModalView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'ModalView',
                    name: 'ModalView',
                  },
                  {
                    flag: 'PlaygroundModalExtra',
                    name: 'PlaygroundModalExtra',
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

                    case 'ModalView': {
                      code = codeModalView;
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

  renderPresetOther = () => {
    return (
      <>
        <PlaygroundDrawer />
      </>
    );
  };
}

export default ModalView;
