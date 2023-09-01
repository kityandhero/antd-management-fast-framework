import { createBehavior, createResource } from '@designable/core';
import { Transfer as FormilyTransfer } from '@formily/antd-v5';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const Transfer = FormilyTransfer;

Transfer.Behavior = createBehavior({
  name: 'Transfer',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Transfer',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Transfer),
  },
  designerLocales: AllLocales.Transfer,
});

Transfer.Resource = createResource({
  icon: 'TransferSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Transfer',
        'x-decorator': 'FormItem',
        'x-component': 'Transfer',
      },
    },
  ],
});
