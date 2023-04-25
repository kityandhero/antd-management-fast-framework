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
import SimpleAddModal from '../SimpleAddModal';
import { code as codeSimpleAddModal } from '../SimpleAddModal/codeSource';
import SimpleEditModal from '../SimpleEditModal';
import { code as codeSimpleEditModal } from '../SimpleEditModal/codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class ModalView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Modal 交互示例',
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
                ? 'SimpleAddModal'
                : 'SimpleEditModal',
            ),
          },
          extra: {
            affix: true,
            split: false,
            list: [
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: 'SimpleAddModal 源代码',
                size: 'small',
                type: 'link',
                handleClick: () => {
                  that.setState({
                    interactionMode: interactionModeCollection.add,
                  });

                  showSimpleInfoMessage('当前显示 SimpleAddModal 源代码');
                },
              },
              {
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: 'SimpleEditModal 源代码',
                size: 'small',
                type: 'link',
                handleClick: () => {
                  that.setState({
                    interactionMode: interactionModeCollection.edit,
                  });

                  showSimpleInfoMessage('当前显示 SimpleEditModal 源代码');
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
                  ? codeSimpleAddModal
                  : codeSimpleEditModal,
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
          afterClose={() => {
            logDebug({}, 'trigger afterClose');
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
          afterClose={() => {
            logDebug({}, 'trigger afterClose');
          }}
        />
      </>
    );
  };
}

export default ModalView;
