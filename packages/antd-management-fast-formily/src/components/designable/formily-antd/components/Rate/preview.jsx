import { Rate as AntdRate } from 'antd';
import { createBehavior, createResource } from '@designable/core';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const Rate = AntdRate;

Rate.Behavior = createBehavior({
  name: 'Rate',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Rate',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Rate),
  },
  designerLocales: AllLocales.Rate,
});

Rate.Resource = createResource({
  icon: 'RateSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'number',
        title: 'Rate',
        'x-decorator': 'FormItem',
        'x-component': 'Rate',
      },
    },
  ],
});
