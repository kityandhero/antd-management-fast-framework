import { _ as _extends } from '../../extends.js';
import { _ as _defineProperty } from '../../defineProperty.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import classNames from 'classnames';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["title", "children", "last", "block", "grid"];
var StandardFormRow = function StandardFormRow(_ref) {
  var _classNames;
  var title = _ref.title,
    children = _ref.children,
    last = _ref.last,
    block = _ref.block,
    grid = _ref.grid,
    rest = _objectWithoutProperties(_ref, _excluded);
  var cls = classNames(styles.standardFormRow, (_classNames = {}, _defineProperty(_classNames, styles.standardFormRowBlock, block), _defineProperty(_classNames, styles.standardFormRowLast, last), _defineProperty(_classNames, styles.standardFormRowGrid, grid), _classNames));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, /*#__PURE__*/React.createElement("span", null, title)), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, children));
};

export { StandardFormRow as default };
