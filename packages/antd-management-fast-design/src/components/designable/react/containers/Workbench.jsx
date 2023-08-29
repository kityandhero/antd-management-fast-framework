import React from 'react';
import { observer } from '@formily/reactive-react';

import { useWorkbench } from '../hooks';

import { Workspace } from './Workspace';

export const Workbench = observer((properties) => {
  const workbench = useWorkbench();

  return (
    <Workspace id={workbench.currentWorkspace?.id}>
      {properties.children}
    </Workspace>
  );
});
