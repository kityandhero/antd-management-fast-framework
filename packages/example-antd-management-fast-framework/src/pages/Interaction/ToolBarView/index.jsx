import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  buildDropdownMenu,
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';

import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class ToolBarView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'ToolBarView 交互示例',
      currentCodeTitle: 'ToolBarView',
      currentCode: codeView,
      boxVisible: true,
    };
  }

  toggleFadeBoxShow = () => {
    const { boxVisible } = this.state;

    this.setState({
      boxVisible: !boxVisible,
    });
  };

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '工具栏',
      tools: [
        {
          component: buildButton({
            title: '按钮说明',
            text: '按钮',
            icon: iconBuilder.edit(),
            handleClick: () => {
              this.toggleFadeBoxShow();
            },
          }),
        },
        {
          component: buildDropdownMenu({
            label: '下拉按钮',
            icon: iconBuilder.edit(),
            list: [
              {
                key: '101',
                name: '菜单1',
                icon: iconBuilder.form(),
              },
              {
                key: '102',
                name: '菜单2',
                icon: iconBuilder.form(),
              },
              {
                key: '103',
                name: '菜单3',
                icon: iconBuilder.form(),
              },
            ],
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

export default ToolBarView;
