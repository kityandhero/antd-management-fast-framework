import { accessWayCollection } from '../src/customConfig/accessWayCollection';

export const entrance = {
  path: '/entrance',
  layout: false,
  routes: [
    { path: '/entrance', redirect: '/entrance/signIn' },
    {
      path: '/entrance/signIn',
      component: './Entrance',
    },
  ],
};

export const apps = {
  name: 'app',
  icon: 'appstore',
  path: '/app',
  access: 'checkAccess',
  authority: [
    accessWayCollection.super.permission,
    accessWayCollection.applicationSource.pageList.permission,
  ],
  routes: [
    {
      name: 'applicationSource',
      icon: 'bars',
      hideChildrenInMenu: true,
      path: '/app/applicationSource',
      access: 'checkAccess',
      authority: [
        accessWayCollection.super.permission,
        accessWayCollection.applicationSource.pageList.permission,
      ],
      routes: [
        {
          path: '/app/applicationSource',
          redirect: '/app/applicationSource/pageList',
        },
        {
          path: '/app/applicationSource/pageList',
          name: 'pageList',
          icon: 'bars',
          redirect: '/app/applicationSource/pageList/no',
        },
        {
          path: '/app/applicationSource/pageList/:pageKey',
          hideInMenu: true,
          component: './ApplicationSource/PageList',
        },
        {
          path: '/app/applicationSource/edit/:op/:id/:pageKey',
          name: 'edit',
          hideInMenu: true,
          component: './ApplicationSource/Edit',
          routes: [
            {
              path: '/app/applicationSource/edit/:op/:id/:pageKey/basicInfo',
              name: 'basicInfo',
              component: './ApplicationSource/Edit/BasicInfo',
            },
          ],
        },
      ],
    },
  ],
};

export const result = {
  path: '/result',
  name: 'result',
  icon: 'bars',
  hideInMenu: true,
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
};

export const notFound = { path: '/*', component: './Result/NotFound' };
