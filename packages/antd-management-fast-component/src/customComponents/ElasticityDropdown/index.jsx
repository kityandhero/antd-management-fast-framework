import { Button, Popconfirm, Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import {
  isArray,
  isBoolean,
  isFunction,
  isObject,
  logObject,
  toLowerFirst,
} from 'easy-soft-utility';

import { BaseComponent } from '../BaseComponent';
import { ElasticityButton } from '../ElasticityButton';
import { ElasticityMenu } from '../ElasticityMenu';
import { FlexBox } from '../FlexBox';
import { iconBuilder } from '../Icon';
import { IconInfo } from '../IconInfo';
import { VerticalBox } from '../VerticalBox';

import './index.less';

class ElasticityDropdown extends BaseComponent {
  renderFurther() {
    const {
      tooltip: tooltipSource = false,
      type: typeSource = 'default',
      placement: placementDropdown = 'bottomRight',
      size = 'default',
      text = '按钮',
      icon = iconBuilder.form(),
      handleData: r,
      arrow = true,
      disabled = false,
      hidden = false,
      handleButtonClick = null,
      handleMenuClick = () => {},
      items = [],
      itemPanelTitle = '',
      confirm = false,
      processing = false,
      iconProcessing = iconBuilder.loading(),
    } = this.props;

    if (hidden) {
      return null;
    }

    const tooltipAdjust = tooltipSource;

    const otherProperties = tooltipAdjust || {};
    const placementAdjust = toLowerFirst(placementDropdown || 'bottomRight');

    const overlayClassNameAdjust = placementAdjust.startsWith('bottom')
      ? classNames(`amf-dropdownExpandOverlayBottom`)
      : placementAdjust.startsWith('top')
      ? classNames(`amf-dropdownExpandOverlayTop`)
      : {};

    let hasHandleButtonClick = false;

    if ((handleButtonClick || null) != null) {
      if (!isFunction(handleButtonClick)) {
        throw new Error(
          'buildDropdown(framework) : handleButtonClick must be function',
        );
      }

      hasHandleButtonClick = true;
    }

    let button = null;

    if (!isArray(items) || items.length === 0) {
      button = (
        <ElasticityButton
          {...{
            type: typeSource || 'default',
            size,
            text,
            icon,
            handleClick: handleButtonClick,
            hidden,
            disabled,
            confirm,
            handleData: r,
            processing,
            iconProcessing,
            ...otherProperties,
          }}
        />
      );
    } else if (hasHandleButtonClick) {
      let confirmAdjust = confirm;

      if (confirmAdjust) {
        if (isBoolean(confirmAdjust)) {
          logObject(arguments[0]);

          throw new Error(
            'buildMenu : confirm property in menu Items not allow bool when check confirm is true.',
          );
        }

        const { placement, title, handleConfirm, okText, cancelText } = {
          placement: 'topLeft',
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

      if (confirmAdjust) {
        const { placement, title, okText, cancelText } = confirmAdjust;

        button = (
          <FlexBox
            flexAuto="left"
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
            }}
            leftStyle={{
              borderRight: '1px solid #d9d9d9',
            }}
            left={
              <Popconfirm
                placement={placement}
                title={title || 'confirm:缺少title配置'}
                onConfirm={() => {
                  handleButtonClick({ handleData: r });
                }}
                okText={okText}
                cancelText={cancelText}
                disabled={disabled}
              >
                <Button
                  type={typeSource || 'default'}
                  style={{
                    border: 0,
                  }}
                  size={size ?? 'default'}
                  disabled={disabled ?? false}
                >
                  <IconInfo icon={icon || null} text={text || ''} />
                </Button>
              </Popconfirm>
            }
            right={
              <Popover
                {...otherProperties}
                placement={placementAdjust}
                arrow={arrow}
                content={
                  <ElasticityMenu
                    handleData={r}
                    handleMenuClick={handleMenuClick}
                    items={items}
                  />
                }
                title={itemPanelTitle}
                overlayClassName={overlayClassNameAdjust}
                overlayInnerStyle={{ padding: 0 }}
              >
                <Button
                  style={{
                    height: '100%',
                    paddingTop: 0,
                    border: 0,
                    paddingBottom: 0,
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  <VerticalBox>
                    <EllipsisOutlined
                      style={{
                        fontSize: 12,
                      }}
                    />
                  </VerticalBox>
                </Button>
              </Popover>
            }
          />
        );
      } else {
        button = (
          <FlexBox
            flexAuto="left"
            style={{
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
            }}
            leftStyle={{
              borderRight: '1px solid #d9d9d9',
            }}
            left={
              <Button
                type={typeSource || 'default'}
                style={{
                  border: 0,
                }}
                size={size ?? 'default'}
                disabled={disabled ?? false}
                onClick={() => {
                  handleButtonClick({ handleData: r });
                }}
              >
                <IconInfo icon={icon || null} text={text || ''} />
              </Button>
            }
            right={
              <Popover
                {...otherProperties}
                placement={placementAdjust}
                arrow={arrow}
                content={
                  <ElasticityMenu
                    handleData={r}
                    handleMenuClick={handleMenuClick}
                    items={items}
                  />
                }
                title={itemPanelTitle}
                overlayClassName={overlayClassNameAdjust}
                overlayInnerStyle={{ padding: 0 }}
              >
                <Button
                  style={{
                    height: '100%',
                    border: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  <VerticalBox>
                    <EllipsisOutlined
                      style={{
                        fontSize: 12,
                      }}
                    />
                  </VerticalBox>
                </Button>
              </Popover>
            }
          />
        );
      }
    } else {
      button = disabled ? (
        <Button
          type={typeSource || 'default'}
          size={size ?? 'default'}
          disabled
        >
          <IconInfo icon={icon || null} text={text || ''} />
        </Button>
      ) : (
        <Popover
          {...otherProperties}
          placement={placementAdjust}
          arrow={arrow}
          content={
            <ElasticityMenu
              handleData={r}
              handleMenuClick={handleMenuClick}
              items={items}
            />
          }
          title={itemPanelTitle}
          overlayClassName={overlayClassNameAdjust}
          overlayInnerStyle={{ padding: 0 }}
        >
          <Button type={typeSource || 'default'} size={size ?? 'default'}>
            <IconInfo icon={icon || null} text={text || ''} />
          </Button>
        </Popover>
      );
    }

    if (tooltipAdjust) {
      if (isBoolean(tooltipAdjust)) {
        throw new Error(
          'buildDropdown(framework) : tooltip property in menu Items not allow bool when check tooltip is true.',
        );
      }

      const { placement: placementTooltip, title } = {
        placement: 'top',
        title: 'tooltip title need set',
        ...(isObject(tooltipAdjust) ? tooltipAdjust : {}),
      };

      return (
        <Tooltip placement={placementTooltip || 'top'} title={title}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }
}

ElasticityDropdown.defaultProps = {
  tooltip: false,
  type: 'default',
  placement: 'bottomRight',
  size: 'default',
  text: '按钮',
  icon: iconBuilder.form(),
  handleData: {},
  arrow: true,
  disabled: false,
  hidden: false,
  handleButtonClick: null,
  handleMenuClick: () => {},
  items: [],
  itemPanelTitle: '',
  confirm: false,
  processing: false,
  iconProcessing: iconBuilder.loading(),
};

export { ElasticityDropdown };
