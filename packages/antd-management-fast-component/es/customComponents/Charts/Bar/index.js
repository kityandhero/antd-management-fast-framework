import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { Chart, Axis, Tooltip, Interval } from 'bizcharts';
import { Component } from 'react';
import { s as styles } from '../../../index.js';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Bar = /*#__PURE__*/function (_Component) {
  _inherits(Bar, _Component);
  var _super = _createSuper(Bar);
  function Bar() {
    var _this;
    _classCallCheck(this, Bar);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      autoHideXLabels: false
    };
    return _this;
  }
  _createClass(Bar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        title = _this$props.title,
        _this$props$autoFit = _this$props.autoFit,
        autoFit = _this$props$autoFit === void 0 ? true : _this$props$autoFit,
        data = _this$props.data,
        _this$props$color = _this$props.color,
        color = _this$props$color === void 0 ? 'rgba(24, 144, 255, 0.85)' : _this$props$color,
        _this$props$animate = _this$props.animate,
        animate = _this$props$animate === void 0 ? true : _this$props$animate;
      var autoHideXLabels = this.state.autoHideXLabels;
      var scale = {
        x: {
          type: 'cat'
        },
        y: {
          min: 0,
          alias: title
        }
      };
      var tooltip = ['x*y', function (x, y) {
        return {
          name: x,
          value: y
        };
      }];
      return /*#__PURE__*/React.createElement("div", {
        className: styles.chart,
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          height: '100%'
        }
      }, /*#__PURE__*/React.createElement(Chart, {
        animate: animate,
        scale: scale,
        autoFit: autoFit,
        data: data
      }, /*#__PURE__*/React.createElement(Axis, {
        name: "x",
        title: false,
        label: autoHideXLabels ? undefined : {},
        tickLine: autoHideXLabels ? undefined : {}
      }), /*#__PURE__*/React.createElement(Axis, {
        title: true,
        name: "y",
        min: 0
      }), /*#__PURE__*/React.createElement(Tooltip, {
        showTitle: false,
        showCrosshairs: false
      }), /*#__PURE__*/React.createElement(Interval, {
        position: "x*y",
        color: color,
        tooltip: tooltip
      }))));
    }
  }]);
  return Bar;
}(Component);

export { Bar as default };
