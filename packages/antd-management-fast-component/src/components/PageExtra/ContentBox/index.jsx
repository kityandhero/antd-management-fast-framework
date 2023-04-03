import { Layout, Space } from 'antd';
import React, { PureComponent } from 'react';

import { checkInCollection, checkObjectIsNullOrEmpty } from 'easy-soft-utility';

const { Content, Sider } = Layout;

class ContentBox extends PureComponent {
  render() {
    const {
      layoutConfig = null,
      siderConfig = null,
      siderBody = null,
      toolbar,
      contentBody = null,
      bottom,
    } = this.props;

    const { position: positionSource } = {
      position: 'left',
      ...siderConfig,
    };

    const siderPosition = checkInCollection(['left', 'right'], positionSource)
      ? positionSource
      : 'left';

    const siderConfigAdjust = {
      width: 300,
      style: {
        backgroundColor: '#fff',
        borderRadius: '4px',
        overflowX: 'auto',
        overflowY: 'hidden',
        ...(siderPosition === 'left'
          ? { marginRight: '16px' }
          : { marginLeft: '16px' }),
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
          <Space style={{ width: '100%' }} direction="vertical" size={14}>
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
