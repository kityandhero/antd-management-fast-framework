import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { N as requestAnimFrame } from '../../../tools.js';
import Index from '../Core/index.js';
import '../../../_commonjsHelpers.js';
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
import '../../../objectSpread2.js';
import '../../../defineProperty.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
      requestAnimFrame(_this.animate);
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
  return _createClass(Spirit);
}(Index);
Spirit.defaultProps = {};

export { Spirit as default };
