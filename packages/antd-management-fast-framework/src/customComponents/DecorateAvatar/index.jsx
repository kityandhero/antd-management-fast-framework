import React, { PureComponent } from 'react';
import { Avatar } from 'antd';
import {
  LoadingOutlined,
  PictureOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import {
  stringIsNullOrWhiteSpace,
  isFunction,
  showRuntimeErrorMessage,
} from '../../utils/tools';
import { defaultEmptyImage } from '../../utils/constants';

export const avatarImageLoadResultCollection = {
  wait: -1,
  success: 1,
  fail: 0,
};

export function decorateAvatar(
  avatar = null,
  defaultAvatarIcon = <PictureOutlined />,
  showPageHeaderAvatar = false,
  dataLoading = false,
  reloading = false,
  avatarImageLoadResult,
  onImageLoadErrorCallback,
) {
  if (showPageHeaderAvatar) {
    let currentAvatar = null;

    if (dataLoading) {
      currentAvatar = { icon: <LoadingOutlined /> };
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
                showRuntimeErrorMessage('加载默认图片失败');

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
  defaultAvatarIcon: <PictureOutlined />,
  showPageHeaderAvatar: false,
  dataLoading: false,
  reloading: false,
};

export default DecorateAvatar;
