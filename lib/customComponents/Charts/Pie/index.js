"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

var _bizcharts = require("bizcharts");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _index = _interopRequireDefault(require("./index.less"));

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

var sliceNumber = 0.01; // 自定义 other 的图形，增加两条线

(0, _bizcharts.registerShape)('interval', 'sliceShape', {
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
      var pieClassName = (0, _classnames["default"])(_index["default"].pie, className, _index["default"].legendBlock);
      var propsData = this.props.data;
      var totalValue = this.calculateTotal(propsData);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: pieClassName
      }, /*#__PURE__*/_react["default"].createElement(_row["default"], {
        gutter: 24
      }, /*#__PURE__*/_react["default"].createElement(_col["default"], {
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].chart,
        style: style
      }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Chart, {
        data: propsData || [],
        autoFit: true
      }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Coordinate, {
        type: "theta",
        radius: 0.8,
        innerRadius: 0.75
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Axis, {
        visible: false
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Tooltip, {
        showTitle: false
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Interval, {
        adjust: "stack",
        position: "y",
        color: "x",
        shape: "sliceShape"
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Interaction, {
        type: "element-single-selected"
      }))), (subTitle || total) && /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].total
      }, subTitle && /*#__PURE__*/_react["default"].createElement("h4", {
        className: "pie-sub-title"
      }, subTitle), total && /*#__PURE__*/_react["default"].createElement("div", {
        className: "pie-stat"
      }, typeof total === 'function' ? total() : total))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        lg: 12,
        md: 12,
        sm: 24,
        xs: 24
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: _index["default"].legend,
        style: style
      }, (propsData || []).map(function (item, i) {
        var key = "".concat(item.x, "_").concat(i);
        return /*#__PURE__*/_react["default"].createElement("li", {
          key: key,
          onClick: function onClick() {
            return _this2.handleLegendClick(item, i);
          }
        }, /*#__PURE__*/_react["default"].createElement("span", {
          className: _index["default"].dot,
          style: {
            backgroundColor: !item.checked ? '#aaa' : item.color
          }
        }), /*#__PURE__*/_react["default"].createElement("span", {
          className: _index["default"].legendTitle
        }, item.x), /*#__PURE__*/_react["default"].createElement(_divider["default"], {
          type: "vertical"
        }), /*#__PURE__*/_react["default"].createElement("span", {
          className: _index["default"].percent
        }, "".concat(((totalValue || 0) > 0 ? (Number.isNaN(item.y / totalValue) ? 0 : item.y / totalValue) * 100 : 0).toFixed(2), "%")), /*#__PURE__*/_react["default"].createElement("span", {
          className: _index["default"].value
        }, valueFormat ? valueFormat(item.y) : item.y));
      })))));
    }
  }]);

  return Pie;
}(_react.Component);

var _default = Pie;
exports["default"] = _default;