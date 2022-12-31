import React from 'react';
import { ToolOutlined, MobileOutlined, BorderOuterOutlined, ColumnHeightOutlined, VerticalAlignMiddleOutlined, CaretUpOutlined, CaretDownOutlined, RetweetOutlined, ExclamationCircleOutlined, InfoCircleOutlined, PlusOutlined, PlusCircleOutlined, ReloadOutlined, EditOutlined, PlayCircleOutlined, PauseCircleOutlined, DeleteOutlined, ClockCircleOutlined, CloseCircleOutlined, CopyOutlined, EyeOutlined, ExportOutlined, HomeOutlined, ImportOutlined, IdcardOutlined, SearchOutlined, SettingOutlined, TagOutlined, TagsOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined, VideoCameraAddOutlined, LoadingOutlined, TeamOutlined, SyncOutlined, SoundOutlined, ShopOutlined, ShoppingCartOutlined, ShoppingOutlined, ScheduleOutlined, ScanOutlined, ReadOutlined, QrcodeOutlined, PoweroffOutlined, PhoneOutlined, ProfileOutlined, ProjectOutlined, MessageOutlined, LockOutlined, UnlockOutlined, MailOutlined, LineOutlined, KeyOutlined, HistoryOutlined, GiftOutlined, FolderOutlined, FilterOutlined, DownloadOutlined, EllipsisOutlined, DesktopOutlined, DashboardOutlined, ContactsOutlined, ClearOutlined, BellOutlined, UndoOutlined, RedoOutlined, FormOutlined, WarningOutlined, QuestionCircleFilled, LogoutOutlined, LoginOutlined, ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined, SwapOutlined, VerticalAlignTopOutlined, VerticalAlignBottomOutlined, UpOutlined, UpCircleOutlined, DownOutlined, DownCircleOutlined, LeftOutlined, LeftCircleOutlined, RightOutlined, RightCircleOutlined, PictureOutlined, LinkOutlined, CheckCircleOutlined, SortAscendingOutlined, SortDescendingOutlined, InstagramOutlined, DisconnectOutlined, InsertRowAboveOutlined, InsertRowBelowOutlined, InsertRowLeftOutlined, InsertRowRightOutlined, RollbackOutlined, SnippetsOutlined, CompressOutlined, MinusCircleOutlined, SelectOutlined, PlusSquareOutlined, UnorderedListOutlined, ForkOutlined, BugOutlined, CloudDownloadOutlined, ReconciliationOutlined, ApartmentOutlined, DingdingOutlined, MacCommandOutlined, InboxOutlined, SaveOutlined, FileOutlined } from '@ant-design/icons';
import { emptyLogo as emptyLogo$1 } from './utils/mediaDefault.js';

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var objectSpread2Exports = {};
var objectSpread2 = {
  get exports(){ return objectSpread2Exports; },
  set exports(v){ objectSpread2Exports = v; },
};

var definePropertyExports = {};
var defineProperty = {
  get exports(){ return definePropertyExports; },
  set exports(v){ definePropertyExports = v; },
};

var toPropertyKeyExports = {};
var toPropertyKey = {
  get exports(){ return toPropertyKeyExports; },
  set exports(v){ toPropertyKeyExports = v; },
};

var _typeofExports = {};
var _typeof$1 = {
  get exports(){ return _typeofExports; },
  set exports(v){ _typeofExports = v; },
};

(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof$1);
var _typeof = /*@__PURE__*/getDefaultExportFromCjs(_typeofExports);

var toPrimitiveExports = {};
var toPrimitive = {
  get exports(){ return toPrimitiveExports; },
  set exports(v){ toPrimitiveExports = v; },
};

