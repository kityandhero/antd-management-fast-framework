import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import TweenOne from 'rc-tween-one';
import { PureComponent } from 'react';
import { a as isFunction } from '../../../tools.js';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';
import '../../../constants.js';
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
import '../../../core.js';
import 'path-to-regexp';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var RotateBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(RotateBox, _PureComponent);
  var _super = _createSuper(RotateBox);
  function RotateBox() {
    _classCallCheck(this, RotateBox);
    return _super.apply(this, arguments);
  }
  _createClass(RotateBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        rotateCustom = _this$props.rotate,
        durationCustom = _this$props.duration,
        _onClick = _this$props.onClick,
        children = _this$props.children;
      return /*#__PURE__*/React.createElement("div", {
        onClick: function onClick() {
          if (isFunction(_onClick)) {
            _onClick();
          }
        }
      }, /*#__PURE__*/React.createElement(TweenOne, {
        animation: {
          rotate: rotateCustom,
          duration: durationCustom
        }
      }, children));
    }
  }]);
  return RotateBox;
}(PureComponent);
RotateBox.defaultProps = {
  rotate: 0,
  duration: 1000,
  onClick: null
};

export { RotateBox as default };
