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
    path: '/news',
    name: 'news',
    icon: 'team',
    // authority: [
    //   accessWayCollection.super.permission,
    //   accessWayCollection.article.pageList.permission,
    // ],
    routes: [
      {
        path: '/news',
        redirect: '/news/article',
      },
      {
        path: '/news/article',
        name: 'article',
        icon: 'bars',
        // authority: [
        //   accessWayCollection.super.permission,
        //   accessWayCollection.article.pageList.permission,
        // ],
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
            // authority: [
            //   accessWayCollection.super.permission.permission,
            //   accessWayCollection.article.addBasicInfo.permission,
            // ],
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
        // authority: [
        //   accessWayCollection.super.permission,
        //   accessWayCollection.article.singleList.permission,
        // ],
        component: './Article/SingleList',
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
