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
import React, { PureComponent } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import {
  copyToClipboard,
  isFunction,
  showErrorMessage,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-common/es/utils/tools';

import { buildPlayer } from '../FunctionComponent';
import { iconBuilder } from '../Icon';
import IconInfo from '../IconInfo';

const { TextArea } = Input;

class AudioUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        audioSource: '',
        audioUrl: '',
        audioUrlTemp: '',
        uploading: false,
        previewVisible: false,
        changeUrlVisible: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { audio: audioNext } = nextProps;
    const { audioSource: audioPrev } = prevState;

    if ((audioNext || '') !== (audioPrev || '')) {
      return {
        audioSource: audioNext,
        audioUrl: audioNext,
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
    const { audioUrl } = this.state;

    if (stringIsNullOrWhiteSpace(audioUrl)) {
      const text = '无效的音频源';

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
    const { audioUrl } = this.state;

    this.setState({
      audioUrlTemp: audioUrl,
      changeUrlVisible: true,
    });
  };

  handleUrlChange = (e) => {
    const {
      target: { value: v },
    } = e;

    this.setState({
      audioUrlTemp: v,
    });
  };

  handleChangeUrlOk = () => {
    const { afterChangeSuccess } = this.props;
    const { audioUrlTemp } = this.state;

    this.setState(
      {
        audioUrl: audioUrlTemp,
        changeUrlVisible: false,
      },
      () => {
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess(audioUrlTemp || '');
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
        audioUrl: '',
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
    const isAudio = file.type === 'audio/mpeg';

    if (!isAudio) {
      const text = '请上传音频文件(*.mp3)!';

      showErrorMessage({
        message: text,
      });
    }

    const isLt3M =
      file.size / 1024 / 1024 < runtimeSettings.getAudioUploadMaxSize();

    if (!isLt3M) {
      const text = '音频文件不能超过3MB!';

      showErrorMessage({
        message: text,
      });
    }

    return isAudio && isLt3M;
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
        const data = pretreatmentRemoteResponse(response) || { audio: '' };

        const { audio } = data;

        this.setState(
          {
            audioUrl: audio,
            uploading: false,
          },
          () => {
            if (isFunction(afterChangeSuccess)) {
              afterChangeSuccess(audio || '');
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
    const { audioUrl } = this.state;

    switch (key) {
      case 'changeUrl':
        this.showChangeUrlModal();
        break;

      case 'showPreview':
        this.showPreviewModal();
        break;

      case 'copyUrl':
        if (stringIsNullOrWhiteSpace(audioUrl)) {
          const text = '当前未设置音频地址';

          showErrorMessage({
            message: text,
          });
        } else {
          copyToClipboard(audioUrl);
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
      audioUrlTemp,
      audioUrl,
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
        icon: iconBuilder.swap(),
      },
      {
        key: 'copyUrl',
        label: '复制地址',
        icon: iconBuilder.copy(),
        disabled: stringIsNullOrWhiteSpace(audioUrl),
      },
      {
        key: 'clearUrl',
        label: '清空视频',
        icon: iconBuilder.delete(),
        disabled: stringIsNullOrWhiteSpace(audioUrl),
      },
    ];

    const addonAfter = (
      <Space split={<Divider type="vertical" />}>
        {showPreview ? (
          <Tooltip key="showAudioTip" placement="top" title="播放音频预览">
            <Button
              style={{
                border: '0px solid #d9d9d9',
                backgroundColor: '#fafafa',
                height: '30px',
                paddingLeft: 0,
                paddingRight: 0,
              }}
              disabled={uploading || stringIsNullOrWhiteSpace(audioUrl)}
              onClick={() => {
                this.showPreviewModal();
              }}
            >
              {iconBuilder.playCircle()}
              播放
            </Button>
          </Tooltip>
        ) : null}

        <Tooltip key="showChangeUrlTip" placement="top" title="上传音频">
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
          addonBefore={iconBuilder.sound()}
          addonAfter={addonAfter}
          value={audioUrl}
          placeholder="当前未设置音频地址"
        />

        <Modal
          title={<IconInfo icon={iconBuilder.sound()} text="音频预览" />}
          open={previewVisible}
          footer={null}
          onCancel={this.handleUploadCancel}
        >
          <div
            style={{
              position: 'relative',
              height: '50px',
              width: '100%',
            }}
          >
            {buildPlayer({ url: audioUrl })}
          </div>
        </Modal>

        <Modal
          title={
            <IconInfo icon={iconBuilder.swap()} text="请输入将更换的音频地址" />
          }
          open={changeUrlVisible}
          onOk={this.handleChangeUrlOk}
          onCancel={this.handleChangeUrlCancel}
        >
          <TextArea
            rows={4}
            value={audioUrlTemp}
            onChange={this.handleUrlChange}
            placeholder="目前没有将要更换的音频地址"
          />
        </Modal>
      </>
    );
  }
}

AudioUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  audio: '',
  showPreview: false,
  pretreatmentRemoteResponse: () => {},
  afterChangeSuccess: () => {},
};

export default AudioUpload;
