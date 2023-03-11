import { FloatButton } from 'antd';
import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import {
  isEmptyObject,
  isFunction,
  isObject,
  isString,
} from 'easy-soft-utility';

import { BaseComponent } from '../../../BasicComponents';
import { decorateAvatar } from '../../DecorateAvatar';
import { HeaderContent } from '../HeaderContent';
import { HeaderExtraContent } from '../HeaderExtraContent';
import { HeaderSubTitle } from '../HeaderSubTitle';
import { HeaderTagWrapper } from '../HeaderTagWrapper';
import { HeaderTitle } from '../HeaderTitle';

const { BackTop } = FloatButton;

class PageWrapper extends BaseComponent {
  renderFurther() {
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
                paddingBottom: '24px',
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
          >
            {children}

            <BackTop />
          </PageContainer>
        </div>
      );
    }

    return (
      <>
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
