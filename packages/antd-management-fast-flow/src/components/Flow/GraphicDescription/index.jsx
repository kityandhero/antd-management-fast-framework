import { Card, Divider } from 'antd';
import React from 'react';

import { CenterBox, FlexBox } from 'antd-management-fast-component';

import {
  backwardEdgeLabelBackground,
  carbonCopyEdgeLabelBackground,
  carbonCopyNodeBackgroundColor,
  endNodeBackgroundColor,
  forwardEdgeLabelBackground,
  intermediateNodeBackgroundColor,
  sourcePointColor,
  startNodeBackgroundColor,
  targetPointColor,
} from '../constant';

export function GraphicDescription() {
  return (
    <Card title="图示说明：" size="small">
      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: startNodeBackgroundColor,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="流程起始节点"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: intermediateNodeBackgroundColor,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="流程中间节点"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: carbonCopyNodeBackgroundColor,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="流程抄送节点"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: endNodeBackgroundColor,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="流程终止节点"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  border: '2px solid',
                  borderImage: 'linear-gradient(45deg, gold, deeppink) 1',
                  clipPath: 'inset(0px round 5px)',
                  filter: 'hue-rotate(360deg)',
                }}
              ></div>
            </CenterBox>
          }
          right="等待流转节点"
        />
      </div>

      <Divider
        type="horizontal"
        style={{
          marginTop: '6px',
          marginBottom: '6px',
        }}
      />

      <div>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '6px',
                  width: '6px',
                  backgroundColor: targetPointColor,
                  borderRadius: '50%',
                }}
              ></div>
            </CenterBox>
          }
          right="节点流程入口"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '6px',
                  width: '6px',
                  backgroundColor: sourcePointColor,
                  borderRadius: '50%',
                }}
              ></div>
            </CenterBox>
          }
          right="节点流程出口"
        />
      </div>

      <Divider
        type="horizontal"
        style={{
          marginTop: '6px',
          marginBottom: '6px',
        }}
      />

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: forwardEdgeLabelBackground,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="前进指向标签"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: carbonCopyEdgeLabelBackground,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="抄送指向标签"
        />
      </div>

      <div style={{ width: '120px' }}>
        <FlexBox
          flex="left"
          leftStyle={{
            paddingRight: '10px',
          }}
          left={
            <CenterBox>
              <div
                style={{
                  height: '10px',
                  width: '16px',
                  backgroundColor: backwardEdgeLabelBackground,
                  borderRadius: '3px',
                }}
              ></div>
            </CenterBox>
          }
          right="回退指向标签"
        />
      </div>
    </Card>
  );
}
