import { Card as AntdCard } from 'antd';
import React from 'react';
import { createBehavior, createResource } from '@designable/core';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createVoidFieldSchema } from '../Field';

export const Card = (properties) => {
  return (
    <AntdCard
      {...properties}
      title={
        <span data-content-editable="x-component-props.title">
          {properties.title}
        </span>
      }
    >
      {properties.children}
    </AntdCard>
  );
};

Card.Behavior = createBehavior({
  name: 'Card',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Card',
  designerProps: {
    droppable: true,
    propsSchema: createVoidFieldSchema(AllSchemas.Card),
  },
  designerLocales: AllLocales.Card,
});

Card.Resource = createResource({
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'Card',
        'x-component-props': {
          title: 'Title',
        },
      },
    },
  ],
});
