import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { Outlet } from 'umi';
// eslint-disable-next-line import/named
import { PageContainer } from '@ant-design/pro-components';

import {
  isEmptyObject,
  isFunction,
  isObject,
  isString,
} from 'easy-soft-utility';

import { decorateAvatar } from '../../DecorateAvatar';
import { FlexBox } from '../../FlexBox';
import { HeaderContent } from '../HeaderContent';
import { HeaderExtraContent } from '../HeaderExtraContent';
import { HeaderSubTitle } from '../HeaderSubTitle';
import { HeaderTagWrapper } from '../HeaderTagWrapper';
import { HeaderTitle } from '../HeaderTitle';

class PageWrapper extends PureComponent {
  render() {
    const {
      dataLoading,
      reloading,
      showHeader,
      title,
      titlePrefix,
      subTitle,
      showAvatar,
      avatarConfig,
      avatarDefaultIcon,
      avatarImageLoadResult,
      onAvatarLoadError,
      tagList,
      useShortcutNavigation,
      shortcutNavigation,
      extraAction,
      contentConfig,
      extraContentConfig,
      tabActiveKey,
      tabList,
      tabBarExtraContent,
      tabProps,
      onTabChange,
      footer,
      floatButton,
      leftArea,
      children,
    } = this.props;

    const avatarProperties = showAvatar
      ? decorateAvatar(
          avatarConfig,
          avatarDefaultIcon,
          showAvatar,
          dataLoading,
          reloading,
          avatarImageLoadResult,
          () => {
            if (isFunction(onAvatarLoadError)) {
              onAvatarLoadError();
            }
          },
        )
      : null;

    const headerContent = isObject(contentConfig) ? (
      isEmptyObject(contentConfig) ? null : HeaderContent.checkProperties(
          contentConfig,
        ) ? (
        <HeaderContent {...contentConfig} />
      ) : null
    ) : null;

    const extraContent = isObject(extraContentConfig) ? (
      isEmptyObject(extraContentConfig) ? null : (
        <HeaderExtraContent {...extraContentConfig} />
      )
    ) : null;

    const innerContent = leftArea ? (
      <FlexBox
        flexAuto="right"
        leftStyle={{
          backgroundColor: '#fff',
        }}
        left={leftArea}
        right={
          <>
            <Outlet />

            {children}

            {floatButton}
          </>
        }
      />
    ) : (
      <>
        <Outlet />

        {children}

        {floatButton}
      </>
    );

    if (showHeader || false) {
      return (
        <div
          style={{
            background: '#f0f2f5',
          }}
        >
          <PageContainer
            header={{
              ghost: false,
              style: {
                backgroundColor: '#fff',
                paddingBottom: '0px',
                paddingLeft: '24px',
                paddingRight: '24px',
              },
              avatar: avatarProperties,
              title: <HeaderTitle title={title} titlePrefix={titlePrefix} />,
              subTitle: isString(subTitle) ? (
                <HeaderSubTitle text={subTitle} />
              ) : (
                subTitle
              ),
              tags: <HeaderTagWrapper list={tagList} />,
              ...(tabProps === null ? { footer: null } : {}),
            }}
            childrenContentStyle={{
              padding: '0px',
            }}
            className={classNames(
              'antd-management-fast-component',
              `antd-management-fast-component-use-shortcut-navigation`,
            )}
            extra={extraAction}
            content={headerContent}
            extraContent={extraContent}
            tabActiveKey={tabActiveKey}
            tabList={tabList}
            tabBarExtraContent={tabBarExtraContent}
            onTabChange={onTabChange}
            tabProps={tabProps}
            footer={footer}
            breadcrumbRender={(properties, originBreadcrumb) => {
              return (
                <FlexBox
                  flexAuto="right"
                  style={{
                    paddingBottom: '7px',
                    borderBottom: '1px solid #f1f1f1',
                  }}
                  left={<div>{originBreadcrumb}</div>}
                  right={
                    useShortcutNavigation == false ||
                    shortcutNavigation == null ? null : (
                      <FlexBox
                        flexAuto="top"
                        top={<div></div>}
                        bottom={
                          <FlexBox
                            flexAuto="left"
                            left={<div></div>}
                            right={<div>{shortcutNavigation}</div>}
                          />
                        }
                      />
                    )
                  }
                />
              );
            }}
          >
            {innerContent}
          </PageContainer>
        </div>
      );
    }

    return innerContent;
  }
}

PageWrapper.defaultProps = {
  dataLoading: false,
  reloading: false,
  showHeader: false,
  title: '',
  titlePrefix: null,
  subTitle: null,
  showAvatar: false,
  avatarConfig: null,
  avatarDefaultIcon: null,
  avatarImageLoadResult: null,
  onAvatarLoadError: null,
  tagList: [],
  useShortcutNavigation: true,
  shortcutNavigation: null,
  extraAction: null,
  contentConfig: null,
  extraContentConfig: null,
  tabActiveKey: null,
  tabList: [],
  tabBarExtraContent: null,
  tabProps: null,
  footer: null,
  floatButton: null,
  leftArea: null,
  onTabChange: null,
};

export { PageWrapper };
