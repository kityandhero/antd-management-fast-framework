"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

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

var Base = /*#__PURE__*/function (_BaseWindow) {
  _inherits(Base, _BaseWindow);

  var _super = _createSuper(Base);

  function Base(props) {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.call(this, props);
    _this.reloadWhenShow = true;

    _this.buildFormLayout = function () {
      return 'horizontal';
    };

    _this.buildOtherFormProps = function () {
      return {
        labelCol: {
          span: 7
        },
        wrapperCol: {
          span: 17
        }
      };
    };

    _this.renderFormWrapper = function () {
      return _this.renderForm();
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
        layout: _this.buildFormLayout(),
        initialValues: initialValues,
        className: _this.getFormClassName()
      }, otherFormProps), _this.formContent());
    };

    _this.formContentConfigData = function () {
      return null;
    };

    _this.buildFormContentWrapperTypeConfig = function () {
      return {
        mode: _constants.formContentConfig.wrapperType.model
      };
    };

    _this.formContent = function () {
      return _this.buildFormContent(_this.formContentConfigData());
    };

    _this.renderModalInner = function () {
      return _this.renderFormWrapper();
    };

    _this.getSaveButtonDisabled = function () {
      var _this$state2 = _this.state,
          dataLoading = _this$state2.dataLoading,
          processing = _this$state2.processing,
          loadSuccess = _this$state2.loadSuccess;
      return dataLoading || processing || !loadSuccess;
    };

    _this.buildOkButtonProps = function () {
      if (_this.reloadWhenShow) {
        var _buttonDisabled = _this.getSaveButtonDisabled() || _this.getOtherButtonDisabled();

        return {
          disabled: _buttonDisabled
        };
      }

      var buttonDisabled = _this.getOtherButtonDisabled();

      return {
        disabled: buttonDisabled
      };
    };

    _this.buildOkText = function () {
      return '';
    };

    _this.buildOkTextWrapper = function () {
      var okText = _this.buildOkText();

      var buttonProcessing = _this.getSaveButtonProcessing();

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, buttonProcessing ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : _this.getSaveButtonIcon(), /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].buttonText
      }, okText || '保存'));
    };

    _this.buildCancelButtonProps = function () {
      if (_this.reloadWhenShow) {
        var buttonDisabled = _this.getSaveButtonDisabled() || _this.getOtherButtonDisabled();

        return {
          disabled: buttonDisabled
        };
      }

      return {};
    };

    _this.buildCancelText = function () {
      var saveButtonText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_icons.CloseCircleOutlined, null), /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].buttonText
      }, saveButtonText || '取消'));
    };

    _this.buildModalBodyStyle = function () {
      return {
        padding: 0
      };
    };

    _this.getModalBodyStyle = function () {
      var otherModalBodyStyle = _this.buildModalBodyStyle();

      return _objectSpread(_objectSpread({}, {
        padding: 0
      }), otherModalBodyStyle || {});
    };

    _this.buildTitleIcon = function () {
      return /*#__PURE__*/_react["default"].createElement(_icons.EditOutlined, null);
    };

    _this.buildTitleText = function () {
      var pageName = _this.state.pageName;
      return pageName;
    };

    _this.buildTitle = function () {
      return /*#__PURE__*/_react["default"].createElement(_row["default"], {
        gutter: 6
      }, /*#__PURE__*/_react["default"].createElement(_col["default"], null, _this.buildTitleIcon()), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        flex: "auto"
      }, _this.buildTitleText()));
    };

    var defaultState = (0, _tools.defaultFormState)();
    _this.state = _objectSpread(_objectSpread({}, defaultState), {
      visible: false,
      dataLoading: false,
      width: 520
    });
    return _this;
  }

  _createClass(Base, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state3 = this.state,
          width = _this$state3.width,
          visible = _this$state3.visible,
          processing = _this$state3.processing,
          dataLoading = _this$state3.dataLoading;
      var maskClosable = this.props.maskClosable;
      return /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        title: this.buildTitle(),
        width: width,
        bodyStyle: this.getModalBodyStyle(),
        visible: visible,
        maskClosable: (0, _tools.isUndefined)(maskClosable) ? false : maskClosable,
        zIndex: 1001,
        okButtonProps: this.buildOkButtonProps(),
        onOk: function onOk(e) {
          _this2.handleOk(e);
        },
        okText: this.buildOkTextWrapper(),
        cancelButtonProps: this.buildCancelButtonProps(),
        cancelText: this.buildCancelText(),
        onCancel: this.handleCancel
      }, /*#__PURE__*/_react["default"].createElement(_spin["default"], {
        spinning: processing || dataLoading
      }, this.renderModalInner()), this.renderOther());
    }
  }]);

  return Base;
}(_BaseWindow2["default"]);

var _default = Base;
exports["default"] = _default;