import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { Row, Col, Divider } from 'antd';
import { registerShape, Chart, Coordinate, Axis, Tooltip, Interval, Interaction } from 'bizcharts';
import classNames from 'classnames';
import { Component } from 'react';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

registerShape('interval', 'sliceShape', {
  draw: function draw(cfg, container) {
    var points = cfg.points;
    var path = [];
    path.push(['M', points[0].x, points[0].y]);
    path.push(['L', points[1].x, points[1].y - sliceNumber]);
    path.push(['L', points[2].x, points[2].y - sliceNumber]);
    path.push(['L', points[3].x, points[3].y]);
    path.push('Z');
    path = this.parsePath(path);
    return container.addShape('path', {
      attrs: {
        fill: cfg.color,
        path: path
      }
    });
  }
});
var Pie = /*#__PURE__*/function (_Component) {
  _inherits(Pie, _Component);
  var _super = _createSuper(Pie);
  function Pie() {
    var _this;
    _classCallCheck(this, Pie);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {};
    _this.calculateTotal = function (d) {
      var result = 0;
      (d || []).map(function (o) {
        result += o.y;
        return o;
      });
      return result;
    };
    _this.handleLegendClick = function (item, i) {};
    return _this;
  }
  _createClass(Pie, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        valueFormat = _this$props.valueFormat,
        subTitle = _this$props.subTitle,
        total = _this$props.total,
        className = _this$props.className,
        style = _this$props.style;
      var pieClassName = classNames(styles.pie, className, styles.legendBlock);
      var propsData = this.props.data;
      var totalValue = this.calculateTotal(propsData);
      return /*#__PURE__*/React.createElement("div", {
        className: pieClassName
      }, /*#__PURE__*/React.createElement(Row, {
        gutter: 24
      }, /*#__PURE__*/React.createElement(Col, {
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.chart,
        style: style
      }, /*#__PURE__*/React.createElement(Chart, {
        data: propsData || [],
        autoFit: true
      }, /*#__PURE__*/React.createElement(Coordinate, {
        type: "theta",
        radius: 0.8,
        innerRadius: 0.75
      }), /*#__PURE__*/React.createElement(Axis, {
        visible: false
      }), /*#__PURE__*/React.createElement(Tooltip, {
        showTitle: false
      }), /*#__PURE__*/React.createElement(Interval, {
        adjust: "stack",
        position: "y",
        color: "x",
        shape: "sliceShape"
      }), /*#__PURE__*/React.createElement(Interaction, {
        type: "element-single-selected"
      }))), (subTitle || total) && /*#__PURE__*/React.createElement("div", {
        className: styles.total
      }, subTitle && /*#__PURE__*/React.createElement("h4", {
        className: "pie-sub-title"
      }, subTitle), total && /*#__PURE__*/React.createElement("div", {
        className: "pie-stat"
      }, typeof total === 'function' ? total() : total))), /*#__PURE__*/React.createElement(Col, {
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      }, /*#__PURE__*/React.createElement("ul", {
        className: styles.legend,
        style: style
      }, (propsData || []).map(function (item, i) {
        var key = "".concat(item.x, "_").concat(i);
        return /*#__PURE__*/React.createElement("li", {
          key: key,
          onClick: function onClick() {
            return _this2.handleLegendClick(item, i);
          }
        }, /*#__PURE__*/React.createElement("span", {
          className: styles.dot,
          style: {
            backgroundColor: !item.checked ? '#aaa' : item.color
          }
        }), /*#__PURE__*/React.createElement("span", {
          className: styles.legendTitle
        }, item.x), /*#__PURE__*/React.createElement(Divider, {
          type: "vertical"
        }), /*#__PURE__*/React.createElement("span", {
          className: styles.percent
        }, "".concat(((totalValue || 0) > 0 ? (Number.isNaN(item.y / totalValue) ? 0 : item.y / totalValue) * 100 : 0).toFixed(2), "%")), /*#__PURE__*/React.createElement("span", {
          className: styles.value
        }, valueFormat ? valueFormat(item.y) : item.y));
      })))));
    }
  }]);
  return Pie;
}(Component);

export { Pie as default };
