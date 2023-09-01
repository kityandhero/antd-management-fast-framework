import cls from 'classnames';
import React, { Fragment, useEffect } from 'react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/reactive-react';

import { DesignerComponentsContext, TreeNodeContext } from '../../context';
import { useComponents, useDesigner, usePrefix, useTree } from '../../hooks';

import './styles.less';

export const TreeNodeWidget = observer((properties) => {
  const designer = useDesigner(properties.node?.designerProps?.effects);
  const components = useComponents();
  const node = properties.node;
  const renderChildren = () => {
    if (node?.designerProps?.selfRenderChildren) return [];
    return node?.children?.map((child) => {
      return <TreeNodeWidget key={child.id} node={child} />;
    });
  };
  const renderProperties = (extendsProperties = {}) => {
    const properties_ = {
      ...node.designerProps?.defaultProps,
      ...extendsProperties,
      ...node.props,
      ...node.designerProps?.getComponentProps?.(node),
    };
    if (node.depth === 0) {
      delete properties_.style;
    }
    return properties_;
  };

  const renderComponent = () => {
    const componentName = node.componentName;
    const Component = components[componentName];
    const dataId = {};
    if (Component) {
      if (designer) {
        dataId[designer?.props?.nodeIdAttrName] = node.id;
      }
      return React.createElement(
        Component,
        renderProperties(dataId),
        ...renderChildren(),
      );
    } else {
      if (node?.children?.length) {
        return <Fragment>{renderChildren()}</Fragment>;
      }
    }
  };

  if (!node) return null;
  if (node.hidden) return null;
  return React.createElement(
    TreeNodeContext.Provider,
    { value: node },
    renderComponent(),
  );
});

export const ComponentTreeWidget = observer((properties) => {
  const tree = useTree();
  const prefix = usePrefix('component-tree');
  const designer = useDesigner();
  const dataId = {};
  if (designer && tree) {
    dataId[designer?.props?.nodeIdAttrName] = tree.id;
  }
  useEffect(() => {
    GlobalRegistry.registerDesignerBehaviors(properties.components);
  }, [properties.components]);
  return (
    <div
      style={{ ...properties.style, ...tree?.props?.style }}
      className={cls(prefix, properties.className)}
      {...dataId}
    >
      <DesignerComponentsContext.Provider value={properties.components}>
        <TreeNodeWidget node={tree} />
      </DesignerComponentsContext.Provider>
    </div>
  );
});

ComponentTreeWidget.displayName = 'ComponentTreeWidget';
