import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Select, Input, Row, Col } from 'antd';
import { PureComponent } from 'react';
import { a as isFunction, v as toNumber } from '../../tools.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../constants.js';
import '@ant-design/icons';
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
import '../../core.js';
import 'path-to-regexp';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Option = Select.Option;
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
      if (isFunction(onChange)) {
        onChange(toNumber(type), toNumber(min), toNumber(max), toNumber(value));
      }
    };
    _this.onTypeChange = function (v) {
      var _this$state = _this.state,
        min = _this$state.min,
        max = _this$state.max,
        value = _this$state.value;
      var d = toNumber(v);
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
      var d = toNumber(v);
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
      var d = toNumber(v);
      _this.setState({
        min: toNumber(v)
      });
      _this.onDataChange(type, d, max, value);
    };
    _this.onMaxChange = function (e) {
      var _this$state4 = _this.state,
        type = _this$state4.type,
        min = _this$state4.min,
        value = _this$state4.value;
      var v = e.target.value;
      var d = toNumber(v);
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
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      return /*#__PURE__*/React.createElement(Input.Group, {
        compact: true,
        className: styles.figureRange
      }, /*#__PURE__*/React.createElement(Row, {
        wrap: false,
        style: {
          display: 'flex'
        }
      }, /*#__PURE__*/React.createElement(Col, {
        flex: type === figureRangeType.unlimited.flag || type === figureRangeType.zero.flag ? 'auto' : '100px'
      }, /*#__PURE__*/React.createElement(Select, {
        className: type !== figureRangeType.unlimited.flag && type !== figureRangeType.zero.flag ? styles.select : null,
        style: {
          width: '100%'
        },
        defaultValue: "".concat(type),
        value: "".concat(type),
        onChange: function onChange(e) {
          _this2.onTypeChange(e);
        }
      }, /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.unlimited.flag)
      }, figureRangeType.unlimited.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.zero.flag)
      }, figureRangeType.zero.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.eq.flag)
      }, figureRangeType.eq.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.gt.flag)
      }, figureRangeType.gt.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.gte.flag)
      }, figureRangeType.gte.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.le.flag)
      }, figureRangeType.le.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.lte.flag)
      }, figureRangeType.lte.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.between.flag)
      }, figureRangeType.between.text), /*#__PURE__*/React.createElement(Option, {
        value: "".concat(figureRangeType.except.flag)
      }, figureRangeType.except.text))), type !== figureRangeType.unlimited.flag && type !== figureRangeType.zero.flag ? /*#__PURE__*/React.createElement(Col, {
        flex: "auto"
      }, type === figureRangeType.eq.flag || type === figureRangeType.gt.flag || type === figureRangeType.gte.flag || type === figureRangeType.le.flag || type === figureRangeType.lte.flag ? /*#__PURE__*/React.createElement(Input, {
        className: styles.valueInput,
        value: value,
        placeholder: valueText,
        onChange: function onChange(v) {
          _this2.onValueChange(v);
        }
      }) : null, type === figureRangeType.between.flag || type === figureRangeType.except.flag ? /*#__PURE__*/React.createElement(Row, {
        wrap: false
      }, /*#__PURE__*/React.createElement(Col, {
        flex: "0 1 auto"
      }, /*#__PURE__*/React.createElement(Input, {
        style: {
          textAlign: 'center'
        },
        className: styles.minInput,
        placeholder: minText,
        value: min,
        onChange: function onChange(v) {
          _this2.onMinChange(v);
        }
      })), /*#__PURE__*/React.createElement(Col, {
        flex: "1 1 30px"
      }, /*#__PURE__*/React.createElement(Input, {
        className: styles.inputSplit,
        style: {
          textAlign: 'center',
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none'
        },
        placeholder: splitText,
        disabled: true
      })), /*#__PURE__*/React.createElement(Col, {
        flex: "0 1 auto"
      }, /*#__PURE__*/React.createElement(Input, {
        className: styles.maxInput,
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
      var type = toNumber(typeData);
      var min = toNumber(minData);
      var max = toNumber(maxData);
      var value = toNumber(valueData);
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
}(PureComponent);
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

export { FigureRange as default, figureRangeType };
