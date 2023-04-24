import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton } from 'antd-management-fast-component';

import BaseView from '../BaseView';
import SimpleAddDrawer from '../SimpleAddDrawer';
import { code } from '../SimpleAddDrawer/codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class DrawerView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Drawer 交互示例',
    };
  }

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击显示 AddDrawer',
            text: '显示 AddDrawer',
            handleClick: () => {
              SimpleAddDrawer.open();
            },
            disabled: false,
          }),
        },
      ],
    };
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            text: '代码示例',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.syntaxHighlighterView,
              fieldData: 'syntaxHighlighter',
              value: code,
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
        <SimpleAddDrawer
        // afterOK={({ subjoinData }) => {
        //   this.afterAddBasicInfoDrawerOk({ subjoinData });
        // }}
        // afterCancel={() => {
        //   this.afterAddBasicInfoDrawerCancel();
        // }}
        // afterClose={() => {
        //   this.afterAddBasicInfoDrawerClose();
        // }}
        />
      </>
    );
  };
}

export default DrawerView;
