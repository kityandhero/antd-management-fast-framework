"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _icons() {
  var data = require("@ant-design/icons");

  _icons = function _icons() {
    return data;
  };

  return data;
}

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  UserName: {
    props: {
      size: 'large',
      id: 'userName',
      prefix: /*#__PURE__*/_react()["default"].createElement(_icons().UserOutlined, {
        className: _index["default"].prefixIcon
      }),
      placeholder: 'admin'
    },
    rules: [{
      required: true,
      message: 'Please enter username!'
    }]
  },
  Password: {
    props: {
      size: 'large',
      prefix: /*#__PURE__*/_react()["default"].createElement(_icons().LockOutlined, {
        className: _index["default"].prefixIcon
      }),
      type: 'password',
      id: 'password',
      placeholder: '888888'
    },
    rules: [{
      required: true,
      message: 'Please enter password!'
    }]
  },
  Mobile: {
    props: {
      size: 'large',
      prefix: /*#__PURE__*/_react()["default"].createElement(_icons().MobileOutlined, {
        className: _index["default"].prefixIcon
      }),
      placeholder: 'mobile number'
    },
    rules: [{
      required: true,
      message: 'Please enter mobile number!'
    }, {
      pattern: /^1\d{10}$/,
      message: 'Wrong mobile number format!'
    }]
  },
  Captcha: {
    props: {
      size: 'large',
      prefix: /*#__PURE__*/_react()["default"].createElement(_icons().MailOutlined, {
        className: _index["default"].prefixIcon
      }),
      placeholder: 'captcha'
    },
    rules: [{
      required: true,
      message: 'Please enter Captcha!'
    }]
  }
};
exports["default"] = _default;