"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/tabs/style");

var _tabs = _interopRequireDefault(require("antd/es/tabs"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _LoginItem = _interopRequireDefault(require("./LoginItem"));

var _LoginTab = _interopRequireDefault(require("./LoginTab"));

var _LoginSubmit = _interopRequireDefault(require("./LoginSubmit"));

var _index = _interopRequireDefault(require("./index.less"));

var _loginContext = _interopRequireDefault(require("./loginContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var Login = /*#__PURE__*/function (_Component) {
  _inherits(Login, _Component);

  var _super = _createSuper(Login);

  function Login(props) {
    var _this;

    _classCallCheck(this, Login);

    _this = _super.call(this, props);

    _this.onSwitch = function (type) {
      _this.setState({
        type: type
      });

      var onTabChange = _this.props.onTabChange;
      onTabChange(type);
    };

    _this.getContext = function () {
      var tabs = _this.state.tabs;

      var form = _this.getTargetForm();

      return {
        tabUtil: {
          addTab: function addTab(id) {
            _this.setState({
              tabs: [].concat(_toConsumableArray(tabs), [id])
            });
          },
          removeTab: function removeTab(id) {
            _this.setState({
              tabs: tabs.filter(function (currentId) {
                return currentId !== id;
              })
            });
          }
        },
        form: form,
        updateActive: function updateActive(activeItem) {
          var _this$state = _this.state,
              type = _this$state.type,
              active = _this$state.active;

          if (active[type]) {
            active[type].push(activeItem);
          } else {
            active[type] = [activeItem];
          }

          _this.setState({
            active: active
          });
        }
      };
    };

    _this.handleSubmit = function (e) {
      var currentForm = e.currentForm;
      e.preventDefault();
      var _this$state2 = _this.state,
          active = _this$state2.active,
          type = _this$state2.type;
      var onSubmit = _this.props.onSubmit;
      var activeFileds = active[type];
      currentForm.validateFields(activeFileds, {
        force: true
      }, function (err, values) {
        onSubmit(err, values);
      });
    };

    _this.state = {
      type: props.defaultActiveKey,
      tabs: [],
      active: {}
    };
    return _this;
  }

  _createClass(Login, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          children = _this$props.children;
      var _this$state3 = this.state,
          type = _this$state3.type,
          tabs = _this$state3.tabs;
      var TabChildren = [];
      var otherChildren = [];

      _react.default.Children.forEach(children, function (item) {
        if (!item) {
          return;
        } // eslint-disable-next-line


        if (item.type.typeName === 'LoginTab') {
          TabChildren.push(item);
        } else {
          otherChildren.push(item);
        }
      }); //  const currentForm = Form.useForm();


      return /*#__PURE__*/_react.default.createElement(_loginContext.default.Provider, {
        value: this.getContext()
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)(className, _index.default.login)
      }, /*#__PURE__*/_react.default.createElement(_form.default, {
        noValidate: true,
        onFinish: function onFinish(values) {
          return _this2.handleSubmit(values);
        }
      }, tabs.length ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_tabs.default, {
        animated: false,
        className: _index.default.tabs,
        activeKey: type,
        onChange: this.onSwitch
      }, TabChildren), otherChildren) : children)));
    }
  }]);

  return Login;
}(_react.Component);

Login.propTypes = {
  className: _propTypes.default.string,
  defaultActiveKey: _propTypes.default.string,
  onTabChange: _propTypes.default.func,
  onSubmit: _propTypes.default.func
};
Login.defaultProps = {
  className: '',
  defaultActiveKey: '',
  onTabChange: function onTabChange() {},
  onSubmit: function onSubmit() {}
};
Login.Tab = _LoginTab.default;
Login.Submit = _LoginSubmit.default;
Object.keys(_LoginItem.default).forEach(function (item) {
  Login[item] = _LoginItem.default[item];
});
var _default = Login;
exports.default = _default;