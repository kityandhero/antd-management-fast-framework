import { _ as _objectSpread } from '../../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import React, { PureComponent } from 'react';
import { h as stringIsNullOrWhiteSpace } from '../../../tools.js';
import '../../../_commonjsHelpers.js';
import '../../../defineProperty.js';
import '../../../toPropertyKey.js';
import '../../../constants.js';
import '@ant-design/icons';
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
var Index = /*#__PURE__*/function (_PureComponent) {
  _inherits(Index, _PureComponent);
  var _super = _createSuper(Index);
  function Index(props) {
    var _this;
    _classCallCheck(this, Index);
    _this = _super.call(this, props);
    _this.canvasContainerRef = /*#__PURE__*/React.createRef();
    _this.canvasRef = /*#__PURE__*/React.createRef();
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
      _ref.canvasContext;
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
      return _objectSpread({}, stringIsNullOrWhiteSpace(backgroundImage) ? {} : {
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
      return /*#__PURE__*/React.createElement("div", {
        style: _objectSpread(_objectSpread({}, containorStyle || {}), {
          width: '100%',
          height: '100%'
        }),
        ref: this.canvasContainerRef
      }, /*#__PURE__*/React.createElement("canvas", {
        ref: this.canvasRef,
        style: {
          width: '100%',
          height: '100%'
        }
      }));
    }
  }]);
  return Index;
}(PureComponent);
Index.defaultProps = {
  backgroundImage: ''
};

export { Index as default };
