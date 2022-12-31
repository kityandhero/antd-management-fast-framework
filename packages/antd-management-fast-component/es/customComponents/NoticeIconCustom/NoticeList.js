import { _ as _defineProperty } from '../../defineProperty.js';
import { List, Avatar } from 'antd';
import classNames from 'classnames';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

function NoticeList(_ref) {
  var _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _onClick = _ref.onClick,
    onClear = _ref.onClear,
    title = _ref.title,
    locale = _ref.locale,
    emptyText = _ref.emptyText,
    emptyImage = _ref.emptyImage,
    _ref$showClear = _ref.showClear,
    showClear = _ref$showClear === void 0 ? true : _ref$showClear;
  if (data.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.notFound
    }, emptyImage ? /*#__PURE__*/React.createElement("img", {
      src: emptyImage,
      alt: "not found"
    }) : null, /*#__PURE__*/React.createElement("div", null, emptyText || locale.emptyText));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(List, {
    className: styles.list
  }, data.map(function (item, i) {
    var itemCls = classNames(styles.item, _defineProperty({}, styles.read, item.read));
    // eslint-disable-next-line no-nested-ternary
    var leftIcon = item.avatar ? typeof item.avatar === 'string' ? /*#__PURE__*/React.createElement(Avatar, {
      className: styles.avatar,
      src: item.avatar
    }) : item.avatar : null;
    return /*#__PURE__*/React.createElement(List.Item, {
      className: itemCls,
      key: item.key || i,
      onClick: function onClick() {
        return _onClick(item);
      }
    }, /*#__PURE__*/React.createElement(List.Item.Meta, {
      className: styles.meta,
      avatar: /*#__PURE__*/React.createElement("span", {
        className: styles.iconElement
      }, leftIcon),
      title: /*#__PURE__*/React.createElement("div", {
        className: styles.title
      }, item.title, /*#__PURE__*/React.createElement("div", {
        className: styles.extra
      }, item.extra)),
      description: /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: styles.description,
        title: item.description
      }, item.description), /*#__PURE__*/React.createElement("div", {
        className: styles.datetime
      }, item.datetime))
    }));
  })), showClear ? /*#__PURE__*/React.createElement("div", {
    className: styles.clear,
    onClick: onClear
  }, locale.clear, " ", title) : null);
}

export { NoticeList as default };
