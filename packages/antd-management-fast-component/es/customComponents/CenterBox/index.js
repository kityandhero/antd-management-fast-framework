import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import VerticalBox from '../VerticalBox/index.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../objectSpread2.js';
import '../../defineProperty.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CenterBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(CenterBox, _PureComponent);
  var _super = _createSuper(CenterBox);
  function CenterBox() {
    _classCallCheck(this, CenterBox);
    return _super.apply(this, arguments);
  }
  _createClass(CenterBox, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return /*#__PURE__*/React.createElement(VerticalBox, {
        style: {
          height: '100%',
          width: '100%'
        },
        align: "center",
        alignJustify: "center"
      }, children);
    }
  }]);
  return CenterBox;
}(PureComponent);

export { CenterBox as default };
