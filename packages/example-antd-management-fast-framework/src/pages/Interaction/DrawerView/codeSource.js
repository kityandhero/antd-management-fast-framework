export const code = `import { connect } from 'easy-soft-dva';
import {
  logDebug,
  mergeArrowText,
  showSimpleInfoMessage,
  showSimpleSuccessMessage,
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
import SimpleSinglePageFrontendPaginationMultiSelectDrawer from '../SimpleSinglePageFrontendPaginationMultiSelectDrawer';
import { code as codeSimpleSinglePageFrontendPaginationMultiSelectDrawer } from '../SimpleSinglePageFrontendPaginationMultiSelectDrawer/codeSource';
import SimpleSinglePageFrontendPaginationSelectDrawer from '../SimpleSinglePageFrontendPaginationSelectDrawer';
import { code as codeSimpleSinglePageFrontendPaginationSelectDrawer } from '../SimpleSinglePageFrontendPaginationSelectDrawer/codeSource';
import SimpleSinglePageFrontendPaginationSingleSelectDrawer from '../SimpleSinglePageFrontendPaginationSingleSelectDrawer';
import { code as codeSimpleSinglePageFrontendPaginationSingleSelectDrawer } from '../SimpleSinglePageFrontendPaginationSingleSelectDrawer/codeSource';
import SimpleSinglePageMultiSelectDrawer from '../SimpleSinglePageMultiSelectDrawer';
import { code as codeSimpleSinglePageMultiSelectDrawer } from '../SimpleSinglePageMultiSelectDrawer/codeSource';
import SimpleSinglePageSelectDrawer from '../SimpleSinglePageSelectDrawer';
import { code as codeSimpleSinglePageSelectDrawer } from '../SimpleSinglePageSelectDrawer/codeSource';
import SimpleSinglePageSingleSelectDrawer from '../SimpleSinglePageSingleSelectDrawer';
import { code as codeSimpleSinglePageSingleSelectDrawer } from '../SimpleSinglePageSingleSelectDrawer/codeSource';

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
            title: '点击显示 SinglePageDrawer',
            text: 'SinglePageDrawer',
            handleClick: () => {
              SimpleSinglePageDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 MultiPageDrawer',
            text: 'MultiPageDrawer',
            handleClick: () => {
              SimpleMultiPageDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 AddDrawer',
            text: 'AddDrawer',
            handleClick: () => {
              SimpleAddDrawer.open();
            },
          }),
        },
        {
          component: buildButton({
            title: '点击显示 EditDrawer',
            text: 'EditDrawer',
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
            text: '单页列表选择功能实例',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SinglePageFrontendPaginationSelectDrawer',
                text: '显示 SinglePageFrontendPaginationSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationSelectDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title:
                  '点击显示 SimpleSinglePageFrontendPaginationSingleSelectDrawer',
                text: '显示 SimpleSinglePageFrontendPaginationSingleSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationSingleSelectDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title:
                  '点击显示 SimpleSinglePageFrontendPaginationMultiSelectDrawer',
                text: '显示 SimpleSinglePageFrontendPaginationMultiSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationMultiSelectDrawer.open();
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '单页列表选择功能实例 [页面模拟分页效果]',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SinglePageSelectDrawer',
                text: '显示 SinglePageSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageSelectDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageSingleSelectDrawer',
                text: '显示 SimpleSinglePageSingleSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageSingleSelectDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageMultiSelectDrawer',
                text: '显示 SimpleSinglePageMultiSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageMultiSelectDrawer.open();
                },
              }),
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
                defaultValue: 'SimpleSinglePageDrawer',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'SimpleSinglePageSelectDrawer',
                    name: 'SimpleSinglePageSelectDrawer',
                  },
                  {
                    flag: 'SimpleSinglePageSingleSelectDrawer',
                    name: 'SimpleSinglePageSingleSelectDrawer',
                  },
                  {
                    flag: 'SimpleSinglePageMultiSelectDrawer',
                    name: 'SimpleSinglePageMultiSelectDrawer',
                  },
                  {
                    flag: 'SimpleSinglePageFrontendPaginationSelectDrawer',
                    name: 'SimpleSinglePageFrontendPaginationSelectDrawer',
                  },
                  {
                    flag: 'SimpleSinglePageFrontendPaginationSingleSelectDrawer',
                    name: 'SimpleSinglePageFrontendPaginationSingleSelectDrawer',
                  },
                  {
                    flag: 'SimpleSinglePageFrontendPaginationMultiSelectDrawer',
                    name: 'SimpleSinglePageFrontendPaginationMultiSelectDrawer',
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

                    case 'SimpleSinglePageSingleSelectDrawer': {
                      code = codeSimpleSinglePageMultiSelectDrawer;
                      break;
                    }

                    case 'SimpleSinglePageMultiSelectDrawer': {
                      code = codeSimpleSinglePageSingleSelectDrawer;
                      break;
                    }

                    case 'SimpleSinglePageFrontendPaginationSelectDrawer': {
                      code = codeSimpleSinglePageFrontendPaginationSelectDrawer;
                      break;
                    }

                    case 'SimpleSinglePageFrontendPaginationSingleSelectDrawer': {
                      code =
                        codeSimpleSinglePageFrontendPaginationSingleSelectDrawer;
                      break;
                    }

                    case 'SimpleSinglePageFrontendPaginationMultiSelectDrawer': {
                      code =
                        codeSimpleSinglePageFrontendPaginationMultiSelectDrawer;
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

  // eslint-disable-next-line no-unused-vars
  afterSelectSuccess = (data) => {
    // console.log(data);

    showSimpleSuccessMessage('Select Success');
  };

  renderPresetOther = () => {
    return (
      <>
        <SimpleSinglePageSelectDrawer
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageSingleSelectDrawer
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageMultiSelectDrawer
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageFrontendPaginationSelectDrawer
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageFrontendPaginationSingleSelectDrawer
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageFrontendPaginationMultiSelectDrawer
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageDrawer afterSelectSuccess={this.afterSelectSuccess} />

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
