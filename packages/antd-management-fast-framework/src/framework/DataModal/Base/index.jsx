import { Alert, Form } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  logCallTrack,
  mergeArrowText,
  toString,
} from 'easy-soft-utility';

import {
  contentConfig,
  defaultFormState,
  emptyLogic,
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';
import { FlexText, iconBuilder } from 'antd-management-fast-component';

import { ModalExtra } from '../../../components/ModalExtra';
import { BaseWindow } from '../../DataOperation/BaseWindow';

import styles from './index.less';

const primaryCallName = 'DataModal::Base';

class Base extends BaseWindow {
  contentWrapperType = contentConfig.wrapperType.model;

  reloadWhenShow = true;

  constructor(properties, visibleFlag) {
    super(properties, visibleFlag);

    const defaultState = defaultFormState();

    this.state = {
      ...defaultState,
      width: 520,
    };
  }

  buildFormLayout = () => {
    this.logCallTrack({}, primaryCallName, 'buildFormLayout');

    return 'horizontal';
  };

  establishFormAdditionalConfig = () => {
    this.logCallTrack({}, primaryCallName, 'establishFormAdditionalConfig');

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
    this.logCallTrack(
      {},
      primaryCallName,
      'establishCardCollectionConfig',
      emptyLogic,
    );

    return null;
  };

  getSaveButtonDisabled = () => {
    this.logCallTrack({}, primaryCallName, 'getSaveButtonDisabled');

    return this.checkOperability();
  };

  buildOkButtonProps = () => {
    this.logCallTrack({}, primaryCallName, 'buildOkButtonProps');

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
    this.logCallTrack({}, primaryCallName, 'buildOkText');

    return '';
  };

  buildOkTextWrapper = () => {
    this.logCallTrack({}, primaryCallName, 'buildOkTextWrapper');

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
    this.logCallTrack({}, primaryCallName, 'buildCancelButtonProps');

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
    this.logCallTrack({}, primaryCallName, 'buildCancelText');

    return (
      <>
        {iconBuilder.closeCircle()}
        <span className={styles.buttonText}>{saveButtonText || '取消'}</span>
      </>
    );
  };

  buildModalBodyStyle = () => {
    this.logCallTrack({}, primaryCallName, 'buildModalBodyStyle');

    return { padding: 0 };
  };

  getModalBodyStyle = () => {
    this.logCallTrack({}, primaryCallName, 'getModalBodyStyle');

    const otherModalBodyStyle = this.buildModalBodyStyle();

    return { padding: 0, ...otherModalBodyStyle };
  };

  buildTitleIcon = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleIcon');

    return iconBuilder.edit();
  };

  buildTitlePrevText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleIcon');

    return '';
  };

  buildTitleText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleText');

    this.logCallTrace(
      {},
      primaryCallName,
      'buildTitleText',
      'getPresetPageTitle',
    );

    return this.getPresetPageTitle();
  };

  buildTitleSubText = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleSubText', emptyLogic);

    return '';
  };

  buildTitleSubTextPrefix = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleSubTextPrefix');

    return '标题';
  };

  buildTitle = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitle');

    return (
      <FlexText
        flexAuto="right"
        icon={this.buildTitleIcon()}
        textPrefix={this.buildTitlePrevText()}
        text={this.buildTitleText()}
      />
    );
  };

  renderPresetFormContent = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetFormContent');

    return this.buildCardCollectionArea(this.establishCardCollectionConfig());
  };

  renderPresetForm = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetForm');

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
    this.logCallTrack({}, primaryCallName, 'renderPresetFormWrapper');

    return this.renderPresetForm();
  };

  renderPresetModalInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetModalInner');

    return this.renderPresetFormWrapper();
  };

  renderFurther() {
    if (this.showCallProcess) {
      this.logCallTrack({}, primaryCallName, 'renderFurther');
    } else {
      logCallTrack(
        {},
        mergeArrowText(
          this.componentName,
          primaryCallName,
          'renderFurther',
          'showCallProcess',
          toString(this.showCallProcess),
        ),
        {
          color: renderFurtherColorWhenNoCallProcess,
          prefix: renderFurtherPrefixWhenNoCallProcess,
        },
      );
    }

    const { width } = this.state;
    const { maskClosable } = this.props;

    const that = this;

    const subTextPrefix = this.buildTitleSubTextPrefix();
    const subText = this.buildTitleSubText();

    const subInfo = checkStringIsNullOrWhiteSpace(subText) ? null : (
      <Alert message={`${subTextPrefix}：${subText}`} type="info" />
    );

    return (
      <ModalExtra
        flag={this.getVisibleFlag()}
        title={this.buildTitle()}
        width={width}
        bodyStyle={this.getModalBodyStyle()}
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
        afterOpenChange={(v) => {
          that.doOtherWhenChangeVisible(v);
        }}
      >
        <div className={styles.modalExtraInner}>
          {checkStringIsNullOrWhiteSpace(subText) ? null : subInfo}

          {this.renderPresetModalInner()}

          {this.renderPresetOther()}
        </div>
      </ModalExtra>
    );
  }
}

export { Base };
