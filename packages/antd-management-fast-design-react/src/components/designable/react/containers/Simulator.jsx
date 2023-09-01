import React from 'react';
import { ScreenType } from '@designable/core';
import { requestIdle } from '@designable/shared';
import { observer } from '@formily/reactive-react';

import { useScreen } from '../hooks';
import {
  MobileSimulator,
  PCSimulator,
  ResponsiveSimulator,
} from '../simulators';

export const Simulator = observer(
  (properties) => {
    const screen = useScreen();

    if (screen.type === ScreenType.PC) {
      return <PCSimulator {...properties}>{properties.children}</PCSimulator>;
    }

    if (screen.type === ScreenType.Mobile) {
      return (
        <MobileSimulator {...properties}>{properties.children}</MobileSimulator>
      );
    }

    if (screen.type === ScreenType.Responsive) {
      return (
        <ResponsiveSimulator {...properties}>
          {properties.children}
        </ResponsiveSimulator>
      );
    }

    return <PCSimulator {...properties}>{properties.children}</PCSimulator>;
  },
  {
    scheduler: requestIdle,
  },
);
