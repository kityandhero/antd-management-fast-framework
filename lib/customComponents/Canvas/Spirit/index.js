"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("@/utils/tools");

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

var Spirit = /*#__PURE__*/function (_Core) {
  _inherits(Spirit, _Core);

  var _super = _createSuper(Spirit);

  function Spirit() {
    var _this;

    _classCallCheck(this, Spirit);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.circles = [];

    _this.doAfterDidMount = function () {
      var x = 0;

      while (x < _this.canvasWidth * 0.5) {
        _this.circles.push(_this.createCircle());

        x += 1;
      }

      _this.animate();
    };

    _this.animate = function () {
      var ctx = _this.getCanvasContext();

      ctx.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
      _this.circles = (_this.circles || []).map(function (o) {
        if (o.alpha <= 0) {
          return _this.createCircle();
        }

        return o;
      });
      (_this.circles || []).forEach(function (o) {
        _this.drawCircle(ctx, o);
      });
      (0, _tools.requestAnimFrame)(_this.animate);
    };

    _this.createCircle = function () {
      var o = {
        pos: {
          x: Math.random() * _this.canvasWidth,
          y: _this.canvasHeight + Math.random() * 100
        },
        alpha: 0.1 + Math.random() * 0.3,
        scale: 0.1 + Math.random() * 0.3,
        velocity: Math.random()
      };
      return o;
    };

    _this.drawCircle = function (ctx, circle) {
      var o = circle;
      o.pos.y -= o.velocity;
      o.alpha -= 0.0005;
      ctx.beginPath();
      ctx.arc(o.pos.x, o.pos.y, o.scale * 10, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(255,255,255,".concat(o.alpha, ")");
      ctx.fill();
    };

    _this.buildContainorStyle = function () {
      return {
        backgroundColor: '#000'
      };
    };

    return _this;
  }

  return Spirit;
}(_Core2.default);

Spirit.defaultProps = {};
var _default = Spirit;
exports.default = _default;