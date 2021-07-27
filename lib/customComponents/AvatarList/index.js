"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["children", "size", "maxLength", "excessItemsStyle"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var avatarSizeToClassName = function avatarSizeToClassName(size) {
  var _classNames;

  return (0, _classnames["default"])(_index["default"].avatarItem, (_classNames = {}, _defineProperty(_classNames, _index["default"].avatarItemLarge, size === 'large'), _defineProperty(_classNames, _index["default"].avatarItemSmall, size === 'small'), _defineProperty(_classNames, _index["default"].avatarItemMini, size === 'mini'), _classNames));
};

var AvatarList = function AvatarList(_ref) {
  var children = _ref.children,
      size = _ref.size,
      maxLength = _ref.maxLength,
      excessItemsStyle = _ref.excessItemsStyle,
      other = _objectWithoutProperties(_ref, _excluded);

  var numOfChildren = _react["default"].Children.count(children);

  var numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;

  var childrenWithProps = _react["default"].Children.toArray(children).slice(0, numToShow).map(function (child) {
    return /*#__PURE__*/_react["default"].cloneElement(child, {
      size: size
    });
  });

  if (numToShow < numOfChildren) {
    var cls = avatarSizeToClassName(size);
    childrenWithProps.push( /*#__PURE__*/_react["default"].createElement("li", {
      key: "exceed",
      className: cls
    }, /*#__PURE__*/_react["default"].createElement(_avatar["default"], {
      size: size,
      style: excessItemsStyle
    }, "+".concat(numOfChildren - maxLength))));
  }

  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, other, {
    className: _index["default"].avatarList
  }), /*#__PURE__*/_react["default"].createElement("ul", null, " ", childrenWithProps, " "));
};

var Item = function Item(_ref2) {
  var src = _ref2.src,
      size = _ref2.size,
      tips = _ref2.tips,
      _ref2$onClick = _ref2.onClick,
      onClick = _ref2$onClick === void 0 ? function () {} : _ref2$onClick;
  var cls = avatarSizeToClassName(size);
  return /*#__PURE__*/_react["default"].createElement("li", {
    className: cls,
    onClick: onClick
  }, tips ? /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    title: tips
  }, /*#__PURE__*/_react["default"].createElement(_avatar["default"], {
    src: src,
    size: size,
    style: {
      cursor: 'pointer'
    }
  })) : /*#__PURE__*/_react["default"].createElement(_avatar["default"], {
    src: src,
    size: size
  }));
};

AvatarList.Item = Item;
var _default = AvatarList;
exports["default"] = _default;