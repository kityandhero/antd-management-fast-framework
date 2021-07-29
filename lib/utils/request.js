"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/message/style");

function _message2() {
  var data = _interopRequireDefault(require("antd/es/message"));

  _message2 = function _message2() {
    return data;
  };

  return data;
}

require("antd/es/notification/style");

function _notification2() {
  var data = _interopRequireDefault(require("antd/es/notification"));

  _notification2 = function _notification2() {
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

function _umiRequest() {
  var data = require("umi-request");

  _umiRequest = function _umiRequest() {
    return data;
  };

  return data;
}

function _umi() {
  var data = require("umi");

  _umi = function _umi() {
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

var _storageAssist = require("../../customConfig/storageAssist");

var _constants = require("./constants");

var _tools = require("./tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '不支持的访问请求。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
};
/**
 * 异常处理程序
 */

var errorHandler = function errorHandler(error) {
  var response = error.response;

  if (response && response.status) {
    var errorText = codeMessage[response.status] || response.statusText;
    var status = response.status,
        url = response.url;
    var data = {
      message: "\u8BF7\u6C42\u9519\u8BEF ".concat(status, ": ").concat(url),
      description: errorText
    };
    requestAnimationFrame(function () {
      _notification2()["default"].error(data);
    });
    (0, _tools.recordText)(data);
  } else if (!response) {
    _notification2()["default"].error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    });
  }

  return response;
};
/**
 * 配置request请求时的默认参数
 */


var request = (0, _umiRequest().extend)({
  errorHandler: errorHandler // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie，跨域时不需要

}); // request拦截器, 改变url 或 options.

request.interceptors.request.use( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, options) {
    var token, corsUrl, urlChange, headers;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = (0, _storageAssist.getToken)() || 'anonymous';
            corsUrl = (0, _tools.corsTarget)(); // const url = transferToVirtualAccess() ? urlParam : `${corsUrl}${urlParam}`;

            urlChange = "".concat(corsUrl).concat(url);
            (0, _tools.trySendNearestLocalhostNotify)({
              text: corsUrl
            });

            if (!token) {
              _context.next = 8;
              break;
            }

            headers = {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            };
            headers["".concat((0, _storageAssist.getTokenKeyName)())] = token;
            return _context.abrupt("return", {
              url: urlChange,
              options: _objectSpread(_objectSpread({}, options), {}, {
                headers: headers
              })
            });

          case 8:
            return _context.abrupt("return", {
              url: urlChange,
              options: _objectSpread({}, options)
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); // response拦截器, 处理response
// eslint-disable-next-line @typescript-eslint/no-unused-vars

request.interceptors.response.use(function (response, options) {
  response.clone().json().then(function (o) {
    var code = o.code;

    if (code === _constants.authenticationFailCode) {
      setTimeout(function () {
        (0, _storageAssist.clearCustomData)();

        _message2()["default"].info('登陆超时，请重新登录！', 0.6);

        _umi().history.replace({
          pathname: '/user/login'
        });
      }, 200);
    }
  })["catch"](function (o) {
    (0, _tools.recordText)(o);
  });
  return response;
});
var _default = request;
exports["default"] = _default;