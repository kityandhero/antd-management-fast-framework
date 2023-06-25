import { FloatButton } from 'antd';
import React from 'react';

import { checkObjectIsNullOrEmpty, isArray } from 'easy-soft-utility';

import { PageExtra } from 'antd-management-fast-component';

import { PageExtraWrapper } from '../../../components/PageExtraWrapper';
import { InternalBuild } from '../InternalBuild';

const { ContentBox, BodyContent, SiderBox, ToolBar, HelpContent } = PageExtra;
const { BackTop } = FloatButton;

const primaryCallName = 'Common::InternalLayout';

class InternalLayout extends InternalBuild {
  renderPresetSiderTopArea = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetSiderTopArea');

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
    this.logCallTrack({}, primaryCallName, 'renderPresetSiderBottomArea');

    const config = this.establishSiderBottomAreaConfig();

    if (config == null) {
      return null;
    }

    return this.buildCardCollectionArea(config);
  };

  renderPresetContentArea = () => {};

  renderPresetPageBodyContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPageBodyContent');

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
    this.logCallTrack({}, primaryCallName, 'renderPresetPageBody');

    return (
      <BodyContent
        body={this.renderPresetPageBodyContent()}
        bottom={this.renderPresetOther()}
      />
    );
  };

  renderPresetPageFooter = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPageFooter');

    return null;
  };

  renderPresetFloatButton = () => {
    return <BackTop style={{ bottom: 75 }} />;
  };

  renderFurther() {
    this.logCallTrack({}, primaryCallName, 'renderFurther');

    const { showPageHeaderAvatar, defaultAvatarIcon, avatarImageLoadResult } =
      this.state;

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
      <PageExtraWrapper
        tabFlag={this.viewTabFlag}
        flag={[this.viewLoadingFlag, this.viewReloadingFlag]}
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
        tabList={this.getTabListAvailable()}
        tabBarExtraContent={this.buildTabBarExtraContent()}
        onTabChange={this.handleTabChange}
        tabProps={this.buildOtherTabProps()}
        footer={this.renderPresetPageFooter()}
        floatButton={this.renderPresetFloatButton()}
      >
        {this.renderPresetPageBody()}
      </PageExtraWrapper>
    );
  }
}

export { InternalLayout };
