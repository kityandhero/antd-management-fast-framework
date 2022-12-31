import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { Component } from 'react';
import AutoHeightComponent from '../autoHeight.js';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/* eslint no-return-assign: 0 */

/* eslint no-mixed-operators: 0 */
// riddle: https://riddle.alibaba-inc.com/riddles/2d9a4b90
var WaterWave = /*#__PURE__*/function (_Component) {
  _inherits(WaterWave, _Component);
  var _super = _createSuper(WaterWave);
  function WaterWave() {
    var _this;
    _classCallCheck(this, WaterWave);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      radio: 1
    };
    _this.timer = 0;
    _this.root = null;
    _this.node = null;
    _this.resize = function () {
      if (_this.root) {
        var _this$props$height = _this.props.height,
          height = _this$props$height === void 0 ? 1 : _this$props$height;
        var offsetWidth = _this.root.parentNode.offsetWidth;
        _this.setState({
          radio: offsetWidth < height ? offsetWidth / height : 1
        });
      }
    };
    return _this;
  }
  _createClass(WaterWave, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.renderChart();
      this.resize();
      window.addEventListener('resize', function () {
        requestAnimationFrame(function () {
          return _this2.resize();
        });
      }, {
        passive: true
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var percent = this.props.percent;
      if (props.percent !== percent) {
        // 不加这个会造成绘制缓慢
        this.renderChart('update');
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelAnimationFrame(this.timer);
      if (this.node) {
        this.node.innerHTML = '';
      }
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: "renderChart",
    value: function renderChart(type) {
      var _this$props = this.props,
        percent = _this$props.percent,
        _this$props$color = _this$props.color,
        color = _this$props$color === void 0 ? '#1890FF' : _this$props$color;
      var data = percent / 100;
      var self = this;
      cancelAnimationFrame(this.timer);
      if (!this.node || data !== 0 && !data) {
        return;
      }
      var canvas = this.node;
      var ctx = canvas.getContext('2d');
      if (!ctx) {
        return;
      }
      var canvasWidth = canvas.width;
      var canvasHeight = canvas.height;
      var radius = canvasWidth / 2;
      var lineWidth = 2;
      var cR = radius - lineWidth;
      ctx.beginPath();
      ctx.lineWidth = lineWidth * 2;
      var axisLength = canvasWidth - lineWidth;
      var unit = axisLength / 8;
      var range = 0.2; // 振幅

      var currRange = range;
      var xOffset = lineWidth;
      var sp = 0; // 周期偏移量

      var currData = 0;
      var waveupsp = 0.005; // 水波上涨速度

      var arcStack = [];
      var bR = radius - lineWidth;
      var circleOffset = -(Math.PI / 2);
      var circleLock = true;
      for (var i = circleOffset; i < circleOffset + 2 * Math.PI; i += 1 / (8 * Math.PI)) {
        arcStack.push([radius + bR * Math.cos(i), radius + bR * Math.sin(i)]);
      }
      var cStartPoint = arcStack.shift();
      ctx.strokeStyle = color;
      ctx.moveTo(cStartPoint[0], cStartPoint[1]);
      function drawSin() {
        if (!ctx) {
          return;
        }
        ctx.beginPath();
        ctx.save();
        var sinStack = [];
        for (var _i = xOffset; _i <= xOffset + axisLength; _i += 20 / axisLength) {
          var x = sp + (xOffset + _i) / unit;
          var y = Math.sin(x) * currRange;
          var dx = _i;
          var dy = 2 * cR * (1 - currData) + (radius - cR) - unit * y;
          ctx.lineTo(dx, dy);
          sinStack.push([dx, dy]);
        }
        var startPoint = sinStack.shift();
        ctx.lineTo(xOffset + axisLength, canvasHeight);
        ctx.lineTo(xOffset, canvasHeight);
        ctx.lineTo(startPoint[0], startPoint[1]);
        var gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, color);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }
      function render() {
        if (!ctx) {
          return;
        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        if (circleLock && type !== 'update') {
          if (arcStack.length) {
            var temp = arcStack.shift();
            ctx.lineTo(temp[0], temp[1]);
            ctx.stroke();
          } else {
            circleLock = false;
            ctx.lineTo(cStartPoint[0], cStartPoint[1]);
            ctx.stroke();
            arcStack = [];
            ctx.globalCompositeOperation = 'destination-over';
            ctx.beginPath();
            ctx.lineWidth = lineWidth;
            ctx.arc(radius, radius, bR, 0, 2 * Math.PI, true);
            ctx.beginPath();
            ctx.save();
            ctx.arc(radius, radius, radius - 3 * lineWidth, 0, 2 * Math.PI, true);
            ctx.restore();
            ctx.clip();
            ctx.fillStyle = color;
          }
        } else {
          if (data >= 0.85) {
            if (currRange > range / 4) {
              var t = range * 0.01;
              currRange -= t;
            }
          } else if (data <= 0.1) {
            if (currRange < range * 1.5) {
              var _t = range * 0.01;
              currRange += _t;
            }
          } else {
            if (currRange <= range) {
              var _t2 = range * 0.01;
              currRange += _t2;
            }
            if (currRange >= range) {
              var _t3 = range * 0.01;
              currRange -= _t3;
            }
          }
          if (data - currData > 0) {
            currData += waveupsp;
          }
          if (data - currData < 0) {
            currData -= waveupsp;
          }
          sp += 0.07;
          drawSin();
        }
        self.timer = requestAnimationFrame(render);
      }
      render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var radio = this.state.radio;
      var _this$props2 = this.props,
        percent = _this$props2.percent,
        title = _this$props2.title,
        _this$props2$height = _this$props2.height,
        height = _this$props2$height === void 0 ? 1 : _this$props2$height;
      return /*#__PURE__*/React.createElement(AutoHeightComponent, null, /*#__PURE__*/React.createElement("div", {
        className: styles.waterWave,
        ref: function ref(n) {
          return _this3.root = n;
        },
        style: {
          transform: "scale(".concat(radio, ")"),
          height: "100%"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          width: height,
          height: height,
          overflow: 'hidden'
        }
      }, /*#__PURE__*/React.createElement("canvas", {
        className: styles.waterWaveCanvasWrapper,
        ref: function ref(n) {
          return _this3.node = n;
        },
        width: height * 2,
        height: height * 2
      })), /*#__PURE__*/React.createElement("div", {
        className: styles.text,
        style: {
          width: height
        }
      }, title && /*#__PURE__*/React.createElement("span", null, title), /*#__PURE__*/React.createElement("h4", null, percent, "%"))));
    }
  }]);
  return WaterWave;
}(Component);

export { WaterWave as default };
