import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Component } from 'react';
import { J as cloneWithoutMethod, e as isEqual } from '../../tools.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../constants.js';
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
import '../../core.js';
import 'path-to-regexp';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var CustomBase = /*#__PURE__*/function (_Component) {
  _inherits(CustomBase, _Component);
  var _super = _createSuper(CustomBase);
  function CustomBase() {
    _classCallCheck(this, CustomBase);
    return _super.apply(this, arguments);
  }
  _createClass(CustomBase, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var sourceProps = cloneWithoutMethod(this.props);
      var targetProps = cloneWithoutMethod(nextProps);
      var isEqualProps = isEqual(sourceProps, targetProps);
      if (!isEqualProps) {
        return true;
      }
      var sourceState = cloneWithoutMethod(this.state);
      var targetState = cloneWithoutMethod(nextState);
      var isEqualState = isEqual(sourceState, targetState);
      if (!isEqualState) {
        return true;
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);
  return CustomBase;
}(Component);

export { CustomBase as default };
