"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _umi = require("umi");

var _react = _interopRequireDefault(require("react"));

var _Authorized = _interopRequireDefault(require("./Authorized"));

var _excluded = ["component", "render", "authority", "redirectPath"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var AuthorizedRoute = function AuthorizedRoute(_ref) {
  var Component = _ref.component,
      _render = _ref.render,
      authority = _ref.authority,
      redirectPath = _ref.redirectPath,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_Authorized["default"], {
    authority: authority,
    noMatch: /*#__PURE__*/_react["default"].createElement(_umi.Route, _extends({}, rest, {
      render: function render() {
        return /*#__PURE__*/_react["default"].createElement(_umi.Redirect, {
          to: {
            pathname: redirectPath
          }
        });
      }
    }))
  }, /*#__PURE__*/_react["default"].createElement(_umi.Route, _extends({}, rest, {
    render: function render(props) {
      return Component ? /*#__PURE__*/_react["default"].createElement(Component, props) : _render(props);
    }
  })));
};

var _default = AuthorizedRoute;
exports["default"] = _default;