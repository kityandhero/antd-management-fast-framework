import { Slider as AntdSlider } from 'antd';
import { createBehavior, createResource } from '@designable/core';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const Slider = AntdSlider;

Slider.Behavior = createBehavior({
  name: 'Slider',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Slider',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Slider),
  },
  designerLocales: AllLocales.Slider,
});

Slider.Resource = createResource({
  icon: 'SliderSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'Slider',
        'x-decorator': 'FormItem',
        'x-component': 'Slider',
      },
    },
  ],
});
