"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tools = require("../../../utils/tools");

var _Core2 = _interopRequireDefault(require("../Core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var rand = function rand(min, max) {
  return ~~(Math.random() * (max - min + 1) + min);
};

var RadarScanning = /*#__PURE__*/function (_Core) {
  _inherits(RadarScanning, _Core);

  var _super = _createSuper(RadarScanning);

  function RadarScanning() {
    var _this;

    _classCallCheck(this, RadarScanning);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.orbs = [];

    _this.doAfterDidMount = function (_ref) {
      var canvasContext = _ref.canvasContext;

      var _number = _objectSpread({}, _objectSpread({
        number: 100
      }, _this.props || {})),
          number = _number.number;

      var ctx = canvasContext;
      ctx.lineCap = 'round';
      var count = number;

      while (count) {
        _this.createOrb(_this.canvasWidth / 2, _this.canvasHeight / 2 + count * 2);

        count -= 1;
      }

      _this.loop();
    };

    _this.getTrail = function () {
      var _trail = _objectSpread({}, _objectSpread({
        trail: true
      }, _this.props || {})),
          trail = _trail.trail;

      return trail;
    };

    _this.turnOnMove = function () {
      var c = _this.getCanvas();

      c.addEventListener('mousemove', _this.orbGo, false);
    };

    _this.turnOffMove = function () {
      var c = _this.getCanvas();

      c.removeEventListener('mousemove', _this.orbGo, false);
    };

    _this.orbGo = function (e) {
      var mx = e.pageX - c.offsetLeft;
      var my = e.pageY - c.offsetTop;

      _this.createOrb(mx, my);
    };

    _this.clear = function () {
      _this.orbs = [];
    };

    _this.loop = function () {
      (0, _tools.requestAnimFrame)(_this.loop);

      var ctx = _this.getCanvasContext();

      if (ctx != null) {
        var trail = _this.getTrail();

        if (trail) {
          ctx.fillStyle = 'rgba(0,0,0,.1)';
          ctx.fillRect(0, 0, _this.canvasWidth, _this.canvasHeight);
        } else {
          ctx.clearRect(0, 0, _this.canvasWidth, _this.canvasHeight);
        }

        var i = _this.orbs.length;

        while (i) {
          var orb = _this.orbs[i];

          if ((orb || null) != null) {
            var updateCount = 3;

            while (updateCount) {
              var o = _this.createOrbByExist(orb);

              _this.drawOrb(ctx, o);

              updateCount -= 1;
            }
          }

          i -= 1;
        }
      }
    };

    _this.createOrb = function (mx, my) {
      var dx = _this.canvasWidth / 2 - mx;
      var dy = _this.canvasHeight / 2 - my;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var angle = Math.atan2(dy, dx);
      var o = {
        x: mx,
        y: my,
        lastX: mx,
        lastY: my,
        hue: 0,
        colorAngle: 0,
        angle: angle + Math.PI / 2,
        // size: .5+dist/250,
        size: rand(1, 3) / 2,
        centerX: _this.canvasWidth / 2,
        centerY: _this.canvasHeight / 2,
        radius: dist,
        speed: rand(5, 10) / 1000 * (dist / 750) + 0.015 - 0.009,
        alpha: 1 - Math.abs(dist) / _this.canvasWidth
      };

      _this.orbs.push(o);
    };

    _this.drawOrb = function (ctx, orb) {
      ctx.strokeStyle = "hsla(".concat(orb.colorAngle, ",100%,50%,1)");
      ctx.lineWidth = orb.size;
      ctx.beginPath();
      ctx.moveTo(orb.lastX, orb.lastY);
      ctx.lineTo(orb.x, orb.y);
      ctx.stroke();
    };

    _this.createOrbByExist = function (o) {
      var orb = o;
      var mxNew = orb.x;
      var myNew = orb.y;
      var x1 = _this.canvasWidth / 2;
      var y1 = _this.canvasHeight / 2;
      var x2 = mxNew;
      var y2 = myNew;
      var rise = y1 - y2;
      var run = x1 - x2;
      var slope = -(rise / run);
      var radian = Math.atan(slope);
      var angleH = Math.floor(radian * (180 / Math.PI));

      if (x2 < x1 && y2 < y1) {
        angleH += 180;
      }

      if (x2 < x1 && y2 > y1) {
        angleH += 180;
      }

      if (x2 > x1 && y2 > y1) {
        angleH += 360;
      }

      if (y2 < y1 && slope === -Infinity) {
        angleH = 90;
      }

      if (y2 > y1 && slope === Infinity) {
        angleH = 270;
      }

      if (x2 < x1 && slope === 0) {
        angleH = 180;
      }

      if (Number.isNaN(angleH)) {
        angleH = 0;
      }

      orb.x = orb.centerX + Math.sin(orb.angle * -1) * orb.radius;
      orb.y = orb.centerY + Math.cos(orb.angle * -1) * orb.radius;
      orb.lastX = orb.x;
      orb.lastY = orb.y;
      orb.colorAngle = angleH;
      orb.angle += orb.speed;
      return orb;
    };

    return _this;
  }

  return RadarScanning;
}(_Core2["default"]);

RadarScanning.defaultProps = {
  number: 100,
  trail: true
};
var _default = RadarScanning;
exports["default"] = _default;