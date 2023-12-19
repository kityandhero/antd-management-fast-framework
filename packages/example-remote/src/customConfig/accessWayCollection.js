export const accessWayCollection = {
  super: {
    title: '超级管理员',
    paramsKey: '1b3231655cebb7a1f783eddf27d254ca',
    permission: 'super',
  },
  accessWay: {
    pageList: {
      title: '模块列表',
      paramsKey: '7e0f8d0d06119cad056fef2334e6c805',
      permission: 'caa7bb0592ce4a3b85fcc21b6706c9f4',
    },
    pageListAssemblyVerify: {
      title: '程序集检测异常列表',
      paramsKey: '0c8cc3e62cddb1b8f9d1e4ed94cd7b73',
      permission: '19f7172e8386472099a12d2ec4b8b8aa',
    },
    get: {
      title: '模块详情',
      paramsKey: '1ef2724312cf26149e7831cc8bcdf73a',
      permission: '423bd34144764ca28b03f5e054744cd0',
    },
    getPermissionFileContent: {
      title: '获取前端权限配置文件内容',
      paramsKey: '80f312e0ac8dfa3f34fc9f84368b1c8b',
      permission: 'be42e054314642ce9598a56e716ccfeb',
    },
    getModelConfigFileContent: {
      title: '获取前端Model配置文件内容',
      paramsKey: '27df5bccc5ddc30c514a07b1d3997ccb',
      permission: 'fb0248222ecd4fa4836389935cec3ed4',
    },
    getActionMap: {
      title: '获取ActionMap',
      paramsKey: '84a8ca459cc2c273c157ab246e5ac384',
      permission: 'f40edba750d7422cb4280174bb238260',
    },
    getPermissionActionMap: {
      title: '获取鉴权ActionMap',
      paramsKey: '123853f09811cebd28640193fbb6b525',
      permission: '3cf29782b9c04d0b996fd77505616d0c',
    },
    getNonePermissionActionMap: {
      title: '获取无需鉴权ActionMap',
      paramsKey: '332aa80224ad8b835e102c8b913c78b4',
      permission: '6a8cc41dc9384071999171ffa2ead2be',
    },
    testPermissionActionUnique: {
      title: '测试权限唯一性',
      paramsKey: '57278f424bb4517267392271153d3571',
      permission: '1167009ff3f84eb5bf395a4e16477310',
    },
    testPermissionAction: {
      title: '测试鉴权Action',
      paramsKey: '9c6a2ade659b5e4c443b476ba0612a89',
      permission: 'b9ac466b3542401bbc6001cdbb45a61a',
    },
    remove: {
      title: '移除',
      paramsKey: '15d0db9e9bee6d3224237564becebaa8',
      permission: 'b8161211fa8642a5a0abe2baa6503478',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '9f5797d2c213fc56b4f1361b9f7b15ac',
      permission: '6f92eafb858441d2a155ac82116d7fbd',
    },
  },
  administrativeDivision: {
    pageList: {
      title: '地区列表',
      paramsKey: 'ab1c8083d52d3f07f6d3b81e47803658',
      permission: 'a8ffaed3293e486eb0c64ebba61c6242',
    },
    get: {
      title: '地区详情',
      paramsKey: '5f569d0a4514f603d6804c96e89dff2f',
      permission: 'ff7c22b7ae0f4a86834da81ac8baeb9f',
    },
    updateBasicInfo: {
      title: '编辑基本信息',
      paramsKey: 'ea29d2522148c88dfd4ff31a191d05b9',
      permission: '4a280e5b8e384fef9a68633ea8149b17',
    },
    updateLocationInfo: {
      title: '编辑位置信息',
      paramsKey: 'a28079f28ae914d3ce15c7b2453b37ad',
      permission: '9d7c18af79924bdbbc12cb33b82e19a3',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'f074d9a98bb7cab2c5f3a46aaefa31b1',
      permission: 'ff1522fc437a4b66822bfe66316c9236',
    },
  },
  application: {
    pageList: {
      title: '应用列表',
      paramsKey: 'bfa2378a8a696de5cb4cfbd77f4c9419',
      permission: 'a6910d0b30554237b2b8ad9360b130c2',
    },
    singleList: {
      title: '已开通应用单列表',
      paramsKey: '5d4634180ec68e95fa9789fe14869765',
      permission: 'e27eec63fa6442348f7f77ded7d2ca79',
    },
    get: {
      title: '平台详情',
      paramsKey: '9d8cc0870e04d2cbaad7a16f38c1c62f',
      permission: 'e49c8d76fc5e476d8f5efeb85817feb5',
    },
    getPagePathConfig: {
      title: '首页路径配置',
      paramsKey: '93a7e76883969d930bc0bf4cf0e5c0df',
      permission: '9cb984a291884e3ba40adfc9a14f6825',
    },
    getWeChatMessageTemplateConfig: {
      title: '微信消息模板配置',
      paramsKey: '42bc5b9321ad05d1ca523c91520db9ec',
      permission: '8408b3884ae0490d9ba2f75e7926aa8a',
    },
    getWeChatMessageTargetPathConfig: {
      title: '微信消息跳转路径配置',
      paramsKey: 'b6c4651e12a64f45e22cf47750279a7c',
      permission: '32f52aa734c74b3ebe9b51ec55240f22',
    },
    getArticleNotificationConfig: {
      title: '文章推送配置',
      paramsKey: 'f55b4e7663972e7a42366c7b1a11e94a',
      permission: '61630f95d998460088f2d15e8b0bfdb7',
    },
    getCheckInConfig: {
      title: '签到配置',
      paramsKey: '6c1062c5345df2eed748ccb05607ce1b',
      permission: '74fef469f20b47e4accfc442ca1eba47',
    },
    getJiGuangConfig: {
      title: '极光配置',
      paramsKey: '615a9190c39bd336f695b8caa66548d5',
      permission: 'a640f16cfc654cdeae2624beedc909c3',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '5ae6d61379b817cb192c9258787355c4',
      permission: '024cc740b4de46b0bcc2884fee6cd4b6',
    },
    updateWeChatApplicationInfo: {
      title: '配置微信应用',
      paramsKey: '0839069a5063148b417cf406c9a570fe',
      permission: 'd88fdfcbf1344780bb93a162d06aecc7',
    },
    updateWeChatPayCertificateInfo: {
      title: '设置微信支付',
      paramsKey: '386a30029b3923c9aad7f1e398e896c5',
      permission: 'c2070e5a5f0c4fcd8c5cd1b0cfc38049',
    },
    updateKeyValueInfo: {
      title: '设置应用键值配置',
      paramsKey: '2668b95d1a543916c20418c4ec0a9b68',
      permission: 'ad9ffc6b56194b3a8cc0871d0b71df93',
    },
    updateMessageChannelApplicationInfo: {
      title: '关联消息应用',
      paramsKey: 'e89344ab356d4a847f23a7a64b4e7482',
      permission: 'f03bebe7d5104993bbb5eab95a30d1bd',
    },
    setStart: {
      title: '开始运营',
      paramsKey: '45dab4a3fb732790f9730a9fd843b589',
      permission: '11de8d6c328e4afa863b29262bffc0d4',
    },
    setStop: {
      title: '停止运营',
      paramsKey: '6db218bb5b5adefae9e902e5ba250c8b',
      permission: '9fa53783ecc949049f6c466b7eaf25e6',
    },
    setOwn: {
      title: '开通应用',
      paramsKey: 'c96ee5e961a14782cd9d3b97e6027dd1',
      permission: '035766d831554cb5879994a9b3534179',
    },
    testJiGuangSendDevice: {
      title: '测试发送极光推送',
      paramsKey: 'a82421f5d282276b4ad229edd88cd066',
      permission: 'e09a448f40fb409c9ab6d41c9f4d8052',
    },
    testSendWechatTemplateMessage: {
      title: '测试发送微信公众号模板消息',
      paramsKey: 'e2c47ec9eb4f99b1cd6b6e8539a2f8bc',
      permission: '95827e22562d4cb3b6b7dda40a4d68d8',
    },
    testSendWechatUniformMessage: {
      title: '测试发送微信统一服务消息',
      paramsKey: 'ed89b7eea5381f1f3720d62b15411ebc',
      permission: 'e0930e71f527460eaf26610c2e9597c4',
    },
    testSendSmsCaptcha: {
      title: '测试验证码短信',
      paramsKey: '8b25818d6e91eb2ed83d87fcb17acc64',
      permission: 'f3c7ef39d16b4db0bd9e208726ad41f4',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'fb106bb720c2570e7ea3b7356153014d',
      permission: 'fbdee7b5a12b4a9bbb05def91c2ffb38',
    },
    uploadCertificate: {
      title: '上传证书文件',
      paramsKey: 'f4c09f7c57614d7c75f797f71b6e2107',
      permission: 'f773d5f89364490b9c24bff581fc56d1',
    },
    getCustomGlobalData: {
      title: '获取自定义数据',
      paramsKey: 'f0b2fc4097a5bc772971b110fbb7a9f7',
      permission: 'd0a630333be5455d9d5787a046b3f100',
    },
    getCustomGlobalDataItem: {
      title: '获取自定义数据项',
      paramsKey: '91d518387881edc256f1cc4d7aa5db9e',
      permission: '107765a5fe9a4cf2998fa58296c13dbd',
    },
    addCustomGlobalDataItem: {
      title: '增加自定义数据项',
      paramsKey: 'e8346993e4a6dd16bb25edfa58480c5b',
      permission: '9c2eec3d909f4e4f9518063f3aa5bb3b',
    },
    updateCustomGlobalDataItem: {
      title: '更新自定义数据项',
      paramsKey: '745a0ebc34ba928b875d2971439f2d95',
      permission: 'bfcb4eaf2b9e43fab8955e94cc766d53',
    },
    removeCustomGlobalDataItem: {
      title: '移除自定义数据项',
      paramsKey: 'f819319ae946f0dbd5a1a3a60880e807',
      permission: 'e2197a6426f1450a82d75a3eb004573d',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '67c33ae27788071516e83d5a23e0dd96',
      permission: 'ce4be1a642c64abe885975759fa3c796',
    },
  },
  applicationNavigation: {
    pageList: {
      title: '导航配置列表',
      paramsKey: '315e150ff2e2fbbafdb5dfb21ae0823e',
      permission: '45427cdaee944822902a13427656568a',
    },
    get: {
      title: '导航配置详情',
      paramsKey: '715bac5fc9a5a643c2b920e44be40fd7',
      permission: 'cb5f2f0b816f45a092c543296a220850',
    },
    addBasicInfo: {
      title: '新增基础信息',
      paramsKey: '780e95d99c1f2bf4c749604df4ad0080',
      permission: 'd9e9aceb279a472fa365bf1a5385ec1e',
    },
    updateBasicInfo: {
      title: '更新基础信息',
      paramsKey: 'b99d2ff738f410c7d2e1e43dba1885a5',
      permission: 'a610300e7b1d4439b4285b0df6184517',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'a3a466e323792af9a0005db86d164d57',
      permission: '25bd9e60f3ee4c12b016ae8689ab8da3',
    },
    remove: {
      title: '移除导航',
      paramsKey: 'f4a5c6a9d6e91a67c8fe0c78ae11582c',
      permission: 'ac2748687b994a8ba1739a2214fa15bd',
    },
    getNavigationItem: {
      title: '获取导航条目',
      paramsKey: 'bcd0842a0d0bce252fd4cade0f626b9f',
      permission: '82ff09ac7dc843459c4860bdd413fa8c',
    },
    addNavigationItem: {
      title: '增加导航条目',
      paramsKey: '02be9b63e70f4b02e51cbbba57638732',
      permission: '35185a9dae254041a7d36207f2c3fdef',
    },
    updateNavigationItem: {
      title: '更新导航条目',
      paramsKey: '4052541cefe616c3b8206d2bb13bf38f',
      permission: '235415d4dfb44b309e7401f9a5ec8c97',
    },
    setNavigationCollectionSort: {
      title: '设置导航条目顺序',
      paramsKey: 'ff46064bdd4021a35defbedd904911e2',
      permission: '6fde79c24eab4659835de7171a10623b',
    },
    removeNavigationItem: {
      title: '移除导航条目',
      paramsKey: 'ccb6d2b82feab63bbc4cbbafeae3ac51',
      permission: 'e1dff1bbca0a4014a71297a5e2ccf8be',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '8bd75a8e1653f9c970055b45260553bb',
      permission: '754dfde152cd4c4b942934c1c32228c5',
    },
  },
  applicationSource: {
    pageList: {
      title: '应用源列表',
      paramsKey: 'aedf4271279fb7f8484cecaef38cb151',
      permission: 'cf6dbb6965f547a08c6b29a752cc84bc',
    },
    singleList: {
      title: '应用源列表',
      paramsKey: 'be186f4a295f68a09418c62a72d6ec20',
      permission: '616093b00f18440694bcea021ec410f4',
    },
    pageListLog: {
      title: '操作日志列表',
      paramsKey: '31e3894c94db1d27f8480cc3be777f14',
      permission: '7caa0bdc9cfb4f5ebbfe1c8208cd9c76',
    },
    get: {
      title: '平台详情',
      paramsKey: 'efbcf82a02410227cebebaab80386c48',
      permission: '40a38dd8884e43d2b78b62ac519332c9',
    },
    addBasicInfo: {
      title: '新增应用源',
      paramsKey: 'facb9345c5b4110b4b7d1adf7566883a',
      permission: '8cb182b7297c4e608ecb91616ee6251e',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '315595a6be2bd3d69dc906f0a9ac60ff',
      permission: '30509c1be6674d87afac7f3b76b5bb12',
    },
    setEnable: {
      title: '开始运营',
      paramsKey: '850ef4c50b66dd6cee50c45a18ad9fea',
      permission: '280cebfcd876400099ede64aa2203598',
    },
    setDisable: {
      title: '停止运营',
      paramsKey: 'aba759e453c68ea7e4e7f1775854c17d',
      permission: 'dc7957ce92294e9c8671df92bda1f5f8',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '16b50cbee2946f505753148a957c4f05',
      permission: 'f7e9820c7c574442bf3573a2d9bc8b78',
    },
    uploadImage: {
      title: '上传图片文件',
      paramsKey: '5df2aab408ab9d57c61214a8f9f42c60',
      permission: 'e7313eacb22048c2bcb803b432fd0aad',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '246f040f2f1c4a048a808e5189a2395a',
      permission: '34e2756badde440abd929d35f40642fd',
    },
  },
  applicationVersion: {
    pageList: {
      title: '版本列表',
      paramsKey: '34cded45a7ec18357ad34d5e343e3482',
      permission: 'dd80922beeb449adbf583d42144c4413',
    },
    singleList: {
      title: '版本列表',
      paramsKey: '5b662c35c5b9a9e3eae6a295218f1a58',
      permission: 'e3036405d05142f2a911ba2344343f4b',
    },
    pageListLog: {
      title: '操作日志列表',
      paramsKey: '630811e2f8d611c21d873cefaa88a1e6',
      permission: '0b4e68c92fd64501a82641e914f15479',
    },
    get: {
      title: '版本详情',
      paramsKey: '5f7a97379037972e8c47a236c9ef2b5f',
      permission: '2be8d0995d664bdb8aa3dafcfc6a24bb',
    },
    addBasicInfo: {
      title: '新增版本',
      paramsKey: '01bf2586fb35f5329e4ac036bb048aa4',
      permission: '06969d388b78468da3c583a1c1616eff',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '46069b74190fdbe758b023a6bb8d9f98',
      permission: '7c0cb0e526dd48429c911f3948ad5a5c',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'c2f90fd883895ee63039dc05c38543b9',
      permission: '0ecf44c14255480fbc202799d0abaa04',
    },
    setDisable: {
      title: '设为停用',
      paramsKey: 'f139ffb64485c19129952c39fbd7a4d4',
      permission: 'ba496f9d38e445b29b5bbaf14502fa66',
    },
    remove: {
      title: '移除',
      paramsKey: 'f32ab047d9be4f140f9663a0152d7632',
      permission: '1aa26260239b4e1cb7cf56b9a01d8cbe',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '509d4a87ff6d91765d35ceb3505853ff',
      permission: 'a6dcbcfb93d2410d8e0666ea417a1061',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '8c09325c938b666c43140e19aca5faec',
      permission: '4071c77a526b4b98a32eed0e1cf76544',
    },
  },
  articleNotificationApplication: {
    pageList: {
      title: '设置列表',
      paramsKey: '54befb83b89f9ff095cc302b98234e3b',
      permission: 'd64d6d20eb1d4c71a381806e7ea13a39',
    },
    get: {
      title: '设置详情',
      paramsKey: 'd6949781f33e6b27d06e21013aef25ae',
      permission: '8088ee2227c14aceb7900ec0ee02eeb7',
    },
    addBasicInfo: {
      title: '新增设置',
      paramsKey: 'ba5ae44c1cffbaf29ae2840803cd60ed',
      permission: '2bf1169e293c4fb0ac41961b2e1197d9',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '1c3a147f418c646d6da349a3715cb72d',
      permission: '5116fbfe4e2443288047e1c86b38601f',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '8aaff1fd9e2de337ebee7f8f87e775fc',
      permission: 'aa8d3178388d44f2a2bd2eac0c5e5155',
    },
  },
  channelExecuteLogSwitch: {
    pageList: {
      title: '开关分页列表',
      paramsKey: 'f10c517c09c11a460d5d62fa3f119963',
      permission: 'd5bae7b1222c4c08905c702d6ae6cf63',
    },
    singleList: {
      title: '开关单页列表',
      paramsKey: '309120db21a4029c0cde890a88f69536',
      permission: 'f57ad482becd49438157599aa20aee7e',
    },
    get: {
      title: '开关详情',
      paramsKey: '50184b2a737e28df60ac95f359af0f88',
      permission: '69b5f6cdd4bb49cba2ee047fcaf38bc5',
    },
    updateKeyValueInfo: {
      title: '设置键值配置',
      paramsKey: 'b0573fd7e66cd89fb534e0f3be03dd60',
      permission: '91fbe3ad1ce84dcea266c619fa84878d',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '780bc0cc2e2837090c05a4f2c977fd10',
      permission: '4deeabfb0559478c9395dc0dcb9b3162',
    },
  },
  channelSqlLogSwitch: {
    pageList: {
      title: '开关分页列表',
      paramsKey: '7415d3b102421de0faf239a09602662a',
      permission: '5507c240c747406f9787530663812b12',
    },
    singleList: {
      title: '开关单页列表',
      paramsKey: 'f6a92e6524bdd78adae7f0bbacbe1e6f',
      permission: 'e3a65e7c098f4ac5a78458e5c33365ff',
    },
    get: {
      title: '平台详情',
      paramsKey: '5aaaece56e4407b50a9d8a9f367200e2',
      permission: '15434b3c2c40413cab40c370b9a5c87a',
    },
    updateKeyValueInfo: {
      title: '设置键值配置',
      paramsKey: '7486a7d020b8503410284cbd9da15520',
      permission: '3de250a05e0c46409f0192187942df50',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '52829db540cb530ece3cddc4fed8d8f3',
      permission: '3df6467669924aab8fe60bc874e0e901',
    },
  },
  cloudStorage: {
    pageList: {
      title: '文件列表',
      paramsKey: '41f5b9ab5e5df24bfe22e5df202e8214',
      permission: '53bd06f5e15b465f98d905514dca82b5',
    },
    get: {
      title: '文件详情',
      paramsKey: 'd5fcba460423931cbdf780af542717f7',
      permission: 'dfb78791619644fa96d20f8409b8a452',
    },
    addBasicInfo: {
      title: '新增信息',
      paramsKey: '1abf4f434506e0588ce31bf4a5b6c9ba',
      permission: '212fdb9a510d4bbe8d562345a07865d0',
    },
    remove: {
      title: '移除',
      paramsKey: '7b36acb30a92a17f90c186acf3c58012',
      permission: 'e638cc6df7654eb091d5083d685aa246',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'cd689f6fae88304efdd36a972d72e1df',
      permission: '9d81032b784c4a47bd450e8f23904d2b',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '3feac8a83b5dd955179cf1c3a962075b',
      permission: '27b315037dbc46ad807ee103e463bfc9',
    },
  },
  currentManagement: {
    pageListDefaultImage: {
      title: '默认图片配置单页列表',
      paramsKey: '71ac638cfc1986acccc8266814abe619',
      permission: '182c35a418f34e56848c21bc1ab955ba',
    },
    updateBasicInfo: {
      title: '设置基本信息',
      paramsKey: '9c86b5fcf84838519157227fc36c7998',
      permission: 'a48199e80db84204a5cab9fc4ea1869e',
    },
    updateFileStorageInfo: {
      title: '设置主控七牛云信息',
      paramsKey: 'fe39c7ad35a866c8e367d5d5f4209bd6',
      permission: '1e0471103f5a41dea0d9d20a924b55c9',
    },
    updateSmsInfo: {
      title: '设置短信发动信息',
      paramsKey: '40700d504269efc1762a1239fb94bdf8',
      permission: '8ed7d6f518af430e8e281ced2eca2ecd',
    },
    updateFlowDebugUserId: {
      title: '设置流程调试用户标识',
      paramsKey: 'd738f282db02d6f9d7c56d5d7a92036d',
      permission: '51007e4409124e449bcf6b3ee1ab35bf',
    },
    updateSecretKeyInfo: {
      title: '设置系统密钥',
      paramsKey: '72c56e9b4f7accd15ad31eb22d1dc4ca',
      permission: '530444a97aa1479aa9325ebb90308c34',
    },
    updateYonYouKeyInfo: {
      title: '设置用友密钥',
      paramsKey: 'c400e69be9ebb364bae6efaca488a25f',
      permission: 'dba9fbfc1aba40359853c326998650e8',
    },
    updateKeyValueInfo: {
      title: '设置键值配置',
      paramsKey: '5837b75adf70493bf41ae0ae3ce100d2',
      permission: 'ac97e654ab0644f89b5a4b29df9eae74',
    },
    refreshKeyValueCache: {
      title: '刷新键值配置缓存',
      paramsKey: 'b9ed2abb23504a612ba799738a9742fb',
      permission: '5a4760973ff34d67a9a1eb391125c0c4',
    },
    toggleQiniuImageSwitch: {
      title: '切换七牛云图片转存开关',
      paramsKey: 'ddf03053e6d7a620107ecc3ab9e53853',
      permission: 'e62f54e9a3f64a67a28b2db5beb2334b',
    },
    toggleQiniuAudioSwitch: {
      title: '切换七牛云音频转存开关',
      paramsKey: '5a715720ce52b93e49a3f12fdef2a045',
      permission: 'feefee1ef3174adda1e03f08c533692e',
    },
    toggleQiniuVideoSwitch: {
      title: '切换七牛云视频转存开关',
      paramsKey: 'a946e40676295dddcee0cca8d1596b2b',
      permission: '37c1e86cb6b741e2939d2c2b726be6b9',
    },
    toggleQiniuFileSwitch: {
      title: '切换七牛云文件转存开关',
      paramsKey: '075b5c2e1669133728af5bcb205f031f',
      permission: '8c7299286a504ceaba9fa9d95626eeea',
    },
    testSecretKey: {
      title: '测试系统密钥',
      paramsKey: 'e9051e897fe7b54b7bbc8f6a65ea1599',
      permission: 'cd6bebf2d99b413dac051242763bcd89',
    },
    uploadImage: {
      title: '上传图片',
      paramsKey: 'd20506e5bccd57c680d26c758909c883',
      permission: 'd66e8c15d42542fb8052dfc8ce55e9d3',
    },
  },
  department: {
    pageList: {
      title: '分页列表',
      paramsKey: 'c3d37f4e672f3f6b39184c7a2302a2a6',
      permission: '957e48a4b2ed4b6d998313643b471b07',
    },
    get: {
      title: '部门详情',
      paramsKey: '5963788af66d6ea751a1bda6ade16135',
      permission: 'f17c937e77bc45199adde1e26f6f97ba',
    },
    addBasicInfo: {
      title: '更新信息',
      paramsKey: 'e67820d88a4d77e3c06c44659b873317',
      permission: 'e6f107cdaee14ba3adbe0f01782c3774',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '65f9021999648b6d8c038602699ff6b4',
      permission: '74c9c572258741dfa35edef0d27ec568',
    },
    updateParentId: {
      title: '更新上级部门',
      paramsKey: 'df896efd6e316be7bb4777b159f0764f',
      permission: '46d6b271409c40b7a4d9caa9076af819',
    },
    updateSubsidiaryId: {
      title: '更新所属子公司',
      paramsKey: '5e0c498ef415b824f0583f833ee7e81e',
      permission: '034d6a52241e4e21ae000db90e3fb536',
    },
    updateSort: {
      title: '更新排序值',
      paramsKey: '5e712a29e1ba96257889b357a45384d7',
      permission: 'b3c68f74f55b4fa0a08797ee974937b9',
    },
    setNormal: {
      title: '设为正常',
      paramsKey: '6058d8b99c005fee9dd49002608434e1',
      permission: 'b5d3df6ca8574443af3891dd7c921e86',
    },
    setInvalid: {
      title: '设为无效',
      paramsKey: 'c942447954aa33b1187023b59d4f8698',
      permission: '1ace5d4eb4cb4e959c2300ac16d7f7d2',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '7bfed65616d327f7261a4d2052ac03bb',
      permission: '481c1126b08b4b4686b40d9e3b0c3ad6',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'aef063b748471b84315d999ee7b32082',
      permission: 'e47326447d5c4221b79faba3ccf8a796',
    },
  },
  errorLog: {
    pageList: {
      title: '日志列表',
      paramsKey: 'f7f8013d157462f198b75772861af658',
      permission: '01fa04253c48426b9eb1e6d2e898766e',
    },
    get: {
      title: '日志详情',
      paramsKey: '05c003af4d0f4af90c376a388f3b5c7f',
      permission: 'b36eca5060954f2b988eed178fa1a1a0',
    },
    remove: {
      title: '删除日志',
      paramsKey: 'ff0a397e4dfee32126700342a280b303',
      permission: '6fd630ebc7824bd4b21d9bf13d158375',
    },
    removeMulti: {
      title: '批量删除日志',
      paramsKey: '0a72628cc1bd1f9794f3844340e66b5f',
      permission: '3228c1f5e2e146948268dca4750df623',
    },
    removeAll: {
      title: '全量删除日志',
      paramsKey: 'c6f0f1fc991dc4864b08bd22cbbdcd54',
      permission: 'b5805dff50e941eb91d7595286408fd9',
    },
  },
  executeLog: {
    pageList: {
      title: '分页列表',
      paramsKey: '440e47c623e1afcfccd415b826039eba',
      permission: '8b98523ccdcf477eb5c0816b675d9364',
    },
    get: {
      title: '获取详情',
      paramsKey: 'f7f90fb29e548fed45e119f1ffbec480',
      permission: '71c20351e5734fc98f1e02c7e8aa0c34',
    },
    remove: {
      title: '删除日志',
      paramsKey: '03bb68dc3627c94ad59fe71f5cbd8f3d',
      permission: '84edde6fd22d4d5083c811f301a22f1f',
    },
    removeMulti: {
      title: '批量删除日志',
      paramsKey: '4315eaa847593b51c42986d518b0d858',
      permission: '9615be91c1504669880e30fc0567219f',
    },
    removeAll: {
      title: '全量删除日志',
      paramsKey: 'ed9ca00c1d06c13937efcf4a66b0d09e',
      permission: '91902a09d5924103b651a62afc1b9481',
    },
  },
  generalLog: {
    pageList: {
      title: '分页列表',
      paramsKey: '1240b67f40b674732db46425793fd08d',
      permission: 'd5d955c2c4e24481aad17ec37afef55a',
    },
    get: {
      title: '获取详情',
      paramsKey: '49aeec330e86864bed4cf41c40031422',
      permission: 'e89a2eb1cc9f4a31aaa33f61b90ad3f7',
    },
    remove: {
      title: '删除日志',
      paramsKey: 'd541b78e7dea6e7f82dc40594d4bc06f',
      permission: '011ed93f531f4e57bd57500ba58d106e',
    },
    removeMulti: {
      title: '批量删除日志',
      paramsKey: '639e20f937fbff75562027be9f889710',
      permission: 'fec1b49ee75a458d95517dad00f59610',
    },
    removeAll: {
      title: '全量删除日志',
      paramsKey: '06c170a99d97af02c420daa8a3583f56',
      permission: '9fbc1b61b4ca439e82ea916c8df0e889',
    },
  },
  governmentAffairManager: {
    pageList: {
      title: '分页列表',
      paramsKey: '1d3c9db3a373e1c05dda51badc76501a',
      permission: 'ba141ae31a56441aa56b5047e3c38d4c',
    },
    get: {
      title: '获取详情',
      paramsKey: '237f2f54721f78072a5557d98874720f',
      permission: '22a8eb0de126469ebe03e4f2b6904ce7',
    },
    addBasicInfo: {
      title: '新增账户',
      paramsKey: '540332b049ef18bc336260e2dc2c55b4',
      permission: '0e51c8b82a3347ddb7c4aca382b376ce',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '96de907ab75b06b033385630ed67b22a',
      permission: '27af51385c394ffdbbf05580794fc047',
    },
    resetPassword: {
      title: '重置密码',
      paramsKey: 'a7cdd2d02533a9b23e83be56ab3800a6',
      permission: 'd52f47b8af134d8bad58c49dd50c0a75',
    },
    setEnable: {
      title: '启用',
      paramsKey: 'bd9b5e08092e9a62110aa4c52e6e079b',
      permission: '3c3ade5065da48a48a990a85a779dd07',
    },
    setDisable: {
      title: '禁用',
      paramsKey: '808d67f5ec04ed0ab93ba1a8389ceb51',
      permission: '31d5a0c6a4a4414283ad9861174b7c69',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'ce11e080f16ed83a6bb9a0fa452bee3b',
      permission: '6a6f82c59d744347b4ef7136eb7e0b37',
    },
    remove: {
      title: '删除账户',
      paramsKey: '118d26015b7b4f8aa7ff4734af7e0285',
      permission: 'd168c9f0848b47dcab7427498d501083',
    },
  },
  governmentAffairManagerRole: {
    changeCollection: {
      title: '变更拥有角色',
      paramsKey: '083542fe22a047a5f0d0bb6a677788f5',
      permission: '867b7a19d5f7430a956af626afdc86a6',
    },
  },
  hostService: {
    pageList: {
      title: '分页列表',
      paramsKey: 'a7e687ef9dc7cd97d98ec948aacabf63',
      permission: '065777a4c4e945a1869b7cfdc1ad5a68',
    },
    get: {
      title: '获取详情',
      paramsKey: 'a4cc0d09176cacf7728f395abc146e4d',
      permission: 'e5b6270f2c0943faae3cd5a4520c5bba',
    },
    change: {
      title: '服务操作',
      paramsKey: '99aa282ee37f73897778c9b8099a039e',
      permission: '14146f7ec5ce42bba13366f378667689',
    },
    refreshAllStatus: {
      title: '刷新状态',
      paramsKey: '061118d69b7c4590afa91c647e3bd2df',
      permission: '0fe478d1f8c64db38518be741781c08f',
    },
  },
  hostServiceLog: {
    pageList: {
      title: '分页列表',
      paramsKey: 'c3394b84f99b50b26da4981be077ee0c',
      permission: '37c263a3bb2247feab9bec8bed5c637f',
    },
    get: {
      title: '获取详情',
      paramsKey: '3ff3c27e19747c008a3af88637e4986d',
      permission: '6546f7ad5e544c6f8f06d731a5394c55',
    },
  },
  internalTester: {
    pageList: {
      title: '分页列表',
      paramsKey: 'ad983d1ac40758f5d252607253fff03d',
      permission: 'e2624321cc70422e8f50fc49f76e36ed',
    },
    get: {
      title: '获取列表',
      paramsKey: '86705224223ac4e0864fbe1896a6a22f',
      permission: 'b8cb4e2bfa8c4322b109b6dabdd028c4',
    },
    addBasicInfo: {
      title: '新增内测用户',
      paramsKey: '3e3da3fdc8eb8fc708b136f30f8593ce',
      permission: '23f9775f61da43a0a588e2578656a35e',
    },
    remove: {
      title: '移除数据',
      paramsKey: '6be3c27d7df1694b3052f4f84aa3aaaa',
      permission: '593926be80be47f9a0422d8d9351a0f2',
    },
  },
  masterManager: {
    pageList: {
      title: '分页列表',
      paramsKey: '1ffd57cd861033026451df42553a4fde',
      permission: '0f5a53ac96504ac3877467d2fb473929',
    },
    get: {
      title: '获取详情',
      paramsKey: 'e4b5c97799a37a6f6b0a2af1e40a196e',
      permission: '3cae8542fdd64fe388c90c800e2a9741',
    },
    addBasicInfo: {
      title: '新增账户',
      paramsKey: 'afa78b7c8f52ffc134186d4f6773d0c0',
      permission: '4ec110d52a8c43f3bd6f4d182511a15a',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '7791b57962b7dc7489ba0c8b22f7602a',
      permission: '60bde98dac044c8da49bffe35e42d58e',
    },
    resetPassword: {
      title: '重置密码',
      paramsKey: 'b9839e2d6821dd4d57e2c95092aed547',
      permission: '680565cf0d8746739181a133b0f50b78',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: '769a7cdbe921af607512d5253fee9fc2',
      permission: '43c96e0a447f475d9c75b2106fb50a2c',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: 'f48294f2f5aabb94fae7a8097e8a2c9d',
      permission: '6e1ca20de0cb49d396531b46004dceb4',
    },
    changePermission: {
      title: '更新权限',
      paramsKey: '1e91a21c9b4572e85ac2db4ca43fe949',
      permission: '386cba62bdea424ea262228ede6e159f',
    },
    remove: {
      title: '删除账户',
      paramsKey: 'aed9e328e2fe796c809b27b252d1f269',
      permission: '98b8a32884eb44d3bd8a7a03a2a90fa7',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '22e75eded5dbe53bac7af91f7d75e8e8',
      permission: '13aa36e046124a36a4c1d84e6c150a68',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '7fa390145d8d815d9122b58f36ca0194',
      permission: '7522755e49164399a9ccfd0273a1cb1b',
    },
  },
  optionPool: {
    pageList: {
      title: '分页列表',
      paramsKey: '971fcf9e5de765fc08a46921ad0b2e34',
      permission: '98289dd277004dc2bce222d446d788b2',
    },
    get: {
      title: '获取详情',
      paramsKey: '7bca141e2f325305c4402b221707ebd7',
      permission: 'd468c888b77645b1ae0fc68aed1fb7f8',
    },
    addBasicInfo: {
      title: '新建',
      paramsKey: '665e513cdb54bab7c41e53ed5dd4e042',
      permission: '02b684e72d014f44bb25a05ae202be84',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: '76f18c52895de888d1ff2f0fa175e41d',
      permission: '8188d832418449748a5b346d68488ad7',
    },
    updateSort: {
      title: '设定排序值',
      paramsKey: 'ab9d410ba724f176315125b3da2d0b45',
      permission: '6e95be1fe1be4a48a219c243f3dae625',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'a2236c23776686a2487c813bb916517a',
      permission: 'edbc39e4c7f443c8b088b95bc748648e',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: '4c0ae52152a55fa648bad8705c2b7ea5',
      permission: 'ab98bfe47b974315a86d7fac48f109b9',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'b34354a20cee63c2918a46a701448c78',
      permission: '5beaea96b09c4efaa865d89ea0dea16f',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '603e163b250ee7d5bfe5c761bd8dec68',
      permission: '5c679814061741e2a953c4cde646315d',
    },
  },
  presetRole: {
    pageList: {
      title: '分页列表',
      paramsKey: '549fcb26ccfae4601b5d52616098033d',
      permission: '38cc27b4c65f43959a9115e828f5c1ee',
    },
    listModule: {
      title: '含有模块列表',
      paramsKey: 'b3317fd4fd12e647e64f0e5e09bb4a8e',
      permission: '1e14e72d5b234e6a860305be82570018',
    },
    listTreeModule: {
      title: '含有模块树型列表',
      paramsKey: '6adc2f85e89319faa82c4ff1fdf7fbf2',
      permission: 'b78998bc56be4394bee7f8ec3ac6f22e',
    },
    get: {
      title: '角色详情',
      paramsKey: '6ca32f85a814e22003a73d4d2f6942df',
      permission: '8f70f33f1815411cafc7c6c204dfdd7b',
    },
    addBasicInfo: {
      title: '新增角色',
      paramsKey: 'e4c52ffedb2d42545e41c910009256e3',
      permission: '0d005ea02c3145f3b20624f6e16041ef',
    },
    updateBasicInfo: {
      title: '更新角色信息',
      paramsKey: '2286b05d67ed5465eb317544d92dc1d6',
      permission: 'ab5ff1dde0f74a8ab705f24fed38064d',
    },
    addModule: {
      title: '增加模块',
      paramsKey: '3537863e1585a6a0604d0455847cee08',
      permission: '42067949dace4ff78b9b1f6cb4038d3e',
    },
    addMultiModule: {
      title: '增加多个模块',
      paramsKey: 'ff62443069ad6bfd3e12fdbefca7e93d',
      permission: '9fc46ae800e2494888a7adf7036884a7',
    },
    addAllModule: {
      title: '增加所有模块',
      paramsKey: 'e1d2604f9e45da2a22d49282f1fd1bff',
      permission: '99bf2666a5d34a8e97002148d6a67544',
    },
    updateModule: {
      title: '更新模块',
      paramsKey: 'f79cd2144cc98f6405a603f7c8467df8',
      permission: '099688b3338f41cbaf6c8a5113766f16',
    },
    removeModule: {
      title: '移除模块',
      paramsKey: '676e6277eea9119587f8c2f7eb0bedc3',
      permission: 'f6c3bc59941040ea9dbf45a2d8028e1e',
    },
    clearModule: {
      title: '清空模块',
      paramsKey: '9f253c5c10890f7298576dc27fe8be70',
      permission: 'a2f0db4af382426f9faeec48bf4a66d7',
    },
    setEnable: {
      title: '启用',
      paramsKey: '5302c7239fa7bdf2a0e293991abe82d8',
      permission: '1eeeed0561fa43f1abb6696d72c384fe',
    },
    setDisable: {
      title: '禁用',
      paramsKey: '875c4dabf23b21bb2a617f3a036deaeb',
      permission: 'd45aa610181a4ab5a45f5a1e17b89ef4',
    },
    remove: {
      title: '移除角色',
      paramsKey: '3d4bb5639bdefdd14930af97ff6693a3',
      permission: '8d103a6170104c89abf82e4176b0990d',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'dc7c8a74d2c8d88265f645d4fdcd6725',
      permission: '601696d9ec654441b824cca2b7a9e206',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '07f1d13bc71be9461b8542c3cf3b69d1',
      permission: '9f58d6d3cd5e49b1a042bcf05d43c6f6',
    },
  },
  section: {
    pageList: {
      title: '分页列表',
      paramsKey: 'c5a13c41011ec3d889b1bca6261b4949',
      permission: '6815bc75f0c649fab634bed6e99f72f6',
    },
    get: {
      title: '获取详情',
      paramsKey: '18ee0eb40b4a828009781794eff58f39',
      permission: '356978fecf114d1b9977771ed34221b9',
    },
    addBasicInfo: {
      title: '新建',
      paramsKey: 'f861c1b16624ff0536cfa4823df891d7',
      permission: 'b3874e8e19a147b3847995d09d21d1af',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: '00aa8f4516fc634820072a0c3376eb4d',
      permission: 'a5c4e274e3094e97a8b64db98eb1e590',
    },
    updateContentInfo: {
      title: '更新图文H5',
      paramsKey: 'fd7f94f3ce73eddcef1638ffd9cc97b5',
      permission: '639b4c00b6534c54953f4b9e4e63cc17',
    },
    updateRenderType: {
      title: '设置渲染模式',
      paramsKey: 'e3c2b9cb8a5f5afeec10ebf6c1bf2482',
      permission: '3d2720d5715f4755915f80e64e80f570',
    },
    updateSort: {
      title: '设定排序值',
      paramsKey: 'dd574958b4d3b3c06e18043a0c833c5d',
      permission: '09fe131c3edf49e88b0b3ef7984fca5b',
    },
    updateParentId: {
      title: '设定上级栏目',
      paramsKey: '7da22e8c80c2d4e0a7b00210147d23dd',
      permission: 'c390cf65199b4041a39f15ff96b76109',
    },
    toggleRecommend: {
      title: '切换推荐',
      paramsKey: '88f206198fff3ccb31e724249bde8aeb',
      permission: 'cd59a742eeac4cdb8d621cae33df40aa',
    },
    toggleTop: {
      title: '切换置顶',
      paramsKey: '559ba8acde91b88ff6c00f68cedf87df',
      permission: '1baaae3b497b4e52a8c8051607bf764a',
    },
    toggleVisible: {
      title: '切换可见性',
      paramsKey: 'e6ff46ff690c8db8fb290f3d00784f80',
      permission: '9eafb7d51e39435db03a6bf2c94d50f7',
    },
    setOnline: {
      title: '设为上线',
      paramsKey: '2861c8c610aa24b713685957f8486088',
      permission: '729bbe0f4a5643c09e562fbc47edb57f',
    },
    setOffline: {
      title: '设为下线',
      paramsKey: 'c097631af2252ac7ca0bead7328348e3',
      permission: '7f7a30cafee643e694f48014483fabd4',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '54052af8042eae2b9b4d759d28c33a87',
      permission: '1bd8cc25320643369427654e4bf814cb',
    },
    setReadObtainScore: {
      title: '设置阅读积分发放',
      paramsKey: '745453d35d38b0540ec77c22b3c1c96e',
      permission: '396e18b664194a45bc2fce4db7ed8faa',
    },
    uploadImage: {
      title: '上传图片文件',
      paramsKey: 'bcd76dbe44e082fcfbe727f51011b692',
      permission: 'd94a09395a3640f599d4460abd7650fd',
    },
    uploadVideo: {
      title: '上传视频文件',
      paramsKey: 'f531eff5c43f3636e169cb7d8a425761',
      permission: 'e0520c2215634e4890f9f39ba5df940a',
    },
    uploadAudio: {
      title: '上传音频文件',
      paramsKey: '35d21ac792543ba0a10a8e0acf613f7f',
      permission: '69ddc65c42934f1a81c8f70fd25176ef',
    },
    uploadFile: {
      title: '上传附件文件',
      paramsKey: '8306e34bf2e0ae2302423706567cbc42',
      permission: '40b0b867859748eabc753f58ed58670a',
    },
    uploadFileBase64: {
      title: '上传附件文件[转换为Base64]',
      paramsKey: 'f5a5b86e0371c8989cf00a8ca0629e5b',
      permission: 'ffc4e7cfbb0b4973a05b1e9bf9998f15',
    },
    getMediaItem: {
      title: '获取媒体条目',
      paramsKey: '0a3566a771c6a9e8821fa063c65b151d',
      permission: '8bfa06c3202844f485250a1ea70d79a4',
    },
    addMediaItem: {
      title: '增加媒体条目',
      paramsKey: 'a6cf275c2ffa5f0ab7f603852fc5000d',
      permission: '5eb8c6f601804fba8bbcbff7ecefe19e',
    },
    updateMediaItem: {
      title: '更新媒体条目',
      paramsKey: 'e32603da3425e7c123187c28c2387641',
      permission: '1f5a3e04d1174f23a318d84f5eb68f46',
    },
    setMediaCollectionSort: {
      title: '设置媒体条目顺序',
      paramsKey: '988c9505838c89b0a1edc349fe784b09',
      permission: 'c086e14adac743dcb27af77aa856e2f9',
    },
    removeMediaItem: {
      title: '移除媒体条目',
      paramsKey: '2929b1bc8d6385b7994f89b582d1763f',
      permission: '02c131edbd7447eb900a0dd0be36ec9b',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'd984f57f4b2b20967088bc7c88bdeae4',
      permission: '0c4f444c055744aca3fbf508d57157f7',
    },
  },
  sectionApplicationConfig: {
    pageList: {
      title: '分页列表',
      paramsKey: 'bdacd52dbd4390799859688ac987530f',
      permission: '77a6c6d836b940dd88b443ec844c99eb',
    },
    get: {
      title: '获取详情',
      paramsKey: 'fe3f37f0a3cbc1e04a78c02c86910213',
      permission: '165bb5ded84b4d10b1f86849499f2c76',
    },
    addBasicInfo: {
      title: '新增基础信息',
      paramsKey: 'c2d48d0ee47088fba6837c82571e33bf',
      permission: '4d0ca5ad2cb64385be8f6ce76dd6ce5c',
    },
    updateBasicInfo: {
      title: '更新基础信息',
      paramsKey: '78c64f44137ec2a32beaef3b323b40c9',
      permission: '28d8e97aee15491aae252f8e4b0d386a',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'f03dc0f2105faaace9c698190660621f',
      permission: 'f019d3fe19a34f48a9992da62108fd67',
    },
    remove: {
      title: '移除栏目应用配置',
      paramsKey: '2b13528121dd49953c04c136c726a7b4',
      permission: '46d32a7463cb4c5292702b54f6b4f151',
    },
    getConfigItem: {
      title: '获取栏目应用条目',
      paramsKey: '361749dba0b4c1401164906dc58768cb',
      permission: 'f8897ad8ae3e411d8baf20b556043a8a',
    },
    addConfigItem: {
      title: '增加栏目应用条目',
      paramsKey: '831b14f9fece11360d066699f324a8bb',
      permission: '6c431e4ee50740bdaea471eef6fa559c',
    },
    updateConfigItem: {
      title: '更新栏目应用条目',
      paramsKey: '26a9cf55783122e1dbae9cba5d3912eb',
      permission: 'ba1011925d6c45d6ad6a69ecb422f416',
    },
    removeConfigItem: {
      title: '移除栏目应用条目',
      paramsKey: 'c2a82420239a5aa1baafc60ce879b302',
      permission: '8b9611e684cf4e608438de5900e1458e',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '8c8c92fd50f9dc00b0ff0b12ad349c9c',
      permission: 'd9984b0acdf4491dbb11bce806f14d09',
    },
  },
  smsCategory: {
    pageList: {
      title: '分页列表',
      paramsKey: '2f9e085a9e88f9b52c9d1b4e714f1678',
      permission: '48ff85f445b5402a84780dd7df55e125',
    },
    get: {
      title: '获取详情',
      paramsKey: '918ce242cc69dfbc78190c60bdddbd84',
      permission: '529dbbd6e0084ec29a3d80e94fe150b6',
    },
    addBasicInfo: {
      title: '新建分类',
      paramsKey: '6507ea35941f98ce5f48aef6c941b6a7',
      permission: '858012c8bc324b4d8d02a9b14ca7acd3',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: 'f5582508326b6a46ab0b3e14d99dae68',
      permission: '022d3a46101c4cc998237c8b837d8da5',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'a6fb4eee9185c4cc8adc8e0ecf3a001e',
      permission: '3c0250528e7a47cbb783035ac69388fd',
    },
    setDisable: {
      title: '设为停用',
      paramsKey: '42bc30d289ad00af5990c06e3e42f986',
      permission: '0edafa3b981740128b49c090876e1b60',
    },
    remove: {
      title: '移除角色',
      paramsKey: 'ce893b6fa9f28f727596a17227c9e2be',
      permission: '9bf1e8cf76f24cecb1caf28252f1ef58',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '15a4faa9e6b6ad84c375ee8a284eccb6',
      permission: 'e1ee0da99c6a4a2aa941f8513d0a16cb',
    },
  },
  smsCategoryStatistic: {
    pageList: {
      title: '分页列表',
      paramsKey: '259b5dc15306063442be438bb7fa6bdd',
      permission: 'dea8b018217a40bca79ad13cda38abc7',
    },
    get: {
      title: '获取详情',
      paramsKey: 'ab474e1a79b72a230b9c7a5851a5b7b8',
      permission: '6ff229588c0f46c2a7eb8fa25babb153',
    },
  },
  sqlLog: {
    pageList: {
      title: '分页列表',
      paramsKey: '6cf0767bcc0110077df6dcfa2c0adb4d',
      permission: 'e1beb9e21fee4a22871c7469804ec370',
    },
    get: {
      title: '获取详情',
      paramsKey: '23019c5eaf5ad87a26471a7773555034',
      permission: 'f70ec14f9d9c4512aa7fdd4bf06b08b0',
    },
    remove: {
      title: '删除日志',
      paramsKey: 'f1f78ca2b76d55d41035b5ae44d7143b',
      permission: '01222c4625de45e9b051f52a1b636de6',
    },
    removeMulti: {
      title: '批量删除日志',
      paramsKey: '85298938287e075f536ab7690b078a23',
      permission: '5b686ef0c7cd43cf915e7b05854ccaf8',
    },
    removeAll: {
      title: '全量删除日志',
      paramsKey: '2a70e8a9017929ebfbe6cdbb264da3a9',
      permission: 'dd0e3c7b70384ce4bce0c56f80703162',
    },
  },
  subsidiary: {
    pageList: {
      title: '分页列表',
      paramsKey: 'c2d2181fa2fa19130dbbe5fd592061e3',
      permission: '4d6d22230a9a49ed87cda6ed342a9a5e',
    },
    get: {
      title: '获取详情',
      paramsKey: '979bed5b1b3d2fc8df719f593606b66a',
      permission: 'a5f7761013ff4b6ab3e0cdf92b2630ab',
    },
    addBasicInfo: {
      title: '更新信息',
      paramsKey: '5e5d41a982fe27872260fb101516feca',
      permission: 'b733d6c4aa4e4d7a91653f561e615523',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '6fc9b67a55e5a704e7969e12a309a02f',
      permission: '694e04af241049748c4288c97e7124fa',
    },
    updateParentId: {
      title: '更新上级公司',
      paramsKey: 'a8a013eb46bc11338a4f07b2f6eb0f49',
      permission: '11c164de20764b0895494e715c395805',
    },
    updateSort: {
      title: '更新排序值',
      paramsKey: 'adf708e81b6bd4366f716ec0b99b8b62',
      permission: '8a8249fde2f5420489cefaa69e442970',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'ba8893586e1200f2cb559cfa969e4844',
      permission: 'b9abdfe4116d46bcb768e72c176fef9d',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: '15477d5af14a9285522fee1f432e657d',
      permission: '43fa7c53b092461d8fd31eac4b62dbd7',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '418216679fc687e411638c21cbada513',
      permission: '5be52df0e87646c99a32271ec7b76f64',
    },
    uploadImage: {
      title: '上传图片文件',
      paramsKey: 'bf9dfdd75f55f14794765ea715eef884',
      permission: '588b8f260e0d41c1aaf8261b91eab2c5',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'c1eabc1154c558a16a19b903c909fad1',
      permission: 'ff8a61e2aa134fcda8614456d52dcee3',
    },
  },
  tag: {
    pageList: {
      title: '标签列表',
      paramsKey: '1c9247614e2c577a940ea9dcbec32b4e',
      permission: 'd8025a63b4f546d5845d0b7828edaaaa',
    },
    get: {
      title: '标签详情',
      paramsKey: 'e91a0fb98df9638e13189aaaa26d9982',
      permission: '53e20f79165b466695f05fc6103c90ce',
    },
    addBasicInfo: {
      title: '更新信息',
      paramsKey: 'b87524668635708f4744c082d853fc5d',
      permission: '0a4c0b8992be442d9ed7d1f273919378',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: 'b95fa32049a132797f16cce438239d6f',
      permission: '98192b7742ec4ff1a0831f9443bf3ce5',
    },
    updateColor: {
      title: '更新色值',
      paramsKey: 'c846963573e8c324971d0a2dc8ba44f5',
      permission: '2bff378a9cc940c5b0cfcc438bb45f42',
    },
    updateType: {
      title: '更新适用类别',
      paramsKey: '0e07278b2d49dc3ee3baa41d34973771',
      permission: '067cb7729f694cdca29dbd6c71e70917',
    },
    updateSort: {
      title: '更新排序值',
      paramsKey: '0d12d21cd77554a5f28554e76d43425d',
      permission: 'e77b0de0892449f6a9cd6ec7c21a234a',
    },
    toggleRecommend: {
      title: '切换推荐状态',
      paramsKey: '02246c6ec9f60cff771469b26c042a79',
      permission: 'ee443db6eaa54cec85452308504507c8',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'f037984810c601f2f1967afc134a024b',
      permission: '4d58c75eb1674c92b9356744150620d0',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: 'd4f13abb2d1c3b1471f30b434198e38f',
      permission: '770c0c2cdafc4db7b26bc36fc296359e',
    },
    remove: {
      title: '删除标签',
      paramsKey: '121264724b5b6bbdeec08eda9df10ca8',
      permission: '1b56dc0fffb346f198c896e890910e4c',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '113b94cd12333a91d51d277a268d3d52',
      permission: '09166861df414f82b2e03900e003f9a6',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '5cfec76743476a1abf1e6be9eeb921c0',
      permission: '451d6ab8913a472eb86ec92b987795bb',
    },
  },
  uploadHistory: {
    pageList: {
      title: '分页列表',
      paramsKey: '0d555d8adbc69d8256d81e335c8ccc1f',
      permission: '9974db4ec84d4950a165f87f0001df45',
    },
    get: {
      title: '获取详情',
      paramsKey: '253ec2b75d7f096be27692d94c2092b7',
      permission: 'c2cc84e3ab3b45a2959f60589f5d1017',
    },
    remove: {
      title: '删除上传',
      paramsKey: '4b086efb982046fb8c1508fc6b97cfa3',
      permission: '8beb5367c80140ad8e0f02e62f9cf261',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '5e6c7a8c7d06d6701ffa0514c69c7091',
      permission: '5dfb41c25e25487696133d2096e57951',
    },
  },
  user: {
    pageList: {
      title: '分页列表',
      paramsKey: '06f7134651da23f0bd0f8cf611b20bf2',
      permission: '94b099aee9fc4bad9bc849f4c57010a5',
    },
    get: {
      title: '获取详情',
      paramsKey: '334d1af917a1c3d2940f9fbf4990508a',
      permission: '50c7b5cf7ef247e69c5ad674ed78591c',
    },
    addBasicInfo: {
      title: '新增用户',
      paramsKey: '30e4714ec2d2aee65d3cc80a9a4b0cd1',
      permission: 'dff1919be0694bcda435f8f6c3c90a6b',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '4272f5ba4df9f3bd9e5e7adfcce35ece',
      permission: '60d7f158d61c421bb5838aea03f09d5c',
    },
    updateParent: {
      title: '设置上级用户',
      paramsKey: 'a07665ab2fbda6797790c020c62776b7',
      permission: 'f15e983c68ab46248befcfbcf9f061e5',
    },
    clearParent: {
      title: '清楚上级用户设置',
      paramsKey: 'e9f624dc2a4020f61538818a18e66cdb',
      permission: 'f4aefee046c64a90af93bd12cdab25a9',
    },
    setSignet: {
      title: '设置印章',
      paramsKey: '5416a2db6d5aa2c0a3798501ed4da179',
      permission: 'e54d6b1301bc4ac5931f076edba5516f',
    },
    openSignetPasswordSwitch: {
      title: '开启印章密码开关',
      paramsKey: '155c30230f88732109bfebd49be69f03',
      permission: 'bbb2d120dda240b28a0d82e4f7d6b628',
    },
    closeSignetPasswordSwitch: {
      title: '关闭印章密码开关',
      paramsKey: 'a376e34cc198ba12f3c8db16b30a76d4',
      permission: '8d86f0f567e2483882d372837ecf768a',
    },
    toggleSignetPasswordSwitch: {
      title: '切换印章密码开关',
      paramsKey: '168fdc86eba7f943ecbc54326b615ee1',
      permission: 'ed567baaf2a140faba8f03e517b7f2ea',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'db7a7e83a6ff81cfdc894bf10f0bec82',
      permission: '68d7a3c3a092468ca6e26e23d02c73cd',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: '753b55e7eda9285d951a5aa95d3af462',
      permission: 'cf24c9766c79409aaa268136a82875fa',
    },
    resetSignetPassword: {
      title: '重置印章密码',
      paramsKey: '9189a3f233d5f2d69e78e9a5add646c9',
      permission: 'c0601b615c8441099063338209087d27',
    },
    resetPassword: {
      title: '重置登录密码',
      paramsKey: '85bd3221944a617def56b9f28049abec',
      permission: '2e6f21adbc7b4f30896a25a4d54e3d5c',
    },
    changePermission: {
      title: '更新权限',
      paramsKey: '41233727503266f9943fc2804971f25e',
      permission: '23280f919a6c439e92cc2e4aabc37855',
    },
    remove: {
      title: '删除用户',
      paramsKey: 'e7480a1b2d94c019cab66751cb76c796',
      permission: '0de9aead7cfe4279bd4057ded7945a4d',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '778a0613c10be367b27d391dc088eeac',
      permission: 'c44044b7272343ccad7555555f41ad1d',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'c2011b54e98e597779aa06ea7d8e9fac',
      permission: '6673f66b40f34582a1fb7692e5b9e3e9',
    },
  },
  userDepartmentInfo: {
    pageList: {
      title: '分页列表',
      paramsKey: '91d1df9c58fac9cea6a88497d8a85015',
      permission: '4ee1e5d65a074229be136496a298fc30',
    },
    get: {
      title: '获取详情',
      paramsKey: 'ad63d128533ec83b5eb2918439e5edaf',
      permission: 'c1d2c6c7177d4a2e8b578f132038d363',
    },
    addBasicInfo: {
      title: '新增绑定',
      paramsKey: '2b6bea5851331e833490424b8704829c',
      permission: '758e8c2d7c434a8ab0b4696f131d867e',
    },
    setPrimary: {
      title: '设置主要关系',
      paramsKey: 'bee5e2a0dcb2318fc1ec3bcb3cd50afe',
      permission: '2eeec726b3ee453c80ec06ab684f1ec2',
    },
    remove: {
      title: '移除绑定',
      paramsKey: 'a8e19a1d8158af51c72e6cc390b1f9a6',
      permission: '833ffee4fba14267865a1c9faa363831',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '6aa9e3ce0222f4eb51174fe235913fad',
      permission: '15ec147835d745e4983a906ea71c8dba',
    },
  },
  userDevice: {
    pageList: {
      title: '分页列表',
      paramsKey: 'a07a6469104c1961dd44a35e10a8f9e2',
      permission: 'b51c699b56ca4a6a84a3d12f1caccd9e',
    },
    get: {
      title: '获取详情',
      paramsKey: 'f50d174a3ea1d2376eb83363d7b4d34c',
      permission: '9d587be446fb495295c20e5a4fc569c6',
    },
    addBasicInfo: {
      title: '新增设备',
      paramsKey: '3f4303b0cc1946b9885cd73330fd1702',
      permission: '2b2e8efd78d940d6a6fad1d5c73eddd6',
    },
    remove: {
      title: '删除设备',
      paramsKey: '700270a5564ff5be739a4bb94062b238',
      permission: 'd178d125f23b4688a6f1b2c8519c1d9f',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'f3d6d426003026a38917dca15f989210',
      permission: '42a1cb12d4974016befa83dfe8acdca7',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '280d6796f5fd1eff1a979ceabca5ba3a',
      permission: '52e7551e1a4e4a6e963be6a186346bcc',
    },
  },
  userSubsidiaryInfo: {
    pageList: {
      title: '分页列表',
      paramsKey: '7d1e8a0f02811f469342e6970508dfba',
      permission: 'c48c573cef874df089c9992b2eb38302',
    },
    get: {
      title: '获取详情',
      paramsKey: '140b773ef98687a20ed4e4792d8f8269',
      permission: '0499d1603bfc4e088721ffa8cf6159c2',
    },
    addBasicInfo: {
      title: '新增信息',
      paramsKey: '069a4866a7a14dffec9755f20f807702',
      permission: '75a5b7b91b1545cb841dfeb2108de99f',
    },
    setPrimary: {
      title: '设置主要关系',
      paramsKey: 'afff11b13e9c117727c5018be2bad18f',
      permission: 'f6ba69fb9e104b2abc09885802faca3f',
    },
    remove: {
      title: '移除绑定',
      paramsKey: '54c5e020f6764ba595003ee3cec6300b',
      permission: 'a65f3c9362414ca48ae595e7637254f5',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '83208529ba918fdcb5efc16661faf239',
      permission: '37a10641feb542b5bcf3cf0b66c25bb3',
    },
  },
  userYonYouCorrelation: {
    pageList: {
      title: '分页列表',
      paramsKey: '606ec01a141a6809cd607fca6fac708b',
      permission: '9a72865ba9254b92b8c81068977df2eb',
    },
    get: {
      title: '获取详情',
      paramsKey: '1408ed8e6ef7d92601939f39b37061c6',
      permission: '50ed64be85b74dcfbf444864dc3ea680',
    },
    addBasicInfo: {
      title: '更新信息',
      paramsKey: 'a47deb5860d7b420a7f3de01dc64bab5',
      permission: '3d80700fe18b4d958a05561ff9f62d43',
    },
    import: {
      title: '导入数据项',
      paramsKey: 'fca23562d9bb4610a7d96e7e477eca34',
      permission: 'cb4b272ad7674bc5990d4e10bd420d3d',
    },
    updateBasicInfo: {
      title: '更新信息',
      paramsKey: '0b1181bdf4c57c8ddb9f147d714613ec',
      permission: '2fe37599d1404b97b343aa35c4285a8a',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'd07500e82f84dea60020d442595ef974',
      permission: '88058355faf04d78b15426b458f5aab1',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: '42dcd0ae94331cd329f03373f788caeb',
      permission: '931f0ee2cde64d74987a8dfffcfec4ae',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'e14cee2d84e42b669fbcebef348104ff',
      permission: '056a5066faaa4f8b83c9a8abe61b95d2',
    },
    testExist: {
      title: '测试存在性',
      paramsKey: '3c3a2fa7fe09aece10ae675b6c9df3c0',
      permission: '38170556b9d14771aba0887f0c9df9e1',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '7830977307e874f8e52c4e8ebfff2d27',
      permission: '323c4a3063e34b2190a4e11545113ca1',
    },
  },
  workflow: {
    pageList: {
      title: '分页列表',
      paramsKey: 'ed386a3d90d43cb4b2b31a5b512fdcc3',
      permission: '37ee7c46738346438bd153159a37a77d',
    },
    get: {
      title: '获取详情',
      paramsKey: 'fb7b2cd9211efcf81ae4c941c1cb1e72',
      permission: '4392546f15fd4f36a9b84a8756fa991d',
    },
    addOfficeAutomationArticleAudit: {
      title: '新建OA文章审核流程',
      paramsKey: 'e9570ce8bf912b2ed57f86fcf7bc66f8',
      permission: 'f23a1c518aeb4108bba37e7f29e6e368',
    },
    addOfficeAutomationProcessApproval: {
      title: '新建OA审批流程',
      paramsKey: 'cdf5b665d9373da2ed795eab0a180b1c',
      permission: '50d22415645b4361a14fa8c59816f561',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: 'db250df0792063ebd82fe994c7f5b642',
      permission: '8a63ab515e30408db57a45d465af14b6',
    },
    setChannel: {
      title: '更改渠道值，仅用于特殊情况',
      paramsKey: '29f7014f7b472d2c9c12a7d75fff6b6f',
      permission: 'c1ec28887aa746a483e647e7fd5593f4',
    },
    setEnable: {
      title: '设为启用',
      paramsKey: 'c3af4f4cef4afbbed62a0a75f78e209e',
      permission: '771a68d77b304872943ab0f707e7b5b8',
    },
    setDisable: {
      title: '设为禁用',
      paramsKey: 'f165b83714ca50cd1e32ac204e552d00',
      permission: 'a3e3a85dd55b4d9aa1762d96e52bd860',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '6cf0ee284dec4d9af6d18a923c11f39a',
      permission: '9fd9e3dbdae24370bc5aa90c79b4d68b',
    },
    remove: {
      title: '删除',
      paramsKey: 'ebeb3bfedf8ced37181cbc2bd221410a',
      permission: '86cb9a9fa5464f85b8e12c14022d1f02',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'd3a42cc528ef7c42d4cfb8c1e5515f90',
      permission: '44858bcfa5994645b74d00e145de7425',
    },
  },
  workflowBranchCondition: {
    pageList: {
      title: '分页列表',
      paramsKey: 'd24016e08f8726aff7e3f27fc4d79ab5',
      permission: 'aa3c693826684e5781b93d9ecf2279e8',
    },
    get: {
      title: '获取详情',
      paramsKey: '94bf8b57f7bf5ffe6f02ec278462d20d',
      permission: '29a352facc8a47c788c2e48114ab3401',
    },
    addBasicInfo: {
      title: '新建流程节点分支条件',
      paramsKey: '29923d18040f500106318127e6f44a7b',
      permission: 'e03ede7ac78c43d5ad8c72aa19fcc632',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: 'ce5c81b00b68e9a732fe7a61e3f96d8e',
      permission: '9d579c65f5bf468088ebd74518041cbc',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '32d47000b2ff4c74a372985535a579f9',
      permission: '742ff31810b94ad88f88cccd24bd17fb',
    },
    remove: {
      title: '删除',
      paramsKey: '7564cd394dd641c71388ea2533a5ca79',
      permission: 'f5239f4e81a0497db744f1ac93a4e3b4',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '15293c33170b41f7d0c28af5d247c999',
      permission: '267f4ede18d547028f575408ea16c215',
    },
  },
  workflowBranchConditionItem: {
    pageList: {
      title: '分页列表',
      paramsKey: 'db68999ec675d2895c8f734e8a147245',
      permission: '13761f22823846b2b6024be46c361fb7',
    },
    get: {
      title: '获取详情',
      paramsKey: 'ef66ed20c6af150d169c1d6791188fe6',
      permission: '8736bdc60a8c4643903136aba2f4bdc5',
    },
    addBasicInfo: {
      title: '新建流程节点分支条件项',
      paramsKey: 'c087459f2f569143f4d4c568cc54ace7',
      permission: '1d6022a2014f4e18b392f782a1538216',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: 'b3c45ec32ba8d606796a4e4cb091fa87',
      permission: '781e6f9448f94303a6e4adf8c65f3429',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '00fc1df21d744ab1fa97c2d2eb926b6a',
      permission: '69a919a6ba9e465992fb3dd1889361d5',
    },
    remove: {
      title: '删除',
      paramsKey: 'a10ee3c73cd633533bed4f5b4355c4ac',
      permission: '133fad62cbb34f0eb105cd6c019570ee',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'ef449f08ba22c0323b2bb544c967b499',
      permission: '520aa9c03e084d2fb50ffb862d627514',
    },
  },
  workflowCase: {
    pageList: {
      title: '分页列表',
      paramsKey: '0be6a5ffd765934c778e9ed8e9a49096',
      permission: '38c3a2128eff499684bffeaa270bec19',
    },
    get: {
      title: '获取详情',
      paramsKey: 'd68b65bef3957bce02b6d1ac7f4a3e9e',
      permission: '1685b6c1dd5e4243b95966ff7ebbabd4',
    },
    openCancelApproveSwitch: {
      title: '开启撤销审批功能',
      paramsKey: 'e035729a5532c2ce37d84af68cc05b0a',
      permission: 'a6116b4771bb41a386d3bd3873178870',
    },
    closeCancelApproveSwitch: {
      title: '关闭撤销审批功能',
      paramsKey: '646d7c4faaeb2ca79383d47455db1b60',
      permission: '765ff7e1803444ea808a5aff00307217',
    },
    openResetAllApproveSwitch: {
      title: '开启重置审批功能',
      paramsKey: 'f18677642d43c600e6d23d246a65a81e',
      permission: 'a7c2aedb537c440e838b6e2c6b7f3b6b',
    },
    closeResetAllApproveSwitch: {
      title: '关闭重置审批功能',
      paramsKey: '9902f5f101e01edcc1b88aa018fc58a8',
      permission: '75ebf77f8c2d482694be36c7787a2006',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '95a9f7321de9e416b034e149c484c8a3',
      permission: '3f7d2a7c8efd4b5dbcc8616e35a2dd27',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'a05e4e61b0676a3ea948312192d0de5e',
      permission: '70095bf75cba455dbb9622d5944b0b44',
    },
  },
  workflowCaseFormAttachment: {
    pageList: {
      title: '分页列表',
      paramsKey: 'c9e0e8bdcb497d5471d49c9c442c5e3d',
      permission: '57476f33829b48fbb0ee4b5ffee1451e',
    },
    singleList: {
      title: '流程表单附件单页列表',
      paramsKey: '21da1c62a9f66aadecdf5b002a823468',
      permission: 'a4d05add0c424cafa20bd6d69b288e3b',
    },
    get: {
      title: '流程表单附件详情',
      paramsKey: 'accd54362b90dd81f0d1263b17a175f6',
      permission: '01254716b475471b822ffc2ca79341b5',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'c9ff8d227190ef8f7cac0ca3f676ed1d',
      permission: '26073665d28546d792dc20454c2768d8',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '20826c1c9a695c768a77c7b70a519f85',
      permission: '30fc0303267d45729fe1b0830151bc96',
    },
  },
  workflowCaseFormStorage: {
    pageList: {
      title: '分页列表',
      paramsKey: '05b632c5f8dd69eaf79e7238e8eff4ec',
      permission: 'f4ad682d004846a58b4f76fd63c9c33c',
    },
    singleList: {
      title: '单页列表',
      paramsKey: '4f7d6931e69100863c6a5e9f362816d0',
      permission: '299e025c5cf64a2eb4d4c9b6dd27b9f0',
    },
    get: {
      title: '获取详情',
      paramsKey: '15924efbc08bda5694613ceeda04735e',
      permission: '3dda517c5cb2457f9b6f6b8e4d7d61b9',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '019728ea887068605340ccfb06759d5e',
      permission: 'd8f79c54fc764ac5b58e8f9711857d44',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '96d98b83b9a236171fcb53986714368b',
      permission: '54d711c694294f53a37a06cf3d4d1172',
    },
  },
  workflowCaseProcessHistory: {
    pageList: {
      title: '分页列表',
      paramsKey: 'd10cc3ae06a397e83e3f24fa89d317d6',
      permission: 'e08497af9f6c49c080bdd220cfbde396',
    },
    get: {
      title: '获取详情',
      paramsKey: 'f7621743e108b9bb869a4f069c85725d',
      permission: '4d0ad007a73c4deb88f1b01322770043',
    },
    resetAllApprove: {
      title: '重置审批至起点',
      paramsKey: 'c2cd217c9f4be4f3113038e79dd0f735',
      permission: 'a4ad7c058a914b58a22eae29e01294cb',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'c3629a58eb9b3ef5a5026b6709503520',
      permission: '05ca03d1ba7f4b3a90a5525a3fea5dff',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'b0d17f9ef68764a3350947cdd407eeec',
      permission: 'dbb83d88fca5473dbc2fffc4930f57cb',
    },
  },
  workflowDebugCase: {
    pageList: {
      title: '分页列表',
      paramsKey: 'c9121bc9e100ee6c0f95158d28d96f3c',
      permission: 'aa5c291e90324ff9b90e4a523c5e2b1a',
    },
    pageListLatestApprove: {
      title: '已审批流程实例分页列表',
      paramsKey: '3c3ff314b9f2639f8f7d8f00dede270a',
      permission: '3e5d7b2305304275b4d03060baffc9d9',
    },
    pageListWaitApprove: {
      title: '待审批流程实例分页列表',
      paramsKey: '3382857504f7ae2e35dbf1ef81236042',
      permission: '8dd811e1067a4b9e9da15c111054b225',
    },
    get: {
      title: '获取详情',
      paramsKey: '34a65b67d647b471e1a043bed2e19b4a',
      permission: '70350607306a44debceb5341aaa5ba77',
    },
    getByWorkflow: {
      title: '通过流程设计获取流程测试实例详情',
      paramsKey: '89cfd4ee2773e3651c8375eef3b7456a',
      permission: '6f8e50d1eebb4068a9510c651d4a7069',
    },
    updateBasicInfo: {
      title: '更新流程测试实例',
      paramsKey: '6c8e55087a124f9888f8d0a3ea2a294f',
      permission: 'c9d58aadf7874c98ba1cd98b47ebe711',
    },
    submitForm: {
      title: '提交表单信息',
      paramsKey: 'd9852e5a6438f3af4a7ad26c1bc1ba8e',
      permission: '8e44fc16c4e54575978b88217ccafcac',
    },
    submitApproval: {
      title: '提交审核',
      paramsKey: 'e61a8088b5714bc42adcb31e20be5dbb',
      permission: '749e15e422014c0f9758b68ac9cdbbca',
    },
    openCancelApproveSwitch: {
      title: '开启撤销审批功能',
      paramsKey: '3cef17e5e4f2cac0012fb32f266ca68c',
      permission: 'ecb69b29a7964796a7b0c346a5c40bcd',
    },
    closeCancelApproveSwitch: {
      title: '关闭撤销审批功能',
      paramsKey: 'efbfb3d890ec8cd2d21e06e1466a89d1',
      permission: 'cc8adf69f54948d4a61bcaa7538bde69',
    },
    openResetAllApproveSwitch: {
      title: '开启重置审批功能',
      paramsKey: 'c5f68d14e83ec596380866f1183db6dd',
      permission: '17d1b46fca984b7eaa0e2ead393064e1',
    },
    closeResetAllApproveSwitch: {
      title: '关闭重置审批功能',
      paramsKey: '041136bb80b59b3d783ad9bf0a43eb4e',
      permission: '6ff89656f0b74899b215b02d9bed0830',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '31162e11180d794b493311abeb7d5f41',
      permission: '06ef7163483a41c186e6fa028a52b881',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '245c266e36244dbb908c0055e67db5d0',
      permission: '8c9ee28d04a145a7bcab34f6e620d6fc',
    },
  },
  workflowDebugCaseFormAttachment: {
    pageList: {
      title: '分页列表',
      paramsKey: '3acca203f5d8504278cd36338fad1ca4',
      permission: 'ac2f190b2f694d03a2d95445ec9a28dc',
    },
    singleList: {
      title: '单页列表',
      paramsKey: 'a8b8997dcafb485255e40ba63e11358d',
      permission: 'f3e53f55f6904f62aaf2f45ee3f8b9bf',
    },
    get: {
      title: '获取详情',
      paramsKey: 'e682df58feea3a2d62b6717d40f2fe18',
      permission: 'a9f2c37898994389b9018ee6e3efcd96',
    },
    addBasicInfo: {
      title: '增加流程测试表单存储',
      paramsKey: '3ccaad655c2d17f10be43d814b0ee4a6',
      permission: '8dcd2da78e394c6da2ea8e29b91bcc19',
    },
    remove: {
      title: '删除',
      paramsKey: '1742ef031a952ebecc5d86fec93883d7',
      permission: 'b71ee9d8bf8240609af6ad2e46cb5339',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'cc6de24ccd19a86998f7f9b9ba294c41',
      permission: '7151bef2331d424fb770730339e80daa',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '4307ac0c7b7c685f173659c68d4b3228',
      permission: '73468f330e854c179ac76e5c8908b69a',
    },
  },
  workflowDebugCaseFormStorage: {
    pageList: {
      title: '分页列表',
      paramsKey: '8a6a6c8a5303b2998b20581c3b1edf62',
      permission: 'd5d4f517565444d8bb74757ae85b87aa',
    },
    singleList: {
      title: '单页列表',
      paramsKey: '9662b4c1edf02184736a14e863e6b572',
      permission: 'e5b3f79244cd4a6a9a2abb69b505cc34',
    },
    get: {
      title: '获取详情',
      paramsKey: '0c8d212d61d1c26d078edbcefcf26a3b',
      permission: '4b19f0d81c1449bdbd40f33ac020a52e',
    },
    set: {
      title: '设置流程测试表单存储',
      paramsKey: 'e2103ef54f90f07dc7ea75c35e71fc77',
      permission: '3391f665cdb34312a4901a58d5f46d6c',
    },
    remove: {
      title: '删除',
      paramsKey: '55aa9c266c0d0ee8ecdf968faa6381f1',
      permission: 'fe8c8829baf4422b94b8646ea15df6a1',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'c05dc83c2243d9e7385c485277ff9a55',
      permission: '9b6e15bc80824d488040058ded2b7fdc',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '529727c404490408f9c0863feb03fda6',
      permission: 'c1e1e038133248ca907c42dd1719f22d',
    },
  },
  workflowDebugCaseProcessHistory: {
    pageList: {
      title: '分页列表',
      paramsKey: 'b82635e8a272a28747754431e2d9ca97',
      permission: '898152bfc4124b74a0ab75ce44f1f6e4',
    },
    get: {
      title: '获取详情',
      paramsKey: '2cf4337100e9aabbdefc1c94ee9bf0bf',
      permission: '8f2707dd2d204358bbf7267af7cc6960',
    },
    pass: {
      title: '通过',
      paramsKey: 'f71593737ddc7d3eb7940128750b4ac2',
      permission: '97f9f5c0aa694d7e9391aaccfb66f453',
    },
    refuse: {
      title: '拒绝',
      paramsKey: 'c444f4eab87312d9d489c34e2df282c3',
      permission: 'b11ead0ecff74445ba6f9bb8791b22a4',
    },
    cancelApprove: {
      title: '撤销审批',
      paramsKey: '9909a36bc9f30e5b86edf45b8430945e',
      permission: '277fd97518d046c0b650e0a5688589c0',
    },
    resetAllApprove: {
      title: '重置审批至起点',
      paramsKey: 'dd6aea24cc85a964d7cf9fba76d80e6a',
      permission: 'cda276fc9bf648bbacb5f78e6799d03f',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'a6720226e03f03bacbe1f57ec966f6f8',
      permission: '2f8f8916758c495aa587faf6a268c3fa',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '077f5785912885491f23a7a8b811bf65',
      permission: '80694e70da844514b689e2209e9ec3de',
    },
  },
  workflowFormDesign: {
    pageList: {
      title: '分页列表',
      paramsKey: 'fc2611a924056170466d9e2b08fb9bba',
      permission: 'af9bdd73979a439bb6db731c6546c87a',
    },
    get: {
      title: '获取详情',
      paramsKey: '128f262fec0067fc2f7a396e8362a195',
      permission: '4e51f1fe820845e5a36de2a53e1ed8c8',
    },
    getByWorkflow: {
      title: '获取流程表单设计详情',
      paramsKey: '7987f42e32215185b9fd289876dde528',
      permission: '80d065875a9f4f3a901a2a23a7ec5a47',
    },
    addBasicInfo: {
      title: '增加流程表单设计',
      paramsKey: '3e001ceefc4aaade3417c91ab593c8b9',
      permission: '03816fec560040bf9ce2e7b92833a407',
    },
    updateBasicInfo: {
      title: '更新流程表单设计',
      paramsKey: 'ee4e562d772401eacf09ee4301c793ec',
      permission: 'c829714a20f84f1b8fcb68ad41723415',
    },
    updateDocumentSchema: {
      title: '更新流程文档设计',
      paramsKey: '6f5bf91368c0dc31080afed316bb14fb',
      permission: '6542d5ca46b4473a9f9b1a14d9e9ae68',
    },
    updateRemarkSchema: {
      title: '更新流程备注设计',
      paramsKey: 'dbc88c0d3958620a435e87f215dd2af5',
      permission: 'adedee9ebee045f7b99b700f8f524596',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'be712b242f89bed04d7e3fccea09ee45',
      permission: '85b6b594f2ac44ff87ed77c8d022d234',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '9e96e1e1b4f179d272752ea28f05062b',
      permission: '2bcb1b7cd1794a2cbf3c8bc701664fcb',
    },
  },
  workflowLine: {
    pageList: {
      title: '分页列表',
      paramsKey: '9aa465c6b64a0df468f0ad4a3f1a28f8',
      permission: 'df70d6514edf456aa9facff8824c18b8',
    },
    singleList: {
      title: '单页列表',
      paramsKey: 'cb4f10cfe1f796dd679da4f06e5977f1',
      permission: '5d5bcae39eff498784a0e7564cf9a1cc',
    },
    get: {
      title: '获取详情',
      paramsKey: '180d2f50a5e2b9fc3a4638ddf0c85e6f',
      permission: 'd8c419baecb74fbb94a00abc42b873cb',
    },
    createLine: {
      title: '增加流程线',
      paramsKey: '22656cffe62b1c4805c5755d9cd2061c',
      permission: 'f35802ea8bb74c6db10d2aabac5d9410',
    },
    updateLine: {
      title: '更新节点',
      paramsKey: 'a1c61809a3d58615625f6fde6412ec21',
      permission: 'fbb6a6c56fa0472d82d16d908db6d826',
    },
    setBranchConditionId: {
      title: '设置流程线条的分支进入条件, 仅应在多分支流程中使用',
      paramsKey: '9d683e30daa42cfbde71db74639c0069',
      permission: 'dd5df9214a164182ae0f62e98709ff87',
    },
    remove: {
      title: '删除',
      paramsKey: 'c8f09633165d684288d9c6cb35c0fed0',
      permission: 'a113e794ec5c4fe39ddf5fc94b5fe200',
    },
    removeAll: {
      title: '删除全部',
      paramsKey: 'ffaaf1cf04d022d2dcda190b4a5f03f2',
      permission: 'd7d78a3115e5495fab8c5dfdb427c807',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '1957262c75c1bf4f2adcb2ddeb743bd3',
      permission: 'cb7af486414f4d5eaca1b171007c19a1',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '1c4e687f2116fb6d17dfab19d2ba9930',
      permission: 'adbb5d27aa6948d394647a3925150e01',
    },
  },
  workflowNode: {
    pageList: {
      title: '分页列表',
      paramsKey: 'cf7451c0a7eda00312dcb3ff84b3db6b',
      permission: '574f639a500b4f44b82e9d7f9f21a314',
    },
    singleList: {
      title: '单页列表',
      paramsKey: 'd9aa6b4d10de43cb604c0dc662377e73',
      permission: 'ad61edbe7e3e4eb2bf5d0954636e2f51',
    },
    get: {
      title: '获取详情',
      paramsKey: 'c7cb917eab7f621a81b2a6b7e0ac2d23',
      permission: '9464b26be5794299a2be4801278edf5f',
    },
    addStartPoint: {
      title: '增加起始节点',
      paramsKey: '848acc5807c61ada559f5056da584204',
      permission: 'b0f467363bb94d62b2362d309c4e8cb4',
    },
    addIntermediatePoint: {
      title: '新建环节节点',
      paramsKey: 'f8df694e5cf1b7435d1aae76c0a01a46',
      permission: '3e99a7aef50d48a5b78a7566262456fb',
    },
    addEndPoint: {
      title: '增加结束节点',
      paramsKey: '37ee16d4a65159bf7beea925229073aa',
      permission: '72363444096e4bde9b363dd9431f655e',
    },
    updateBasicInfo: {
      title: '编辑信息',
      paramsKey: '5b657a6f8338d2d039b07a9a78717236',
      permission: 'db217a20d56f4bb69eb9b1897a973390',
    },
    updateViewConfig: {
      title: '编辑节点视图配置',
      paramsKey: '78bf9e7235754d2dab5aa93e50d8c194',
      permission: '9e5b6b69a8e04a57bf31c41efbf3035d',
    },
    remove: {
      title: '删除',
      paramsKey: 'b41480d581a38d9f09452ce9951a01e6',
      permission: 'd4483bafa5664e6381e88705f3aee7d4',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'f128396930fc781d66d5ae69d575e91c',
      permission: '945382da4d9342b78dbcf357053fb293',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'c01a39af8f83d7c5fbf1ac7e1eeae9d6',
      permission: 'f54c3693cfb2493d8f164a57f577c385',
    },
  },
  workflowNodeApprover: {
    pageList: {
      title: '分页列表',
      paramsKey: '121f6206d086b713ac3090c848d3988c',
      permission: '453d68ad9aff4fb4aee6344e79c9a41b',
    },
    singleList: {
      title: '单页列表',
      paramsKey: '8923597a181e4cce48b77fbd9ab38cfb',
      permission: '146049ae1cc94d71883e9f771bb3f2b8',
    },
    get: {
      title: '获取详情',
      paramsKey: 'ba35f2917dd593c923763d8b3eabeb52',
      permission: '67f4559c25514292a72e979d50c08a32',
    },
    addBasicInfo: {
      title: '增加流程节点审批人',
      paramsKey: '5b2c1246a29e46d9bc617276c71a7f92',
      permission: 'd6e117c5bc3d48adb5c58ac00fe7cc1e',
    },
    remove: {
      title: '删除流程节点审批人',
      paramsKey: 'fe83ab8667069d5effab4908f4c4f0fd',
      permission: 'c9684b65373247dc83ddceb9df4e00a8',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '31085acf20b808a648445e9c359cf1c6',
      permission: 'fc1e5ccb1e364afd89a8051fa60740ad',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '3cbb766f314c89861337d8bada46e1f8',
      permission: '27caf8ba191d4c0381eac444cddaa143',
    },
  },
  workflowRangeEffectiveExternalDepartmentRelation: {
    pageList: {
      title: '分页列表',
      paramsKey: '03209180353180367df64acc2f1f7a23',
      permission: '3aa4904a55e548d78cab812f0239df8f',
    },
    singleList: {
      title: '单页列表',
      paramsKey: 'b300ff7de6f99846a7547d9a94d54b9b',
      permission: '6eab41e8464f44a49d3dda48829f0546',
    },
    get: {
      title: '获取详情',
      paramsKey: '574e7b4bce012dbbfa117ceccdc98f62',
      permission: '7dfc6681faa84442b332c656c5e667c2',
    },
    add: {
      title: '增加工作流外部部门范围生效关系',
      paramsKey: 'c3345253fa7293cf2410da629a199565',
      permission: '6bf56e8bd6e34e1b8de271690fac5313',
    },
    remove: {
      title: '删除',
      paramsKey: '83b8dc518428496ba0fc105c5b7ed6dc',
      permission: '8ab2b08f942c46a9a78898c5ad7cb1a7',
    },
    removeAll: {
      title: '删除全部',
      paramsKey: '8377e5a985f736f05441a1a0ec7ff0ea',
      permission: '7f2bcf37c960403c92ca0b528b7d34df',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '6fba46047591eb761d67621e81eb730b',
      permission: '5a49a7a5533f44c38eca90aa076a7bd1',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '439f93380b7f286649515f4d49401478',
      permission: 'c67e26b0cc554d0c876fb68a877c76d8',
    },
  },
  workflowRangeEffectiveSubsidiaryRelation: {
    pageList: {
      title: '分页列表',
      paramsKey: 'bffde47a67ff15caa7151f63debadf6c',
      permission: '56b5e867d7b6469b98e87f40602fff66',
    },
    singleList: {
      title: '单页列表',
      paramsKey: '5326602e9576bdad6eaf785c00fb3823',
      permission: 'ff92a248360d4149b6170651458f5554',
    },
    get: {
      title: '获取详情',
      paramsKey: 'd38431d503856bf93c53e9613f99a4bf',
      permission: 'b259cbd742a64f47b1b5d14a9aa328a0',
    },
    add: {
      title: '增加工作流子公司范围生效关系',
      paramsKey: '9326955c64cc171981623bf3f32ae0b0',
      permission: '36c20011fcbc40ccabacd36c87e6a134',
    },
    remove: {
      title: '删除',
      paramsKey: '6a553c1996cc8ab984d21fa1c8214eef',
      permission: '7248a41b95334c4e83a017a5a64c2373',
    },
    removeAll: {
      title: '删除全部',
      paramsKey: 'bdf72e418925cdd857bded74bb797f13',
      permission: '62937167201c45a5bce3604e1dfe4e4e',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: 'd04f2e3e44619b7f4b4cfa5e22c3d095',
      permission: '44a219eaef0c4ae99b1988519b6e52ef',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '9b9899eeb07068ee0b8a4d3a488cb60a',
      permission: 'b61489f303404e699cb761627db82c10',
    },
  },
  yonYouImportHistory: {
    pageList: {
      title: '分页列表',
      paramsKey: '3479b0d862f313aff77fb92a9c9e8ad1',
      permission: '9386e58a02104edfa70db276069c3f6c',
    },
    get: {
      title: '获取详情',
      paramsKey: '547304e3a7891c060d0be0552fd3b80f',
      permission: '5532e67852384de2a93e350de80f5c44',
    },
    importFile: {
      title: '导入文件',
      paramsKey: 'ebbc42d68619433f860adf4e84b41c9a',
      permission: '6aae24630cf64e3db5bcc3caee215d6e',
    },
    setMapConfig: {
      title: '设置键值映射',
      paramsKey: '2a62874f1d5956ef956775b8ed446097',
      permission: '111ab99d046240fb8eb71779302ed96a',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '5402b7ff9f83de751264381b30cb1e95',
      permission: 'fdc934c663634bd1bbe098a07fd9cfa0',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: '6903ea25b363bf74097eedd7264298da',
      permission: '1bf4b36d020247fb9682a119837d5ba9',
    },
  },
  yonYouPushMessage: {
    pageList: {
      title: '分页列表',
      paramsKey: 'aab153603f6d7a44d4e44a5c3408472d',
      permission: '00adbcadb6be403b8ac152145af95f1a',
    },
    get: {
      title: '获取详情',
      paramsKey: '05f47059b025ea069484db2b3293d645',
      permission: 'a15dd2fe097b4a9b81af7b98c3b42abb',
    },
    refreshCache: {
      title: '刷新缓存',
      paramsKey: '3d6fc8d2bce4c74f86f1c8f090afd9f5',
      permission: '447d6dd78c1147eabbb0a8bbeb7608e9',
    },
    pageListOperateLog: {
      title: '操作日志列表',
      paramsKey: 'fda9bf98e55b73feafc8f9a589bdb464',
      permission: 'ee90972516ed42018f54b82e8eb7a5bc',
    },
  },
};
