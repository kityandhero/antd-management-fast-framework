import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FromDisplayItem = /*#__PURE__*/function (_PureComponent) {
  _inherits(FromDisplayItem, _PureComponent);
  var _super = _createSuper(FromDisplayItem);
  function FromDisplayItem() {
    _classCallCheck(this, FromDisplayItem);
    return _super.apply(this, arguments);
  }
  _createClass(FromDisplayItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        name = _this$props.name,
        value = _this$props.value,
        empty = _this$props.empty;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.fieldBox
      }, name, ":", value || empty || '');
    }
  }]);
  return FromDisplayItem;
}(PureComponent);
FromDisplayItem.defaultProps = {
  name: '标题',
  value: null,
  empty: ''
};

export { FromDisplayItem as default };
