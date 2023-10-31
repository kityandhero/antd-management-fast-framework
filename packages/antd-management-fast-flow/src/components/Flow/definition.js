import { BackwardEdge } from './BackwardEdge';
import { EndNode } from './EndNode';
import { ForwardEdge } from './ForwardEdge';
import { IntermediateNode } from './IntermediateNode';
import { StartNode } from './StartNode';

export const nodeTypes = {
  intermediate: IntermediateNode,
  start: StartNode,
  end: EndNode,
};

export const edgeTypes = {
  forward: ForwardEdge,
  backward: BackwardEdge,
};
