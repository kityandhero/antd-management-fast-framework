import React from 'react';
import { createBehavior, createResource, TreeNode } from '@designable/core';
import { FormGrid as FormilyGird } from '@formily/antd-v5';
import { observer } from '@formily/reactive-react';

import {
  DroppableWidget,
  useNodeIdProperties,
  useTreeNode,
} from 'antd-management-fast-design-react';

import { LoadTemplate } from '../../common/LoadTemplate';
import { AllLocales } from '../../locales';
import { AllSchemas } from '../../schemas';
import { createFieldSchema } from '../Field';

import './styles.less';

export const FormGrid = observer((properties) => {
  const node = useTreeNode();
  const nodeId = useNodeIdProperties();

  if (node?.children.length === 0) {
    return <DroppableWidget {...properties} />;
  }

  // const totalColumns = node?.children.reduce(
  //   (buf, child) => buf + (child.props?.['x-component-props']?.gridSpan ?? 1),
  //   0,
  // );

  const key = Date.now();

  return (
    <div {...nodeId} className="dn-grid">
      <FormilyGird {...properties} key={key}>
        {properties.children}
      </FormilyGird>

      <LoadTemplate
        actions={[
          {
            title: node?.getMessage('addGridColumn'),
            icon: 'AddColumn',
            onClick: () => {
              const column = new TreeNode({
                componentName: 'Field',
                props: {
                  type: 'void',
                  'x-component': 'FormGrid.GridColumn',
                },
              });
              node?.append(column);
            },
          },
        ]}
      />
    </div>
  );
});

FormGrid.GridColumn = observer((properties) => {
  return (
    <DroppableWidget
      {...properties}
      data-span={properties.gridSpan}
      style={{
        ...properties['style'],
        gridColumnStart: `span ${properties.gridSpan || 1}`,
      }}
    >
      {properties.children}
    </DroppableWidget>
  );
});

FormGrid.Behavior = createBehavior(
  {
    name: 'FormGrid',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'FormGrid',
    designerProps: {
      droppable: true,
      allowDrop: (node) => node.props?.['x-component'] !== 'FormGrid',
      propsSchema: createFieldSchema(AllSchemas.FormGrid),
    },
    designerLocales: AllLocales.FormGrid,
  },
  {
    name: 'FormGrid.GridColumn',
    extends: ['Field'],
    selector: (node) => node.props?.['x-component'] === 'FormGrid.GridColumn',
    designerProps: {
      droppable: true,
      resizable: {
        width(node) {
          const span = Number(node.props?.['x-component-props']?.gridSpan ?? 1);
          return {
            plus: () => {
              if (span + 1 > 12) return;
              if (node.props) {
                node.props['x-component-props'] =
                  node.props['x-component-props'] || {};
                node.props['x-component-props'].gridSpan = span + 1;
              }
            },
            minus: () => {
              if (span - 1 < 1) return;
              if (node.props) {
                node.props['x-component-props'] =
                  node.props['x-component-props'] || {};
                node.props['x-component-props'].gridSpan = span - 1;
              }
            },
          };
        },
      },
      resizeXPath: 'x-component-props.gridSpan',
      resizeStep: 1,
      resizeMin: 1,
      resizeMax: 12,
      allowDrop: (node) => node.props?.['x-component'] === 'FormGrid',
      propsSchema: createFieldSchema(AllSchemas.FormGrid.GridColumn),
    },
    designerLocales: AllLocales.FormGridColumn,
  },
);

FormGrid.Resource = createResource({
  icon: 'GridSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'FormGrid',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'FormGrid.GridColumn',
          },
        },
      ],
    },
  ],
});
