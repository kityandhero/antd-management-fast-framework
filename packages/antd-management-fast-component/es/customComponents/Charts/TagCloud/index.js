import { _ as _slicedToArray } from '../../../slicedToArray.js';
import { _ as _objectSpread } from '../../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { registerShape, Chart, Tooltip, Coordinate, Geom } from 'bizcharts';
import classNames from 'classnames';
import { Debounce } from 'lodash';
import { Component } from 'react';
import DataSet from '@antv/data-set';
import AutoHeightComponent from '../autoHeight.js';
import '../../../_commonjsHelpers.js';
import '../../../unsupportedIterableToArray.js';
import '../../../defineProperty.js';
import '../../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
      registerShape('point', 'cloud', {
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
    _this.renderChart = Debounce(function (nextProps) {
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
        var dv = new DataSet.View().source(data);
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
      var className = this.props.className;
      var _this$state = this.state,
        dv = _this$state.dv,
        width = _this$state.width,
        stateHeight = _this$state.height;
      return /*#__PURE__*/React.createElement(AutoHeightComponent, null, /*#__PURE__*/React.createElement("div", {
        className: classNames(styles.tagCloud, className),
        style: {
          width: '100%',
          height: "100%"
        },
        ref: this.saveRootRef
      }, dv && /*#__PURE__*/React.createElement(Chart, {
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
      }, /*#__PURE__*/React.createElement(Tooltip, {
        showTitle: false
      }), /*#__PURE__*/React.createElement(Coordinate, {
        reflect: "y"
      }), /*#__PURE__*/React.createElement(Geom, {
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
      }))));
    }
  }]);
  return TagCloud;
}(Component);

export { TagCloud as default };
