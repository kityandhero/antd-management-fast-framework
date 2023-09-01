import { createBehavior, createResource } from '@designable/core';
import { TreeSelect as FormilyTreeSelect } from '@formily/antd-v5';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const TreeSelect = FormilyTreeSelect;

TreeSelect.Behavior = createBehavior({
  name: 'TreeSelect',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'TreeSelect',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.TreeSelect),
  },
  designerLocales: AllLocales.TreeSelect,
});

TreeSelect.Resource = createResource({
  icon: 'TreeSelectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'TreeSelect',
        'x-decorator': 'FormItem',
        'x-component': 'TreeSelect',
      },
    },
  ],
});