(function (module) {
  var _typeof = _typeofExports["default"];
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toPrimitive);

(function (module) {
  var _typeof = _typeofExports["default"];
  var toPrimitive = toPrimitiveExports;
  function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toPropertyKey);

(function (module) {
  var toPropertyKey = toPropertyKeyExports;
  function _defineProperty(obj, key, value) {
    key = toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(defineProperty);
var _defineProperty = /*@__PURE__*/getDefaultExportFromCjs(definePropertyExports);

(function (module) {
  var defineProperty = definePropertyExports;
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  module.exports = _objectSpread2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(objectSpread2);
var _objectSpread = /*@__PURE__*/getDefaultExportFromCjs(objectSpread2Exports);

var _iconCollection, _iconBuilder;
var unknownLabel = '未知';

/**
 * 动画类型
 */
var animalType = {
  none: 'none',
  fade: 'fade',
  queue: 'queue'
};
var zeroString = '0';
var zeroInt = 0;

/**
 * 鉴权失败码
 */
var authenticationFailCode = 2001;

/**
 * Api请求成功码
 */
var apiSuccessCode = 200;

/**
 * 1970-01-01 00:00
 */
var emptyDatetime = '1970-01-01 00:00';

/**
 * 用户默认图
 */
var defaultUserAvatar = '/user.png';
var defaultEmptyImage = '/noImageSmall.png';
var emptyLogo = emptyLogo$1;
var appInitDefault = {
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
    corsTargetProduction: ''
  },
  showSelectLanguage: false,
  showLogoInEntrance: true,
  emptyLogo: emptyLogo,
  leftBarLogo: emptyLogo,
  apiSuccessCode: apiSuccessCode,
  authenticationFailCode: authenticationFailCode,
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
  tinymceImagesUploadUrl: ''
};

/**
 * accessWaySpecialCollection
 */
var accessWaySpecialCollection = {
  "super": {
    permission: 'super'
  }
};
var formNameCollection = {
  createTime: {
    label: '创建时间',
    name: 'createTime',
    helper: '数据的创建时间'
  },
  customOperate: {
    label: '操作',
    name: 'operateName',
    helper: ''
  }
};

/**
 * 转换集合
 */
var convertCollection = {
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
  array: 'array'
};

/**
 * 格式化集合
 */
var formatCollection = {
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
  percentage: 'percentage'
};
var dropdownExpandItemType = {
  divider: 'divider',
  item: 'item'
};
var imageContentPreviewMode = {
  html: 1,
  listItem: 2,
  imageList: 3
};
var datetimeFormat = {
  yearMonthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  yearMonthDayHourMinute: 'YYYY-MM-DD HH:mm',
  yearMonthDay: 'YYYY-MM-DD',
  yearMonth: 'YYYY-MM',
  year: 'YYYY',
  monthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  monthDayHourMinute: 'MM-DD HH:mm',
  monthDay: 'MM-DD',
  hourMinute: 'HH:mm',
  hourMinuteSecond: 'HH:mm:ss'
};
var selectModeCollection = {
  /**
   * 侧拉面板
   * value : 0
   */
  drawer: 0,
  /**
   * 弹出框
   * value : 1
   */
  modal: 1
};
var columnFacadeMode = {
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
  dropdown: 'dropdown'
};
var columnPlaceholder = {
  placeholder: true,
  title: '其他',
  dataIndex: null,
  align: 'center',
  render: function render() {
    return '--';
  }
};
var contentConfig = {
  wrapperType: {
    page: 'page',
    model: 'model',
    drawer: 'drawer'
  }
};
var pageHeaderRenderType = {
  descriptionGrid: 'descriptionGrid',
  paragraph: 'paragraph ',
  action: 'action '
};
var listViewConfig = {
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
    component: 'component'
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
    cardCollectionView: 2
  },
  tableSize: {
    middle: 'middle',
    small: 'small',
    large: 'large'
  },
  expandAnimalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue
  }
};

/**
 * 排序动作
 */
var sortOperate = {
  moveUp: 'moveUp',
  moveDown: 'moveDown'
};

/**
 * 扩展区构建模式
 */
var extraBuildType = {
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
  component: 'component'
};
var drawerConfig = {
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
    component: 'component'
  }
};

/**
 * card配置集合
 */
var cardConfig = _objectSpread(_objectSpread({}, contentConfig), {}, {
  renderType: {
    normal: 'normal',
    help: 'help'
  },
  /**
   * 动画支持
   */
  animalType: {
    none: animalType.none,
    fade: animalType.fade,
    queue: animalType.queue
  },
  /**
   * 扩展区构建模式
   */
  extraBuildType: _objectSpread({}, extraBuildType),
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
    "switch": 'switch',
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
    treeSelect: 'treeSelect'
  }
});
var searchCardConfig = {
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
    divider: 'divider'
  }
};

/**
 * 字符串类型 ‘0’/'1'
 */
var whetherString = {
  no: '0',
  yes: '1'
};

/**
 * 字符串类型 0/1
 */
var whetherNumber = {
  no: 0,
  yes: 1
};

/**
 * 文本类型不限【-10000】
 */
var unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000'
};

