import React from 'react';

import { VerticalBox } from 'antd-management-fast-component';

function GeneralConfigContainer(properties) {
  const { children } = properties;

  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <VerticalBox>
        <div
          style={{
            padding: '2px 6px',
            backgroundColor: '#ccc',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          {children}
        </div>
      </VerticalBox>
    </div>
  );
}

export { GeneralConfigContainer };
