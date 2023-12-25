import { Form } from 'antd';
import React from 'react';

import { isFunction } from 'easy-soft-utility';

import { FlexBox } from '../../FlexBox';
import { HiddenWrapper } from '../../HiddenWrapper';
import { VerticalBox } from '../../VerticalBox';
import { ItemChildren } from '../ItemChildren';

const { Item: FormItem } = Form;

function renderWithAddon(
  c,
  {
    addonBefore = null,
    addonBeforeStyle = null,
    addonAfter = null,
    addonAfterStyle = null,
  },
) {
  const childWithAddonAfter =
    addonAfter == null ? (
      c
    ) : (
      <FlexBox
        flexAuto={'left'}
        left={c}
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

  return childWithAddonBefore;
}

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

  return (
    <HiddenWrapper hidden={hidden}>
      <FormItem {...rest}>
        {React.isValidElement(children) && isFunction(render) ? (
          <ItemChildren render={render}>{children}</ItemChildren>
        ) : React.isValidElement(children) &&
          (addonBefore != null || addonAfter != null) ? (
          <ItemChildren
            render={(c) => {
              return renderWithAddon(c, {
                addonBefore,
                addonBeforeStyle,
                addonAfter,
                addonAfterStyle,
              });
            }}
          >
            {children}
          </ItemChildren>
        ) : (
          children
        )}
      </FormItem>
    </HiddenWrapper>
  );
}
