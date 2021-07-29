'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

require('antd/es/notification/style');

var _notification2 = _interopRequireDefault(require('antd/es/notification'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _tools = require('../../../utils/tools');

var _AuthorizationWrapper2 = _interopRequireDefault(
  require('../../AuthorizationWrapper'),
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {}),
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var Base = /*#__PURE__*/ (function(_AuthorizationWrapper) {
  _inherits(Base, _AuthorizationWrapper);

  var _super = _createSuper(Base);

  function Base() {
    var _this;

    _classCallCheck(this, Base);

    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.supplementLoadRequestParams = function(o) {
      return o;
    };

    _this.checkSubmitData = function(o) {
      if ((o || null) == null) {
        (0, _tools.showRuntimeErrorMessage)('提交的数据不能为空');
        return false;
      }

      return _this.checkSubmitRequestParams(o);
    };

    _this.checkSubmitRequestParams = function(o) {
      return true;
    };

    _this.doAfterSubmitSuccess = function(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    ) {
      var afterOK = _this.props.afterOK;

      _this.doOtherAfterSubmitSuccess(
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      );

      _this.sendSubmitSuccessMessage(
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      );

      _this.sendSubmitSuccessNotification(
        singleData,
        listData,
        extraData,
        responseOriginalData,
        submitData,
      );

      if ((0, _tools.isFunction)(afterOK)) {
        afterOK(
          singleData,
          listData,
          extraData,
          responseOriginalData,
          submitData,
        );
      }
    };

    _this.doOtherAfterSubmitSuccess = function(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      singleData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responseOriginalData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      submitData,
    ) {};

    _this.sendSubmitSuccessMessage = function(
      singleData,
      listData,
      extraData,
      responseOriginalData,
      submitData,
    ) {
      var _type$text$_this$buil = _objectSpread(
          _objectSpread(
            {},
            {
              type: 'success',
              text: '',
            },
          ),
          _this.buildMessage(
            singleData,
            listData,
            extraData,
            responseOriginalData,
            submitData,
          ),
        ),
        type = _type$text$_this$buil.type,
        text = _type$text$_this$buil.text;

      if (!(0, _tools.stringIsNullOrWhiteSpace)(text)) {
        setTimeout(function() {
          requestAnimationFrame(function() {
            if (type === 'success') {
              _message2['default'].success(text);
            }

            if (type === 'warn') {
              _message2['default'].warn(text);
            }
          });
        }, 700);
      }
    };

    _this.buildMessage = function(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      singleData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responseOriginalData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      submitData,
    ) {
      return {
        type: _this.buildMessageType(),
        text: _this.buildMessageText(
          singleData,
          listData,
          extraData,
          responseOriginalData,
          submitData,
        ),
      };
    };

    _this.buildMessageType = function() {
      return 'success';
    };

    _this.buildMessageText = function(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      singleData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responseOriginalData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      submitData,
    ) {
      return '';
    };

    _this.sendSubmitSuccessNotification = function(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      singleData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responseOriginalData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      submitData,
    ) {
      var _type$placement$messa = _objectSpread(
          _objectSpread(
            {},
            {
              type: 'success',
              placement: 'bottomRight',
              message: '操作执行通知',
              description: '',
            },
          ),
          {
            type: _this.buildNotificationType(),
            placement: _this.buildNotificationPlacement(),
            message: _this.buildNotificationMessage(),
            description: _this.buildNotificationDescription(
              singleData,
              listData,
              extraData,
              responseOriginalData,
              submitData,
            ),
          },
        ),
        type = _type$placement$messa.type,
        placement = _type$placement$messa.placement,
        messageText = _type$placement$messa.message,
        description = _type$placement$messa.description;

      if (!(0, _tools.stringIsNullOrWhiteSpace)(description)) {
        setTimeout(function() {
          requestAnimationFrame(function() {
            if (type === 'info') {
              _notification2['default'].info({
                placement: placement,
                message: messageText,
                description: description,
              });
            }

            if (type === 'success') {
              _notification2['default'].success({
                placement: placement,
                message: messageText,
                description: description,
              });
            }

            if (type === 'warning') {
              _notification2['default'].warning({
                placement: placement,
                message: messageText,
                description: description,
              });
            }

            if (type === 'error') {
              _notification2['default'].error({
                placement: placement,
                message: messageText,
                description: description,
              });
            }
          });
        }, 700);
      }
    };

    _this.buildNotificationType = function() {
      return 'success';
    };

    _this.buildNotificationPlacement = function() {
      return 'bottomRight';
    };

    _this.buildNotificationMessage = function() {
      return '\u64CD\u4F5C\u6267\u884C\u901A\u77E5';
    };

    _this.buildNotificationDescription = function(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      singleData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      listData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      extraData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      responseOriginalData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
      submitData,
    ) {
      return '\u5DF2\u6210\u529F\u66F4\u65B0\u4FE1\u606F\uFF0C\u8BF7\u7EE7\u7EED\u5176\u4ED6\u64CD\u4F5C\u3002';
    };

    return _this;
  }

  return Base;
})(_AuthorizationWrapper2['default']);

var _default = Base;
exports['default'] = _default;
