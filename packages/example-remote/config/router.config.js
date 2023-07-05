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
    routes: [],
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
      {
        name: 'generalLog',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/logs/generalLog',
        routes: [
          {
            path: '/logs/generalLog',
            redirect: '/logs/generalLog/pageList',
          },
          {
            path: '/logs/generalLog/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/logs/generalLog/pageList/no',
          },
          {
            path: '/logs/generalLog/pageList/:pageKey',
            hideInMenu: true,
            component: './GeneralLog/PageList',
          },
          {
            path: '/logs/generalLog/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './GeneralLog/Edit',
            routes: [
              {
                path: '/logs/generalLog/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './GeneralLog/Edit/BasicInfo',
              },
            ],
          },
        ],
      },
      {
        name: 'sqlLog',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/logs/sqlLog',
        routes: [
          {
            path: '/logs/sqlLog',
            redirect: '/logs/sqlLog/pageList',
          },
          {
            path: '/logs/sqlLog/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/logs/sqlLog/pageList/no',
          },
          {
            path: '/logs/sqlLog/pageList/:pageKey',
            hideInMenu: true,
            component: './SqlLog/PageList',
          },
        ],
      },
    ],
  },
  {
    name: 'sms',
    icon: 'read',
    path: '/sms',
    routes: [
      {
        name: 'smsCategory',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/sms/smsCategory',
        routes: [
          {
            path: '/sms/smsCategory',
            redirect: '/sms/smsCategory/pageList/no',
          },
          {
            path: '/sms/smsCategory/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './SmsCategory/PageList',
          },
        ],
      },
      {
        name: 'smsLog',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/sms/smsLog',
        routes: [
          {
            path: '/sms/smsLog',
            redirect: '/sms/smsLog/pageList/no',
          },
          {
            path: '/sms/smsLog/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './SmsLog/PageList',
          },
        ],
      },
      {
        name: 'smsCategoryStatistic',
        icon: 'bars',
        path: '/sms/smsCategoryStatistic',
        hideChildrenInMenu: true,
        routes: [
          {
            path: '/sms/smsCategoryStatistic',
            redirect: '/sms/smsCategoryStatistic/pageList/no',
          },
          {
            path: '/sms/smsCategoryStatistic/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './SmsCategoryStatistic/PageList',
          },
        ],
      },
    ],
  },
  {
    name: 'services',
    icon: 'reconciliation',
    path: '/services',
    routes: [
      {
        name: 'hostService',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/services/hostService',
        routes: [
          {
            path: '/services/hostService',
            redirect: '/services/hostService/pageList',
          },
          {
            path: '/services/hostService/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/services/hostService/pageList/no',
          },
          {
            path: '/services/hostService/pageList/:pageKey',
            hideInMenu: true,
            component: './HostService/PageList',
          },
          {
            path: '/services/hostService/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './HostService/Edit',
            routes: [
              {
                path: '/services/hostService/edit/:op/:id/:pageKey/changeRecord',
                routes: [
                  {
                    path: '/services/hostService/edit/:op/:id/:pageKey/changeRecord',
                    redirect:
                      '/services/hostService/edit/:op/:id/:pageKey/changeRecord/pageList',
                  },
                  {
                    path: '/services/hostService/edit/:op/:id/:pageKey/changeRecord/pageList',
                    component: './HostService/Edit/ChangeRecord/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'hostServiceLog',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/services/hostServiceLog',
        routes: [
          {
            path: '/services/hostServiceLog',
            redirect: '/services/hostServiceLog/pageList',
          },
          {
            path: '/services/hostServiceLog/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/services/hostServiceLog/pageList/no',
          },
          {
            path: '/services/hostServiceLog/pageList/:pageKey',
            hideInMenu: true,
            component: './HostServiceLog/PageList',
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
    name: 'person',
    icon: 'team',
    path: '/person',
    routes: [
      {
        name: 'user',
        icon: 'user',
        hideChildrenInMenu: true,
        path: '/person/user',
        routes: [
          {
            path: '/person/user',
            redirect: '/person/user/pageList',
          },
          {
            path: '/person/user/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/person/user/pageList/no',
          },
          {
            path: '/person/user/pageList/:pageKey',
            hideInMenu: true,
            component: './User/PageList',
          },
          {
            path: '/person/user/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './User/Edit',
            routes: [
              {
                path: '/person/user/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './User/Edit/BasicInfo',
              },
              {
                path: '/person/user/edit/:op/:id/:pageKey/updateParent',
                name: 'basicInfo',
                component: './User/Edit/UpdateParent',
              },
              {
                path: '/person/user/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/person/user/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/person/user/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/person/user/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './User/Edit/OperateLog/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'internalTester',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/person/internalTester',
        routes: [
          {
            path: '/person/internalTester',
            redirect: '/person/internalTester/pageList',
          },
          {
            path: '/person/internalTester/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/person/internalTester/pageList/no',
          },
          {
            path: '/person/internalTester/pageList/:pageKey',
            hideInMenu: true,
            component: './InternalTester/PageList',
          },
          {
            path: '/person/internalTester/add',
            hideInMenu: true,
            component: './InternalTester/Add',
          },
        ],
      },
    ],
  },
  {
    name: 'currentAccount',
    icon: 'user',
    path: '/currentAccount',
    routes: [
      {
        path: '/currentAccount',
        redirect: '/currentAccount/setting',
      },
      {
        name: 'setting',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/currentAccount/setting',
        component: './CurrentAccount/Setting',
        routes: [
          {
            path: '/currentAccount/setting',
            redirect: '/currentAccount/setting/load/basicInfo',
          },
          {
            path: '/currentAccount/setting/:op/basicInfo',
            component: './CurrentAccount/Setting/BasicInfo',
          },
          {
            path: '/currentAccount/setting/:op/password',
            component: './CurrentAccount/Setting/Password',
          },
        ],
      },
    ],
  },
  {
    name: 'currentManagement',
    icon: 'user',
    path: '/currentManagement',
    routes: [
      {
        path: '/currentManagement',
        redirect: '/currentManagement/setting',
      },
      {
        name: 'setting',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/currentManagement/setting',
        component: './CurrentManagement/Setting',
        routes: [
          {
            path: '/currentManagement/setting',
            redirect: '/currentManagement/setting/load/basicInfo',
          },
          {
            path: '/currentManagement/setting/:op/basicInfo',
            component: './CurrentManagement/Setting/BasicInfo',
          },
          {
            path: '/currentManagement/setting/:op/fileStorageInfo',
            component: './CurrentManagement/Setting/FileStorageInfo',
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
