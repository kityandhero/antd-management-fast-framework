var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// 该配置主要配置远程接口配置和行为,一般放到服务端
window.appInitCustomRemote = {
  platformName: '测试平台',
  appName: '测试应用',
  appDescription: '用于开发测试',
  loginLogo: '',
  shareLogo: '',
  shareLogoName: '测试平台',
  leftBarLogo: '',
  leftBarText: '测试系统测试平台测试平台',
  companyName: '中国***公司',
  copyright: '2020 中国****科技有限公司 技术部出品',
  apiPrefix: {
    corsTargetDomain: '',
  },
  apiSuccessCode: 200,
  authenticationFailCode: 2001,
  loginPath: '/user/login',
  apiVersion: 'v1',
  tinymceApiKey: 'al3poaukm85tca809x2fsl7hnw3vau5i4s5zx3fv3rforr5h',
  tinymceConfig: {
    images_upload_url: '/editor/uploadImage',
    // tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
    // tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
    // tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
    // tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
    // mentions_fetch: mentions_fetch,
    // mentions_menu_hover: mentions_menu_hover,
    // mentions_menu_complete: mentions_menu_complete,
    // mentions_select: mentions_select,
  },
};
