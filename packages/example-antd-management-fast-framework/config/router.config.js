export default [
  {
    path: '/entrance',
    layout: false,
    routes: [
      { path: '/entrance', redirect: '/entrance/signIn' },
      {
        path: '/entrance/signIn',
        component: './Entrance',
      },
    ],
  },
  {
    path: '/',
    wrappers: ['../components/PageWrapper'],
    // component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/dashboard' },
      {
        name: 'dashboard',
        icon: 'team',
        path: '/dashboard',
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
    ],
  },
];
