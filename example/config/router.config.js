import { accessWayCollection } from '../src/customConfig/config';

export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        authority: [accessWayCollection.super, accessWayCollection.dashboard.analysis],
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            icon: 'area-chart',
            authority: [accessWayCollection.super, accessWayCollection.dashboard.analysis],
            component: './Dashboard/Analysis',
          },
        ],
      },
      {
        path: '/currentOperator',
        name: 'currentOperator',
        icon: 'user',
        routes: [
          {
            path: '/currentOperator',
            redirect: '/currentOperator/setting',
          },
          {
            path: '/currentOperator/setting',
            name: 'setting',
            icon: 'bars',
            component: './CurrentOperator/Setting',
            routes: [
              {
                path: '/currentOperator/setting',
                redirect: '/currentOperator/setting/base',
              },
              {
                path: '/currentOperator/setting/base',
                component: './CurrentOperator/Setting/Base',
              },
              {
                path: '/currentOperator/setting/password',
                component: './CurrentOperator/Setting/Password',
              },
              {
                path: '/currentOperator/setting/security',
                component: './CurrentOperator/Setting/Security',
              },
            ],
          },
        ],
      },
      // {
      //   component: '404',
      // },
    ],
  },
];
