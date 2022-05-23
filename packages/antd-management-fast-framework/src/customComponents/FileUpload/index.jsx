import {
  CopyOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  LinkOutlined,
  LoadingOutlined,
  SwapOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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
        fileSource: '',
        fileUrl: '',
        fileUrlTemp: '',
        uploading: false,
        changeUrlVisible: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { file: fileNext } = nextProps;
    const { fileSource: filePrev } = prevState;

    if ((fileNext || '') !== (filePrev || '')) {
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

  handleUrlChange = (e) => {
    const {
      target: { value: v },
    } = e;

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
        fileUrl: '',
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
    const isLt3M =
      file.size / 1024 / 1024 <
      defaultSettingsLayoutCustom.getFileUploadMaxSize();

    if (!isLt3M) {
      const text = `文件不能超过${defaultSettingsLayoutCustom.getFileUploadMaxSize()}MB!`;

      showErrorMessage({
        message: text,
      });
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
    const { fileUrl } = this.state;

    switch (key) {
      case 'changeUrl':
        this.showChangeUrlModal();
        break;

      case 'copyUrl':
        if (stringIsNullOrWhiteSpace(fileUrl)) {
          const text = '当前未设置文件地址';

          showErrorMessage({
            message: text,
          });
        } else {
          copyToClipboard(fileUrl);
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
    const { action, disabled, tokenSet } = this.props;
    const { uploading, changeUrlVisible, fileUrlTemp, fileUrl } = this.state;

    const uploadProps = {
      disabled,
      action,
      listType: 'text',
      showUploadList: false,
      beforeUpload: this.beforeUpload,
      onChange: this.handleUploadChange,
      headers: { ...tokenSet },
    };

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="changeUrl">
          <IconInfo icon={<SwapOutlined />} text="更换地址" />
        </Menu.Item>

        <Menu.Item key="copyUrl" disabled={stringIsNullOrWhiteSpace(fileUrl)}>
          <IconInfo icon={<CopyOutlined />} text="复制地址" />
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item key="clearUrl" disabled={stringIsNullOrWhiteSpace(fileUrl)}>
          <IconInfo icon={<DeleteOutlined />} text="清空文件" />
        </Menu.Item>
      </Menu>
    );

    const addonAfter = (
      <Space split={<Divider type="vertical" />}>
        <Tooltip key="showChangeUrlTip" placement="top" title="上传文件">
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
              {uploading ? <LoadingOutlined /> : <UploadOutlined />}
              {uploading ? '稍后' : '上传'}
            </Button>
          </Upload>
        </Tooltip>

        <Tooltip key="showMoreTip" placement="top" title="更多操作">
          <Dropdown
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
          addonBefore={<LinkOutlined />}
          addonAfter={addonAfter}
          value={fileUrl}
          placeholder="当前未设置文件地址"
        />

        <Modal
          title={
            <IconInfo icon={<SwapOutlined />} text="请输入将更换的文件地址" />
          }
          visible={changeUrlVisible}
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

VideoUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  file: '',
  pretreatmentRemoteResponse: () => {},
  afterChangeSuccess: () => {},
};

export default VideoUpload;
