"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _tools = require("@/utils/tools");

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Index = /*#__PURE__*/function (_PureComponent) {
  _inherits(Index, _PureComponent);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);
    _this.canvasContainerRef = /*#__PURE__*/_react["default"].createRef();
    _this.canvasRef = /*#__PURE__*/_react["default"].createRef();
    _this.canvasWidth = 0;
    _this.canvasHeight = 0;

    _this.getCanvasContainer = function () {
      return _this.canvasContainerRef.current;
    };

    _this.getCanvas = function () {
      return _this.canvasRef.current;
    };

    _this.getCanvasContext = function () {
      var c = _this.getCanvas();

      if (c == null) {
        return null;
      }

      return c.getContext('2d');
    };

    _this.doAfterDidMount = function (_ref) {
      var canvasContext = _ref.canvasContext;
    };

    _this.resize = function () {
      var canvasContainer = _this.getCanvasContainer();

      var canvas = _this.getCanvas();

      if (((canvas || null) && (canvasContainer || null)) != null) {
        _this.canvasWidth = canvasContainer.offsetWidth;
        _this.canvasHeight = canvasContainer.offsetHeight;
        canvas.width = _this.canvasWidth;
        canvas.height = _this.canvasHeight;
      }
    };

    _this.buildContainorStyle = function () {
      var _backgroundImage = _objectSpread(_objectSpread({}, {
        backgroundImage: ''
      }), _this.props || {}),
          backgroundImage = _backgroundImage.backgroundImage;

      return _objectSpread({}, (0, _tools.stringIsNullOrWhiteSpace)(backgroundImage) ? {} : {
        backgroundImage: backgroundImage
      });
    };

    _this.state = {};
    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.resize);
      var canvasContainer = this.getCanvasContainer();
      var canvas = this.getCanvas();

      if (((canvas || null) && (canvasContainer || null)) != null) {
        this.canvasWidth = canvasContainer.offsetWidth;
        this.canvasHeight = canvasContainer.offsetHeight;
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        var canvasContext = this.getCanvasContext();

        if (canvasContext != null) {
          this.doAfterDidMount({
            canvasContext: canvasContext
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: "render",
    value: function render() {
      var containorStyle = this.buildContainorStyle();
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: _objectSpread(_objectSpread({}, containorStyle || {}), {
          width: '100%',
          height: '100%'
        }),
        ref: this.canvasContainerRef
      }, /*#__PURE__*/_react["default"].createElement("canvas", {
        ref: this.canvasRef,
        style: {
          width: '100%',
          height: '100%'
        }
      }));
    }
  }]);

  return Index;
}(_react.PureComponent);

Index.defaultProps = {
  backgroundImage: ''
};
var _default = Index;
exports["default"] = _default;