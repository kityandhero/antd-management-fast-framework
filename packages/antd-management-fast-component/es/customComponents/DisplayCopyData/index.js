import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { l as copyToClipboard } from '../../tools.js';
import CustomBase from '../CustomBase/index.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../constants.js';
import '@ant-design/icons';
import 'react';
import 'antd';
import 'array-move';
import 'copy-to-clipboard';
import 'lodash';
import 'moment';
import 'numeral';
import 'nzh';
import 'qs';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';
import '../../core.js';
import 'path-to-regexp';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var DisplayCopyData = /*#__PURE__*/function (_CustomBase) {
  _inherits(DisplayCopyData, _CustomBase);
  var _super = _createSuper(DisplayCopyData);
  function DisplayCopyData() {
    _classCallCheck(this, DisplayCopyData);
    return _super.apply(this, arguments);
  }
  _createClass(DisplayCopyData, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        data = _this$props.data,
        copyMode = _this$props.copyMode;
      if (copyMode === 'click') {
        return /*#__PURE__*/React.createElement("span", {
          onClick: function onClick() {
            copyToClipboard(data);
          }
        }, data);
      }
      if (copyMode === 'button') {
        return /*#__PURE__*/React.createElement(React.Fragment, null, data, (data || null) === null ? null : /*#__PURE__*/React.createElement("a", {
          style: {
            marginLeft: '10px'
          },
          onClick: function onClick() {
            copyToClipboard(data);
          }
        }, "[\u590D\u5236]"));
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, data);
    }
  }]);
  return DisplayCopyData;
}(CustomBase);
DisplayCopyData.defaultProps = {
  label: '',
  data: null,
  copyMode: 'button'
};

export { DisplayCopyData as default };
