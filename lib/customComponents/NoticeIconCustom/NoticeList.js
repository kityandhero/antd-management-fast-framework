"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NoticeList;

require("antd/es/list/style");

function _list() {
  var data = _interopRequireDefault(require("antd/es/list"));

  _list = function _list() {
    return data;
  };

  return data;
}

require("antd/es/avatar/style");

function _avatar() {
  var data = _interopRequireDefault(require("antd/es/avatar"));

  _avatar = function _avatar() {
    return data;
  };

  return data;
}

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _antd() {
  var data = require("antd");

  _antd = function _antd() {
    return data;
  };

  return data;
}

function _classnames() {
  var data = _interopRequireDefault(require("classnames"));

  _classnames = function _classnames() {
    return data;
  };

  return data;
}

var _NoticeList = _interopRequireDefault(require("./NoticeList.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    return /*#__PURE__*/_react()["default"].createElement("div", {
      className: _NoticeList["default"].notFound
    }, emptyImage ? /*#__PURE__*/_react()["default"].createElement("img", {
      src: emptyImage,
      alt: "not found"
    }) : null, /*#__PURE__*/_react()["default"].createElement("div", null, emptyText || locale.emptyText));
  }

  return /*#__PURE__*/_react()["default"].createElement("div", null, /*#__PURE__*/_react()["default"].createElement(_list()["default"], {
    className: _NoticeList["default"].list
  }, data.map(function (item, i) {
    var itemCls = (0, _classnames()["default"])(_NoticeList["default"].item, _defineProperty({}, _NoticeList["default"].read, item.read)); // eslint-disable-next-line no-nested-ternary

    var leftIcon = item.avatar ? typeof item.avatar === 'string' ? /*#__PURE__*/_react()["default"].createElement(_avatar()["default"], {
      className: _NoticeList["default"].avatar,
      src: item.avatar
    }) : item.avatar : null;
    return /*#__PURE__*/_react()["default"].createElement(_list()["default"].Item, {
      className: itemCls,
      key: item.key || i,
      onClick: function onClick() {
        return _onClick(item);
      }
    }, /*#__PURE__*/_react()["default"].createElement(_list()["default"].Item.Meta, {
      className: _NoticeList["default"].meta,
      avatar: /*#__PURE__*/_react()["default"].createElement("span", {
        className: _NoticeList["default"].iconElement
      }, leftIcon),
      title: /*#__PURE__*/_react()["default"].createElement("div", {
        className: _NoticeList["default"].title
      }, item.title, /*#__PURE__*/_react()["default"].createElement("div", {
        className: _NoticeList["default"].extra
      }, item.extra)),
      description: /*#__PURE__*/_react()["default"].createElement("div", null, /*#__PURE__*/_react()["default"].createElement("div", {
        className: _NoticeList["default"].description,
        title: item.description
      }, item.description), /*#__PURE__*/_react()["default"].createElement("div", {
        className: _NoticeList["default"].datetime
      }, item.datetime))
    }));
  })), showClear ? /*#__PURE__*/_react()["default"].createElement("div", {
    className: _NoticeList["default"].clear,
    onClick: onClear
  }, locale.clear, " ", title) : null);
}