import { Breadcrumb } from 'antd';
import React from 'react';
import { observer } from '@formily/reactive-react';

import { useCurrentNode, useHover, usePrefix, useSelection } from '../../hooks';
import { IconWidget } from '../IconWidget';
import { NodeTitleWidget } from '../NodeTitleWidget';

import './styles.less';

export const NodePathWidget = observer((properties) => {
  const selected = useCurrentNode(properties.workspaceId);
  const selection = useSelection(properties.workspaceId);
  const hover = useHover(properties.workspaceId);
  const prefix = usePrefix('node-path');

  if (!selected) {
    return <React.Fragment />;
  }

  const maxItems = properties.maxItems ?? 3;

  const nodes = [
    ...selected
      .getParents()
      .slice(0, maxItems - 1)
      .reverse(),
    selected,
  ];

  return (
    <Breadcrumb className={prefix}>
      {nodes.map((node, key) => {
        return (
          <Breadcrumb.Item key={key}>
            {key === 0 && (
              <IconWidget infer="Position" style={{ marginRight: 3 }} />
            )}
            <a
              href=""
              onMouseEnter={() => {
                hover.setHover(node);
              }}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                selection.select(node);
              }}
            >
              <NodeTitleWidget node={node} />
            </a>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
});
