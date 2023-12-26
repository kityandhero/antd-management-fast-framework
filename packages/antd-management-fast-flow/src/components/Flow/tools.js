// eslint-disable-next-line import/named
import { MarkerType } from 'reactflow';

import {
  buildRandomHexColor,
  convertCollection,
  getValueByKey,
} from 'easy-soft-utility';

import { backwardEdgeColor, forwardEdgeColor } from './constant';

export function adjustNode(o) {
  const result = {
    position: { x: 0, y: 0 },
    canEdit: false,
    ...o,
  };

  return result;
}

export function adjustEdge(o) {
  const index = getValueByKey({
    data: o,
    key: 'index',
    convert: convertCollection.number,
  });

  const forward = getValueByKey({
    data: o,
    key: 'forward',
    convert: convertCollection.boolean,
  });

  const carbonCopy = getValueByKey({
    data: o,
    key: 'carbonCopy',
    convert: convertCollection.boolean,
  });

  const forwardEdgeColorAdjust =
    index > 0
      ? buildRandomHexColor({ seed: index * 30 + index + 2 })
      : forwardEdgeColor;

  const backwardEdgeColorAdjust =
    index > 0
      ? buildRandomHexColor({ seed: index * 30 + index + 2 })
      : backwardEdgeColor;

  const result = {
    animated: true,
    canEdit: false,
    sourceHandle: forward ? 'bottom' : 'right',
    targetHandle: forward ? 'top' : 'right',
    ...o,
    type: forward ? (carbonCopy ? 'carbonCopy' : 'forward') : 'backward',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      // width: 20,
      // height: 20,
      color: forward ? forwardEdgeColorAdjust : backwardEdgeColorAdjust,
    },
    style: {
      // strokeWidth: 2,
      stroke: forward ? forwardEdgeColorAdjust : backwardEdgeColorAdjust,
    },
  };

  return result;
}
