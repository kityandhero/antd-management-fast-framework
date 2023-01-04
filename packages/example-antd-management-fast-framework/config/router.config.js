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
    // component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
    ],
  },
];
