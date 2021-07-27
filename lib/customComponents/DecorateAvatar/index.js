"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decorateAvatar = decorateAvatar;
exports["default"] = exports.avatarImageLoadResultCollection = void 0;

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

var _react = _interopRequireWildcard(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var avatarImageLoadResultCollection = {
  wait: -1,
  success: 1,
  fail: 0
};
exports.avatarImageLoadResultCollection = avatarImageLoadResultCollection;

function decorateAvatar() {
  var avatar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var defaultAvatarIcon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /*#__PURE__*/_react["default"].createElement(_icons.PictureOutlined, null);
  var showPageHeaderAvatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var dataLoading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var reloading = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var avatarImageLoadResult = arguments.length > 5 ? arguments[5] : undefined;
  var onImageLoadErrorCallback = arguments.length > 6 ? arguments[6] : undefined;

  if (showPageHeaderAvatar) {
    var currentAvatar = null;

    if (dataLoading) {
      currentAvatar = {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null)
      };
    }

    if (reloading) {
      currentAvatar = {
        icon: /*#__PURE__*/_react["default"].createElement(_icons.ReloadOutlined, {
          spin: true
        })
      };
    }

    if (!dataLoading && !reloading) {
      currentAvatar = avatar || null;

      if ((currentAvatar || null) == null) {
        currentAvatar = {
          icon: defaultAvatarIcon
        };
      } else {
        var _currentAvatar = currentAvatar,
            src = _currentAvatar.src;

        if ((0, _tools.stringIsNullOrWhiteSpace)(src || '')) {
          currentAvatar = {
            icon: defaultAvatarIcon
          };
        } else {
          if (avatarImageLoadResult === avatarImageLoadResultCollection.wait) {
            currentAvatar = {
              src: src,
              onError: function onError() {
                if ((0, _tools.isFunction)(onImageLoadErrorCallback)) {
                  onImageLoadErrorCallback();
                }

                return true;
              }
            };
          }

          if (avatarImageLoadResult === avatarImageLoadResultCollection.success) {
            currentAvatar = {
              src: src
            };
          }

          if (avatarImageLoadResult === avatarImageLoadResultCollection.fail) {
            currentAvatar = {
              src: _constants.defaultEmptyImage,
              onError: function onError() {
                (0, _tools.showRuntimeErrorMessage)('加载默认图片失败');
                return true;
              }
            };
          }
        }
      }
    }

    return currentAvatar;
  }

  return null;
}

var DecorateAvatar = /*#__PURE__*/function (_PureComponent) {
  _inherits(DecorateAvatar, _PureComponent);

  var _super = _createSuper(DecorateAvatar);

  function DecorateAvatar(props) {
    var _this;

    _classCallCheck(this, DecorateAvatar);

    _this = _super.call(this, props);

    _this.onImageLoadErrorCallback = function () {
      _this.setState({
        avatarImageLoadResult: avatarImageLoadResultCollection.fail
      });
    };

    _this.state = {
      avatarImageLoadResult: avatarImageLoadResultCollection.wait
    };
    return _this;
  }

  _createClass(DecorateAvatar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          avatar = _this$props.avatar,
          defaultAvatarIcon = _this$props.defaultAvatarIcon,
          showPageHeaderAvatar = _this$props.showPageHeaderAvatar,
          dataLoading = _this$props.dataLoading,
          reloading = _this$props.reloading;
      var avatarImageLoadResult = this.state.avatarImageLoadResult;

      if (showPageHeaderAvatar) {
        var currentAvatar = decorateAvatar(avatar, defaultAvatarIcon, showPageHeaderAvatar, dataLoading, reloading, avatarImageLoadResult, function () {
          _this2.onImageLoadErrorCallback();
        });
        return /*#__PURE__*/_react["default"].createElement(_avatar["default"], currentAvatar || {});
      }

      return null;
    }
  }]);

  return DecorateAvatar;
}(_react.PureComponent);

DecorateAvatar.defaultProps = {
  avatar: null,
  defaultAvatarIcon: /*#__PURE__*/_react["default"].createElement(_icons.PictureOutlined, null),
  showPageHeaderAvatar: false,
  dataLoading: false,
  reloading: false
};
var _default = DecorateAvatar;
exports["default"] = _default;