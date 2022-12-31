import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Input, Menu, Space, Divider, Tooltip, Button, Upload, Dropdown, Modal } from 'antd';
import { PureComponent } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { j as iconCollection } from '../../constants.js';
import { d as defaultSettingsLayoutCustom } from '../../defaultSettingsSpecial.js';
import { h as stringIsNullOrWhiteSpace, j as showErrorMessage, a as isFunction, k as showRuntimeError, l as copyToClipboard } from '../../tools.js';
import { buildPlayer } from '../FunctionComponent/index.js';
import IconInfo from '../IconInfo/index.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
import '../../core.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import 'array-move';
import 'copy-to-clipboard';
import 'moment';
import 'numeral';
import 'nzh';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';
import '../../objectWithoutProperties.js';
import '../../extends.js';
import 'rc-texty';
import 'react-json-view';
import 'react-player';
import 'react-syntax-highlighter';
import '../AnimalBox/FadeBox/index.js';
import 'rc-animate';
import '../AnimalBox/QueueBox/index.js';
import '../AnimalBox/QueueListBox/index.js';
import 'rc-queue-anim';
import '../AnimalBox/RotateBox/index.js';
import 'rc-tween-one';
import '../ColorText/index.js';
import '../EllipsisCustom/index.js';
import 'classnames';
import '../FlexBox/index.js';
import '../FlexText/index.js';
import '../Ellipsis/index.js';
import '../ImageBox/index.js';
import '../CustomBase/index.js';
import '../VerticalBox/index.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TextArea = Input.TextArea;
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
      if (stringIsNullOrWhiteSpace(videoUrl)) {
        var text = '无效的视频源';
        showErrorMessage({
          message: text
        });
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
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess(videoUrlTemp || '');
        } else {
          var text = 'afterChangeSuccess 配置无效';
          showRuntimeError({
            message: text
          });
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
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess('');
        } else {
          var text = 'afterChangeSuccess 配置无效';
          showRuntimeError({
            message: text
          });
        }
      });
    };
    _this.beforeUpload = function (file) {
      var isVideo = file.type === 'video/mp4';
      if (!isVideo) {
        var text = '请上传视频文件(*.mp4)!';
        showErrorMessage({
          message: text
        });
      }
      var isLt3M = file.size / 1024 / 1024 < defaultSettingsLayoutCustom.getVideoUploadMaxSize();
      if (!isLt3M) {
        var _text = '视频文件不能超过3MB!';
        showErrorMessage({
          message: _text
        });
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
        if (isFunction(pretreatmentRemoteResponse)) {
          var data = pretreatmentRemoteResponse(response) || {
            video: ''
          };
          var video = data.video;
          _this.setState({
            videoUrl: video,
            uploading: false
          }, function () {
            if (isFunction(afterChangeSuccess)) {
              afterChangeSuccess(video || '');
            } else {
              var text = 'afterChangeSuccess 配置无效';
              showRuntimeError({
                message: text
              });
            }
          });
        } else {
          var text = 'pretreatmentRemoteResponse 配置无效';
          showRuntimeError({
            message: text
          });
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
          if (stringIsNullOrWhiteSpace(videoUrl)) {
            var text = '当前未设置视频地址';
            showErrorMessage({
              message: text
            });
          } else {
            copyToClipboard(videoUrl);
          }
          break;
        case 'clearUrl':
          _this.clearUrl();
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
      var items = [{
        key: 'changeUrl',
        label: '更换地址',
        icon: iconCollection.swap
      }, {
        key: 'copyUrl',
        label: '复制地址',
        icon: iconCollection.copy,
        disabled: stringIsNullOrWhiteSpace(videoUrl)
      }, {
        key: 'clearUrl',
        label: '清空视频',
        icon: iconCollection["delete"],
        disabled: stringIsNullOrWhiteSpace(videoUrl)
      }];
      var menu = /*#__PURE__*/React.createElement(Menu, {
        items: items,
        onClick: this.handleMenuClick
      });
      var addonAfter = /*#__PURE__*/React.createElement(Space, {
        split: /*#__PURE__*/React.createElement(Divider, {
          type: "vertical"
        })
      }, showPreview ? /*#__PURE__*/React.createElement(Tooltip, {
        key: "showVideoTip",
        placement: "top",
        title: "\u64AD\u653E\u89C6\u9891\u9884\u89C8"
      }, /*#__PURE__*/React.createElement(Button, {
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        },
        disabled: uploading || stringIsNullOrWhiteSpace(videoUrl),
        onClick: function onClick() {
          _this2.showPreviewModal();
        }
      }, iconCollection.playCircle, "\u64AD\u653E")) : null, /*#__PURE__*/React.createElement(Tooltip, {
        key: "showChangeUrlTip",
        placement: "top",
        title: "\u4E0A\u4F20\u89C6\u9891"
      }, /*#__PURE__*/React.createElement(Upload, uploadProps, /*#__PURE__*/React.createElement(Button, {
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        },
        disabled: uploading
      }, uploading ? iconCollection.loading : iconCollection.upload, uploading ? '稍后' : '上传'))), /*#__PURE__*/React.createElement(Tooltip, {
        key: "showMoreTip",
        placement: "top",
        title: "\u66F4\u591A\u64CD\u4F5C"
      }, /*#__PURE__*/React.createElement(Dropdown, {
        arrow: true,
        placement: "bottomRight",
        overlay: menu,
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        }
      }, /*#__PURE__*/React.createElement(Button, {
        style: {
          border: '0px solid #d9d9d9',
          backgroundColor: '#fafafa',
          height: '30px',
          paddingLeft: 0,
          paddingRight: 0
        }
      }, /*#__PURE__*/React.createElement(EllipsisOutlined, {
        style: {
          fontSize: 20,
          verticalAlign: 'top'
        }
      })))));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
        disabled: true,
        addonBefore: iconCollection.videoCamera,
        addonAfter: addonAfter,
        value: videoUrl,
        placeholder: "\u5F53\u524D\u672A\u8BBE\u7F6E\u89C6\u9891\u5730\u5740"
      }), /*#__PURE__*/React.createElement(Modal, {
        title: /*#__PURE__*/React.createElement(IconInfo, {
          icon: iconCollection.videoCamera,
          text: "\u89C6\u9891\u9884\u89C8"
        }),
        visible: previewVisible,
        footer: null,
        onCancel: this.handleUploadCancel
      }, buildPlayer({
        url: videoUrl
      })), /*#__PURE__*/React.createElement(Modal, {
        title: /*#__PURE__*/React.createElement(IconInfo, {
          icon: iconCollection.swap,
          text: "\u8BF7\u8F93\u5165\u5C06\u66F4\u6362\u7684\u89C6\u9891\u5730\u5740"
        }),
        visible: changeUrlVisible,
        onOk: this.handleChangeUrlOk,
        onCancel: this.handleChangeUrlCancel
      }, /*#__PURE__*/React.createElement(TextArea, {
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
}(PureComponent);
VideoUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  video: '',
  showPreview: false,
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterChangeSuccess: function afterChangeSuccess() {}
};

export { VideoUpload as default };
