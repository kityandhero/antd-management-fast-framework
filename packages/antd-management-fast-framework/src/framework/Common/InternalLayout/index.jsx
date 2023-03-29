import React from 'react';

import { checkObjectIsNullOrEmpty, isArray } from 'easy-soft-utility';

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
    const configOrComponent = this.establishSiderTopAreaConfig();

    if (configOrComponent == null) {
      return null;
    }

    if (React.isValidElement(configOrComponent)) {
      return configOrComponent;
    }

    return this.buildCardCollectionArea(configOrComponent);
  };

  renderPresetSiderBottomArea = () => {
    const config = this.establishSiderBottomAreaConfig();

    if (config == null) {
      return null;
    }

    return this.buildCardCollectionArea(config);
  };

  renderPresetContentArea = () => {};

  renderPresetPageBodyContent = () => {
    this.logRender('renderPresetPageBodyContent');

    const top = this.renderPresetSiderTopArea();
    const bottom = this.renderPresetSiderBottomArea();

    return (
      <ContentBox
        layoutConfig={this.establishPageContentLayoutConfig()}
        siderConfig={this.establishPageContentLayoutSiderConfig()}
        siderBody={
          checkObjectIsNullOrEmpty(top) &&
          checkObjectIsNullOrEmpty(bottom) ? null : (
            <SiderBox top={top} bottom={bottom} />
          )
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
    this.logRender('renderPresetPageBody');

    if (this.contentTabMode) {
      return (
        <ContentTabBox
          defaultActiveKey={this.getInitialTabActiveKey()}
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
        body={this.renderPresetPageBodyContent()}
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

    let contentGridConfig = this.establishPageHeaderContentGridConfig();

    if (isArray(contentGridConfig)) {
      contentGridConfig = { gridConfig: { list: contentGridConfig } };
    }

    const contentConfig = {
      ...this.establishPageHeaderContentParagraphConfig(),
      ...contentGridConfig,
      ...this.establishPageHeaderContentActionConfig(),
      ...this.establishPageHeaderContentComponentConfig(),
    };

    return (
      <PageWrapper
        dataLoading={dataLoading}
        reloading={reloading}
        showHeader={this.showPageHeader}
        title={this.getPresetPageName()}
        titlePrefix={this.establishPageHeaderTitlePrefix()}
        subTitle={this.establishPageHeaderSubTitle()}
        showAvatar={showPageHeaderAvatar}
        avatarConfig={this.establishPageHeaderAvatarConfig()}
        avatarDefaultIcon={defaultAvatarIcon}
        avatarImageLoadResult={avatarImageLoadResult}
        onAvatarLoadError={() => {
          this.onPageHeaderAvatarLoadError();
        }}
        tagList={this.establishPageHeaderTagCollectionConfig()}
        extraAction={this.buildExtraAction()}
        contentConfig={contentConfig}
        extraContentConfig={this.establishPageHeaderExtraContentConfig()}
      >
        {this.renderPresetPageBody()}
      </PageWrapper>
    );
  }
}

export { InternalLayout };
