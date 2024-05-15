// 该配置主要配置远程接口配置和行为,一般放到服务端
window.appInitCustomRemote = {
  platformName: '示例项目',
  appName: '示例应用',
  appDescription: '用于开发示例',
  entranceLogo: '',
  shareLogo: '',
  shareLogoName: '示例项目',
  leftBarLogo: '',
  leftBarText: '示例项目',
  companyName: '中国***公司',
  copyright: '2020 中国****科技有限公司 技术部出品',
  apiPrefix: {
    corsTargetDomain: '',
  },
  metaDataApi: '',
  apiVersion: 'v1',
  // tinymceScriptSrc:
  //   'https://cdn.bootcdn.net/ajax/libs/tinymce/6.7.0/tinymce.min.js',
  tinymceScriptSrc:
    'http://file.oa.32306.net/tinymce/js/tinymce/tinymce.min.js',
  tinymceApiKey: 'al3poaukm85tca809x2fsl7hnw3vau5i4s5zx3fv3rforr5h',
  tinymceLanguage: 'zh_CN',
  tinymceImagesUploadUrl: '/editor/uploadImage',
  applicationListData: [
    {
      title: '远程配置导航',
      children: [
        {
          icon: '/noImageSmall.png',
          title: '远程配置导航1',
          desc: '跨站点远程配置导航1',
          url: 'https://ant.design',
        },
        {
          icon: '/noImageSmall.png',
          title: '远程配置导航2',
          desc: '跨站点远程配置导航2',
          url: 'https://ant.design',
        },
      ],
    },
  ],
};
