import React from 'react';

import { MenuCard } from './components/MenuCard';
import {
  buildActionItems,
  buildSiderMenuExtra,
  buildSiderMenuFooter,
} from './utils';

export const layoutConfig = {
  water: 'test',
  actionItems: buildActionItems(),
  backgroundImageItems: [
    {
      src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
      bottom: 0,
      left: 0,
      width: '331px',
    },
  ],
  menuExtra: buildSiderMenuExtra(),
  menuFooter: buildSiderMenuFooter(),
  miniMenu: <MenuCard />,
  config: {},
};
