import { _ as _extends } from '../../extends.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import classNames from 'classnames';
import { ClockCircleFilled, CheckCircleFilled } from '@ant-design/icons';
import '../../_commonjsHelpers.js';

var styles = undefined;

var _excluded = ["className", "type", "title", "description", "extra", "actions"];
function Result(_ref) {
  var className = _ref.className,
    type = _ref.type,
    title = _ref.title,
    description = _ref.description,
    extra = _ref.extra,
    actions = _ref.actions,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var iconMap = {
    error: /*#__PURE__*/React.createElement(ClockCircleFilled, {
      className: styles.error
    }),
    success: /*#__PURE__*/React.createElement(CheckCircleFilled, {
      className: styles.success
    })
  };
  var clsString = classNames(styles.result, className);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsString
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: styles.icon
  }, iconMap[type]), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: styles.description
  }, description), extra && /*#__PURE__*/React.createElement("div", {
    className: styles.extra
  }, extra), actions && /*#__PURE__*/React.createElement("div", {
    className: styles.actions
  }, actions));
}

export { Result as default };
