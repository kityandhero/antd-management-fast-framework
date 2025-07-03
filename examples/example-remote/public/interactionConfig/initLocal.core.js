window.appInitCustomLocalCore = {
  layoutSetting: {
    colorPrimary: '#1677FF',
    contentWidth: 'Fluid',
    fixSiderbar: true,
    fixedHeader: false,
    layout: 'side',
    navTheme: 'light',
    siderMenuType: 'sub',
    splitMenus: false,
  },
  successCode: 200,
  authenticationFailCode: 2001,
  authenticationFailRedirectPath: '/entrance/signIn',
  authorizationFailRedirectPath: '/common/result/forbidden',
  // 远程登陆接口Url相对地址
  signInApi: 'entrance/signIn',
  metaDataApi: 'metaData/get',
  currentOperatorApi: 'currentOperator/get',
  currentOperatorSimulationData: {
    avatar:
      'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    name: 'simple user',
  },
  // 快捷历史导航栏
  useShortcutNavigation: true,
  applicationListData: [
    {
      key: '11',
      title: '本地导航',
      url: 'javascript:void(0)',
      target: '_blank',
      children: [
        {
          key: '121',
          icon: '/noImageSmall.png',
          title: '本地导航1',
          desc: '跨站点本地导航1',
          url: 'https://ant.design',
          target: '_blank',
        },
        {
          key: '122',
          icon: '/noImageSmall.png',
          title: '本地导航2',
          desc: '跨站点本地导航2',
          url: 'https://ant.design',
          target: '_blank',
        },
      ],
    },
  ],
  metaData: {
    mediaTypeList: [
      {
        flag: '10',
        name: '段落',
        availability: 1,
      },
      {
        flag: '20',
        name: '图片',
        availability: 1,
      },
      {
        flag: '30',
        name: '视频',
        availability: 1,
      },
      {
        flag: '40',
        name: '音频',
        availability: 1,
      },
      {
        flag: '50',
        name: '附件',
        availability: 1,
      },
    ],
    webChannelList: [
      {
        flag: '20000',
        name: '管理中心',
        availability: 1,
      },
      {
        flag: '21000',
        name: '地区管理后台',
        availability: 1,
      },
      {
        flag: '21100',
        name: '一件代发管理后台',
        availability: 1,
      },
      {
        flag: '53000',
        name: '供应商管理系统',
        availability: 1,
      },
    ],
    accessWayStatusList: [
      {
        flag: '-1',
        name: '未知',
        availability: 1,
      },
      {
        flag: '1',
        name: '上线',
        availability: 1,
      },
      {
        flag: '0',
        name: '下线',
        availability: 1,
      },
    ],
    simpleStatusList: [
      {
        flag: '-1',
        name: '未知',
        availability: 1,
      },
      {
        flag: '1',
        name: '上线',
        availability: 1,
      },
      {
        flag: '0',
        name: '下线',
        availability: 1,
      },
    ],
  },
};
