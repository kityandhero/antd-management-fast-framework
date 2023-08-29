import { Radio } from 'antd';
import cls from 'classnames';
import React from 'react';
import { FormItem as FormItemFormily } from '@formily/antd-v5';
import { Field, observer, useField } from '@formily/react';

import { IconWidget, usePrefix } from '../../../react';
import { FlexStyleSetter } from '../FlexStyleSetter';

import './styles.less';

export const DisplayStyleSetter = observer((properties) => {
  const field = useField();
  const prefix = usePrefix('display-style-setter');
  const FormItem = FormItemFormily;
  return (
    <>
      <FormItem.BaseItem
        label={field.title}
        className={cls(prefix, properties.className)}
        style={properties.style}
      >
        <Radio.Group
          className={prefix + '-radio'}
          options={[
            {
              label: <IconWidget infer="DisplayBlock" size={16} />,
              value: 'block',
            },
            {
              label: <IconWidget infer="DisplayInlineBlock" size={16} />,
              value: 'inline-block',
            },
            {
              label: <IconWidget infer="DisplayInline" size={16} />,
              value: 'inline',
            },
            {
              label: <IconWidget infer="DisplayFlex" size={16} />,
              value: 'flex',
            },
          ]}
          value={properties.value}
          onChange={(event) => {
            properties.onChange?.(event.target.value);
          }}
          optionType="button"
        />
      </FormItem.BaseItem>
      <Field
        name="flex"
        basePath={field.address.parent()}
        visible={false}
        reactions={(flexField) => {
          flexField.visible = field.value === 'flex';
        }}
        component={[FlexStyleSetter]}
      />
    </>
  );
});
