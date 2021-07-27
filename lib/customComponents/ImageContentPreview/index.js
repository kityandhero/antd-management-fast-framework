"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/empty/style");

var _empty = _interopRequireDefault(require("antd/es/empty"));

var _react = _interopRequireDefault(require("react"));

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

var _constants = require("../../utils/constants");

var _CustomBase2 = _interopRequireDefault(require("../../framework/CustomBase"));

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

var ImageContentPreview = /*#__PURE__*/function (_CustomBase) {
  _inherits(ImageContentPreview, _CustomBase);

  var _super = _createSuper(ImageContentPreview);

  function ImageContentPreview(props) {
    var _this;

    _classCallCheck(this, ImageContentPreview);

    _this = _super.call(this, props);

    _this.onClose = function () {
      var afterClose = _this.props.afterClose;
      afterClose();
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      visible: false,
      htmlContent: '',
      imageList: [],
      listItem: [],
      mode: _constants.imageContentPreviewMode.html
    });
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(ImageContentPreview, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          visible = _this$state.visible,
          mode = _this$state.mode,
          imageList = _this$state.imageList,
          listItem = _this$state.listItem,
          htmlContent = _this$state.htmlContent;

      if (mode === _constants.imageContentPreviewMode.imageList) {
        var imageListHtmlContent = (imageList || []).map(function (item) {
          return "<img src=\"".concat(item, "\" alt=\"\" />");
        }).join('');
        return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
          title: "\u56FE\u7247\u8BE6\u60C5\u9884\u89C8",
          width: 380,
          placement: "left",
          visible: visible,
          closable: true,
          onClose: this.onClose
        }, imageListHtmlContent ? /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].previewContainor // dangerouslySetInnerHTML={{ __html: imageListHtmlContent }}

        }, (0, _htmlReactParser["default"])(imageListHtmlContent)) : /*#__PURE__*/_react["default"].createElement(_empty["default"], null));
      }

      if (mode === _constants.imageContentPreviewMode.listItem) {
        var listItemHtmlContent = (listItem || []).map(function (item) {
          return "<img src=\"".concat(item.image, "\" alt=\"\" /><p>").concat(item.description, "</p>");
        }).join('');
        return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
          title: "\u56FE\u7247\u8BE6\u60C5\u9884\u89C8",
          width: 380,
          placement: "left",
          visible: visible,
          closable: true,
          onClose: this.onClose
        }, listItemHtmlContent ? /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].previewContainor // dangerouslySetInnerHTML={{ __html: htmlContent }}

        }, (0, _htmlReactParser["default"])(htmlContent)) : /*#__PURE__*/_react["default"].createElement(_empty["default"], null));
      }

      if (mode === _constants.imageContentPreviewMode.html) {
        return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
          title: "\u56FE\u7247\u8BE6\u60C5\u9884\u89C8",
          width: 380,
          placement: "left",
          visible: visible,
          closable: true,
          onClose: this.onClose
        }, htmlContent ? /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].previewContainor // dangerouslySetInnerHTML={{ __html: htmlContent }}

        }, (0, _htmlReactParser["default"])(htmlContent)) : /*#__PURE__*/_react["default"].createElement(_empty["default"], null));
      }

      return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
        title: "\u56FE\u7247\u8BE6\u60C5\u9884\u89C8",
        width: 380,
        placement: "left",
        visible: visible,
        closable: true,
        onClose: this.onClose
      }, /*#__PURE__*/_react["default"].createElement(_empty["default"], null));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var visible = nextProps.visible,
          mode = nextProps.mode,
          imageList = nextProps.imageList,
          listItem = nextProps.listItem,
          htmlContent = nextProps.htmlContent;
      return {
        visible: visible,
        mode: mode || _constants.imageContentPreviewMode.html,
        imageList: imageList || [],
        listItem: listItem || [],
        htmlContent: htmlContent || ''
      };
    }
  }]);

  return ImageContentPreview;
}(_CustomBase2["default"]);

var _default = ImageContentPreview;
exports["default"] = _default;