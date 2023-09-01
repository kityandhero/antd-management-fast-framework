import { showSimpleSuccessMessage } from 'easy-soft-utility';

import {
  transformToSchema,
  transformToTreeNode,
} from 'antd-management-fast-design-react';

export const saveSchema = (designer, promptMessage = true) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree())),
  );

  if (promptMessage) {
    showSimpleSuccessMessage('暂存成功');
  }
};

export const loadInitialSchema = (designer) => {
  try {
    designer.setCurrentTree(
      transformToTreeNode(JSON.parse(localStorage.getItem('formily-schema'))),
    );
  } catch {
    // ignored
  }
};
