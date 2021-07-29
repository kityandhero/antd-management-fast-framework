"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/affix/style");

var _affix = _interopRequireDefault(require("antd/es/affix"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/layout/style");

var _layout = _interopRequireDefault(require("antd/es/layout"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("../../../utils/tools");

var _constants = require("../../../utils/constants");

var _BaseWindow2 = _interopRequireDefault(require("../../DataOperation/BaseWindow"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var Footer = _layout["default"].Footer,
    Content = _layout["default"].Content;

var Base = /*#__PURE__*/function (_BaseWindow) {
  _inherits(Base, _BaseWindow);

  var _super = _createSuper(Base);

  function Base(props) {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.call(this, props);

    _this.onClose = function () {
      var afterClose = _this.props.afterClose;

      if ((0, _tools.isFunction)(afterClose)) {
        afterClose();
      }
    };

    _this.renderTitleIcon = function () {
      return /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null);
    };

    _this.renderTitle = function () {
      return '信息详情';
    };

    _this.buildFormLayout = function () {
      return 'vertical';
    };

    _this.renderForm = function () {
      var _this$state = _this.state,
          metaData = _this$state.metaData,
          metaListData = _this$state.metaListData,
          metaExtra = _this$state.metaExtra,
          metaOriginalData = _this$state.metaOriginalData;

      var initialValues = _this.buildInitialValues(metaData, metaListData, metaExtra, metaOriginalData);

      var otherFormProps = _this.buildOtherFormProps();

      return /*#__PURE__*/_react["default"].createElement(_form["default"], _extends({
        ref: _this.formRef,
        initialValues: initialValues,
        className: _this.getFormClassName(),
        layout: _this.buildFormLayout()
      }, otherFormProps), _this.formContent());
    };

    _this.formContentConfigData = function () {
      return null;
    };

    _this.buildFormContentWrapperTypeConfig = function () {
      return {
        mode: _constants.formContentConfig.wrapperType.drawer
      };
    };

    _this.formContent = function () {
      return _this.buildFormContent(_this.formContentConfigData());
    };

    _this.renderContentContainor = function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].contentContainor
      }, _this.renderForm());
    };

    _this.renderButton = function () {
      var _this$state2 = _this.state,
          dataLoading = _this$state2.dataLoading,
          processing = _this$state2.processing;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: "default",
        disabled: dataLoading || processing,
        onClick: function onClick() {
          _this.onClose();
        }
      }, /*#__PURE__*/_react["default"].createElement(_icons.CloseCircleOutlined, null), "\u5173\u95ED"));
    };

    _this.renderBottomBar = function () {
      return /*#__PURE__*/_react["default"].createElement(Footer, null, /*#__PURE__*/_react["default"].createElement(_affix["default"], {
        offsetBottom: 0
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].bottomBar
      }, /*#__PURE__*/_react["default"].createElement(_row["default"], null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
        span: 24,
        style: {
          textAlign: 'right'
        }
      }, _this.renderButton())))));
    };

    var defaultState = (0, _tools.defaultFormState)();
    _this.state = _objectSpread(_objectSpread({}, defaultState), {
      title: '',
      width: 820,
      height: 256,
      visible: false,
      dataLoading: false,
      showBottomBar: false,
      submitApiPath: '',
      placement: 'right'
    });
    return _this;
  }

  _createClass(Base, [{
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          visible = _this$state3.visible,
          width = _this$state3.width,
          height = _this$state3.height,
          showBottomBar = _this$state3.showBottomBar,
          placement = _this$state3.placement;
      var maskClosable = this.props.maskClosable;
      var titleIcon = this.renderTitleIcon();
      return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
        title: /*#__PURE__*/_react["default"].createElement("span", null, titleIcon, titleIcon ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
          className: _index["default"].titleText
        }), " ", this.renderTitle()) : this.renderTitle()),
        destroyOnClose: false,
        width: width,
        height: height,
        placement: placement,
        visible: visible || false,
        maskClosable: (0, _tools.isUndefined)(maskClosable) ? false : maskClosable,
        onClose: this.onClose,
        bodyStyle: {
          padding: 0
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].mainContainor
      }, /*#__PURE__*/_react["default"].createElement(_layout["default"], null, /*#__PURE__*/_react["default"].createElement(Content, null, this.renderContentContainor()), showBottomBar ? this.renderBottomBar() : null), this.renderOther()));
    }
  }]);

  return Base;
}(_BaseWindow2["default"]);

var _default = Base;
exports["default"] = _default;