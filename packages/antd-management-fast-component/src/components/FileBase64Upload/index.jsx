import { Button, Input, Upload } from 'antd';
import React, { PureComponent } from 'react';

import {
  isFunction,
  isNumber,
  showSimpleRuntimeError,
} from 'easy-soft-utility';

import { getFileUploadMaxSize } from 'antd-management-fast-common';

import { iconBuilder } from '../Icon';

class FileBase64Upload extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

      uploading: false,
      base64: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { fileBase64 } = nextProperties;

    return { base64: fileBase64 };
  }

  handleUploadCancel = () => this.setState({ previewVisible: false });

  beforeUpload = (file) => {
    let uploadMaxSize = getFileUploadMaxSize();

    if (!isNumber(uploadMaxSize) || uploadMaxSize <= 0) {
      uploadMaxSize = 4;
    }

    const allowUploadSize = file.size / 1024 / 1024 < uploadMaxSize;

    if (!allowUploadSize) {
      const text = `文件不能超过${uploadMaxSize}MB!`;

      showSimpleRuntimeError(text);
    }

    return allowUploadSize;
  };

  handleUploadChange = (info) => {
    const { pretreatmentRemoteResponse, afterUploadSuccess } = this.props;

    if (info.file.status === 'uploading') {
      this.setState({ uploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;

      if (isFunction(pretreatmentRemoteResponse)) {
        const data = {
          fileBase64: '',
          data: {},
          ...pretreatmentRemoteResponse(response),
        };

        const { fileBase64, data: remoteData } = data;

        this.setState({
          uploading: false,
        });

        if (isFunction(afterUploadSuccess)) {
          afterUploadSuccess(fileBase64 || '', remoteData);
        } else {
          const text = 'afterUploadSuccess 配置无效';

          showSimpleRuntimeError(text);
        }
      } else {
        const text = 'pretreatmentRemoteResponse 配置无效';

        showSimpleRuntimeError(text);
      }
    }
  };

  render() {
    const { action, disabled, uploadText, tokenSet } = this.props;
    const { uploading, base64 } = this.state;

    const uploadProperties = {
      disabled,
      action,
      listType: 'text',
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      onChange: this.handleUploadChange,
      headers: { ...tokenSet },
    };

    return (
      <Input
        readOnly
        addonBefore={iconBuilder.file()}
        placeholder={`请选择上传${uploadText || '文件'}`}
        value={base64}
        addonAfter={
          <>
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
                title={`选择${uploadText || '文件'}`}
              >
                {uploading ? iconBuilder.loading() : iconBuilder.upload()}
                {uploading ? '正在上传' : `选择${uploadText || '文件'}`}
              </Button>
            </Upload>
          </>
        }
      />
    );
  }
}

FileBase64Upload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  fileBase64: '',
  uploadText: '文件',
  pretreatmentRemoteResponse: () => {},
  afterUploadSuccess: () => {},
};

export { FileBase64Upload };
