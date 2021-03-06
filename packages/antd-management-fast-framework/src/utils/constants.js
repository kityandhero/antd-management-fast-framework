import React from 'react';
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

import { emptyLogo as emptyLogoSource } from './mediaDefault';

/**
 * ????????????
 */
export const animalType = {
  none: 'none',
  fade: 'fade',
  queue: 'queue',
};

export const zeroString = '0';

export const zeroInt = 0;

/**
 * ???????????????
 */
export const authenticationFailCode = 2001;

/**
 * Api???????????????
 */
export const apiSuccessCode = 200;

/**
 * 1970-01-01 00:00
 */
export const emptyDatetime = '1970-01-01 00:00';

/**
 * ???????????????
 */
export const defaultUserAvatar = '/user.png';

export const defaultEmptyImage = '/noImageSmall.png';

export const emptyLogo = emptyLogoSource;

export const appInitDefault = {
  platformName: '????????????',
  appName: '????????????',
  appDescription: '????????????',
  entranceLogo: '',
  shareLogo: '',
  shareLogoName: 'Logo',
  leftBarText: '????????????',
  companyName: '????????????',
  copyright: '????????????',
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
    label: '????????????',
    name: 'createTime',
    helper: '?????????????????????',
  },
  customOperate: {
    label: '??????',
    name: 'operateName',
    helper: '',
  },
};

/**
 * ????????????
 */
export const convertCollection = {
  /**
   * ??????
   */
  number: 'number',

  /**
   * ?????? date
   */
  datetime: 'datetime',

  /**
   * ?????????
   */
  string: 'string',

  /**
   * moment??????
   */
  moment: 'moment',

  /**
   * ??????
   */
  money: 'money',

  /**
   * ??????
   */
  array: 'array',
};

/**
 * ???????????????
 */
export const formatCollection = {
  /**
   * ?????? ??? 0.00
   */
  money: 'money',

  /**
   * ??????????????? YYYY-MM-DD hh:mm:ss
   */
  datetime: 'datetime',

  /**
   * ????????????
   */
  chineseMoney: 'chineseMoney',

  /**
   * ?????????
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
   * ????????????
   * value : 0
   */
  drawer: 0,

  /**
   * ?????????
   * value : 1
   */
  modal: 1,
};

export const columnFacadeMode = {
  /**
   * ????????????
   * value : ellipsis
   */
  ellipsis: 'ellipsis',

  /**
   * ????????????
   * value : image
   */
  image: 'image',

  /**
   * ??????
   * value : datetime
   */
  datetime: 'datetime',

  /**
   * Badge??????
   * value : badge
   */
  badge: 'badge',

  /**
   * ??????????????????0.05
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
  title: '??????',
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
     * ???????????????????????????????????????????????????
     */
    component: 'component',
  },
  viewMode: {
    /**
     * ??????Table??????????????????
     */
    table: 0,

    /**
     * ??????List??????????????????
     */
    list: 1,

    /**
     * ??????Card????????????
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
 * ????????????
 */
export const sortOperate = {
  moveUp: 'moveUp',
  moveDown: 'moveDown',
};

/**
 * ?????????????????????
 */
export const extraBuildType = {
  /**
   * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
   */
  refresh: 'refresh',

  /**
   * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
   */
  save: 'save',

  /**
   * ???????????????????????????????????????????????????????????????
   */
  generalButton: 'generalButton',

  /**
   * ??????????????????????????????????????????????????????????????????????????????
   */
  iconInfo: 'iconInfo',

  /**
   * ????????????
   */
  colorText: 'colorText',

  /**
   * ??????????????????
   */
  flexSelect: 'flexSelect',

  /**
   * ???????????????????????????????????????????????????????????????,????????????generalButton??????????????????????????????????????????????????????
   */
  button: 'button',

  /**
   * ????????????????????????
   */
  dropdownButton: 'dropdownButton',

  /**
   * ?????????????????????????????????????????????????????????????????????
   */
  dropdownEllipsis: 'dropdownEllipsis',

  /**
   * dropdown
   */
  dropdown: 'dropdown',

  /**
   * ???????????????????????????????????????????????????
   */
  component: 'component',
};

export const drawerConfig = {
  /**
   * ?????????????????????
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
     * ???????????????????????????????????????????????????
     */
    component: 'component',
  },
};

/**
 * card????????????
 */
