"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = empty;
exports.messageTypeCollection = exports.notificationTypeCollection = exports.dataTypeCollection = exports.logShowMode = exports.logLevel = exports.unlimitedWithNumberFlag = exports.unlimitedWithStringFlag = exports.whetherNumber = exports.whetherString = exports.searchFormContentConfig = exports.formContentConfig = exports.pageHeaderRenderType = exports.contentConfig = exports.columnPlaceholder = exports.columnFacadeMode = exports.selectModeCollection = exports.listViewModeCollection = exports.datetimeFormat = exports.imageContentPreviewMode = exports.formNameCollection = exports.defaultEmptyImage = exports.defaultUserAvatar = exports.emptyDatetime = exports.authenticationFailCode = exports.zeroInt = exports.zeroString = void 0;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var zeroString = '0';
exports.zeroString = zeroString;
var zeroInt = 0;
exports.zeroInt = zeroInt;
var authenticationFailCode = 2001;
exports.authenticationFailCode = authenticationFailCode;
var emptyDatetime = '1970-01-01 00:00';
exports.emptyDatetime = emptyDatetime;
var defaultUserAvatar = '/user.png';
exports.defaultUserAvatar = defaultUserAvatar;
var defaultEmptyImage = '/noImageSmall.png'; // export const defaultEmptyImage =
// 'data:image/png;base64,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';

exports.defaultEmptyImage = defaultEmptyImage;
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
exports.formNameCollection = formNameCollection;
var imageContentPreviewMode = {
  html: 1,
  listItem: 2,
  imageList: 3
};
exports.imageContentPreviewMode = imageContentPreviewMode;
var datetimeFormat = {
  yearMonthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  yearMonthDayHourMinute: 'YYYY-MM-DD HH:mm',
  yearMonthDay: 'YYYY-MM-DD',
  monthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',
  monthDayHourMinute: 'MM-DD HH:mm',
  monthDay: 'MM-DD'
};
exports.datetimeFormat = datetimeFormat;
var listViewModeCollection = {
  table: 0,
  list: 1
};
exports.listViewModeCollection = listViewModeCollection;
var selectModeCollection = {
  drawer: 0,
  modal: 1
};
exports.selectModeCollection = selectModeCollection;
var columnFacadeMode = {
  ellipsis: 'ellipsis',
  image: 'image',
  datetime: 'datetime',
  badge: 'badge',
  money: 'money'
};
exports.columnFacadeMode = columnFacadeMode;
var columnPlaceholder = {
  placeholder: true,
  title: '其他',
  dataIndex: null,
  align: 'center',
  render: function render() {
    return '--';
  }
};
exports.columnPlaceholder = columnPlaceholder;
var contentConfig = {
  wrapperType: {
    page: 'page',
    model: 'model',
    drawer: 'drawer'
  }
};
exports.contentConfig = contentConfig;
var pageHeaderRenderType = {
  descriptionGrid: 'descriptionGrid',
  paragraph: 'paragraph ',
  action: 'action '
};
exports.pageHeaderRenderType = pageHeaderRenderType;

var formContentConfig = _objectSpread(_objectSpread({}, contentConfig), {}, {
  cardType: {
    normal: 'normal',
    help: 'help'
  },
  contentItemType: {
    text: 'text',
    input: 'input',
    password: 'password',
    inputNumber: 'inputNumber',
    textarea: 'textarea',
    "switch": 'switch',
    select: 'select',
    whetherSelect: 'whetherSelect',
    customSelect: 'customSelect',
    radio: 'radio',
    whetherRadio: 'whetherRadio',
    customRadio: 'customRadio',
    onlyShowTextarea: 'onlyShowTextarea',
    onlyShowInput: 'onlyShowInput',
    onlyShowInputDatetime: 'onlyShowInputDatetime',
    onlyShowText: 'onlyShowText',
    imageUpload: 'imageUpload',
    imageShow: 'imageShow',
    fileBase64Upload: 'fileBase64Upload',
    videoUpload: 'videoUpload',
    innerComponent: 'innerComponent',
    component: 'component',
    nowTime: 'nowTime',
    datePicker: 'datePicker',
    jsonView: 'jsonView',
    flexText: 'flexText',
    onlyShowTextByFlexText: 'onlyShowTextByFlexText'
  }
});

exports.formContentConfig = formContentConfig;
var searchFormContentConfig = {
  contentItemType: {
    input: 'input',
    inputNumber: 'inputNumber',
    customSelect: 'customSelect',
    customRadio: 'customRadio',
    onlyShowInput: 'onlyShowInput',
    innerComponent: 'innerComponent',
    component: 'component',
    datePicker: 'datePicker',
    customRangePicker: 'customRangePicker'
  }
};
exports.searchFormContentConfig = searchFormContentConfig;
var whetherString = {
  no: '0',
  yes: '1'
};
exports.whetherString = whetherString;
var whetherNumber = {
  no: 0,
  yes: 1
};
exports.whetherNumber = whetherNumber;
var unlimitedWithStringFlag = {
  key: '-10000',
  name: '不限',
  flag: '-10000'
};
exports.unlimitedWithStringFlag = unlimitedWithStringFlag;
var unlimitedWithNumberFlag = {
  key: -10000,
  name: '不限',
  flag: -10000
};
exports.unlimitedWithNumberFlag = unlimitedWithNumberFlag;
var logLevel = {
  debug: 'debug',
  warn: 'warn',
  error: 'error'
};
exports.logLevel = logLevel;
var logShowMode = {
  text: 'text',
  object: 'object'
};
exports.logShowMode = logShowMode;
var dataTypeCollection = {
  unknown: {
    flag: 0,
    name: '未知类型'
  },
  jsonObject: {
    flag: 100,
    name: 'Json单体'
  },
  jsonObjectList: {
    flag: 200,
    name: 'Json列表'
  },
  commonValue: {
    flag: 300,
    name: '一般值'
  },
  html: {
    flag: 400,
    name: 'Html'
  }
};
exports.dataTypeCollection = dataTypeCollection;
var notificationTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open'
};
exports.notificationTypeCollection = notificationTypeCollection;
var messageTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  loading: 'loading',
  open: 'open'
};
/**
 * 占位函数
 *
 * @export
 * @returns
 */

exports.messageTypeCollection = messageTypeCollection;

function empty() {
  return {};
}