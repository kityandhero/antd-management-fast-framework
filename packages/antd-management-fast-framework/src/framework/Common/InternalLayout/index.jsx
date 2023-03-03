import { Layout, Space } from 'antd';
import React from 'react';

import { FlexBox } from 'antd-management-fast-component';

import { InternalBuild } from '../InternalBuild';

const { Content, Sider } = Layout;

class InternalLayout extends InternalBuild {
  renderPresetSiderTopArea = () => {
    const config = this.establishSiderTopAreaConfig();

    if (config == null) {
      return null;
    }

    return this.buildCardCollectionArea(config);
  };

  renderPresetSiderBottomArea = () => {
    const config = this.establishSiderBottomAreaConfig();

    if (config == null) {
      return null;
    }

    return this.buildCardCollectionArea(config);
  };

  renderPresetSiderArea = () => {
    const topArea = this.renderPresetSiderTopArea();

    const bottomArea = this.renderPresetSiderBottomArea();

    if ((bottomArea || null) == null) {
      return topArea;
    }

    return <FlexBox flexAuto="top" top={topArea} bottom={bottomArea} />;
  };

  renderPresetContentArea = () => null;

  renderPresetPageContent = () => {
    const siderArea = this.renderPresetSiderArea();
    const contentArea = this.renderPresetContentArea();

    const layoutSiderConfig = this.establishPageContentLayoutSiderConfig();
    let layoutConfig = this.establishPageContentLayoutConfig();

    const { position: siderPosition } = {
      position: 'left',
      ...layoutSiderConfig,
    };

    const siderConfig = {
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
      ...layoutSiderConfig,
    };

    layoutConfig = {
      breakpoint: 'sm',
      style: {
        backgroundColor: '#f0f2f5',
        minHeight: 'auto',
      },
      ...layoutConfig,
    };

    const inner =
      siderArea == null ? (
        contentArea
      ) : (
        <Layout {...layoutConfig}>
          {siderPosition === 'left' ? (
            <Sider {...siderConfig}>{siderArea}</Sider>
          ) : null}

          <Content
            style={{
              backgroundColor: '#fff',
              borderRadius: '4px',
            }}
          >
            {contentArea}
          </Content>

          {siderPosition === 'left' ? null : (
            <Sider {...siderConfig}>{siderArea}</Sider>
          )}
        </Layout>
      );

    const toolbar = this.buildToolBarWrapper();

    const help = this.buildHelpWrapper();

    if ((toolbar || null) != null || (help || null) != null) {
      return (
        <div style={{ overflowX: 'hidden' }}>
          <Space style={{ width: '100%' }} direction="vertical" size={24}>
            {toolbar}

            {inner}

            {help}
          </Space>
        </div>
      );
    }

    return inner;
  };

  renderPresetPageBody = () => {
    return (
      <div
        style={{
          padding: '20px 24px',
        }}
      >
        {this.renderPresetPageContent()}

        {this.renderPresetOther()}
      </div>
    );
  };
}

export { InternalLayout };
