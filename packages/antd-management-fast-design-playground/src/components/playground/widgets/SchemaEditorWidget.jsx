import React from 'react';

import {
  MonacoInput,
  transformToSchema,
  transformToTreeNode,
} from 'antd-management-fast-design-react';

export const SchemaEditorWidget = (properties) => {
  return (
    <MonacoInput
      {...properties}
      value={JSON.stringify(transformToSchema(properties.tree), null, 2)}
      onChange={(value) => {
        properties.onChange?.(transformToTreeNode(JSON.parse(value)));
      }}
      language="json"
    />
  );
};
