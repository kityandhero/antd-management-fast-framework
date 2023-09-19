import React from 'react';

import {
  isArray,
  isEmptyArray,
  isFunction,
  logTrace,
  mergeArrowText,
} from 'easy-soft-utility';

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
    this.openSelector();
  };

  openSelector = () => {
    throw new Error(this.buildOverloadErrorText('openSelector'));
  };

  afterSelectSuccess = (o) => {
    logTrace(
      mergeArrowText(
        this.componentName,
        primaryCallName,
        'trigger',
        'afterSelectSuccess',
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

  renderPresetSelector = () => {
    throw new Error(this.buildOverloadErrorText('renderPresetSelector'));
  };

  renderPresetOther = () => {
    return this.renderPresetSelector();
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
  afterSelectSuccess: null,
};

export { BaseElasticitySelectButton };
