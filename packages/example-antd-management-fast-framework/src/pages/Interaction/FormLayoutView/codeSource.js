export const code = `import { connect } from 'easy-soft-dva';
import { mergeArrowText } from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { CenterBox } from 'antd-management-fast-component';

import { BaseView } from '../BaseView';

import { code as codeFormLayoutView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class FormLayoutView extends BaseView {
  showCallProcess = true;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Modal 交互示例',
      currentCodeTitle: 'FormLayoutView',
      currentCode: codeFormLayoutView,
    };
  }

  afterDesignDrawerClose = () => {
    this.reloadData({});
  };

  establishCardCollectionConfig = () => {
    const { currentCode, currentCodeTitle } = this.state;

    return {
      list: [
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: 'auto',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '280px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '区域',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '区域',
          },
          fullLine: false,
          width: 'auto',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '100px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '180px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '400px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '区域',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '180px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '180px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        // {} 可以打断行布局
        {},
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '180px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: 'auto',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '100px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: '400px',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        // null 可以打断行布局
        null,
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: 'auto',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '100px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '占位区域',
          },
          fullLine: false,
          width: 'auto',
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '100px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '区域',
          },
          items: [
            {
              lg: 24,
              type: cardConfig.contentItemType.component,
              component: (
                <div style={{ height: '200px' }}>
                  <CenterBox>content</CenterBox>
                </div>
              ),
            },
          ],
        },
        {
          title: {
            text: '代码示例',
            subText: mergeArrowText('Code', currentCodeTitle),
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
}

export default FormLayoutView;
`;
