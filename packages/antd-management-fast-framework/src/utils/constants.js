import {
  ApartmentOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  BellOutlined,
  BorderOuterOutlined,
  BugOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  ClearOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  CloudDownloadOutlined,
  ColumnHeightOutlined,
  CompressOutlined,
  ContactsOutlined,
  CopyOutlined,
  DashboardOutlined,
  DeleteOutlined,
  DesktopOutlined,
  DingdingOutlined,
  DisconnectOutlined,
  DownCircleOutlined,
  DownloadOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  ExportOutlined,
  EyeOutlined,
  FileOutlined,
  FilterOutlined,
  FolderOutlined,
  ForkOutlined,
  FormOutlined,
  GiftOutlined,
  HistoryOutlined,
  HomeOutlined,
  IdcardOutlined,
  ImportOutlined,
  InboxOutlined,
  InfoCircleOutlined,
  InsertRowAboveOutlined,
  InsertRowBelowOutlined,
  InsertRowLeftOutlined,
  InsertRowRightOutlined,
  InstagramOutlined,
  KeyOutlined,
  LeftCircleOutlined,
  LeftOutlined,
  LineOutlined,
  LinkOutlined,
  LoadingOutlined,
  LockOutlined,
  LoginOutlined,
  LogoutOutlined,
  MacCommandOutlined,
  MailOutlined,
  MessageOutlined,
  MinusCircleOutlined,
  MobileOutlined,
  PauseCircleOutlined,
  PhoneOutlined,
  PictureOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  PoweroffOutlined,
  ProfileOutlined,
  ProjectOutlined,
  QrcodeOutlined,
  QuestionCircleFilled,
  ReadOutlined,
  ReconciliationOutlined,
  RedoOutlined,
  ReloadOutlined,
  RetweetOutlined,
  RightCircleOutlined,
  RightOutlined,
  RollbackOutlined,
  SaveOutlined,
  ScanOutlined,
  ScheduleOutlined,
  SearchOutlined,
  SelectOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  SnippetsOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  SoundOutlined,
  SwapOutlined,
  SyncOutlined,
  TagOutlined,
  TagsOutlined,
  TeamOutlined,
  ToolOutlined,
  UndoOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
  UpCircleOutlined,
  UploadOutlined,
  UpOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import React from 'react';

import { emptyLogo as emptyLogoSource } from './mediaDefault';

/**
 * 动画类型
 */
export const animalType = {
  none: 'none',
  fade: 'fade',
  queue: 'queue',
};

export const zeroString = '0';

export const zeroInt = 0;

/**
 * 鉴权失败码
 */
export const authenticationFailCode = 2001;

/**
 * Api请求成功码
 */
export const apiSuccessCode = 200;

/**
 * 1970-01-01 00:00
 */
export const emptyDatetime = '1970-01-01 00:00';

/**
 * 用户默认图
 */
export const defaultUserAvatar = '/user.png';

export const defaultEmptyImage = '/noImageSmall.png';

export const emptyLogo = emptyLogoSource;

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
  apiPrefix: {
    corsTargetProduction: '',
  },
  showSelectLanguage: false,
  showLogoInEntrance: true,
  emptyLogo,
  leftBarLogo: emptyLogo,
  apiSuccessCode,
  authenticationFailCode,
  entrancePath: '/entrance/signIn',
  showLogInConsole: false,
  showRequestInfo: false,
  useVirtualRequest: false,
  showUseVirtualRequestMessage: false,
  apiVersion: '',
  imageUploadMaxSize: 2,
  audioUploadMaxSize: 4,
  videoUploadMaxSize: 4,
  fileUploadMaxSize: 2,
  useNprogress: true,
  tinymceApiKey: '',
  tinymceImagesUploadUrl: '',
};

/**
 * accessWaySpecialCollection
 */
