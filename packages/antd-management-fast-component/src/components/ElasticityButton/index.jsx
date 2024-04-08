import { Button, Popconfirm, Tooltip } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isNull,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { BaseComponent } from '../../bases';
import { iconBuilder } from '../Icon';
import { IconInfo } from '../IconInfo';

class ElasticityButton extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['icon', 'iconProcessing'];

  renderFurther() {
    const {
      confirm = false,
      title = '',
      placement = 'topRight',
      okText = '确定',
      cancelText = '取消',
      overlayStyle,
      className,
      type = 'default',
      size = 'default',
      text = '按钮',
      icon = iconBuilder.form(),
      handleClick = () => {},
      hidden = false,
      danger = false,
      disabled = false,
      handleData = null,
      processing = false,
      iconProcessing = iconBuilder.loading(),
      style = {},
      color,
      showIcon = true,
      confirmPanelZIndex = null,
    } = this.props;

    if (hidden) {
      return null;
    }

    const ico = processing
      ? iconProcessing ?? iconBuilder.loading()
      : icon ?? iconBuilder.form();

    if (confirm) {
      return (
        <Popconfirm
          {...(isNull(confirmPanelZIndex)
            ? {}
            : { zIndex: confirmPanelZIndex })}
          placement={placement}
          title={title || '将要进行操作，确定吗？'}
          onConfirm={() => {
            if (isFunction(handleClick)) {
              handleClick({ handleData: handleData ?? null });
            } else {
              const messageText = 'buildButton : handleClick is not function';

              showSimpleErrorMessage(messageText);
            }
          }}
          okText={okText}
          cancelText={cancelText}
          disabled={disabled}
          overlayStyle={overlayStyle}
        >
          <Button
            className={className}
            type={type}
            size={size}
            style={style || null}
            danger={danger}
            disabled={disabled}
          >
            <IconInfo
              icon={showIcon ? ico : null}
              text={text}
              style={
                checkStringIsNullOrWhiteSpace(color)
                  ? { color: 'inherit' }
                  : { color: color }
              }
            />
          </Button>
        </Popconfirm>
      );
    }

    const button = (
      <Button
        style={style || null}
        type={type}
        size={size}
        danger={danger}
        disabled={disabled}
        onClick={() => handleClick({ handleData: handleData ?? null })}
      >
        <IconInfo
          icon={showIcon ? ico : null}
          text={text}
          style={
            checkStringIsNullOrWhiteSpace(color)
              ? { color: 'inherit' }
              : { color: color }
          }
        />
      </Button>
    );

    if (checkStringIsNullOrWhiteSpace(title)) {
      return button;
    }

    return (
      <Tooltip placement={placement} title={title}>
        {button}
      </Tooltip>
    );
  }
}

ElasticityButton.defaultProps = {
  confirm: false,
  title: '',
  placement: 'topRight',
  className: '',
  okText: '确定',
  cancelText: '取消',
  overlayStyle: {},
  type: 'default',
  size: 'default',
  text: '按钮',
  icon: iconBuilder.form(),
  handleClick: () => {},
  hidden: false,
  danger: false,
  disabled: false,
  handleData: null,
  processing: false,
  iconProcessing: iconBuilder.loading(),
  style: null,
  color: null,
  showIcon: true,
  confirmPanelZIndex: null,
};

export { ElasticityButton };
