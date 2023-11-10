import { connect } from 'easy-soft-dva';

import { cardConfig } from 'antd-management-fast-common';
import { CenterBox } from 'antd-management-fast-component';

import { BaseView } from '../BaseView';

import { code as codeModalView } from './codeSource';

@connect(({ schedulingControl }) => ({
  schedulingControl,
}))
class FormLayoutView extends BaseView {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      pageTitle: 'Modal 交互示例',
      currentCodeTitle: 'ModalView',
      currentCode: codeModalView,
    };
  }

  afterDesignDrawerClose = () => {
    this.reloadData({});
  };

  establishCardCollectionConfig = () => {
    return {
      list: [
        {
          title: {
            text: '区域',
          },
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
        [
          {
            title: {
              text: '区域',
            },
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
        ],
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
        [
          {
            title: {
              text: '占位区域',
            },
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
              text: '区域',
            },
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
        ],
        [
          {
            title: {
              text: '区域',
            },
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
        ],
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
      ],
    };
  };
}

export default FormLayoutView;
