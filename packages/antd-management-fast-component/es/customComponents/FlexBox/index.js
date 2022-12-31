import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Row, Col } from 'antd';
import { PureComponent } from 'react';
import { a as inCollection } from '../../core.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
import '../../constants.js';
import '@ant-design/icons';
import 'lodash';
import 'path-to-regexp';
import 'qs';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var flexAutoCollection = ['left', 'right', 'top', 'bottom'];
var FlexBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(FlexBox, _PureComponent);
  var _super = _createSuper(FlexBox);
  function FlexBox() {
    var _this;
    _classCallCheck(this, FlexBox);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.getDirection = function () {
      var flexAuto = _this.props.flexAuto;
      if (!inCollection(flexAutoCollection, flexAuto)) {
        var text = 'flexAuto 只能配置为 left/right/top/bottom';
        showErrorMessage({
          message: text
        });
        return 'horizontal';
      }
      return inCollection(['left', 'right'], flexAuto) ? 'horizontal' : inCollection(['top', 'bottom'], flexAuto) ? 'vertical' : 'horizontal';
    };
    _this.triggerClick = function () {
      var onClick = _this.props.onClick;
      if (isFunction(onClick)) {
        onClick();
      }
    };
    return _this;
  }
  _createClass(FlexBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        styleSource = _this$props.style,
        allowWrap = _this$props.allowWrap,
        flexAutoSource = _this$props.flexAuto,
        left = _this$props.left,
        leftStyle = _this$props.leftStyle,
        right = _this$props.right,
        rightStyle = _this$props.rightStyle,
        top = _this$props.top,
        bottom = _this$props.bottom,
        vertical = _this$props.vertical;
      var direction = this.getDirection();
      if (direction === 'horizontal') {
        var flexAuto = flexAutoSource === 'left' ? 'left' : 'right';
        var _style = _objectSpread(_objectSpread({}, styleSource || {}), !(allowWrap || false) ? {
          flexWrap: 'nowrap'
        } : {});
        if (flexAuto === 'left') {
          return /*#__PURE__*/React.createElement(Row, {
            style: _style
          }, /*#__PURE__*/React.createElement(Col, {
            flex: "auto",
            style: leftStyle || null
          }, left), (right || null) == null ? null : /*#__PURE__*/React.createElement(Col, {
            flex: true,
            style: rightStyle || null
          }, right));
        }
        return /*#__PURE__*/React.createElement(Row, {
          style: _style
        }, /*#__PURE__*/React.createElement(Col, {
          flex: true,
          style: leftStyle || null
        }, left), (right || null) == null ? null : /*#__PURE__*/React.createElement(Col, {
          flex: "auto",
          style: rightStyle || null
        }, right));
      }
      var _bottomHeight = _objectSpread(_objectSpread({}, {
          bottomHeight: '180rpx'
        }), vertical || {}),
        bottomHeight = _bottomHeight.bottomHeight;
      var style = {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'stretch'
        // minHeight: minHeight,
      };

      return /*#__PURE__*/React.createElement("div", {
        style: style
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          flex: '1 1 auto'
        }
      }, /*#__PURE__*/React.createElement("div", null, top)), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: "0 1 ".concat(bottomHeight)
        }
      }, bottom));
    }
  }]);
  return FlexBox;
}(PureComponent);
FlexBox.defaultProps = {
  flexAuto: 'left',
  allowWrap: false,
  vertical: {
    minHeight: 'auto',
    bottomHeight: '180rpx'
  },
  left: null,
  right: null,
  top: null,
  bottom: null,
  style: null
};

export { FlexBox as default };
