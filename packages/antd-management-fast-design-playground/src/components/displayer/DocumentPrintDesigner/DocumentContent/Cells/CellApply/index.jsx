import React from 'react';

import { tdPaddingStyle } from '../../constant';
import { CellBase } from '../CellBase';
import { OperationBox } from '../tools';

class CellApply extends CellBase {
  getTdPaddingStyle = () => {
    return {
      ...tdPaddingStyle,
      paddingTop: '0px',
      paddingBottom: '0px',
    };
  };

  buildContentBox = () => {
    const { content, signetStyle } = {
      signetStyle: null,
      ...this.getProperties(),
    };

    return <OperationBox content={content} signetStyle={signetStyle} />;
  };
}

export { CellApply };
