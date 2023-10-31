import React from 'react';
// eslint-disable-next-line import/named
import { Handle, Position } from 'reactflow';

import {
  ColorText,
  FlexBox,
  VerticalBox,
} from 'antd-management-fast-component';

import {
  sourcePointColor,
  startNodeHeaderStyle,
  targetPointColor,
} from '../constant';

import styles from '../node.less';

const StartNode = (properties) => {
  const { size, onClick: click } = properties;

  return (
    <>
      <div className={styles.node} onClick={click}>
        <div className={styles.header} style={startNodeHeaderStyle}>
          <FlexBox
            flexAuto="left"
            left={
              <VerticalBox>
                <ColorText
                  style={{ color: '#ffe4c4' }}
                  color={'#333'}
                  separator=" "
                  text={'起始点'}
                />
              </VerticalBox>
            }
          />
        </div>

        {size !== 'small' && (
          <div className={styles.content}>
            <div className={styles.inner}>
              <div className={styles.info}>
                <ColorText text={'此为流程发起唯一节点，无审批人。'} />
              </div>
            </div>
          </div>
        )}
      </div>

      <Handle
        type="target"
        id="top"
        position={Position.Top}
        style={{ left: '45%', background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="source"
        id="top"
        position={Position.Top}
        style={{ left: '55%', background: sourcePointColor }}
        isConnectable={true}
      />

      <Handle
        type="target"
        position={Position.Left}
        id="left"
        style={{ top: '33%', background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ top: '66%', background: sourcePointColor }}
        isConnectable={true}
      />

      <Handle
        type="target"
        position={Position.Right}
        id="right"
        style={{ top: '66%', background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ top: '33%', background: sourcePointColor }}
        isConnectable={true}
      />

      <Handle
        type="target"
        id="bottom"
        position={Position.Bottom}
        style={{ left: '55%', background: targetPointColor }}
        isConnectable={true}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        style={{ left: '45%', background: sourcePointColor }}
        isConnectable={true}
      />
    </>
  );
};

StartNode.defaultProps = {};

export { StartNode };
