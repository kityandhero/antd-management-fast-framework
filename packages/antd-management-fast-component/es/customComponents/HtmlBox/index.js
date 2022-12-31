import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Empty } from 'antd';
import { PureComponent } from 'react';
import { h as stringIsNullOrWhiteSpace } from '../../tools.js';
import '../../_commonjsHelpers.js';
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

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * 减少使用 dangerouslySetInnerHTML
 */
var HtmlBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(HtmlBox, _PureComponent);
  var _super = _createSuper(HtmlBox);
  function HtmlBox() {
    var _this;
    _classCallCheck(this, HtmlBox);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.renderToHtml = function () {
      var html = _this.props.html;
      if (_this.main) {
        _this.main.innerHTML = html;
      }
    };
    return _this;
  }
  _createClass(HtmlBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderToHtml();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.renderToHtml();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        useEmpty = _this$props.useEmpty,
        html = _this$props.html;
      if (!!useEmpty && stringIsNullOrWhiteSpace(html)) {
        return /*#__PURE__*/React.createElement(Empty, {
          image: Empty.PRESENTED_IMAGE_SIMPLE
        });
      }
      return /*#__PURE__*/React.createElement("span", {
        className: styles.richTextBox,
        ref: function ref(_ref) {
          _this2.main = _ref;
        }
      });
    }
  }]);
  return HtmlBox;
}(PureComponent);
HtmlBox.defaultProps = {
  useEmpty: true,
  html: ''
};

export { HtmlBox as default };
