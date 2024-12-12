import React from 'react';

import {
  colorStyle,
  fontFamilyStyle,
  frontSizeStyle,
  tdPaddingStyle,
} from '../../constant';
import { CellBase } from '../CellBase';

class CellRemark extends CellBase {
  getTdPaddingStyle = () => {
    return {
      ...tdPaddingStyle,
      paddingTop: '2px',
      paddingBottom: '2px',
    };
  };

  buildContentBox = () => {
    const { content } = this.getProperties();

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          ...frontSizeStyle,
          ...colorStyle,
          ...fontFamilyStyle,
          textAlign: 'left',
          borderRight: '0',
        }}
      >
        {content}
      </div>
    );
  };
}

export { CellRemark };
