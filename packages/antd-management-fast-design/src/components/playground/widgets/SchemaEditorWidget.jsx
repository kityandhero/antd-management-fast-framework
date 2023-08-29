import React from 'react';

import { MonacoInput } from '../../designable/react-settings-form';
import {
  transformToSchema,
  transformToTreeNode,
} from '../../designable/tools/transformer';

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
