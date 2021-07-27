"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bizcharts = require("bizcharts");

var _react = _interopRequireWildcard(require("react"));

var _dataSet = _interopRequireDefault(require("@antv/data-set"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _classnames = _interopRequireDefault(require("classnames"));

var _autoHeight = _interopRequireDefault(require("../autoHeight"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

/* eslint no-underscore-dangle: 0 */

/* eslint no-param-reassign: 0 */
var imgUrl = 'https://gw.alipayobjects.com/zos/rmsportal/gWyeGLCdFFRavBGIDzWk.png';

var TagCloud = /*#__PURE__*/function (_Component) {
  _inherits(TagCloud, _Component);

  var _super = _createSuper(TagCloud);

  function TagCloud() {
    var _this;

    _classCallCheck(this, TagCloud);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      dv: null,
      height: 0,
      width: 0
    };
    _this.isUnmount = false;
    _this.requestRef = 0;
    _this.root = undefined;
    _this.imageMask = undefined;

    _this.resize = function () {
      _this.requestRef = requestAnimationFrame(function () {
        _this.renderChart(_this.props);
      });
    };

    _this.saveRootRef = function (node) {
      _this.root = node;
    };

    _this.initTagCloud = function () {
      function getTextAttrs(cfg) {
        return _objectSpread(_objectSpread({}, cfg.style), {}, {
          fillOpacity: cfg.opacity,
          fontSize: cfg.origin._origin.size,
          rotate: cfg.origin._origin.rotate,
          text: cfg.origin._origin.text,
          textAlign: 'center',
          fontFamily: cfg.origin._origin.font,
          fill: cfg.color,
          textBaseline: 'Alphabetic'
        });
      }

      (0, _bizcharts.registerShape)('point', 'cloud', {
        draw: function draw(cfg, container) {
          var attrs = getTextAttrs(cfg);
          return container.addShape('text', {
            attrs: _objectSpread(_objectSpread({}, attrs), {}, {
              x: cfg.x,
              y: cfg.y
            })
          });
        }
      });
    };

    _this.renderChart = (0, _lodash["default"])(function (nextProps) {
      // const colors = ['#1890FF', '#41D9C7', '#2FC25B', '#FACC14', '#9AE65C'];
      var _ref = nextProps || _this.props,
          data = _ref.data,
          height = _ref.height;

      if (data.length < 1 || !_this.root) {
        return;
      }

      var h = height;
      var w = _this.root.offsetWidth;

      var onload = function onload() {
        var dv = new _dataSet["default"].View().source(data);
        var range = dv.range('value');

        var _range = _slicedToArray(range, 2),
            min = _range[0],
            max = _range[1];

        dv.transform({
          type: 'tag-cloud',
          fields: ['name', 'value'],
          imageMask: _this.imageMask,
          font: 'Verdana',
          size: [w, h],
          // 宽高设置最好根据 imageMask 做调整
          padding: 0,
          timeInterval: 5000,
          // max execute time
          rotate: function rotate() {
            return 0;
          },
          fontSize: function fontSize(d) {
            var size = Math.pow((d.value - min) / (max - min), 2);
            return size * (17.5 - 5) + 5;
          }
        });

        if (_this.isUnmount) {
          return;
        }

        _this.setState({
          dv: dv,
          width: w,
          height: h
        });
      };

      if (!_this.imageMask) {
        _this.imageMask = new Image();
        _this.imageMask.crossOrigin = '';
        _this.imageMask.src = imgUrl;
        _this.imageMask.onload = onload;
      } else {
        onload();
      }
    }, 500);
    return _this;
  }

  _createClass(TagCloud, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      requestAnimationFrame(function () {
        _this2.initTagCloud();

        _this2.renderChart(_this2.props);
      });
      window.addEventListener('resize', this.resize, {
        passive: true
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps) {
      var data = this.props.data;

      if (preProps && JSON.stringify(preProps.data) !== JSON.stringify(data)) {
        this.renderChart(this.props);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnmount = true;
      window.cancelAnimationFrame(this.requestRef);
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          height = _this$props.height;
      var _this$state = this.state,
          dv = _this$state.dv,
          width = _this$state.width,
          stateHeight = _this$state.height;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_index["default"].tagCloud, className),
        style: {
          width: '100%',
          height: height
        },
        ref: this.saveRootRef
      }, dv && /*#__PURE__*/_react["default"].createElement(_bizcharts.Chart, {
        width: width,
        height: stateHeight,
        data: dv,
        padding: 0,
        scale: {
          x: {
            nice: false
          },
          y: {
            nice: false
          }
        }
      }, /*#__PURE__*/_react["default"].createElement(_bizcharts.Tooltip, {
        showTitle: false
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Coordinate, {
        reflect: "y"
      }), /*#__PURE__*/_react["default"].createElement(_bizcharts.Geom, {
        type: "point",
        position: "x*y",
        color: "text",
        shape: "cloud",
        tooltip: ['text*value', function trans(text, value) {
          return {
            name: text,
            value: value
          };
        }]
      })));
    }
  }]);

  return TagCloud;
}(_react.Component);

var _default = (0, _autoHeight["default"])()(TagCloud);

exports["default"] = _default;