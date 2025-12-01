import { Space, Typography } from 'antd';
import React, { PureComponent } from 'react';
// eslint-disable-next-line import/named
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath } from 'reactflow';

import { getValueByKey, isFunction } from 'easy-soft-utility';

import { iconBuilder } from 'antd-management-fast-component';

import {
  carbonCopyEdgeLabelBackground,
  carbonCopyEdgeTextColor,
} from '../constant';

const { Text } = Typography;

class CarbonCopyEdge extends PureComponent {
  render() {
    const {
      id,
      data,
      sourceX,
      sourceY,
      targetX,
      targetY,
      sourcePosition,
      targetPosition,
      borderRadius,
      centerX,
      centerY,
      offset,
      markerEnd,
      style,
    } = this.props;

    const [edgePath, labelX, labelY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius,
      centerX,
      centerY,
      offset,
    });

    const {
      data: dataSource,
      canEdit,
      multibranch,
      onChange,
      onChangeBranchCondition,
      onRemove,
    } = {
      canEdit: false,
      multibranch: false,
      ...data,
    };

    const title = getValueByKey({
      data: dataSource,
      key: 'title',
    });

    const description = getValueByKey({
      data: dataSource,
      key: 'description',
    });

    return (
      <>
        <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} style={style} />

        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: carbonCopyEdgeLabelBackground,
              padding: 6,
              borderRadius: 5,
              fontSize: 12,
              pointerEvents: 'all',
            }}
            title={description || ''}
          >
            <Space>
              <Text
                style={{
                  fontSize: '12px',
                  padding: '0.5px 2px',
                  border: `1.2mm ridge ${carbonCopyEdgeTextColor}`,
                }}
              >
                {title || '抄送'}
              </Text>

              {canEdit ? (
                <button
                  style={{
                    padding: '0.5px 4px',
                    fontSize: '12px',
                  }}
                  title="点击变更连线"
                  onClick={(event) => {
                    event.stopPropagation();

                    if (isFunction(onChange)) {
                      onChange(dataSource);
                    }
                  }}
                >
                  {iconBuilder.edit()}
                </button>
              ) : null}

              {multibranch ? (
                <button
                  style={{
                    padding: '0.5px 4px',
                    fontSize: '12px',
                  }}
                  title="点击变更绑定的抄送条件"
                  onClick={(event) => {
                    event.stopPropagation();

                    if (isFunction(onChangeBranchCondition)) {
                      onChangeBranchCondition(dataSource);
                    }
                  }}
                >
                  {iconBuilder.nodeIndex()}
                </button>
              ) : null}

              {canEdit ? (
                <button
                  style={{
                    padding: '0.5px 4px',
                    fontSize: '12px',
                  }}
                  title="点击移除连线"
                  onClick={(event) => {
                    event.stopPropagation();

                    if (isFunction(onRemove)) {
                      onRemove(dataSource);
                    }
                  }}
                >
                  {iconBuilder.delete()}
                </button>
              ) : null}
            </Space>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }
}

export { CarbonCopyEdge };
