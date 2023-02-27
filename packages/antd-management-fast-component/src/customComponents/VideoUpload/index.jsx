import {
  Button,
  Divider,
  Dropdown,
  Input,
  Modal,
  Space,
  Tooltip,
  Upload,
} from 'antd';
import React, { PureComponent } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
} from 'easy-soft-utility';

import {
  copyToClipboard,
  getVideoUploadMaxSize,
} from 'antd-management-fast-common';

import { buildPlayer } from '../FunctionComponent/Function';
import { iconBuilder } from '../Icon';
import { IconInfo } from '../IconInfo';

const { TextArea } = Input;

class VideoUpload extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      videoSource: '',
      videoUrl: '',
      videoUrlTemp: '',
      uploading: false,
      previewVisible: false,
      changeUrlVisible: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { video: videoNext } = nextProperties;
    const { videoSource: videoPrevious } = previousState;

    if ((videoNext || '') !== (videoPrevious || '')) {
      return {
        videoSource: videoNext,
        videoUrl: videoNext,
      };
    }

    return null;
  }

  handleUploadCancel = () => {
    this.setState({
      previewVisible: false,
    });
  };

  showPreviewModal = () => {
    const { videoUrl } = this.state;

    if (checkStringIsNullOrWhiteSpace(videoUrl)) {
      const text = '无效的视频源';

      showSimpleErrorMessage(text);

      return;
    }

    this.setState({
      previewVisible: true,
    });
  };

  showChangeUrlModal = () => {
    const { videoUrl } = this.state;

    this.setState({
      videoUrlTemp: videoUrl,
      changeUrlVisible: true,
    });
  };

  handleUrlChange = (event) => {
    const {
      target: { value: v },
    } = event;

    this.setState({
      videoUrlTemp: v,
    });
  };

  handleChangeUrlOk = () => {
    const { afterChangeSuccess } = this.props;
    const { videoUrlTemp } = this.state;

    this.setState(
      {
        videoUrl: videoUrlTemp,
        changeUrlVisible: false,
      },
      () => {
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess(videoUrlTemp || '');
        } else {
          const text = 'afterChangeSuccess 配置无效';

          showSimpleRuntimeError(text);
        }
      },
    );
  };

  handleChangeUrlCancel = () => {
    this.setState({
      changeUrlVisible: false,
    });
  };

  clearUrl = () => {
    const { afterChangeSuccess } = this.props;

    this.setState(
      {
        videoUrl: '',
        changeUrlVisible: false,
      },
      () => {
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess('');
        } else {
          const text = 'afterChangeSuccess 配置无效';

          showSimpleRuntimeError(text);
        }
      },
    );
  };

  beforeUpload = (file) => {
    const isVideo = file.type === 'video/mp4';

    if (!isVideo) {
      const text = '请上传视频文件(*.mp4)!';

      showSimpleErrorMessage(text);
    }

    const isLt3M = file.size / 1024 / 1024 < getVideoUploadMaxSize();

    if (!isLt3M) {
      const text = '视频文件不能超过3MB!';

      showSimpleErrorMessage(text);
    }

    return isVideo && isLt3M;
  };

  handleUploadChange = (info) => {
    const { pretreatmentRemoteResponse, afterChangeSuccess } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }

    if (info.file.status === 'done') {
      const { response } = info.file;

      if (isFunction(pretreatmentRemoteResponse)) {
        const data = pretreatmentRemoteResponse(response) || { video: '' };

        const { video } = data;

        this.setState(
          {
            videoUrl: video,
            uploading: false,
          },
          () => {
            if (isFunction(afterChangeSuccess)) {
              afterChangeSuccess(video || '');
            } else {
              const text = 'afterChangeSuccess 配置无效';

              showSimpleRuntimeError(text);
            }
          },
        );
      } else {
        const text = 'pretreatmentRemoteResponse 配置无效';

        showSimpleRuntimeError(text);
      }
    }
  };

  handleMenuClick = (event) => {
    const { key } = event;
    const { videoUrl } = this.state;

    switch (key) {
      case 'changeUrl': {
        this.showChangeUrlModal();
        break;
      }

      case 'showPreview': {
        this.showPreviewModal();
        break;
      }

      case 'copyUrl': {
        if (checkStringIsNullOrWhiteSpace(videoUrl)) {
          const text = '当前未设置视频地址';

          showSimpleErrorMessage(text);
        } else {
          copyToClipboard(videoUrl);
        }

        break;
      }

      case 'clearUrl': {
        this.clearUrl();
        break;
      }

      default: {
        break;
      }
    }
  };

  render() {
    const { action, disabled, showPreview, tokenSet } = this.props;
    const {
      uploading,
      previewVisible,
      changeUrlVisible,
      videoUrlTemp,
      videoUrl,
    } = this.state;

    const uploadProperties = {
      disabled,
      action,
      listType: 'text',
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      onChange: this.handleUploadChange,
      headers: { ...tokenSet },
    };

    const items = [
      {
        key: 'changeUrl',
        label: '更换地址',
        icon: iconBuilder.swap(),
      },
      {
        key: 'copyUrl',
        label: '复制地址',
        icon: iconBuilder.copy(),
        disabled: checkStringIsNullOrWhiteSpace(videoUrl),
      },
      {
        key: 'clearUrl',
        label: '清空视频',
        icon: iconBuilder.delete(),
        disabled: checkStringIsNullOrWhiteSpace(videoUrl),
      },
    ];

    const addonAfter = (
      <Space split={<Divider type="vertical" />}>
        {showPreview ? (
          <Tooltip key="showVideoTip" placement="top" title="播放视频预览">
            <Button
              style={{
                border: '0px solid #d9d9d9',
                backgroundColor: '#fafafa',
                height: '30px',
                paddingLeft: 0,
                paddingRight: 0,
              }}
              disabled={uploading || checkStringIsNullOrWhiteSpace(videoUrl)}
              onClick={() => {
                this.showPreviewModal();
              }}
            >
              {iconBuilder.playCircle()}
              播放
            </Button>
          </Tooltip>
        ) : null}

        <Tooltip key="showChangeUrlTip" placement="top" title="上传视频">
          <Upload {...uploadProperties}>
            <Button
              style={{
                border: '0px solid #d9d9d9',
                backgroundColor: '#fafafa',
                height: '30px',
                paddingLeft: 0,
                paddingRight: 0,
              }}
              disabled={uploading}
            >
              {uploading ? iconBuilder.loading() : iconBuilder.upload()}
              {uploading ? '稍后' : '上传'}
            </Button>
          </Upload>
        </Tooltip>

        <Tooltip key="showMoreTip" placement="top" title="更多操作">
          <Dropdown
            arrow
            placement="bottomRight"
            menu={{
              items: items,
              onClick: this.handleMenuClick,
            }}
            style={{
              border: '0px solid #d9d9d9',
              backgroundColor: '#fafafa',
              height: '30px',
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            <Button
              style={{
                border: '0px solid #d9d9d9',
                backgroundColor: '#fafafa',
                height: '30px',
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <EllipsisOutlined
                style={{
                  fontSize: 20,
                  verticalAlign: 'top',
                }}
              />
            </Button>
          </Dropdown>
        </Tooltip>
      </Space>
    );

    return (
      <>
        <Input
          disabled
          addonBefore={iconBuilder.videoCamera()}
          addonAfter={addonAfter}
          value={videoUrl}
          placeholder="当前未设置视频地址"
        />

        <Modal
          title={<IconInfo icon={iconBuilder.videoCamera()} text="视频预览" />}
          open={previewVisible}
          footer={null}
          onCancel={this.handleUploadCancel}
        >
          {buildPlayer({ url: videoUrl })}
        </Modal>

        <Modal
          title={
            <IconInfo icon={iconBuilder.swap()} text="请输入将更换的视频地址" />
          }
          open={changeUrlVisible}
          onOk={this.handleChangeUrlOk}
          onCancel={this.handleChangeUrlCancel}
        >
          <TextArea
            rows={4}
            value={videoUrlTemp}
            onChange={this.handleUrlChange}
            placeholder="目前没有将要更换的视频地址"
          />
        </Modal>
      </>
    );
  }
}

VideoUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  video: '',
  showPreview: false,
  pretreatmentRemoteResponse: () => {},
  afterChangeSuccess: () => {},
};

export { VideoUpload };
