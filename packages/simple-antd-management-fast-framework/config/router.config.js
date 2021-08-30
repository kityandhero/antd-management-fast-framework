import { accessWayCollection } from '../src/customConfig/accessWayCollection';

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
        authority: [
          accessWayCollection.super.permission,
          accessWayCollection.dashboard.analysis.permission,
        ],
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            icon: 'area-chart',
            authority: [
              accessWayCollection.super.permission,
              accessWayCollection.dashboard.analysis.permission,
            ],
            component: './Dashboard/Analysis',
          },
        ],
      },
      {
        name: 'permission',
        icon: 'bar-chart',
        path: '/permission',
        routes: [
          {
            path: '/permission/accessWay',
            name: 'accessWay',
            icon: 'bars',
            routes: [
              {
                path: '/permission/accessWay',
                redirect: '/permission/accessWay/pageList/no',
              },
              {
                path: '/permission/accessWay/pageList/:pageKey',
                name: 'list',
                hideInMenu: true,
                component: './AccessWay/PageList',
              },
            ],
          },
        ],
      },
      {
        name: 'news',
        icon: 'team',
        path: '/news',
        authority: [
          accessWayCollection.super.permission,
          accessWayCollection.article.pageList.permission,
        ],
        routes: [
          {
            path: '/news/article',
            name: 'article',
            icon: 'bars',
            authority: [
              accessWayCollection.super.permission,
              accessWayCollection.article.pageList.permission,
            ],
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/news/article',
                redirect: '/news/article/pageList',
              },
              {
                path: '/news/article/pageList',
                redirect: '/news/article/pageList/no',
              },
              {
                path: '/news/article/pageList/:pageKey',
                hideInMenu: true,
                component: './Article/PageList',
              },
              {
                path: '/news/article/addBasicInfo',
                name: 'addBasicInfo',
                icon: 'plus-square',
                authority: [
                  accessWayCollection.super.permission.permission,
                  accessWayCollection.article.addBasicInfo.permission,
                ],
                component: './Article/Add',
              },
              {
                path: '/news/article/edit/:op/:id/:pageKey',
                name: 'edit',
                hideInMenu: true,
                component: './Article/Edit',
                routes: [
                  {
                    path: '/news/article/edit/:op/:id/:pageKey/basicInfo',
                    name: 'basicInfo',
                    component: './Article/Edit/BasicInfo',
                  },
                  {
                    path: '/news/article/edit/:op/:id/:pageKey/mediaInfo',
                    name: 'mediaInfo',
                    component: './Article/Edit/MediaInfo',
                  },
                ],
              },
            ],
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
