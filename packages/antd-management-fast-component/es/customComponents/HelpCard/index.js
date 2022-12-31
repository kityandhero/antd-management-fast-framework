import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Card } from 'antd';
import { PureComponent } from 'react';
import HelpBox from '../HelpBox/index.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../objectSpread2.js';
import '../../defineProperty.js';
import 'classnames';
import '../../tools.js';
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
import '../FunctionComponent/index.js';
import '../../objectWithoutProperties.js';
import '../../extends.js';
import 'rc-texty';
import 'react-json-view';
import 'react-player';
import 'react-syntax-highlighter';
import '../AnimalBox/FadeBox/index.js';
import 'rc-animate';
import '../AnimalBox/QueueBox/index.js';
import '../AnimalBox/QueueListBox/index.js';
import 'rc-queue-anim';
import '../AnimalBox/RotateBox/index.js';
import 'rc-tween-one';
import '../ColorText/index.js';
import '../EllipsisCustom/index.js';
import '../FlexBox/index.js';
import '../FlexText/index.js';
import '../IconInfo/index.js';
import '../Ellipsis/index.js';
import '../ImageBox/index.js';
import '../CustomBase/index.js';
import '../VerticalBox/index.js';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var HelpCard = /*#__PURE__*/function (_PureComponent) {
  _inherits(HelpCard, _PureComponent);
  var _super = _createSuper(HelpCard);
  function HelpCard() {
    _classCallCheck(this, HelpCard);
    return _super.apply(this, arguments);
  }
  _createClass(HelpCard, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        border = _this$props.border,
        compact = _this$props.compact,
        helpBoxProps = _this$props.helpBoxProps;
      return /*#__PURE__*/React.createElement(Card, {
        style: !border ? {
          borderTop: '0',
          borderBottom: '0'
        } : {},
        bodyStyle: compact ? {
          paddingTop: '0',
          paddingBottom: '0'
        } : {
          paddingTop: '12px',
          paddingBottom: '12px'
        }
      }, /*#__PURE__*/React.createElement(HelpBox, helpBoxProps));
    }
  }]);
  return HelpCard;
}(PureComponent);
HelpCard.defaultProps = {
  border: true,
  compact: false,
  helpBoxProps: {
    title: '帮助信息',
    showNumber: true,
    list: []
  }
};

export { HelpCard as default };
