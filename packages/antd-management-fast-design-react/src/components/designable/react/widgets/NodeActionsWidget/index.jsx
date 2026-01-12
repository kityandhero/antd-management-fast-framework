import { Divider, Space, Typography } from 'antd';
import cls from 'classnames';
import React from 'react';
import { observer } from '@formily/reactive-react';

import { usePrefix, useSelected, useTreeNode } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { TextWidget } from '../TextWidget';

import './styles.less';

const NodeActionsWidgetInner = observer((properties) => {
  const node = useTreeNode();
  const prefix = usePrefix('node-actions');
  const selected = useSelected();
  if (!selected.includes(node?.id) && properties.activeShown) return null;
  return (
    <div className={cls(prefix, properties.className)} style={properties.style}>
      <div className={prefix + '-content'}>
        <Space separator={<Divider orientation="vertical" />}>
          {properties.children}
        </Space>
      </div>
    </div>
  );
});

const Action = ({ icon, title, ...properties }) => {
  const prefix = usePrefix('node-actions-item');
  return (
    <Typography.Link
      {...properties}
      className={cls(properties.className, prefix)}
      data-click-stop-propagation="true"
    >
      <span className={prefix + '-text'}>
        <IconWidget infer={icon} />
        <TextWidget>{title}</TextWidget>
      </span>
    </Typography.Link>
  );
};

NodeActionsWidgetInner.Action = Action;

export const NodeActionsWidget = NodeActionsWidgetInner;
