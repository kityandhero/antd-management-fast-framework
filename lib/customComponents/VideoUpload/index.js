"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/space/style");

var _space = _interopRequireDefault(require("antd/es/space"));

require("antd/es/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/menu/style");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _react = _interopRequireWildcard(require("react"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

var _icons = require("@ant-design/icons");

var _tools = require("../../utils/tools");

var _IconInfo = _interopRequireDefault(require("../IconInfo"));

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

var TextArea = _input["default"].TextArea;

var VideoUpload = /*#__PURE__*/function (_PureComponent) {
  _inherits(VideoUpload, _PureComponent);

  var _super = _createSuper(VideoUpload);

  function VideoUpload(props) {
    var _this;

    _classCallCheck(this, VideoUpload);

    _this = _super.call(this, props);

    _this.handleUploadCancel = function () {
      _this.setState({
        previewVisible: false
      });
    };

    _this.showPreviewModal = function () {
      var videoUrl = _this.state.videoUrl;

      if ((0, _tools.stringIsNullOrWhiteSpace)(videoUrl)) {
        (0, _tools.showErrorMessage)('无效的视频源');
        return;
      }

      _this.setState({
        previewVisible: true
      });
    };

    _this.showChangeUrlModal = function () {
      var videoUrl = _this.state.videoUrl;

      _this.setState({
        videoUrlTemp: videoUrl,
        changeUrlVisible: true
      });
    };

    _this.handleUrlChange = function (e) {
      var v = e.target.value;

      _this.setState({
        videoUrlTemp: v
      });
    };

    _this.handleChangeUrlOk = function () {
      var afterChangeSuccess = _this.props.afterChangeSuccess;
      var videoUrlTemp = _this.state.videoUrlTemp;

      _this.setState({
        videoUrl: videoUrlTemp,
        changeUrlVisible: false
      }, function () {
        if ((0, _tools.isFunction)(afterChangeSuccess)) {
          afterChangeSuccess(videoUrlTemp || '');
        } else {
          (0, _tools.showRuntimeErrorMessage)('afterChangeSuccess 配置无效');
        }
      });
    };

    _this.handleChangeUrlCancel = function () {
      _this.setState({
        changeUrlVisible: false
      });
    };

    _this.clearUrl = function () {
      var afterChangeSuccess = _this.props.afterChangeSuccess;

      _this.setState({
        videoUrl: '',
        changeUrlVisible: false
      }, function () {
        if ((0, _tools.isFunction)(afterChangeSuccess)) {
          afterChangeSuccess('');
        } else {
          (0, _tools.showRuntimeErrorMessage)('afterChangeSuccess 配置无效');
        }
      });
    };

    _this.beforeUpload = function (file) {
      var isVideo = file.type === 'video/mp4';

      if (!isVideo) {
        (0, _tools.showErrorMessage)('请上传视频文件!');
      }

      var isLt3M = file.size / 1024 / 1024 < 3;

      if (!isLt3M) {
        (0, _tools.showErrorMessage)('视频文件不能超过3MB!');
      }

      return isVideo && isLt3M;
    };

    _this.handleUploadChange = function (info) {
      var _this$props = _this.props,
          pretreatmentRemoteResponse = _this$props.pretreatmentRemoteResponse,
          afterChangeSuccess = _this$props.afterChangeSuccess;

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
            video: ''
          };
          var video = data.video;

          _this.setState({
            videoUrl: video,
            uploading: false
          }, function () {
            if ((0, _tools.isFunction)(afterChangeSuccess)) {
              afterChangeSuccess(video || '');
            } else {
              (0, _tools.showRuntimeErrorMessage)('afterChangeSuccess 配置无效');
            }
          });
        } else {
          (0, _tools.showRuntimeErrorMessage)('pretreatmentRemoteResponse 配置无效');
        }
      }
    };

    _this.handleMenuClick = function (e) {
      var key = e.key;
      var videoUrl = _this.state.videoUrl;

      switch (key) {
        case 'changeUrl':
          _this.showChangeUrlModal();

          break;

        case 'showPreview':
          _this.showPreviewModal();

          break;

        case 'copyUrl':
          if ((0, _tools.stringIsNullOrWhiteSpace)(videoUrl)) {
            (0, _tools.showErrorMessage)('当前未设置视频地址');
          } else {
            (0, _tools.copyToClipboard)(videoUrl);
          }

          break;

        case 'clearUrl':
          _this.clearUrl();

          break;

        default:
          break;
      }
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      videoSource: '',
      videoUrl: '',
      videoUrlTemp: '',
      uploading: false,
      previewVisible: false,
      changeUrlVisible: false
    });
    return _this;
  }

  _createClass(VideoUpload, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          action = _this$props2.action,
          disabled = _this$props2.disabled,
          showPreview = _this$props2.showPreview,
          tokenSet = _this$props2.tokenSet;
      var _this$state = this.state,
          uploading = _this$state.uploading,
          previewVisible = _this$state.previewVisible,
          changeUrlVisible = _this$state.changeUrlVisible,
          videoUrlTemp = _this$state.videoUrlTemp,
          videoUrl = _this$state.videoUrl;
      var uploadProps = {
        disabled: disabled,
        action: action,
        listType: 'text',
        showUploadList: false,
        beforeUpload: this.beforeUpload,
        onChange: this.handleUploadChange,
        headers: _objectSpread({}, tokenSet)
      };

      var menu = /*#__PURE__*/_react["default"].createElement(_menu["default"], {
        onClick: this.handleMenuClick
      }, /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: "changeUrl"
      }, /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.SwapOutlined, null),
        text: "\u66F4\u6362\u5730\u5740"
      })), /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: "copyUrl",
        disabled: (0, _tools.stringIsNullOrWhiteSpace)(videoUrl)
      }, /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.CopyOutlined, null),
        text: "\u590D\u5236\u5730\u5740"
      })), /*#__PURE__*/_react["default"].createElement(_menu["default"].Divider, null), /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
        key: "clearUrl",
        disabled: (0, _tools.stringIsNullOrWhiteSpace)(videoUrl)
      }, /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.DeleteOutlined, null),
        text: "\u6E05\u7A7A\u89C6\u9891"
      })));

      var addonAfter = /*#__PURE__*/_react["default"].createElement(_space["default"], {
        split: /*#__PURE__*/_react["default"].createElement(_divider["default"], {
          type: "vertical"
        })
      }, showPreview ? /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        key: "showVideoTip",
        placement: "top",
        title: "\u64AD\u653E\u89C6\u9891\u9884\u89C8"
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        },
        disabled: uploading || (0, _tools.stringIsNullOrWhiteSpace)(videoUrl),
        onClick: function onClick() {
          _this2.showPreviewModal();
        }
      }, /*#__PURE__*/_react["default"].createElement(_icons.PlayCircleOutlined, null), "\u64AD\u653E")) : null, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        key: "showChangeUrlTip",
        placement: "top",
        title: "\u4E0A\u4F20\u89C6\u9891"
      }, /*#__PURE__*/_react["default"].createElement(_upload["default"], uploadProps, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        },
        disabled: uploading
      }, uploading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.UploadOutlined, null), uploading ? '稍后' : '上传'))), /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        key: "showMoreTip",
        placement: "top",
        title: "\u66F4\u591A\u64CD\u4F5C"
      }, /*#__PURE__*/_react["default"].createElement(_dropdown["default"], {
        overlay: menu,
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        }
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        }
      }, /*#__PURE__*/_react["default"].createElement(_icons.EllipsisOutlined, {
        style: {
          fontSize: 20,
          verticalAlign: 'top'
        }
      })))));

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        disabled: true,
        addonBefore: /*#__PURE__*/_react["default"].createElement(_icons.VideoCameraOutlined, null),
        addonAfter: addonAfter,
        value: videoUrl,
        placeholder: "\u5F53\u524D\u672A\u8BBE\u7F6E\u89C6\u9891\u5730\u5740"
      }), /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        title: /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
          icon: /*#__PURE__*/_react["default"].createElement(_icons.VideoCameraOutlined, null),
          text: "\u89C6\u9891\u9884\u89C8"
        }),
        visible: previewVisible,
        footer: null,
        onCancel: this.handleUploadCancel
      }, /*#__PURE__*/_react["default"].createElement(_reactPlayer["default"], {
        width: "100%",
        height: "100%",
        url: videoUrl,
        controls: true
      })), /*#__PURE__*/_react["default"].createElement(_modal["default"], {
        title: /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
          icon: /*#__PURE__*/_react["default"].createElement(_icons.SwapOutlined, null),
          text: "\u8BF7\u8F93\u5165\u5C06\u66F4\u6362\u7684\u89C6\u9891\u5730\u5740"
        }),
        visible: changeUrlVisible,
        onOk: this.handleChangeUrlOk,
        onCancel: this.handleChangeUrlCancel
      }, /*#__PURE__*/_react["default"].createElement(TextArea, {
        rows: 4,
        value: videoUrlTemp,
        onChange: this.handleUrlChange,
        placeholder: "\u76EE\u524D\u6CA1\u6709\u5C06\u8981\u66F4\u6362\u7684\u89C6\u9891\u5730\u5740"
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var videoNext = nextProps.video;
      var videoPrev = prevState.videoSource;

      if ((videoNext || '') !== (videoPrev || '')) {
        return {
          videoSource: videoNext,
          videoUrl: videoNext
        };
      }

      return null;
    }
  }]);

  return VideoUpload;
}(_react.PureComponent);

VideoUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  video: '',
  showPreview: false,
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterChangeSuccess: function afterChangeSuccess() {}
};
var _default = VideoUpload;
exports["default"] = _default;