/**
 * 数字类型不限【-10000】
 */
var unlimitedWithNumberFlag = {
  key: -10000,
  name: '不限',
  flag: -10000
};

/**
 * 日志类型
 */
var logLevel = {
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
  error: 'error'
};
var logShowMode = {
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
  object: 'object'
};
var dataTypeCollection = {
  /**
   * 未知类型
   */
  unknown: {
    flag: 0,
    name: '未知类型'
  },
  /**
   * Json单体
   */
  jsonObject: {
    flag: 100,
    name: 'Json单体'
  },
  /**
   * Json列表
   */
  jsonObjectList: {
    flag: 200,
    name: 'Json列表'
  },
  /**
   * 一般值
   */
  commonValue: {
    flag: 300,
    name: '一般值'
  },
  /**
   * Html
   */
  html: {
    flag: 400,
    name: 'Html'
  }
};
var notificationTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open'
};
var messageTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  loading: 'loading',
  open: 'open'
};
var tabBarCollection = {
  /**
   * 扩展区构建模式
   */
  extraBuildType: extraBuildType
};

/**
 *设备模拟集合
 */
var mobileTypeCollection = {
  /**
   * 模拟轮廓
   */
  roughSketch: {
    label: '模拟轮廓',
    name: 'roughSketch',
    helper: ''
  },
  /**
   * Iphone X
   */
  iphoneX: {
    label: 'Iphone X',
    name: 'iphoneX',
    helper: ''
  },
  /**
   * Iphone 8 Plus
   */
  iphone8plus: {
    label: 'Iphone 8 Plus',
    name: 'iphone8plus',
    helper: ''
  },
  /**
   * Iphone 8
   */
  iphone8: {
    label: 'Iphone 8',
    name: 'iphone8',
    helper: ''
  },
  /**
   * IPhone 5S
   */
  iPhone5S: {
    label: 'IPhone 5S',
    name: 'iPhone5S',
    helper: ''
  },
  /**
   * Galaxy Note 8
   */
  galaxyNote8: {
    label: 'GalaxyNote8',
    name: 'galaxyNote8',
    helper: ''
  }
};
var iconCollection = (_iconCollection = {
  help: /*#__PURE__*/React.createElement(InfoCircleOutlined, null),
  add: /*#__PURE__*/React.createElement(PlusOutlined, null),
  plus: /*#__PURE__*/React.createElement(PlusOutlined, null),
  addCircle: /*#__PURE__*/React.createElement(PlusCircleOutlined, null),
  plusCircle: /*#__PURE__*/React.createElement(PlusCircleOutlined, null),
  reload: /*#__PURE__*/React.createElement(ReloadOutlined, null),
  edit: /*#__PURE__*/React.createElement(EditOutlined, null),
  enable: /*#__PURE__*/React.createElement(PlayCircleOutlined, null),
  disable: /*#__PURE__*/React.createElement(PauseCircleOutlined, null),
  playCircle: /*#__PURE__*/React.createElement(PlayCircleOutlined, null),
  pauseCircle: /*#__PURE__*/React.createElement(PauseCircleOutlined, null),
  "delete": /*#__PURE__*/React.createElement(DeleteOutlined, null),
  clock: /*#__PURE__*/React.createElement(ClockCircleOutlined, null),
  close: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
  closeCircle: /*#__PURE__*/React.createElement(CloseCircleOutlined, null),
  copy: /*#__PURE__*/React.createElement(CopyOutlined, null),
  eye: /*#__PURE__*/React.createElement(EyeOutlined, null),
  "export": /*#__PURE__*/React.createElement(ExportOutlined, null),
  home: /*#__PURE__*/React.createElement(HomeOutlined, null),
  "import": /*#__PURE__*/React.createElement(ImportOutlined, null),
  idCard: /*#__PURE__*/React.createElement(IdcardOutlined, null),
  search: /*#__PURE__*/React.createElement(SearchOutlined, null),
  setting: /*#__PURE__*/React.createElement(SettingOutlined, null),
  tag: /*#__PURE__*/React.createElement(TagOutlined, null),
  tags: /*#__PURE__*/React.createElement(TagsOutlined, null),
  upload: /*#__PURE__*/React.createElement(UploadOutlined, null),
  user: /*#__PURE__*/React.createElement(UserOutlined, null),
  video: /*#__PURE__*/React.createElement(VideoCameraOutlined, null),
  videoCameraAdd: /*#__PURE__*/React.createElement(VideoCameraAddOutlined, null),
  loading: /*#__PURE__*/React.createElement(LoadingOutlined, null),
  users: /*#__PURE__*/React.createElement(TeamOutlined, null),
  tool: /*#__PURE__*/React.createElement(ToolOutlined, null),
  sync: /*#__PURE__*/React.createElement(SyncOutlined, null),
  sound: /*#__PURE__*/React.createElement(SoundOutlined, null),
  shop: /*#__PURE__*/React.createElement(ShopOutlined, null),
  shoppingCart: /*#__PURE__*/React.createElement(ShoppingCartOutlined, null),
  shopping: /*#__PURE__*/React.createElement(ShoppingOutlined, null),
  schedule: /*#__PURE__*/React.createElement(ScheduleOutlined, null),
  scan: /*#__PURE__*/React.createElement(ScanOutlined, null),
  read: /*#__PURE__*/React.createElement(ReadOutlined, null),
  qrCode: /*#__PURE__*/React.createElement(QrcodeOutlined, null),
  powerOff: /*#__PURE__*/React.createElement(PoweroffOutlined, null),
  phone: /*#__PURE__*/React.createElement(PhoneOutlined, null),
  profile: /*#__PURE__*/React.createElement(ProfileOutlined, null),
  project: /*#__PURE__*/React.createElement(ProjectOutlined, null),
  message: /*#__PURE__*/React.createElement(MessageOutlined, null),
  lock: /*#__PURE__*/React.createElement(LockOutlined, null),
  unlock: /*#__PURE__*/React.createElement(UnlockOutlined, null),
  mail: /*#__PURE__*/React.createElement(MailOutlined, null),
  line: /*#__PURE__*/React.createElement(LineOutlined, null),
  key: /*#__PURE__*/React.createElement(KeyOutlined, null),
  history: /*#__PURE__*/React.createElement(HistoryOutlined, null),
  gift: /*#__PURE__*/React.createElement(GiftOutlined, null),
  folder: /*#__PURE__*/React.createElement(FolderOutlined, null),
  filter: /*#__PURE__*/React.createElement(FilterOutlined, null),
  download: /*#__PURE__*/React.createElement(DownloadOutlined, null),
  ellipsis: /*#__PURE__*/React.createElement(EllipsisOutlined, null),
  desktop: /*#__PURE__*/React.createElement(DesktopOutlined, null),
  dashboard: /*#__PURE__*/React.createElement(DashboardOutlined, null),
  contacts: /*#__PURE__*/React.createElement(ContactsOutlined, null),
  clear: /*#__PURE__*/React.createElement(ClearOutlined, null),
  bell: /*#__PURE__*/React.createElement(BellOutlined, null),
  undo: /*#__PURE__*/React.createElement(UndoOutlined, null),
  redo: /*#__PURE__*/React.createElement(RedoOutlined, null),
  form: /*#__PURE__*/React.createElement(FormOutlined, null),
  warning: /*#__PURE__*/React.createElement(WarningOutlined, null),
  question: /*#__PURE__*/React.createElement(QuestionCircleFilled, null),
  logout: /*#__PURE__*/React.createElement(LogoutOutlined, null),
  login: /*#__PURE__*/React.createElement(LoginOutlined, null),
  arrowUp: /*#__PURE__*/React.createElement(ArrowUpOutlined, null),
  arrowDown: /*#__PURE__*/React.createElement(ArrowDownOutlined, null),
  arrowLeft: /*#__PURE__*/React.createElement(ArrowLeftOutlined, null),
  arrowRight: /*#__PURE__*/React.createElement(ArrowRightOutlined, null),
  swap: /*#__PURE__*/React.createElement(SwapOutlined, null),
  online: /*#__PURE__*/React.createElement(VerticalAlignTopOutlined, null),
  offline: /*#__PURE__*/React.createElement(VerticalAlignBottomOutlined, null),
  up: /*#__PURE__*/React.createElement(UpOutlined, null),
  upCircle: /*#__PURE__*/React.createElement(UpCircleOutlined, null),
  down: /*#__PURE__*/React.createElement(DownOutlined, null),
  downCircle: /*#__PURE__*/React.createElement(DownCircleOutlined, null),
  left: /*#__PURE__*/React.createElement(LeftOutlined, null),
  leftCircle: /*#__PURE__*/React.createElement(LeftCircleOutlined, null),
  right: /*#__PURE__*/React.createElement(RightOutlined, null),
  rightCircle: /*#__PURE__*/React.createElement(RightCircleOutlined, null),
  picture: /*#__PURE__*/React.createElement(PictureOutlined, null),
  link: /*#__PURE__*/React.createElement(LinkOutlined, null),
  checkCircle: /*#__PURE__*/React.createElement(CheckCircleOutlined, null),
  warningCircle: /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null),
  sortAscending: /*#__PURE__*/React.createElement(SortAscendingOutlined, null),
  sortDescending: /*#__PURE__*/React.createElement(SortDescendingOutlined, null),
  infoCircle: /*#__PURE__*/React.createElement(InfoCircleOutlined, null),
  instagram: /*#__PURE__*/React.createElement(InstagramOutlined, null),
  disconnect: /*#__PURE__*/React.createElement(DisconnectOutlined, null),
  insertRowAbove: /*#__PURE__*/React.createElement(InsertRowAboveOutlined, null),
  insertRowBelow: /*#__PURE__*/React.createElement(InsertRowBelowOutlined, null),
  insertRowLeft: /*#__PURE__*/React.createElement(InsertRowLeftOutlined, null),
  insertRowRight: /*#__PURE__*/React.createElement(InsertRowRightOutlined, null),
  rollback: /*#__PURE__*/React.createElement(RollbackOutlined, null),
  snippets: /*#__PURE__*/React.createElement(SnippetsOutlined, null),
  compress: /*#__PURE__*/React.createElement(CompressOutlined, null),
  minusCircle: /*#__PURE__*/React.createElement(MinusCircleOutlined, null),
  select: /*#__PURE__*/React.createElement(SelectOutlined, null),
  plusSquare: /*#__PURE__*/React.createElement(PlusSquareOutlined, null),
  unorderedList: /*#__PURE__*/React.createElement(UnorderedListOutlined, null),
  fork: /*#__PURE__*/React.createElement(ForkOutlined, null),
  bug: /*#__PURE__*/React.createElement(BugOutlined, null),
  cloudDownload: /*#__PURE__*/React.createElement(CloudDownloadOutlined, null),
  reconciliation: /*#__PURE__*/React.createElement(ReconciliationOutlined, null),
  apartment: /*#__PURE__*/React.createElement(ApartmentOutlined, null),
  dingDing: /*#__PURE__*/React.createElement(DingdingOutlined, null),
  macCommand: /*#__PURE__*/React.createElement(MacCommandOutlined, null),
  inbox: /*#__PURE__*/React.createElement(InboxOutlined, null),
  save: /*#__PURE__*/React.createElement(SaveOutlined, null),
  file: /*#__PURE__*/React.createElement(FileOutlined, null)
}, _defineProperty(_iconCollection, "tool", /*#__PURE__*/React.createElement(ToolOutlined, null)), _defineProperty(_iconCollection, "mobile", /*#__PURE__*/React.createElement(MobileOutlined, null)), _defineProperty(_iconCollection, "borderOuter", /*#__PURE__*/React.createElement(BorderOuterOutlined, null)), _defineProperty(_iconCollection, "columnHeight", /*#__PURE__*/React.createElement(ColumnHeightOutlined, null)), _defineProperty(_iconCollection, "verticalAlignMiddle", /*#__PURE__*/React.createElement(VerticalAlignMiddleOutlined, null)), _defineProperty(_iconCollection, "caretUp", /*#__PURE__*/React.createElement(CaretUpOutlined, null)), _defineProperty(_iconCollection, "caretDown", /*#__PURE__*/React.createElement(CaretDownOutlined, null)), _defineProperty(_iconCollection, "retweet", /*#__PURE__*/React.createElement(RetweetOutlined, null)), _defineProperty(_iconCollection, "exclamationCircle", /*#__PURE__*/React.createElement(ExclamationCircleOutlined, null)), _iconCollection);
var iconBuilder = (_iconBuilder = {
  help: function help() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InfoCircleOutlined, props || {});
  },
  add: function add() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlusOutlined, props || {});
  },
  plus: function plus() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlusOutlined, props || {});
  },
  addCircle: function addCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlusCircleOutlined, props || {});
  },
  plusCircle: function plusCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlusCircleOutlined, props || {});
  },
  reload: function reload() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ReloadOutlined, props || {});
  },
  edit: function edit() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(EditOutlined, props || {});
  },
  enable: function enable() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlayCircleOutlined, props || {});
  },
  disable: function disable() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PauseCircleOutlined, props || {});
  },
  playCircle: function playCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlayCircleOutlined, props || {});
  },
  pauseCircle: function pauseCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PauseCircleOutlined, props || {});
  },
  "delete": function _delete() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DeleteOutlined, props || {});
  },
  clock: function clock() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ClockCircleOutlined, props || {});
  },
  close: function close() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(CloseCircleOutlined, props || {});
  },
  closeCircle: function closeCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(CloseCircleOutlined, props || {});
  },
  copy: function copy() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(CopyOutlined, props || {});
  },
  eye: function eye() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(EyeOutlined, props || {});
  },
  "export": function _export() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ExportOutlined, props || {});
  },
  home: function home() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(HomeOutlined, props || {});
  },
  "import": function _import() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ImportOutlined, props || {});
  },
  idCard: function idCard() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(IdcardOutlined, props || {});
  },
  search: function search() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SearchOutlined, props || {});
  },
  setting: function setting() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SettingOutlined, props || {});
  },
  tag: function tag() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(TagOutlined, props || {});
  },
  tags: function tags() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(TagsOutlined, props || {});
  },
  upload: function upload() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UploadOutlined, props || {});
  },
  user: function user() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UserOutlined, props || {});
  },
  video: function video() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(VideoCameraOutlined, props || {});
  },
  videoCameraAdd: function videoCameraAdd() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(VideoCameraAddOutlined, props || {});
  },
  loading: function loading() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LoadingOutlined, props || {});
  },
  users: function users() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(TeamOutlined, props || {});
  },
  tool: function tool() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ToolOutlined, props || {});
  },
  sync: function sync() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SyncOutlined, props || {});
  },
  sound: function sound() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SoundOutlined, props || {});
  },
  shop: function shop() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ShopOutlined, props || {});
  },
  shoppingCart: function shoppingCart() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ShoppingCartOutlined, props || {});
  },
  shopping: function shopping() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ShoppingOutlined, props || {});
  },
  schedule: function schedule() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ScheduleOutlined, props || {});
  },
  scan: function scan() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ScanOutlined, props || {});
  },
  read: function read() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ReadOutlined, props || {});
  },
  qrCode: function qrCode() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(QrcodeOutlined, props || {});
  },
  powerOff: function powerOff() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PoweroffOutlined, props || {});
  },
  phone: function phone() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PhoneOutlined, props || {});
  },
  profile: function profile() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ProfileOutlined, props || {});
  },
  project: function project() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ProjectOutlined, props || {});
  },
  message: function message() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(MessageOutlined, props || {});
  },
  lock: function lock() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LockOutlined, props || {});
  },
  unlock: function unlock() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UnlockOutlined, props || {});
  },
  mail: function mail() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(MailOutlined, props || {});
  },
  line: function line() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LineOutlined, props || {});
  },
  key: function key() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(KeyOutlined, props || {});
  },
  history: function history() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(HistoryOutlined, props || {});
  },
  gift: function gift() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(GiftOutlined, props || {});
  },
  folder: function folder() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(FolderOutlined, props || {});
  },
  filter: function filter() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(FilterOutlined, props || {});
  },
  download: function download() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DownloadOutlined, props || {});
  },
  ellipsis: function ellipsis() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(EllipsisOutlined, props || {});
  },
  desktop: function desktop() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DesktopOutlined, props || {});
  },
  dashboard: function dashboard() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DashboardOutlined, props || {});
  },
  contacts: function contacts() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ContactsOutlined, props || {});
  },
  clear: function clear() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ClearOutlined, props || {});
  },
  bell: function bell() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(BellOutlined, props || {});
  },
  undo: function undo() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UndoOutlined, props || {});
  },
  redo: function redo() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(RedoOutlined, props || {});
  },
  form: function form() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(FormOutlined, props || {});
  },
  warning: function warning() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(WarningOutlined, props || {});
  },
  question: function question() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(QuestionCircleFilled, props || {});
  },
  logout: function logout() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LogoutOutlined, props || {});
  },
  login: function login() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LoginOutlined, props || {});
  },
  arrowUp: function arrowUp() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ArrowUpOutlined, props || {});
  },
  arrowDown: function arrowDown() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ArrowDownOutlined, props || {});
  },
  arrowLeft: function arrowLeft() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ArrowLeftOutlined, props || {});
  },
  arrowRight: function arrowRight() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ArrowRightOutlined, props || {});
  },
  swap: function swap() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SwapOutlined, props || {});
  },
  online: function online() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(VerticalAlignTopOutlined, props || {});
  },
  offline: function offline() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(VerticalAlignBottomOutlined, props || {});
  },
  up: function up() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UpOutlined, props || {});
  },
  upCircle: function upCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UpCircleOutlined, props || {});
  },
  down: function down() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DownOutlined, props || {});
  },
  downCircle: function downCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DownCircleOutlined, props || {});
  },
  left: function left() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LeftOutlined, props || {});
  },
  leftCircle: function leftCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LeftCircleOutlined, props || {});
  },
  right: function right() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(RightOutlined, props || {});
  },
  rightCircle: function rightCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(RightCircleOutlined, props || {});
  },
  picture: function picture() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PictureOutlined, props || {});
  },
  link: function link() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(LinkOutlined, props || {});
  },
  checkCircle: function checkCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(CheckCircleOutlined, props || {});
  },
  warningCircle: function warningCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ExclamationCircleOutlined, props || {});
  },
  sortAscending: function sortAscending() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SortAscendingOutlined, props || {});
  },
  sortDescending: function sortDescending() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SortDescendingOutlined, props || {});
  },
  infoCircle: function infoCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InfoCircleOutlined, props || {});
  },
  instagram: function instagram() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InstagramOutlined, props || {});
  },
  disconnect: function disconnect() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DisconnectOutlined, props || {});
  },
  insertRowAbove: function insertRowAbove() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InsertRowAboveOutlined, props || {});
  },
  insertRowBelow: function insertRowBelow() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InsertRowBelowOutlined, props || {});
  },
  insertRowLeft: function insertRowLeft() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InsertRowLeftOutlined, props || {});
  },
  insertRowRight: function insertRowRight() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InsertRowRightOutlined, props || {});
  },
  rollback: function rollback() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(RollbackOutlined, props || {});
  },
  snippets: function snippets() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SnippetsOutlined, props || {});
  },
  compress: function compress() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(CompressOutlined, props || {});
  },
  minusCircle: function minusCircle() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(MinusCircleOutlined, props || {});
  },
  select: function select() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SelectOutlined, props || {});
  },
  plusSquare: function plusSquare() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(PlusSquareOutlined, props || {});
  },
  unorderedList: function unorderedList() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(UnorderedListOutlined, props || {});
  },
  fork: function fork() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ForkOutlined, props || {});
  },
  bug: function bug() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(BugOutlined, props || {});
  },
  cloudDownload: function cloudDownload() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(CloudDownloadOutlined, props || {});
  },
  reconciliation: function reconciliation() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ReconciliationOutlined, props || {});
  },
  apartment: function apartment() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(ApartmentOutlined, props || {});
  },
  dingDing: function dingDing() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(DingdingOutlined, props || {});
  },
  macCommand: function macCommand() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(MacCommandOutlined, props || {});
  },
  inbox: function inbox() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(InboxOutlined, props || {});
  },
  save: function save() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(SaveOutlined, props || {});
  },
  file: function file() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    return /*#__PURE__*/React.createElement(FileOutlined, props || {});
  }
}, _defineProperty(_iconBuilder, "tool", function tool() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(ToolOutlined, props || {});
}), _defineProperty(_iconBuilder, "mobile", function mobile() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(MobileOutlined, props || {});
}), _defineProperty(_iconBuilder, "borderOuter", function borderOuter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(BorderOuterOutlined, props || {});
}), _defineProperty(_iconBuilder, "columnHeight", function columnHeight() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(ColumnHeightOutlined, props || {});
}), _defineProperty(_iconBuilder, "verticalAlignMiddle", function verticalAlignMiddle() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(VerticalAlignMiddleOutlined, props || {});
}), _defineProperty(_iconBuilder, "caretUp", function caretUp() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(CaretUpOutlined, props || {});
}), _defineProperty(_iconBuilder, "caretDown", function caretDown() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(CaretDownOutlined, props || {});
}), _defineProperty(_iconBuilder, "retweet", function retweet() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(RetweetOutlined, props || {});
}), _defineProperty(_iconBuilder, "exclamationCircle", function exclamationCircle() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return /*#__PURE__*/React.createElement(ExclamationCircleOutlined, props || {});
}), _iconBuilder);

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { selectModeCollection as A, columnFacadeMode as B, columnPlaceholder as C, contentConfig as D, pageHeaderRenderType as E, extraBuildType as F, drawerConfig as G, cardConfig as H, searchCardConfig as I, whetherString as J, whetherNumber as K, unlimitedWithStringFlag as L, unlimitedWithNumberFlag as M, dataTypeCollection as N, tabBarCollection as O, mobileTypeCollection as P, iconCollection as Q, iconBuilder as R, empty as S, _objectSpread as _, apiSuccessCode as a, authenticationFailCode as b, appInitDefault as c, logShowMode as d, emptyLogo as e, accessWaySpecialCollection as f, getDefaultExportFromCjs as g, listViewConfig as h, datetimeFormat as i, _typeof as j, emptyDatetime as k, logLevel as l, messageTypeCollection as m, convertCollection as n, formatCollection as o, notificationTypeCollection as p, animalType as q, zeroInt as r, sortOperate as s, defaultUserAvatar as t, unknownLabel as u, defaultEmptyImage as v, formNameCollection as w, dropdownExpandItemType as x, imageContentPreviewMode as y, zeroString as z };
