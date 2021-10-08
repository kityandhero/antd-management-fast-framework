import React from 'react';
import { connect } from 'umi';
import { Upload, Button, Spin } from 'antd';
import {
  UserOutlined,
  EnvironmentOutlined,
  UploadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { corsTarget, showError } from '@fast-framework/utils/tools';
import { pretreatmentRemoteSingleData } from '@fast-framework/utils/requestAssistor';
import { defaultUserAvatar } from '@fast-framework/utils/constants';
import { getToken, getTokenKeyName } from '@fast-framework/utils/globalStorageAssist';
import BaseUpdateForm from '@fast-framework/framework/DataForm/BaseUpdateForm';

import { fieldData } from '../../Common/data';

import styles from './index.less';

// import GeographicView from '../Geographic';
// import PhoneView from '../Phone';
// import { getTimeDistance } from '@fast-framework/utils/utils';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ processing, avatar, uploadMainProps, imageUploading }) => (
  <>
    <Spin spinning={processing}>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload {...uploadMainProps}>
        <div className={styles.button_view}>
          <Button>{imageUploading ? <LoadingOutlined /> : <UploadOutlined />} 更换头像</Button>
        </div>
      </Upload>
    </Spin>
  </>
);

@connect(({ currentOperator, global, loading }) => ({
  currentOperator,
  global,
  loading: loading.models.currentOperator,
}))
class BaseView extends BaseUpdateForm {
  constructor(props) {
    super(props);

    const tokenSetObject = {};
    tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

    this.state = {
      ...this.state,
      ...{
        loadApiPath: 'currentOperator/getCurrentBasicInfo',
        submitApiPath: 'currentOperator/updateCurrentBasicInfo',
        imageUploading: false,
        imageUrl: '',
        tokenSet: tokenSetObject,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return super.getDerivedStateFromProps(nextProps, prevState);
  }

  fillFormInitialValuesAfterLoad = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData,
  ) => {
    const values = {};

    if (metaData != null) {
      values[fieldData.name.name] = metaData.name || '';
      values[fieldData.email.name] = metaData.email || '';
      values[fieldData.phone.name] = metaData.phone || '';
      values[fieldData.description.name] = metaData.description || '';
    }

    return values;
  };

  afterFillForm = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra = null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData = null,
  }) => {
    const { avatar } = metaData;

    this.setState({ imageUrl: avatar || '' });
  };

  getApiData = (props) => {
    const {
      currentOperator: { data },
    } = props;

    return data;
  };

  supplementSubmitRequestParams = (o) => {
    const d = o;

    const { imageUrl } = this.state;

    d.avatar = imageUrl || '';

    return d;
  };

  getViewDom = (ref) => {
    this.view = ref;
  };

  buildOtherFormProps = () => {
    return { hideRequiredMark: true };
  };

  getSaveButtonDisabled = () => {
    const { dataLoading, processing, loadSuccess } = this.state;

    return dataLoading || processing || !loadSuccess;
  };

  getSaveButtonLoading = () => {
    const { dataLoading, processing, loadSuccess } = this.state;

    return dataLoading || processing || !loadSuccess;
  };

  beforeMainUpload = (file) => {
    const isPic =
      file.type === 'image/jpeg' ||
      file.type === 'image/gif' ||
      file.type === 'image/jpg' ||
      file.type === 'image/png';
    if (!isPic) {
      const text = '请上传图片文件!';

      showError(text);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      const text = '图片文件不能超过2MB!';

      showError(text);
    }

    return isPic && isLt2M;
  };

  handleMainUploadChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ imageUploading: true });
      return;
    }
    if (info.file.status === 'done') {
      const { response } = info.file;

      const v = pretreatmentRemoteSingleData(response);

      const { dataSuccess } = v;

      if (dataSuccess) {
        const {
          data: { imageUrl },
        } = v;

        this.setState({
          imageUrl,
        });
      }

      this.setState({
        imageUploading: false,
      });
    }
  };

  formContent = () => {
    const { metaData } = this.state;

    return (
      <>
        <div className={styles.containorBox}>
          {this.renderFormOnlyShowInput(
            fieldData.loginName.label,
            metaData === null ? '' : metaData.loginName || '',
            fieldData.loginName.helper,
            <UserOutlined />,
          )}

          {this.renderFormInput(
            fieldData.name.label,
            fieldData.name.name,
            false,
            fieldData.name.helper,
          )}

          {this.renderFormOnlyShowInput(
            fieldData.cityName.label,
            metaData === null ? '' : metaData.cityName || '',
            fieldData.cityName.helper,
            <EnvironmentOutlined />,
          )}

          {this.renderFormInput(
            fieldData.email.label,
            fieldData.email.name,
            false,
            fieldData.email.helper,
          )}

          {this.renderFormInput(
            fieldData.phone.label,
            fieldData.phone.name,
            false,
            fieldData.phone.helper,
          )}

          {this.renderFormTextArea(
            fieldData.description.label,
            fieldData.description.name,
            false,
            fieldData.description.helper,
            {
              // autoSize: { minRows: 4, maxRows: 5 },
            },
          )}

          {this.renderSaveButton('更新基本信息')}
        </div>
      </>
    );
  };

  render() {
    const { dataLoading, processing, tokenSet, imageUploading, imageUrl } = this.state;

    const corsUrl = corsTarget();

    const uploadMainProps = {
      action: `${corsUrl}/currentOperator/uploadImage`,
      showUploadList: false,
      disabled: imageUploading,
      beforeUpload: this.beforeMainUpload,
      onChange: this.handleMainUploadChange,
      headers: { ...tokenSet },
    };

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={dataLoading || processing}>{this.renderForm()}</Spin>
        </div>
        <div className={styles.right}>
          <AvatarView
            avatar={imageUrl || defaultUserAvatar}
            uploadMainProps={uploadMainProps}
            imageUploading={imageUploading}
            processing={processing}
          />
        </div>
      </div>
    );
  }
}

export default BaseView;
