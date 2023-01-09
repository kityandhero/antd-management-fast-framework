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
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'team',
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
  // {
  //   path: '/',
  //   // wrappers: ['../components/PageWrapper'],
  //   // component: '../layouts/BasicLayout',
  //   routes: [],
  // },
];
