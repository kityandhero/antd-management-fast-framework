import { _ as _extends } from '../../extends.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import { _ as _defineProperty } from '../../defineProperty.js';
import { Avatar, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["children", "size", "maxLength", "excessItemsStyle"];
var avatarSizeToClassName = function avatarSizeToClassName(size) {
  var _classNames;
  return classNames(styles.avatarItem, (_classNames = {}, _defineProperty(_classNames, styles.avatarItemLarge, size === 'large'), _defineProperty(_classNames, styles.avatarItemSmall, size === 'small'), _defineProperty(_classNames, styles.avatarItemMini, size === 'mini'), _classNames));
};
var AvatarList = function AvatarList(_ref) {
  var children = _ref.children,
    size = _ref.size,
    maxLength = _ref.maxLength,
    excessItemsStyle = _ref.excessItemsStyle,
    other = _objectWithoutProperties(_ref, _excluded);
  var numOfChildren = React.Children.count(children);
  var numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;
  var childrenWithProps = React.Children.toArray(children).slice(0, numToShow).map(function (child) {
    return /*#__PURE__*/React.cloneElement(child, {
      size: size
    });
  });
  if (numToShow < numOfChildren) {
    var cls = avatarSizeToClassName(size);
    childrenWithProps.push( /*#__PURE__*/React.createElement("li", {
      key: "exceed",
      className: cls
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: size,
      style: excessItemsStyle
    }, "+".concat(numOfChildren - maxLength))));
  }
  return /*#__PURE__*/React.createElement("div", _extends({}, other, {
    className: styles.avatarList
  }), /*#__PURE__*/React.createElement("ul", null, " ", childrenWithProps, " "));
};
var Item = function Item(_ref2) {
  var src = _ref2.src,
    size = _ref2.size,
    tips = _ref2.tips,
    _ref2$onClick = _ref2.onClick,
    onClick = _ref2$onClick === void 0 ? function () {} : _ref2$onClick;
  var cls = avatarSizeToClassName(size);
  return /*#__PURE__*/React.createElement("li", {
    className: cls,
    onClick: onClick
  }, tips ? /*#__PURE__*/React.createElement(Tooltip, {
    title: tips
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: src,
    size: size,
    style: {
      cursor: 'pointer'
    }
  })) : /*#__PURE__*/React.createElement(Avatar, {
    src: src,
    size: size
  }));
};
AvatarList.Item = Item;

export { AvatarList as default };
