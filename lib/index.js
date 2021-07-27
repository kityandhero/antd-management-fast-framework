"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ref:
// - https://umijs.org/plugins/api
function _default(api) {
  api.logger.info('use plugin');
  api.modifyHTML($ => {
    $('body').prepend(`<h1>hello umi plugin</h1>`);
    return $;
  });
}