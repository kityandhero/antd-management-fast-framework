"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _SupplementWrapper2 = _interopRequireDefault(require("../../../CustomWrapper/SupplementWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SelectFieldBase = /*#__PURE__*/function (_SupplementWrapper) {
  _inherits(SelectFieldBase, _SupplementWrapper);

  var _super = _createSuper(SelectFieldBase);

  function SelectFieldBase(props) {
    var _this;

    _classCallCheck(this, SelectFieldBase);

    _this = _super.call(this, props);
    _this.loadDataAfterMount = false;

    _this.clearSelect = function () {
      var afterClearSelect = _this.props.afterClearSelect;

      _this.setState({
        selectData: null
      });

      if ((0, _tools.isFunction)(afterClearSelect)) {
        afterClearSelect();
      }
    };

    _this.renderOther = function () {
      return null;
    };

    _this.showSelect = function () {
      (0, _tools.showRuntimeErrorMessage)('showSelect 方法需要在上层进行实现');
    };

    _this.getFieldData = function () {
      return {
        fieldText: '',
        fieldTitle: '',
        placeholder: '请选择'
      };
    };

    _this.renderField = function () {
      var _this$props = _this.props,
          dataLoading = _this$props.dataLoading,
          processing = _this$props.processing,
          loadSuccess = _this$props.loadSuccess,
          label = _this$props.label,
          helper = _this$props.helper,
          formItemLayout = _this$props.formItemLayout,
          showClear = _this$props.showClear;

      var _ref = _this.getFieldData() || {
        fieldText: '',
        fieldTitle: '',
        fieldPlaceholder: '请选择'
      },
          fieldText = _ref.fieldText,
          fieldTitle = _ref.fieldTitle,
          fieldPlaceholder = _ref.fieldPlaceholder;

      return _this.renderFormOnlyShowInput(label, (fieldText || '') === '' ? null : fieldText, helper || null, /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), {
        placeholder: "".concat(fieldPlaceholder).concat(fieldTitle),
        readOnly: true,
        addonAfter: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_button["default"], {
          style: {
            border: '0px solid #d9d9d9',
            backgroundColor: '#fafafa',
            height: '30px',
            paddingLeft: 0,
            paddingRight: 0
          },
          disabled: dataLoading || processing || !loadSuccess,
          title: "\u9009\u62E9".concat(fieldTitle),
          onClick: function onClick(e) {
            return _this.showSelect(e);
          }
        }, /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, null)), showClear ? /*#__PURE__*/_react["default"].createElement(_divider["default"], {
          type: "vertical",
          style: {
            paddingLeft: 2,
            paddingRight: 2
          }
        }) : null, showClear ? /*#__PURE__*/_react["default"].createElement(_button["default"], {
          style: {
            border: '0px solid #d9d9d9',
            backgroundColor: '#fafafa',
            height: '30px',
            paddingLeft: 0,
            paddingRight: 0
          },
          disabled: dataLoading || processing || !loadSuccess,
          title: "\u6E05\u9664\u9009\u62E9",
          onClick: function onClick() {
            return _this.clearSelect();
          }
        }, /*#__PURE__*/_react["default"].createElement(_icons.CloseCircleOutlined, null)) : null)
      }, formItemLayout);
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      selectData: null
    });
    return _this;
  }

  _createClass(SelectFieldBase, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderField(), this.renderOther());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return _get(_getPrototypeOf(SelectFieldBase), "getDerivedStateFromProps", this).call(this, nextProps, prevState);
    }
  }]);

  return SelectFieldBase;
}(_SupplementWrapper2["default"]);

SelectFieldBase.defaultProps = {
  dataLoading: false,
  loadSuccess: true,
  required: false,
  showClear: true
};
var _default = SelectFieldBase;
exports["default"] = _default;