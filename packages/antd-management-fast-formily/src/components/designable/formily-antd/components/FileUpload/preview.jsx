import React from 'react';
import { createBehavior, createResource } from '@designable/core';
import { connect, mapProps } from '@formily/react';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

export const FileUpload = connect(
  (properties) => {
    return <div {...properties}>111</div>;
  },
  mapProps({
    value: 'fileList',
  }),
);

FileUpload.Behavior = createBehavior({
  name: 'FileUpload',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'FileUpload',
  designerProps: {
    propsSchema: createFieldSchema(AllSchemas.FileUpload),
  },
  designerLocales: AllLocales.FileUpload,
});

FileUpload.Resource = createResource({
  icon: 'FileUploadSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'Array<object>',
        title: 'File Upload',
        'x-decorator': 'FormItem',
        'x-component': 'FileUpload',
        'x-component-props': {
          textContent: 'FileUpload',
        },
      },
    },
  ],
});
