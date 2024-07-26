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
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/workbench',
      },
      {
        path: '/dashboard/workbench',
        name: 'workbench',
        // icon: 'bars',
        component: './Workbench',
      },
    ],
  },
  {
    path: '/simple',
    name: 'simple',
    icon: 'bars',
    access: 'checkAccess',
    authority: [
      accessWayCollection.super.permission,
      accessWayCollection.simple.pageList.permission,
    ],
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
        authority: [
          accessWayCollection.super.permission,
          accessWayCollection.simple.addBasicInfo.permission,
        ],
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
    path: '/list',
    name: 'list',
    icon: 'bars',
    routes: [
      {
        path: '/list',
        redirect: '/list/tableView',
      },
      {
        name: 'tableView',
        icon: 'bars',
        path: '/list/tableView',
        routes: [
          {
            path: '/list/tableView',
            redirect: '/list/tableView/normal',
          },
          {
            path: '/list/tableView/normal',
            name: 'normal',
            component: './List/TableView',
          },
          {
            path: '/list/tableView/tableSelectButtonView',
            name: 'tableSelectButtonView',
            component: './List/TableSelectButtonView',
          },
          {
            path: '/list/tableView/tableSelectDropDownView',
            name: 'tableSelectDropDownView',
            component: './List/TableSelectDropDownView',
          },
          {
            path: '/list/tableView/tableSelectDropDownButtonView',
            name: 'tableSelectDropDownButtonView',
            component: './List/TableSelectDropDownButtonView',
          },
        ],
      },
      {
        path: '/list/listView',
        name: 'listView',
        icon: 'bars',
        useMini: true,
        component: './List/ListView',
      },
      {
        path: '/list/noneSearch',
        name: 'noneSearch',
        icon: 'bars',
        useMini: true,
        component: './List/NoneSearch',
      },
      {
        path: '/list/overlay',
        name: 'overlay',
        icon: 'bars',
        useMini: true,
        component: './List/Overlay',
      },
      {
        path: '/list/overlayStyle',
        name: 'overlayStyle',
        icon: 'bars',
        useMini: true,
        component: './List/OverlayStyle',
      },
      {
        path: '/list/overlayInner',
        name: 'overlayInner',
        icon: 'bars',
        useMini: true,
        component: './List/OverlayInner',
      },
    ],
  },
  {
    path: '/form',
    name: 'form',
    icon: 'bars',
    routes: [
      {
        path: '/form/normalView',
        name: 'normalView',
        icon: 'bars',
        useMini: true,
        component: './Form/NormalView',
      },
      {
        path: '/form/radioView',
        name: 'radioView',
        icon: 'bars',
        useMini: true,
        component: './Form/RadioView',
      },
      {
        path: '/form/selectView',
        name: 'selectView',
        icon: 'bars',
        useMini: true,
        component: './Form/SelectView',
      },
      {
        path: '/form/uploadView',
        name: 'uploadView',
        icon: 'bars',
        useMini: true,
        component: './Form/UploadView',
      },
      {
        path: '/form/dataView',
        name: 'dataView',
        icon: 'bars',
        useMini: true,
        component: './Form/DataView',
      },
      {
        path: '/form/gridView',
        name: 'gridView',
        icon: 'bars',
        useMini: true,
        component: './Form/GridView',
      },
      {
        path: '/form/toolbarView',
        name: 'toolbarView',
        icon: 'bars',
        useMini: true,
        component: './Form/ToolbarView',
      },
      {
        path: '/form/editorView',
        name: 'editorView',
        icon: 'bars',
        useMini: true,
        component: './Form/EditorView',
      },
      {
        path: '/form/highlighterView',
        name: 'highlighterView',
        icon: 'bars',
        useMini: true,
        component: './Form/HighlighterView',
      },
      {
        path: '/form/selectButtonView',
        name: 'selectButtonView',
        icon: 'bars',
        useMini: true,
        component: './Form/SelectButtonView',
      },
      {
        path: '/form/selectFieldView',
        name: 'selectFieldView',
        icon: 'bars',
        useMini: true,
        component: './Form/SelectFieldView',
      },
      {
        path: '/form/flowView',
        name: 'flowView',
        icon: 'bars',
        useMini: true,
        component: './Form/FlowView',
      },
      {
        path: '/form/treeView',
        name: 'treeView',
        icon: 'bars',
        useMini: true,
        component: './Form/ElasticityTreeView',
      },
    ],
  },
  {
    path: '/interaction',
    name: 'interaction',
    icon: 'bars',
    routes: [
      {
        path: '/interaction',
        redirect: '/interaction/modelView',
      },
      {
        path: '/interaction/animalView',
        name: 'animalView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/AnimalView',
      },
      {
        path: '/interaction/modelView',
        name: 'modelView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/ModalView',
      },
      {
        path: '/interaction/drawerView',
        name: 'drawerView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/DrawerView',
      },
      {
        path: '/interaction/designView',
        name: 'designView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/DesignView',
      },
      {
        path: '/interaction/formLayoutView',
        name: 'formLayoutView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/FormLayoutView',
      },
      {
        path: '/interaction/toolBarView',
        name: 'toolBarView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/ToolBarView',
      },
      {
        path: '/interaction/functionExtraView',
        name: 'functionExtraView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/FunctionExtraView',
      },
      {
        path: '/interaction/functionComponentView',
        name: 'functionComponentView',
        icon: 'bars',
        useMini: true,
        component: './Interaction/FunctionComponentView',
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
