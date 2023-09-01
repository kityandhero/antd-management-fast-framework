import { createBehavior, createResource } from '@designable/core';

import { Container } from '../../common/Container';
import { AllLocales } from '../../locales';
import { createFieldSchema } from '../Field';

export const ObjectContainer = Container;

ObjectContainer.Behavior = createBehavior({
  name: 'Object',
  extends: ['Field'],
  selector: (node) => node.props?.type === 'object',
  designerProps: {
    droppable: true,
    propsSchema: createFieldSchema(),
  },
  designerLocales: AllLocales.ObjectLocale,
});

ObjectContainer.Resource = createResource({
  icon: 'ObjectSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
      },
    },
  ],
});
