import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export default [
  {
    path: '/entrance',
    component: '../layouts/EntranceLayout',
    routes: [
      { path: '/entrance', redirect: '/entrance/signIn' },
      { path: '/entrance/signIn', component: './Entrance' },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/currentOperator' },
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
                    path: '/news/article/edit/:op/:id/:pageKey/contentInfo',
                    name: 'contentInfo',
                    component: './Article/Edit/ContentInfo',
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
          {
            path: '/news/articleSingleList',
            name: 'articleSingleList',
            icon: 'bars',
            authority: [
              accessWayCollection.super.permission,
              accessWayCollection.article.singleList.permission,
            ],
            component: './Article/SingleList',
          },
        ],
      },
      {
        path: '/flowEditor',
        name: 'flowEditor',
        icon: 'tool',
        routes: [
          {
            path: '/flowEditor',
            redirect: '/flowEditor/editor',
          },
          {
            path: '/flowEditor/editor',
            name: 'editor',
            icon: 'bars',
            component: './FlowEditor/Editor',
            routes: [
              {
                path: '/flowEditor/editor',
                redirect: '/flowEditor/editor/design',
              },
              {
                path: '/flowEditor/editor/design',
                component: './flowEditor/Editor/Design',
              },
            ],
          },
        ],
      },
      {
        path: '/currentSystem',
        name: 'currentSystem',
        icon: 'user',
        component: './CurrentSystem/Edit',
        routes: [
          {
            path: '/currentSystem',
            redirect: '/currentSystem/basicInfo',
          },
          {
            path: '/currentSystem/basicInfo',
            name: 'basicInfo',
            component: './CurrentSystem/Edit/BasicInfo',
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
                redirect: '/currentOperator/setting/basicInfo',
              },
              {
                path: '/currentOperator/setting/basicInfo',
                component: './CurrentOperator/Setting/BasicInfo',
              },
              {
                path: '/currentOperator/setting/password',
                component: './CurrentOperator/Setting/Password',
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
