import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import React from 'react';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function computeHeight(node) {
  var style = node.style;
  style.height = '100%';
  var totalHeight = parseInt("".concat(getComputedStyle(node).height), 10);
  var padding = parseInt("".concat(getComputedStyle(node).paddingTop), 10) + parseInt("".concat(getComputedStyle(node).paddingBottom), 10);
  return totalHeight - padding;
}
function getAutoHeight(n) {
  if (!n) {
    return 0;
  }
  var node = n;
  var height = computeHeight(node);
  var parentNode = node.parentNode;
  if (parentNode) {
    height = computeHeight(parentNode);
  }
  return height;
}
var AutoHeightComponent = /*#__PURE__*/function (_React$Component) {
  _inherits(AutoHeightComponent, _React$Component);
  var _super = _createSuper(AutoHeightComponent);
  function AutoHeightComponent() {
    var _this;
    _classCallCheck(this, AutoHeightComponent);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      computedHeight: 0
    };
    _this.root = undefined;
    _this.handleRoot = function (node) {
      _this.root = node;
    };
    return _this;
  }
  _createClass(AutoHeightComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var height = this.props.height;
      if (!height) {
        var h = getAutoHeight(this.root);
        this.setState({
          computedHeight: h
        });
        if (h < 1) {
          h = getAutoHeight(this.root);
          this.setState({
            computedHeight: h
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var height = this.props.height;
      var computedHeight = this.state.computedHeight;
      var h = height || computedHeight;
      return /*#__PURE__*/React.createElement("div", {
        ref: this.handleRoot,
        style: {
          height: "".concat(h, "px")
        }
      }, h > 0 ? this.props.children : null);
    }
  }]);
  return AutoHeightComponent;
}(React.Component);

export { AutoHeightComponent as default };
