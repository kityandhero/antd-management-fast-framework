import { createBehavior, createResource } from '@designable/core';
import { Password as FormilyPassword } from '@formily/antd-v5';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const Password = FormilyPassword;

Password.Behavior = createBehavior({
  name: 'Password',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Password',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.Password),
  },
  designerLocales: AllLocales.Password,
});

Password.Resource = createResource({
  icon: 'PasswordSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Password',
        'x-decorator': 'FormItem',
        'x-component': 'Password',
      },
    },
  ],
});
