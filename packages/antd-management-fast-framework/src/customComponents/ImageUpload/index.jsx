import { message, Modal, Space, Tooltip, Upload } from 'antd';
import { PureComponent } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

import { iconCollection } from '../../utils/constants';
import { defaultSettingsLayoutCustom } from '../../utils/defaultSettingsSpecial';
import {
  buildFieldHelper,
  isFunction,
  showRuntimeError,
  showWarningMessage,
  stringIsNullOrWhiteSpace,
  toNumber,
} from '../../utils/tools';
import CenterBox from '../CenterBox';
import FlexBox from '../FlexBox';
import IconInfo from '../IconInfo';
import ImageBox from '../ImageBox';
import VerticalBox from '../VerticalBox';

import styles from './index.less';

const { confirm } = Modal;

const defaultCapacity = 8;

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

  beforeUpload = (file, fileList) => {
    const { fileListCapacity } = this.props;

    const capacity = toNumber(fileListCapacity);

    const listCapacity = capacity <= 0 ? defaultCapacity : capacity;

    if ((fileList || []).length > listCapacity) {
      const text = `上传不能超过${listCapacity}`;

      showWarningMessage({
        message: text,
      });
    }

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

    const isLt2M =
      file.size / 1024 / 1024 <
      defaultSettingsLayoutCustom.getImageUploadMaxSize();

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
      fileListCapacity,
      showUploadList,
      image,
      singleMode: singleModeSource,
      tokenSet,
      onItemChange,
      onItemRemove,
      multiple,
      title,
      icon,
      helper,
    } = this.props;
    const { uploading, previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        {iconCollection.plus}
        <div className="ant-upload-text">上传新图</div>
      </div>
    );

    const capacity = toNumber(fileListCapacity);

    const listCapacity = capacity <= 0 ? defaultCapacity : capacity;

    const uploadProps = {
      disabled,
      multiple,
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
      <>
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
                    <Tooltip title="上传图片">
                      <div className={styles.imageAction}>
                        <div className={styles.icon}>
                          <CenterBox>
                            {uploading
                              ? iconCollection.loading
                              : iconCollection.upload}
                          </CenterBox>
                        </div>

                        <div className={styles.text}>
                          {uploading ? '上传中' : '上传'}
                        </div>
                      </div>
                    </Tooltip>

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
                      flexAuto="left"
                      left={
                        <IconInfo
                          icon={icon}
                          text={stringIsNullOrWhiteSpace(title) ? '' : title}
                        />
                      }
                      right={
                        <Space>
                          <Tooltip title="预览图片">
                            <EyeOutlined
                              onClick={() => {
                                this.handleImagePreview();
                              }}
                            />
                          </Tooltip>

                          <Tooltip title="清除图片">
                            <DeleteOutlined
                              onClick={() => {
                                this.clearImage();
                              }}
                            />
                          </Tooltip>
                        </Space>
                      }
                    />
                  </div>
                </div>
              </>
            ) : (
              <Upload {...uploadProps}>
                {(fileList || []).length >= listCapacity ? null : uploadButton}
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

        {stringIsNullOrWhiteSpace(helper) ? null : (
          <div className={styles.helper}>{buildFieldHelper(helper)}</div>
        )}
      </>
    );
  }
}

ImageUpload.defaultProps = {
  action: '',
  listType: 'picture-card',
  showUploadList: false,
  disabled: false,
  multiple: false,
  tokenSet: {},
  image: '',
  fileList: [],
  singleMode: {
    width: '240px',
    emptyImage: '',
  },
  icon: null,
  title: '',
  helper: '',
  pretreatmentRemoteResponse: () => {},
  afterUploadSuccess: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemChange: ({ file, fileList }) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemRemove: (file) => {},
  fileListCapacity: defaultCapacity,
};

export default ImageUpload;
