"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var FileBase64Upload = /*#__PURE__*/function (_PureComponent) {
  _inherits(FileBase64Upload, _PureComponent);

  var _super = _createSuper(FileBase64Upload);

  function FileBase64Upload(props) {
    var _this;

    _classCallCheck(this, FileBase64Upload);

    _this = _super.call(this, props);

    _this.handleUploadCancel = function () {
      return _this.setState({
        previewVisible: false
      });
    };

    _this.beforeUpload = function (file) {
      var isLt1M = file.size / 1024 / 1024 < 1;

      if (!isLt1M) {
        (0, _tools.showRuntimeErrorMessage)('文件不能超过1MB!');
      }

      return isLt1M;
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
            fileBase64: ''
          };
          var fileBase64 = data.fileBase64;

          _this.setState({
            uploading: false
          });

          if ((0, _tools.isFunction)(afterUploadSuccess)) {
            afterUploadSuccess(fileBase64 || '');
          } else {
            (0, _tools.showRuntimeErrorMessage)('afterUploadSuccess 配置无效');
          }
        } else {
          (0, _tools.showRuntimeErrorMessage)('pretreatmentRemoteResponse 配置无效');
        }
      }
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      uploading: false,
      base64: ''
    });
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(FileBase64Upload, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          action = _this$props2.action,
          disabled = _this$props2.disabled,
          uploadText = _this$props2.uploadText,
          tokenSet = _this$props2.tokenSet;
      var _this$state = this.state,
          uploading = _this$state.uploading,
          base64 = _this$state.base64;
      var uploadProps = {
        disabled: disabled,
        action: action,
        listType: 'text',
        showUploadList: false,
        beforeUpload: this.beforeUpload,
        onChange: this.handleUploadChange,
        headers: _objectSpread({}, tokenSet)
      };
      return /*#__PURE__*/_react.default.createElement(_input.default, {
        readOnly: true,
        addonBefore: /*#__PURE__*/_react.default.createElement(_icons.FileOutlined, null),
        placeholder: "\u8BF7\u9009\u62E9\u4E0A\u4F20".concat(uploadText || '文件'),
        value: base64,
        addonAfter: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_upload.default, uploadProps, /*#__PURE__*/_react.default.createElement(_button.default, {
          style: {
            border: '0px solid #d9d9d9',
            backgroundColor: '#fafafa',
            height: '30px',
            paddingLeft: 0,
            paddingRight: 0
          },
          disabled: uploading,
          title: "\u9009\u62E9".concat(uploadText || '文件')
        }, uploading ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.UploadOutlined, null), uploading ? '正在上传' : "\u9009\u62E9".concat(uploadText || '文件'))))
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var fileBase64 = nextProps.fileBase64;
      return {
        base64: fileBase64
      };
    }
  }]);

  return FileBase64Upload;
}(_react.PureComponent);

FileBase64Upload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  fileBase64: '',
  uploadText: '文件',
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterUploadSuccess: function afterUploadSuccess() {}
};
var _default = FileBase64Upload;
exports.default = _default;