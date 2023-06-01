import { accessWayCollection } from '../src/customConfig/accessWayCollection';

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
  {
    name: 'errorLog',
    icon: 'reconciliation',
    path: '/errorLog',
    routes: [
      {
        path: '/errorLog',
        redirect: '/errorLog/pageList',
      },
      {
        path: '/errorLog/pageList',
        name: 'pageList',
        icon: 'bars',
        redirect: '/errorLog/pageList/no',
      },
      {
        path: '/errorLog/pageList/:pageKey',
        hideInMenu: true,
        component: './ErrorLog/PageList',
      },
      {
        path: '/errorLog/edit/:op/:id/:pageKey',
        name: 'edit',
        hideInMenu: true,
        component: './ErrorLog/Edit',
        routes: [
          {
            path: '/errorLog/edit/:op/:id/:pageKey/basicInfo',
            name: 'basicInfo',
            component: './ErrorLog/Edit/BasicInfo',
          },
          {
            path: '/errorLog/edit/:op/:id/:pageKey/paramInfo',
            name: 'paramInfo',
            component: './ErrorLog/Edit/ParamInfo',
          },
        ],
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    icon: 'bars',
    routes: [
      {
        path: '/result',
        redirect: '/result/forbidden',
      },
      {
        path: '/result/forbidden',
        name: 'forbidden',
        component: './Result/Forbidden',
      },
      {
        path: '/result/serverError',
        name: 'serverError',
        component: './Result/ServerError',
      },
      {
        path: '/result/localError',
        name: 'localError',
        component: './Result/LocalError',
      },
      {
        path: '/result/success',
        name: 'success',
        component: './Result/Success',
      },
      {
        path: '/result/info',
        name: 'info',
        component: './Result/Info',
      },
      {
        path: '/result/warn',
        name: 'warn',
        component: './Result/Warn',
      },
      {
        path: '/result/notFound',
        name: 'notFound',
        component: './Result/NotFound',
      },
    ],
  },
  { path: '/*', component: './Result/NotFound' },
];
