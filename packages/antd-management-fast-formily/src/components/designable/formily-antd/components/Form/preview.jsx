import React, { useMemo } from 'react';
import { createBehavior, createResource } from '@designable/core';
import { Form as FormilyForm } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { observer } from '@formily/react';

import { usePrefix } from 'antd-management-fast-design-react';

import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';

import './styles.less';

export const Form = observer((properties) => {
  const prefix = usePrefix('designable-form');

  const form = useMemo(
    () =>
      createForm({
        designable: true,
      }),
    [],
  );

  return (
    <FormilyForm
      {...properties}
      style={{ ...properties.style }}
      className={prefix}
      form={form}
    >
      {properties.children}
    </FormilyForm>
  );
});

Form.Behavior = createBehavior({
  name: 'Form',
  selector: (node) => node.componentName === 'Form',
  designerProps(node) {
    return {
      draggable: !node.isRoot,
      cloneable: !node.isRoot,
      deletable: !node.isRoot,
      droppable: true,
      propsSchema: {
        type: 'object',
        properties: {
          ...AllSchemas.FormLayout.properties,
          style: AllSchemas.CSSStyle,
        },
      },
      defaultProps: {
        labelCol: 6,
        wrapperCol: 12,
      },
    };
  },
  designerLocales: AllLocales.Form,
});

Form.Resource = createResource({
  title: { 'zh-CN': '表单', 'en-US': 'Form' },
  icon: 'FormLayoutSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'Form',
      },
    },
  ],
});
