import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Input, Menu, Space, Divider, Tooltip, Upload, Button, Dropdown, Modal } from 'antd';
import { PureComponent } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { j as iconCollection } from '../../constants.js';
import { d as defaultSettingsLayoutCustom } from '../../defaultSettingsSpecial.js';
import { a as isFunction, k as showRuntimeError, j as showErrorMessage, h as stringIsNullOrWhiteSpace, l as copyToClipboard } from '../../tools.js';
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
import '../Ellipsis/index.js';
import '../../extends.js';
import '../../objectWithoutProperties.js';
import 'classnames';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var TextArea = Input.TextArea;
var FileUpload = /*#__PURE__*/function (_PureComponent) {
  _inherits(FileUpload, _PureComponent);
  var _super = _createSuper(FileUpload);
  function FileUpload(props) {
    var _this;
    _classCallCheck(this, FileUpload);
    _this = _super.call(this, props);
    _this.showChangeUrlModal = function () {
      var fileUrl = _this.state.fileUrl;
      _this.setState({
        fileUrlTemp: fileUrl,
        changeUrlVisible: true
      });
    };
    _this.handleUrlChange = function (e) {
      var v = e.target.value;
      _this.setState({
        fileUrlTemp: v
      });
    };
    _this.handleChangeUrlOk = function () {
      var afterChangeSuccess = _this.props.afterChangeSuccess;
      var fileUrlTemp = _this.state.fileUrlTemp;
      _this.setState({
        fileUrl: fileUrlTemp,
        changeUrlVisible: false
      }, function () {
        if (isFunction(afterChangeSuccess)) {
          afterChangeSuccess(fileUrlTemp || '');
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
        fileUrl: '',
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
      var isLt3M = file.size / 1024 / 1024 < defaultSettingsLayoutCustom.getFileUploadMaxSize();
      if (!isLt3M) {
        var text = "\u6587\u4EF6\u4E0D\u80FD\u8D85\u8FC7".concat(defaultSettingsLayoutCustom.getFileUploadMaxSize(), "MB!");
        showErrorMessage({
          message: text
        });
      }
      return isLt3M;
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
            file: ''
          };
          var file = data.file;
          _this.setState({
            fileUrl: file,
            uploading: false
          }, function () {
            if (isFunction(afterChangeSuccess)) {
              afterChangeSuccess(file || '');
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
      var fileUrl = _this.state.fileUrl;
      switch (key) {
        case 'changeUrl':
          _this.showChangeUrlModal();
          break;
        case 'copyUrl':
          if (stringIsNullOrWhiteSpace(fileUrl)) {
            var text = '当前未设置文件地址';
            showErrorMessage({
              message: text
            });
          } else {
            copyToClipboard(fileUrl);
          }
          break;
        case 'clearUrl':
          _this.clearUrl();
          break;
      }
    };
    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      fileSource: '',
      fileUrl: '',
      fileUrlTemp: '',
      uploading: false,
      changeUrlVisible: false
    });
    return _this;
  }
  _createClass(FileUpload, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        action = _this$props2.action,
        disabled = _this$props2.disabled,
        tokenSet = _this$props2.tokenSet;
      var _this$state = this.state,
        uploading = _this$state.uploading,
        changeUrlVisible = _this$state.changeUrlVisible,
        fileUrlTemp = _this$state.fileUrlTemp,
        fileUrl = _this$state.fileUrl;
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
        disabled: stringIsNullOrWhiteSpace(fileUrl)
      }, {
        key: 'clearUrl',
        label: '清空视频',
        icon: iconCollection["delete"],
        disabled: stringIsNullOrWhiteSpace(fileUrl)
      }];
      var menu = /*#__PURE__*/React.createElement(Menu, {
        items: items,
        onClick: this.handleMenuClick
      });
      var addonAfter = /*#__PURE__*/React.createElement(Space, {
        split: /*#__PURE__*/React.createElement(Divider, {
          type: "vertical"
        })
      }, /*#__PURE__*/React.createElement(Tooltip, {
        key: "showChangeUrlTip",
        placement: "top",
        title: "\u4E0A\u4F20\u6587\u4EF6"
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
        addonBefore: iconCollection.link,
        addonAfter: addonAfter,
        value: fileUrl,
        placeholder: "\u5F53\u524D\u672A\u8BBE\u7F6E\u6587\u4EF6\u5730\u5740"
      }), /*#__PURE__*/React.createElement(Modal, {
        title: /*#__PURE__*/React.createElement(IconInfo, {
          icon: iconCollection.swap,
          text: "\u8BF7\u8F93\u5165\u5C06\u66F4\u6362\u7684\u6587\u4EF6\u5730\u5740"
        }),
        visible: changeUrlVisible,
        onOk: this.handleChangeUrlOk,
        onCancel: this.handleChangeUrlCancel
      }, /*#__PURE__*/React.createElement(TextArea, {
        rows: 4,
        value: fileUrlTemp,
        onChange: this.handleUrlChange,
        placeholder: "\u76EE\u524D\u6CA1\u6709\u5C06\u8981\u66F4\u6362\u7684\u6587\u4EF6\u5730\u5740"
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var fileNext = nextProps.file;
      var filePrev = prevState.fileSource;
      if ((fileNext || '') !== (filePrev || '')) {
        return {
          fileSource: fileNext,
          fileUrl: fileNext
        };
      }
      return null;
    }
  }]);
  return FileUpload;
}(PureComponent);
FileUpload.defaultProps = {
  action: '',
  disabled: false,
  tokenSet: {},
  file: '',
  pretreatmentRemoteResponse: function pretreatmentRemoteResponse() {},
  afterChangeSuccess: function afterChangeSuccess() {}
};

export { FileUpload as default };
