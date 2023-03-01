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
  getFileUploadMaxSize,
} from 'antd-management-fast-common';

import { iconBuilder } from '../Icon';
import { IconInfo } from '../IconInfo';

const { TextArea } = Input;

class FileUpload extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      fileSource: '',
      fileUrl: '',
      fileUrlTemp: '',
      uploading: false,
      changeUrlVisible: false,
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
    const { file: fileNext } = nextProperties;
    const { fileSource: filePrevious } = previousState;

    if ((fileNext || '') !== (filePrevious || '')) {
      return {
        fileSource: fileNext,
        fileUrl: fileNext,
      };
    }

    return null;
  }

  showChangeUrlModal = () => {
    const { fileUrl } = this.state;

    this.setState({
      fileUrlTemp: fileUrl,
      changeUrlVisible: true,
    });
  };

  handleUrlChange = (event) => {
    const {
      target: { value: v },
    } = event;

    this.setState({
      fileUrlTemp: v,
    });
  };

  handleChangeUrlOk = () => {
    const { afterChangeSuccess } = this.props;
    const { fileUrlTemp } = this.state;

    this.setState(
      {
        fileUrl: fileUrlTemp,
        changeUrlVisible: false,
      },
      () => {
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess(fileUrlTemp || '');
        } else {
          const text = 'afterChangeSuccess 配置无效';

          showSimpleRuntimeError({
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
        fileUrl: '',
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
    const maxSize = getFileUploadMaxSize();

    const isLt3M = file.size / 1024 / 1024 < maxSize;

    if (!isLt3M) {
      const text = `文件不能超过${maxSize}MB!`;

      showSimpleErrorMessage(text);
    }

    return isLt3M;
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
        const data = pretreatmentRemoteResponse(response) || { file: '' };

        const { file } = data;

        this.setState(
          {
            fileUrl: file,
            uploading: false,
          },
          () => {
            if (isFunction(afterChangeSuccess)) {
              afterChangeSuccess(file || '');
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
    const { fileUrl } = this.state;

    switch (key) {
      case 'changeUrl': {
        this.showChangeUrlModal();
        break;
      }

      case 'copyUrl': {
        if (checkStringIsNullOrWhiteSpace(fileUrl)) {
          const text = '当前未设置文件地址';

          showSimpleErrorMessage(text);
        } else {
          copyToClipboard(fileUrl);
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
    const { action, disabled, tokenSet } = this.props;
    const { uploading, changeUrlVisible, fileUrlTemp, fileUrl } = this.state;

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
        disabled: checkStringIsNullOrWhiteSpace(fileUrl),
      },
      {
        key: 'clearUrl',
        label: '清空文件',
        icon: iconBuilder.delete(),
        disabled: checkStringIsNullOrWhiteSpace(fileUrl),
      },
    ];

    const addonAfter = (
      <Space split={<Divider type="vertical" />}>
        <Tooltip key="showChangeUrlTip" placement="top" title="上传文件">
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
          addonBefore={iconBuilder.link()}
          addonAfter={addonAfter}
          value={fileUrl}
          placeholder="当前未设置文件地址"
        />

        <Modal
          title={
            <IconInfo icon={iconBuilder.swap()} text="请输入将更换的文件地址" />
          }
          open={changeUrlVisible}
          onOk={this.handleChangeUrlOk}
          onCancel={this.handleChangeUrlCancel}
        >
          <TextArea
            rows={4}
            value={fileUrlTemp}
            onChange={this.handleUrlChange}
            placeholder="目前没有将要更换的文件地址"
          />
        </Modal>
      </>
    );
  }
}

FileUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  file: '',
  pretreatmentRemoteResponse: () => {},
  afterChangeSuccess: () => {},
};

export { FileUpload };
