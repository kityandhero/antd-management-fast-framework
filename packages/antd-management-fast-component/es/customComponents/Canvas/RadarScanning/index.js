import { _ as _objectSpread } from '../../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { N as requestAnimFrame } from '../../../tools.js';
import Index from '../Core/index.js';
import '../../../_commonjsHelpers.js';
import '../../../defineProperty.js';
import '../../../toPropertyKey.js';
import '../../../constants.js';
import '@ant-design/icons';
import 'react';
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
      var c = _this.getCanvas();
      var mx = e.pageX - c.offsetLeft;
      var my = e.pageY - c.offsetTop;
      _this.createOrb(mx, my);
    };
    _this.clear = function () {
      _this.orbs = [];
    };
    _this.loop = function () {
      requestAnimFrame(_this.loop);
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
  return _createClass(RadarScanning);
}(Index);
RadarScanning.defaultProps = {
  number: 100,
  trail: true
};

export { RadarScanning as default };
