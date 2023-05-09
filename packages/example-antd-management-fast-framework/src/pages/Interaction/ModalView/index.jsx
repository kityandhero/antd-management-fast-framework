import { connect } from 'easy-soft-dva';
import {
  logDebug,
  mergeArrowText,
  showSimpleInfoMessage,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import BaseView from '../BaseView';
import ModalCodeView from '../ModalCodeView';
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
      currentCodeTitle: 'SimpleAddModal',
      currentCode: codeSimpleAddModal,
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
        {
          component: buildButton({
            title: '点击显示页面代码',
            text: '显示页面代码',
            type: 'dashed',
            handleClick: () => {
              ModalCodeView.open();
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
                buildType: cardConfig.extraBuildType.generalButton,
                icon: iconBuilder.form(),
                text: 'SimpleAddModal 源代码',
                size: 'small',
                type: 'link',
                handleClick: () => {
                  that.setState({
                    currentCodeTitle: 'SimpleAddModal',
                    currentCode: codeSimpleAddModal,
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
                    currentCodeTitle: 'SimpleEditModal',
                    currentCode: codeSimpleEditModal,
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
        <ModalCodeView />

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
