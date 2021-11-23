import React from 'react';
import { Row, Col, Form, Modal, Spin } from 'antd';
import {
  CloseCircleOutlined,
  LoadingOutlined,
  EditOutlined,
} from '@ant-design/icons';

import {
  defaultFormState,
  isUndefined,
  stringIsNullOrWhiteSpace,
} from '../../../utils/tools';
import { cardConfig } from '../../../utils/constants';

import BaseWindow from '../../DataOperation/BaseWindow';

import styles from './index.less';

class Base extends BaseWindow {
  reloadWhenShow = true;

  constructor(props) {
    super(props);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      ...{
        visible: false,
        dataLoading: false,

        width: 520,
      },
    };
  }

  buildFormLayout = () => {
    return 'horizontal';
  };

  establishFormAdditionalConfig = () => {
    return {
      labelCol: {
        span: 7,
      },
      wrapperCol: {
        span: 17,
      },
    };
  };

  establishCardCollectionConfig = () => {
    return null;
  };

  establishWrapperTypeConfig = () => {
    return { mode: cardConfig.wrapperType.model };
  };

  getSaveButtonDisabled = () => {
    const { dataLoading, processing, loadSuccess } = this.state;

    return this.checkOperability();
  };

  buildOkButtonProps = () => {
    if (this.reloadWhenShow) {
      const buttonDisabled =
        this.getSaveButtonDisabled() || this.getOtherButtonDisabled();

      return {
        disabled: buttonDisabled,
      };
    }

    const buttonDisabled = this.getOtherButtonDisabled();

    return {
      disabled: buttonDisabled,
    };
  };

  buildOkText = () => {
    return '';
  };

  buildOkTextWrapper = () => {
    const okText = this.buildOkText();

    const buttonProcessing = this.getSaveButtonProcessing();

    return (
      <>
        {buttonProcessing ? <LoadingOutlined /> : this.getSaveButtonIcon()}
        <span className={styles.buttonText}>{okText || '保存'}</span>
      </>
    );
  };

  buildCancelButtonProps = () => {
    if (this.reloadWhenShow) {
      const buttonDisabled =
        this.getSaveButtonDisabled() || this.getOtherButtonDisabled();

      return {
        disabled: buttonDisabled,
      };
    }

    return {};
  };

  buildCancelText = (saveButtonText = '') => {
    return (
      <>
        <CloseCircleOutlined />
        <span className={styles.buttonText}>{saveButtonText || '取消'}</span>
      </>
    );
  };

  buildModalBodyStyle = () => {
    return { padding: 0 };
  };

  getModalBodyStyle = () => {
    const otherModalBodyStyle = this.buildModalBodyStyle();

    return { ...{ padding: 0 }, ...(otherModalBodyStyle || {}) };
  };

  buildTitleIcon = () => {
    return <EditOutlined />;
  };

  buildTitlePrevText = () => {
    return '';
  };

  buildTitleText = () => {
    const { pageName } = this.state;

    return pageName;
  };

  buildTitleSubText = () => {
    return '';
  };

  buildTitle = () => {
    const prevText = this.buildTitlePrevText();
    let subText = this.buildTitleSubText();

    subText = stringIsNullOrWhiteSpace(subText) ? '' : `：【${subText}】`;

    return (
      <Row gutter={6}>
        <Col>{this.buildTitleIcon()}</Col>
        <Col flex="auto">
          {prevText}
          {this.buildTitleText()}
          {subText}
        </Col>
      </Row>
    );
  };

  formContent = () => {
    return this.buildCardCollection(this.establishCardCollectionConfig());
  };

  renderFormWrapper = () => {
    return this.renderForm();
  };

  renderForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    const otherFormProps = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        layout={this.buildFormLayout()}
        initialValues={initialValues}
        className={this.getFormClassName()}
        {...otherFormProps}
      >
        {this.formContent()}
      </Form>
    );
  };

  renderModalInner = () => {
    return this.renderFormWrapper();
  };

  renderFurther() {
    const { width, visible, processing, dataLoading } = this.state;
    const { maskClosable } = this.props;

    return (
      <Modal
        title={this.buildTitle()}
        width={width}
        bodyStyle={this.getModalBodyStyle()}
        visible={visible}
        maskClosable={isUndefined(maskClosable) ? false : maskClosable}
        zIndex={1001}
        okButtonProps={this.buildOkButtonProps()}
        onOk={(e) => {
          this.handleOk(e);
        }}
        okText={this.buildOkTextWrapper()}
        cancelButtonProps={this.buildCancelButtonProps()}
        cancelText={this.buildCancelText()}
        onCancel={this.handleCancel}
      >
        <Spin spinning={processing || dataLoading}>
          {this.renderModalInner()}
        </Spin>

        {this.renderOther()}
      </Modal>
    );
  }
}

export default Base;
