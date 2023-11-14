import { Alert } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isUndefined,
  logCallTrack,
  mergeArrowText,
  showSimpleErrorMessage,
  toString,
} from 'easy-soft-utility';

import {
  contentConfig,
  defaultFormState,
  emptyLogic,
  renderFurtherColorWhenNoCallProcess,
  renderFurtherPrefixWhenNoCallProcess,
} from 'antd-management-fast-common';
import { iconBuilder } from 'antd-management-fast-component';

import { ModalExtra } from '../../../components/ModalExtra';
import { BaseWindow } from '../../DataOperation/BaseWindow';

import styles from './index.less';

const primaryCallName = 'DataModal::Base';

class Base extends BaseWindow {
  contentWrapperType = contentConfig.wrapperType.model;

  reloadWhenShow = true;

  showFooter = true;

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
    this.logCallTrack({}, primaryCallName, 'buildTitlePrevText');

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
    this.logCallTrack(
      {},
      primaryCallName,
      'buildTitleSubTextPrefix',
      emptyLogic,
    );

    return '';
  };

  buildTitleSubTextAlign = () => {
    this.logCallTrack({}, primaryCallName, 'buildTitleSubTextAlign');

    return 'center';
  };

  renderPresetTitleIcon = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetTitleIcon');

    return iconBuilder.edit();
  };

  renderPresetContentContainorInner = () => {
    this.logCallTrack(
      {},
      primaryCallName,
      'renderPresetContentContainorInner',
      emptyLogic,
    );

    const text = 'renderPresetContentContainorInner need be override';

    showSimpleErrorMessage(text);

    return null;
  };

  renderPresetModalInner = () => {
    this.logCallTrack({}, primaryCallName, 'renderPresetModalInner');

    return this.renderPresetContentContainorInner();
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

    let subTextPrefix = this.buildTitleSubTextPrefix();
    const subText = this.buildTitleSubText();
    const subTextAlign = this.buildTitleSubTextAlign();

    subTextPrefix = checkStringIsNullOrWhiteSpace(subTextPrefix)
      ? ''
      : `${subTextPrefix}：`;

    const subInfo = checkStringIsNullOrWhiteSpace(subText) ? null : (
      <Alert
        message={`${subTextPrefix}${subText}`}
        style={{ textAlign: subTextAlign }}
        type="info"
      />
    );

    this.logCallTrace(
      {
        subTextPrefix,
        subText,
        subTextAlign,
      },
      mergeArrowText(this.componentName, primaryCallName, 'renderFurther'),
    );

    return (
      <ModalExtra
        destroyOnClose={this.destroyOnClose || false}
        flag={this.getVisibleFlag()}
        icon={this.renderPresetTitleIcon()}
        titlePrefix={this.buildTitlePrevText()}
        title={this.buildTitleText()}
        width={width}
        styles={{
          body: this.getModalBodyStyle(),
        }}
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
        {...(this.showFooter ? {} : { footer: null })}
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
