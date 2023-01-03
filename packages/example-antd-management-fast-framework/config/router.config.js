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
    ],
  },
];
