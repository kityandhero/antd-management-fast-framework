import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Row, Col, Tooltip } from 'antd';
import { PureComponent } from 'react';
import { h as stringIsNullOrWhiteSpace, l as copyToClipboard, v as toNumber, a as isFunction, i as isObject, F as isString } from '../../tools.js';
import Ellipsis from '../Ellipsis/index.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
import '../../constants.js';
import '@ant-design/icons';
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
import '../../extends.js';
import '../../objectWithoutProperties.js';
import 'classnames';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var defaultValue = {
  direction: 'horizontal',
  responsive: false,
  tooltip: false,
  tooltipColor: null,
  ellipsis: true,
  icon: null,
  iconPosition: 'left',
  iconTooltip: '',
  canCopy: false,
  copyData: null,
  textPrefix: '',
  textPrefixStyle: null,
  text: '',
  textStyle: null,
  textFormat: null,
  separator: ': ',
  separatorStyle: null,
  style: null,
  ellipsisMaxWidth: 0
};
var IconInfo = /*#__PURE__*/function (_PureComponent) {
  _inherits(IconInfo, _PureComponent);
  var _super = _createSuper(IconInfo);
  function IconInfo() {
    var _this;
    _classCallCheck(this, IconInfo);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.copyDataToClipboard = function () {
      var _this$props = _this.props,
        canCopy = _this$props.canCopy,
        text = _this$props.text,
        copyData = _this$props.copyData;
      if (canCopy && !stringIsNullOrWhiteSpace(copyData || text)) {
        copyToClipboard(copyData || text);
      }
    };
    return _this;
  }
  _createClass(IconInfo, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _defaultValue = _objectSpread(_objectSpread({}, defaultValue), this.props || {}),
        directionValue = _defaultValue.direction,
        responsiveValue = _defaultValue.responsive,
        tooltipValue = _defaultValue.tooltip,
        tooltipColor = _defaultValue.tooltipColor,
        ellipsisValue = _defaultValue.ellipsis,
        textPrefix = _defaultValue.textPrefix,
        textPrefixStyle = _defaultValue.textPrefixStyle,
        text = _defaultValue.text,
        textStyle = _defaultValue.textStyle,
        textFormat = _defaultValue.textFormat,
        separator = _defaultValue.separator,
        separatorStyle = _defaultValue.separatorStyle,
        icon = _defaultValue.icon,
        iconPosition = _defaultValue.iconPosition,
        iconTooltip = _defaultValue.iconTooltip,
        onClick = _defaultValue.onClick,
        canCopy = _defaultValue.canCopy,
        styleSource = _defaultValue.style,
        ellipsisMaxWidthSource = _defaultValue.ellipsisMaxWidth;
      var responsive = responsiveValue || false;
      var tooltip = tooltipValue || false;
      var ellipsis = ellipsisValue || false;
      var iconItem = (icon || null) == null ? null : /*#__PURE__*/React.createElement("span", {
        className: styles.iconBox
      }, icon);
      var direction = directionValue || 'horizontal';
      if (direction !== 'horizontal' && direction !== 'vertical') {
        direction = 'horizontal';
      }
      var ellipsisMaxWidth = toNumber(ellipsisMaxWidthSource);
      ellipsisMaxWidth = ellipsisMaxWidth <= 0 ? 0 : ellipsisMaxWidth;
      var styleMerge = _objectSpread(_objectSpread({}, styleSource || {}), canCopy || isFunction(onClick) ? {
        cursor: 'pointer'
      } : {});
      var textMerge = null;
      var tooltipTitle = null;
      var textAfterFormat = isFunction(textFormat || null) ? textFormat(text) : text;
      var textAfterFormatForShow = !isObject(textStyle) ? textAfterFormat || '' : /*#__PURE__*/React.createElement("span", {
        style: textStyle
      }, textAfterFormat || '');
      var textAfterFormatForTooltip = !isObject(textStyle) ? text || '' : /*#__PURE__*/React.createElement("span", {
        style: textStyle
      }, text || '');
      if (stringIsNullOrWhiteSpace(textPrefix)) {
        textMerge = textAfterFormatForShow;
        tooltipTitle = textAfterFormatForTooltip;
      } else {
        var textPrefixAdjust = !isObject(textPrefixStyle) ? textPrefix || '' : /*#__PURE__*/React.createElement("span", {
          style: textPrefixStyle
        }, textPrefix || '');
        var separatorAdjust = stringIsNullOrWhiteSpace(separator) ? '' : !isObject(separatorStyle) ? separator || '：' : /*#__PURE__*/React.createElement("span", {
          style: separatorStyle
        }, separator || '：');
        if (isString(textPrefixAdjust) && isString(separatorAdjust) && isString(textAfterFormatForShow)) {
          textMerge = "".concat(textPrefixAdjust).concat(separatorAdjust).concat(textAfterFormatForShow);
          tooltipTitle = "".concat(textPrefixAdjust).concat(separatorAdjust).concat(textAfterFormatForTooltip);
        } else {
          textMerge = /*#__PURE__*/React.createElement(React.Fragment, null, textPrefixAdjust, separatorAdjust, textAfterFormatForShow);
          tooltipTitle = /*#__PURE__*/React.createElement(React.Fragment, null, textPrefixAdjust, separatorAdjust, textAfterFormatForTooltip);
        }
      }
      if (direction === 'horizontal') {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: styles.containor,
          onClick: onClick
        }, responsive ? (iconItem || null) == null ? /*#__PURE__*/React.createElement(Row, {
          gutter: 8
        }, /*#__PURE__*/React.createElement(Col, {
          style: styleMerge,
          onClick: function onClick() {
            _this2.copyDataToClipboard();
          }
        }, ellipsis ? ellipsisMaxWidth > 0 ? /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'inline-flex',
            maxWidth: "".concat(ellipsisMaxWidth, "px")
          }
        }, /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge)) : /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge) : textMerge)) : /*#__PURE__*/React.createElement(Row, {
          gutter: 8
        }, iconPosition === 'left' ? /*#__PURE__*/React.createElement(Col, {
          xl: 4,
          lg: 6,
          md: 8,
          sm: 24,
          xs: 24
        }, stringIsNullOrWhiteSpace(iconTooltip) ? iconItem : /*#__PURE__*/React.createElement(Tooltip, {
          title: iconTooltip
        }, iconItem)) : null, /*#__PURE__*/React.createElement(Col, {
          xl: 20,
          lg: 18,
          md: 16,
          sm: 24,
          xs: 24,
          style: styleMerge,
          onClick: function onClick() {
            _this2.copyDataToClipboard();
          }
        }, ellipsis ? ellipsisMaxWidth > 0 ? /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'inline-flex',
            maxWidth: "".concat(ellipsisMaxWidth, "px")
          }
        }, /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge)) : /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge) : textMerge), iconPosition !== 'left' ? /*#__PURE__*/React.createElement(Col, {
          xl: 4,
          lg: 6,
          md: 8,
          sm: 24,
          xs: 24
        }, stringIsNullOrWhiteSpace(iconTooltip) ? iconItem : /*#__PURE__*/React.createElement(Tooltip, {
          title: iconTooltip
        }, iconItem)) : null) : (iconItem || null) == null ? /*#__PURE__*/React.createElement(Row, {
          gutter: 8
        }, /*#__PURE__*/React.createElement(Col, {
          style: styleMerge,
          onClick: function onClick() {
            _this2.copyDataToClipboard();
          }
        }, ellipsis ? ellipsisMaxWidth > 0 ? /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'inline-flex',
            maxWidth: "".concat(ellipsisMaxWidth, "px")
          }
        }, /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge)) : /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge) : textMerge)) : /*#__PURE__*/React.createElement(Row, {
          gutter: 8,
          wrap: false
        }, stringIsNullOrWhiteSpace(textMerge) ? /*#__PURE__*/React.createElement(Col, null, stringIsNullOrWhiteSpace(iconTooltip) ? iconItem : /*#__PURE__*/React.createElement(Tooltip, {
          title: iconTooltip
        }, iconItem)) : null, !stringIsNullOrWhiteSpace(textMerge) && iconPosition === 'left' ? /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }, stringIsNullOrWhiteSpace(iconTooltip) ? iconItem : /*#__PURE__*/React.createElement(Tooltip, {
          title: iconTooltip
        }, iconItem)) : null, !stringIsNullOrWhiteSpace(textMerge) ? /*#__PURE__*/React.createElement(Col, {
          style: styleMerge,
          onClick: function onClick() {
            _this2.copyDataToClipboard();
          }
        }, ellipsis ? ellipsisMaxWidth > 0 ? /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'inline-flex',
            maxWidth: "".concat(ellipsisMaxWidth, "px")
          }
        }, /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge)) : /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge) : textMerge) : null, !stringIsNullOrWhiteSpace(textMerge) && iconPosition !== 'left' ? /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }, stringIsNullOrWhiteSpace(iconTooltip) ? iconItem : /*#__PURE__*/React.createElement(Tooltip, {
          title: iconTooltip
        }, iconItem)) : null)));
      }
      if (direction === 'vertical') {
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: styles.containor,
          onClick: onClick
        }, /*#__PURE__*/React.createElement(Row, {
          justify: "center"
        }, (iconItem || null) == null ? null : /*#__PURE__*/React.createElement(Col, {
          span: 24
        }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }), /*#__PURE__*/React.createElement(Col, {
          style: styleMerge,
          onClick: function onClick() {
            _this2.copyDataToClipboard();
          }
        }, stringIsNullOrWhiteSpace(iconTooltip) ? iconItem : /*#__PURE__*/React.createElement(Tooltip, {
          title: iconTooltip
        }, iconItem)), /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }))), /*#__PURE__*/React.createElement(Col, {
          span: 24
        }, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }), /*#__PURE__*/React.createElement(Col, {
          style: styleMerge,
          onClick: function onClick() {
            _this2.copyDataToClipboard();
          }
        }, ellipsis ? ellipsisMaxWidth > 0 ? /*#__PURE__*/React.createElement("div", {
          style: {
            display: 'inline-flex',
            maxWidth: "".concat(ellipsisMaxWidth, "px")
          }
        }, /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge)) : /*#__PURE__*/React.createElement(Ellipsis, {
          tooltip: tooltip,
          lines: 1,
          title: tooltipTitle,
          color: tooltipColor
        }, textMerge) : textMerge), /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }))))));
      }
      return null;
    }
  }]);
  return IconInfo;
}(PureComponent);
IconInfo.defaultProps = defaultValue;

export { IconInfo as default };
