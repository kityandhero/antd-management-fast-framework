import React from 'react';

import { logExecute } from 'easy-soft-utility';

import { PageExtra } from 'antd-management-fast-component';

import { InternalBuild } from '../InternalBuild';

const {
  ContentBox,
  BodyContent,
  SiderBox,
  ToolBar,
  HelpContent,
  PageWrapper,
  ContentTabBox,
  TabBarExtraBox,
} = PageExtra;

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

    const { currentTabKey } = this.state;

    if (this.contentTabMode) {
      return (
        <ContentTabBox
          activeKey={currentTabKey}
          list={this.getTabListAvailable()}
          extraContent={{
            left: (
              <TabBarExtraBox
                list={this.buildByExtraBuildType({
                  keyPrefix: 'data_tab_container_tab_bar_left_action_key',
                  list: this.establishTabBarExtraContentLeftConfig(),
                })}
              />
            ),
            right: (
              <TabBarExtraBox
                list={this.buildByExtraBuildType({
                  keyPrefix: 'data_tab_container_tab_bar_right_action_key',
                  list: this.establishTabBarExtraContentRightConfig(),
                })}
              />
            ),
          }}
          onTabChange={this.handleTabChange}
        />
      );
    }

    return (
      <BodyContent
        body={this.renderPresetPageContent()}
        bottom={this.renderPresetOther()}
      />
    );
  };

  renderFurther() {
    const {
      showPageHeaderAvatar,
      defaultAvatarIcon,
      dataLoading,
      reloading,
      avatarImageLoadResult,
    } = this.state;

    return (
      <PageWrapper
        dataLoading={dataLoading}
        reloading={reloading}
        showHeader={this.showPageHeader}
        title={this.getPresetPageName()}
        titlePrefix={this.establishPageHeaderTitlePrefix()}
        subTitle={this.buildPageHeaderSubTitle()}
        showAvatar={showPageHeaderAvatar}
        avatarConfig={this.establishPageHeaderAvatarConfig()}
        avatarDefaultIcon={defaultAvatarIcon}
        avatarImageLoadResult={avatarImageLoadResult}
        onAvatarLoadError={() => {
          this.onPageHeaderAvatarLoadError();
        }}
        tagList={this.establishPageHeaderTagCollectionConfig()}
        extraAction={this.buildExtraAction()}
        content={this.establishPageHeaderContentConfig()}
        extraContentConfig={this.establishPageHeaderExtraContentConfig()}
      >
        {this.renderPresetPageBody()}
      </PageWrapper>
    );
  }
}

export { InternalLayout };
