import { Avatar } from 'antd';
import React, { PureComponent } from 'react';
import { ReloadOutlined } from '@ant-design/icons';

import { defaultEmptyImage } from 'antd-management-fast-common/es/utils/constants';
import {
  isFunction,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-common/es/utils/tools';

import { iconBuilder } from '../Icon';

export const avatarImageLoadResultCollection = {
  wait: -1,
  success: 1,
  fail: 0,
};

export function decorateAvatar(
  avatar = null,
  defaultAvatarIcon = iconBuilder.picture(),
  showPageHeaderAvatar = false,
  dataLoading = false,
  reloading = false,
  avatarImageLoadResult,
  onImageLoadErrorCallback,
) {
  if (showPageHeaderAvatar) {
    let currentAvatar = null;

    if (dataLoading) {
      currentAvatar = { icon: iconBuilder.loading() };
    }

    if (reloading) {
      currentAvatar = { icon: <ReloadOutlined spin /> };
    }

    if (!dataLoading && !reloading) {
      currentAvatar = avatar || null;

      if ((currentAvatar || null) == null) {
        currentAvatar = { icon: defaultAvatarIcon };
      } else {
        const { src } = currentAvatar;

        if (stringIsNullOrWhiteSpace(src || '')) {
          currentAvatar = { icon: defaultAvatarIcon };
        } else {
          if (avatarImageLoadResult === avatarImageLoadResultCollection.wait) {
            currentAvatar = {
              src,
              onError: () => {
                if (isFunction(onImageLoadErrorCallback)) {
                  onImageLoadErrorCallback();
                }

                return true;
              },
            };
          }

          if (
            avatarImageLoadResult === avatarImageLoadResultCollection.success
          ) {
            currentAvatar = { src };
          }

          if (avatarImageLoadResult === avatarImageLoadResultCollection.fail) {
            currentAvatar = {
              src: defaultEmptyImage,
              onError: () => {
                const text = '加载默认图片失败';

                showRuntimeError({
                  message: text,
                });

                return true;
              },
            };
          }
        }
      }
    }

    return currentAvatar;
  }

  return null;
}

class DecorateAvatar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      avatarImageLoadResult: avatarImageLoadResultCollection.wait,
    };
  }

  onImageLoadErrorCallback = () => {
    this.setState({
      avatarImageLoadResult: avatarImageLoadResultCollection.fail,
    });
  };

  render() {
    const {
      avatar,
      defaultAvatarIcon,
      showPageHeaderAvatar,
      dataLoading,
      reloading,
    } = this.props;
    const { avatarImageLoadResult } = this.state;

    if (showPageHeaderAvatar) {
      const currentAvatar = decorateAvatar(
        avatar,
        defaultAvatarIcon,
        showPageHeaderAvatar,
        dataLoading,
        reloading,
        avatarImageLoadResult,
        () => {
          this.onImageLoadErrorCallback();
        },
      );

      return <Avatar {...(currentAvatar || {})} />;
    }

    return null;
  }
}

DecorateAvatar.defaultProps = {
  avatar: null,
  defaultAvatarIcon: iconBuilder.picture(),
  showPageHeaderAvatar: false,
  dataLoading: false,
  reloading: false,
};

export default DecorateAvatar;
