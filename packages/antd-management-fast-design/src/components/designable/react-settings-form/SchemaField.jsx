import { Slider } from 'antd';
import {
  ArrayItems,
  ArrayTable,
  DatePicker,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Radio,
  Select,
  Space,
  Switch,
  TimePicker,
} from '@formily/antd-v5';
import { createSchemaField } from '@formily/react';

import {
  BackgroundImageInput,
  BackgroundStyleSetter,
  BorderRadiusStyleSetter,
  BorderStyleSetter,
  BoxShadowStyleSetter,
  BoxStyleSetter,
  CollapseItem,
  ColorInput,
  CornerInput,
  DisplayStyleSetter,
  DrawerSetter,
  FlexStyleSetter,
  FontStyleSetter,
  ImageInput,
  MonacoInput,
  PositionInput,
  SizeInput,
  ValueInput,
} from './components';

export const SchemaField = createSchemaField({
  components: {
    FormItem,
    CollapseItem,
    Input,
    ValueInput,
    SizeInput,
    ColorInput,
    ImageInput,
    MonacoInput,
    PositionInput,
    CornerInput,
    BackgroundImageInput,
    BackgroundStyleSetter,
    BoxStyleSetter,
    BorderStyleSetter,
    BorderRadiusStyleSetter,
    DisplayStyleSetter,
    BoxShadowStyleSetter,
    FlexStyleSetter,
    FontStyleSetter,
    DrawerSetter,
    NumberPicker,
    DatePicker,
    TimePicker,
    Select,
    Radio,
    Slider,
    Switch,
    Space,
    ArrayItems,
    ArrayTable,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormTab,
  },
});
