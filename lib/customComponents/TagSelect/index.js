"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/tag/style");

var _tag = _interopRequireDefault(require("antd/es/tag"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _index = _interopRequireDefault(require("./index.less"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var CheckableTag = _tag.default.CheckableTag;

var TagSelectOption = function TagSelectOption(_ref) {
  var children = _ref.children,
      checked = _ref.checked,
      _onChange = _ref.onChange,
      value = _ref.value;
  return /*#__PURE__*/_react.default.createElement(CheckableTag, {
    checked: checked,
    key: value,
    onChange: function onChange(state) {
      return _onChange(value, state);
    }
  }, children);
};

TagSelectOption.isTagSelectOption = true;

var TagSelect = /*#__PURE__*/function (_Component) {
  _inherits(TagSelect, _Component);

  var _super = _createSuper(TagSelect);

  function TagSelect(props) {
    var _this;

    _classCallCheck(this, TagSelect);

    _this = _super.call(this, props);

    _this.onChange = function (value) {
      var onChange = _this.props.onChange;

      if (!('value' in _this.props)) {
        _this.setState({
          value: value
        });
      }

      if (onChange) {
        onChange(value);
      }
    };

    _this.onSelectAll = function (checked) {
      var checkedTags = [];

      if (checked) {
        checkedTags = _this.getAllTags();
      }

      _this.onChange(checkedTags);
    };

    _this.handleTagChange = function (value, checked) {
      var StateValue = _this.state.value;

      var checkedTags = _toConsumableArray(StateValue);

      var index = checkedTags.indexOf(value);

      if (checked && index === -1) {
        checkedTags.push(value);
      } else if (!checked && index > -1) {
        checkedTags.splice(index, 1);
      }

      _this.onChange(checkedTags);
    };

    _this.handleExpand = function () {
      var expand = _this.state.expand;

      _this.setState({
        expand: !expand
      });
    };

    _this.isTagSelectOption = function (node) {
      return node && node.type && (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption');
    };

    _this.state = {
      expand: false,
      value: props.value || props.defaultValue || []
    };
    return _this;
  }

  _createClass(TagSelect, [{
    key: "getAllTags",
    value: function getAllTags() {
      var _this2 = this;

      var children = this.props.children;
      children = _react.default.Children.toArray(children);
      var checkedTags = children.filter(function (child) {
        return _this2.isTagSelectOption(child);
      }).map(function (child) {
        return child.props.value;
      });
      return checkedTags || [];
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames,
          _this3 = this;

      var _this$state = this.state,
          value = _this$state.value,
          expand = _this$state.expand;
      var _this$props = this.props,
          children = _this$props.children,
          hideCheckAll = _this$props.hideCheckAll,
          className = _this$props.className,
          style = _this$props.style,
          expandable = _this$props.expandable;
      var checkedAll = this.getAllTags().length === value.length;
      var cls = (0, _classnames.default)(_index.default.tagSelect, className, (_classNames = {}, _defineProperty(_classNames, _index.default.hasExpandTag, expandable), _defineProperty(_classNames, _index.default.expanded, expand), _classNames));
      return /*#__PURE__*/_react.default.createElement("div", {
        className: cls,
        style: style
      }, hideCheckAll ? null : /*#__PURE__*/_react.default.createElement(CheckableTag, {
        checked: checkedAll,
        key: "tag-select-__all__",
        onChange: this.onSelectAll
      }, "\u5168\u90E8"), value && _react.default.Children.map(children, function (child) {
        if (_this3.isTagSelectOption(child)) {
          return /*#__PURE__*/_react.default.cloneElement(child, {
            key: "tag-select-".concat(child.props.value),
            value: child.props.value,
            checked: value.indexOf(child.props.value) > -1,
            onChange: _this3.handleTagChange
          });
        }

        return child;
      }), expandable && /*#__PURE__*/_react.default.createElement("a", {
        className: _index.default.trigger,
        onClick: this.handleExpand
      }, expand ? '收起' : '展开', expand ? /*#__PURE__*/_react.default.createElement(_icons.UpCircleOutlined, null) : /*#__PURE__*/_react.default.createElement(_icons.DownOutlined, null)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      if ('value' in nextProps) {
        return {
          value: nextProps.value || []
        };
      }

      return null;
    }
  }]);

  return TagSelect;
}(_react.Component);

TagSelect.defaultProps = {
  hideCheckAll: false
};
TagSelect.Option = TagSelectOption;
var _default = TagSelect;
exports.default = _default;