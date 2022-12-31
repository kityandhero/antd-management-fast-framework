import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Modal, message, Upload, Tooltip, Space } from 'antd';
import { PureComponent } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { j as iconCollection } from '../../constants.js';
import { d as defaultSettingsLayoutCustom } from '../../defaultSettingsSpecial.js';
import { h as stringIsNullOrWhiteSpace, v as toNumber, K as showWarningMessage, k as showRuntimeError, a as isFunction, A as buildFieldHelper } from '../../tools.js';
import CenterBox from '../CenterBox/index.js';
import FlexBox from '../FlexBox/index.js';
import IconInfo from '../IconInfo/index.js';
import ImageBox from '../ImageBox/index.js';
import VerticalBox from '../VerticalBox/index.js';
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
import '../Ellipsis/index.js';
import '../../extends.js';
import '../../objectWithoutProperties.js';
import 'classnames';
import '../CustomBase/index.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var confirm = Modal.confirm;
var defaultCapacity = 8;
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
      if (stringIsNullOrWhiteSpace(image)) {
        message.info('无图片可以预览');
        return;
      }
      _this.setState({
        previewImage: image,
        previewVisible: true
      });
    };
    _this.beforeUpload = function (file, fileList) {
      var fileListCapacity = _this.props.fileListCapacity;
      var capacity = toNumber(fileListCapacity);
      var listCapacity = capacity <= 0 ? defaultCapacity : capacity;
      if ((fileList || []).length > listCapacity) {
        var text = "\u4E0A\u4F20\u4E0D\u80FD\u8D85\u8FC7".concat(listCapacity);
        showWarningMessage({
          message: text
        });
      }
      var isPic = file.type === 'image/jpeg' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/png';
      if (!isPic) {
        var _text = '请上传图片文件!';
        showRuntimeError({
          message: _text
        });
      }
      var isLt2M = file.size / 1024 / 1024 < defaultSettingsLayoutCustom.getImageUploadMaxSize();
      if (!isLt2M) {
        var _text2 = '图片文件不能超过2MB!';
        showRuntimeError({
          message: _text2
        });
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
        if (isFunction(pretreatmentRemoteResponse)) {
          var data = pretreatmentRemoteResponse(response) || {
            image: ''
          };
          var image = data.image;
          _this.setState({
            uploading: false
          });
          if (isFunction(afterUploadSuccess)) {
            afterUploadSuccess(image || '');
          } else {
            var text = 'afterUploadSuccess 配置无效';
            showRuntimeError({
              message: text
            });
          }
        } else {
          var _text3 = 'pretreatmentRemoteResponse 配置无效';
          showRuntimeError({
            message: _text3
          });
        }
      }
    };
    _this.clearImage = function () {
      var image = _this.props.image;
      if (stringIsNullOrWhiteSpace(image)) {
        message.info('当前没有可供移除的图片');
        return;
      }
      var afterUploadSuccess = _this.props.afterUploadSuccess;
      if (isFunction(afterUploadSuccess)) {
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
        var text = 'afterUploadSuccess 配置无效';
        showRuntimeError({
          message: text
        });
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
        fileListCapacity = _this$props2.fileListCapacity,
        showUploadList = _this$props2.showUploadList,
        image = _this$props2.image,
        singleModeSource = _this$props2.singleMode,
        tokenSet = _this$props2.tokenSet,
        onItemChange = _this$props2.onItemChange,
        onItemRemove = _this$props2.onItemRemove,
        multiple = _this$props2.multiple,
        title = _this$props2.title,
        icon = _this$props2.icon,
        helper = _this$props2.helper;
      var _this$state = this.state,
        uploading = _this$state.uploading,
        previewVisible = _this$state.previewVisible,
        previewImage = _this$state.previewImage;
      var uploadButton = /*#__PURE__*/React.createElement("div", null, iconCollection.plus, /*#__PURE__*/React.createElement("div", {
        className: "ant-upload-text"
      }, "\u4E0A\u4F20\u65B0\u56FE"));
      var capacity = toNumber(fileListCapacity);
      var listCapacity = capacity <= 0 ? defaultCapacity : capacity;
      var uploadProps = {
        disabled: disabled,
        multiple: multiple,
        action: action,
        listType: listType,
        showUploadList: showUploadList,
        onPreview: this.handleFilePreview,
        beforeUpload: this.beforeUpload,
        onChange: !(showUploadList || false) ? this.handleUploadChange : isFunction(onItemChange) ? onItemChange : null,
        onRemove: isFunction(onItemRemove) ? onItemRemove : null,
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
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: styles.containor
      }, /*#__PURE__*/React.createElement("div", {
        className: "clearfix"
      }, !(showUploadList || false) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: styles.imageBox,
        style: {
          minWidth: '140px',
          width: width
        }
      }, /*#__PURE__*/React.createElement(Upload, uploadProps, /*#__PURE__*/React.createElement(Tooltip, {
        title: "\u4E0A\u4F20\u56FE\u7247"
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.imageAction
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.icon
      }, /*#__PURE__*/React.createElement(CenterBox, null, uploading ? iconCollection.loading : iconCollection.upload)), /*#__PURE__*/React.createElement("div", {
        className: styles.text
      }, uploading ? '上传中' : '上传'))), /*#__PURE__*/React.createElement(VerticalBox, {
        align: "bottom",
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: width,
          padding: '1px'
        }
      }, /*#__PURE__*/React.createElement(ImageBox, {
        src: image || emptyImage,
        loadingEffect: true,
        errorOverlayVisible: true,
        showErrorIcon: false,
        fillHeight: false,
        alt: ""
      })))), /*#__PURE__*/React.createElement("div", {
        className: styles.toolBar
      }, /*#__PURE__*/React.createElement(FlexBox, {
        flexAuto: "left",
        left: /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon,
          text: stringIsNullOrWhiteSpace(title) ? '' : title
        }),
        right: /*#__PURE__*/React.createElement(Space, null, /*#__PURE__*/React.createElement(Tooltip, {
          title: "\u9884\u89C8\u56FE\u7247"
        }, /*#__PURE__*/React.createElement(EyeOutlined, {
          onClick: function onClick() {
            _this2.handleImagePreview();
          }
        })), /*#__PURE__*/React.createElement(Tooltip, {
          title: "\u6E05\u9664\u56FE\u7247"
        }, /*#__PURE__*/React.createElement(DeleteOutlined, {
          onClick: function onClick() {
            _this2.clearImage();
          }
        })))
      })))) : /*#__PURE__*/React.createElement(Upload, uploadProps, (fileList || []).length >= listCapacity ? null : uploadButton), /*#__PURE__*/React.createElement(Modal, {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleUploadCancel,
        bodyStyle: {
          boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset'
        }
      }, /*#__PURE__*/React.createElement(VerticalBox, {
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement(ImageBox, {
        src: previewImage,
        loadingEffect: true,
        errorOverlayVisible: true,
        showErrorIcon: false,
        fillHeight: false,
        alt: ""
      })))))), stringIsNullOrWhiteSpace(helper) ? null : /*#__PURE__*/React.createElement("div", {
        className: styles.helper
      }, buildFieldHelper(helper)));
    }
  }]);
  return ImageUpload;
}(PureComponent);
ImageUpload.defaultProps = {
  action: '',
  listType: 'picture-card',
  showUploadList: false,
  disabled: false,
  multiple: false,
  tokenSet: {},
  image: '',
  fileList: [],
  singleMode: {
    width: '240px',
    emptyImage: ''
  },
  icon: null,
  title: '',
  helper: '',
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterUploadSuccess: function afterUploadSuccess() {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemChange: function onItemChange(_ref) {
    _ref.file;
      _ref.fileList;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onItemRemove: function onItemRemove(file) {},
  fileListCapacity: defaultCapacity
};

export { ImageUpload as default };
