import { Switch } from 'antd';
import React from 'react';

export const FormItemSwitcher = (properties) => {
  return (
    <Switch
      checked={properties.value === 'FormItem'}
      onChange={(value) => {
        properties.onChange &&
          properties.onChange(value ? 'FormItem' : undefined);
      }}
    />
  );
};
