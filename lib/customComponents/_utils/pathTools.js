"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlToList = urlToList;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
// eslint-disable-next-line import/prefer-default-export
function urlToList(url) {
  var urllist = url.split('/').filter(function (i) {
    return i;
  });
  return urllist.map(function (urlItem, index) {
    return "/".concat(urllist.slice(0, index + 1).join('/'));
  });
}