import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton } from 'antd-management-fast-component';
import { DataForm } from 'antd-management-fast-framework';

import SimpleModal from '../SimpleModal';
import { code } from '../SimpleModal/codeSource';

const { BaseAddForm } = DataForm;

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class Add extends BaseAddForm {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Model 交互示例',
    };
  }

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击显示Model',
            text: '显示Model',
            handleClick: () => {
              SimpleModal.open();
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
        <SimpleModal
          externalData={{ simpleId: 1 }}
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

export default Add;
