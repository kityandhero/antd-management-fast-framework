import { Form } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { FlexBox } from '../../FlexBox';
import { HiddenWrapper } from '../../HiddenWrapper';
import { VerticalBox } from '../../VerticalBox';
import { ItemChildren } from '../ItemChildren';

const { Item: FormItem } = Form;

export function Item(properties) {
  const {
    hidden,
    render,
    children,
    addonBefore = null,
    addonBeforeStyle = null,
    addonAfter = null,
    addonAfterStyle = null,
    ...rest
  } = properties;

  const childrenAdjust =
    React.isValidElement(children) && isFunction(render) ? (
      <ItemChildren render={render}>{children}</ItemChildren>
    ) : (
      children
    );

  const childWithAddonAfter =
    addonAfter == null ? (
      childrenAdjust
    ) : (
      <FlexBox
        flexAuto={'left'}
        left={childrenAdjust}
        rightStyle={{
          paddingLeft: '10px',
          ...addonAfterStyle,
        }}
        right={<VerticalBox>{addonAfter}</VerticalBox>}
      />
    );

  const childWithAddonBefore =
    addonBefore == null ? (
      childWithAddonAfter
    ) : (
      <FlexBox
        flexAuto={'right'}
        leftStyle={{
          paddingRight: '10px',
          ...addonBeforeStyle,
        }}
        left={<VerticalBox>{addonBefore}</VerticalBox>}
        right={childWithAddonAfter}
      />
    );

  return (
    <HiddenWrapper hidden={hidden}>
      <FormItem {...rest}>{childWithAddonBefore}</FormItem>
    </HiddenWrapper>
  );
}
