import { Button, Popover } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import {
  isArray,
  isFunction,
  logDevelop,
  toLowerFirst,
} from 'easy-soft-utility';

import { BaseComponent } from '../../bases';
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
      ellipsisMode = false,
      confirm = false,
      title = '',
      placement = 'topRight',
      okText = '确定',
      cancelText = '取消',
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
      processing = false,
      iconProcessing = iconBuilder.loading(),
    } = this.props;

    if (hidden) {
      return null;
    }

    if (disabled) {
      return (
        <Button
          type={typeSource || 'default'}
          size={size ?? 'default'}
          disabled
        >
          <IconInfo icon={icon || null} text={text || ''} />
        </Button>
      );
    }

    const innerProperties = {};
    const placementAdjust = toLowerFirst(placementDropdown || 'bottomRight');

    const overlayClassNameAdjust =
      placementAdjust.includes('bottom') || placementAdjust.includes('Bottom')
        ? classNames(`amf-dropdownExpandOverlayBottom`)
        : placementAdjust.startsWith('top')
          ? classNames(`amf-dropdownExpandOverlayTop`)
          : {};

    if ((handleButtonClick || null) != null && !isFunction(handleButtonClick)) {
      logDevelop('handleButtonClick must be function');
    }

    const propertiesAdjust = {
      confirm,
      title,
      placement,
      okText,
      cancelText,
      type: typeSource || 'default',
      size: size ?? 'default',
      text: text || '',
      icon: icon || null,
      handleClick: isFunction(handleButtonClick)
        ? () => {
            handleButtonClick({ handleData: r });
          }
        : null,
      hidden,
      disabled: disabled ?? false,
      handleData: r,
      processing,
      iconProcessing,
      ...innerProperties,
    };

    if (!isArray(items) || items.length === 0) {
      return <ElasticityButton {...propertiesAdjust} />;
    }

    const popoverButton = ellipsisMode ? (
      <Button size={size ?? 'default'}>
        <VerticalBox>
          <IconInfo
            icon={iconBuilder.ellipsis({
              style: {
                fontSize: 20,
                verticalAlign: 'top',
              },
            })}
          />
        </VerticalBox>
      </Button>
    ) : (
      <Button
        style={{
          height: '100%',
          paddingTop: 0,
          border: 0,
          paddingBottom: 0,
          paddingLeft: 3,
          paddingRight: 3,
        }}
        size={size ?? 'default'}
      >
        <VerticalBox>
          <EllipsisOutlined
            style={{
              fontSize: 12,
            }}
          />
        </VerticalBox>
      </Button>
    );

    const popover = (
      <Popover
        {...innerProperties}
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
        {popoverButton}
      </Popover>
    );

    if (ellipsisMode) {
      return popover;
    }

    return (
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
          <ElasticityButton
            {...propertiesAdjust}
            style={{
              border: 0,
            }}
          />
        }
        right={popover}
      />
    );
  }
}

ElasticityDropdown.defaultProps = {
  ellipsisMode: false,
  confirm: false,
  title: '',
  placement: 'topRight',
  okText: '确定',
  cancelText: '取消',
  type: 'default',
  size: 'default',
  text: '按钮',
  icon: iconBuilder.form(),
  handleData: null,
  arrow: true,
  disabled: false,
  hidden: false,
  handleButtonClick: null,
  handleMenuClick: () => {},
  items: [],
  itemPanelTitle: '',
  processing: false,
  iconProcessing: iconBuilder.loading(),
};

export { ElasticityDropdown };
