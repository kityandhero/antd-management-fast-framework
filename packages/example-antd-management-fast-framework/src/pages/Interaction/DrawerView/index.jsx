import { connect } from 'easy-soft-dva';
import {
  logDebug,
  mergeArrowText,
  showSimpleInfoMessage,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { cardConfig, dataTypeCollection } from 'antd-management-fast-common';
import {
  buildButton,
  convertOptionOrRadioData,
} from 'antd-management-fast-component';
import { DataPreviewDrawer } from 'antd-management-fast-framework';

import { SimpleMultiPageDrawer } from '../../../businessComponents/Drawers/Multi/ListDrawer/SimpleMultiPageDrawer';
import { code as codeBaseSimpleMultiPageSelectDrawer } from '../../../businessComponents/Drawers/Multi/SelectDrawer/BaseSimpleMultiPageSelectDrawer/codeSource';
import { SimpleMultiPageConfirmSelectDrawer } from '../../../businessComponents/Drawers/Multi/SelectDrawer/SimpleMultiPageConfirmSelectDrawer';
import { SimpleMultiPageMultiSelectDrawer } from '../../../businessComponents/Drawers/Multi/SelectDrawer/SimpleMultiPageMultiSelectDrawer';
import { SimpleMultiPageSingleSelectDrawer } from '../../../businessComponents/Drawers/Multi/SelectDrawer/SimpleMultiPageSingleSelectDrawer';
import { SimpleAddDrawer } from '../../../businessComponents/Drawers/SimpleAddDrawer';
import { SimpleEditDrawer } from '../../../businessComponents/Drawers/SimpleEditDrawer';
import { SimpleVerticalFlexDrawer } from '../../../businessComponents/Drawers/SimpleVerticalFlexDrawer';
import { SimpleSingleFrontendPaginationPageDrawer } from '../../../businessComponents/Drawers/Single/ListDrawer/SimpleSingleFrontendPaginationPageDrawer';
import { SimpleSinglePageDrawer } from '../../../businessComponents/Drawers/Single/ListDrawer/SimpleSinglePageDrawer';
import { code as codeBaseSimpleSinglePageSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/BaseSimpleSinglePageSelectDrawer/codeSource';
import { SimpleSinglePageFrontendPaginationConfirmSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/FrontendPagination/SimpleSinglePageFrontendPaginationConfirmSelectDrawer';
import { SimpleSinglePageFrontendPaginationMultiSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/FrontendPagination/SimpleSinglePageFrontendPaginationMultiSelectDrawer';
import { SimpleSinglePageFrontendPaginationSingleSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/FrontendPagination/SimpleSinglePageFrontendPaginationSingleSelectDrawer';
import { SimpleSinglePageConfirmSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/Normal/SimpleSinglePageConfirmSelectDrawer';
import { SimpleSinglePageMultiSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/Normal/SimpleSinglePageMultiSelectDrawer';
import { SimpleSinglePageSingleSelectDrawer } from '../../../businessComponents/Drawers/Single/SelectDrawer/Normal/SimpleSinglePageSingleSelectDrawer';
import { simpleJsonData } from '../../../businessData/data';
import { BaseView } from '../BaseView';
import { code as codeBaseView } from '../BaseView/codeSource';

import { code as codeDrawerView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class DrawerView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Drawer 交互示例',
      currentCodeTitle: 'DrawerView',
      currentCode: codeDrawerView,
    };
  }

  establishToolBarConfig = () => {
    return {
      stick: false,
      title: '操作栏',
      tools: [
        {
          component: buildButton({
            title: '点击显示 VerticalFlexDrawer',
            text: 'VerticalFlexDrawer',
            handleClick: () => {
              SimpleVerticalFlexDrawer.open();
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
            text: '列表实例',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageDrawer',
                text: '显示 SimpleSinglePageDrawer',
                handleClick: () => {
                  SimpleSinglePageDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSingleFrontendPaginationPageDrawer',
                text: '显示 SimpleSingleFrontendPaginationPageDrawer',
                handleClick: () => {
                  SimpleSingleFrontendPaginationPageDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageDrawer',
                text: '显示 SimpleMultiPageDrawer',
                handleClick: () => {
                  SimpleMultiPageDrawer.open();
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '单页列表选择功能实例 [常规]',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleSinglePageConfirmSelectDrawer',
                text: '显示 SimpleSinglePageConfirmSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageConfirmSelectDrawer.open();
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
            text: '单页列表选择功能实例 [前端模拟分页]',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title:
                  '点击显示 SinglePageFrontendPaginationConfirmSelectDrawer',
                text: '显示 SinglePageFrontendPaginationConfirmSelectDrawer',
                handleClick: () => {
                  SimpleSinglePageFrontendPaginationConfirmSelectDrawer.open();
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
            text: '分页列表选择功能实例',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageConfirmSelectDrawer',
                text: '显示 SimpleMultiPageConfirmSelectDrawer',
                handleClick: () => {
                  SimpleMultiPageConfirmSelectDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageSingleSelectDrawer',
                text: '显示 SimpleMultiPageSingleSelectDrawer',
                handleClick: () => {
                  SimpleMultiPageSingleSelectDrawer.open();
                },
              }),
            },
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 SimpleMultiPageMultiSelectDrawer',
                text: '显示 SimpleMultiPageMultiSelectDrawer',
                handleClick: () => {
                  SimpleMultiPageMultiSelectDrawer.open();
                },
              }),
            },
          ],
        },
        {
          title: {
            text: '内置Drawer组件示例',
          },
          items: [
            {
              lg: 8,
              type: cardConfig.contentItemType.component,
              component: buildButton({
                title: '点击显示 Json 预览',
                text: '显示 Json 预览',
                handleClick: () => {
                  DataPreviewDrawer.open();
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
                defaultValue: 'DrawerView',
                style: { width: '520px' },
                list: [
                  {
                    flag: 'BaseView',
                    name: 'BaseView',
                  },
                  {
                    flag: 'DrawerView',
                    name: 'DrawerView',
                  },
                  {
                    flag: 'BaseSimpleSinglePageSelectDrawer',
                    name: 'BaseSimpleSinglePageSelectDrawer',
                  },
                  {
                    flag: 'BaseSimpleMultiPageSelectDrawer',
                    name: 'BaseSimpleMultiPageSelectDrawer',
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

                    case 'DrawerView': {
                      code = codeDrawerView;
                      break;
                    }

                    case 'BaseSimpleSinglePageSelectDrawer': {
                      code = codeBaseSimpleSinglePageSelectDrawer;
                      break;
                    }

                    case 'BaseSimpleMultiPageSelectDrawer': {
                      code = codeBaseSimpleMultiPageSelectDrawer;
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

  // eslint-disable-next-line no-unused-vars
  afterSelectSuccess = (data) => {
    // console.log(data);

    showSimpleSuccessMessage('Select Success');
  };

  renderPresetOther = () => {
    return (
      <>
        <SimpleSinglePageConfirmSelectDrawer
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

        <SimpleSinglePageFrontendPaginationConfirmSelectDrawer
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

        <SimpleMultiPageConfirmSelectDrawer
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleMultiPageSingleSelectDrawer
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleMultiPageMultiSelectDrawer
          multiSelect={true}
          hideAfterSelect={false}
          afterSelectSuccess={this.afterSelectSuccess}
        />

        <SimpleSinglePageDrawer />

        <SimpleSingleFrontendPaginationPageDrawer />

        <SimpleMultiPageDrawer />

        <SimpleVerticalFlexDrawer
          maskClosable
          afterClose={() => {
            logDebug({}, 'trigger afterClose');
          }}
        />

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

        <DataPreviewDrawer
          maskClosable
          title="Json预览"
          descriptionLabel="简要描述"
          description="数据结构概览"
          dataType={dataTypeCollection.jsonObjectList.flag}
          data={simpleJsonData}
        />
      </>
    );
  };
}

export default DrawerView;
