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
    name: 'logs',
    icon: 'reconciliation',
    path: '/logs',
    routes: [
      {
        name: 'errorLog',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/logs/errorLog',
        routes: [
          {
            path: '/logs/errorLog',
            redirect: '/logs/errorLog/pageList',
          },
          {
            path: '/logs/errorLog/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/logs/errorLog/pageList/no',
          },
          {
            path: '/logs/errorLog/pageList/:pageKey',
            hideInMenu: true,
            component: './ErrorLog/PageList',
          },
          {
            path: '/logs/errorLog/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './ErrorLog/Edit',
            routes: [
              {
                path: '/logs/errorLog/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './ErrorLog/Edit/BasicInfo',
              },
              {
                path: '/logs/errorLog/edit/:op/:id/:pageKey/paramInfo',
                name: 'paramInfo',
                component: './ErrorLog/Edit/ParamInfo',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'permission',
    icon: 'reconciliation',
    path: '/permission',
    routes: [
      {
        name: 'accessWay',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/permission/accessWay',
        routes: [
          {
            path: '/permission/accessWay',
            redirect: '/permission/accessWay/pageList',
          },
          {
            path: '/permission/accessWay/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/permission/accessWay/pageList/no',
          },
          {
            path: '/permission/accessWay/pageList/:pageKey',
            hideInMenu: true,
            component: './AccessWay/PageList',
          },
        ],
      },
      {
        name: 'presetRole',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/permission/presetRole',
        routes: [
          {
            path: '/permission/presetRole',
            redirect: '/permission/presetRole/pageList/no',
          },
          {
            path: '/permission/presetRole/add',
            name: 'add',
            hideInMenu: true,
            component: './PresetRole/Add',
          },
          {
            path: '/permission/presetRole/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './PresetRole/PageList',
          },
          {
            path: '/permission/presetRole/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './PresetRole/Edit',
            routes: [
              {
                path: '/permission/presetRole/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './PresetRole/Edit/BasicInfo',
              },
              {
                path: '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo',
                name: 'moduleInfo',
                routes: [
                  {
                    path: '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo',
                    redirect:
                      '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo/singleList',
                  },
                  {
                    path: '/permission/presetRole/edit/:op/:id/:pageKey/moduleInfo/singleList',
                    name: 'singleList',
                    component: './PresetRole/Edit/ModuleInfo/SingleList',
                  },
                ],
              },
            ],
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
