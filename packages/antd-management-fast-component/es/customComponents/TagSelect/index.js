import { _ as _defineProperty } from '../../defineProperty.js';
import { _ as _toConsumableArray } from '../../toConsumableArray.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Tag } from 'antd';
import classNames from 'classnames';
import React, { Component } from 'react';
import { j as iconCollection } from '../../constants.js';
import '@ant-design/icons';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../unsupportedIterableToArray.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CheckableTag = Tag.CheckableTag;
var TagSelectOption = function TagSelectOption(_ref) {
  var children = _ref.children,
    checked = _ref.checked,
    _onChange = _ref.onChange,
    value = _ref.value;
  return /*#__PURE__*/React.createElement(CheckableTag, {
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
      children = React.Children.toArray(children);
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
      var cls = classNames(styles.tagSelect, className, (_classNames = {}, _defineProperty(_classNames, styles.hasExpandTag, expandable), _defineProperty(_classNames, styles.expanded, expand), _classNames));
      return /*#__PURE__*/React.createElement("div", {
        className: cls,
        style: style
      }, hideCheckAll ? null : /*#__PURE__*/React.createElement(CheckableTag, {
        checked: checkedAll,
        key: "tag-select-__all__",
        onChange: this.onSelectAll
      }, "\u5168\u90E8"), value && React.Children.map(children, function (child) {
        if (_this3.isTagSelectOption(child)) {
          return /*#__PURE__*/React.cloneElement(child, {
            key: "tag-select-".concat(child.props.value),
            value: child.props.value,
            checked: value.indexOf(child.props.value) > -1,
            onChange: _this3.handleTagChange
          });
        }
        return child;
      }), expandable && /*#__PURE__*/React.createElement("a", {
        className: styles.trigger,
        onClick: this.handleExpand
      }, expand ? '收起' : '展开', expand ? iconCollection.upCircle : iconCollection.down));
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
}(Component);
TagSelect.defaultProps = {
  hideCheckAll: false
};
TagSelect.Option = TagSelectOption;

export { TagSelect as default };
