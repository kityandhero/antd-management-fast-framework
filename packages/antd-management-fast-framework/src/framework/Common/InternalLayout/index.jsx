import { FloatButton } from 'antd';
import React from 'react';

import {
  checkObjectIsNullOrEmpty,
  isArray,
  isEmptyObject,
  isObject,
  logCallTrack,
  mergeArrowText,
  toString,
} from 'easy-soft-utility';

import { renderFurtherPrefixWhenNoCallProcess } from 'antd-management-fast-common';
import { renderFurtherColorWhenNoCallProcess } from 'antd-management-fast-common/src/utils/constants';
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

    const siderTop = this.renderPresetSiderTopArea();
    const siderBottom = this.renderPresetSiderBottomArea();

    const helpConfig = this.establishHelpConfig();
    const toolBarConfig = this.establishToolBarConfig();

    const siderBody =
      checkObjectIsNullOrEmpty(siderTop) &&
      checkObjectIsNullOrEmpty(siderBottom) ? null : (
        <SiderBox top={siderTop} bottom={siderBottom} />
      );

    const toolbar =
      toolBarConfig == null ? null : <ToolBar {...toolBarConfig} />;

    const contentBody = this.renderPresetContentArea();

    const bottom =
      helpConfig == null ? null : (
        <HelpContent
          wrapperType={this.contentWrapperType}
          {...this.establishHelpConfig()}
        />
      );

    if (
      siderBody == null &&
      toolbar == null &&
      contentBody == null &&
      bottom == null
    ) {
      return null;
    }

    return (
      <ContentBox
        layoutConfig={this.establishPageContentLayoutConfig()}
        siderConfig={this.establishPageContentLayoutSiderConfig()}
        siderBody={siderBody}
        toolbar={toolbar}
        contentBody={contentBody}
        bottom={bottom}
      />
    );
  };

  renderPresetPageLeftArea = () => null;

  renderPresetPageBody = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPageBody');

    const body = this.renderPresetPageBodyContent();
    const bottom = this.renderPresetOther();

    return <BodyContent body={body} bottom={bottom} />;
  };

  renderPresetPageFooter = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetPageFooter');

    return null;
  };

  renderPresetFloatButton = () => {
    return <BackTop style={{ bottom: 75 }} />;
  };

  renderFurther() {
    if (this.showCallProcess) {
      this.logCallTrack({}, primaryCallName, 'renderFurther');
    } else {
      logCallTrack(
        {},
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'renderFurther',
          'showCallProcess',
          toString(this.showCallProcess),
        ),
        {
          color: renderFurtherColorWhenNoCallProcess,
          prefix: renderFurtherPrefixWhenNoCallProcess,
        },
      );
    }

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

    const tabProperties = this.buildOtherTabProps();

    if (isObject(tabProperties) && !isEmptyObject(tabProperties)) {
      this.logCallTrace(
        {
          tabProps: tabProperties,
        },
        primaryCallName,
        'renderFurther',
        'trigger',
        'buildOtherTabProps',
      );
    }

    return (
      <PageExtraWrapper
        tabFlag={this.viewTabFlag}
        flag={[this.viewLoadingFlag, this.viewReloadingFlag]}
        showHeader={this.showPageHeader}
        title={this.getPresetPageTitle()}
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
        tabProps={tabProperties}
        leftArea={this.renderPresetPageLeftArea()}
        footer={this.renderPresetPageFooter()}
        floatButton={this.renderPresetFloatButton()}
      >
        {this.renderPresetPageBody()}
      </PageExtraWrapper>
    );
  }
}

export { InternalLayout };
