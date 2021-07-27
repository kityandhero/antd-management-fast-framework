"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/space/style");

var _space = _interopRequireDefault(require("antd/es/space"));

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _ImageBox = _interopRequireDefault(require("@/customComponents/ImageBox"));

var _FlexBox = _interopRequireDefault(require("@/customComponents/FlexBox"));

var _VerticalBox = _interopRequireDefault(require("@/customComponents/VerticalBox"));

var _index = _interopRequireDefault(require("./index.less"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var confirm = _modal["default"].confirm;

var ImageUpload = /*#__PURE__*/function (_PureComponent) {
  _inherits(ImageUpload, _PureComponent);

  var _super = _createSuper(ImageUpload);

  function ImageUpload(props) {
    var _this;

    _classCallCheck(this, ImageUpload);

    _this = _super.call(this, props);

    _this.handleUploadCancel = function () {
      return _this.setState({
        previewVisible: false
      });
    };

    _this.handleFilePreview = function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    };

    _this.handleImagePreview = function () {
      var image = _this.props.image;

      if ((0, _tools.stringIsNullOrWhiteSpace)(image)) {
        _message2["default"].info('无图片可以预览');

        return;
      }

      _this.setState({
        previewImage: image,
        previewVisible: true
      });
    };

    _this.beforeUpload = function (file) {
      var isPic = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png';

      if (!isPic) {
        (0, _tools.showRuntimeErrorMessage)('请上传图片文件!');
      }

      var isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        (0, _tools.showRuntimeErrorMessage)('图片文件不能超过2MB!');
      }

      return isPic && isLt2M;
    };

    _this.handleUploadChange = function (info) {
      var _this$props = _this.props,
          pretreatmentRemoteResponse = _this$props.pretreatmentRemoteResponse,
          afterUploadSuccess = _this$props.afterUploadSuccess;

      if (info.file.status === 'uploading') {
        _this.setState({
          uploading: true
        });

        return;
      }

      if (info.file.status === 'done') {
        var response = info.file.response;

        if ((0, _tools.isFunction)(pretreatmentRemoteResponse)) {
          var data = pretreatmentRemoteResponse(response) || {
            image: ''
          };
          var image = data.image;

          _this.setState({
            uploading: false
          });

          if ((0, _tools.isFunction)(afterUploadSuccess)) {
            afterUploadSuccess(image || '');
          } else {
            (0, _tools.showRuntimeErrorMessage)('afterUploadSuccess 配置无效');
          }
        } else {
          (0, _tools.showRuntimeErrorMessage)('pretreatmentRemoteResponse 配置无效');
        }
      }
    };

    _this.clearImage = function () {
      var image = _this.props.image;

      if ((0, _tools.stringIsNullOrWhiteSpace)(image)) {
        _message2["default"].info('当前没有可供移除的图片');

        return;
      }

      var afterUploadSuccess = _this.props.afterUploadSuccess;

      if ((0, _tools.isFunction)(afterUploadSuccess)) {
        confirm({
          title: "\u6E05\u9664\u56FE\u7247",
          content: "\u5373\u5C06\u6E05\u9664\u56FE\u7247\u6570\u636E\uFF0C\u6E05\u9664\u540E\u9700\u8981\u4FDD\u5B58\u624D\u80FD\u8FDB\u884C\u751F\u6548\uFF0C\u8981\u7EE7\u7EED\u5417\uFF1F",
          okText: '确定',
          okType: 'danger',
          cancelText: '取消',
          onOk: function onOk() {
            afterUploadSuccess('');
          },
          onCancel: function onCancel() {}
        });
      } else {
        (0, _tools.showRuntimeErrorMessage)('afterUploadSuccess 配置无效');
      }
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      uploading: false,
      previewVisible: false,
      previewImage: ''
    });
    return _this;
  }

  _createClass(ImageUpload, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          action = _this$props2.action,
          disabled = _this$props2.disabled,
          listType = _this$props2.listType,
          fileList = _this$props2.fileList,
          showUploadList = _this$props2.showUploadList,
          image = _this$props2.image,
          singleModeSource = _this$props2.singleMode,
          tokenSet = _this$props2.tokenSet,
          onItemChange = _this$props2.onItemChange,
          onItemRemove = _this$props2.onItemRemove;
      var _this$state = this.state,
          uploading = _this$state.uploading,
          previewVisible = _this$state.previewVisible,
          previewImage = _this$state.previewImage;

      var uploadButton = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20\u65B0\u56FE"));

      var uploadProps = {
        disabled: disabled,
        action: action,
        listType: listType,
        showUploadList: showUploadList,
        onPreview: this.handleFilePreview,
        beforeUpload: this.beforeUpload,
        onChange: !(showUploadList || false) ? this.handleUploadChange : (0, _tools.isFunction)(onItemChange) ? onItemChange : null,
        onRemove: (0, _tools.isFunction)(onItemRemove) ? onItemRemove : null,
        headers: _objectSpread({}, tokenSet)
      };

      if (showUploadList) {
        uploadProps.fileList = fileList || [];
      }

      var _width$emptyImage = _objectSpread(_objectSpread({}, {
        width: '240px',
        emptyImage: ''
      }), singleModeSource || {}),
          width = _width$emptyImage.width,
          emptyImage = _width$emptyImage.emptyImage;

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].containor
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "clearfix"
      }, !(showUploadList || false) ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].imageBox,
        style: {
          minWidth: '140px',
          width: width
        }
      }, /*#__PURE__*/_react["default"].createElement(_upload["default"], uploadProps, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].imageAction
      }, uploading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.UploadOutlined, null), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ant-upload-text"
      }, uploading ? '上传中' : '上传')), /*#__PURE__*/_react["default"].createElement(_VerticalBox["default"], {
        align: "bottom",
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: width,
          padding: '1px'
        }
      }, /*#__PURE__*/_react["default"].createElement(_ImageBox["default"], {
        src: image || emptyImage,
        loadingEffect: true,
        errorOverlayVisible: true,
        showErrorIcon: false,
        fillHeight: false,
        alt: ""
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].toolBar
      }, /*#__PURE__*/_react["default"].createElement(_FlexBox["default"], {
        right: /*#__PURE__*/_react["default"].createElement(_space["default"], null, /*#__PURE__*/_react["default"].createElement(_icons.EyeOutlined, {
          onClick: function onClick() {
            _this2.handleImagePreview();
          }
        }), /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, {
          onClick: function onClick() {
            _this2.clearImage();
          }
        }))
      })))) : /*#__PURE__*/_react["default"].createElement(_upload["default"], uploadProps, (fileList || []).length >= 8 ? null : uploadButton), /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleUploadCancel,
        bodyStyle: {
          boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset'
        }
      }, /*#__PURE__*/_react["default"].createElement(_VerticalBox["default"], {
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement(_ImageBox["default"], {
        src: previewImage,
        loadingEffect: true,
        errorOverlayVisible: true,
        showErrorIcon: false,
        fillHeight: false,
        alt: ""
      }))))));
    }
  }]);

  return ImageUpload;
}(_react.PureComponent);

ImageUpload.defaultProps = {
  action: '',
  listType: 'picture-card',
  showUploadList: false,
  disabled: false,
  tokenSet: {},
  image: '',
  fileList: [],
  singleMode: {
    width: '240px',
    emptyImage: ''
  },
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterUploadSuccess: function afterUploadSuccess() {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemChange: function onItemChange(_ref) {
    var file = _ref.file,
        fileList = _ref.fileList;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemRemove: function onItemRemove(file) {}
};
var _default = ImageUpload;
exports["default"] = _default;