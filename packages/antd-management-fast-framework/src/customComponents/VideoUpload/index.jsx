import {
  Button,
  Divider,
  Dropdown,
  Input,
  Menu,
  Modal,
  Space,
  Tooltip,
  Upload,
} from 'antd';
import { PureComponent } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import { buildPlayer } from '../../customComponents/FunctionComponent';
import { iconCollection } from '../../utils/constants';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import {
  copyToClipboard,
  isFunction,
  showErrorMessage,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from '../../utils/tools';
import IconInfo from '../IconInfo';

const { TextArea } = Input;

class VideoUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        videoSource: '',
        videoUrl: '',
        videoUrlTemp: '',
        uploading: false,
        previewVisible: false,
        changeUrlVisible: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { video: videoNext } = nextProps;
    const { videoSource: videoPrev } = prevState;

    if ((videoNext || '') !== (videoPrev || '')) {
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

    if (stringIsNullOrWhiteSpace(videoUrl)) {
      const text = '无效的视频源';

      showErrorMessage({
        message: text,
      });

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

  handleUrlChange = (e) => {
    const {
      target: { value: v },
    } = e;

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

          showRuntimeError({
            message: text,
          });
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

          showRuntimeError({
            message: text,
          });
        }
      },
    );
  };

  beforeUpload = (file) => {
    const isVideo = file.type === 'video/mp4';

    if (!isVideo) {
      const text = '请上传视频文件(*.mp4)!';

      showErrorMessage({
        message: text,
      });
    }

    const isLt3M =
      file.size / 1024 / 1024 <
      defaultSettingsLayoutCustom.getVideoUploadMaxSize();

    if (!isLt3M) {
      const text = '视频文件不能超过3MB!';

      showErrorMessage({
        message: text,
      });
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

              showRuntimeError({
                message: text,
              });
            }
          },
        );
      } else {
        const text = 'pretreatmentRemoteResponse 配置无效';

        showRuntimeError({
          message: text,
        });
      }
    }
  };

  handleMenuClick = (e) => {
    const { key } = e;
    const { videoUrl } = this.state;

    switch (key) {
      case 'changeUrl':
        this.showChangeUrlModal();
        break;

      case 'showPreview':
        this.showPreviewModal();
        break;

      case 'copyUrl':
        if (stringIsNullOrWhiteSpace(videoUrl)) {
          const text = '当前未设置视频地址';

          showErrorMessage({
            message: text,
          });
        } else {
          copyToClipboard(videoUrl);
        }

        break;

      case 'clearUrl':
        this.clearUrl();
        break;

      default:
        break;
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

    const uploadProps = {
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
        icon: iconCollection.swap,
      },
      {
        key: 'copyUrl',
        label: '复制地址',
        icon: iconCollection.copy,
        disabled: stringIsNullOrWhiteSpace(videoUrl),
      },
      {
        key: 'clearUrl',
        label: '清空视频',
        icon: iconCollection.delete,
        disabled: stringIsNullOrWhiteSpace(videoUrl),
      },
    ];

    const menu = <Menu items={items} onClick={this.handleMenuClick} />;

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
              disabled={uploading || stringIsNullOrWhiteSpace(videoUrl)}
              onClick={() => {
                this.showPreviewModal();
              }}
            >
              {iconCollection.playCircle}
              播放
            </Button>
          </Tooltip>
        ) : null}

        <Tooltip key="showChangeUrlTip" placement="top" title="上传视频">
          <Upload {...uploadProps}>
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
              {uploading ? iconCollection.loading : iconCollection.upload}
              {uploading ? '稍后' : '上传'}
            </Button>
          </Upload>
        </Tooltip>

        <Tooltip key="showMoreTip" placement="top" title="更多操作">
          <Dropdown
            arrow
            placement="bottomRight"
            overlay={menu}
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
          addonBefore={iconCollection.videoCamera}
          addonAfter={addonAfter}
          value={videoUrl}
          placeholder="当前未设置视频地址"
        />

        <Modal
          title={<IconInfo icon={iconCollection.videoCamera} text="视频预览" />}
          visible={previewVisible}
          footer={null}
          onCancel={this.handleUploadCancel}
        >
          {buildPlayer({ url: videoUrl })}
        </Modal>

        <Modal
          title={
            <IconInfo
              icon={iconCollection.swap}
              text="请输入将更换的视频地址"
            />
          }
          visible={changeUrlVisible}
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

export default VideoUpload;
