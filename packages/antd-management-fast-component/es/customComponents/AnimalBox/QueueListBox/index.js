import { _ as _objectSpread } from '../../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import QueueAnim from 'rc-queue-anim';
import { PureComponent } from 'react';
import { a as isFunction, m as isArray } from '../../../tools.js';
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

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var QueueListBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(QueueListBox, _PureComponent);
  var _super = _createSuper(QueueListBox);
  function QueueListBox() {
    _classCallCheck(this, QueueListBox);
    return _super.apply(this, arguments);
  }
  _createClass(QueueListBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        style = _this$props.style,
        show = _this$props.show,
        itemStyle = _this$props.itemStyle,
        items = _this$props.items;
      var listData = isArray(items) ? items : [];
      var listItem = [];
      listData.forEach(function (o, index) {
        var _builder$hidden$style = _objectSpread(_objectSpread(_objectSpread({}, {
            builder: function builder() {
              return null;
            },
            hidden: false,
            style: null
          }), o), {
            key: "queue_box_item_".concat(index)
          }),
          key = _builder$hidden$style.key,
          builder = _builder$hidden$style.builder,
          hidden = _builder$hidden$style.hidden,
          liStyle = _builder$hidden$style.style;
        if (!hidden) {
          if (isFunction(builder)) {
            var item = builder(key);
            listItem.push( /*#__PURE__*/React.createElement("li", {
              key: key,
              style: _objectSpread(_objectSpread({}, itemStyle || {}), liStyle || {})
            }, item));
          }
        }
      });
      return /*#__PURE__*/React.createElement("div", {
        className: styles.queueBox,
        style: style || null
      }, /*#__PURE__*/React.createElement(QueueAnim, {
        component: "ul",
        type: ['right', 'left'],
        leaveReverse: true
      }, show ? listItem : null));
    }
  }]);
  return QueueListBox;
}(PureComponent);
QueueListBox.defaultProps = {
  show: true,
  style: null,
  items: [],
  itemStyle: null
};

export { QueueListBox as default };
