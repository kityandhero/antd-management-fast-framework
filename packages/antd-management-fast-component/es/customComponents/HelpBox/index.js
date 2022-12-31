import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Divider } from 'antd';
import classNames from 'classnames';
import { PureComponent } from 'react';
import { m as isArray, v as toNumber, h as stringIsNullOrWhiteSpace } from '../../tools.js';
import { buildDescriptionGrid } from '../FunctionComponent/index.js';
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

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var HelpBox = /*#__PURE__*/function (_PureComponent) {
  _inherits(HelpBox, _PureComponent);
  var _super = _createSuper(HelpBox);
  function HelpBox() {
    _classCallCheck(this, HelpBox);
    return _super.apply(this, arguments);
  }
  _createClass(HelpBox, [{
    key: "render",
    value: function render() {
      var _title$showTitle$show = _objectSpread(_objectSpread({}, {
          title: '',
          showTitle: true,
          showNumber: true,
          showDivider: true,
          labelWidth: null,
          list: [],
          useBackground: false,
          hidden: false
        }), this.props || {}),
        titleValue = _title$showTitle$show.title,
        showTitle = _title$showTitle$show.showTitle,
        showDivider = _title$showTitle$show.showDivider,
        showNumber = _title$showTitle$show.showNumber,
        labelWidthValue = _title$showTitle$show.labelWidth,
        listData = _title$showTitle$show.list,
        useBackground = _title$showTitle$show.useBackground,
        hidden = _title$showTitle$show.hidden;
      if (hidden) {
        return null;
      }
      var title = titleValue || '帮助信息';
      var list = [];
      if (isArray(listData)) {
        list = listData.map(function (o, index) {
          var d = _objectSpread(_objectSpread({}, {
            key: '',
            label: '',
            text: '',
            span: 1,
            labelStyle: null,
            contentStyle: null,
            canCopy: false,
            copyData: null
          }), o);
          d.key = "help_box_item_".concat(index);
          d.no = index + 1;
          d.text = d.text || '';
          return d;
        });
      }
      var labelWidth = toNumber(labelWidthValue !== null && labelWidthValue !== void 0 ? labelWidthValue : null);
      var labelWidthStyle = labelWidth > 0 ? "".concat(labelWidth, "px") : 0;
      var customLabelWidth = labelWidth > 0;
      return /*#__PURE__*/React.createElement("div", {
        className: classNames(styles.helpBox, useBackground ? styles.helpBoxBackground : styles.helpBoxNoBackground)
      }, showTitle ? showDivider ? /*#__PURE__*/React.createElement(Divider, {
        orientation: "left",
        plain: true,
        style: {
          marginTop: 4,
          marginBottom: 4,
          color: '#999'
        }
      }, title) : /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: '4px',
          marginBottom: '4px',
          color: '#999',
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '22px',
          height: '22px'
        }
      }, title, "\uFF1A") : null, buildDescriptionGrid({
        list: list.map(function (o) {
          var key = o.key,
            no = o.no,
            label = o.label,
            text = o.text,
            labelStyle = o.labelStyle,
            contentStyle = o.contentStyle,
            span = o.span,
            canCopy = o.canCopy,
            copyData = o.copyData;
          return {
            key: key,
            label: stringIsNullOrWhiteSpace(label) ? showNumber ? no : '•' : label,
            value: text,
            labelStyle: labelStyle || null,
            contentStyle: contentStyle || null,
            span: span,
            canCopy: canCopy,
            copyData: copyData
          };
        }),
        props: {
          bordered: false,
          colon: showNumber,
          column: 1,
          labelStyle: {
            width: customLabelWidth ? labelWidthStyle : showNumber ? '22px' : '12px'
          },
          contentStyle: {
            color: '#999'
          },
          itemStyle: {
            paddingBottom: '4px'
          }
        }
      }));
    }
  }]);
  return HelpBox;
}(PureComponent);
HelpBox.defaultProps = {
  title: '帮助信息',
  showTitle: true,
  showNumber: true,
  labelWidth: null,
  list: [],
  useBackground: false,
  hidden: false
};

export { HelpBox as default };
