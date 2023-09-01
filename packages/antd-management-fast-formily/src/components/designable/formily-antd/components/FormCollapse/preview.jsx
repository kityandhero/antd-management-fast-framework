import { Collapse } from 'antd';
import React, { Fragment, useState } from 'react';
import { createBehavior, createResource, TreeNode } from '@designable/core';
import { observer } from '@formily/react';
import { toArr } from '@formily/shared';

import {
  DroppableWidget,
  TreeNodeWidget,
  useNodeIdProperties,
  useTreeNode,
} from 'antd-management-fast-design-react';

import { LoadTemplate } from '../../common/LoadTemplate';
import { useDropTemplate } from '../../hooks';
import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { matchComponent } from '../../shared';
import { createVoidFieldSchema } from '../Field';

const parseCollapse = (parent) => {
  const tabs = [];

  const { children } = parent;

  for (const node of children) {
    if (matchComponent(node, 'FormCollapse.CollapsePanel')) {
      tabs.push(node);
    }
  }

  return tabs;
};

export const FormCollapse = observer((properties) => {
  const [activeKey, setActiveKey] = useState([]);
  const node = useTreeNode();
  const nodeId = useNodeIdProperties();

  const designer = useDropTemplate('FormCollapse', (source) => {
    const panelNode = new TreeNode({
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: `Unnamed Title`,
        },
      },
      children: source,
    });

    setActiveKey([...toArr(activeKey), panelNode.id]);

    return [panelNode];
  });
  const getCorrectActiveKey = (activeKey, tabs) => {
    if (tabs.length === 0 || !activeKey?.length) {
      if (properties.accordion) {
        return tabs[0]?.id;
      }

      return tabs.map((item) => item.id);
    }

    if (
      tabs.some((node) =>
        Array.isArray(activeKey)
          ? activeKey.includes(node.id)
          : node.id === activeKey,
      )
    ) {
      return activeKey;
    }

    return tabs.at(-1).id;
  };

  const panels = parseCollapse(node);

  const renderCollapse = () => {
    if (!node?.children?.length) {
      return <DroppableWidget />;
    }

    return (
      <Collapse
        {...properties}
        activeKey={getCorrectActiveKey(activeKey, panels)}
      >
        {panels.map((panel) => {
          const properties = panel.props?.['x-component-props'] || {};

          return (
            <Collapse.Panel
              {...properties}
              style={{ ...properties.style }}
              header={
                <span
                  data-content-editable="x-component-props.header"
                  data-content-editable-node-id={panel.id}
                >
                  {properties.header}
                </span>
              }
              key={panel.id}
            >
              {React.createElement(
                'div',
                {
                  [designer.props.nodeIdAttrName]: panel.id,
                  style: {
                    padding: '20px 0',
                  },
                },
                panel.children.length > 0 ? (
                  <TreeNodeWidget node={panel} />
                ) : (
                  <DroppableWidget />
                ),
              )}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    );
  };

  return (
    <div {...nodeId}>
      {renderCollapse()}

      <LoadTemplate
        actions={[
          {
            title: node?.getMessage('addCollapsePanel'),
            icon: 'AddPanel',
            onClick: () => {
              const tabPane = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'FormCollapse.CollapsePanel',
                  'x-component-props': {
                    header: `Unnamed Title`,
                  },
                },
              });
              node?.append(tabPane);
              const keys = toArr(activeKey);
              setActiveKey([...keys, tabPane.id]);
            },
          },
        ]}
      />
    </div>
  );
});

function buildCollapsePanel(properties) {
  return <Fragment>{properties.children}</Fragment>;
}

FormCollapse.CollapsePanel = buildCollapsePanel;

FormCollapse.Behavior = createBehavior(
  {
    name: 'FormCollapse',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'FormCollapse',
    designerProps: {
      droppable: true,
      allowAppend: (target, source) =>
        target.children.length === 0 ||
        source?.every(
          (node) =>
            node.props?.['x-component'] === 'FormCollapse.CollapsePanel',
        ),
      propsSchema: createVoidFieldSchema(AllSchemas.FormCollapse),
    },
    designerLocales: AllLocales.FormCollapse,
  },
  {
    name: 'FormCollapse.CollapsePanel',
    extends: ['Field'],
    selector: (node) =>
      node.props?.['x-component'] === 'FormCollapse.CollapsePanel',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props?.['x-component'] === 'FormCollapse',
      propsSchema: createVoidFieldSchema(AllSchemas.FormCollapse.CollapsePanel),
    },
    designerLocales: AllLocales.FormCollapsePanel,
  },
);

FormCollapse.Resource = createResource({
  icon: 'CollapseSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormCollapse',
      },
    },
  ],
});
