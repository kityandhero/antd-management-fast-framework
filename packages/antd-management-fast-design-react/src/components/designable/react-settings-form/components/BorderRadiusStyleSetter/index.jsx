import React from 'react';

import { IconWidget } from '../../../react';
import { BoxStyleSetter } from '../BoxStyleSetter';

export const BorderRadiusStyleSetter = (properties) => {
  return (
    <BoxStyleSetter
      {...properties}
      labels={[
        <IconWidget infer="TopLeft" size={16} key="1" />,
        <IconWidget infer="TopRight" size={16} key="2" />,
        <IconWidget infer="BottomRight" size={16} key="3" />,
        <IconWidget infer="BottomLeft" size={16} key="4" />,
      ]}
    />
  );
};
