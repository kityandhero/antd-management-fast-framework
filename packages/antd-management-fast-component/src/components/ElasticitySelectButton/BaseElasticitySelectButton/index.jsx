import React from 'react';

import {
  isArray,
  isEmptyArray,
  isFunction,
  logTrace,
  mergeArrowText,
  showSimpleRuntimeError,
  toNumber,
} from 'easy-soft-utility';

import { selectModeCollection } from 'antd-management-fast-common';

import { BaseComponent } from '../../../bases/BaseComponent';
import { ElasticityButton } from '../../ElasticityButton';

const primaryCallName = 'ElasticitySelectButton::BaseElasticitySelectButton';

class BaseElasticitySelectButton extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      selectData: null,
    };
  }

  showSelect = () => {
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      this.showDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      this.showModal();
    }
  };

  openDrawer = () => {
    throw new Error(this.buildOverloadErrorText('openDrawer'));
  };

  showDrawer = () => {
    this.openDrawer();
  };

  afterDrawerSelectSuccess = (o) => {
    logTrace(
      mergeArrowText(
        this.componentName,
        primaryCallName,
        'trigger',
        'afterDrawerSelectSuccess',
        'afterSelectSuccessCore',
      ),
    );

    this.afterSelectSuccessCore(o);
  };

  openModal = () => {
    throw new Error(this.buildOverloadErrorText('openModal'));
  };

  showModal = () => {
    this.openModal();
  };

  afterModalSelectSuccess = (o) => {
    logTrace(
      mergeArrowText(
        this.componentName,
        primaryCallName,
        'trigger',
        'afterModalSelectSuccess',
        'afterSelectSuccessCore',
      ),
    );

    this.afterSelectSuccessCore(o);
  };

  afterSelectSuccessCore = (o) => {
    if ((o || null) == null) {
      return;
    }

    const { afterSelectSuccess } = this.props;

    const v = isArray(o) ? (isEmptyArray(o) ? null : o[0]) : o;

    this.setState({
      selectData: v,
    });

    if (isFunction(afterSelectSuccess)) {
      afterSelectSuccess(v);
    }
  };

  renderPresetButton = () => {
    const {
      type,
      size,
      text,
      icon,
      disabled,
      style,
      color,
      showIcon,
      children,
    } = this.props;

    const p = {
      type,
      size,
      text,
      icon,
      disabled,
      style,
      color,
      showIcon,
      handleClick: () => {
        this.showSelect();
      },
    };

    return <ElasticityButton {...p}>{children}</ElasticityButton>;
  };

  renderPresetSelectDrawer = () => {
    throw new Error(this.buildOverloadErrorText('renderPresetSelectDrawer'));
  };

  renderPresetSelectModal = () => {
    throw new Error(this.buildOverloadErrorText('renderPresetSelectModal'));
  };

  renderPresetOther = () => {
    const { selectMode } = this.props;

    if (toNumber(selectMode) === selectModeCollection.drawer) {
      return this.renderPresetSelectDrawer();
    }

    if (toNumber(selectMode) === selectModeCollection.modal) {
      return this.renderPresetSelectModal();
    }

    const text = '无效的选择项渲染模式';

    showSimpleRuntimeError(text);

    return null;
  };

  renderFurther() {
    return (
      <>
        {this.renderPresetButton()}

        {this.renderPresetOther()}
      </>
    );
  }
}

BaseElasticitySelectButton.defaultProps = {
  type: 'default',
  size: 'default',
  icon: null,
  disabled: false,
  style: null,
  color: null,
  showIcon: true,
  text: '按钮',
  selectMode: selectModeCollection.drawer,
  afterSelectSuccess: null,
};

export { BaseElasticitySelectButton };
