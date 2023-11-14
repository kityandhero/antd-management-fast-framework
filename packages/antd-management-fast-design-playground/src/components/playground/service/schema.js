import { showSimpleSuccessMessage } from 'easy-soft-utility';

import {
  transformToSchema,
  transformToTreeNode,
} from 'antd-management-fast-design-react';

export const schemaLocalKey = 'amf-design-formily-schema';

export const saveSchemaToLocal = (designer, promptMessage = true) => {
  localStorage.setItem(
    schemaLocalKey,
    JSON.stringify(transformToSchema(designer.getCurrentTree())),
  );

  if (promptMessage) {
    showSimpleSuccessMessage('暂存成功');
  }
};

export const loadInitialSchema = (designer) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem(schemaLocalKey))),
    );
  } catch {
    // ignored
  }
};
