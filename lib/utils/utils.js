"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRouteAuthority = exports.getAuthorityFromRouter = exports.getPageQuery = exports.isAntDesignProOrDev = exports.isAntDesignPro = exports.isUrl = void 0;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _querystring() {
  var data = require("querystring");

  _querystring = function _querystring() {
    return data;
  };

  return data;
}

function _pathToRegexp() {
  var data = require("path-to-regexp");

  _pathToRegexp = function _pathToRegexp() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
var reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

var isUrl = function isUrl(path) {
  return reg.test(path);
};

exports.isUrl = isUrl;

var isAntDesignPro = function isAntDesignPro() {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性


exports.isAntDesignPro = isAntDesignPro;

var isAntDesignProOrDev = function isAntDesignProOrDev() {
  var NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

exports.isAntDesignProOrDev = isAntDesignProOrDev;

var getPageQuery = function getPageQuery() {
  return (0, _querystring().parse)(window.location.href.split('?')[1]);
};
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */


exports.getPageQuery = getPageQuery;

var getAuthorityFromRouter = function getAuthorityFromRouter() {
  var router = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var pathname = arguments.length > 1 ? arguments[1] : undefined;
  var authority = router.find(function (_ref) {
    var routes = _ref.routes,
        _ref$path = _ref.path,
        path = _ref$path === void 0 ? '/' : _ref$path;
    return path && (0, _pathToRegexp().pathToRegexp)(path).exec(pathname) || routes && getAuthorityFromRouter(routes, pathname);
  });
  if (authority) return authority;
  return undefined;
};

exports.getAuthorityFromRouter = getAuthorityFromRouter;

var getRouteAuthority = function getRouteAuthority(path, routeData) {
  var authorities;
  routeData.forEach(function (route) {
    // match prefix
    if ((0, _pathToRegexp().pathToRegexp)("".concat(route.path, "/(.*)")).test("".concat(path, "/"))) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match


      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively


      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

exports.getRouteAuthority = getRouteAuthority;