/*
 * 支持文本、数字、布尔、表达式
 * Todo: JSON、富文本，公式
 */
import { Button, Input, InputNumber, Popover, Select } from 'antd';
import React from 'react';

import { TextWidget } from '../../../react';
import { MonacoInput } from '../MonacoInput';
import { createPolyInput } from '../PolyInput';

const START_TAG_REX =
  /<([\w-]+)((?:\s+[:A-Z_a-z][\w.:-]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^\s>]+))?)*)\s*(\/?)>/;

const EXPRESSION_REX = /^{{([\S\s]*)}}$/;

const isNumber = (value) => typeof value === 'number';

const isBoolean = (value) => typeof value === 'boolean';

const isExpression = (value) => {
  return typeof value === 'string' && EXPRESSION_REX.test(value);
};

const isRichText = (value) => {
  return typeof value === 'string' && START_TAG_REX.test(value);
};

const isNormalText = (value) => {
  return (
    typeof value === 'string' && !isExpression(value) && !isRichText(value)
  );
};

const takeNumber = (value) => {
  const number_ = String(value).replace(/[^\d.]+/, '');
  if (number_ === '') return;
  return Number(number_);
};

export const ValueInput = createPolyInput([
  {
    type: 'TEXT',
    icon: 'Text',
    component: Input,
    checker: isNormalText,
  },
  {
    type: 'EXPRESSION',
    icon: 'Expression',
    component: (properties) => {
      return (
        <Popover
          content={
            <div
              style={{
                width: 400,
                height: 200,
                marginLeft: -16,
                marginRight: -16,
                marginBottom: -12,
              }}
            >
              <MonacoInput {...properties} language="javascript.expression" />
            </div>
          }
          trigger="click"
        >
          <Button block>
            <TextWidget token="SettingComponents.ValueInput.expression" />
          </Button>
        </Popover>
      );
    },
    checker: isExpression,
    toInputValue: (value) => {
      if (!value || value === '{{}}') return;
      const matched = String(value).match(EXPRESSION_REX);
      return matched?.[1] || value || '';
    },
    toChangeValue: (value) => {
      if (!value || value === '{{}}') return;
      const matched = String(value).match(EXPRESSION_REX);
      return `{{${matched?.[1] || value || ''}}}`;
    },
  },
  {
    type: 'BOOLEAN',
    icon: 'Boolean',
    component: (properties) => (
      <Select
        {...properties}
        options={[
          { label: 'True', value: true },
          { label: 'False', value: false },
        ]}
      />
    ),
    checker: isBoolean,
    toInputValue: (value) => {
      return !!value;
    },
    toChangeValue: (value) => {
      return !!value;
    },
  },
  {
    type: 'NUMBER',
    icon: 'Number',
    component: InputNumber,
    checker: isNumber,
    toInputValue: takeNumber,
    toChangeValue: takeNumber,
  },
]);
