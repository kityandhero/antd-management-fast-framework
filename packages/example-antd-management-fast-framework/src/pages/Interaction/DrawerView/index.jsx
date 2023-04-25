import { connect } from 'easy-soft-dva';
import {
  logDebug,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { interactionModeCollection } from '../../../constants';
import BaseView from '../BaseView';
import DrawerCodeView from '../DrawerCodeView';
import SimpleAddDrawer from '../SimpleAddDrawer';
import { code as codeSimpleAddDrawer } from '../SimpleAddDrawer/codeSource';
import SimpleEditDrawer from '../SimpleEditDrawer';
import { code as codeSimpleEditDrawer } from '../SimpleEditDrawer/codeSource';
import SimpleMultiPageDrawer from '../SimpleMultiPageDrawer';
import SimpleSinglePageDrawer from '../SimpleSinglePageDrawer';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class DrawerView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Drawer 交互示例',
      interactionMode: interactionModeCollection.add,
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
    const { interactionMode } = this.state;

    const that = this;

    return {
      list: [
        {
          title: {
            text: '代码示例',
            subText: mergeArrowText(
              'Code',
              interactionMode === interactionModeCollection.add
                ? 'SimpleAddDrawer'
                : 'SimpleEditDrawer',
            ),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: 'SimpleAddDrawer 源代码',
                size: 'small',
                type: 'link',
                handleClick: () => {
                  that.setState({
                    interactionMode: interactionModeCollection.add,
                  });

                  showSimpleInfoMessage('当前显示 SimpleAddDrawer 源代码');
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: 'SimpleEditDrawer 源代码',
                size: 'small',
                type: 'link',
                handleClick: () => {
                  that.setState({
                    interactionMode: interactionModeCollection.edit,
                  });

                  showSimpleInfoMessage('当前显示 SimpleEditDrawer 源代码');
                },
              },
            ],
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value:
                interactionMode === interactionModeCollection.add
                  ? codeSimpleAddDrawer
                  : codeSimpleEditDrawer,
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
