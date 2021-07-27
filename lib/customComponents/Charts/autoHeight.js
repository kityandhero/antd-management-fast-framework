"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

function computeHeight(node) {
  var style = node.style;
  style.height = '100%';
  var totalHeight = parseInt("".concat(getComputedStyle(node).height), 10);
  var padding = parseInt("".concat(getComputedStyle(node).paddingTop), 10) + parseInt("".concat(getComputedStyle(node).paddingBottom), 10);
  return totalHeight - padding;
}

function getAutoHeight(n) {
  if (!n) {
    return 0;
  }

  var node = n;
  var height = computeHeight(node);
  var parentNode = node.parentNode;

  if (parentNode) {
    height = computeHeight(parentNode);
  }

  return height;
}

function autoHeight() {
  return function (WrappedComponent) {
    var AutoHeightComponent = /*#__PURE__*/function (_React$Component) {
      _inherits(AutoHeightComponent, _React$Component);

      var _super = _createSuper(AutoHeightComponent);

      function AutoHeightComponent() {
        var _this;

        _classCallCheck(this, AutoHeightComponent);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _super.call.apply(_super, [this].concat(args));
        _this.state = {
          computedHeight: 0
        };
        _this.root = undefined;

        _this.handleRoot = function (node) {
          _this.root = node;
        };

        return _this;
      }

      _createClass(AutoHeightComponent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var height = this.props.height;

          if (!height) {
            var h = getAutoHeight(this.root);
            this.setState({
              computedHeight: h
            });

            if (h < 1) {
              h = getAutoHeight(this.root);
              this.setState({
                computedHeight: h
              });
            }
          }
        }
      }, {
        key: "render",
        value: function render() {
          var height = this.props.height;
          var computedHeight = this.state.computedHeight;
          var h = height || computedHeight;
          return /*#__PURE__*/_react.default.createElement("div", {
            ref: this.handleRoot
          }, h > 0 && /*#__PURE__*/_react.default.createElement(WrappedComponent, _extends({}, this.props, {
            height: h
          })));
        }
      }]);

      return AutoHeightComponent;
    }(_react.default.Component);

    return AutoHeightComponent;
  };
}

var _default = autoHeight;
exports.default = _default;