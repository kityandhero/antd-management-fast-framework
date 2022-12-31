import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import { h as stringIsNullOrWhiteSpace } from '../../tools.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
import '../../constants.js';
import '@ant-design/icons';
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
var EverySpace = /*#__PURE__*/function (_PureComponent) {
  _inherits(EverySpace, _PureComponent);
  var _super = _createSuper(EverySpace);
  function EverySpace() {
    _classCallCheck(this, EverySpace);
    return _super.apply(this, arguments);
  }
  _createClass(EverySpace, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        size = _this$props.size,
        direction = _this$props.direction,
        backgroundColor = _this$props.backgroundColor,
        margin = _this$props.margin,
        borderRadius = _this$props.borderRadius;
      if (size <= 0) {
        return null;
      }
      if (direction !== 'vertical' && direction !== 'horizontal') {
        return null;
      }
      var customStyle = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, {}), stringIsNullOrWhiteSpace(backgroundColor || '') ? {} : {
        backgroundColor: backgroundColor
      }), stringIsNullOrWhiteSpace(margin || '') ? {} : {
        margin: margin
      }), stringIsNullOrWhiteSpace(borderRadius || '') ? {} : {
        borderRadius: borderRadius
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, direction === 'horizontal' ? /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, {
          height: "".concat(size, "px")
        }), customStyle)
      }) : null, direction === 'vertical' ? /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, {
          height: "100%",
          width: "".concat(size, "px")
        }), customStyle)
      }) : null);
    }
  }]);
  return EverySpace;
}(PureComponent);
EverySpace.defaultProps = {
  size: 10,
  direction: 'vertical',
  backgroundColor: '',
  margin: '',
  borderRadius: ''
};

export { EverySpace as default };
