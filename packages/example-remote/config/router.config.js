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
    name: 'files',
    icon: 'reconciliation',
    path: '/files',
    routes: [
      {
        name: 'uploadHistory',
        icon: 'reconciliation',
        hideChildrenInMenu: true,
        path: '/files/uploadHistory',
        routes: [
          {
            path: '/files/uploadHistory',
            redirect: '/files/uploadHistory/pageList',
          },
          {
            path: '/files/uploadHistory/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/files/uploadHistory/pageList/no',
          },
          {
            path: '/files/uploadHistory/pageList/:pageKey',
            hideInMenu: true,
            component: './UploadHistory/PageList',
          },
        ],
      },
    ],
  },
  {
    name: 'messagePush',
    icon: 'read',
    path: '/messagePush',
    routes: [
      {
        name: 'weChatMessageRecord',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/messagePush/weChatMessageRecord',
        routes: [
          {
            path: '/messagePush/weChatMessageRecord',
            redirect: '/messagePush/weChatMessageRecord/pageList/no',
          },
          {
            path: '/messagePush/weChatMessageRecord/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './WeChatMessageRecord/PageList',
          },
        ],
      },
      {
        name: 'yonYouPushMessage',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/messagePush/yonYouPushMessage',
        routes: [
          {
            path: '/messagePush/yonYouPushMessage',
            redirect: '/messagePush/yonYouPushMessage/pageList/no',
          },
          {
            path: '/messagePush/yonYouPushMessage/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './YonYouPushMessage/PageList',
          },
          {
            path: '/messagePush/yonYouPushMessage/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './YonYouPushMessage/Edit',
            routes: [
              {
                path: '/messagePush/yonYouPushMessage/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './YonYouPushMessage/Edit/BasicInfo',
              },
              {
                path: '/messagePush/yonYouPushMessage/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/messagePush/yonYouPushMessage/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/messagePush/yonYouPushMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/messagePush/yonYouPushMessage/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './YonYouPushMessage/Edit/OperateLog/PageList',
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
    name: 'app',
    icon: 'appstore',
    path: '/app',
    routes: [
      {
        name: 'applicationSource',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/app/applicationSource',
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
              {
                path: '/app/applicationSource/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/app/applicationSource/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/app/applicationSource/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/app/applicationSource/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './ApplicationSource/Edit/OperateLog/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'application',
        icon: 'bars',
        hideChildrenInMenu: true,
        path: '/app/application',
        routes: [
          {
            path: '/app/application',
            redirect: '/app/application/pageList/no',
          },
          {
            path: '/app/application/pageList/:pageKey',
            name: 'pageList',
            hideInMenu: true,
            component: './Application/PageList',
          },
          {
            path: '/app/application/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Application/Edit',
            routes: [
              {
                path: '/app/application/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Application/Edit/BasicInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/applicationNavigation',
                name: 'applicationNavigation',
                routes: [
                  {
                    path: '/app/application/edit/:op/:id/:pageKey/applicationNavigation',
                    redirect:
                      '/app/application/edit/:op/:id/:pageKey/applicationNavigation/pageList',
                  },
                  {
                    path: '/app/application/edit/:op/:id/:pageKey/applicationNavigation/pageList',
                    component:
                      './Application/Edit/ApplicationNavigation/PageList',
                  },
                ],
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/customGlobalDataInfo',
                name: 'customGlobalDataInfo',
                component: './Application/Edit/CustomGlobalDataInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/pagePathInfo',
                name: 'pagePathInfo',
                component: './Application/Edit/PagePathInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/weChatApplicationInfo',
                name: 'weChatApplicationInfo',
                component: './Application/Edit/WeChatApplicationInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/weChatPayCertificateInfo',
                name: 'weChatPayCertificateInfo',
                component: './Application/Edit/WeChatPayCertificateInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/weChatMessageTemplateInfo',
                name: 'weChatMessageTemplateInfo',
                component: './Application/Edit/WeChatMessageTemplateInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/weChatMessageTargetPathInfo',
                name: 'weChatMessageTargetPathInfo',
                component: './Application/Edit/WeChatMessageTargetPathInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/articleNotificationInfo',
                name: 'articleNotificationInfo',
                component: './Application/Edit/ArticleNotificationInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/checkInInfo',
                name: 'checkInInfo',
                component: './Application/Edit/CheckInInfo',
              },
              {
                path: '/app/application/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/app/application/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/app/application/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/app/application/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './Application/Edit/OperateLog/PageList',
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
    name: 'data',
    icon: 'reconciliation',
    path: '/data',
    routes: [
      {
        name: 'tag',
        icon: 'tags',
        hideChildrenInMenu: true,
        path: '/data/tag',
        routes: [
          {
            path: '/data/tag',
            redirect: '/data/tag/pageList',
          },
          {
            path: '/data/tag/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/data/tag/pageList/no',
          },
          {
            path: '/data/tag/pageList/:pageKey',
            hideInMenu: true,
            component: './Tag/PageList',
          },
          {
            path: '/data/tag/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Tag/Edit',
            routes: [
              {
                path: '/data/tag/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Tag/Edit/BasicInfo',
              },
              {
                path: '/data/tag/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/data/tag/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/data/tag/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/data/tag/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './Tag/Edit/OperateLog/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'optionPool',
        icon: 'optionPools',
        hideChildrenInMenu: true,
        path: '/data/optionPool',
        routes: [
          {
            path: '/data/optionPool',
            redirect: '/data/optionPool/pageList',
          },
          {
            path: '/data/optionPool/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/data/optionPool/pageList/no',
          },
          {
            path: '/data/optionPool/pageList/:pageKey',
            hideInMenu: true,
            component: './OptionPool/PageList',
          },
        ],
      },
    ],
  },
  {
    name: 'news',
    icon: 'shop',
    path: '/news',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.section.pageList.permission,
    ],
    // hideChildrenInMenu: true,
    routes: [
      {
        path: '/news',
        redirect: '/news/section',
      },
      {
        name: 'section',
        icon: 'section',
        authority: [
          accessWayCollection.super.permission,
          accessWayCollection.section.pageList.permission,
        ],
        hideChildrenInMenu: true,
        path: '/news/section',
        routes: [
          {
            path: '/news/section',
            redirect: '/news/section/pageList',
          },
          {
            path: '/news/section/pageList',
            redirect: '/news/section/pageList/no',
          },
          {
            path: '/news/section/pageList/:pageKey',
            component: './Section/PageList',
          },
          {
            path: '/news/section/add',
            component: './Section/Add',
          },
          {
            path: '/news/section/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Section/Edit',
            routes: [
              {
                path: '/news/section/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Section/Edit/BasicInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/sectionApplicationConfig',
                name: 'sectionApplicationConfig',
                routes: [
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/sectionApplicationConfig',
                    redirect:
                      '/news/edit/:op/:id/:pageKey/sectionApplicationConfig/pageList',
                  },
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/sectionApplicationConfig/pageList',
                    component:
                      './Section/Edit/SectionApplicationConfig/PageList',
                  },
                ],
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/contentInfo',
                name: 'contentInfo',
                component: './Section/Edit/ContentInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/mediaInfo',
                name: 'mediaInfo',
                component: './Section/Edit/MediaInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/scoreInfo',
                component: './Section/Edit/ReadObtainScoreInfo',
              },
              {
                path: '/news/section/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/news/section/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/news/section/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './Section/Edit/OperateLog/PageList',
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
    name: 'organization',
    icon: 'deploymentUnit',
    path: '/organization',
    routes: [
      {
        name: 'subsidiary',
        icon: 'subsidiary',
        hideChildrenInMenu: true,
        path: '/organization/subsidiary',
        routes: [
          {
            path: '/organization/subsidiary',
            redirect: '/organization/subsidiary/pageList',
          },
          {
            path: '/organization/subsidiary/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/organization/subsidiary/pageList/no',
          },
          {
            path: '/organization/subsidiary/pageList/:pageKey',
            hideInMenu: true,
            component: './Subsidiary/PageList',
          },
          {
            path: '/organization/subsidiary/add',
            name: 'add',
            hideInMenu: true,
            component: './Subsidiary/AddBasicInfo',
          },
          {
            path: '/organization/subsidiary/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Subsidiary/Edit',
            routes: [
              {
                path: '/organization/subsidiary/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Subsidiary/Edit/BasicInfo',
              },
              {
                path: '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/organization/subsidiary/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './Subsidiary/Edit/OperateLog/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'department',
        icon: 'department',
        hideChildrenInMenu: true,
        path: '/organization/department',
        routes: [
          {
            path: '/organization/department',
            redirect: '/organization/department/pageList',
          },
          {
            path: '/organization/department/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/organization/department/pageList/no',
          },
          {
            path: '/organization/department/pageList/:pageKey',
            hideInMenu: true,
            component: './Department/PageList',
          },
          {
            path: '/organization/department/add',
            name: 'add',
            hideInMenu: true,
            component: './Department/AddBasicInfo',
          },
          {
            path: '/organization/department/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './Department/Edit',
            routes: [
              {
                path: '/organization/department/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './Department/Edit/BasicInfo',
              },
              {
                path: '/organization/department/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/organization/department/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/organization/department/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/organization/department/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './Department/Edit/OperateLog/PageList',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'graph',
        icon: 'graph',
        hideChildrenInMenu: true,
        path: '/organization/graph',
        routes: [
          {
            path: '/organization/graph',
            redirect: '/organization/graph/graphicalTree',
          },
          {
            path: '/organization/graph/graphicalTree',
            name: 'graphicalTree',
            hideInMenu: true,
            component: './Organization/GraphicalTree',
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
              {
                path: '/permission/presetRole/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/permission/presetRole/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/permission/presetRole/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/permission/presetRole/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './PresetRole/Edit/OperateLog/PageList',
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
                path: '/person/user/edit/:op/:id/:pageKey/parentInfo',
                name: 'parentInfo',
                component: './User/Edit/ParentInfo',
              },
              {
                path: '/person/user/edit/:op/:id/:pageKey/signetInfo',
                name: 'signetInfo',
                component: './User/Edit/SignetInfo',
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
        name: 'signet',
        icon: 'user',
        hideChildrenInMenu: true,
        path: '/person/signet',
        routes: [
          {
            path: '/person/signet',
            redirect: '/person/signet/pageList',
          },
          {
            path: '/person/signet/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/person/signet/pageList/no',
          },
          {
            path: '/person/signet/pageList/:pageKey',
            hideInMenu: true,
            component: './User/PageListSignet',
          },
        ],
      },
      {
        name: 'userYonYouCorrelation',
        icon: 'user',
        hideChildrenInMenu: true,
        path: '/person/userYonYouCorrelation',
        routes: [
          {
            path: '/person/userYonYouCorrelation',
            redirect: '/person/userYonYouCorrelation/pageList',
          },
          {
            path: '/person/userYonYouCorrelation/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/person/userYonYouCorrelation/pageList/no',
          },
          {
            path: '/person/userYonYouCorrelation/pageList/:pageKey',
            hideInMenu: true,
            component: './UserYonYouCorrelation/PageList',
          },
          {
            path: '/person/userYonYouCorrelation/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './UserYonYouCorrelation/Edit',
            routes: [
              {
                path: '/person/userYonYouCorrelation/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './UserYonYouCorrelation/Edit/BasicInfo',
              },
              {
                path: '/person/userYonYouCorrelation/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/person/userYonYouCorrelation/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/person/userYonYouCorrelation/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/person/userYonYouCorrelation/edit/:op/:id/:pageKey/operateLog/pageList',
                    component:
                      './UserYonYouCorrelation/Edit/OperateLog/PageList',
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
    name: 'account',
    icon: 'team',
    path: '/account',
    routes: [
      {
        name: 'masterManager',
        icon: 'masterManager',
        hideChildrenInMenu: true,
        path: '/account/masterManager',
        routes: [
          {
            path: '/account/masterManager',
            redirect: '/account/masterManager/pageList',
          },
          {
            path: '/account/masterManager/pageList',
            name: 'pageList',
            icon: 'bars',
            redirect: '/account/masterManager/pageList/no',
          },
          {
            path: '/account/masterManager/pageList/:pageKey',
            hideInMenu: true,
            component: './MasterManager/PageList',
          },
          {
            path: '/account/masterManager/edit/:op/:id/:pageKey',
            name: 'edit',
            hideInMenu: true,
            component: './MasterManager/Edit',
            routes: [
              {
                path: '/account/masterManager/edit/:op/:id/:pageKey/basicInfo',
                name: 'basicInfo',
                component: './MasterManager/Edit/BasicInfo',
              },
              {
                path: '/account/masterManager/edit/:op/:id/:pageKey/operateLog',
                name: 'operateLog',
                routes: [
                  {
                    path: '/account/masterManager/edit/:op/:id/:pageKey/operateLog',
                    redirect:
                      '/account/masterManager/edit/:op/:id/:pageKey/operateLog/pageList',
                  },
                  {
                    path: '/account/masterManager/edit/:op/:id/:pageKey/operateLog/pageList',
                    component: './MasterManager/Edit/OperateLog/PageList',
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
            name: 'basicInfo',
            component: './CurrentManagement/Setting/BasicInfo',
          },
          {
            path: '/currentManagement/setting/:op/fileStorageInfo',
            name: 'fileStorageInfo',
            component: './CurrentManagement/Setting/FileStorageInfo',
          },
          {
            path: '/currentManagement/setting/:op/smsInfo',
            name: 'smsInfo',
            component: './CurrentManagement/Setting/SmsInfo',
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
