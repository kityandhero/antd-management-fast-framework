import { BackwardEdge } from './BackwardEdge';
import { CarbonCopyEdge } from './CarbonCopyEdge';
import { CarbonCopyNode } from './CarbonCopyNode';
import { EndNode } from './EndNode';
import { ForwardEdge } from './ForwardEdge';
import { IntermediateNode } from './IntermediateNode';
import { StartNode } from './StartNode';

export const nodeTypes = {
  intermediate: IntermediateNode,
  carbonCopy: CarbonCopyNode,
  start: StartNode,
  end: EndNode,
};

export const edgeTypes = {
  forward: ForwardEdge,
  backward: BackwardEdge,
  carbonCopy: CarbonCopyEdge,
};
