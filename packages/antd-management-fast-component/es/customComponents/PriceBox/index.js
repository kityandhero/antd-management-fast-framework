import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import { L as isMoney, E as formatMoney } from '../../tools.js';
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
var PriceBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(PriceBox, _PureComponent);
  var _super = _createSuper(PriceBox);
  function PriceBox() {
    _classCallCheck(this, PriceBox);
    return _super.apply(this, arguments);
  }
  _createClass(PriceBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        price = _this$props.price,
        generalStyle = _this$props.generalStyle,
        prefix = _this$props.prefix,
        prefixStyle = _this$props.prefixStyle,
        integerPartStyle = _this$props.integerPartStyle,
        pointStyle = _this$props.pointStyle,
        decimalPartStyle = _this$props.decimalPartStyle;
      var commonStyle = _objectSpread(_objectSpread({}, generalStyle || {}), {
        verticalAlign: 'bottom'
      });
      if (!isMoney(price)) {
        return '';
      }
      var money = formatMoney(price || 0, 2, '');
      var list = money.split('.');
      var integer = list[0];
      var decimal = list[1];
      return /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'inline'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'flex-end',
          lineHeight: 1
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, commonStyle), prefixStyle || {})
      }, prefix), /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, commonStyle), integerPartStyle || {})
      }, integer), /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, commonStyle), pointStyle || {})
      }, "."), /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, commonStyle), decimalPartStyle || {})
      }, decimal)));
    }
  }]);
  return PriceBox;
}(PureComponent);
PriceBox.defaultProps = {
  price: 0,
  prefix: '',
  generalStyle: {},
  prefixStyle: {},
  integerPartStyle: {},
  pointStyle: {},
  decimalPartStyle: {}
};

export { PriceBox as default };
