import { Layout, Space } from 'antd';
import React from 'react';

import { checkObjectIsNullOrEmpty } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';

const { Content, Sider } = Layout;

class ContentBox extends BaseComponent {
  renderFurther() {
    const {
      layoutConfig = null,
      siderConfig = null,
      siderBody = null,
      toolbar,
      contentBody = null,
      bottom,
    } = this.props;

    const { position: siderPosition } = {
      position: 'left',
      ...siderConfig,
    };

    const siderConfigAdjust = {
      width: 300,
      style: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        overflowX: 'auto',
        overflowY: 'hidden',
        ...(siderPosition === 'left'
          ? { marginRight: '24px' }
          : { marginLeft: '24px' }),
      },
      ...(checkObjectIsNullOrEmpty(siderConfig) ? {} : siderConfig),
    };

    const layoutConfigAdjust = {
      breakpoint: 'sm',
      style: {
        backgroundColor: '#f0f2f5',
        minHeight: 'auto',
      },
      ...(checkObjectIsNullOrEmpty(layoutConfig) ? {} : layoutConfig),
    };

    const inner =
      siderBody == null ? (
        contentBody
      ) : (
        <Layout {...layoutConfigAdjust}>
          {siderPosition === 'left' ? (
            <Sider {...siderConfigAdjust}>{siderBody}</Sider>
          ) : null}

          <Content
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          >
            {contentBody}
          </Content>

          {siderPosition === 'left' ? null : (
            <Sider {...siderConfigAdjust}>{siderBody}</Sider>
          )}
        </Layout>
      );

    if ((toolbar || null) != null || (bottom || null) != null) {
      return (
        <div style={{ overflowX: 'hidden' }}>
          <Space style={{ width: '100%' }} direction="vertical" size={24}>
            {toolbar}

            {inner}

            {bottom}
          </Space>
        </div>
      );
    }

    return inner;
  }
}

ContentBox.defaultProps = {
  layoutConfig: {},
  siderConfig: {},
  siderBody: null,
  contentBody: null,
  toolbar: null,
  bottom: null,
};

export { ContentBox };
