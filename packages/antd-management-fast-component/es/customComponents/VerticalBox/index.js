import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var VerticalBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(VerticalBox, _PureComponent);
  var _super = _createSuper(VerticalBox);
  function VerticalBox() {
    _classCallCheck(this, VerticalBox);
    return _super.apply(this, arguments);
  }
  _createClass(VerticalBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        style = _this$props.style,
        align = _this$props.align,
        alignJustify = _this$props.alignJustify,
        children = _this$props.children;
      var alignStyle = 'center';
      switch (align) {
        case 'top':
          alignStyle = 'flex-start';
          break;
        case 'center':
          alignStyle = 'center';
          break;
        case 'bottom':
          alignStyle = 'flex-end';
          break;
        default:
          alignStyle = 'center';
          break;
      }
      var alignJustifyStyle = 'flex-start';
      switch (alignJustify) {
        case 'start':
          alignJustifyStyle = 'flex-start';
          break;
        case 'center':
          alignJustifyStyle = 'center';
          break;
        case 'end':
          alignJustifyStyle = 'flex-end';
          break;
        case 'between':
          alignJustifyStyle = 'space-between';
          break;
        case 'around':
          alignJustifyStyle = 'space-around';
          break;
        default:
          alignJustifyStyle = 'flex-start';
          break;
      }
      var flexStyle = _objectSpread(_objectSpread({}, style || {}), {
        alignItems: alignStyle,
        justifyContent: alignJustifyStyle
      });
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: styles.centerBox,
        style: style
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.flexBox,
        style: flexStyle
      }, children)));
    }
  }]);
  return VerticalBox;
}(PureComponent);
VerticalBox.defaultProps = {
  fitWidth: true,
  style: {},
  align: 'center',
  alignJustify: 'flex-start'
};

export { VerticalBox as default };
