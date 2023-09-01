import { TreeSelect } from 'antd';
import React from 'react';

import { useCurrentNode } from 'antd-management-fast-design-react';

const targetPath = (parentNode, targetNode) => {
  const path = [];

  const transform = (node) => {
    if (node && node !== parentNode) {
      path.push(node.props?.name || node.id);
    } else {
      transform(node.parent);
    }
  };

  transform(targetNode);

  return path.reverse().join('.');
};

const dots = (count) => {
  let dots = '';

  for (let index = 0; index < count; index++) {
    dots += '.';
  }

  return dots;
};

const transformDataSource = (node) => {
  const currentNode = node;

  const hasNoVoidChildren = (node) => {
    return node.children?.some((node) => {
      if (node.props?.type !== 'void' && node !== currentNode) {
        return true;
      }

      return hasNoVoidChildren(node);
    });
  };

  const findRoot = (node) => {
    if (!node?.parent) {
      return node;
    }

    if (node?.parent?.componentName !== node.componentName) {
      return node.parent;
    }

    return findRoot(node.parent);
  };

  const findArrayParent = (node) => {
    if (!node?.parent) {
      return;
    }

    if (node.parent.props?.type === 'array') {
      return node.parent;
    }

    if (node.parent === root) {
      return;
    }

    return findArrayParent(node.parent);
  };

  const transformRelativePath = (arrayNode, targetNode) => {
    if (targetNode.depth === currentNode.depth) {
      return `.${targetNode.props?.name || targetNode.id}`;
    }

    return `${dots(currentNode.depth - arrayNode.depth)}[].${targetPath(
      arrayNode,
      targetNode,
    )}`;
  };

  const transformChildren = (children, path = []) => {
    // eslint-disable-next-line unicorn/no-array-reduce
    return children.reduce((buf, node) => {
      if (node === currentNode) {
        return buf;
      }

      if (node.props?.type === 'array' && !node.contains(currentNode)) {
        return buf;
      }

      if (node.props?.type === 'void' && !hasNoVoidChildren(node)) {
        return buf;
      }

      const currentPath = [...path, node.props?.name || node.id];
      const arrayNode = findArrayParent(node);

      const label =
        node.props?.title ||
        node.props?.['x-component-props']?.title ||
        node.props?.name ||
        node.designerProps.title;

      const value = arrayNode
        ? transformRelativePath(arrayNode, node)
        : currentPath.join('.');

      return [
        ...buf,
        {
          label,
          value,
          node,
          children: transformChildren(node.children, currentPath),
        },
      ];
    }, []);
  };

  const root = findRoot(node);

  if (root) {
    return transformChildren(root.children);
  }

  return [];
};

export const PathSelector = (properties) => {
  const baseNode = useCurrentNode();
  const dataSource = transformDataSource(baseNode);

  const findNode = (dataSource, value) => {
    for (const item of dataSource) {
      if (item.value === value) {
        return item.node;
      }

      if (item.children?.length) {
        const fondedChild = findNode(item.children, value);

        if (fondedChild) {
          return fondedChild;
        }
      }
    }
  };

  return (
    <TreeSelect
      {...properties}
      onChange={(value) => {
        properties?.onChange &&
          properties.onChange(value, findNode(dataSource, value));
      }}
      treeDefaultExpandAll
      treeData={dataSource}
    />
  );
};
