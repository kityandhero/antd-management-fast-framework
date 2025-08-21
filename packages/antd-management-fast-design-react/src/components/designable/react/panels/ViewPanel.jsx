import React, { useEffect, useState } from 'react';
import { requestIdle } from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { Viewport } from '../containers';
import { useTree, useWorkbench } from '../hooks';

export const ViewPanel = observer((properties) => {
  const [visible, setVisible] = useState(true);
  const workbench = useWorkbench();
  const tree = useTree();

  const { scrollable } = { scrollable: true, ...properties };

  useEffect(() => {
    if (workbench.type === properties.type) {
      requestIdle(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    } else {
      setVisible(false);
    }
  }, [workbench.type]);

  if (workbench.type !== properties.type) {
    return null;
  }

  const render = () => {
    return properties.children(tree, (payload) => {
      tree.from(payload);
      tree.takeSnapshot();
    });
  };

  if (workbench.type === 'DESIGNABLE') {
    return (
      <Viewport dragTipsDirection={properties.dragTipsDirection}>
        {render()}
      </Viewport>
    );
  }

  return (
    <div
      style={{
        overflow: scrollable ? 'overlay' : 'hidden',
        height: '100%',
        cursor: 'auto',
        userSelect: 'text',
      }}
    >
      {visible && render()}
    </div>
  );
});
