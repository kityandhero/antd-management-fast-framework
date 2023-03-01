import { Button, Popconfirm } from 'antd';
import React from 'react';

import {
  isBoolean,
  isFunction,
  isObject,
  showSimpleErrorMessage,
} from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { iconBuilder } from '../Icon';
import { IconInfo } from '../IconInfo';

class ElasticityButton extends BaseComponent {
  ignoreComparePropertyKeyCollection = ['icon', 'iconProcessing'];

  renderFurther() {
    const {
      type: typeSource = 'default',
      size: sizeSource = 'default',
      text: textSource = '按钮',
      icon: iconSource = iconBuilder.form(),
      handleClick: handleClickSource = () => {},
      hidden: hiddenSource = false,
      danger: dangerSource = false,
      disabled: disabledSource = false,
      confirm: confirmSource = false,
      handleData: handleDataSource = null,
      processing: processingSource = false,
      iconProcessing: iconProcessingSource = iconBuilder.loading(),
      style: styleSource = null,
      showIcon: showIconSource = true,
    } = this.props;

    let confirmAdjust = false;

    const {
      type,
      size,
      icon,
      text,
      danger,
      disabled,
      hidden,
      confirm,
      handleData,
      handleClick,
      processing,
      iconProcessing,
      style,
      showIcon,
    } = {
      type: typeSource ?? 'default',
      size: sizeSource ?? 'default',
      text: textSource ?? '按钮',
      icon: iconSource ?? iconBuilder.form(),
      handleClick: handleClickSource ?? null,
      danger: dangerSource ?? false,
      hidden: hiddenSource ?? false,
      disabled: disabledSource ?? false,
      confirm: confirmSource ?? false,
      processing: processingSource ?? false,
      iconProcessing: iconProcessingSource ?? iconBuilder.loading(),
      handleData: handleDataSource ?? null,
      style: styleSource || null,
      showIcon: showIconSource,
    };

    if (hidden) {
      return null;
    }

    confirmAdjust = confirm;

    if (confirmAdjust) {
      if (isBoolean(confirmAdjust)) {
        throw new Error(
          'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
        );
      }

      const { placement, title, handleConfirm, okText, cancelText } = {
        placement: 'topRight',
        title: '将要进行操作，确定吗？',
        okText: '确定',
        cancelText: '取消',
        ...(isObject(confirmAdjust) ? confirmAdjust : {}),
      };

      confirmAdjust = {
        placement,
        title,
        handleConfirm,
        okText,
        cancelText,
      };
    } else {
      confirmAdjust = false;
    }

    const ico = processing
      ? iconProcessing ?? iconBuilder.loading()
      : icon ?? iconBuilder.form();

    if (confirmAdjust) {
      const { placement, title, okText, cancelText } = confirmAdjust;

      return (
        <Popconfirm
          placement={placement}
          title={title || 'confirm:缺少title配置'}
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
        >
          <Button
            type={type}
            size={size}
            style={style || null}
            danger={danger}
            disabled={disabled}
          >
            {showIcon ? <IconInfo icon={ico} text={text} /> : text}
          </Button>
        </Popconfirm>
      );
    }

    return (
      <Button
        style={style || null}
        type={type}
        size={size}
        danger={danger}
        disabled={disabled}
        onClick={() => handleClick({ handleData: handleData ?? null })}
      >
        {showIcon ? <IconInfo icon={ico} text={text} /> : text}
      </Button>
    );
  }
}

ElasticityButton.defaultProps = {
  type: 'default',
  size: 'default',
  text: '按钮',
  icon: iconBuilder.form(),
  handleClick: () => {},
  hidden: false,
  danger: false,
  disabled: false,
  confirm: false,
  handleData: null,
  processing: false,
  iconProcessing: iconBuilder.loading(),
  style: null,
  showIcon: true,
};

export { ElasticityButton };
