import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Input } from 'antd';
import { PureComponent } from 'react';
import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var EditableItem = /*#__PURE__*/function (_PureComponent) {
  _inherits(EditableItem, _PureComponent);
  var _super = _createSuper(EditableItem);
  function EditableItem(props) {
    var _this;
    _classCallCheck(this, EditableItem);
    _this = _super.call(this, props);
    _this.handleChange = function (e) {
      var value = e.target.value;
      _this.setState({
        value: value
      });
    };
    _this.check = function () {
      _this.setState({
        editable: false
      });
      var value = _this.state.value;
      var onChange = _this.props.onChange;
      if (onChange) {
        onChange(value);
      }
    };
    _this.edit = function () {
      _this.setState({
        editable: true
      });
    };
    _this.state = {
      value: props.value,
      editable: false
    };
    return _this;
  }
  _createClass(EditableItem, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
        value = _this$state.value,
        editable = _this$state.editable;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.editableItem
      }, editable ? /*#__PURE__*/React.createElement("div", {
        className: styles.wrapper
      }, /*#__PURE__*/React.createElement(Input, {
        value: value,
        onChange: this.handleChange,
        onPressEnter: this.check
      }), /*#__PURE__*/React.createElement(CheckOutlined, {
        className: styles.icon,
        onClick: this.check
      })) : /*#__PURE__*/React.createElement("div", {
        className: styles.wrapper
      }, /*#__PURE__*/React.createElement("span", null, value || ' '), /*#__PURE__*/React.createElement(EditOutlined, {
        className: styles.icon,
        onClick: this.edit
      })));
    }
  }]);
  return EditableItem;
}(PureComponent);

export { EditableItem as default };
