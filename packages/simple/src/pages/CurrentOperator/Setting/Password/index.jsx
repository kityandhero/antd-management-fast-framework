import React from 'react';
import { Spin, notification, BackTop } from 'antd';
import { connect } from 'umi';
import { KeyOutlined } from '@ant-design/icons';

import { showRuntimeErrorMessage } from 'antd-management-fast-framework/lib/utils/tools';
import BaseUpdateForm from 'antd-management-fast-framework/lib/framework/DataForm/BaseUpdateForm';

import { fieldData } from '../../Common/data';

import styles from './index.less';

@connect(({ currentOperator, loading }) => ({
  currentOperator,
  loading: loading.models.currentOperator,
}))
class Password extends BaseUpdateForm {
  loadDataAfterMount = false;

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        dataLoading: false,
        submitApiPath: 'currentOperator/changeCurrentPassword',
      },
    };
  }

  buildInitialValues = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaListData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaExtra,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    metaOriginalData,
  ) => {};

  getApiData = (props) => {
    const {
      currentOperator: { data },
    } = props;

    return data;
  };

  getViewDom = (ref) => {
    this.view = ref;
  };

  checkSubmitRequestParams = (o) => {
    if (o.newWord.length < 6) {
      showRuntimeErrorMessage('新密码长度太短，请输入6~32位的新密码！');
      return false;
    }

    if (o.reNewWord !== o.newWord) {
      showRuntimeErrorMessage('两次密码输入不一致！');
      return false;
    }

    return true;
  };

  afterCheckSubmitRequestParams = (o) => {
    const d = o;

    delete d.reNewWord;

    return d;
  };

  afterSubmitSuccess = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extra,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData,
  ) => {
    const form = this.getTargetForm();

    form.resetFields();

    requestAnimationFrame(() => {
      notification.success({
        placement: 'bottomRight',
        message: '操作结果',
        description: '密码修改成功。',
      });
    });
  };

  getSaveButtonDisabled = () => {
    const { processing } = this.state;

    return processing;
  };

  getSaveButtonLoading = () => {
    const { processing } = this.state;

    return processing;
  };

  formContent = () => {
    return (
      <>
        <div className={styles.containorBox}>
          {this.renderFormPassword(
            fieldData.originalWord.label,
            fieldData.originalWord.name,
            true,
            fieldData.originalWord.helper,
            <KeyOutlined />,
          )}

          {this.renderFormPassword(
            fieldData.newWord.label,
            fieldData.newWord.name,
            true,
            fieldData.newWord.helper,
            <KeyOutlined />,
          )}

          {this.renderFormPassword(
            fieldData.reNewWord.label,
            fieldData.reNewWord.name,
            true,
            fieldData.reNewWord.helper,
            <KeyOutlined />,
          )}

          {this.renderSaveButton('更新密码')}
        </div>
        <BackTop />
      </>
    );
  };

  render() {
    const { processing } = this.state;

    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Spin spinning={processing}>{this.renderForm()}</Spin>
        </div>
      </div>
    );
  }
}

export default Password;
