"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/back-top/style");

var _backTop = _interopRequireDefault(require("antd/es/back-top"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/space/style");

var _space = _interopRequireDefault(require("antd/es/space"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

var _react = _interopRequireDefault(require("react"));

var _proLayout = require("@ant-design/pro-layout");

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _FunctionComponent = require("@/customComponents/FunctionComponent");

var _BaseView2 = _interopRequireDefault(require("../../DataOperation/BaseView"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var DataCore = /*#__PURE__*/function (_BaseView) {
  _inherits(DataCore, _BaseView);

  var _super = _createSuper(DataCore);

  function DataCore() {
    var _this;

    _classCallCheck(this, DataCore);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.enableActionBack = true;
    _this.reloadByUrlOp = false;
    _this.needSetFormValueAfterLoad = true;
    _this.actionBackProps = {};
    _this.formRef = /*#__PURE__*/_react.default.createRef();

    _this.setFormFieldsValue = function (v) {
      var form = _this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(v);

        _this.afterSetFieldsValue(v);
      }
    };

    _this.afterSetFieldsValue = function (v) {};

    _this.getTargetForm = function () {
      return _this.formRef.current;
    };

    _this.pageHeaderLogo = function () {
      return /*#__PURE__*/_react.default.createElement(_avatar.default, {
        shape: "square",
        icon: /*#__PURE__*/_react.default.createElement(_icons.PlusOutlined, null)
      });
    };

    _this.pageHeaderActionExtraGroup = function () {
      return null;
    };

    _this.pageHeaderActionExtraEllipsis = function () {
      return null;
    };

    _this.pageHeaderActionBack = function () {
      var backPath = _this.state.backPath;

      if (!_this.enableActionBack) {
        return null;
      }

      if ((backPath || '') === '') {
        return null;
      }

      var props = _objectSpread(_objectSpread({}, {
        icon: /*#__PURE__*/_react.default.createElement(_icons.RollbackOutlined, null),
        type: 'dashed'
      }), _this.actionBackProps || {});

      return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        placement: "top",
        title: "\u8FD4\u56DE\u5217\u8868\u9875"
      }, /*#__PURE__*/_react.default.createElement(_button.default, _extends({}, props, {
        onClick: function onClick(e) {
          _this.backToList(e);
        }
      }), "\u5217\u8868\u9875"));
    };

    _this.pageHeaderAction = function () {
      var _this$state = _this.state,
          dataLoading = _this$state.dataLoading,
          reloading = _this$state.reloading,
          refreshing = _this$state.refreshing,
          showReloadButton = _this$state.showReloadButton;

      var buttonGroupData = _this.pageHeaderActionExtraGroup();

      var ellipsisActionData = _this.pageHeaderActionExtraEllipsis();

      return /*#__PURE__*/_react.default.createElement(_space.default, null, (0, _FunctionComponent.buildButtonGroup)(buttonGroupData), (0, _FunctionComponent.buildDropdownEllipsis)(ellipsisActionData), _this.pageHeaderActionBack(), showReloadButton ? /*#__PURE__*/_react.default.createElement(_tooltip.default, {
        placement: "top",
        title: "\u5237\u65B0"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        disabled: dataLoading || reloading || refreshing,
        type: "dashed",
        onClick: function onClick() {
          _this.reloadData();
        }
      }, reloading || refreshing ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.ReloadOutlined, null))) : null);
    };

    _this.buildInitialValues = function (metaData, metaListData, metaExtra, metaOriginalData) {
      if (_this.loadDataAfterMount) {
        if (_this.needSetFormValueAfterLoad) {
          (0, _tools.showRuntimeErrorMessage)('buildInitialValues 方法需要重新实现。');
          return {};
        }

        return {};
      }

      return {};
    };

    _this.buildFormLayout = function () {
      return 'vertical';
    };

    _this.getFormClassName = function () {
      return null;
    };

    _this.renderMainTitleIcon = function () {
      return /*#__PURE__*/_react.default.createElement(_icons.ContactsOutlined, null);
    };

    _this.renderMainTitleText = function () {
      return '基本信息';
    };

    _this.renderMainTitle = function () {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, _this.renderMainTitleIcon(), /*#__PURE__*/_react.default.createElement("span", {
        className: _index.default.cardTitle
      }, " ", _this.renderMainTitleText()));
    };

    _this.renderFormWrapper = function () {
      return _this.renderForm();
    };

    _this.renderForm = function () {
      var _this$state2 = _this.state,
          metaData = _this$state2.metaData,
          metaListData = _this$state2.metaListData,
          metaExtra = _this$state2.metaExtra,
          metaOriginalData = _this$state2.metaOriginalData;

      var initialValues = _this.buildInitialValues(metaData, metaListData, metaExtra, metaOriginalData);

      var otherFormProps = _this.buildOtherFormProps();

      return /*#__PURE__*/_react.default.createElement(_form.default, _extends({
        ref: _this.formRef,
        initialValues: initialValues,
        className: _this.getFormClassName(),
        layout: _this.buildFormLayout()
      }, otherFormProps), _this.formContent());
    };

    _this.formContentConfigData = function () {
      return null;
    };

    _this.formContent = function () {
      return _this.buildFormContent(_this.formContentConfigData());
    };

    return _this;
  }

  _createClass(DataCore, [{
    key: "render",
    value: function render() {
      var pageName = this.state.pageName;
      return /*#__PURE__*/_react.default.createElement(_proLayout.PageHeaderWrapper, {
        title: pageName,
        logo: this.pageHeaderLogo()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: _index.default.containorBox
      }, this.renderFormWrapper(), this.renderOther()), /*#__PURE__*/_react.default.createElement(_backTop.default, null));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return (0, _tools.getDerivedStateFromPropsForUrlParams)(nextProps, prevState);
    }
  }]);

  return DataCore;
}(_BaseView2.default);

var _default = DataCore;
exports.default = _default;