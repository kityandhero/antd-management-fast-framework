import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { createElement, PureComponent } from 'react';
import { j as iconCollection } from '../../constants.js';
import '@ant-design/icons';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var EditableLinkGroup = /*#__PURE__*/function (_PureComponent) {
  _inherits(EditableLinkGroup, _PureComponent);
  var _super = _createSuper(EditableLinkGroup);
  function EditableLinkGroup() {
    _classCallCheck(this, EditableLinkGroup);
    return _super.apply(this, arguments);
  }
  _createClass(EditableLinkGroup, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        links = _this$props.links,
        linkElement = _this$props.linkElement,
        onAdd = _this$props.onAdd;
      return /*#__PURE__*/React.createElement("div", {
        className: styles.linkGroup
      }, links.map(function (link) {
        return /*#__PURE__*/createElement(linkElement, {
          key: "linkGroup-item-".concat(link.id || link.title),
          to: link.href,
          href: link.href
        }, link.title);
      }), /*#__PURE__*/React.createElement(Button, {
        size: "small",
        type: "primary",
        ghost: true,
        onClick: onAdd,
        icon: iconCollection.plus
      }, "\u6DFB\u52A0"));
    }
  }]);
  return EditableLinkGroup;
}(PureComponent);
EditableLinkGroup.propTypes = {
  links: PropTypes.array,
  onAdd: PropTypes.func,
  linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
EditableLinkGroup.defaultProps = {
  links: [],
  onAdd: function onAdd() {},
  linkElement: 'a'
};

export { EditableLinkGroup as default };
