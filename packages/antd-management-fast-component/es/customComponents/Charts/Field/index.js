import { _ as _extends } from '../../../extends.js';
import { _ as _objectWithoutProperties } from '../../../objectWithoutProperties.js';
import '../../../_commonjsHelpers.js';

var styles = undefined;

var _excluded = ["label", "value"];
var Field = function Field(_ref) {
  var label = _ref.label,
    value = _ref.value,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: styles.field
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: styles.label
  }, label), /*#__PURE__*/React.createElement("span", {
    className: styles.number
  }, value));
};

export { Field as default };
