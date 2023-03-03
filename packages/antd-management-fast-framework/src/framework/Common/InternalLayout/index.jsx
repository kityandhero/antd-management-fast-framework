import React from 'react';

import { logExecute } from 'easy-soft-utility';

import { PageExtra } from 'antd-management-fast-component';

import { InternalBuild } from '../InternalBuild';

const { ContentBox, BodyContent, SiderBox, ToolBar, HelpContent } = PageExtra;

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

  renderPresetContentArea = () => {};

  renderPresetPageContent = () => {
    logExecute('renderPresetPageContent');

    return (
      <ContentBox
        layoutConfig={this.establishPageContentLayoutConfig()}
        siderConfig={this.establishPageContentLayoutSiderConfig()}
        siderBody={
          <SiderBox
            top={this.renderPresetSiderTopArea()}
            bottom={this.renderPresetSiderBottomArea()}
          />
        }
        toolbar={<ToolBar {...this.establishToolBarConfig()} />}
        contentBody={this.renderPresetContentArea()}
        bottom={
          <HelpContent
            wrapperType={this.contentWrapperType}
            {...this.establishHelpConfig()}
          />
        }
      />
    );
  };

  renderPresetPageBody = () => {
    logExecute('renderPresetPageBody');

    return (
      <BodyContent
        body={this.renderPresetPageContent()}
        bottom={this.renderPresetOther()}
      />
    );
  };
}

export { InternalLayout };