export const cardConfig = {
  ...contentConfig,
  renderType: {
    normal: 'normal',
    help: 'help',
  },

  /**
   * ????????????
   */
  animalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue,
  },

  /**
   * ?????????????????????
   */
  extraBuildType: {
    ...extraBuildType,
  },
  contentItemType: {
    /**
     * Col?????????,????????????????????????
     */
    placeholder: 'placeholder',

    /**
     * ?????????????????????
     */
    text: 'text',

    /**
     * ?????????????????????????????????????????????????????????
     */
    input: 'input',

    /**
     * ?????????????????????????????????????????????????????????
     */
    password: 'password',

    /**
     * ?????????????????????????????????????????????????????????
     */
    inputNumber: 'inputNumber',

    /**
     * ?????????????????????????????????????????????????????????
     */
    textarea: 'textarea',

    /**
     * switch??????
     */
    switch: 'switch',

    /**
     * ???????????????
     */
    select: 'select',

    /**
     * ??????/?????? ?????????
     */
    whetherSelect: 'whetherSelect',

    /**
     * ??????????????????
     */
    customSelect: 'customSelect',

    /**
     * ??????????????????
     */
    flexSelect: 'flexSelect',

    /**
     * ???????????????
     */
    radio: 'radio',

    /**
     * ??????/?????? ?????????
     */
    whetherRadio: 'whetherRadio',

    /**
     * ??????????????????
     */
    customRadio: 'customRadio',

    /**
     * ??????????????????????????????????????????????????????????????????
     */
    onlyShowTextarea: 'onlyShowTextarea',

    /**
     * ???????????????????????????????????????????????????????????????
     */
    onlyShowInput: 'onlyShowInput',

    /**
     * ???????????????????????????????????????????????????????????????
     */
    onlyShowInputDatetime: 'onlyShowInputDatetime',

    /**
     * ??????????????????????????????????????????????????????????????????
     */
    onlyShowText: 'onlyShowText',

    /**
     * ????????????
     */
    imageUpload: 'imageUpload',

    /**
     * ????????????
     */
    imageShow: 'imageShow',

    /**
     * ???????????????
     */
    imageListShow: 'imageListShow',

    /**
     * ?????????????????????
     */
    fileBase64Upload: 'fileBase64Upload',

    /**
     * ????????????
     */
    videoUpload: 'videoUpload',

    /**
     * ????????????
     */
    fileUpload: 'fileUpload',

    /**
     * ????????????
     */
    audioUpload: 'audioUpload',

    /**
     * ?????????????????????????????????????????????????????????????????????????????????????????????
     */
    innerComponent: 'innerComponent',

    /**
     * ????????????????????????????????????????????????????????????????????????????????????????????????????????????extraBuildType??????save??????????????????
     */
    save: 'save',

    /**
     * ????????????
     */
    button: 'button',

    /**
     * ????????????
     */
    actionList: 'actionList',

    /**
     * ??????
     */
    component: 'component',

    /**
     * ??????????????????????????????????????????????????????????????????????????????????????????
     */
    nowTime: 'nowTime',

    /**
     * ???????????????????????????????????????????????????????????????????????????????????????
     */
    datePicker: 'datePicker',

    /**
     * ???????????????????????????????????????????????????????????????????????????????????????
     */
    timePicker: 'timePicker',

    /**
     * json???????????????
     */
    jsonView: 'jsonView',

    /**
     * json???????????????
     */
    syntaxHighlighterView: 'syntaxHighlighterView',

    /**
     * flex????????????
     */
    flexText: 'flexText',

    /**
     * flex????????????
     */
    onlyShowTextByFlexText: 'onlyShowTextByFlexText',

    /**
     * ?????????
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
     * ?????????
     */
    input: 'input',

    /**
     * ?????????
     */
    inputNumber: 'inputNumber',

    /**
     * ??????????????????
     */
    customSelect: 'customSelect',

    /**
     * ??????????????????
     */
    flexSelect: 'flexSelect',

    /**
     * ??????????????????
     */
    customRadio: 'customRadio',

    /**
     * ???????????????
     */
    onlyShowInput: 'onlyShowInput',

    /**
     * ?????????????????????
     */
    innerComponent: 'innerComponent',

    /**
     * ???????????????
     */
    component: 'component',

    /**
     * ???????????????
     */
    datePicker: 'datePicker',

    /**
     * ?????????????????????
     */
    customRangePicker: 'customRangePicker',

    /**
     * ?????????
     */
    divider: 'divider',
  },
};

/**
 * ??????????????? ???0???/'1'
 */
export const whetherString = {
  no: '0',
  yes: '1',
};

/**
 * ??????????????? 0/1
 */
export const whetherNumber = {
  no: 0,
  yes: 1,
};

/**
 * ?????????????????????-10000???
 */
export const unlimitedWithStringFlag = {
  key: '-10000',
  name: '??????',
  flag: '-10000',
};

/**
 * ?????????????????????-10000???
 */
export const unlimitedWithNumberFlag = {
  key: -10000,
  name: '??????',
  flag: -10000,
};

/**
 * ????????????
 */
export const logLevel = {
  /**
   * ??????
   */
  debug: 'debug',

  /**
   * ??????
   */
  warn: 'warn',

  /**
   * ??????
   */
  error: 'error',
};

export const logShowMode = {
  /**
   * ??????
   */
  unknown: 'unknown',

  /**
   * ??????
   */
  text: 'text',

  /**
   * ??????
   */
  object: 'object',
};

export const dataTypeCollection = {
  /**
   * ????????????
   */
  unknown: {
    flag: 0,
    name: '????????????',
  },

  /**
   * Json??????
   */
  jsonObject: {
    flag: 100,
    name: 'Json??????',
  },

  /**
   * Json??????
   */
  jsonObjectList: {
    flag: 200,
    name: 'Json??????',
  },

  /**
   * ?????????
   */
  commonValue: {
    flag: 300,
    name: '?????????',
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
   * ?????????????????????
   */
  extraBuildType: extraBuildType,
};

/**
 *??????????????????
 */
export const mobileTypeCollection = {
  /**
   * ????????????
   */
  roughSketch: {
    label: '????????????',
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
 * ????????????
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
