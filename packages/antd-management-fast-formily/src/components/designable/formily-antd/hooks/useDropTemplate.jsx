import { AppendNodeEvent } from '@designable/core';

import { useDesigner } from 'antd-management-fast-design-react';

import { matchChildComponent, matchComponent } from '../shared';

export const useDropTemplate = (
  name,
  // eslint-disable-next-line no-unused-vars
  getChildren = (source) => {
    return [];
  },
) => {
  return useDesigner((designer) => {
    return designer.subscribeTo(AppendNodeEvent, (event) => {
      const { source, target } = event.data;
      if (Array.isArray(target)) return;
      if (!Array.isArray(source)) return;
      if (
        matchComponent(
          target,
          (key) =>
            key === name &&
            source.every((child) => !matchChildComponent(child, name)),
        ) &&
        target.children.length === 0
      ) {
        target.setChildren(...getChildren(source));
        return false;
      }
    });
  });
};
