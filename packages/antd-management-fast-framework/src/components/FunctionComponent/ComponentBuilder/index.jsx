import React from 'react';

import { iconBuilder } from 'antd-management-fast-component';

import { ElasticityExtraButton } from '../../ElasticityExtraButton';

/**
 * 构建按钮
 */
export function buildExtraButton({
  flag = [],
  confirm = false,
  title = '',
  placement = 'topRight',
  okText = '确定',
  cancelText = '取消',
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
  style = null,
  showIcon = true,
}) {
  return (
    <ElasticityExtraButton
      flag={flag}
      confirm={confirm}
      title={title}
      placement={placement}
      okText={okText}
      cancelText={cancelText}
      type={type}
      size={size}
      text={text}
      icon={icon}
      handleClick={handleClick}
      hidden={hidden}
      danger={danger}
      disabled={disabled}
      handleData={handleData}
      processing={processing}
      iconProcessing={iconProcessing}
      style={style}
      showIcon={showIcon}
    />
  );
}
