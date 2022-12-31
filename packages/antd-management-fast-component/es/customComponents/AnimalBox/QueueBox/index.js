import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../../getPrototypeOf.js';
import { PureComponent } from 'react';
import QueueListBox from '../QueueListBox/index.js';
import '../../../_commonjsHelpers.js';
import '../../../toPropertyKey.js';
import '../../../objectSpread2.js';
import '../../../defineProperty.js';
import 'rc-queue-anim';
import '../../../tools.js';
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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var QueueBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(QueueBox, _PureComponent);
  var _super = _createSuper(QueueBox);
  function QueueBox() {
    _classCallCheck(this, QueueBox);
    return _super.apply(this, arguments);
  }
  _createClass(QueueBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        show = _this$props.show,
        children = _this$props.children;
      return /*#__PURE__*/React.createElement(QueueListBox, {
        show: show,
        items: [{
          hidden: (children || null) == null,
          builder: function builder() {
            return children || null;
          }
        }]
      });
    }
  }]);
  return QueueBox;
}(PureComponent);
QueueBox.defaultProps = {
  show: true
};

export { QueueBox as default };
