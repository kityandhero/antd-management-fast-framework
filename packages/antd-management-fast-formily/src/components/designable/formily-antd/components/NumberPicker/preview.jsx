import { createBehavior, createResource } from '@designable/core';
import { NumberPicker as FormilyNumberPicker } from '@formily/antd-v5';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const NumberPicker = FormilyNumberPicker;

NumberPicker.Behavior = createBehavior({
  name: 'NumberPicker',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'NumberPicker',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.NumberPicker),
  },
  designerLocales: AllLocales.NumberPicker,
});

NumberPicker.Resource = createResource({
  icon: 'NumberPickerSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'NumberPicker',
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
    },
  ],
});
