import { Form, Space } from 'antd';
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
    icon = null,
    addonBefore = null,
    addonBeforeStyle = null,
    addonAfter = null,
    addonAfterStyle = null,
  },
) {
  const innerAdjust =
    icon == null ? (
      c
    ) : (
      <Space.Compact block>
        <Space.Addon>{icon}</Space.Addon>

        {c}
      </Space.Compact>
    );

  const childWithAddonAfter =
    addonAfter == null ? (
      innerAdjust
    ) : (
      <FlexBox
        flexAuto={'left'}
        left={innerAdjust}
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
    icon = null,
    addonBefore = null,
    addonBeforeStyle = null,
    addonAfter = null,
    addonAfterStyle = null,
    ...rest
  } = properties;

  return (
    <HiddenWrapper hidden={hidden}>
      <FormItem {...rest}>
        {React.isValidElement(children) &&
        (isFunction(render) ||
          icon != null ||
          addonBefore != null ||
          addonAfter != null) ? (
          <ItemChildren
            render={(c) => {
              if (isFunction(render)) {
                return renderWithAddon(render(c), {
                  icon,
                  addonBefore,
                  addonBeforeStyle,
                  addonAfter,
                  addonAfterStyle,
                });
              }

              return renderWithAddon(c, {
                icon,
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
