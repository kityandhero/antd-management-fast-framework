export default [
  {
    path: '/entrance',
    component: '../layouts/EntranceLayout',
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
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
      },
    ],
  },
];
