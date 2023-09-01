import { Tabs } from 'antd';
import React, { Fragment, useState } from 'react';
import { createBehavior, createResource, TreeNode } from '@designable/core';
import { observer } from '@formily/react';

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

const parseTabs = (parent) => {
  const tabs = [];

  const { children } = parent;

  for (const node of children) {
    if (matchComponent(node, 'FormTab.TabPane')) {
      tabs.push(node);
    }
  }

  return tabs;
};

const getCorrectActiveKey = (activeKey, tabs) => {
  if (tabs.length === 0) {
    return;
  }

  if (tabs.some((node) => node.id === activeKey)) {
    return activeKey;
  }

  return tabs.at(-1).id;
};

export const FormTab = observer((properties) => {
  const [activeKey, setActiveKey] = useState();
  const nodeId = useNodeIdProperties();
  const node = useTreeNode();

  const designer = useDropTemplate('FormTab', (source) => {
    return [
      new TreeNode({
        componentName: 'Field',
        props: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: `Unnamed Title`,
          },
        },
        children: source,
      }),
    ];
  });

  const tabs = parseTabs(node);

  const renderTabs = () => {
    if (!node?.children?.length) {
      return <DroppableWidget />;
    }

    return (
      <Tabs
        {...properties}
        activeKey={getCorrectActiveKey(activeKey, tabs)}
        onChange={(id) => {
          setActiveKey(id);
        }}
      >
        {tabs.map((tab) => {
          const properties = tab.props?.['x-component-props'] || {};
          return (
            <Tabs.TabPane
              {...properties}
              style={{ ...properties.style }}
              tab={
                <span
                  data-content-editable="x-component-props.tab"
                  data-content-editable-node-id={tab.id}
                >
                  {properties.tab}
                </span>
              }
              key={tab.id}
            >
              {React.createElement(
                'div',
                {
                  [designer.props.nodeIdAttrName]: tab.id,
                  style: {
                    padding: '20px 0',
                  },
                },
                tab.children.length > 0 ? (
                  <TreeNodeWidget node={tab} />
                ) : (
                  <DroppableWidget node={tab} />
                ),
              )}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    );
  };
  return (
    <div {...nodeId}>
      {renderTabs()}
      <LoadTemplate
        actions={[
          {
            title: node?.getMessage('addTabPane'),
            icon: 'AddPanel',
            onClick: () => {
              const tabPane = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'FormTab.TabPane',
                  'x-component-props': {
                    tab: `Unnamed Title`,
                  },
                },
              });
              node?.append(tabPane);
              setActiveKey(tabPane.id);
            },
          },
        ]}
      />
    </div>
  );
});

function buildTabPane(properties) {
  return <Fragment>{properties.children}</Fragment>;
}

FormTab.TabPane = buildTabPane;

FormTab.Behavior = createBehavior(
  {
    name: 'FormTab',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'FormTab',
    designerProps: {
      droppable: true,
      allowAppend: (target, source) =>
        target.children.length === 0 ||
        source?.every(
          (node) => node.props?.['x-component'] === 'FormTab.TabPane',
        ),
      propsSchema: createVoidFieldSchema(AllSchemas.FormTab),
    },
    designerLocales: AllLocales.FormTab,
  },
  {
    name: 'FormTab.TabPane',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'FormTab.TabPane',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props?.['x-component'] === 'FormTab',
      propsSchema: createVoidFieldSchema(AllSchemas.FormTab.TabPane),
    },
    designerLocales: AllLocales.FormTabPane,
  },
);

FormTab.Resource = createResource({
  icon: 'TabSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormTab',
      },
    },
  ],
});
