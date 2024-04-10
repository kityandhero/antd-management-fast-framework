import { emptyLogo } from './mediaDefault';

export const renderFurtherColorWhenNoCallProcess = '#b15a43';
export const renderFurtherPrefixWhenNoCallProcess = 'hideCallProcess';

export const emptyLogic = 'empty-logic';

export const whetherList = [
  {
    key: 'b24a21cf-a45c-4b6a-9993-f6953d7eb1ee',
    flag: '0',
    name: '否',
    alias: '否',
    description: '',
    availability: 1,
  },
  {
    key: 'ea1b8b1e-7b78-4b29-bbce-57ef0b25e23c',
    flag: '1',
    name: '是',
    alias: '是',
    description: '',
    availability: 1,
  },
];

const animalTypeCollection = {
  none: 'none',
  fade: 'fade',
  queue: 'queue',
};

export const unknownLabel = '未知';

/**
 * 动画类型
 */
export const animalType = animalTypeCollection;

/**
 * 鉴权失败码
 */
export const authenticationFailCode = 2001;

/**
 * Api请求成功码
 */
export const apiSuccessCode = 200;

/**
 * 用户默认图
 */

export const appInitDefault = {
  platformName: '平台名称',
  appName: '应用名称',
  appDescription: '应用描述',
  entranceLogo: '',
  shareLogo: '',
  shareLogoName: 'Logo',
  leftBarText: '左侧名称',
  companyName: '公司名称',
  copyright: '版权描述',
  successCode: apiSuccessCode,
  authenticationFailCode: authenticationFailCode,
  apiPrefix: {
    corsTargetProduction: '',
  },
  showSelectLanguage: false,
  showLogoInEntrance: true,
  useShortcutNavigation: true,
  emptyLogo: emptyLogo,
  leftBarLogo: emptyLogo,
  tokenName: 'token',
  signInApi: '',
  signInCaptchaApi: '',
  signInSimulationData: {},
  signOutApi: '',
  applicationListDataApi: '',
  applicationListData: [],
  metaDataApi: '',
  metaData: {},
  currentOperatorApi: '',
  currentOperatorSimulationData: {},
  authenticationFailRedirectPath: '',
  authorizationFailRedirectPath: '',
  showLogInConsole: false,
  localStorageSecretSwitch: true,
  apiVersion: '',
  imageUploadMaxSize: 2,
  audioUploadMaxSize: 4,
  videoUploadMaxSize: 4,
  fileUploadMaxSize: 2,
  tinymceScriptSrc: '',
  tinymceApiKey: '',
  tinymceImagesUploadUrl: '',
  layoutSetting: {
    fixSiderbar: true,
    layout: 'mix',
    splitMenus: true,
  },
};

export const layoutCollection = {
  top: 'top',
  side: 'side',
  mix: 'mix',
};

export const formNameCollection = {
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '数据的创建时间',
  },
  customOperate: {
    label: '操作',
    name: 'operateName',
    helper: '',
  },
};

export const dropdownExpandItemType = {
  divider: 'divider',
  item: 'item',
};

export const imageContentPreviewMode = {
  html: 1,
  listItem: 2,
  imageList: 3,
};

export const columnFacadeMode = {
  /**
   * 省略文本
   * value : ellipsis
   */
  ellipsis: 'ellipsis',

  /**
   * 图片展示
   * value : image
   */
  image: 'image',

  /**
   * 颜色展示
   * value : color
   */
  color: 'color',

  /**
   * 日期
   * value : datetime
   */
  datetime: 'datetime',

  /**
   * Badge展示
   * value : badge
   */
  badge: 'badge',

  /**
   * 货币，例如￥0.05
   * value : money
   */
  money: 'money',

  /**
   * dropdown
   * value : dropdown component
   */
  dropdown: 'dropdown',
};

export const columnPlaceholder = {
  placeholder: true,
  title: '其他',
  dataIndex: null,
  align: 'center',
  render: () => '--',
};

export const columnSerialNumber = {
  placeholder: true,
  title: 'No.',
  dataIndex: null,
  align: 'center',
  render: (value, record, index) => {
    return index + 1;
  },
};

