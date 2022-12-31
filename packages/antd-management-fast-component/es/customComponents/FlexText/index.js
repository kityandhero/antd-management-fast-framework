import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Space } from 'antd';
import { PureComponent } from 'react';
import FlexBox from '../FlexBox/index.js';
import IconInfo from '../IconInfo/index.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../objectSpread2.js';
import '../../defineProperty.js';
import '../../core.js';
import '../../constants.js';
import '@ant-design/icons';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import '../../tools.js';
import 'array-move';
import 'copy-to-clipboard';
import 'moment';
import 'numeral';
import 'nzh';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';
import '../Ellipsis/index.js';
import '../../extends.js';
import '../../objectWithoutProperties.js';
import 'classnames';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FlexText = /*#__PURE__*/function (_PureComponent) {
  _inherits(FlexText, _PureComponent);
  var _super = _createSuper(FlexText);
  function FlexText() {
    _classCallCheck(this, FlexText);
    return _super.apply(this, arguments);
  }
  _createClass(FlexText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        flexAutoSource = _this$props.flexAuto,
        icon = _this$props.icon,
        textPrefix = _this$props.textPrefix,
        text = _this$props.text,
        ellipsis = _this$props.ellipsis,
        textEllipsisMaxWidth = _this$props.textEllipsisMaxWidth,
        subText = _this$props.subText,
        subTextStyle = _this$props.subTextStyle,
        addonBefore = _this$props.addonBefore,
        addonAfter = _this$props.addonAfter,
        extra = _this$props.extra,
        style = _this$props.style;
      return /*#__PURE__*/React.createElement(FlexBox, {
        style: style,
        flexAuto: flexAutoSource,
        left: /*#__PURE__*/React.createElement(Space, null, (addonBefore || null) == null ? null : addonBefore, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon,
          textPrefix: textPrefix,
          text: text,
          ellipsis: ellipsis,
          ellipsisMaxWidth: textEllipsisMaxWidth
        }), (subText || null) == null ? null : /*#__PURE__*/React.createElement("span", {
          className: styles.subText,
          style: subTextStyle || {}
        }, subText), (addonAfter || null) == null ? null : addonAfter),
        right: extra
      });
    }
  }]);
  return FlexText;
}(PureComponent);
FlexText.defaultProps = {
  flexAuto: 'left',
  icon: null,
  textPrefix: null,
  text: '',
  ellipsis: true,
  textEllipsisMaxWidth: 0,
  subText: '',
  subTextStyle: null,
  extra: null,
  style: null
};

export { FlexText as default };
