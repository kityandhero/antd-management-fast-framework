import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import Index from '../Core/index.js';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';
import '../../../objectSpread2.js';
import '../../../defineProperty.js';
import 'react';
import '../../../tools.js';
import '../../../constants.js';
import '@ant-design/icons';
import 'antd';
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
import '../../../core.js';
import 'path-to-regexp';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var r = function r() {
  return Math.random();
};
var CanvasRibbon = /*#__PURE__*/function (_Core) {
  _inherits(CanvasRibbon, _Core);
  var _super = _createSuper(CanvasRibbon);
  function CanvasRibbon() {
    var _this;
    _classCallCheck(this, CanvasRibbon);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.bubbleList = [];
    _this.doAfterDidMount = function (_ref) {
      var canvasContext = _ref.canvasContext;
      var _this$props = _this.props,
        shadowColor = _this$props.shadowColor,
        blur = _this$props.blur,
        bubbleFunc = _this$props.bubbleFunc,
        radiusFunc = _this$props.radiusFunc,
        angleFunc = _this$props.angleFunc,
        velocityFunc = _this$props.velocityFunc,
        bubbles = _this$props.bubbles;
      var width = _this.canvasWidth;
      var height = _this.canvasHeight;
      var context = canvasContext;
      context.shadowColor = shadowColor || '#fff';
      context.shadowBlur = blur || 4;
      var nrBubbles = bubbles || Math.floor((width + height) * 0.02);
      _this.bubbleList = [];
      var i = 0;
      while (i < nrBubbles) {
        _this.bubbleList.push({
          f: (bubbleFunc || function () {
            return "hsla(0, 0%, 100%, ".concat(r() * 0.1, ")");
          }).call(),
          // fillStyle
          x: r() * width,
          // x-position
          y: r() * height,
          // y-position
          r: (radiusFunc || function () {
            return 4 + r() * width / 25;
          }).call(),
          // radius
          a: (angleFunc || function () {
            return r() * Math.PI * 2;
          }).call(),
          // angle
          v: (velocityFunc || function () {
            return 0.1 + r() * 0.5;
          }).call() // velocity
        });

        i += 1;
      }
      _this.draw();
    };
    _this.draw = function () {
      var _ref2 = _this.props || {},
        colorStart = _ref2.colorStart,
        colorStop = _ref2.colorStop,
        animate = _ref2.animate,
        compose = _ref2.compose;
      if (animate !== false) {
        requestAnimationFrame(_this.draw);
      }
      var canvasContainer = _this.getCanvasContainer();
      var canvas = _this.getCanvas();
      if (((canvas || null) && (canvasContainer || null)) != null) {
        var width = canvasContainer.offsetWidth;
        var height = canvasContainer.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext('2d');
        var gradient = context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, colorStart || '#2AE');
        gradient.addColorStop(1, colorStop || '#17B');
        context.globalCompositeOperation = 'source-over';
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);
        context.globalCompositeOperation = compose || 'lighter';
        _this.bubbleList = (_this.bubbleList || []).map(function (b) {
          var bubble = b;
          context.beginPath();
          context.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
          context.fillStyle = bubble.f;
          context.fill();
          // update positions for next draw
          bubble.x += Math.cos(bubble.a) * bubble.v;
          bubble.y += Math.sin(bubble.a) * bubble.v;
          if (bubble.x - bubble.r > width) {
            bubble.x = -bubble.r;
          }
          if (bubble.x + bubble.r < 0) {
            bubble.x = width + bubble.r;
          }
          if (bubble.y - bubble.r > height) {
            bubble.y = -bubble.r;
          }
          if (bubble.y + bubble.r < 0) {
            bubble.y = height + bubble.r;
          }
          return bubble;
        });
      }
    };
    return _this;
  }
  return _createClass(CanvasRibbon);
}(Index);
CanvasRibbon.defaultProps = {
  shadowColor: '#fff',
  blur: 4,
  colorStart: '#2AE',
  colorStop: '#17B',
  animate: true,
  compose: 'lighter',
  bubbleFunc: null,
  radiusFunc: null,
  angleFunc: null,
  velocityFunc: null
};

export { CanvasRibbon as default };
