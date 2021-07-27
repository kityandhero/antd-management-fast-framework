"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

var _Base2 = _interopRequireDefault(require("../../framework/DataDrawer/Base"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataPreviewDrawer = /*#__PURE__*/function (_Base) {
  _inherits(DataPreviewDrawer, _Base);

  var _super = _createSuper(DataPreviewDrawer);

  function DataPreviewDrawer(props) {
    var _this;

    _classCallCheck(this, DataPreviewDrawer);

    _this = _super.call(this, props);
    _this.loadDataAfterMount = false;

    _this.renderTitleIcon = function () {
      var icon = _this.props.icon;
      return icon;
    };

    _this.renderTitle = function () {
      var title = _this.props.title;
      return title || '';
    };

    _this.formContentConfigData = function () {
      var _this$props = _this.props,
          dataType = _this$props.dataType,
          data = _this$props.data;
      var list = [{
        title: {
          icon: /*#__PURE__*/_react["default"].createElement(_icons.ContactsOutlined, null),
          text: '说明'
        },
        items: [{
          lg: 24,
          type: _constants.formContentConfig.contentItemType.onlyShowText,
          fieldData: {
            label: '',
            helper: ''
          },
          value: '本次操作的记录描述，请细心察看'
        }]
      }];

      if ((0, _tools.toNumber)(dataType) === _constants.dataTypeCollection.commonValue.flag) {
        list.push({
          title: {
            icon: /*#__PURE__*/_react["default"].createElement(_icons.ContactsOutlined, null),
            text: '操作内容'
          },
          items: [{
            lg: 24,
            type: _constants.formContentConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '操作内容',
              helper: ''
            },
            value: data
          }]
        });
      } else if (dataType === _constants.dataTypeCollection.jsonObject.flag || dataType === _constants.dataTypeCollection.jsonObjectList.flag) {
        list.push({
          title: {
            icon: /*#__PURE__*/_react["default"].createElement(_icons.ContactsOutlined, null),
            text: '数据变更'
          },
          items: [{
            lg: 24,
            type: _constants.formContentConfig.contentItemType.jsonView,
            value: data
          }]
        });
      } else {
        list.push({
          title: {
            icon: /*#__PURE__*/_react["default"].createElement(_icons.ContactsOutlined, null),
            text: '操作内容'
          },
          items: [{
            lg: 24,
            type: _constants.formContentConfig.contentItemType.onlyShowText,
            fieldData: {
              label: '操作内容',
              helper: ''
            },
            value: data
          }]
        });
      }

      return {
        list: list
      };
    };

    _this.renderContentContainor = function () {
      var _this$props2 = _this.props,
          dataType = _this$props2.dataType,
          data = _this$props2.data;

      if (dataType === _constants.dataTypeCollection.html.flag) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].previewContainor
        }, (0, _htmlReactParser["default"])(data));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].contentContainor
      }, _this.renderForm());
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      showBottomBar: true
    });
    return _this;
  }

  return DataPreviewDrawer;
}(_Base2["default"]);

DataPreviewDrawer.defaultProps = {
  title: '',
  icon: /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null),
  placement: 'left',
  width: 380,
  dataType: _constants.dataTypeCollection.commonValue.flag
};
var _default = DataPreviewDrawer;
exports["default"] = _default;