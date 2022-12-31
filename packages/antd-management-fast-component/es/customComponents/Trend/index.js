import { _ as _extends } from '../../extends.js';
import { _ as _defineProperty } from '../../defineProperty.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import classNames from 'classnames';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["colorful", "reverseColor", "flag", "icon", "children", "className"];
var Trend = function Trend(_ref) {
  var _classNames;
  var _ref$colorful = _ref.colorful,
    colorful = _ref$colorful === void 0 ? true : _ref$colorful,
    _ref$reverseColor = _ref.reverseColor,
    reverseColor = _ref$reverseColor === void 0 ? false : _ref$reverseColor,
    flag = _ref.flag,
    icon = _ref.icon,
    children = _ref.children,
    className = _ref.className,
    rest = _objectWithoutProperties(_ref, _excluded);
  var classString = classNames(styles.trendItem, (_classNames = {}, _defineProperty(_classNames, styles.trendItemGrey, !colorful), _defineProperty(_classNames, styles.reverseColor, reverseColor && colorful), _classNames), className);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    className: classString,
    title: typeof children === 'string' ? children : ''
  }), /*#__PURE__*/React.createElement("span", null, children), flag && /*#__PURE__*/React.createElement("span", {
    className: styles[flag]
  }, icon));
};

export { Trend as default };
