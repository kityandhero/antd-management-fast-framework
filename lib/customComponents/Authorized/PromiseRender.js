"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

var _react = _interopRequireDefault(require("react"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _Secured = require("./Secured");

var _excluded = ["ok", "error", "promise"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var PromiseRender = /*#__PURE__*/function (_React$Component) {
  _inherits(PromiseRender, _React$Component);

  var _super = _createSuper(PromiseRender);

  function PromiseRender() {
    var _this;

    _classCallCheck(this, PromiseRender);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      component: function component() {
        return null;
      }
    };

    _this.shouldComponentUpdate = function (nextProps, nextState) {
      var component = _this.state.component;

      if (!(0, _isEqual["default"])(nextProps, _this.props)) {
        _this.setRenderComponent(nextProps);
      }

      if (nextState.component !== component) return true;
      return false;
    };

    _this.checkIsInstantiation = function (target) {
      if ((0, _Secured.isComponentClass)(target)) {
        var Target = target;
        return function (props) {
          return /*#__PURE__*/_react["default"].createElement(Target, props);
        };
      }

      if ( /*#__PURE__*/_react["default"].isValidElement(target)) {
        return function (props) {
          return /*#__PURE__*/_react["default"].cloneElement(target, props);
        };
      }

      return function () {
        return target;
      };
    };

    return _this;
  }

  _createClass(PromiseRender, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setRenderComponent(this.props);
    }
  }, {
    key: "setRenderComponent",
    value: // set render Component : ok or error
    function setRenderComponent(props) {
      var _this2 = this;

      var ok = this.checkIsInstantiation(props.ok);
      var error = this.checkIsInstantiation(props.error);
      props.promise.then(function () {
        _this2.setState({
          component: ok
        });

        return true;
      })["catch"](function () {
        _this2.setState({
          component: error
        });
      });
    } // Determine whether the incoming component has been instantiated
    // AuthorizedRoute is already instantiated
    // Authorized  render is already instantiated, children is no instantiated
    // Secured is not instantiated

  }, {
    key: "render",
    value: function render() {
      var Component = this.state.component;

      var _this$props = this.props,
          ok = _this$props.ok,
          error = _this$props.error,
          promise = _this$props.promise,
          rest = _objectWithoutProperties(_this$props, _excluded);

      return Component ? /*#__PURE__*/_react["default"].createElement(Component, rest) : /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center'
        }
      }, /*#__PURE__*/_react["default"].createElement(_spin["default"], {
        size: "large"
      }));
    }
  }]);

  return PromiseRender;
}(_react["default"].Component);

exports["default"] = PromiseRender;