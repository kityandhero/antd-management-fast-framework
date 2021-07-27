"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Core2 = _interopRequireDefault(require("../Core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
          context.fill(); // update positions for next draw

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

  return CanvasRibbon;
}(_Core2.default);

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
var _default = CanvasRibbon;
exports.default = _default;