"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CustomBase2 = _interopRequireDefault(require("../../framework/CustomBase"));

var _index = _interopRequireDefault(require("./index.less"));

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

var Countdown = /*#__PURE__*/function (_CustomBase) {
  _inherits(Countdown, _CustomBase);

  var _super = _createSuper(Countdown);

  function Countdown(props) {
    var _this;

    _classCallCheck(this, Countdown);

    _this = _super.call(this, props);
    _this.mounted = false;
    _this.timer = null;

    _this.doWorkWhenDidUpdate = function (preProps, preState, snapshot) {
      var et = _this.state.endTime;

      if (_this.timer != null) {
        clearInterval(_this.timer);
      }

      if (et) {
        var endTime = et.replace(/-/g, '/');

        _this.countFun(endTime);
      }
    };

    _this.countFun = function (time) {
      var et = new Date(time).getTime();
      var sysSecond = et - new Date().getTime();
      _this.timer = setInterval(function () {
        // 防止倒计时出现负数
        if (sysSecond > 1000) {
          sysSecond -= 1000;
          var day = Math.floor(sysSecond / 1000 / 3600 / 24);
          var hour = Math.floor(sysSecond / 1000 / 3600 % 24);
          var minute = Math.floor(sysSecond / 1000 / 60 % 60);
          var second = Math.floor(sysSecond / 1000 % 60);

          _this.setState({
            day: day,
            hour: hour < 10 ? "0".concat(hour) : hour,
            minute: minute < 10 ? "0".concat(minute) : minute,
            second: second < 10 ? "0".concat(second) : second
          });
        } else {
          clearInterval(_this.timer); // 倒计时结束时触发父组件的方法

          var afterEnd = _this.props.afterEnd;

          if (typeof afterEnd === 'function') {
            afterEnd();
          }
        }
      }, 1000);
    };

    _this.state = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      endTime: null
    };
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(Countdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      var et = this.state.endTime;

      if (et) {
        var endTime = et.replace(/-/g, '/');
        this.countFun(endTime);
      }
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timer);
      this.mounted = false;

      this.setState = function () {};
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          title = _this$props.title,
          endDescription = _this$props.endDescription;
      var _this$state = this.state,
          day = _this$state.day,
          hour = _this$state.hour,
          minute = _this$state.minute,
          second = _this$state.second;
      var t = title;
      var des = endDescription;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].countdownContainor
      }, /*#__PURE__*/_react["default"].createElement("span", null, t), ' ', /*#__PURE__*/_react["default"].createElement("span", null, day > 0 ? "".concat(day, "\u5929") : null, day === 0 && hour !== '00' ? "".concat(hour, "\u5C0F\u65F6") : null, day === 0 && hour === '00' && minute !== '00' ? "".concat(minute, ":").concat(second) : null, day === 0 && hour === '00' && minute === '00' && second > 0 ? "".concat(second, "\u79D2") : null, day === 0 && hour === '00' && minute === '00' && second === 0 ? des : null)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var endTime = nextProps.endTime;
      return {
        endTime: endTime
      };
    }
  }]);

  return Countdown;
}(_CustomBase2["default"]);

var _default = Countdown;
exports["default"] = _default;