import { Card, Rate, Slider } from 'antd';
import React, { useMemo } from 'react';
import {
  ArrayCards,
  ArrayTable,
  Cascader,
  Checkbox,
  DatePicker,
  Editable,
  Form,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';

import { transformToSchema } from 'antd-management-fast-design-react';
import { FileUpload } from 'antd-management-fast-formily';

const Text = ({ value, mode, content, ...properties }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, properties, value || content);
};

const SchemaField = createSchemaField({
  components: {
    ArrayCards,
    ArrayTable,
    Card,
    Cascader,
    Checkbox,
    DatePicker,
    Editable,
    FileUpload,
    FormCollapse,
    FormGrid,
    FormItem,
    FormLayout,
    FormTab,
    Input,
    NumberPicker,
    Password,
    PreviewText,
    Radio,
    Rate,
    Reset,
    Select,
    Slider,
    Space,
    Submit,
    Switch,
    Text,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
  },
});

export const PreviewWidget = (properties) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProperties, schema } = transformToSchema(properties.tree);

  return (
    <Form {...formProperties} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
