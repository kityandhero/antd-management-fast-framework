import { connect } from 'easy-soft-dva';
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

import { code as codeBaseSimpleMultiPageModal } from '../../../businessComponents/Modals/Multi/ListModal/BaseSimpleMultiPageModal/codeSource';
import SimpleMultiPageModal from '../../../businessComponents/Modals/Multi/ListModal/SimpleMultiPageModal';
import { code as codeSimpleMultiPageModal } from '../../../businessComponents/Modals/Multi/ListModal/SimpleMultiPageModal/codeSource';
import { code as codeBaseSimpleMultiPageSelectModal } from '../../../businessComponents/Modals/Multi/SelectModal/BaseSimpleMultiPageSelectModal/codeSource';
import SimpleMultiPageConfirmSelectModal from '../../../businessComponents/Modals/Multi/SelectModal/SimpleMultiPageConfirmSelectModal';
import SimpleMultiPageMultiSelectModal from '../../../businessComponents/Modals/Multi/SelectModal/SimpleMultiPageMultiSelectModal';
import SimpleMultiPageSingleSelectModal from '../../../businessComponents/Modals/Multi/SelectModal/SimpleMultiPageSingleSelectModal';
import { SimpleAddModal } from '../../../businessComponents/Modals/SimpleAddModal';
import { code as codeSimpleAddModal } from '../../../businessComponents/Modals/SimpleAddModal/codeSource';
import { SimpleDisplayModal } from '../../../businessComponents/Modals/SimpleDisplayModal';
import { code as codeSimpleDisplayModal } from '../../../businessComponents/Modals/SimpleDisplayModal/codeSource';
import { SimpleEditModal } from '../../../businessComponents/Modals/SimpleEditModal';
import { code as codeSimpleEditModal } from '../../../businessComponents/Modals/SimpleEditModal/codeSource';
import { code as codeBaseSimpleSinglePageModal } from '../../../businessComponents/Modals/Single/ListModal/BaseSimpleSinglePageModal/codeSource';
import SimpleSingleFrontendPaginationPageModal from '../../../businessComponents/Modals/Single/ListModal/SimpleSingleFrontendPaginationPageModal';
import { code as codeSimpleSingleFrontendPaginationPageModal } from '../../../businessComponents/Modals/Single/ListModal/SimpleSingleFrontendPaginationPageModal/codeSource';
import SimpleSinglePageModal from '../../../businessComponents/Modals/Single/ListModal/SimpleSinglePageModal';
import { code as codeSimpleSinglePageModal } from '../../../businessComponents/Modals/Single/ListModal/SimpleSinglePageModal/codeSource';
import { code as codeBaseSimpleSinglePageSelectModal } from '../../../businessComponents/Modals/Single/SelectModal/BaseSimpleSinglePageSelectModal/codeSource';
import SimpleSinglePageFrontendPaginationConfirmSelectModal from '../../../businessComponents/Modals/Single/SelectModal/FrontendPagination/SimpleSinglePageFrontendPaginationConfirmSelectModal';
import SimpleSinglePageFrontendPaginationMultiSelectModal from '../../../businessComponents/Modals/Single/SelectModal/FrontendPagination/SimpleSinglePageFrontendPaginationMultiSelectModal';
import SimpleSinglePageFrontendPaginationSingleSelectModal from '../../../businessComponents/Modals/Single/SelectModal/FrontendPagination/SimpleSinglePageFrontendPaginationSingleSelectModal';
import SimpleSinglePageConfirmSelectModal from '../../../businessComponents/Modals/Single/SelectModal/Normal/SimpleSinglePageConfirmSelectModal';
import SimpleSinglePageMultiSelectModal from '../../../businessComponents/Modals/Single/SelectModal/Normal/SimpleSinglePageMultiSelectModal';
import SimpleSinglePageSingleSelectModal from '../../../businessComponents/Modals/Single/SelectModal/Normal/SimpleSinglePageSingleSelectModal';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

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
      title: '操作',
      tools: [
        {
          component: buildButton({
            title: '点击显示 SimpleDisplayModal',
            text: '显示 SimpleDisplayModal',
            handleClick: () => {
              SimpleDisplayModal.open();
            },
            disabled: false,
          }),
        },
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
            title: '点击显示 SimpleSinglePageModal',
            text: '显示 SimpleSinglePageModal',
            handleClick: () => {
              SimpleSinglePageModal.open();
            },
            disabled: false,
          }),
        },
        {
          component: buildButton({
            title: '点击显示 SimpleSingleFrontendPaginationPageModal',
            text: '显示 SimpleSingleFrontendPaginationPageModal',
            handleClick: () => {
              SimpleSingleFrontendPaginationPageModal.open();
            },
            disabled: false,
          }),
        },
        {
          component: buildButton({
            title: '点击显示 SimpleMultiPageModal',
            text: '显示 SimpleMultiPageModal',
            handleClick: () => {
              SimpleMultiPageModal.open();
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
            text: '单页列表选择功能实例 [常规]',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageConfirmSelectModal',
                text: '显示 SimpleSinglePageConfirmSelectModal',
                handleClick: () => {
                  SimpleSinglePageConfirmSelectModal.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageSingleSelectModal',
                text: '显示 SimpleSinglePageSingleSelectModal',
                handleClick: () => {
                  SimpleSinglePageSingleSelectModal.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageMultiSelectModal',
                text: '显示 SimpleSinglePageMultiSelectModal',
                handleClick: () => {
                  SimpleSinglePageMultiSelectModal.open();
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '单页列表选择功能实例 [前端模拟分页]',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title:
                  '点击显示 SinglePageFrontendPaginationConfirmSelectModal',
                text: '显示 SinglePageFrontendPaginationConfirmSelectModal',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationConfirmSelectModal.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title:
                  '点击显示 SimpleSinglePageFrontendPaginationSingleSelectModal',
                text: '显示 SimpleSinglePageFrontendPaginationSingleSelectModal',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationSingleSelectModal.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title:
                  '点击显示 SimpleSinglePageFrontendPaginationMultiSelectModal',
                text: '显示 SimpleSinglePageFrontendPaginationMultiSelectModal',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationMultiSelectModal.open();
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '分页列表选择功能实例',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageConfirmSelectModal',
                text: '显示 SimpleMultiPageConfirmSelectModal',
                handleClick: () => {
                  SimpleMultiPageConfirmSelectModal.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageSingleSelectModal',
                text: '显示 SimpleMultiPageSingleSelectModal',
                handleClick: () => {
                  SimpleMultiPageSingleSelectModal.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageMultiSelectModal',
                text: '显示 SimpleMultiPageMultiSelectModal',
                handleClick: () => {
                  SimpleMultiPageMultiSelectModal.open();
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
                    flag: 'BaseSimpleSinglePageModal',
                    name: 'BaseSimpleSinglePageModal',
                  },
                  {
                    flag: 'BaseSimpleSinglePageSelectModal',
                    name: 'BaseSimpleSinglePageSelectModal',
                  },
                  {
                    flag: 'BaseSimpleMultiPageModal',
                    name: 'BaseSimpleMultiPageModal',
                  },
                  {
                    flag: 'BaseSimpleMultiPageSelectModal',
                    name: 'BaseSimpleMultiPageSelectModal',
                  },
                  {
                    flag: 'SimpleDisplayModal',
                    name: 'SimpleDisplayModal',
                  },
                  {
                    flag: 'SimpleAddModal',
                    name: 'SimpleAddModal',
                  },
                  {
                    flag: 'SimpleEditModal',
                    name: 'SimpleEditModal',
                  },
                  {
                    flag: 'SimpleMultiPageModal',
                    name: 'SimpleMultiPageModal',
                  },
                  {
                    flag: 'SimpleSinglePageModal',
                    name: 'SimpleSinglePageModal',
                  },
                  {
                    flag: 'SimpleSingleFrontendPaginationPageModal',
                    name: 'SimpleSingleFrontendPaginationPageModal',
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

                    case 'BaseSimpleSinglePageModal': {
                      code = codeBaseSimpleSinglePageModal;
                      break;
                    }

                    case 'BaseSimpleSinglePageSelectModal': {
                      code = codeBaseSimpleSinglePageSelectModal;
                      break;
                    }

                    case 'BaseSimpleMultiPageModal': {
                      code = codeBaseSimpleMultiPageModal;
                      break;
                    }

                    case 'BaseSimpleMultiPageSelectModal': {
                      code = codeBaseSimpleMultiPageSelectModal;
                      break;
                    }

                    case 'SimpleDisplayModal': {
                      code = codeSimpleDisplayModal;

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

                    case 'SimpleMultiPageModal': {
                      code = codeSimpleMultiPageModal;

                      break;
                    }

                    case 'SimpleSinglePageModal': {
                      code = codeSimpleSinglePageModal;

                      break;
                    }

                    case 'SimpleSingleFrontendPaginationPageModal': {
                      code = codeSimpleSingleFrontendPaginationPageModal;

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

  renderPresetOther = () => {
    return (
      <>
        <SimpleSinglePageConfirmSelectModal
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageSingleSelectModal
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageMultiSelectModal
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageFrontendPaginationConfirmSelectModal
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageFrontendPaginationSingleSelectModal
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageFrontendPaginationMultiSelectModal
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleMultiPageConfirmSelectModal
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleMultiPageSingleSelectModal
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleMultiPageMultiSelectModal
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageModal />

        <SimpleSingleFrontendPaginationPageModal />

        <SimpleMultiPageModal />

        <SimpleDisplayModal />

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
