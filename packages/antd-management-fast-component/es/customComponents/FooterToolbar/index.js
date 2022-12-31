import { _ as _extends } from '../../extends.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Component } from 'react';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

var _excluded = ["children", "className", "extra"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FooterToolbar = /*#__PURE__*/function (_Component) {
  _inherits(FooterToolbar, _Component);
  var _super = _createSuper(FooterToolbar);
  function FooterToolbar() {
    var _this;
    _classCallCheck(this, FooterToolbar);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      width: undefined
    };
    _this.resizeFooterToolbar = function () {
      var sider = document.querySelector('.ant-layout-sider');
      if (sider == null) {
        return;
      }
      var isMobile = _this.context.isMobile;
      var width = isMobile ? null : "calc(100% - ".concat(sider.style.width, ")");
      var stateWidth = _this.state.width;
      if (stateWidth !== width) {
        _this.setState({
          width: width
        });
      }
    };
    return _this;
  }
  _createClass(FooterToolbar, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.resizeFooterToolbar);
      this.resizeFooterToolbar();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resizeFooterToolbar);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        extra = _this$props.extra,
        restProps = _objectWithoutProperties(_this$props, _excluded);
      var width = this.state.width;
      return /*#__PURE__*/React.createElement("div", _extends({
        className: classNames(className, styles.toolbar),
        style: {
          width: width
        }
      }, restProps), /*#__PURE__*/React.createElement("div", {
        className: styles.left
      }, extra), /*#__PURE__*/React.createElement("div", {
        className: styles.right
      }, children));
    }
  }]);
  return FooterToolbar;
}(Component);
FooterToolbar.contextTypes = {
  isMobile: PropTypes.bool
};

export { FooterToolbar as default };