export const accessWaySpecialCollection = {
  super: {
    permission: 'super',
  },
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

/**
 * 转换集合
 */
export const convertCollection = {
  /**
   * 数字
   */
  number: 'number',

  /**
   * 日期 date
   */
  datetime: 'datetime',

  /**
   * 字符串
   */
  string: 'string',

  /**
   * moment日期
   */
  moment: 'moment',

  /**
   * 金额
   */
  money: 'money',

  /**
   * 数组
   */
  array: 'array',
};

/**
 * 格式化集合
 */
export const formatCollection = {
  /**
   * 金额 ￥ 0.00
   */
  money: 'money',

  /**
   * 格式化日期 YYYY-MM-DD hh:mm:ss
   */
  datetime: 'datetime',

  /**
   * 中文金额
   */
  chineseMoney: 'chineseMoney',

  /**
   * 百分比
   */
  percentage: 'percentage',
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

export const datetimeFormat = {
  yearMonthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  yearMonthDayHourMinute: 'YYYY-MM-DD HH:mm',
  yearMonthDay: 'YYYY-MM-DD',
  yearMonth: 'YYYY-MM',
  year: 'YYYY',
  monthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  monthDayHourMinute: 'MM-DD HH:mm',
  monthDay: 'MM-DD',
  hourMinute: 'HH:mm',
  hourMinuteSecond: 'HH:mm:ss',
};

export const selectModeCollection = {
  /**
   * 侧拉面板
   * value : 0
   */
  drawer: 0,

  /**
   * 弹出框
   * value : 1
   */
  modal: 1,
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

export const contentConfig = {
  wrapperType: {
    page: 'page',
    model: 'model',
    drawer: 'drawer',
  },
};

export const pageHeaderRenderType = {
  descriptionGrid: 'descriptionGrid',
  paragraph: 'paragraph ',
  action: 'action ',
};

export const listViewConfig = {
  dataContainerExtraActionBuildType: {
    generalButton: 'generalButton',
    button: 'button',
    dropdown: 'dropdown',
    dropdownButton: 'dropdownButton',
    dropdownEllipsis: 'dropdownEllipsis',
    iconInfo: 'iconInfo',

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
  },
  tableSize: {
    middle: 'middle',
    small: 'small',
    large: 'large',
  },
  expandAnimalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue,
  },
};

/**
 * 排序动作
 */
export const sortOperate = {
  moveUp: 'moveUp',
  moveDown: 'moveDown',
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
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue,
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
     * switch开关
     */
    switch: 'switch',

    /**
     * 一般选择框
     */
    select: 'select',

    /**
     * ”是/否“ 选择框
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
     * ”是/否“ 单选框
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
     * 自定义选择框
     */
    customSelect: 'customSelect',

    /**
     * 自定义选择框
     */
    flexSelect: 'flexSelect',

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
 * 字符串类型 ‘0’/'1'
 */
export const whetherString = {
  no: '0',
  yes: '1',
};

/**
 * 字符串类型 0/1
 */
export const whetherNumber = {
  no: 0,
  yes: 1,
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
  key: -10000,
  name: '不限',
  flag: -10000,
};

/**
 * 日志类型
 */
export const logLevel = {
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

export const notificationTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open',
};

export const messageTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  loading: 'loading',
  open: 'open',
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

export const iconCollection = {
  help: <InfoCircleOutlined />,
  add: <PlusOutlined />,
  plus: <PlusOutlined />,
  addCircle: <PlusCircleOutlined />,
  plusCircle: <PlusCircleOutlined />,
  reload: <ReloadOutlined />,
  edit: <EditOutlined />,
  enable: <PlayCircleOutlined />,
  disable: <PauseCircleOutlined />,
  playCircle: <PlayCircleOutlined />,
  pauseCircle: <PauseCircleOutlined />,
  delete: <DeleteOutlined />,
  clock: <ClockCircleOutlined />,
  close: <CloseCircleOutlined />,
  closeCircle: <CloseCircleOutlined />,
  copy: <CopyOutlined />,
  eye: <EyeOutlined />,
  export: <ExportOutlined />,
  home: <HomeOutlined />,
  import: <ImportOutlined />,
  idCard: <IdcardOutlined />,
  search: <SearchOutlined />,
  setting: <SettingOutlined />,
  tag: <TagOutlined />,
  tags: <TagsOutlined />,
  upload: <UploadOutlined />,
  user: <UserOutlined />,
  video: <VideoCameraOutlined />,
  videoCameraAdd: <VideoCameraAddOutlined />,
  loading: <LoadingOutlined />,
  users: <TeamOutlined />,
  tool: <ToolOutlined />,
  sync: <SyncOutlined />,
  sound: <SoundOutlined />,
  shop: <ShopOutlined />,
  shoppingCart: <ShoppingCartOutlined />,
  shopping: <ShoppingOutlined />,
  schedule: <ScheduleOutlined />,
  scan: <ScanOutlined />,
  read: <ReadOutlined />,
  qrCode: <QrcodeOutlined />,
  powerOff: <PoweroffOutlined />,
  phone: <PhoneOutlined />,
  profile: <ProfileOutlined />,
  project: <ProjectOutlined />,
  message: <MessageOutlined />,
  lock: <LockOutlined />,
  unlock: <UnlockOutlined />,
  mail: <MailOutlined />,
  line: <LineOutlined />,
  key: <KeyOutlined />,
  history: <HistoryOutlined />,
  gift: <GiftOutlined />,
  folder: <FolderOutlined />,
  filter: <FilterOutlined />,
  download: <DownloadOutlined />,
  ellipsis: <EllipsisOutlined />,
  desktop: <DesktopOutlined />,
  dashboard: <DashboardOutlined />,
  contacts: <ContactsOutlined />,
  clear: <ClearOutlined />,
  bell: <BellOutlined />,
  undo: <UndoOutlined />,
  redo: <RedoOutlined />,
  form: <FormOutlined />,
  warning: <WarningOutlined />,
  question: <QuestionCircleFilled />,
  logout: <LogoutOutlined />,
  login: <LoginOutlined />,
  arrowUp: <ArrowUpOutlined />,
  arrowDown: <ArrowDownOutlined />,
  arrowLeft: <ArrowLeftOutlined />,
  arrowRight: <ArrowRightOutlined />,
  swap: <SwapOutlined />,
  online: <VerticalAlignTopOutlined />,
  offline: <VerticalAlignBottomOutlined />,
  up: <UpOutlined />,
  upCircle: <UpCircleOutlined />,
  down: <DownOutlined />,
  downCircle: <DownCircleOutlined />,
  left: <LeftOutlined />,
  leftCircle: <LeftCircleOutlined />,
  right: <RightOutlined />,
  rightCircle: <RightCircleOutlined />,
  picture: <PictureOutlined />,
  link: <LinkOutlined />,
  checkCircle: <CheckCircleOutlined />,
  warningCircle: <ExclamationCircleOutlined />,
  sortAscending: <SortAscendingOutlined />,
  sortDescending: <SortDescendingOutlined />,
  infoCircle: <InfoCircleOutlined />,
  instagram: <InstagramOutlined />,
  disconnect: <DisconnectOutlined />,
  insertRowAbove: <InsertRowAboveOutlined />,
  insertRowBelow: <InsertRowBelowOutlined />,
  insertRowLeft: <InsertRowLeftOutlined />,
  insertRowRight: <InsertRowRightOutlined />,
  rollback: <RollbackOutlined />,
  snippets: <SnippetsOutlined />,
  compress: <CompressOutlined />,
  minusCircle: <MinusCircleOutlined />,
  select: <SelectOutlined />,
  plusSquare: <PlusSquareOutlined />,
  unorderedList: <UnorderedListOutlined />,
  fork: <ForkOutlined />,
  bug: <BugOutlined />,
  cloudDownload: <CloudDownloadOutlined />,
  reconciliation: <ReconciliationOutlined />,
  apartment: <ApartmentOutlined />,
  dingDing: <DingdingOutlined />,
  macCommand: <MacCommandOutlined />,
  inbox: <InboxOutlined />,
  save: <SaveOutlined />,
  file: <FileOutlined />,
  tool: <ToolOutlined />,
  mobile: <MobileOutlined />,
  borderOuter: <BorderOuterOutlined />,
  columnHeight: <ColumnHeightOutlined />,
  verticalAlignMiddle: <VerticalAlignMiddleOutlined />,
  caretUp: <CaretUpOutlined />,
  caretDown: <CaretDownOutlined />,
  retweet: <RetweetOutlined />,
  exclamationCircle: <ExclamationCircleOutlined />,
};

export const iconBuilder = {
  help: (props = null) => {
    return <InfoCircleOutlined {...(props || {})} />;
  },
  add: (props = null) => {
    return <PlusOutlined {...(props || {})} />;
  },
  plus: (props = null) => {
    return <PlusOutlined {...(props || {})} />;
  },
  addCircle: (props = null) => {
    return <PlusCircleOutlined {...(props || {})} />;
  },
  plusCircle: (props = null) => {
    return <PlusCircleOutlined {...(props || {})} />;
  },
  reload: (props = null) => {
    return <ReloadOutlined {...(props || {})} />;
  },
  edit: (props = null) => {
    return <EditOutlined {...(props || {})} />;
  },
  enable: (props = null) => {
    return <PlayCircleOutlined {...(props || {})} />;
  },
  disable: (props = null) => {
    return <PauseCircleOutlined {...(props || {})} />;
  },
  playCircle: (props = null) => {
    return <PlayCircleOutlined {...(props || {})} />;
  },
  pauseCircle: (props = null) => {
    return <PauseCircleOutlined {...(props || {})} />;
  },
  delete: (props = null) => {
    return <DeleteOutlined {...(props || {})} />;
  },
  clock: (props = null) => {
    return <ClockCircleOutlined {...(props || {})} />;
  },
  close: (props = null) => {
    return <CloseCircleOutlined {...(props || {})} />;
  },
  closeCircle: (props = null) => {
    return <CloseCircleOutlined {...(props || {})} />;
  },
  copy: (props = null) => {
    return <CopyOutlined {...(props || {})} />;
  },
  eye: (props = null) => {
    return <EyeOutlined {...(props || {})} />;
  },
  export: (props = null) => {
    return <ExportOutlined {...(props || {})} />;
  },
  home: (props = null) => {
    return <HomeOutlined {...(props || {})} />;
  },
  import: (props = null) => {
    return <ImportOutlined {...(props || {})} />;
  },
  idCard: (props = null) => {
    return <IdcardOutlined {...(props || {})} />;
  },
  search: (props = null) => {
    return <SearchOutlined {...(props || {})} />;
  },
  setting: (props = null) => {
    return <SettingOutlined {...(props || {})} />;
  },
  tag: (props = null) => {
    return <TagOutlined {...(props || {})} />;
  },
  tags: (props = null) => {
    return <TagsOutlined {...(props || {})} />;
  },
  upload: (props = null) => {
    return <UploadOutlined {...(props || {})} />;
  },
  user: (props = null) => {
    return <UserOutlined {...(props || {})} />;
  },
  video: (props = null) => {
    return <VideoCameraOutlined {...(props || {})} />;
  },
  videoCameraAdd: (props = null) => {
    return <VideoCameraAddOutlined {...(props || {})} />;
  },
  loading: (props = null) => {
    return <LoadingOutlined {...(props || {})} />;
  },
  users: (props = null) => {
    return <TeamOutlined {...(props || {})} />;
  },
  tool: (props = null) => {
    return <ToolOutlined {...(props || {})} />;
  },
  sync: (props = null) => {
    return <SyncOutlined {...(props || {})} />;
  },
  sound: (props = null) => {
    return <SoundOutlined {...(props || {})} />;
  },
  shop: (props = null) => {
    return <ShopOutlined {...(props || {})} />;
  },
  shoppingCart: (props = null) => {
    return <ShoppingCartOutlined {...(props || {})} />;
  },
  shopping: (props = null) => {
    return <ShoppingOutlined {...(props || {})} />;
  },
  schedule: (props = null) => {
    return <ScheduleOutlined {...(props || {})} />;
  },
  scan: (props = null) => {
    return <ScanOutlined {...(props || {})} />;
  },
  read: (props = null) => {
    return <ReadOutlined {...(props || {})} />;
  },
  qrCode: (props = null) => {
    return <QrcodeOutlined {...(props || {})} />;
  },
  powerOff: (props = null) => {
    return <PoweroffOutlined {...(props || {})} />;
  },
  phone: (props = null) => {
    return <PhoneOutlined {...(props || {})} />;
  },
  profile: (props = null) => {
    return <ProfileOutlined {...(props || {})} />;
  },
  project: (props = null) => {
    return <ProjectOutlined {...(props || {})} />;
  },
  message: (props = null) => {
    return <MessageOutlined {...(props || {})} />;
  },
  lock: (props = null) => {
    return <LockOutlined {...(props || {})} />;
  },
  unlock: (props = null) => {
    return <UnlockOutlined {...(props || {})} />;
  },
  mail: (props = null) => {
    return <MailOutlined {...(props || {})} />;
  },
  line: (props = null) => {
    return <LineOutlined {...(props || {})} />;
  },
  key: (props = null) => {
    return <KeyOutlined {...(props || {})} />;
  },
  history: (props = null) => {
    return <HistoryOutlined {...(props || {})} />;
  },
  gift: (props = null) => {
    return <GiftOutlined {...(props || {})} />;
  },
  folder: (props = null) => {
    return <FolderOutlined {...(props || {})} />;
  },
  filter: (props = null) => {
    return <FilterOutlined {...(props || {})} />;
  },
  download: (props = null) => {
    return <DownloadOutlined {...(props || {})} />;
  },
  ellipsis: (props = null) => {
    return <EllipsisOutlined {...(props || {})} />;
  },
  desktop: (props = null) => {
    return <DesktopOutlined {...(props || {})} />;
  },
  dashboard: (props = null) => {
    return <DashboardOutlined {...(props || {})} />;
  },
  contacts: (props = null) => {
    return <ContactsOutlined {...(props || {})} />;
  },
  clear: (props = null) => {
    return <ClearOutlined {...(props || {})} />;
  },
  bell: (props = null) => {
    return <BellOutlined {...(props || {})} />;
  },
  undo: (props = null) => {
    return <UndoOutlined {...(props || {})} />;
  },
  redo: (props = null) => {
    return <RedoOutlined {...(props || {})} />;
  },
  form: (props = null) => {
    return <FormOutlined {...(props || {})} />;
  },
  warning: (props = null) => {
    return <WarningOutlined {...(props || {})} />;
  },
  question: (props = null) => {
    return <QuestionCircleFilled {...(props || {})} />;
  },
  logout: (props = null) => {
    return <LogoutOutlined {...(props || {})} />;
  },
  login: (props = null) => {
    return <LoginOutlined {...(props || {})} />;
  },
  arrowUp: (props = null) => {
    return <ArrowUpOutlined {...(props || {})} />;
  },
  arrowDown: (props = null) => {
    return <ArrowDownOutlined {...(props || {})} />;
  },
  arrowLeft: (props = null) => {
    return <ArrowLeftOutlined {...(props || {})} />;
  },
  arrowRight: (props = null) => {
    return <ArrowRightOutlined {...(props || {})} />;
  },
  swap: (props = null) => {
    return <SwapOutlined {...(props || {})} />;
  },
  online: (props = null) => {
    return <VerticalAlignTopOutlined {...(props || {})} />;
  },
  offline: (props = null) => {
    return <VerticalAlignBottomOutlined {...(props || {})} />;
  },
  up: (props = null) => {
    return <UpOutlined {...(props || {})} />;
  },
  upCircle: (props = null) => {
    return <UpCircleOutlined {...(props || {})} />;
  },
  down: (props = null) => {
    return <DownOutlined {...(props || {})} />;
  },
  downCircle: (props = null) => {
    return <DownCircleOutlined {...(props || {})} />;
  },
  left: (props = null) => {
    return <LeftOutlined {...(props || {})} />;
  },
  leftCircle: (props = null) => {
    return <LeftCircleOutlined {...(props || {})} />;
  },
  right: (props = null) => {
    return <RightOutlined {...(props || {})} />;
  },
  rightCircle: (props = null) => {
    return <RightCircleOutlined {...(props || {})} />;
  },
  picture: (props = null) => {
    return <PictureOutlined {...(props || {})} />;
  },
  link: (props = null) => {
    return <LinkOutlined {...(props || {})} />;
  },
  checkCircle: (props = null) => {
    return <CheckCircleOutlined {...(props || {})} />;
  },
  warningCircle: (props = null) => {
    return <ExclamationCircleOutlined {...(props || {})} />;
  },
  sortAscending: (props = null) => {
    return <SortAscendingOutlined {...(props || {})} />;
  },
  sortDescending: (props = null) => {
    return <SortDescendingOutlined {...(props || {})} />;
  },
  infoCircle: (props = null) => {
    return <InfoCircleOutlined {...(props || {})} />;
  },
  instagram: (props = null) => {
    return <InstagramOutlined {...(props || {})} />;
  },
  disconnect: (props = null) => {
    return <DisconnectOutlined {...(props || {})} />;
  },
  insertRowAbove: (props = null) => {
    return <InsertRowAboveOutlined {...(props || {})} />;
  },
  insertRowBelow: (props = null) => {
    return <InsertRowBelowOutlined {...(props || {})} />;
  },
  insertRowLeft: (props = null) => {
    return <InsertRowLeftOutlined {...(props || {})} />;
  },
  insertRowRight: (props = null) => {
    return <InsertRowRightOutlined {...(props || {})} />;
  },
  rollback: (props = null) => {
    return <RollbackOutlined {...(props || {})} />;
  },
  snippets: (props = null) => {
    return <SnippetsOutlined {...(props || {})} />;
  },
  compress: (props = null) => {
    return <CompressOutlined {...(props || {})} />;
  },
  minusCircle: (props = null) => {
    return <MinusCircleOutlined {...(props || {})} />;
  },
  select: (props = null) => {
    return <SelectOutlined {...(props || {})} />;
  },
  plusSquare: (props = null) => {
    return <PlusSquareOutlined {...(props || {})} />;
  },
  unorderedList: (props = null) => {
    return <UnorderedListOutlined {...(props || {})} />;
  },
  fork: (props = null) => {
    return <ForkOutlined {...(props || {})} />;
  },
  bug: (props = null) => {
    return <BugOutlined {...(props || {})} />;
  },
  cloudDownload: (props = null) => {
    return <CloudDownloadOutlined {...(props || {})} />;
  },
  reconciliation: (props = null) => {
    return <ReconciliationOutlined {...(props || {})} />;
  },
  apartment: (props = null) => {
    return <ApartmentOutlined {...(props || {})} />;
  },
  dingDing: (props = null) => {
    return <DingdingOutlined {...(props || {})} />;
  },
  macCommand: (props = null) => {
    return <MacCommandOutlined {...(props || {})} />;
  },
  inbox: (props = null) => {
    return <InboxOutlined {...(props || {})} />;
  },
  save: (props = null) => {
    return <SaveOutlined {...(props || {})} />;
  },
  file: (props = null) => {
    return <FileOutlined {...(props || {})} />;
  },
  tool: (props = null) => {
    return <ToolOutlined {...(props || {})} />;
  },
  mobile: (props = null) => {
    return <MobileOutlined {...(props || {})} />;
  },
  borderOuter: (props = null) => {
    return <BorderOuterOutlined {...(props || {})} />;
  },
  columnHeight: (props = null) => {
    return <ColumnHeightOutlined {...(props || {})} />;
  },
  verticalAlignMiddle: (props = null) => {
    return <VerticalAlignMiddleOutlined {...(props || {})} />;
  },
  caretUp: (props = null) => {
    return <CaretUpOutlined {...(props || {})} />;
  },
  caretDown: (props = null) => {
    return <CaretDownOutlined {...(props || {})} />;
  },
  retweet: (props = null) => {
    return <RetweetOutlined {...(props || {})} />;
  },
  exclamationCircle: (props = null) => {
    return <ExclamationCircleOutlined {...(props || {})} />;
  },
};

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
