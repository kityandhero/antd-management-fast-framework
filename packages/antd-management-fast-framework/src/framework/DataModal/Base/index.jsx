import { Form, Modal, Spin } from 'antd';
import React from 'react';

import { checkStringIsNullOrWhiteSpace, isUndefined } from 'easy-soft-utility';

import { contentConfig, defaultFormState } from 'antd-management-fast-common';
import { FlexText, iconBuilder } from 'antd-management-fast-component';

import { BaseWindow } from '../../DataOperation/BaseWindow';

import styles from './index.less';

class Base extends BaseWindow {
  contentWrapperType = contentConfig.wrapperType.model;

  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      visible: false,
      dataLoading: false,

      width: 520,
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

  getSaveButtonDisabled = () => {
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
        {buttonProcessing ? iconBuilder.loading() : this.getSaveButtonIcon()}
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
        {iconBuilder.closeCircle()}
        <span className={styles.buttonText}>{saveButtonText || '取消'}</span>
      </>
    );
  };

  buildModalBodyStyle = () => {
    return { padding: 0 };
  };

  getModalBodyStyle = () => {
    const otherModalBodyStyle = this.buildModalBodyStyle();

    return { padding: 0, ...otherModalBodyStyle };
  };

  buildTitleIcon = () => {
    return iconBuilder.edit();
  };

  buildTitlePrevText = () => {
    return '';
  };

  buildTitleText = () => {
    const { pageTitle } = this.state;

    return pageTitle;
  };

  buildTitleSubText = () => {
    return '';
  };

  buildTitle = () => {
    const subText = this.buildTitleSubText();

    const subInfo = checkStringIsNullOrWhiteSpace(subText) ? null : (
      <FlexText
        flexAuto="right"
        addonBefore={'【'}
        text={subText}
        addonAfter={'】'}
      />
    );

    return (
      <FlexText
        flexAuto="right"
        icon={this.buildTitleIcon()}
        textPrefix={this.buildTitlePrevText()}
        text={this.buildTitleText()}
        extra={subInfo}
      />
    );
  };

  renderPresetFormContent = () => {
    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
  };

  renderPresetForm = () => {
    const { metaData, metaListData, metaExtra, metaOriginalData } = this.state;

    const initialValues = this.buildInitialValues({
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    });

    const otherFormProperties = this.establishFormAdditionalConfig();

    return (
      <Form
        ref={this.formRef}
        layout={this.buildFormLayout()}
        initialValues={initialValues}
        className={this.getFormClassName()}
        {...otherFormProperties}
      >
        {this.renderPresetFormContent()}
      </Form>
    );
  };

  renderPresetFormWrapper = () => {
    return this.renderPresetForm();
  };

  renderPresetModalInner = () => {
    return this.renderPresetFormWrapper();
  };

  renderFurther() {
    const { width, visible, processing, dataLoading } = this.state;
    const { maskClosable } = this.props;

    return (
      <Modal
        title={this.buildTitle()}
        width={width}
        bodyStyle={this.getModalBodyStyle()}
        open={visible}
        maskClosable={isUndefined(maskClosable) ? false : maskClosable}
        zIndex={1001}
        okButtonProps={this.buildOkButtonProps()}
        onOk={(event) => {
          this.handleOk(event);
        }}
        okText={this.buildOkTextWrapper()}
        cancelButtonProps={this.buildCancelButtonProps()}
        cancelText={this.buildCancelText()}
        onCancel={this.handleCancel}
      >
        <Spin spinning={processing || dataLoading}>
          {this.renderPresetModalInner()}
        </Spin>

        {this.renderPresetOther()}
      </Modal>
    );
  }
}

export { Base };
