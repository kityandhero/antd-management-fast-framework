import { Button, Space } from 'antd';
import cls from 'classnames';
import React from 'react';
import { observer } from '@formily/reactive-react';

import { usePrefix, useWorkbench } from '../../hooks';
import { IconWidget } from '../IconWidget';

export const ViewToolsWidget = observer(
  ({ use = ['DESIGNABLE', 'JSONTREE', 'PREVIEW'], style, className }) => {
    const workbench = useWorkbench();
    const prefix = usePrefix('view-tools');

    return (
      <Space.Compact style={style} className={cls(prefix, className)}>
        {use?.includes('DESIGNABLE') && (
          <Button
            disabled={workbench.type === 'DESIGNABLE'}
            onClick={() => {
              workbench.type = 'DESIGNABLE';
            }}
            size="small"
          >
            <IconWidget infer="Design" />
          </Button>
        )}

        {use?.includes('JSONTREE') && (
          <Button
            disabled={workbench.type === 'JSONTREE'}
            onClick={() => {
              workbench.type = 'JSONTREE';
            }}
            size="small"
          >
            <IconWidget infer="JSON" />
          </Button>
        )}

        {use?.includes('MARKUP') && (
          <Button
            disabled={workbench.type === 'MARKUP'}
            onClick={() => {
              workbench.type = 'MARKUP';
            }}
            size="small"
          >
            <IconWidget infer="Code" />
          </Button>
        )}

        {use?.includes('PREVIEW') && (
          <Button
            disabled={workbench.type === 'PREVIEW'}
            onClick={() => {
              workbench.type = 'PREVIEW';
            }}
            size="small"
          >
            <IconWidget infer="Play" />
          </Button>
        )}
      </Space.Compact>
    );
  },
);
