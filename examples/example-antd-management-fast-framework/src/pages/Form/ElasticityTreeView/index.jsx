import { connect } from 'easy-soft-dva';
import { mergeArrowText, showSimpleInfoMessage } from 'easy-soft-utility';

import { cardConfig, extraBuildType } from 'antd-management-fast-common';
import {
  convertOptionOrRadioData,
  iconBuilder,
} from 'antd-management-fast-component';

import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeHighlighterView } from './codeSource';
import { listOneLevel, listTwoLevel } from './data';

// eslint-disable-next-line no-unused-vars
function dataConvert(o, index) {
  const { flag, name } = o;

  return { label: name, value: flag, disabled: false, ...o };
}

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class ElasticityTreeView extends BaseView {
  // 在控制台显示组建内调用序列, 仅为进行开发辅助
  // showCallProcess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Data 示例',
      currentCodeTitle: 'HighlighterView',
      currentCode: codeHighlighterView,
      crossingLevel: 1,
      listData: listOneLevel,
    };
  }

  setListDataLevelOne = () => {
    const that = this;

    that.setState({
      crossingLevel: 1,
      listData: listOneLevel,
    });
  };

  setListDataLevelTwo = () => {
    const that = this;

    that.setState({
      crossingLevel: 2,
      listData: listTwoLevel,
    });
  };

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle, listData, crossingLevel } =
      this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: 'tree',
          },
          hasExtra: true,
          extra: {
            affix: true,
            list: [
              {
                buildType: extraBuildType.dropdown,
                icon: iconBuilder.fork(),
                size: 'default',
                text: `${crossingLevel}级级联`,
                handleData: {},
                hidden: false,
                // eslint-disable-next-line no-unused-vars
                handleButtonClick: ({ handleData }) => {
                  showSimpleInfoMessage('点击下拉按钮切换数据');
                },
                // eslint-disable-next-line no-unused-vars
                handleMenuClick: ({ key, handleData }) => {
                  switch (key) {
                    case 'setListDataLevelOne': {
                      this.setListDataLevelOne();

                      break;
                    }

                    case 'setListDataLevelTwo': {
                      this.setListDataLevelTwo();

                      break;
                    }
                  }
                },
                items: [
                  {
                    key: 'setListDataLevelOne',
                    icon: iconBuilder.form(),
                    text: '设为 1 级级联',
                  },
                  {
                    key: 'setListDataLevelTwo',
                    icon: iconBuilder.form(),
                    text: '设为 2 级级联',
                  },
                ],
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.tree,
              showLine: true,
              switcherIcon: iconBuilder.down(),
              listData: listData,
              dataConvert: (o) => {
                const { name: title, code: value } = o;

                return {
                  title,
                  value,
                };
              },
              innerProps: {
                defaultExpandAll: true,
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
                defaultValue: 'ElasticityTreeView',
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

export default ElasticityTreeView;
