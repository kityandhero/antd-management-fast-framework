"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _umi = require("umi");

var _tools = require("@/utils/tools");

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

var Base = /*#__PURE__*/function (_PureComponent) {
  _inherits(Base, _PureComponent);

  var _super = _createSuper(Base);

  function Base(props) {
    var _this;

    _classCallCheck(this, Base);

    _this = _super.call(this, props);
    _this.mounted = false;

    _this.doDidMountTask = function () {};

    _this.doWhenGetSnapshotBeforeUpdate = function (preProps, preState) {
      return null;
    };

    _this.doWorkWhenDidUpdate = function (preProps, preState, snapshot) {};

    _this.beforeUnmount = function () {};

    _this.afterUnmount = function () {};

    _this.goToPath = function (path) {
      var location = {
        pathname: path
      };

      _umi.history.push(location);
    };

    _this.redirectToPath = function (path) {
      var location = {
        pathname: path
      };

      _umi.history.replace(location);
    };

    _this.checkHasMore = function (pageNo, pageSize, total) {
      if ((total || 0) <= 0) {
        return false;
      }

      return (pageNo || 0) * (pageSize || 0) < (total || 0);
    };

    _this.mounted = false;
    var defaultState = (0, _tools.defaultBaseState)();
    _this.state = defaultState;
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(Base, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
      this.doDidMountTask();
    } // eslint-disable-next-line react/sort-comp

  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(preProps, preState) {
      return this.doWhenGetSnapshotBeforeUpdate(preProps, preState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps, preState, snapshot) {
      this.doWorkWhenDidUpdate(preProps, preState, snapshot);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.beforeUnmount();
      this.mounted = false;

      this.setState = function () {};

      this.afterUnmount();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return null;
    }
  }]);

  return Base;
}(_react.PureComponent);

var _default = Base;
exports["default"] = _default;