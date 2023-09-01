import cls from 'classnames';
import React from 'react';
import { createBehavior, createResource } from '@designable/core';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createVoidFieldSchema } from '../Field';

import './styles.less';

export const Text = (properties) => {
  const tagName =
    properties.mode === 'normal' || !properties.mode ? 'div' : properties.mode;
  return React.createElement(
    tagName,
    {
      ...properties,
      className: cls(properties.className, 'dn-text'),
      'data-content-editable': 'x-component-props.content',
    },
    properties.content,
  );
};

Text.Behavior = createBehavior({
  name: 'Text',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Text',
  designerProps: {
    propsSchema: createVoidFieldSchema(AllSchemas.Text),
  },
  designerLocales: AllLocales.Text,
});

Text.Resource = createResource({
  icon: 'TextSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'string',
        'x-component': 'Text',
      },
    },
  ],
});
