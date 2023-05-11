export const code = `import { connect } from 'easy-soft-dva';
import {
  logDebug,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import {
  buildButton,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';

import BaseView from '../BaseView';
import DrawerCodeView from '../DrawerCodeView';
import SimpleAddDrawer from '../SimpleAddDrawer';
import { code as codeSimpleAddDrawer } from '../SimpleAddDrawer/codeSource';
import SimpleEditDrawer from '../SimpleEditDrawer';
import { code as codeSimpleEditDrawer } from '../SimpleEditDrawer/codeSource';
import SimpleMultiPageDrawer from '../SimpleMultiPageDrawer';
import { code as codeSimpleMultiPageDrawer } from '../SimpleMultiPageDrawer/codeSource';
import SimpleSinglePageDrawer from '../SimpleSinglePageDrawer';
import { code as codeSimpleSinglePageDrawer } from '../SimpleSinglePageDrawer/codeSource';
import SimpleSinglePageSelectDrawer from '../SimpleSinglePageSelectDrawer';
import { code as codeSimpleSinglePageSelectDrawer } from '../SimpleSinglePageSelectDrawer/codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class DrawerView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Drawer 交互示例',
      currentCodeTitle: 'SimpleSinglePageDrawer',
      currentCode: codeSimpleSinglePageDrawer,
    };
  }

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击显示 SinglePageSelectDrawer',
            text: '显示 SinglePageSelectDrawer',
            handleClick: () => {
              SimpleSinglePageSelectDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 SinglePageDrawer',
            text: '显示 SinglePageDrawer',
            handleClick: () => {
              SimpleSinglePageDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 MultiPageDrawer',
            text: '显示 MultiPageDrawer',
            handleClick: () => {
              SimpleMultiPageDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 AddDrawer',
            text: '显示 AddDrawer',
            handleClick: () => {
              SimpleAddDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 EditDrawer',
            text: '显示 EditDrawer',
            handleClick: () => {
              SimpleEditDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示页面代码',
            text: '显示页面代码',
            type: 'dashed',
            handleClick: () => {
              DrawerCodeView.open();
            },
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
                defaultValue: 'SimpleSinglePageDrawer',
                style: { width: '320px' },
                list: [
                  {
                    flag: 'SimpleSinglePageSelectDrawer',
                    name: 'SimpleSinglePageSelectDrawer',
                  },
                  {
                    flag: 'SimpleSinglePageDrawer',
                    name: 'SimpleSinglePageDrawer',
                  },
                  {
                    flag: 'SimpleMultiPageDrawer',
                    name: 'SimpleMultiPageDrawer',
                  },
                  {
                    flag: 'SimpleAddDrawer',
                    name: 'SimpleAddDrawer',
                  },
                  {
                    flag: 'SimpleEditDrawer',
                    name: 'SimpleEditDrawer',
                  },
                ],
                dataConvert: convertOptionOrRadioData,
                onChange: (v) => {
                  let code = '';

                  switch (v) {
                    case 'SimpleSinglePageSelectDrawer': {
                      code = codeSimpleSinglePageSelectDrawer;
                      break;
                    }

                    case 'SimpleSinglePageDrawer': {
                      code = codeSimpleSinglePageDrawer;
                      break;
                    }

                    case 'SimpleMultiPageDrawer': {
                      code = codeSimpleMultiPageDrawer;
                      break;
                    }

                    case 'SimpleAddDrawer': {
                      code = codeSimpleAddDrawer;
                      break;
                    }

                    case 'SimpleEditDrawer': {
                      code = codeSimpleEditDrawer;
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

  renderPresetOther = () => {
    return (
      <>
        <SimpleSinglePageSelectDrawer />

        <SimpleSinglePageDrawer />

        <SimpleMultiPageDrawer />

        <DrawerCodeView />

        <SimpleAddDrawer
          afterOK={({ subjoinData }) => {
            logDebug(subjoinData, 'trigger afterOK');
          }}
          afterClose={() => {
            logDebug({}, 'trigger afterClose');
          }}
        />

        <SimpleEditDrawer
          externalData={{ simpleId: 1 }}
          afterOK={({ subjoinData }) => {
            logDebug(subjoinData, 'trigger afterOK');
          }}
          afterClose={() => {
            logDebug({}, 'trigger afterClose');
          }}
        />
      </>
    );
  };
}

export default DrawerView;
`;