export const contentConfig = {
  wrapperType: {
    page: 'page',
    model: 'model',
    drawer: 'drawer',
  },
};

export const listViewConfig = {
  dataContainerExtraActionBuildType: {
    generalButton: 'generalButton',
    generalExtraButton: 'generalExtraButton',
    button: 'button',

    /**
     * dropdown
     */
    dropdown: 'dropdown',

    /**
     * 带扩展操作的按钮
     */
    dropdownButton: 'dropdownButton',

    /**
     * 带扩展操作的省略按钮，省略占位符本身不具有操作
     */
    dropdownEllipsis: 'dropdownEllipsis',

    /**
     * 带图标文字，图标为空或者文字为空情况下渲染方式有差异
     */
    iconInfo: 'iconInfo',

    /**
     * 自定义选择框
     */
    flexSelect: 'flexSelect',

    /**
     * colorPicker
     */
    colorPicker: 'colorPicker',

    /**
     * generalExtraColorPicker
     */
    generalExtraColorPicker: 'generalExtraColorPicker',

    /**
     * 指定渲染自定义组件，组件由配置传入
     */
    component: 'component',
  },
  viewMode: {
    /**
     * 适用Table组件构建展示
     */
    table: 0,

    /**
     * 使用List组件构建展示
     */
    list: 1,

    /**
     * 构建Card集合展示
     */
    cardCollectionView: 2,

    /**
     * 构建自定义集合展示
     */
    customView: 3,
  },
  tableSize: {
    middle: 'middle',
    small: 'small',
    large: 'large',
  },
  expandAnimalType: {
    none: animalTypeCollection.none,
    fade: animalTypeCollection.fade,
    queue: animalTypeCollection.queue,
  },
};

/**
 * 扩展区构建模式
 */
export const extraBuildType = {
  /**
   * 内置的刷新按钮，根据请求配置触发重新加载，一般用于详情类展示或表单初始加载
   */
  refresh: 'refresh',

  /**
   * 内置的保存按钮，表单上下文中将根据提交配置触发提交操作，非表单环境不要使用
   */
  save: 'save',

  /**
   * 根据配置项渲染按钮，事件触发需要自定义指定
   */
  generalButton: 'generalButton',

  /**
   * 根据配置项渲染高级按钮，事件触发需要自定义指定
   */
  generalExtraButton: 'generalExtraButton',

  /**
   * colorPicker
   */
  colorPicker: 'colorPicker',

  /**
   * generalExtraColorPicker
   */
  generalExtraColorPicker: 'generalExtraColorPicker',

  /**
   * 带图标文字，图标为空或者文字为空情况下渲染方式有差异
   */
  iconInfo: 'iconInfo',

  /**
   * 彩色文字
   */
  colorText: 'colorText',

  /**
   * 自定义选择框
   */
  flexSelect: 'flexSelect',

  /**
   * 根据配置项渲染按钮，事件触发需要自定义指定,配置项与generalButton相仿，配置模式有所不同，最终效果类似
   */
  button: 'button',

  /**
   * 带扩展操作的按钮
   */
  dropdownButton: 'dropdownButton',

  /**
   * 带扩展操作的省略按钮，省略占位符本身不具有操作
   */
  dropdownEllipsis: 'dropdownEllipsis',

  /**
   * dropdown
   */
  dropdown: 'dropdown',

  /**
   * divider
   */
  divider: 'divider',

  /**
   * 指定渲染自定义组件，组件由配置传入
   */
  component: 'component',
};

export const drawerConfig = {
  /**
   * 扩展区构建模式
   */
  extraBuildType: extraBuildType,
  bottomBarBuildType: {
    close: 'close',
    refresh: 'refresh',
    save: 'save',
    generalButton: 'generalButton',
    generalExtraButton: 'generalExtraButton',
    iconInfo: 'iconInfo',
    button: 'button',
    dropdownButton: 'dropdownButton',
    dropdownEllipsis: 'dropdownEllipsis',
    dropdown: 'dropdown',

    /**
     * 指定渲染自定义组件，组件由配置传入
     */
    component: 'component',
  },
};

/**
 * card配置集合
 */
