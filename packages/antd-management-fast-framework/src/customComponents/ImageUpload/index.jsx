import React, { PureComponent } from 'react';
import { Modal, Upload, Space, message } from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  EyeOutlined,
  UploadOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import {
  isFunction,
  showRuntimeError,
  stringIsNullOrWhiteSpace,
} from '../../utils/tools';

import ImageBox from '../ImageBox';
import FlexBox from '../FlexBox';
import VerticalBox from '../VerticalBox';
import CenterBox from '../CenterBox';

import styles from './index.less';

const { confirm } = Modal;

class ImageUpload extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        uploading: false,
        previewVisible: false,
        previewImage: '',
      },
    };
  }

  handleUploadCancel = () => this.setState({ previewVisible: false });

  handleFilePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleImagePreview = () => {
    const { image } = this.props;

    if (stringIsNullOrWhiteSpace(image)) {
      message.info('无图片可以预览');

      return;
    }

    this.setState({
      previewImage: image,
      previewVisible: true,
    });
  };

  beforeUpload = (file) => {
    const isPic =
      file.type === 'image/jpeg' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png';
    if (!isPic) {
      const text = '请上传图片文件!';

      showRuntimeError({
        message: text,
      });
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      const text = '图片文件不能超过2MB!';

      showRuntimeError({
        message: text,
      });
    }

    return isPic && isLt2M;
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
        const data = pretreatmentRemoteResponse(response) || { image: '' };

        const { image } = data;

        this.setState({
          uploading: false,
        });

        if (isFunction(afterUploadSuccess)) {
          afterUploadSuccess(image || '');
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

  clearImage = () => {
    const { image } = this.props;

    if (stringIsNullOrWhiteSpace(image)) {
      message.info('当前没有可供移除的图片');

      return;
    }

    const { afterUploadSuccess } = this.props;

    if (isFunction(afterUploadSuccess)) {
      confirm({
        title: `清除图片`,
        content: `即将清除图片数据，清除后需要保存才能进行生效，要继续吗？`,
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          afterUploadSuccess('');
        },
        onCancel() {},
      });
    } else {
      const text = 'afterUploadSuccess 配置无效';

      showRuntimeError({
        message: text,
      });
    }
  };

  render() {
    const {
      action,
      disabled,
      listType,
      fileList,
      showUploadList,
      image,
      singleMode: singleModeSource,
      tokenSet,
      onItemChange,
      onItemRemove,
    } = this.props;
    const { uploading, previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传新图</div>
      </div>
    );

    const uploadProps = {
      disabled,
      action,
      listType,
      showUploadList,
      onPreview: this.handleFilePreview,
      beforeUpload: this.beforeUpload,
      onChange: !(showUploadList || false)
        ? this.handleUploadChange
        : isFunction(onItemChange)
        ? onItemChange
        : null,
      onRemove: isFunction(onItemRemove) ? onItemRemove : null,
      headers: { ...tokenSet },
    };

    if (showUploadList) {
      uploadProps.fileList = fileList || [];
    }

    const { width, emptyImage } = {
      ...{
        width: '240px',
        emptyImage: '',
      },
      ...(singleModeSource || {}),
    };

    return (
      <div className={styles.containor}>
        <div className="clearfix">
          {!(showUploadList || false) ? (
            <>
              <div
                className={styles.imageBox}
                style={{
                  minWidth: '140px',
                  width,
                }}
              >
                <Upload {...uploadProps}>
                  <div className={styles.imageAction}>
                    <div className={styles.icon}>
                      <CenterBox>
                        {uploading ? <LoadingOutlined /> : <UploadOutlined />}
                      </CenterBox>
                    </div>

                    <div className={styles.text}>
                      {uploading ? '上传中' : '上传'}
                    </div>
                  </div>

                  <VerticalBox
                    align="bottom"
                    style={{
                      height: '100%',
                    }}
                  >
                    <div
                      style={{
                        width,
                        padding: '1px',
                      }}
                    >
                      <ImageBox
                        src={image || emptyImage}
                        loadingEffect
                        errorOverlayVisible
                        showErrorIcon={false}
                        fillHeight={false}
                        alt=""
                      />
                    </div>
                  </VerticalBox>
                </Upload>

                <div className={styles.toolBar}>
                  <FlexBox
                    right={
                      <Space>
                        <EyeOutlined
                          onClick={() => {
                            this.handleImagePreview();
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => {
                            this.clearImage();
                          }}
                        />
                      </Space>
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            <Upload {...uploadProps}>
              {(fileList || []).length >= 8 ? null : uploadButton}
            </Upload>
          )}

          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleUploadCancel}
            bodyStyle={{
              boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset',
            }}
          >
            <VerticalBox
              style={{
                height: '100%',
              }}
            >
              <div
                style={{
                  width: '100%',
                }}
              >
                <ImageBox
                  src={previewImage}
                  loadingEffect
                  errorOverlayVisible
                  showErrorIcon={false}
                  fillHeight={false}
                  alt=""
                />
              </div>
            </VerticalBox>
          </Modal>
        </div>
      </div>
    );
  }
}

ImageUpload.defaultProps = {
  action: '',
  listType: 'picture-card',
  showUploadList: false,
  disabled: false,
  tokenSet: {},
  image: '',
  fileList: [],
  singleMode: {
    width: '240px',
    emptyImage: '',
  },
  pretreatmentRemoteResponse: () => {},
  afterUploadSuccess: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemChange: ({ file, fileList }) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemRemove: (file) => {},
};

export default ImageUpload;
