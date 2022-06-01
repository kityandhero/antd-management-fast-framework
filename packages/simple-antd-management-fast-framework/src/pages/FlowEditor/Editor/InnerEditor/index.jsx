import ReactButterfly from 'butterfly-react';
import { connect } from 'umi';

import TabPageBase from '../../TabPageBase';

import Label from './Label';
import Node from './Node';

const endpoints = [
  {
    id: 'top',
    orientation: [0, -1],
    pos: [0.5, 0],
  },
  {
    id: 'bottom',
    orientation: [0, 1],
    pos: [0.5, 0],
  },
  {
    id: 'right',
    orientation: [1, 0],
    pos: [0, 0.5],
  },
  {
    id: 'left',
    orientation: [-1, 0],
    pos: [0, 0.5],
  },
];

const data = {
  nodes: [
    {
      id: '1',
      endpoints: endpoints,
      left: 0,
      top: 0,
      render() {
        return (
          <Node
            title="申请人"
            onClick={() => {
              console.log(111);
            }}
          />
        );
      },
    },
    {
      id: '2',
      endpoints: endpoints,
      left: 400,
      top: 0,
      render() {
        return <Node title="审批人" />;
      },
    },
    {
      id: '3',
      left: 0,
      top: 200,
      endpoints: endpoints,
      render() {
        return <Node title="验收人" />;
      },
    },
  ],
  edges: [
    {
      id: '1-2',
      sourceNode: '1',
      targetNode: '2',
      source: 'right',
      target: 'left',
      shapeType: 'AdvancedBezier',
      labelRender() {
        return <Label />;
      },
    },
  ],
};

@connect(({ flowEditor, global, loading }) => ({
  flowEditor,
  global,
  loading: loading.models.flowEditor,
}))
class Index extends TabPageBase {
  containerId = '';

  renderEdit = () => {
    return (
      <ReactButterfly
        {...data}
        options={{
          theme: {
            edge: {
              shapeType: 'AdvancedBezier', //线条默认类型
            },
          },
        }}
      />
    );
  };
}

export default Index;
