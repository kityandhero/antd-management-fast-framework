import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { PureComponent } from 'react';
import { h as stringIsNullOrWhiteSpace, l as copyToClipboard, G as getRandomColor, u as isNumber } from '../../tools.js';
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
var ColorText = /*#__PURE__*/function (_PureComponent) {
  _inherits(ColorText, _PureComponent);
  var _super = _createSuper(ColorText);
  function ColorText() {
    var _this;
    _classCallCheck(this, ColorText);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.copyText = function () {
      var _this$props = _this.props,
        canCopy = _this$props.canCopy,
        text = _this$props.text;
      if (canCopy && !stringIsNullOrWhiteSpace(text)) {
        copyToClipboard(text);
      }
    };
    return _this;
  }
  _createClass(ColorText, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props2 = this.props,
        textPrefix = _this$props2.textPrefix,
        textPrefixStyle = _this$props2.textPrefixStyle,
        randomSeed = _this$props2.randomSeed,
        seedOffset = _this$props2.seedOffset,
        randomColor = _this$props2.randomColor,
        color = _this$props2.color,
        text = _this$props2.text,
        canCopy = _this$props2.canCopy,
        separator = _this$props2.separator,
        separatorStyle = _this$props2.separatorStyle;
      var colorValue = color || '';
      var randomColorValue = randomColor || false;
      if (randomColorValue) {
        colorValue = getRandomColor({
          seed: randomSeed + (isNumber(seedOffset) ? Math.abs(seedOffset) : 0)
        });
      }
      var style = _objectSpread(_objectSpread({}, {
        color: 'rgba(0, 0, 0, 0.85)'
      }), canCopy ? {
        cursor: 'pointer'
      } : {});
      var textStyle = _objectSpread({}, !stringIsNullOrWhiteSpace(colorValue) ? {
        color: colorValue
      } : {});
      return /*#__PURE__*/React.createElement("span", {
        style: style,
        onClick: function onClick() {
          _this2.copyText();
        }
      }, stringIsNullOrWhiteSpace(textPrefix) ? '' : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: textPrefixStyle || null
      }, textPrefix), stringIsNullOrWhiteSpace(separator) ? null : /*#__PURE__*/React.createElement("span", {
        style: separatorStyle || null
      }, separator)), /*#__PURE__*/React.createElement("span", {
        style: textStyle
      }, text));
    }
  }]);
  return ColorText;
}(PureComponent);
ColorText.defaultProps = {
  canCopy: false,
  randomSeed: 0,
  seedOffset: 0,
  randomColor: false,
  color: '',
  textPrefix: null,
  textPrefixStyle: null,
  text: '',
  separator: '：',
  separatorStyle: null
};

export { ColorText as default };
