import React from 'react';
import { observer } from '@formily/reactive-react';

import { DroppableWidget } from 'antd-management-fast-design-react';

import './styles.less';

export const Container = observer((properties) => {
  return <DroppableWidget>{properties.children}</DroppableWidget>;
});

export const withContainer = (Target) => {
  // eslint-disable-next-line react/display-name
  return (properties) => {
    return (
      <DroppableWidget>
        <Target {...properties} />
      </DroppableWidget>
    );
  };
};
