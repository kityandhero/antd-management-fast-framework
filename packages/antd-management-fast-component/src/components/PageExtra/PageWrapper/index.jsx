import { FloatButton } from 'antd';
import React, { PureComponent } from 'react';
import { Outlet } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

import {
  isEmptyObject,
  isFunction,
  isObject,
  isString,
} from 'easy-soft-utility';

import { decorateAvatar } from '../../DecorateAvatar';
import { HeaderContent } from '../HeaderContent';
import { HeaderExtraContent } from '../HeaderExtraContent';
import { HeaderSubTitle } from '../HeaderSubTitle';
import { HeaderTagWrapper } from '../HeaderTagWrapper';
import { HeaderTitle } from '../HeaderTitle';

const { BackTop } = FloatButton;

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
      extraAction,
      contentConfig,
      extraContentConfig,
      tabActiveKey,
      tabList,
      tabBarExtraContent,
      tabProps,
      onTabChange,
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
            }}
            childrenContentStyle={{
              padding: '0px',
            }}
            avatar={avatarProperties}
            title={<HeaderTitle title={title} titlePrefix={titlePrefix} sp />}
            subTitle={
              isString(subTitle) ? <HeaderSubTitle text={subTitle} /> : subTitle
            }
            tags={<HeaderTagWrapper list={tagList} />}
            extra={extraAction}
            content={<HeaderContent {...(contentConfig || {})} />}
            extraContent={
              isObject(extraContentConfig) ? (
                isEmptyObject(extraContentConfig) ? null : (
                  <HeaderExtraContent {...extraContentConfig} />
                )
              ) : null
            }
            tabActiveKey={tabActiveKey}
            tabList={tabList}
            tabBarExtraContent={tabBarExtraContent}
            onTabChange={onTabChange}
            tabProps={tabProps}
          >
            <Outlet />

            {children}

            <BackTop />
          </PageContainer>
        </div>
      );
    }

    return (
      <>
        <Outlet />

        {children}

        <BackTop />
      </>
    );
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
  extraAction: null,
  contentConfig: null,
  extraContentConfig: null,
};

export { PageWrapper };