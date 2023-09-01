import React from 'react';
import { createBehavior } from '@designable/core';
import { isArr, isStr } from '@designable/shared';
import { FormItem } from '@formily/antd-v5';
import { FormPath } from '@formily/core';
import {
  ArrayField,
  Field as InternalField,
  ObjectField,
  observer,
  Schema,
  VoidField,
} from '@formily/react';
import { toJS } from '@formily/reactive';
import { each, reduce } from '@formily/shared';

import {
  useComponents,
  useDesigner,
  useTreeNode,
} from 'antd-management-fast-design-react';

import { Container } from '../../common/Container';
import { AllLocales } from '../../locales';

Schema.silent(true);

const SchemaStateMap = {
  title: 'title',
  description: 'description',
  default: 'value',
  enum: 'dataSource',
  readOnly: 'readOnly',
  writeOnly: 'editable',
  required: 'required',
  'x-content': 'content',
  'x-value': 'value',
  'x-editable': 'editable',
  'x-disabled': 'disabled',
  'x-read-pretty': 'readPretty',
  'x-read-only': 'readOnly',
  'x-visible': 'visible',
  'x-hidden': 'hidden',
  'x-display': 'display',
  'x-pattern': 'pattern',
};

const NeedShownExpression = {
  title: true,
  description: true,
  default: true,
  'x-content': true,
  'x-value': true,
};

const isExpression = (value) => isStr(value) && /^{{.*}}$/.test(value);

const filterExpression = (value) => {
  if (typeof value === 'object') {
    const isArray = isArr(value);

    const results = reduce(
      value,
      (buf, value, key) => {
        if (isExpression(value)) {
          return buf;
        } else {
          const results = filterExpression(value);

          if (results === undefined || results === null) {
            return buf;
          }

          if (isArray) {
            return [...buf, results];
          }

          buf[key] = results;

          return buf;
        }
      },
      isArray ? [] : {},
    );

    return results;
  }

  if (isExpression(value)) {
    return;
  }

  return value;
};

const toDesignableFieldProperties = (
  schema,
  components,
  nodeIdAttributeName,
  id,
) => {
  const results = {};

  each(SchemaStateMap, (fieldKey, schemaKey) => {
    const value = schema[schemaKey];

    if (isExpression(value)) {
      if (!NeedShownExpression[schemaKey]) {
        return;
      }

      if (value) {
        results[fieldKey] = value;

        return;
      }
    } else if (value) {
      results[fieldKey] = filterExpression(value);
    }
  });

  if (!components['FormItem']) {
    components['FormItem'] = FormItem;
  }

  const decorator =
    schema['x-decorator'] && FormPath.getIn(components, schema['x-decorator']);
  const component =
    schema['x-component'] && FormPath.getIn(components, schema['x-component']);
  const decoratorProperties = schema['x-decorator-props'] || {};
  const componentProperties = schema['x-component-props'] || {};

  if (decorator) {
    results.decorator = [decorator, toJS(decoratorProperties)];
  }

  if (component) {
    results.component = [component, toJS(componentProperties)];
  }

  if (decorator) {
    FormPath.setIn(results['decorator'][1], nodeIdAttributeName, id);
  } else if (component) {
    FormPath.setIn(results['component'][1], nodeIdAttributeName, id);
  }

  results.title = results.title && (
    <span data-content-editable="title">{results.title}</span>
  );

  results.description = results.description && (
    <span data-content-editable="description">{results.description}</span>
  );

  return results;
};

export const Field = observer((properties) => {
  const designer = useDesigner();
  const components = useComponents();
  const node = useTreeNode();

  if (!node) {
    return null;
  }

  const fieldProperties = toDesignableFieldProperties(
    properties,
    components,
    designer.props.nodeIdAttrName,
    node.id,
  );

  if (properties.type === 'object') {
    return (
      <Container>
        <ObjectField {...fieldProperties} name={node.id}>
          {properties.children}
        </ObjectField>
      </Container>
    );
  } else if (properties.type === 'array') {
    return <ArrayField {...fieldProperties} name={node.id} />;
  } else if (node.props?.type === 'void') {
    return (
      <VoidField {...fieldProperties} name={node.id}>
        {properties.children}
      </VoidField>
    );
  }

  return <InternalField {...fieldProperties} name={node.id} />;
});

Field.Behavior = createBehavior({
  name: 'Field',
  selector: 'Field',
  designerLocales: AllLocales.Field,
});
