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
  isNumber,
  showSimpleErrorMessage,
  showSimpleRuntimeError,
} from 'easy-soft-utility';

import {
  copyToClipboard,
  getAudioUploadMaxSize,
} from 'antd-management-fast-common';

import { buildPlayer } from '../FunctionComponent';
import { iconBuilder } from '../Icon';
import { IconInfo } from '../IconInfo';

const { TextArea } = Input;

class AudioUpload extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      audioSource: '',
      audioUrl: '',
      audioUrlTemp: '',
      uploading: false,
      previewVisible: false,
      changeUrlVisible: false,
    };
  }

  /**
   * get derived state from props。
   * @static
   * @param {Object} nextProperties 即将更改的属性值
   * @param {Object} previousState 之前的 state 值
   * @returns {Object} 更新后的 state 值
   */
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { audio: audioNext } = nextProperties;
    const { audioSource: audioPrevious } = previousState;

    if ((audioNext || '') !== (audioPrevious || '')) {
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

    if (checkStringIsNullOrWhiteSpace(audioUrl)) {
      const text = '无效的音频源';

      showSimpleErrorMessage(text);

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

  handleUrlChange = (event) => {
    const {
      target: { value: v },
    } = event;

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
          afterChangeSuccess(audioUrlTemp || '', { audio: audioUrlTemp });
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
        audioUrl: '',
        changeUrlVisible: false,
      },
      () => {
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess('', null);
        } else {
          const text = 'afterChangeSuccess 配置无效';

          showSimpleRuntimeError(text);
        }
      },
    );
  };

  beforeUpload = (file) => {
    const isAudio = file.type === 'audio/mpeg';

    if (!isAudio) {
      const text = '请上传音频文件(*.mp3)!';

      showSimpleErrorMessage(text);
    }

    let uploadMaxSize = getAudioUploadMaxSize();

    if (!isNumber(uploadMaxSize) || uploadMaxSize <= 0) {
      uploadMaxSize = 4;
    }

    const allowUploadSize = file.size / 1024 / 1024 < uploadMaxSize;

    if (!allowUploadSize) {
      const text = `音频文件不能超过${uploadMaxSize}MB!`;

      showSimpleErrorMessage(text);
    }

    return isAudio && allowUploadSize;
  };

  handleUploadChange = (info) => {
    const {
      pretreatmentRemoteResponse,
      afterUploadSuccess,
      afterChangeSuccess,
    } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }

    if (info.file.status === 'done') {
      const { response } = info.file;

      if (isFunction(pretreatmentRemoteResponse)) {
        const data = {
          audio: '',
          data: {},
          ...pretreatmentRemoteResponse(response),
        };

        const { audio, data: remoteData } = data;

        this.setState(
          {
            audioUrl: audio,
            uploading: false,
          },
          () => {
            if (isFunction(afterUploadSuccess)) {
              afterUploadSuccess(audio || '', remoteData);
            } else {
              const text = 'afterUploadSuccess 配置无效';

              showSimpleRuntimeError(text);
            }

            if (isFunction(afterChangeSuccess)) {
              afterChangeSuccess(audio || '', remoteData);
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
    const { audioUrl } = this.state;

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
        if (checkStringIsNullOrWhiteSpace(audioUrl)) {
          const text = '当前未设置音频地址';

          showSimpleErrorMessage(text);
        } else {
          copyToClipboard(audioUrl);
        }

        break;
      }

      case 'clearUrl': {
        this.clearUrl();
        break;
      }

      case 'download': {
        window.open(audioUrl, '_blank');
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
      audioUrlTemp,
      audioUrl,
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
        disabled: checkStringIsNullOrWhiteSpace(audioUrl),
      },
      {
        key: 'clearUrl',
        label: '清空音频',
        icon: iconBuilder.delete(),
        disabled: checkStringIsNullOrWhiteSpace(audioUrl),
      },
      {
        key: 'download',
        label: '下载音频',
        icon: iconBuilder.download(),
        disabled: checkStringIsNullOrWhiteSpace(audioUrl),
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
              disabled={uploading || checkStringIsNullOrWhiteSpace(audioUrl)}
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
  afterUploadSuccess: () => {},
  afterChangeSuccess: () => {},
};

export { AudioUpload };
