"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.figureRangeType = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

var _react = _interopRequireWildcard(require("react"));

var _tools = require("../../utils/tools");

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

var Option = _select["default"].Option;
var figureRangeType = {
  unlimited: {
    flag: -10000,
    text: '不限'
  },
  zero: {
    flag: 0,
    text: '零'
  },
  eq: {
    flag: 10,
    text: '等于'
  },
  gt: {
    flag: 20,
    text: '大于'
  },
  gte: {
    flag: 21,
    text: '大于等于'
  },
  le: {
    flag: 30,
    text: '小于'
  },
  lte: {
    flag: 31,
    text: '小于等于'
  },
  between: {
    flag: 40,
    text: '范围之内'
  },
  except: {
    flag: 50,
    text: '范围之外'
  }
};
exports.figureRangeType = figureRangeType;

var FigureRange = /*#__PURE__*/function (_PureComponent) {
  _inherits(FigureRange, _PureComponent);

  var _super = _createSuper(FigureRange);

  function FigureRange(props) {
    var _this;

    _classCallCheck(this, FigureRange);

    _this = _super.call(this, props);
    _this.rangeType = figureRangeType;

    _this.onDataChange = function (type, min, max, value) {
      var onChange = _this.props.onChange;

      if ((0, _tools.isFunction)(onChange)) {
        onChange((0, _tools.toNumber)(type), (0, _tools.toNumber)(min), (0, _tools.toNumber)(max), (0, _tools.toNumber)(value));
      }
    };

    _this.onTypeChange = function (v) {
      var _this$state = _this.state,
          min = _this$state.min,
          max = _this$state.max,
          value = _this$state.value;
      var d = (0, _tools.toNumber)(v);

      _this.setState({
        type: d
      });

      _this.onDataChange(d, min, max, value);
    };

    _this.onValueChange = function (e) {
      var _this$state2 = _this.state,
          type = _this$state2.type,
          min = _this$state2.min,
          max = _this$state2.max;
      var v = e.target.value;
      var d = (0, _tools.toNumber)(v);

      _this.setState({
        value: d
      });

      _this.onDataChange(type, min, max, d);
    };

    _this.onMinChange = function (e) {
      var _this$state3 = _this.state,
          type = _this$state3.type,
          max = _this$state3.max,
          value = _this$state3.value;
      var v = e.target.value;
      var d = (0, _tools.toNumber)(v);

      _this.setState({
        min: (0, _tools.toNumber)(v)
      });

      _this.onDataChange(type, d, max, value);
    };

    _this.onMaxChange = function (e) {
      var _this$state4 = _this.state,
          type = _this$state4.type,
          min = _this$state4.min,
          value = _this$state4.value;
      var v = e.target.value;
      var d = (0, _tools.toNumber)(v);

      _this.setState({
        max: d
      });

      _this.onDataChange(type, min, d, value);
    };

    _this.state = {
      type: figureRangeType.unlimited.flag,
      min: null,
      max: null,
      value: null
    };
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(FigureRange, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          minText = _this$props.minText,
          maxText = _this$props.maxText,
          splitText = _this$props.splitText,
          valueText = _this$props.valueText;
      var _this$state5 = this.state,
          type = _this$state5.type,
          min = _this$state5.min,
          max = _this$state5.max,
          value = _this$state5.value;
      return /*#__PURE__*/_react["default"].createElement(_input["default"].Group, {
        compact: true,
        className: _index["default"].figureRange
      }, /*#__PURE__*/_react["default"].createElement(_row["default"], {
        wrap: false,
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/_react["default"].createElement(_col["default"], {
        flex: type === figureRangeType.unlimited.flag || type === figureRangeType.zero.flag ? 'auto' : '100px'
      }, /*#__PURE__*/_react["default"].createElement(_select["default"], {
        className: type !== figureRangeType.unlimited.flag && type !== figureRangeType.zero.flag ? _index["default"].select : null,
        style: {
          width: '100%'
        },
        defaultValue: "".concat(type),
        value: "".concat(type),
        onChange: function onChange(e) {
          _this2.onTypeChange(e);
        }
      }, /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.unlimited.flag)
      }, figureRangeType.unlimited.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.zero.flag)
      }, figureRangeType.zero.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.eq.flag)
      }, figureRangeType.eq.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.gt.flag)
      }, figureRangeType.gt.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.gte.flag)
      }, figureRangeType.gte.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.le.flag)
      }, figureRangeType.le.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.lte.flag)
      }, figureRangeType.lte.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.between.flag)
      }, figureRangeType.between.text), /*#__PURE__*/_react["default"].createElement(Option, {
        value: "".concat(figureRangeType.except.flag)
      }, figureRangeType.except.text))), type !== figureRangeType.unlimited.flag && type !== figureRangeType.zero.flag ? /*#__PURE__*/_react["default"].createElement(_col["default"], {
        flex: "auto"
      }, type === figureRangeType.eq.flag || type === figureRangeType.gt.flag || type === figureRangeType.gte.flag || type === figureRangeType.le.flag || type === figureRangeType.lte.flag ? /*#__PURE__*/_react["default"].createElement(_input["default"], {
        className: _index["default"].valueInput,
        value: value,
        placeholder: valueText,
        onChange: function onChange(v) {
          _this2.onValueChange(v);
        }
      }) : null, type === figureRangeType.between.flag || type === figureRangeType.except.flag ? /*#__PURE__*/_react["default"].createElement(_row["default"], {
        wrap: false
      }, /*#__PURE__*/_react["default"].createElement(_col["default"], {
        flex: "0 1 auto"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        style: {
          textAlign: 'center'
        },
        className: _index["default"].minInput,
        placeholder: minText,
        value: min,
        onChange: function onChange(v) {
          _this2.onMinChange(v);
        }
      })), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        flex: "1 1 30px"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        className: _index["default"].inputSplit,
        style: {
          textAlign: 'center',
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none'
        },
        placeholder: splitText,
        disabled: true
      })), /*#__PURE__*/_react["default"].createElement(_col["default"], {
        flex: "0 1 auto"
      }, /*#__PURE__*/_react["default"].createElement(_input["default"], {
        className: _index["default"].maxInput,
        style: {
          textAlign: 'center'
        },
        placeholder: maxText,
        value: max,
        onChange: function onChange(v) {
          _this2.onMaxChange(v);
        }
      }))) : null) : null));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var typeData = nextProps.type,
          minData = nextProps.min,
          maxData = nextProps.max,
          valueData = nextProps.value;
      var type = (0, _tools.toNumber)(typeData);
      var min = (0, _tools.toNumber)(minData);
      var max = (0, _tools.toNumber)(maxData);
      var value = (0, _tools.toNumber)(valueData);

      if (!(type === figureRangeType.unlimited.flag || type === figureRangeType.zero.flag || type === figureRangeType.eq.flag || type === figureRangeType.gt.flag || type === figureRangeType.gte.flag || type === figureRangeType.le.flag || type === figureRangeType.lte.flag || type === figureRangeType.between.flag || type === figureRangeType.except.flag)) {
        return {
          type: figureRangeType.unlimited.flag,
          min: null,
          max: null,
          value: null
        };
      }

      return {
        type: type,
        min: min,
        max: max,
        value: value
      };
    }
  }]);

  return FigureRange;
}(_react.PureComponent);

FigureRange.defaultProps = {
  minText: '最小值',
  maxText: '最大值',
  valueText: '请输入',
  splitText: '~',
  type: figureRangeType.unlimited.flag,
  min: null,
  max: null,
  value: null
};
var _default = FigureRange;
exports["default"] = _default;