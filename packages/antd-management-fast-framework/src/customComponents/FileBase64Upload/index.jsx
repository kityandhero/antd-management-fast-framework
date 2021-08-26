import React, { PureComponent } from 'react';
import { Upload, Input, Button } from 'antd';
import {
  LoadingOutlined,
  FileOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import { isFunction, showRuntimeError } from '../../utils/tools';

class FileBase64Upload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        uploading: false,
        base64: '',
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const { fileBase64 } = nextProps;

    return { base64: fileBase64 };
  }

  handleUploadCancel = () => this.setState({ previewVisible: false });

  beforeUpload = (file) => {
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      const text = '文件不能超过1MB!';

      showRuntimeError({
        message: text,
      });
    }

    return isLt1M;
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
        const data = pretreatmentRemoteResponse(response) || { fileBase64: '' };

        const { fileBase64 } = data;

        this.setState({
          uploading: false,
        });

        if (isFunction(afterUploadSuccess)) {
          afterUploadSuccess(fileBase64 || '');
        } else {
          const text = 'afterUploadSuccess 配置无效';

          showRuntimeError({
            message: text,
          });
        }
      } else {
        const text = 'pretreatmentRemoteResponse 配置无效';

        showRuntimeError({
          message: text,
        });
      }
    }
  };

  render() {
    const { action, disabled, uploadText, tokenSet } = this.props;
    const { uploading, base64 } = this.state;

    const uploadProps = {
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
        addonBefore={<FileOutlined />}
        placeholder={`请选择上传${uploadText || '文件'}`}
        value={base64}
        addonAfter={
          <>
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
                title={`选择${uploadText || '文件'}`}
              >
                {uploading ? <LoadingOutlined /> : <UploadOutlined />}
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

export default FileBase64Upload;
