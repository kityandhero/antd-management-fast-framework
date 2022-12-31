import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Avatar } from 'antd';
import { PureComponent } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { j as iconCollection, o as defaultEmptyImage } from '../../constants.js';
import { h as stringIsNullOrWhiteSpace, a as isFunction, k as showRuntimeError } from '../../tools.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import 'array-move';
import 'copy-to-clipboard';
import 'lodash';
import 'moment';
import 'numeral';
import 'nzh';
import 'qs';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';
import '../../core.js';
import 'path-to-regexp';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var avatarImageLoadResultCollection = {
  wait: -1,
  success: 1,
  fail: 0
};
function decorateAvatar() {
  var avatar = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var defaultAvatarIcon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : iconCollection.picture;
  var showPageHeaderAvatar = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var dataLoading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var reloading = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var avatarImageLoadResult = arguments.length > 5 ? arguments[5] : undefined;
  var onImageLoadErrorCallback = arguments.length > 6 ? arguments[6] : undefined;
  if (showPageHeaderAvatar) {
    var currentAvatar = null;
    if (dataLoading) {
      currentAvatar = {
        icon: iconCollection.loading
      };
    }
    if (reloading) {
      currentAvatar = {
        icon: /*#__PURE__*/React.createElement(ReloadOutlined, {
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
        if (stringIsNullOrWhiteSpace(src || '')) {
          currentAvatar = {
            icon: defaultAvatarIcon
          };
        } else {
          if (avatarImageLoadResult === avatarImageLoadResultCollection.wait) {
            currentAvatar = {
              src: src,
              onError: function onError() {
                if (isFunction(onImageLoadErrorCallback)) {
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
              src: defaultEmptyImage,
              onError: function onError() {
                var text = '加载默认图片失败';
                showRuntimeError({
                  message: text
                });
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
        return /*#__PURE__*/React.createElement(Avatar, currentAvatar || {});
      }
      return null;
    }
  }]);
  return DecorateAvatar;
}(PureComponent);
DecorateAvatar.defaultProps = {
  avatar: null,
  defaultAvatarIcon: iconCollection.picture,
  showPageHeaderAvatar: false,
  dataLoading: false,
  reloading: false
};

export { avatarImageLoadResultCollection, decorateAvatar, DecorateAvatar as default };
