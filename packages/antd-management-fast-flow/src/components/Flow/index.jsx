import React, { useEffect } from 'react';
import ReactFlow, {
  // eslint-disable-next-line import/named
  Background,
  // eslint-disable-next-line import/named
  Controls,
  // eslint-disable-next-line import/named
  MiniMap,
  // eslint-disable-next-line import/named
  Panel,
  // eslint-disable-next-line import/named
  useEdgesState,
  // eslint-disable-next-line import/named
  useNodesState,
} from 'reactflow';

import { isArray, isFunction } from 'easy-soft-utility';

import { edgeTypes, nodeTypes } from './definition';
import { GraphicDescription } from './GraphicDescription';
import { GraphicHelper } from './GraphicHelper';

import './index.less';
import 'reactflow/dist/style.css';

let dragStartPosition = {};

function Flow(properties) {
  const {
    canEdit,
    multibranch,
    nodeNameKey,
    listInLineKey,
    listOutLineKey,
    listApproverKey,
    approverNameKey,
    approverNameLabel,
    nodes: sourceNodes,
    edges: sourceEdges,
    updateViewConfig,
    onEdgeCreate,
  } = properties;

  const sourceAdjustedNodes = isArray(sourceNodes) ? sourceNodes : [];
  const sourceAdjustedEdges = isArray(sourceEdges) ? sourceEdges : [];

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    setNodes(sourceAdjustedNodes);

    setEdges(sourceAdjustedEdges);
  }, [sourceAdjustedNodes, sourceAdjustedEdges]);

  const nodeWithEditOption = nodes.map((o) => {
    o.data.canEdit = canEdit || false;
    o.data.multibranch = multibranch || false;
    o.data.nodeNameKey = nodeNameKey;
    o.data.listInLineKey = listInLineKey;
    o.data.listOutLineKey = listOutLineKey;
    o.data.listApproverKey = listApproverKey;
    o.data.approverNameKey = approverNameKey;
    o.data.approverNameLabel = approverNameLabel;

    return o;
  });

  const edgeWithEditOption = edges.map((o) => {
    o.data.canEdit = canEdit || false;
    o.data.multibranch = multibranch || false;

    return o;
  });

  return (
    <ReactFlow
      fitView
      nodes={nodeWithEditOption}
      edges={edgeWithEditOption}
      onConnect={(parameters) => {
        if (isFunction(onEdgeCreate)) {
          onEdgeCreate(parameters);
        }
      }}
      onNodesChange={(event) => {
        if (!canEdit) {
          return;
        }

        onNodesChange(event);
      }}
      onEdgesChange={(event) => {
        if (!canEdit) {
          return;
        }

        onEdgesChange(event);
      }}
      onNodeDragStart={(event, node) => {
        if (!canEdit) {
          return;
        }

        const { position } = node;

        dragStartPosition = position;
      }}
      onNodeDragStop={(event, node) => {
        if (!canEdit) {
          return;
        }

        if (isFunction(updateViewConfig)) {
          const {
            position,
            data: { data },
          } = node;

          const { x, y } = position;
          const { x: xPrevious, y: yPrevious } = dragStartPosition;

          if (x != xPrevious || y != yPrevious) {
            updateViewConfig(
              { viewConfigData: JSON.stringify({ position }) },
              data,
            );
          }
        }
      }}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
    >
      <Controls />

      <MiniMap zoomable pannable />

      <Panel position="top-left">
        <GraphicDescription />
      </Panel>

      <Panel position="top-right">{canEdit ? <GraphicHelper /> : null}</Panel>

      <Background />
    </ReactFlow>
  );
}

Flow.defaultProps = {
  canEdit: true,
  multibranch: false,
  nodeNameKey: 'nodeNameKey',
  listInLineKey: 'listInLine',
  listOutLineKey: 'listOutLine',
  listApproverKey: 'listApprover',
  approverNameKey: 'approverNameKey',
  approverNameLabel: 'approverNameLabel',
  onEdgeCreate: () => {},
};

export { Flow };

export * from './tools';
