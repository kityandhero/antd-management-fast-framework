import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import { L as isMoney, M as roundToTarget } from '../../tools.js';
import '../../_commonjsHelpers.js';
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
var PercentageBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(PercentageBox, _PureComponent);
  var _super = _createSuper(PercentageBox);
  function PercentageBox() {
    _classCallCheck(this, PercentageBox);
    return _super.apply(this, arguments);
  }
  _createClass(PercentageBox, [{
    key: "render",
    value: function render() {
      var value = this.props.value;
      var v = value;
      if (!isMoney(v)) {
        v = roundToTarget(v * 100, 1);
      }
      return /*#__PURE__*/React.createElement("span", null, v, "%");
    }
  }]);
  return PercentageBox;
}(PureComponent);
PercentageBox.defaultProps = {
  value: 0
};

export { PercentageBox as default };
