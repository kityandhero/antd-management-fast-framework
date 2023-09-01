import { clone, uid } from '@designable/shared';
import { Schema } from '@formily/json-schema';

import { isFunction } from 'easy-soft-utility';

const createOptions = (options = {}) => {
  return {
    designableFieldName: 'Field',
    designableFormName: 'Form',
    ...options,
  };
};

const findNode = (
  node,
  // eslint-disable-next-line no-unused-vars
  finder = (o) => {
    return false;
  },
) => {
  if (!node) {
    return;
  }

  if (finder && isFunction(finder) && finder(node)) {
    return node;
  }

  if (!node.children) {
    return;
  }

  for (let index = 0; index < node.children.length; index++) {
    if (findNode(node.children[index])) {
      return node.children[index];
    }
  }

  return;
};

const cleanProperties = (properties) => {
  if (properties['name'] === properties['x-designable-id']) {
    delete properties.name;
  }

  delete properties['version'];
  delete properties['_isJSONSchemaObject'];

  return properties;
};

export const transformToSchema = (node, options = {}) => {
  const realOptions = createOptions(options);
  const root = findNode(node, (child) => {
    return child.componentName === realOptions.designableFormName;
  });

  const schema = {
    type: 'object',
    properties: {},
  };

  if (!root) return { schema };

  const createSchema = (nodeSource, schema = {}) => {
    if (nodeSource !== root) {
      Object.assign(schema, clone(nodeSource.props));
    }

    schema['x-designable-id'] = nodeSource.id;

    if (schema.type === 'array') {
      if (
        nodeSource.children?.[0] &&
        nodeSource.children[0].componentName === realOptions.designableFieldName
      ) {
        schema.items = createSchema(nodeSource.children[0]);
        schema['x-index'] = 0;
      }

      const children =
        nodeSource.children && nodeSource.children.length > 0
          ? nodeSource.children.slice(1).entries()
          : [];

      for (const [index, child] of children) {
        if (child.componentName !== realOptions.designableFieldName) {
          continue;
        }

        const key = child.props?.name || child.id;

        schema.properties = schema.properties || {};
        schema.properties[key] = createSchema(child);
        schema.properties[key]['x-index'] = index;
      }
    } else {
      if (nodeSource.children) {
        for (const [index, child] of nodeSource.children.entries()) {
          if (child.componentName !== realOptions.designableFieldName) {
            continue;
          }
          const key = child.props?.name || child.id;

          schema.properties = schema.properties || {};
          schema.properties[key] = createSchema(child);
          schema.properties[key]['x-index'] = index;
        }
      }
    }

    return schema;
  };

  return { form: clone(root.props), schema: createSchema(root, schema) };
};

export const transformToTreeNode = (formily = {}, options = null) => {
  const realOptions = createOptions(options);

  const root = {
    componentName: realOptions.designableFormName,
    props: formily.form,
    children: [],
  };

  const schema = new Schema(formily.schema);

  const appendTreeNode = (parent, schema) => {
    if (!schema) {
      return;
    }

    const current = {
      id: schema['x-designable-id'] || uid(),
      componentName: realOptions.designableFieldName,
      props: cleanProperties(schema.toJSON(false)),
      children: [],
    };

    parent.children?.push(current);

    if (schema.items && !Array.isArray(schema.items)) {
      appendTreeNode(current, schema.items);
    }

    schema.mapProperties((schema) => {
      schema['x-designable-id'] = schema['x-designable-id'] || uid();

      appendTreeNode(current, schema);
    });
  };

  schema.mapProperties((schema) => {
    schema['x-designable-id'] = schema['x-designable-id'] || uid();

    appendTreeNode(root, schema);
  });

  return root;
};
