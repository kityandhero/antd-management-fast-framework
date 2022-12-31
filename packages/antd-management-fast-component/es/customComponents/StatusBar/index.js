import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Row, Col, Divider } from 'antd';
import { PureComponent } from 'react';
import { m as isArray, k as showRuntimeError } from '../../tools.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
import '../../constants.js';
import '@ant-design/icons';
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
import '../../core.js';
import 'path-to-regexp';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var StatusBar = /*#__PURE__*/function (_PureComponent) {
  _inherits(StatusBar, _PureComponent);
  var _super = _createSuper(StatusBar);
  function StatusBar() {
    _classCallCheck(this, StatusBar);
    return _super.apply(this, arguments);
  }
  _createClass(StatusBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        actionsValue = _this$props.actions,
        extra = _this$props.extra;
      var actionList = actionsValue || [];
      if (!isArray(actionList)) {
        var text = 'actions 必须为数组';
        showRuntimeError({
          message: text
        });
        actionList = [];
      }
      var actionCount = actionList.length;
      actionList = actionList.map(function (o, index) {
        return _objectSpread(_objectSpread({}, o), {
          key: "status_bar_action_".concat(index)
        });
      });
      return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
        flex: "auto",
        style: {
          color: '#999'
        }
      }, actionList.map(function (o, index) {
        if (index !== actionCount - 1) {
          return /*#__PURE__*/React.createElement("div", {
            key: o.key,
            style: {
              display: 'inline-block'
            }
          }, o, /*#__PURE__*/React.createElement(Divider, {
            type: "vertical"
          }));
        }
        return /*#__PURE__*/React.createElement("div", {
          key: o.key,
          style: {
            display: 'inline-block'
          }
        }, o);
      })), extra == null ? null : /*#__PURE__*/React.createElement(Col, {
        flex: true
      }, extra));
    }
  }]);
  return StatusBar;
}(PureComponent);
StatusBar.defaultProps = {
  actions: [],
  extra: null
};

export { StatusBar as default };
