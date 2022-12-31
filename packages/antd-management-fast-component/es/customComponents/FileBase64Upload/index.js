import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Input, Upload, Button } from 'antd';
import { PureComponent } from 'react';
import { j as iconCollection } from '../../constants.js';
import '@ant-design/icons';
import { d as defaultSettingsLayoutCustom } from '../../defaultSettingsSpecial.js';
import { k as showRuntimeError, a as isFunction } from '../../tools.js';
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
      var isLt1M = file.size / 1024 / 1024 < defaultSettingsLayoutCustom.getFileUploadMaxSize();
      if (!isLt1M) {
        var text = "\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7".concat(defaultSettingsLayoutCustom.getFileUploadMaxSize(), "MB!");
        showRuntimeError({
          message: text
        });
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
        if (isFunction(pretreatmentRemoteResponse)) {
          var data = pretreatmentRemoteResponse(response) || {
            fileBase64: ''
          };
          var fileBase64 = data.fileBase64;
          _this.setState({
            uploading: false
          });
          if (isFunction(afterUploadSuccess)) {
            afterUploadSuccess(fileBase64 || '');
          } else {
            var text = 'afterUploadSuccess 配置无效';
            showRuntimeError({
              message: text
            });
          }
        } else {
          var _text = 'pretreatmentRemoteResponse 配置无效';
          showRuntimeError({
            message: _text
          });
        }
      }
    };
    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      uploading: false,
      base64: ''
    });
    return _this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      return /*#__PURE__*/React.createElement(Input, {
        readOnly: true,
        addonBefore: iconCollection.file,
        placeholder: "\u8BF7\u9009\u62E9\u4E0A\u4F20".concat(uploadText || '文件'),
        value: base64,
        addonAfter: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Upload, uploadProps, /*#__PURE__*/React.createElement(Button, {
          style: {
            border: '0px solid #d9d9d9',
            backgroundColor: '#fafafa',
            height: '30px',
            paddingLeft: 0,
            paddingRight: 0
          },
          disabled: uploading,
          title: "\u9009\u62E9".concat(uploadText || '文件')
        }, uploading ? iconCollection.loading : iconCollection.upload, uploading ? '正在上传' : "\u9009\u62E9".concat(uploadText || '文件'))))
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
}(PureComponent);
FileBase64Upload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  fileBase64: '',
  uploadText: '文件',
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterUploadSuccess: function afterUploadSuccess() {}
};

export { FileBase64Upload as default };
