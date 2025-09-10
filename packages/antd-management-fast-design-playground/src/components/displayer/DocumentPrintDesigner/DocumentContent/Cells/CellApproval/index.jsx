import { Space } from 'antd';
import React from 'react';

import { isArray } from 'easy-soft-utility';

import { Line } from 'antd-management-fast-component';

import { tdPaddingStyle } from '../../constant';
import { CellBase } from '../CellBase';
import { OperationBox } from '../tools';

class CellApproval extends CellBase {
  getTdPaddingStyle = () => {
    return {
      ...tdPaddingStyle,
      paddingTop: '0px',
      paddingBottom: '0px',
    };
  };

  buildContentBox = () => {
    const { lineColor, content, signetStyle } = {
      signetStyle: null,
      ...this.getProperties(),
    };

    if (isArray(content)) {
      return (
        <Space
          direction="vertical"
          style={{ width: '100%' }}
          size={[0]}
          split={<Line color={lineColor || '#000'} height={1} />}
        >
          {content.map((o, index) => {
            const { nodeId = '' } = {
              nodeId: '',
              ...o,
            };

            return (
              <OperationBox
                key={`${nodeId}_${index}`}
                content={o}
                signetStyle={signetStyle}
              />
            );
          })}
        </Space>
      );
    }

    return <OperationBox content={content} signetStyle={signetStyle} />;
  };
}

export { CellApproval };
