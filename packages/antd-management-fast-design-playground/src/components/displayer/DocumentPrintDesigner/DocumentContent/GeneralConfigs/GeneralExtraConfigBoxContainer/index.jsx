import { Divider } from 'antd';
import React from 'react';

function GeneralExtraConfigBoxContainer({ showDivider = true, children }) {
  return (
    <div>
      {children}

      {showDivider ? <Divider style={{ margin: '6px 0' }} /> : null}
    </div>
  );
}

export { GeneralExtraConfigBoxContainer };
