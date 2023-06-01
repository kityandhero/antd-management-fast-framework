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
import { code as codeBaseView } from '../BaseView/codeSource';
import SimpleAddModal from '../SimpleAddModal';
import { code as codeSimpleAddModal } from '../SimpleAddModal/codeSource';
import SimpleEditModal from '../SimpleEditModal';
import { code as codeSimpleEditModal } from '../SimpleEditModal/codeSource';

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
            title: '点击显示 AddModal',
            text: '显示 AddModal',
            handleClick: () => {
              SimpleAddModal.open();
            },
            disabled: false,
          }),
        },
        {
          component: buildButton({
            title: '点击显示 EditModal',
            text: '显示 EditModal',
            handleClick: () => {
              SimpleEditModal.open();
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
                    flag: 'SimpleAddModal',
                    name: 'SimpleAddModal',
                  },
                  {
                    flag: 'SimpleEditModal',
                    name: 'SimpleEditModal',
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

                    case 'SimpleAddModal': {
                      code = codeSimpleAddModal;

                      break;
                    }

                    case 'SimpleEditModal': {
                      code = codeSimpleEditModal;

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
        <SimpleAddModal
          afterOK={({ subjoinData }) => {
            logDebug(subjoinData, 'trigger afterOK');
          }}
          afterCancel={() => {
            logDebug({}, 'trigger afterCancel');
          }}
        />

        <SimpleEditModal
          externalData={{ simpleId: 1 }}
          afterOK={({ subjoinData }) => {
            logDebug(subjoinData, 'trigger afterOK');
          }}
          afterCancel={() => {
            logDebug({}, 'trigger afterCancel');
          }}
        />
      </>
    );
  };
}

export default ModalView;
`;