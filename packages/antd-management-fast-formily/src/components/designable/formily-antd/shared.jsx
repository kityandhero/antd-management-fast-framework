import { TreeNode } from '@designable/core';

export const matchComponent = (node, name, context = null) => {
  if (name === '*') {
    return true;
  }

  const componentName = node?.props?.['x-component'];

  if (typeof name === 'function') {
    return name(componentName || '', node, context);
  }

  if (Array.isArray(name)) {
    return name.includes(componentName);
  }

  return componentName === name;
};

export const matchChildComponent = (node, name, context = null) => {
  if (name === '*') {
    return true;
  }

  const componentName = node?.props?.['x-component'];

  if (!componentName) {
    return false;
  }

  if (typeof name === 'function') {
    return name(componentName || '', node, context);
  }

  if (Array.isArray(name)) {
    return name.includes(componentName);
  }

  return componentName.includes(`${name}.`);
};

export const includesComponent = (node, names = [], target = null) => {
  return names.some((name) => matchComponent(node, name, target));
};

export const queryNodesByComponentPath = (node, path = []) => {
  if (path?.length === 0) {
    return [];
  }

  if (path?.length === 1 && node && matchComponent(node, path[0])) {
    return [node];
  }

  return matchComponent(node, path[0])
    ? // eslint-disable-next-line unicorn/no-array-reduce
      node?.children.reduce((buf, child) => {
        return [...buf, ...queryNodesByComponentPath(child, path.slice(1))];
      }, [])
    : [];
};

export const findNodeByComponentPath = (node, path = []) => {
  if (path?.length === 0) {
    return;
  }

  if (path?.length === 1 && matchComponent(node, path[0])) {
    return node;
  }

  if (matchComponent(node, path[0])) {
    for (let index = 0; index < (node?.children?.length || 0); index++) {
      const next = findNodeByComponentPath(
        node?.children[index],
        path.slice(1),
      );

      if (next) {
        return next;
      }
    }
  }
};

export const hasNodeByComponentPath = (node, path = []) =>
  !!findNodeByComponentPath(node, path);

export const matchArrayItemsNode = (node) => {
  return (
    node?.parent?.props?.type === 'array' &&
    node?.parent?.children?.[0] === node
  );
};

export const createNodeId = (designer, id) => {
  return {
    [designer.props.nodeIdAttrName]: id,
  };
};

export const createEnsureTypeItemsNode =
  (type) =>
  (node = null) => {
    const objectNode = node?.children.find(
      (child) => child.props?.['type'] === type,
    );

    if (objectNode) {
      return objectNode;
    } else {
      const newObjectNode = new TreeNode({
        componentName: 'Field',
        props: {
          type,
        },
      });

      node?.prepend(newObjectNode);

      return newObjectNode;
    }
  };
