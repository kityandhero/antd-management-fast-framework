import { message } from 'antd';

import {
  transformToSchema,
  transformToTreeNode,
} from '../../designable/tools/transformer';

export const saveSchema = (designer) => {
  localStorage.setItem(
    'formily-schema',
    JSON.stringify(transformToSchema(designer.getCurrentTree())),
  );
  message.success('Save Success');
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
