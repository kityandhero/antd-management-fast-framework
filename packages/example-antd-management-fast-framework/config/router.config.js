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
  {
    path: '/simple',
    name: 'simple',
    icon: 'bars',
    // authority: [
    //   accessWayCollection.super.permission,
    //   accessWayCollection.article.pageList.permission,
    // ],
    // hideChildrenInMenu: true,
    routes: [
      {
        path: '/simple',
        redirect: '/simple/singleList',
      },
      {
        path: '/simple/addBasicInfo',
        name: 'addBasicInfo',
        icon: 'plusSquare',
        useMini: true,
        // authority: [
        //   accessWayCollection.super.permission.permission,
        //   accessWayCollection.article.addBasicInfo.permission,
        // ],
        component: './Simple/Add',
      },
      {
        path: '/simple/singleList',
        name: 'singleList',
        icon: 'bars',
        // authority: [
        //   accessWayCollection.super.permission,
        //   accessWayCollection.article.singleList.permission,
        // ],
        component: './Simple/SingleList',
      },
      {
        path: '/simple/pageList',
        name: 'pageList',
        icon: 'bars',
        redirect: '/simple/pageList/no',
      },
      {
        path: '/simple/pageList/:pageKey',
        hideInMenu: true,
        component: './Simple/PageList',
      },
      {
        path: '/simple/edit/:op/:id/:pageKey',
        name: 'edit',
        hideInMenu: true,
        component: './Simple/Edit',
        routes: [
          {
            path: '/simple/edit/:op/:id/:pageKey/basicInfo',
            name: 'basicInfo',
            component: './Simple/Edit/BasicInfo',
          },
          {
            path: '/simple/edit/:op/:id/:pageKey/contentInfo',
            name: 'contentInfo',
            component: './Simple/Edit/ContentInfo',
          },
          {
            path: '/simple/edit/:op/:id/:pageKey/mediaInfo',
            name: 'mediaInfo',
            component: './Simple/Edit/MediaInfo',
          },
        ],
      },
    ],
  },
  {
    path: '/common',
    name: 'common',
    icon: 'bars',
    routes: [
      {
        path: '/common',
        redirect: '/common/result',
      },
      {
        path: '/common/result',
        name: 'result',
        icon: 'bars',
        routes: [
          {
            path: '/common/result',
            redirect: '/common/result/forbidden',
          },
          {
            path: '/common/result/forbidden',
            name: 'forbidden',
            component: './Result/Forbidden',
          },
          {
            path: '/common/result/serverError',
            name: 'serverError',
            component: './Result/ServerError',
          },
          {
            path: '/common/result/localError',
            name: 'localError',
            component: './Result/LocalError',
          },
          {
            path: '/common/result/success',
            name: 'success',
            component: './Result/Success',
          },
          {
            path: '/common/result/info',
            name: 'info',
            component: './Result/Info',
          },
          {
            path: '/common/result/warn',
            name: 'warn',
            component: './Result/Warn',
          },
          {
            path: '/common/result/notFound',
            name: 'notFound',
            component: './Result/NotFound',
          },
        ],
      },
    ],
  },
  { path: '/*', component: './Result/NotFound' },
];