export const cardConfig = {
  ...contentConfig,
  renderType: {
    normal: 'normal',
    help: 'help',
  },

  /**
   * 动画支持
   */
  animalType: {
    none: animalTypeCollection.none,
    fade: animalTypeCollection.fade,
    queue: animalTypeCollection.queue,
  },

  /**
   * 扩展区构建模式
   */
  extraBuildType: {
    ...extraBuildType,
  },
  contentItemType: {
    /**
     * Col占位符,自由指定占用大小
     */
    placeholder: 'placeholder',

    /**
     * 纯文本渲染项目
     */
    text: 'text',

    /**
     * 输入框，仅用于单页详情或表单上下文环境
     */
    input: 'input',

    /**
     * 密码框，仅用于单页详情或表单上下文环境
     */
    password: 'password',

    /**
     * 数字框，仅用于单页详情或表单上下文环境
     */
    inputNumber: 'inputNumber',

    /**
     * 文本域，仅用于单页详情或表单上下文环境
     */
    textarea: 'textarea',

    /**
     * colorPicker
     */
    colorPicker: 'colorPicker',

    /**
     * switch开关
     */
    switch: 'switch',

    /**
     * 一般选择框
     */
    select: 'select',

    /**
     * "是/否" 选择框
     */
    whetherSelect: 'whetherSelect',

    /**
     * 自定义选择框
     */
    customSelect: 'customSelect',

    /**
     * 自定义选择框
     */
    flexSelect: 'flexSelect',

    /**
     * 一般单选框
     */
    radio: 'radio',

    /**
     * "是/否" 单选框
     */
    whetherRadio: 'whetherRadio',

    /**
     * 自定义单选框
     */
    customRadio: 'customRadio',

    /**
     * 纯展示文本域，仅用于单页详情或表单上下文环境
     */
    onlyShowTextarea: 'onlyShowTextarea',

    /**
     * 只读输入框，仅用于单页详情或表单上下文环境
     */
    onlyShowInput: 'onlyShowInput',

    /**
     * 只读日期框，仅用于单页详情或表单上下文环境
     */
    onlyShowInputDatetime: 'onlyShowInputDatetime',

    /**
     * 文字信息展示，仅用于单页详情或表单上下文环境
     */
    onlyShowText: 'onlyShowText',

    /**
     * 图片上传
     */
    imageUpload: 'imageUpload',

    /**
     * 图片展示
     */
    imageShow: 'imageShow',

    /**
     * 图片集展示
     */
    imageListShow: 'imageListShow',

    /**
     * 文件串行化上传
     */
    fileBase64Upload: 'fileBase64Upload',

    /**
     * 视频上传
     */
    videoUpload: 'videoUpload',

    /**
     * 文件上传
     */
    fileUpload: 'fileUpload',

    /**
     * 音频上传
     */
    audioUpload: 'audioUpload',

    /**
     * 内部自定义组件，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    innerComponent: 'innerComponent',

    /**
     * 保存按钮，表单上下文中将根据提交配置触发提交操作，非表单环境不要使用，与extraBuildType处的save具有相似功能
     */
    save: 'save',

    /**
     * 渲染按钮
     */
    button: 'button',

    /**
     * 操作集合
     */
    actionList: 'actionList',

    /**
     * 组件
     */
    component: 'component',

    /**
     * 渲染当前时间，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    nowTime: 'nowTime',

    /**
     * 日期选择项，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    datePicker: 'datePicker',

    /**
     * 时间选择项，仅用于单页详情或表单上下文环境显示单项内容区域
     */
    timePicker: 'timePicker',

    /**
     * json可视化展示
     */
    jsonView: 'jsonView',

    /**
     * json可视化展示
     */
    syntaxHighlighterView: 'syntaxHighlighterView',

    /**
     * flex类型文字
     */
    flexText: 'flexText',

    /**
     * flex类型文字
     */
    onlyShowTextByFlexText: 'onlyShowTextByFlexText',

    /**
     * 分隔符
     */
    divider: 'divider',

    /**
     * Html
     */
    html: 'html',

    /**
     * CustomGrid
     */
    customGrid: 'customGrid',

    /**
     * tree
     */
    tree: 'tree',

    /**
     * tinymce
     */
    tinymce: 'tinymce',

    /**
     * treeSelect
     */
    treeSelect: 'treeSelect',
  },
};

