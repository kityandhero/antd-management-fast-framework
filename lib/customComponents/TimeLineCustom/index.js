"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/list/style");

var _list = _interopRequireDefault(require("antd/es/list"));

var _react = _interopRequireDefault(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _icons = require("@ant-design/icons");

var _CustomBase2 = _interopRequireDefault(require("@/framework/CustomBase"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TimeLineCustom = /*#__PURE__*/function (_CustomBase) {
  _inherits(TimeLineCustom, _CustomBase);

  var _super = _createSuper(TimeLineCustom);

  function TimeLineCustom(props) {
    var _this;

    _classCallCheck(this, TimeLineCustom);

    _this = _super.call(this, props);

    _this.doWhenGetSnapshotBeforeUpdate = function (preProps, preState) {
      _this.currentTime = null;
      _this.currentPageStart = true;
      return null;
    };

    _this.getCreateTimeDatePart = function (v) {
      return (0, _moment["default"])(v).format('YYYY-MM-DD');
    };

    _this.getCreateTimeTimePart = function (v) {
      return (0, _moment["default"])(v).format('HH:mm');
    };

    _this.handleTableChange = function (pageNo, pageSize) {
      var onChange = _this.props.onChange;
      onChange(pageNo, pageSize);
    };

    _this.renderDateLabel = function (v) {
      _this.currentTime = _this.currentTime || v;
      var preTime = _this.currentTime || v;

      if (!_this.currentPageStart && new Date(preTime).getDay() === new Date(v).getDay()) {
        return false;
      }

      _this.currentPageStart = false;
      _this.currentTime = v;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(_index["default"].timeLabel, " ").concat(_index["default"].listItem)
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].backgroundRed
      }, _this.getCreateTimeDatePart(v)));
    };

    _this.renderInfo = function (item) {
      var _this$props = _this.props,
          getTime = _this$props.getTime,
          getTitle = _this$props.getTitle,
          getDescription = _this$props.getDescription,
          getBottomLeft = _this$props.getBottomLeft,
          getBottomRight = _this$props.getBottomRight,
          getIcon = _this$props.getIcon; // const iconStyle = {
      //   ...{
      //     backgroundColor: getRandomColor(getBackgroundColorKey(item)),
      //   },
      //   ...(iconStyleValue || {}),
      // };

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].listItem
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].fa
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].faInner
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].faInnerBg //  style={iconStyle}

      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].faInnerBody
      }, getIcon(item)))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].timeLineExItem
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].time
      }, /*#__PURE__*/_react["default"].createElement(_icons.ClockCircleOutlined, {
        style: {
          marginLeft: '20px',
          position: 'inherit',
          width: '12px',
          height: '12px',
          lineHeight: '12px',
          fontSize: '12px',
          marginRight: '2px'
        }
      }), _this.getCreateTimeTimePart(getTime(item))), /*#__PURE__*/_react["default"].createElement("h3", {
        className: _index["default"].timeLineExHeader
      }, getTitle(item)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].timeLineExBody,
        style: {
          fontSize: '13px'
        }
      }, getDescription(item)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].timeLineExFooter
      }, /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          fontSize: '13px'
        }
      }, getBottomLeft(item)), /*#__PURE__*/_react["default"].createElement("span", {
        style: {
          marginLeft: '20px',
          fontSize: '13px'
        }
      }, getBottomRight(item)))));
    };

    _this.currentTime = null;
    _this.currentPageStart = true;
    _this.state = {
      list: [],
      pagination: {}
    };
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(TimeLineCustom, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          loading = _this$props2.loading,
          getDateLabel = _this$props2.getDateLabel,
          showPagination = _this$props2.showPagination;
      var _this$state = this.state,
          list = _this$state.list,
          pagination = _this$state.pagination;
      var paginationProps = false;

      if (showPagination) {
        paginationProps = _objectSpread(_objectSpread({
          showSizeChanger: true,
          showQuickJumper: true
        }, pagination), {}, {
          onChange: this.handleTableChange
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].timeLineExBox
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(_index["default"].timeLineEx, " ").concat(_index["default"].timeLineExInverse)
      }, /*#__PURE__*/_react["default"].createElement(_list["default"], {
        loading: loading,
        itemLayout: "vertical",
        size: "large",
        pagination: paginationProps,
        dataSource: list,
        renderItem: function renderItem(item) {
          return /*#__PURE__*/_react["default"].createElement(_list["default"].Item, {
            key: item.title,
            style: {
              // paddingTop: '0px',
              // paddingBottom: '0px',
              padding: 0,
              borderBottom: '0px'
            }
          }, /*#__PURE__*/_react["default"].createElement("div", null, _this2.renderDateLabel(getDateLabel(item)), _this2.renderInfo(item)));
        }
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var _nextProps$data = nextProps.data,
          list = _nextProps$data.list,
          pagination = _nextProps$data.pagination;
      return {
        list: list,
        pagination: pagination
      };
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }]);

  return TimeLineCustom;
}(_CustomBase2["default"]);

TimeLineCustom.defaultProps = {
  showPagination: false,
  iconStyle: {},
  links: [],
  getIcon: function getIcon() {
    return /*#__PURE__*/_react["default"].createElement(_icons.MessageOutlined, null);
  },
  getBackgroundColorKey: function getBackgroundColorKey() {
    return '';
  },
  getDateLabel: function getDateLabel() {
    return '';
  },
  getTime: function getTime() {
    return '';
  },
  getTitle: function getTitle() {
    return '';
  },
  getDescription: function getDescription() {
    return '';
  },
  getBottomLeft: function getBottomLeft() {
    return '';
  },
  getBottomRight: function getBottomRight() {
    return '';
  }
};
var _default = TimeLineCustom;
exports["default"] = _default;