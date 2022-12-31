import { _ as _extends } from '../../extends.js';
import { _ as _defineProperty } from '../../defineProperty.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import classNames from 'classnames';
import { j as iconCollection } from '../../constants.js';
import '@ant-design/icons';
import 'react';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["theme", "title", "subTitle", "total", "subTotal", "status", "suffix", "gap"];
var NumberInfo = function NumberInfo(_ref) {
  var theme = _ref.theme,
    title = _ref.title,
    subTitle = _ref.subTitle,
    total = _ref.total,
    subTotal = _ref.subTotal,
    status = _ref.status,
    suffix = _ref.suffix,
    gap = _ref.gap,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames(styles.numberInfo, _defineProperty({}, styles["numberInfo".concat(theme)], theme))
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    className: styles.numberInfoTitle,
    title: typeof title === 'string' ? title : ''
  }, title), subTitle && /*#__PURE__*/React.createElement("div", {
    className: styles.numberInfoSubTitle,
    title: typeof subTitle === 'string' ? subTitle : ''
  }, subTitle), /*#__PURE__*/React.createElement("div", {
    className: styles.numberInfoValue,
    style: gap ? {
      marginTop: gap
    } : null
  }, /*#__PURE__*/React.createElement("span", null, total, suffix && /*#__PURE__*/React.createElement("em", {
    className: styles.suffix
  }, suffix)), (status || subTotal) && /*#__PURE__*/React.createElement("span", {
    className: styles.subTotal
  }, subTotal, status === 'up' && iconCollection.caretUp, status === 'down' && iconCollection.caretDown)));
};

export { NumberInfo as default };
