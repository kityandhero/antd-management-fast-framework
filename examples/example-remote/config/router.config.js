import { accessWayCollection } from '../src/customConfig/accessWayCollection';

import {
  apps,
  entrance,
  notFound,
  result,
} from './router.master.template.config';

export default [
  entrance,
  {
    path: '/',
    redirect: '/dashboard',
    routes: [],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'team',
    authority: [accessWayCollection.super.permission],
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/workbench',
      },
      {
        path: '/dashboard/workbench',
        name: 'workbench',
        icon: 'bars',
        component: './Workbench',
      },
    ],
  },
  apps,
  result,
  notFound,
];
