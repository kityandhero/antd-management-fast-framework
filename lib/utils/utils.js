"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRouteAuthority = exports.getAuthorityFromRouter = exports.getPageQuery = exports.isAntDesignProOrDev = exports.isAntDesignPro = exports.isUrl = void 0;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _querystring() {
  const data = require("querystring");

  _querystring = function _querystring() {
    return data;
  };

  return data;
}

function _pathToRegexp() {
  const data = require("path-to-regexp");

  _pathToRegexp = function _pathToRegexp() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = path => reg.test(path);

exports.isUrl = isUrl;

const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性


exports.isAntDesignPro = isAntDesignPro;

const isAntDesignProOrDev = () => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};

exports.isAntDesignProOrDev = isAntDesignProOrDev;

const getPageQuery = () => (0, _querystring().parse)(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */


exports.getPageQuery = getPageQuery;

const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(({
    routes,
    path = '/'
  }) => path && (0, _pathToRegexp().pathToRegexp)(path).exec(pathname) || routes && getAuthorityFromRouter(routes, pathname));
  if (authority) return authority;
  return undefined;
};

exports.getAuthorityFromRouter = getAuthorityFromRouter;

const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if ((0, _pathToRegexp().pathToRegexp)(`${route.path}/(.*)`).test(`${path}/`)) {
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