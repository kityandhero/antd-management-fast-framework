import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import Animate from 'rc-animate';
import { PureComponent } from 'react';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FadeBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(FadeBox, _PureComponent);
  var _super = _createSuper(FadeBox);
  function FadeBox() {
    _classCallCheck(this, FadeBox);
    return _super.apply(this, arguments);
  }
  _createClass(FadeBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        style = _this$props.style,
        bodyStyle = _this$props.bodyStyle,
        show = _this$props.show,
        children = _this$props.children;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.fadeBox,
        style: style || null
      }, /*#__PURE__*/React.createElement(Animate, {
        transitionName: "fade",
        transitionAppear: true
      }, show ? /*#__PURE__*/React.createElement("div", {
        style: bodyStyle || null
      }, children) : null));
    }
  }]);
  return FadeBox;
}(PureComponent);
FadeBox.defaultProps = {
  show: true,
  style: null,
  bodyStyle: null
};

export { FadeBox as default };