export const searchCardConfig = {
  contentItemType: {
    /**
     * 输入框
     */
    input: 'input',

    /**
     * 数字框
     */
    inputNumber: 'inputNumber',

    /**
     * "是/否" 选择框
     */
    whetherSelect: 'whetherSelect',

    /**
     * 自定义选择框
     */
    customSelect: 'customSelect',

    /**
     * 自定义选择框
     */
    flexSelect: 'flexSelect',

    /**
     * "是/否" 单选框
     */
    whetherRadio: 'whetherRadio',

    /**
     * 自定义单选框
     */
    customRadio: 'customRadio',

    /**
     * 只读输入框
     */
    onlyShowInput: 'onlyShowInput',

    /**
     * 内部自定义组件
     */
    innerComponent: 'innerComponent',

    /**
     * 自定义组件
     */
    component: 'component',

    /**
     * 日期选择框
     */
    datePicker: 'datePicker',

    /**
     * 日期范围选择框
     */
    customRangePicker: 'customRangePicker',

    /**
     * 分隔符
     */
    divider: 'divider',
  },
};

/**
 * 文本类型不限【-10000】
 */
export const unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000',
};

/**
 * 数字类型不限【-10000】
 */
export const unlimitedWithNumberFlag = {
  key: -10_000,
  name: '不限',
  flag: -10_000,
};

/**
 * 日志类型
 */
export const logLevel = {
  /**
   * 跟踪
   */
  trace: 'trace',

  /**
   * 调试
   */
  debug: 'debug',

  /**
   * 警告
   */
  warn: 'warn',

  /**
   * 错误
   */
  error: 'error',

  /**
   * 信息
   */
  info: 'info',

  /**
   * 配置
   */
  config: 'config',

  /**
   * 执行
   */
  execute: 'execute',
};

export const logShowMode = {
  /**
   * 未知
   */
  unknown: 'unknown',

  /**
   * 文本
   */
  text: 'text',

  /**
   * 对象
   */
  object: 'object',
};

export const dataTypeCollection = {
  /**
   * 未知类型
   */
  unknown: {
    flag: 0,
    name: '未知类型',
  },

  /**
   * Json单体
   */
  jsonObject: {
    flag: 100,
    name: 'Json单体',
  },

  /**
   * Json列表
   */
  jsonObjectList: {
    flag: 200,
    name: 'Json列表',
  },

  /**
   * 一般值
   */
  commonValue: {
    flag: 300,
    name: '一般值',
  },

  /**
   * Html
   */
  html: {
    flag: 400,
    name: 'Html',
  },
};

export const tabBarCollection = {
  /**
   * 扩展区构建模式
   */
  extraBuildType: extraBuildType,
};

/**
 *设备模拟集合
 */
export const mobileTypeCollection = {
  /**
   * 无轮廓
   */
  noneSketch: {
    label: '无轮廓',
    name: 'noneSketch',
    helper: '',
  },

  /**
   * 模拟轮廓
   */
  roughSketch: {
    label: '模拟轮廓',
    name: 'roughSketch',
    helper: '',
  },

  /**
   * Iphone X
   */
  iphoneX: {
    label: 'Iphone X',
    name: 'iphoneX',
    helper: '',
  },

  /**
   * Iphone 8 Plus
   */
  iphone8plus: {
    label: 'Iphone 8 Plus',
    name: 'iphone8plus',
    helper: '',
  },

  /**
   * Iphone 8
   */
  iphone8: {
    label: 'Iphone 8',
    name: 'iphone8',
    helper: '',
  },

  /**
   * IPhone 5S
   */
  iPhone5S: {
    label: 'IPhone 5S',
    name: 'iPhone5S',
    helper: '',
  },

  /**
   * Galaxy Note 8
   */
  galaxyNote8: {
    label: 'GalaxyNote8',
    name: 'galaxyNote8',
    helper: '',
  },
};

export {
  emptyImage as defaultEmptyImage,
  userAvatar as defaultUserAvatar,
} from './mediaDefault';
