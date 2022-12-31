import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import { _ as _extends } from '../../extends.js';
import { _ as _objectSpread } from '../../objectSpread2.js';
import { Form, Input, Select, Radio, Typography, Button, Descriptions, Popconfirm, Popover, Tooltip, Divider, Tree, Alert, Row, Col, Space, Tag, TreeSelect, InputNumber, Switch, DatePicker, TimePicker, Badge } from 'antd';
import TextAnimal from 'rc-texty';
import ReactJson from 'react-json-view';
import ReactPlayer from 'react-player';
import { Prism } from 'react-syntax-highlighter';
import { EllipsisOutlined, BorderOuterOutlined } from '@ant-design/icons';
import { j as iconCollection, k as dropdownExpandItemType, p as pageHeaderRenderType, w as whetherNumber, h as datetimeFormat, n as columnFacadeMode, o as defaultEmptyImage, q as listViewConfig } from '../../constants.js';
import 'react';
import { m as isArray, t as toString, n as isBoolean, o as recordObject, i as isObject, a as isFunction, j as showErrorMessage, d as getGuid, p as lowerFirst, h as stringIsNullOrWhiteSpace, q as inCollection, u as isNumber, v as toNumber, l as copyToClipboard, w as sortBy, x as formatDatetime, k as showRuntimeError, y as buildFieldDescription, z as checkFromConfig, A as buildFieldHelper, B as transformListData, C as recordText, D as replaceTargetText, E as formatMoney } from '../../tools.js';
import FadeBox from '../AnimalBox/FadeBox/index.js';
import QueueBox from '../AnimalBox/QueueBox/index.js';
import RotateBox from '../AnimalBox/RotateBox/index.js';
import ColorText from '../ColorText/index.js';
import EllipsisCustom from '../EllipsisCustom/index.js';
import FlexBox from '../FlexBox/index.js';
import FlexText from '../FlexText/index.js';
import IconInfo from '../IconInfo/index.js';
import ImageBox from '../ImageBox/index.js';
import VerticalBox from '../VerticalBox/index.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
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
import '../../getPrototypeOf.js';
import 'rc-animate';
import '../AnimalBox/QueueListBox/index.js';
import 'rc-queue-anim';
import 'rc-tween-one';
import 'classnames';
import '../Ellipsis/index.js';
import '../CustomBase/index.js';

var oneDark = {
  "code[class*=\"language-\"]": {
    "background": "hsl(220, 13%, 18%)",
    "color": "hsl(220, 14%, 71%)",
    "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
    "fontFamily": "\"Fira Code\", \"Fira Mono\", Menlo, Consolas, \"DejaVu Sans Mono\", monospace",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "2",
    "OTabSize": "2",
    "tabSize": "2",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none"
  },
  "pre[class*=\"language-\"]": {
    "background": "hsl(220, 13%, 18%)",
    "color": "hsl(220, 14%, 71%)",
    "textShadow": "0 1px rgba(0, 0, 0, 0.3)",
    "fontFamily": "\"Fira Code\", \"Fira Mono\", Menlo, Consolas, \"DejaVu Sans Mono\", monospace",
    "direction": "ltr",
    "textAlign": "left",
    "whiteSpace": "pre",
    "wordSpacing": "normal",
    "wordBreak": "normal",
    "lineHeight": "1.5",
    "MozTabSize": "2",
    "OTabSize": "2",
    "tabSize": "2",
    "WebkitHyphens": "none",
    "MozHyphens": "none",
    "msHyphens": "none",
    "hyphens": "none",
    "padding": "1em",
    "margin": "0.5em 0",
    "overflow": "auto",
    "borderRadius": "0.3em"
  },
  "code[class*=\"language-\"]::-moz-selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "code[class*=\"language-\"] *::-moz-selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "pre[class*=\"language-\"] *::-moz-selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "code[class*=\"language-\"]::selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "code[class*=\"language-\"] *::selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  "pre[class*=\"language-\"] *::selection": {
    "background": "hsl(220, 13%, 28%)",
    "color": "inherit",
    "textShadow": "none"
  },
  ":not(pre) > code[class*=\"language-\"]": {
    "padding": "0.2em 0.3em",
    "borderRadius": "0.3em",
    "whiteSpace": "normal"
  },
  "comment": {
    "color": "hsl(220, 10%, 40%)",
    "fontStyle": "italic"
  },
  "prolog": {
    "color": "hsl(220, 10%, 40%)"
  },
  "cdata": {
    "color": "hsl(220, 10%, 40%)"
  },
  "doctype": {
    "color": "hsl(220, 14%, 71%)"
  },
  "punctuation": {
    "color": "hsl(220, 14%, 71%)"
  },
  "entity": {
    "color": "hsl(220, 14%, 71%)",
    "cursor": "help"
  },
  "attr-name": {
    "color": "hsl(29, 54%, 61%)"
  },
  "class-name": {
    "color": "hsl(29, 54%, 61%)"
  },
  "boolean": {
    "color": "hsl(29, 54%, 61%)"
  },
  "constant": {
    "color": "hsl(29, 54%, 61%)"
  },
  "number": {
    "color": "hsl(29, 54%, 61%)"
  },
  "atrule": {
    "color": "hsl(29, 54%, 61%)"
  },
  "keyword": {
    "color": "hsl(286, 60%, 67%)"
  },
  "property": {
    "color": "hsl(355, 65%, 65%)"
  },
  "tag": {
    "color": "hsl(355, 65%, 65%)"
  },
  "symbol": {
    "color": "hsl(355, 65%, 65%)"
  },
  "deleted": {
    "color": "hsl(355, 65%, 65%)"
  },
  "important": {
    "color": "hsl(355, 65%, 65%)"
  },
  "selector": {
    "color": "hsl(95, 38%, 62%)"
  },
  "string": {
    "color": "hsl(95, 38%, 62%)"
  },
  "char": {
    "color": "hsl(95, 38%, 62%)"
  },
  "builtin": {
    "color": "hsl(95, 38%, 62%)"
  },
  "inserted": {
    "color": "hsl(95, 38%, 62%)"
  },
  "regex": {
    "color": "hsl(95, 38%, 62%)"
  },
  "attr-value": {
    "color": "hsl(95, 38%, 62%)"
  },
  "attr-value > .token.punctuation": {
    "color": "hsl(95, 38%, 62%)"
  },
  "variable": {
    "color": "hsl(207, 82%, 66%)"
  },
  "operator": {
    "color": "hsl(207, 82%, 66%)"
  },
  "function": {
    "color": "hsl(207, 82%, 66%)"
  },
  "url": {
    "color": "hsl(187, 47%, 55%)"
  },
  "attr-value > .token.punctuation.attr-equals": {
    "color": "hsl(220, 14%, 71%)"
  },
  "special-attr > .token.attr-value > .token.value.css": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-css .token.selector": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".language-css .token.property": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-css .token.function": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-css .token.url > .token.function": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-css .token.url > .token.string.url": {
    "color": "hsl(95, 38%, 62%)"
  },
  ".language-css .token.important": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-css .token.atrule .token.rule": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-javascript .token.operator": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation": {
    "color": "hsl(5, 48%, 51%)"
  },
  ".language-json .token.operator": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-json .token.null.keyword": {
    "color": "hsl(29, 54%, 61%)"
  },
  ".language-markdown .token.url": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-markdown .token.url > .token.operator": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-markdown .token.url-reference.url > .token.string": {
    "color": "hsl(220, 14%, 71%)"
  },
  ".language-markdown .token.url > .token.content": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".language-markdown .token.url > .token.url": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-markdown .token.url-reference.url": {
    "color": "hsl(187, 47%, 55%)"
  },
  ".language-markdown .token.blockquote.punctuation": {
    "color": "hsl(220, 10%, 40%)",
    "fontStyle": "italic"
  },
  ".language-markdown .token.hr.punctuation": {
    "color": "hsl(220, 10%, 40%)",
    "fontStyle": "italic"
  },
  ".language-markdown .token.code-snippet": {
    "color": "hsl(95, 38%, 62%)"
  },
  ".language-markdown .token.bold .token.content": {
    "color": "hsl(29, 54%, 61%)"
  },
  ".language-markdown .token.italic .token.content": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".language-markdown .token.strike .token.content": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".language-markdown .token.strike .token.punctuation": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".language-markdown .token.list.punctuation": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".language-markdown .token.title.important > .token.punctuation": {
    "color": "hsl(355, 65%, 65%)"
  },
  "bold": {
    "fontWeight": "bold"
  },
  "italic": {
    "fontStyle": "italic"
  },
  "namespace": {
    "Opacity": "0.8"
  },
  "token.tab:not(:empty):before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "token.cr:before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "token.lf:before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "token.space:before": {
    "color": "hsla(220, 14%, 71%, 0.15)",
    "textShadow": "none"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item": {
    "marginRight": "0.4em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 9%, 55%)",
    "padding": "0.1em 0.4em",
    "borderRadius": "0.3em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 9%, 55%)",
    "padding": "0.1em 0.4em",
    "borderRadius": "0.3em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 9%, 55%)",
    "padding": "0.1em 0.4em",
    "borderRadius": "0.3em"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  "div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus": {
    "background": "hsl(220, 13%, 28%)",
    "color": "hsl(220, 14%, 71%)"
  },
  ".line-highlight.line-highlight": {
    "background": "hsla(220, 100%, 80%, 0.04)"
  },
  ".line-highlight.line-highlight:before": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 14%, 71%)",
    "padding": "0.1em 0.6em",
    "borderRadius": "0.3em",
    "boxShadow": "0 2px 0 0 rgba(0, 0, 0, 0.2)"
  },
  ".line-highlight.line-highlight[data-end]:after": {
    "background": "hsl(220, 13%, 26%)",
    "color": "hsl(220, 14%, 71%)",
    "padding": "0.1em 0.6em",
    "borderRadius": "0.3em",
    "boxShadow": "0 2px 0 0 rgba(0, 0, 0, 0.2)"
  },
  "pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before": {
    "backgroundColor": "hsla(220, 100%, 80%, 0.04)"
  },
  ".line-numbers.line-numbers .line-numbers-rows": {
    "borderRightColor": "hsla(220, 14%, 71%, 0.15)"
  },
  ".command-line .command-line-prompt": {
    "borderRightColor": "hsla(220, 14%, 71%, 0.15)"
  },
  ".line-numbers .line-numbers-rows > span:before": {
    "color": "hsl(220, 14%, 45%)"
  },
  ".command-line .command-line-prompt > span:before": {
    "color": "hsl(220, 14%, 45%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-1": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-5": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-9": {
    "color": "hsl(355, 65%, 65%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-2": {
    "color": "hsl(95, 38%, 62%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-6": {
    "color": "hsl(95, 38%, 62%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-10": {
    "color": "hsl(95, 38%, 62%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-3": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-7": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-11": {
    "color": "hsl(207, 82%, 66%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-4": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-8": {
    "color": "hsl(286, 60%, 67%)"
  },
  ".rainbow-braces .token.token.punctuation.brace-level-12": {
    "color": "hsl(286, 60%, 67%)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)": {
    "backgroundColor": "hsla(353, 100%, 66%, 0.15)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)": {
    "backgroundColor": "hsla(353, 100%, 66%, 0.15)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(353, 95%, 66%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)": {
    "backgroundColor": "hsla(137, 100%, 55%, 0.15)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)": {
    "backgroundColor": "hsla(137, 100%, 55%, 0.15)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  "pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection": {
    "backgroundColor": "hsla(135, 73%, 55%, 0.25)"
  },
  ".prism-previewer.prism-previewer:before": {
    "borderColor": "hsl(224, 13%, 17%)"
  },
  ".prism-previewer-gradient.prism-previewer-gradient div": {
    "borderColor": "hsl(224, 13%, 17%)",
    "borderRadius": "0.3em"
  },
  ".prism-previewer-color.prism-previewer-color:before": {
    "borderRadius": "0.3em"
  },
  ".prism-previewer-easing.prism-previewer-easing:before": {
    "borderRadius": "0.3em"
  },
  ".prism-previewer.prism-previewer:after": {
    "borderTopColor": "hsl(224, 13%, 17%)"
  },
  ".prism-previewer-flipped.prism-previewer-flipped.after": {
    "borderBottomColor": "hsl(224, 13%, 17%)"
  },
  ".prism-previewer-angle.prism-previewer-angle:before": {
    "background": "hsl(219, 13%, 22%)"
  },
  ".prism-previewer-time.prism-previewer-time:before": {
    "background": "hsl(219, 13%, 22%)"
  },
  ".prism-previewer-easing.prism-previewer-easing": {
    "background": "hsl(219, 13%, 22%)"
  },
  ".prism-previewer-angle.prism-previewer-angle circle": {
    "stroke": "hsl(220, 14%, 71%)",
    "strokeOpacity": "1"
  },
  ".prism-previewer-time.prism-previewer-time circle": {
    "stroke": "hsl(220, 14%, 71%)",
    "strokeOpacity": "1"
  },
  ".prism-previewer-easing.prism-previewer-easing circle": {
    "stroke": "hsl(220, 14%, 71%)",
    "fill": "transparent"
  },
  ".prism-previewer-easing.prism-previewer-easing path": {
    "stroke": "hsl(220, 14%, 71%)"
  },
  ".prism-previewer-easing.prism-previewer-easing line": {
    "stroke": "hsl(220, 14%, 71%)"
  }
};

var styles = undefined;

var _excluded = ["hidden"],
  _excluded2 = ["key"];
var FormItem = Form.Item;
var TextArea = Input.TextArea,
  Password = Input.Password;
var Option = Select.Option;
var RadioGroup = Radio.Group;
var Paragraph = Typography.Paragraph;
var ButtonGroup = Button.Group;
var Description = Descriptions.Item;
function buildPageHeaderTitle(pageName, headerTitlePrefix) {
  var headerTitlePrefixValue = headerTitlePrefix || '';
  var nameList = [];
  if (isArray(pageName)) {
    nameList = pageName.map(function (o, index) {
      return {
        key: "pageName_".concat(index),
        text: toString(o)
      };
    });
  } else {
    nameList = [{
      key: "pageName_1",
      text: toString(pageName)
    }];
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      maxWidth: '700px',
      height: '32px',
      overflow: 'hidden',
      fontSize: '18px',
      lineHeight: '32px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  }, /*#__PURE__*/React.createElement(IconInfo, {
    textPrefix: headerTitlePrefixValue,
    text: /*#__PURE__*/React.createElement(React.Fragment, null, nameList.map(function (o) {
      return /*#__PURE__*/React.createElement("span", {
        key: o.key
      }, o.text);
    })),
    ellipsis: true
  }));
}

/**
 * 构建按钮
 */
function buildButton(_ref) {
  var _ref$key = _ref.key,
    keySource = _ref$key === void 0 ? null : _ref$key,
    _ref$type = _ref.type,
    typeSource = _ref$type === void 0 ? 'default' : _ref$type,
    _ref$size = _ref.size,
    sizeSource = _ref$size === void 0 ? 'default' : _ref$size,
    _ref$text = _ref.text,
    textSource = _ref$text === void 0 ? '按钮' : _ref$text,
    _ref$icon = _ref.icon,
    iconSource = _ref$icon === void 0 ? iconCollection.form : _ref$icon,
    _ref$handleClick = _ref.handleClick,
    handleClickSource = _ref$handleClick === void 0 ? function () {} : _ref$handleClick,
    _ref$hidden = _ref.hidden,
    hiddenSource = _ref$hidden === void 0 ? false : _ref$hidden,
    _ref$danger = _ref.danger,
    dangerSource = _ref$danger === void 0 ? false : _ref$danger,
    _ref$disabled = _ref.disabled,
    disabledSource = _ref$disabled === void 0 ? false : _ref$disabled,
    _ref$confirm = _ref.confirm,
    confirmSource = _ref$confirm === void 0 ? false : _ref$confirm,
    _ref$handleData = _ref.handleData,
    handleDataSource = _ref$handleData === void 0 ? null : _ref$handleData,
    _ref$processing = _ref.processing,
    processingSource = _ref$processing === void 0 ? false : _ref$processing,
    _ref$iconProcessing = _ref.iconProcessing,
    iconProcessingSource = _ref$iconProcessing === void 0 ? iconCollection.loading : _ref$iconProcessing,
    _ref$style = _ref.style,
    styleSource = _ref$style === void 0 ? null : _ref$style,
    _ref$showIcon = _ref.showIcon,
    showIconSource = _ref$showIcon === void 0 ? true : _ref$showIcon;
  var confirmAdjust = false;
  var _key$type$size$text$i = _objectSpread({}, {
      key: keySource !== null && keySource !== void 0 ? keySource : null,
      type: typeSource !== null && typeSource !== void 0 ? typeSource : 'default',
      size: sizeSource !== null && sizeSource !== void 0 ? sizeSource : 'default',
      text: textSource !== null && textSource !== void 0 ? textSource : '按钮',
      icon: iconSource !== null && iconSource !== void 0 ? iconSource : iconCollection.form,
      handleClick: handleClickSource !== null && handleClickSource !== void 0 ? handleClickSource : null,
      danger: dangerSource !== null && dangerSource !== void 0 ? dangerSource : false,
      hidden: hiddenSource !== null && hiddenSource !== void 0 ? hiddenSource : false,
      disabled: disabledSource !== null && disabledSource !== void 0 ? disabledSource : false,
      confirm: confirmSource !== null && confirmSource !== void 0 ? confirmSource : false,
      processing: processingSource !== null && processingSource !== void 0 ? processingSource : false,
      iconProcessing: iconProcessingSource !== null && iconProcessingSource !== void 0 ? iconProcessingSource : iconCollection.loading,
      handleData: handleDataSource !== null && handleDataSource !== void 0 ? handleDataSource : null,
      style: styleSource || null,
      showIcon: showIconSource
    }),
    key = _key$type$size$text$i.key,
    type = _key$type$size$text$i.type,
    size = _key$type$size$text$i.size,
    icon = _key$type$size$text$i.icon,
    text = _key$type$size$text$i.text,
    danger = _key$type$size$text$i.danger,
    disabled = _key$type$size$text$i.disabled,
    hidden = _key$type$size$text$i.hidden,
    confirm = _key$type$size$text$i.confirm,
    handleData = _key$type$size$text$i.handleData,
    handleClick = _key$type$size$text$i.handleClick,
    processing = _key$type$size$text$i.processing,
    iconProcessing = _key$type$size$text$i.iconProcessing,
    style = _key$type$size$text$i.style,
    showIcon = _key$type$size$text$i.showIcon;
  if (hidden) {
    return null;
  }
  confirmAdjust = confirm;
  if (confirmAdjust) {
    if (isBoolean(confirmAdjust)) {
      recordObject({
        key: key,
        type: type,
        size: size,
        icon: icon,
        text: text,
        danger: danger,
        disabled: disabled,
        hidden: hidden,
        confirm: confirm,
        handleData: handleData,
        handleClick: handleClick,
        processing: processing,
        iconProcessing: iconProcessing,
        style: style,
        showIcon: showIcon
      });
      throw new Error('buildMenu : confirm property in menu Items not allow bool when check confirm is true.');
    }
    var _placement$title$okTe = _objectSpread(_objectSpread({}, {
        placement: 'topRight',
        title: '将要进行操作，确定吗？',
        okText: '确定',
        cancelText: '取消'
      }), isObject(confirmAdjust) ? confirmAdjust : {}),
      placement = _placement$title$okTe.placement,
      title = _placement$title$okTe.title,
      handleConfirm = _placement$title$okTe.handleConfirm,
      okText = _placement$title$okTe.okText,
      cancelText = _placement$title$okTe.cancelText;
    confirmAdjust = {
      placement: placement,
      title: title,
      handleConfirm: handleConfirm,
      okText: okText,
      cancelText: cancelText
    };
  } else {
    confirmAdjust = false;
  }
  var ico = processing ? iconProcessing !== null && iconProcessing !== void 0 ? iconProcessing : iconCollection.loading : icon !== null && icon !== void 0 ? icon : iconCollection.form;
  if (confirmAdjust) {
    var _confirmAdjust = confirmAdjust,
      _placement = _confirmAdjust.placement,
      _title = _confirmAdjust.title,
      _okText = _confirmAdjust.okText,
      _cancelText = _confirmAdjust.cancelText;
    return /*#__PURE__*/React.createElement(Popconfirm, {
      key: key !== null && key !== void 0 ? key : undefined,
      placement: _placement,
      title: _title || 'confirm:缺少title配置',
      onConfirm: function onConfirm() {
        if (isFunction(handleClick)) {
          handleClick({
            handleData: handleData !== null && handleData !== void 0 ? handleData : null
          });
        } else {
          var messageText = 'buildButton : handleClick is not function';
          showErrorMessage({
            message: messageText
          });
        }
      },
      okText: _okText,
      cancelText: _cancelText,
      disabled: disabled
    }, /*#__PURE__*/React.createElement(Button, {
      type: type,
      size: size,
      style: style || null,
      danger: danger,
      disabled: disabled
    }, !showIcon ? text : /*#__PURE__*/React.createElement(IconInfo, {
      icon: ico,
      text: text
    })));
  }
  return /*#__PURE__*/React.createElement(Button, {
    key: key !== null && key !== void 0 ? key : undefined,
    style: style || null,
    type: type,
    size: size,
    danger: danger,
    disabled: disabled,
    onClick: function onClick() {
      return handleClick({
        handleData: handleData !== null && handleData !== void 0 ? handleData : null
      });
    }
  }, !showIcon ? text : /*#__PURE__*/React.createElement(IconInfo, {
    icon: ico,
    text: text
  }));
}
function buildDropdownButton(_ref2) {
  var _ref2$key = _ref2.key,
    key = _ref2$key === void 0 ? getGuid() : _ref2$key,
    _ref2$tooltip = _ref2.tooltip,
    tooltip = _ref2$tooltip === void 0 ? false : _ref2$tooltip,
    _ref2$placement = _ref2.placement,
    placement = _ref2$placement === void 0 ? 'bottomRight' : _ref2$placement,
    _ref2$type = _ref2.type,
    typeSource = _ref2$type === void 0 ? 'default' : _ref2$type,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 'small' : _ref2$size,
    _ref2$text = _ref2.text,
    text = _ref2$text === void 0 ? '按钮' : _ref2$text,
    _ref2$icon = _ref2.icon,
    icon = _ref2$icon === void 0 ? iconCollection.form : _ref2$icon,
    r = _ref2.handleData,
    _ref2$arrow = _ref2.arrow,
    arrow = _ref2$arrow === void 0 ? true : _ref2$arrow,
    _ref2$disabled = _ref2.disabled,
    disabled = _ref2$disabled === void 0 ? false : _ref2$disabled,
    _ref2$hidden = _ref2.hidden,
    hidden = _ref2$hidden === void 0 ? false : _ref2$hidden,
    _ref2$confirm = _ref2.confirm,
    confirm = _ref2$confirm === void 0 ? false : _ref2$confirm,
    _ref2$handleButtonCli = _ref2.handleButtonClick,
    handleButtonClick = _ref2$handleButtonCli === void 0 ? null : _ref2$handleButtonCli,
    _ref2$handleMenuClick = _ref2.handleMenuClick,
    handleMenuClick = _ref2$handleMenuClick === void 0 ? function () {} : _ref2$handleMenuClick,
    _ref2$items = _ref2.items,
    items = _ref2$items === void 0 ? [] : _ref2$items,
    _ref2$itemPanelTitle = _ref2.itemPanelTitle,
    itemPanelTitle = _ref2$itemPanelTitle === void 0 ? '' : _ref2$itemPanelTitle;
  return buildDropdown({
    key: key,
    tooltip: tooltip,
    type: typeSource,
    placement: placement,
    size: size,
    text: text,
    icon: icon,
    handleData: r,
    arrow: arrow,
    disabled: disabled,
    hidden: hidden,
    confirm: confirm,
    handleButtonClick: handleButtonClick,
    handleMenuClick: handleMenuClick,
    items: items,
    itemPanelTitle: itemPanelTitle
  });
}
function buildDropdownEllipsis(_ref3) {
  var _ref3$key = _ref3.key,
    key = _ref3$key === void 0 ? getGuid() : _ref3$key,
    _ref3$tooltip = _ref3.tooltip,
    tooltip = _ref3$tooltip === void 0 ? {
      placement: 'top',
      title: '更多操作'
    } : _ref3$tooltip,
    _ref3$type = _ref3.type,
    typeSource = _ref3$type === void 0 ? 'default' : _ref3$type,
    _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 'default' : _ref3$size,
    _ref3$icon = _ref3.icon,
    icon = _ref3$icon === void 0 ? /*#__PURE__*/React.createElement(EllipsisOutlined, {
      style: {
        fontSize: 20,
        verticalAlign: 'top'
      }
    }) : _ref3$icon,
    _ref3$arrow = _ref3.arrow,
    arrow = _ref3$arrow === void 0 ? true : _ref3$arrow,
    _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    _ref3$hidden = _ref3.hidden,
    hidden = _ref3$hidden === void 0 ? false : _ref3$hidden,
    r = _ref3.handleData,
    _ref3$handleMenuClick = _ref3.handleMenuClick,
    handleMenuClick = _ref3$handleMenuClick === void 0 ? function () {} : _ref3$handleMenuClick,
    _ref3$items = _ref3.items,
    items = _ref3$items === void 0 ? [] : _ref3$items,
    _ref3$itemPanelTitle = _ref3.itemPanelTitle,
    itemPanelTitle = _ref3$itemPanelTitle === void 0 ? '' : _ref3$itemPanelTitle;
  return buildDropdown({
    key: key,
    tooltip: tooltip,
    type: typeSource,
    size: size,
    text: '',
    icon: icon,
    handleData: r,
    arrow: arrow,
    disabled: disabled,
    hidden: hidden,
    handleButtonClick: null,
    handleMenuClick: handleMenuClick,
    items: items,
    itemPanelTitle: itemPanelTitle
  });
}
function buildDropdown(_ref4) {
  var _ref4$key = _ref4.key,
    key = _ref4$key === void 0 ? getGuid() : _ref4$key,
    _ref4$tooltip = _ref4.tooltip,
    tooltipSource = _ref4$tooltip === void 0 ? false : _ref4$tooltip,
    _ref4$type = _ref4.type,
    typeSource = _ref4$type === void 0 ? 'default' : _ref4$type,
    _ref4$placement = _ref4.placement,
    placementDropdown = _ref4$placement === void 0 ? 'bottomRight' : _ref4$placement,
    _ref4$size = _ref4.size,
    size = _ref4$size === void 0 ? 'default' : _ref4$size,
    _ref4$text = _ref4.text,
    text = _ref4$text === void 0 ? '按钮' : _ref4$text,
    _ref4$icon = _ref4.icon,
    icon = _ref4$icon === void 0 ? iconCollection.form : _ref4$icon,
    r = _ref4.handleData,
    _ref4$arrow = _ref4.arrow,
    arrow = _ref4$arrow === void 0 ? true : _ref4$arrow,
    _ref4$disabled = _ref4.disabled,
    disabled = _ref4$disabled === void 0 ? false : _ref4$disabled,
    _ref4$hidden = _ref4.hidden,
    hidden = _ref4$hidden === void 0 ? false : _ref4$hidden,
    _ref4$handleButtonCli = _ref4.handleButtonClick,
    handleButtonClick = _ref4$handleButtonCli === void 0 ? null : _ref4$handleButtonCli,
    _ref4$handleMenuClick = _ref4.handleMenuClick,
    handleMenuClick = _ref4$handleMenuClick === void 0 ? function () {} : _ref4$handleMenuClick,
    _ref4$items = _ref4.items,
    items = _ref4$items === void 0 ? [] : _ref4$items,
    _ref4$itemPanelTitle = _ref4.itemPanelTitle,
    itemPanelTitle = _ref4$itemPanelTitle === void 0 ? '' : _ref4$itemPanelTitle,
    _ref4$confirm = _ref4.confirm,
    confirm = _ref4$confirm === void 0 ? false : _ref4$confirm,
    _ref4$processing = _ref4.processing,
    processing = _ref4$processing === void 0 ? false : _ref4$processing,
    _ref4$iconProcessing = _ref4.iconProcessing,
    iconProcessing = _ref4$iconProcessing === void 0 ? iconCollection.loading : _ref4$iconProcessing;
  if (hidden) {
    return null;
  }
  var tooltipAdjust = tooltipSource;
  var otherProps = tooltipAdjust ? {} : {
    key: key || getGuid()
  };
  var placementAdjust = lowerFirst(placementDropdown || 'bottomRight');
  var overlayClassNameAdjust = placementAdjust.startsWith('bottom') ? styles.dropdownExpandOverlayBottom : placementAdjust.startsWith('top') ? styles.dropdownExpandOverlayTop : {};
  var hasHandleButtonClick = false;
  if ((handleButtonClick || null) != null) {
    if (!isFunction(handleButtonClick)) {
      throw new Error('buildDropdown(framework) : handleButtonClick must be function');
    }
    hasHandleButtonClick = true;
  }
  var button = null;
  if (!isArray(items) || items.length === 0) {
    button = buildButton(_objectSpread(_objectSpread({}, {
      type: typeSource || 'default',
      size: size,
      text: text,
      icon: icon,
      handleClick: handleButtonClick,
      hidden: hidden,
      disabled: disabled,
      confirm: confirm,
      handleData: r,
      processing: processing,
      iconProcessing: iconProcessing
    }), otherProps));
  } else if (hasHandleButtonClick) {
    var confirmAdjust = confirm;
    if (confirmAdjust) {
      if (isBoolean(confirmAdjust)) {
        recordObject(arguments[0]);
        throw new Error('buildMenu : confirm property in menu Items not allow bool when check confirm is true.');
      }
      var _placement$title$okTe2 = _objectSpread(_objectSpread({}, {
          placement: 'topLeft',
          title: '将要进行操作，确定吗？',
          okText: '确定',
          cancelText: '取消'
        }), isObject(confirmAdjust) ? confirmAdjust : {}),
        placement = _placement$title$okTe2.placement,
        title = _placement$title$okTe2.title,
        handleConfirm = _placement$title$okTe2.handleConfirm,
        okText = _placement$title$okTe2.okText,
        cancelText = _placement$title$okTe2.cancelText;
      confirmAdjust = {
        placement: placement,
        title: title,
        handleConfirm: handleConfirm,
        okText: okText,
        cancelText: cancelText
      };
    } else {
      confirmAdjust = false;
    }
    if (confirmAdjust) {
      var _confirmAdjust2 = confirmAdjust,
        _placement2 = _confirmAdjust2.placement,
        _title2 = _confirmAdjust2.title,
        _okText2 = _confirmAdjust2.okText,
        _cancelText2 = _confirmAdjust2.cancelText;
      button = /*#__PURE__*/React.createElement(FlexBox, {
        flexAuto: "left",
        style: {
          border: '1px solid #d9d9d9',
          borderRadius: '4px'
        },
        leftStyle: {
          borderRight: '1px solid #d9d9d9'
        },
        left: /*#__PURE__*/React.createElement(Popconfirm, {
          placement: _placement2,
          title: _title2 || 'confirm:缺少title配置',
          onConfirm: function onConfirm() {
            handleButtonClick({
              handleData: r
            });
          },
          okText: _okText2,
          cancelText: _cancelText2,
          disabled: disabled
        }, /*#__PURE__*/React.createElement(Button, {
          type: typeSource || 'default',
          style: {
            border: 0
          },
          size: size !== null && size !== void 0 ? size : 'default',
          disabled: disabled !== null && disabled !== void 0 ? disabled : false
        }, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon || null,
          text: text || ''
        }))),
        right: /*#__PURE__*/React.createElement(Popover, _extends({}, otherProps, {
          placement: placementAdjust,
          arrow: arrow,
          content: buildMenu({
            handleData: r,
            handleMenuClick: handleMenuClick,
            items: items
          }),
          title: itemPanelTitle,
          overlayClassName: overlayClassNameAdjust
        }), /*#__PURE__*/React.createElement(Button, {
          style: {
            height: '100%',
            paddingTop: 0,
            border: 0,
            paddingBottom: 0,
            paddingLeft: 3,
            paddingRight: 3
          }
        }, /*#__PURE__*/React.createElement(VerticalBox, null, /*#__PURE__*/React.createElement(EllipsisOutlined, {
          style: {
            fontSize: 12
          }
        }))))
      });
    } else {
      button = /*#__PURE__*/React.createElement(FlexBox, {
        flexAuto: "left",
        style: {
          border: '1px solid #d9d9d9',
          borderRadius: '4px'
        },
        leftStyle: {
          borderRight: '1px solid #d9d9d9'
        },
        left: /*#__PURE__*/React.createElement(Button, {
          type: typeSource || 'default',
          style: {
            border: 0
          },
          size: size !== null && size !== void 0 ? size : 'default',
          disabled: disabled !== null && disabled !== void 0 ? disabled : false,
          onClick: function onClick() {
            handleButtonClick({
              handleData: r
            });
          }
        }, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon || null,
          text: text || ''
        })),
        right: /*#__PURE__*/React.createElement(Popover, _extends({}, otherProps, {
          placement: placementAdjust,
          arrow: arrow,
          content: buildMenu({
            handleData: r,
            handleMenuClick: handleMenuClick,
            items: items
          }),
          title: itemPanelTitle,
          overlayClassName: overlayClassNameAdjust
        }), /*#__PURE__*/React.createElement(Button, {
          style: {
            height: '100%',
            border: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 3,
            paddingRight: 3
          }
        }, /*#__PURE__*/React.createElement(VerticalBox, null, /*#__PURE__*/React.createElement(EllipsisOutlined, {
          style: {
            fontSize: 12
          }
        }))))
      });
    }
  } else {
    button = disabled ? /*#__PURE__*/React.createElement(Button, {
      type: typeSource || 'default',
      size: size !== null && size !== void 0 ? size : 'default',
      disabled: true
    }, /*#__PURE__*/React.createElement(IconInfo, {
      icon: icon || null,
      text: text || ''
    })) : /*#__PURE__*/React.createElement(Popover, _extends({}, otherProps, {
      placement: placementAdjust,
      arrow: arrow,
      content: buildMenu({
        handleData: r,
        handleMenuClick: handleMenuClick,
        items: items
      }),
      title: itemPanelTitle,
      overlayClassName: overlayClassNameAdjust
    }), /*#__PURE__*/React.createElement(Button, {
      type: typeSource || 'default',
      size: size !== null && size !== void 0 ? size : 'default'
    }, /*#__PURE__*/React.createElement(IconInfo, {
      icon: icon || null,
      text: text || ''
    })));
  }
  if (tooltipAdjust) {
    if (isBoolean(tooltipAdjust)) {
      throw new Error('buildDropdown(framework) : tooltip property in menu Items not allow bool when check tooltip is true.');
    }
    var _placement$title = _objectSpread(_objectSpread({}, {
        placement: 'top',
        title: 'tooltip title need set'
      }), isObject(tooltipAdjust) ? tooltipAdjust : {}),
      placementTooltip = _placement$title.placement,
      _title3 = _placement$title.title;
    return /*#__PURE__*/React.createElement(Tooltip, {
      key: key || getGuid(),
      placement: placementTooltip || 'top',
      title: _title3
    }, button);
  }
  return button;
}
function buildMenu(_ref5) {
  var r = _ref5.handleData,
    _ref5$handleMenuClick = _ref5.handleMenuClick,
    handleMenuClick = _ref5$handleMenuClick === void 0 ? function () {} : _ref5$handleMenuClick,
    _ref5$items = _ref5.items,
    items = _ref5$items === void 0 ? [] : _ref5$items;
  if (!isFunction(handleMenuClick)) {
    throw new Error('buildMenu : handleMenuClick must be function');
  }
  if (!isArray(items)) {
    throw new Error('buildMenu : items must be array');
  }
  var listItem = [];
  (items || []).forEach(function (o) {
    var d = _objectSpread(_objectSpread({}, {
      withDivider: false,
      uponDivider: true,
      key: getGuid(),
      icon: iconCollection.edit,
      text: '',
      disabled: false,
      hidden: false,
      type: dropdownExpandItemType.item,
      color: null,
      confirm: false
    }), o || {});
    var key = d.key,
      disabled = d.disabled,
      hidden = d.hidden,
      withDivider = d.withDivider,
      type = d.type,
      uponDivider = d.uponDivider;
    if (stringIsNullOrWhiteSpace(key)) {
      recordObject(d);
      showErrorMessage({
        message: 'key is not allow empty'
      });
    }
    if (inCollection([dropdownExpandItemType.divider, dropdownExpandItemType.item], type)) {
      if (withDivider && type === dropdownExpandItemType.item) {
        var divider = {
          key: getGuid(),
          icon: null,
          text: '',
          disabled: disabled,
          hidden: hidden,
          type: dropdownExpandItemType.divider
        };
        if (uponDivider) {
          listItem.push(divider);
        }
        listItem.push(d);
        if (!uponDivider) {
          listItem.push(divider);
        }
      } else {
        listItem.push(d);
      }
    }
  });
  listItem = listItem.map(function (o) {
    var d = _objectSpread({}, o || {});
    var confirm = d.confirm;
    if (confirm) {
      if (isBoolean(confirm)) {
        throw new Error('buildMenu : confirm property in menu Items not allow bool when check confirm is true.');
      }
      var _placement$title$hand = _objectSpread(_objectSpread({}, {
          placement: 'topRight',
          title: '将要进行操作，确定吗？',
          handleConfirm: function handleConfirm(_ref6) {
            var key = _ref6.key,
              handleData = _ref6.handleData;
            handleMenuClick({
              key: key,
              handleData: handleData
            });
          },
          okText: '确定',
          cancelText: '取消'
        }), isObject(confirm) ? confirm : {}),
        placement = _placement$title$hand.placement,
        title = _placement$title$hand.title,
        handleConfirm = _placement$title$hand.handleConfirm,
        okText = _placement$title$hand.okText,
        cancelText = _placement$title$hand.cancelText;
      d.confirm = {
        placement: placement,
        title: title,
        handleConfirm: handleConfirm,
        okText: okText,
        cancelText: cancelText
      };
    } else {
      d.confirm = false;
    }
    return d;
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '4px'
    }
  }), listItem.map(function (o) {
    var type = o.type,
      key = o.key,
      icon = o.icon,
      text = o.text,
      disabled = o.disabled,
      hidden = o.hidden,
      confirm = o.confirm,
      color = o.color;
    if (stringIsNullOrWhiteSpace(key)) {
      showErrorMessage({
        message: 'key is not allow empty'
      });
    }
    if (hidden) {
      return null;
    }
    if (type === dropdownExpandItemType.item) {
      if (confirm) {
        var placement = confirm.placement,
          title = confirm.title,
          handleConfirm = confirm.handleConfirm,
          okText = confirm.okText,
          cancelText = confirm.cancelText;
        return /*#__PURE__*/React.createElement(Popconfirm, {
          key: key,
          placement: placement,
          title: title,
          onConfirm: function onConfirm() {
            return handleConfirm({
              key: key,
              handleData: r
            });
          },
          okText: okText,
          cancelText: cancelText,
          disabled: disabled,
          overlayStyle: {
            zIndex: 1060
          }
        }, /*#__PURE__*/React.createElement(Button, {
          className: styles.dropdownExpandItemCustomButton,
          type: "text",
          style: {
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '5px 12px',
            border: 0,
            height: '32px'
          },
          size: "small",
          disabled: disabled
        }, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon || iconCollection.edit,
          text: text,
          style: (color || null) == null ? null : {
            color: color
          }
        })));
      }
      return /*#__PURE__*/React.createElement(Button, {
        key: key,
        className: styles.dropdownExpandItemCustomButton,
        type: "text",
        style: {
          display: 'block',
          width: '100%',
          textAlign: 'left',
          padding: '5px 12px',
          border: 0,
          height: '32px'
        },
        size: "small",
        disabled: disabled,
        onClick: function onClick() {
          return handleMenuClick({
            key: key,
            handleData: r
          });
        }
      }, /*#__PURE__*/React.createElement(IconInfo, {
        icon: icon || iconCollection.edit,
        text: text,
        style: (color || null) == null ? null : {
          color: color
        }
      }));
    }
    if (type === dropdownExpandItemType.divider) {
      return /*#__PURE__*/React.createElement(Divider, {
        key: key,
        style: _objectSpread({
          margin: 0
        }, (color || null) == null ? {} : {
          borderColor: color
        })
      });
    }
    return null;
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '4px'
    }
  }));
}
function buildTree(props) {
  return /*#__PURE__*/React.createElement(Tree, props);
}
function buildAlert(props) {
  return /*#__PURE__*/React.createElement(Alert, props);
}
function buildCustomGrid(_ref7) {
  var _ref7$key = _ref7.key,
    key = _ref7$key === void 0 ? null : _ref7$key,
    list = _ref7.list,
    props = _ref7.props;
  if (isArray(list)) {
    var dataList = list.map(function (o, index) {
      var d = _objectSpread(_objectSpread({}, {}), o);
      d.key = "item_".concat(index);
      return _objectSpread(_objectSpread({}, {
        canCopy: false
      }), d);
    });
    var column = 3;
    var _title$column$labelSt = _objectSpread(_objectSpread({}, {
        title: '',
        column: 3,
        labelStyle: {},
        contentStyle: {},
        emptyValue: null,
        emptyStyle: null,
        bordered: false,
        colon: true,
        size: null,
        ellipsis: true
      }), props || {}),
      title = _title$column$labelSt.title,
      columnSource = _title$column$labelSt.column,
      labelStyleSource = _title$column$labelSt.labelStyle,
      contentStyleSource = _title$column$labelSt.contentStyle,
      globalEmptyValue = _title$column$labelSt.emptyValue,
      globalEmptyStyle = _title$column$labelSt.emptyStyle,
      borderedSource = _title$column$labelSt.bordered,
      colonSource = _title$column$labelSt.colon,
      sizeSource = _title$column$labelSt.size,
      ellipsis = _title$column$labelSt.ellipsis;
    if (!isNumber(columnSource)) {
      column = 3;
    }
    column = toNumber(columnSource);
    if (column <= 0 || column >= 6) {
      column = 3;
    }
    var margin = '16px 24px';
    var paddingBottomNoBorder = '16px';
    var backgroundColor = '';
    if (sizeSource === 'middle') {
      margin = '12px 24px';
      paddingBottomNoBorder = '12px';
    }
    if (sizeSource === 'small') {
      margin = '8px 16px';
      paddingBottomNoBorder = '8px';
    }
    var columnSpan = 24 / column;
    var bordered = borderedSource;
    var colon = bordered ? false : colonSource;
    if (bordered) {
      backgroundColor = '#fafafa';
    }
    var containorStyle = bordered ? {
      borderTop: '1px solid #f0f0f0',
      borderLeft: '1px solid #f0f0f0'
    } : null;
    var labelStyle = _objectSpread(_objectSpread(_objectSpread({}, {
      width: '180px'
    }), labelStyleSource || {}), bordered ? {
      margin: margin
    } : {});
    var contentStyle = bordered ? _objectSpread(_objectSpread(_objectSpread({}, {
      margin: '16px 24px'
    }), contentStyleSource || {}), {
      margin: margin
    }) : {};
    var titleComponent = stringIsNullOrWhiteSpace(title) ? null : /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: '8px',
        color: '#000000d9',
        fontWeight: 500,
        fontSize: '16px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }, /*#__PURE__*/React.createElement(FlexText, {
      text: title
    }));
    return /*#__PURE__*/React.createElement("div", {
      key: key
    }, titleComponent, /*#__PURE__*/React.createElement(Row, {
      style: containorStyle
    }, dataList.map(function (item) {
      var _hidden = _objectSpread(_objectSpread({}, {
          hidden: false
        }), item || {}),
        hidden = _hidden.hidden;
      if (hidden) {
        return null;
      }
      var itemStyle = bordered ? {
        borderRight: '1px solid #f0f0f0',
        borderBottom: '1px solid #f0f0f0'
      } : {
        paddingBottom: paddingBottomNoBorder
      };
      var _key$label$value$empt = _objectSpread(_objectSpread({}, {
          key: getGuid(),
          label: '',
          value: '',
          emptyValue: null,
          emptyStyle: null,
          span: 1,
          canCopy: false,
          copyData: null,
          props: null
        }), item || {}),
        itemKey = _key$label$value$empt.key,
        itemLabel = _key$label$value$empt.label,
        itemValue = _key$label$value$empt.value,
        itemEmptyValue = _key$label$value$empt.emptyValue,
        itemEmptyStyle = _key$label$value$empt.emptyStyle,
        itemSpan = _key$label$value$empt.span,
        itemCanCopy = _key$label$value$empt.canCopy,
        itemCopyData = _key$label$value$empt.copyData,
        itemProps = _key$label$value$empt.props;
      var v = itemValue || itemEmptyValue || globalEmptyValue;
      var isEmpty = (itemValue || itemEmptyValue || globalEmptyValue) == (itemEmptyValue || globalEmptyValue);
      return /*#__PURE__*/React.createElement(Col, _extends({
        key: itemKey,
        style: itemStyle,
        label: itemLabel,
        span: columnSpan * (toNumber(itemSpan) || 1)
      }, itemProps || {}), /*#__PURE__*/React.createElement(FlexBox, {
        flexAuto: "right",
        left: /*#__PURE__*/React.createElement("div", {
          style: labelStyle
        }, "".concat(itemLabel).concat(colon ? '：' : '')),
        leftStyle: _objectSpread(_objectSpread({}, {
          backgroundColor: backgroundColor
        }), bordered ? {
          borderRight: '1px solid #f0f0f0'
        } : {}),
        right: /*#__PURE__*/React.createElement("div", {
          style: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, contentStyle), isEmpty ? globalEmptyStyle || {} : {}), isEmpty ? itemEmptyStyle || {} : {}), {
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            display: '-webkit-box',
            textOverflow: 'ellipsis',
            wordBreak: 'break-all',
            whiteSpace: 'normal'
          }), ellipsis ? {
            WebkitLineClamp: '1'
          } : {})
        }, v, itemCanCopy && (itemCanCopy || null) != null ? /*#__PURE__*/React.createElement("a", {
          style: {
            marginLeft: '10px'
          },
          onClick: function onClick() {
            copyToClipboard(itemCopyData || itemValue);
          }
        }, "[\u590D\u5236]") : null)
      }));
    })));
  }
  return null;
}
function buildDescriptionGrid(_ref8) {
  var _ref8$key = _ref8.key,
    key = _ref8$key === void 0 ? null : _ref8$key,
    list = _ref8.list,
    props = _ref8.props;
  if (isArray(list)) {
    var dataList = list.map(function (o, index) {
      var d = _objectSpread(_objectSpread({}, {
        key: "item_".concat(index)
      }), o);
      return _objectSpread(_objectSpread({}, {
        canCopy: false
      }), d);
    });
    var _labelStyle$contentSt = _objectSpread(_objectSpread({}, {
        labelStyle: null,
        contentStyle: null
      }), props || {}),
      globalLabelStyle = _labelStyle$contentSt.labelStyle,
      globalContentStyle = _labelStyle$contentSt.contentStyle;
    return /*#__PURE__*/React.createElement(Descriptions, _extends({
      key: key
    }, props || {}), dataList.map(function (item) {
      var _label$span$labelStyl = _objectSpread(_objectSpread({}, {
          label: '',
          span: 1,
          labelStyle: null,
          contentStyle: null,
          emptyValue: ''
        }), item),
        itemKey = _label$span$labelStyl.key,
        label = _label$span$labelStyl.label,
        span = _label$span$labelStyl.span,
        labelStyle = _label$span$labelStyl.labelStyle,
        contentStyle = _label$span$labelStyl.contentStyle,
        emptyValue = _label$span$labelStyl.emptyValue;
      return /*#__PURE__*/React.createElement(Description, {
        key: itemKey,
        label: label,
        span: span || 1,
        labelStyle: _objectSpread(_objectSpread({}, globalLabelStyle || {}), labelStyle || {}),
        contentStyle: _objectSpread(_objectSpread({}, globalContentStyle || {}), contentStyle || {})
        // style={{ ...itemStyle, ...(item.style || null) }}
      }, item.value || emptyValue, item.canCopy && (item.canCopy || null) != null ? /*#__PURE__*/React.createElement("a", {
        style: {
          marginLeft: '10px'
        },
        disabled: stringIsNullOrWhiteSpace(item.value || emptyValue),
        onClick: function onClick() {
          if (!stringIsNullOrWhiteSpace(item.value || emptyValue)) {
            copyToClipboard(item.copyData || item.value);
          }
        }
      }, "[\u590D\u5236]") : null);
    }));
  }
  return null;
}
function buildPageHeaderContent(_ref9) {
  var list = _ref9.list;
  if (!isArray(list)) {
    return null;
  }
  var listData = list.map(function (o) {
    var d = _objectSpread(_objectSpread({}, {
      sort: 10000
    }), o);
    return _objectSpread({}, d);
  });
  listData = sortBy(listData, function (o) {
    return o.sort;
  });
  listData = listData.map(function (o, index) {
    var d = _objectSpread(_objectSpread({}, {}), o);
    d.key = "pageHeaderContentItemContainer_".concat(index);
    return _objectSpread({}, d);
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, listData.map(function (o) {
    var type = o.type,
      listItem = o.list;
    if (!isArray(listItem)) {
      return null;
    }
    if (type === pageHeaderRenderType.descriptionGrid) {
      var listGridData = listItem.map(function (one, index) {
        return _objectSpread(_objectSpread({}, {
          key: "".concat(o.key, "_descriptionGridItem_").concat(index)
        }), one);
      });
      return buildDescriptionGrid({
        key: "".concat(o.key, "_descriptionGrid"),
        list: listGridData,
        props: {
          style: {
            marginBottom: '4px'
          },
          size: 'small'
        }
      });
    }
    if (type === pageHeaderRenderType.paragraph) {
      var listParagraph = listItem.map(function (one, index) {
        return _objectSpread(_objectSpread({}, {
          key: "".concat(o.key, "_paragraph_").concat(index)
        }), one);
      });
      return /*#__PURE__*/React.createElement("div", {
        key: "".concat(o.key, "_paragraph_container")
      }, listParagraph.map(function (item) {
        if (stringIsNullOrWhiteSpace(item.paragraph)) {
          return null;
        }
        return /*#__PURE__*/React.createElement(Paragraph, {
          key: item.key
        }, item.paragraph);
      }));
    }
    if (type === pageHeaderRenderType.action) {
      var listAction = listItem.map(function (one, index) {
        return _objectSpread(_objectSpread({}, {
          key: "".concat(o.key, "_action_").concat(index)
        }), one);
      });
      return /*#__PURE__*/React.createElement(Space, {
        key: "".concat(o.key, "_space")
      }, listAction.map(function (item) {
        return item.action;
      }));
    }
    return null;
  }));
}
function buildPageHeaderTagWrapper(Tags) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '24px',
      padding: '0 14px 0 0',
      lineHeight: '24px'
    }
  }, Tags));
}
function pageHeaderExtraContent(data) {
  if ((data || null) == null) {
    return null;
  }
  var v = _objectSpread(_objectSpread({}, {
    textLabel: '描述',
    text: '',
    tileLabel: '时间',
    time: new Date()
  }), data);
  var textStyle = {
    fontSize: '20px'
  };
  return /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    xs: 24,
    sm: 12
  }, /*#__PURE__*/React.createElement("div", null, "\u521B\u5EFA\u65E5\u671F"), /*#__PURE__*/React.createElement("div", {
    style: textStyle
  }, formatDatetime({
    data: v.time,
    format: 'HH:mm:ss',
    defaultValue: '--'
  }), /*#__PURE__*/React.createElement("br", null), formatDatetime({
    data: v.time,
    format: 'YYYY-MM-DD'
  }))), /*#__PURE__*/React.createElement(Col, {
    xs: 24,
    sm: 12
  }, /*#__PURE__*/React.createElement("div", null, v.textLabel), /*#__PURE__*/React.createElement("div", {
    style: textStyle
  }, v.text)));
}
function buildMenuHeaderRender(_ref10) {
  var logoDom = _ref10.logoDom,
    collapsed = _ref10.collapsed,
    navTheme = _ref10.navTheme,
    shortName = _ref10.shortName;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(FlexBox, {
    flexAuto: "right",
    left: logoDom,
    right: collapsed ? null : /*#__PURE__*/React.createElement(VerticalBox, {
      align: "center",
      alignJustify: "start",
      style: {
        height: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, {
        margin: ' 0 0 0 12px',
        fontSize: '20px',
        color: 'white',
        fontWeight: '600',
        lineHeight: '32px',
        overflow: 'hidden',
        height: '100%',
        whiteSpace: 'nowrap'
      }), navTheme === 'light' ? {
        color: '#000000d9'
      } : {})
    }, shortName || '应用简称'))
  }));
}
function buildButtonGroup(_ref11) {
  var _ref11$buttons = _ref11.buttons,
    buttons = _ref11$buttons === void 0 ? [] : _ref11$buttons;
  if (!isArray(buttons) || buttons.length <= 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement(ButtonGroup, null, buttons.map(function (item) {
    var _hidden$item = _objectSpread(_objectSpread({}, {
        hidden: false
      }), item),
      hidden = _hidden$item.hidden;
    if (hidden) {
      return null;
    }
    return buildDropdown(item);
  }));
}
function buildListViewItemExtra(_ref12) {
  var align = _ref12.align;
    _ref12.index;
    var imageUrl = _ref12.imageUrl,
    emptyImageUrl = _ref12.emptyImageUrl,
    _ref12$width = _ref12.width,
    width = _ref12$width === void 0 ? '100px' : _ref12$width;
  return /*#__PURE__*/React.createElement(VerticalBox, {
    align: align || 'bottom',
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: width
    }
  }, /*#__PURE__*/React.createElement(ImageBox, {
    src: imageUrl || emptyImageUrl,
    loadingEffect: true,
    errorOverlayVisible: true,
    showErrorIcon: false,
    fillHeight: false,
    imageBoxStyle: {
      boxShadow: '0 1px 4px #ccc, 0 0 40px #ccc inset',
      padding: '4px'
    },
    alt: "",
    preview: true
  })));
}
function buildTagList(_ref13) {
  var _ref13$list = _ref13.list,
    list = _ref13$list === void 0 ? [] : _ref13$list;
  if (!isArray(list)) {
    return null;
  }
  if (list.length === 0) {
    return null;
  }
  var tagList = [];
  list.forEach(function (o, index) {
    var _key$color$text$hidde = _objectSpread(_objectSpread({}, {
        key: "pageHeaderTag_".concat(index),
        color: '#000',
        text: '未知',
        hidden: false
      }), o || {}),
      key = _key$color$text$hidde.key,
      color = _key$color$text$hidde.color,
      text = _key$color$text$hidde.text,
      hidden = _key$color$text$hidde.hidden;
    if (!hidden) {
      tagList.push({
        key: key,
        color: color,
        text: text
      });
    }
  });
  if (tagList.length <= 0) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Space, null, tagList.map(function (o) {
    var key = o.key,
      text = o.text,
      color = o.color;
    return /*#__PURE__*/React.createElement(Tag, {
      key: key,
      color: color
    }, /*#__PURE__*/React.createElement(TextAnimal, {
      type: "left",
      mode: "smooth"
    }, text));
  }));
}
function buildIconInfoList(_ref14) {
  var _ref14$list = _ref14.list,
    list = _ref14$list === void 0 ? [] : _ref14$list;
  if (!isArray(list)) {
    return [];
  }
  if (list.length === 0) {
    return [];
  }
  var l = [];
  list.forEach(function (o, index) {
    var _IconInfo$defaultProp = _objectSpread(_objectSpread(_objectSpread({}, IconInfo.defaultProps), o || {}), {
        key: "icon_info_item_".concat(index)
      }),
      hidden = _IconInfo$defaultProp.hidden,
      other = _objectWithoutProperties(_IconInfo$defaultProp, _excluded);
    if (!hidden) {
      l.push(_objectSpread({}, other));
    }
  });
  if (l.length <= 0) {
    return [];
  }
  return l.map(function (o) {
    var key = o.key,
      other = _objectWithoutProperties(o, _excluded2);
    return /*#__PURE__*/React.createElement(IconInfo, _extends({
      key: key
    }, other));
  });
}
function buildListViewItemActionSelect(_ref15) {
  _ref15.index;
    var _ref15$confirm = _ref15.confirm,
    confirm = _ref15$confirm === void 0 ? false : _ref15$confirm,
    selectData = _ref15.selectData,
    selectCallback = _ref15.selectCallback;
  if (!isFunction(selectCallback)) {
    var text = 'selectCallback 不是有效的回调函数';
    showRuntimeError({
      message: text
    });
  }
  return buildButton(_objectSpread({}, {
    confirm: confirm,
    size: 'small',
    type: 'link',
    icon: iconCollection["import"],
    text: '选取',
    showIcon: true,
    handleClick: function handleClick(_ref16) {
      var handleData = _ref16.handleData;
      if (isFunction(selectCallback)) {
        selectCallback(handleData);
      }
    },
    handleData: selectData
  }));
}
function buildRadioGroup(_ref17) {
  var _ref17$value = _ref17.value,
    value = _ref17$value === void 0 ? null : _ref17$value,
    _ref17$defaultValue = _ref17.defaultValue,
    defaultValue = _ref17$defaultValue === void 0 ? null : _ref17$defaultValue,
    _ref17$style = _ref17.style,
    style = _ref17$style === void 0 ? null : _ref17$style,
    _ref17$button = _ref17.button,
    button = _ref17$button === void 0 ? false : _ref17$button,
    _ref17$buttonStyle = _ref17.buttonStyle,
    buttonStyle = _ref17$buttonStyle === void 0 ? null : _ref17$buttonStyle,
    list = _ref17.list,
    _ref17$adjustListData = _ref17.adjustListDataCallback,
    adjustListDataCallback = _ref17$adjustListData === void 0 ? null : _ref17$adjustListData,
    _ref17$onChange = _ref17.onChange,
    onChange = _ref17$onChange === void 0 ? null : _ref17$onChange;
  return /*#__PURE__*/React.createElement(Radio.Group, {
    value: value || null,
    onChange: onChange || null,
    defaultValue: defaultValue || null,
    buttonStyle: buttonStyle || null,
    style: style || null
  }, buildRadioItem({
    button: button,
    list: list,
    adjustListDataCallback: adjustListDataCallback
  }));
}
function buildRadioItem(_ref18) {
  var _ref18$button = _ref18.button,
    button = _ref18$button === void 0 ? false : _ref18$button,
    list = _ref18.list,
    _ref18$adjustListData = _ref18.adjustListDataCallback,
    adjustListDataCallback = _ref18$adjustListData === void 0 ? null : _ref18$adjustListData;
  var listData = list || [];
  if (isFunction(adjustListDataCallback)) {
    listData = adjustListDataCallback(listData);
  }
  var listRadio = [];
  if (listData.length > 0) {
    listData.forEach(function (item) {
      var _name$flag$availabili = _objectSpread(_objectSpread({}, {
          name: '',
          flag: '',
          availability: whetherNumber.yes
        }), item || {}),
        name = _name$flag$availabili.name,
        flag = _name$flag$availabili.flag,
        availability = _name$flag$availabili.availability;
      var key = "".concat(flag, "_").concat(name);
      var radio = button ? /*#__PURE__*/React.createElement(Radio.Button, {
        key: key,
        value: flag,
        disabled: toNumber(availability) !== whetherNumber.yes
      }, name) : /*#__PURE__*/React.createElement(Radio, {
        key: key,
        value: flag,
        disabled: toNumber(availability) !== whetherNumber.yes
      }, name);
      listRadio.push(radio);
    });
    return listRadio;
  }
  return null;
}

/**
 *build custom radio group
 */
function buildCustomRadio(_ref19) {
  var label = _ref19.label,
    _ref19$value = _ref19.value,
    value = _ref19$value === void 0 ? null : _ref19$value,
    _ref19$separator = _ref19.separator,
    separator = _ref19$separator === void 0 ? '：' : _ref19$separator,
    _ref19$size = _ref19.size,
    size = _ref19$size === void 0 ? 'middle' : _ref19$size,
    renderItemFunction = _ref19.renderItemFunction,
    _ref19$onChangeCallba = _ref19.onChangeCallback,
    onChangeCallback = _ref19$onChangeCallba === void 0 ? null : _ref19$onChangeCallba,
    _ref19$otherProps = _ref19.otherProps,
    otherProps = _ref19$otherProps === void 0 ? null : _ref19$otherProps;
  var otherRadioProps = _objectSpread(_objectSpread({}, {
    placeholder: buildFieldDescription(label, '选择'),
    style: {
      width: '100%'
    },
    size: size,
    value: value,
    onChange: function onChange(e) {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(e);
      }
    }
  }), otherProps || {});
  return /*#__PURE__*/React.createElement(FlexBox, {
    flexAuto: "right",
    left: stringIsNullOrWhiteSpace(label || '') ? null : /*#__PURE__*/React.createElement(VerticalBox, {
      align: "center",
      alignJustify: "start",
      style: {
        height: '100%'
      }
    }, "".concat(label).concat(separator)),
    right: /*#__PURE__*/React.createElement(RadioGroup, otherRadioProps, isFunction(renderItemFunction) ? renderItemFunction() : null)
  });
}
function buildFormRadio(_ref20) {
  var label = _ref20.label,
    name = _ref20.name,
    renderItemFunction = _ref20.renderItemFunction,
    _ref20$helper = _ref20.helper,
    helper = _ref20$helper === void 0 ? null : _ref20$helper,
    _ref20$onChangeCallba = _ref20.onChangeCallback,
    onChangeCallback = _ref20$onChangeCallba === void 0 ? null : _ref20$onChangeCallba,
    _ref20$formItemLayout = _ref20.formItemLayout,
    formItemLayout = _ref20$formItemLayout === void 0 ? null : _ref20$formItemLayout,
    _ref20$required = _ref20.required,
    required = _ref20$required === void 0 ? false : _ref20$required,
    _ref20$otherProps = _ref20.otherProps,
    otherProps = _ref20$otherProps === void 0 ? null : _ref20$otherProps;
  var otherRadioProps = _objectSpread(_objectSpread({}, {
    placeholder: buildFieldDescription(label, '选择'),
    style: {
      width: '100%'
    },
    onChange: function onChange(e) {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(e);
      }
    }
  }), otherProps || {});
  var resultCheck = checkFromConfig({
    label: label,
    name: name,
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout || {}, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label, '选择')
    }]
  }), /*#__PURE__*/React.createElement(RadioGroup, otherRadioProps, isFunction(renderItemFunction) ? renderItemFunction() : null));
}
function buildOptionItem(_ref21) {
  var list = _ref21.list,
    _ref21$adjustListData = _ref21.adjustListDataCallback,
    adjustListDataCallback = _ref21$adjustListData === void 0 ? null : _ref21$adjustListData;
  var listData = list || [];
  if (isFunction(adjustListDataCallback)) {
    listData = adjustListDataCallback(listData);
  }
  var listOption = [];
  if (listData.length > 0) {
    listData.forEach(function (item) {
      var _name$flag$descriptio = _objectSpread(_objectSpread({}, {
          name: '',
          flag: '',
          description: '',
          alias: '',
          availability: whetherNumber.yes
        }), item || {}),
        name = _name$flag$descriptio.name,
        flag = _name$flag$descriptio.flag,
        alias = _name$flag$descriptio.alias,
        description = _name$flag$descriptio.description,
        availability = _name$flag$descriptio.availability;
      if (stringIsNullOrWhiteSpace(toString(name))) {
        var text = 'name 不能为空';
        showRuntimeError({
          message: text
        });
      }
      if (stringIsNullOrWhiteSpace(toString(flag))) {
        var _text = 'flag 不能为空';
        showRuntimeError({
          message: _text
        });
      }
      listOption.push( /*#__PURE__*/React.createElement(Option, {
        key: "".concat(flag, "_").concat(name),
        title: "".concat(alias || name).concat(stringIsNullOrWhiteSpace(description || '') ? '' : "[".concat(description, "]")),
        value: flag,
        disabled: toNumber(availability) !== whetherNumber.yes
      }, name));
    });
    return listOption;
  }
  return null;
}
function buildCustomSelect(_ref22) {
  var label = _ref22.label,
    _ref22$value = _ref22.value,
    value = _ref22$value === void 0 ? null : _ref22$value,
    _ref22$separator = _ref22.separator,
    separator = _ref22$separator === void 0 ? '：' : _ref22$separator,
    _ref22$size = _ref22.size,
    size = _ref22$size === void 0 ? 'middle' : _ref22$size,
    renderItemFunction = _ref22.renderItemFunction,
    _ref22$onChangeCallba = _ref22.onChangeCallback,
    onChangeCallback = _ref22$onChangeCallba === void 0 ? null : _ref22$onChangeCallba,
    _ref22$otherProps = _ref22.otherProps,
    otherProps = _ref22$otherProps === void 0 ? null : _ref22$otherProps;
  var otherSelectProps = _objectSpread(_objectSpread({}, {
    placeholder: buildFieldDescription(label, '选择') || '请选择',
    size: size,
    value: value,
    style: {
      width: '100%'
    },
    onChange: function onChange(v, option) {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(v, option);
      }
    }
  }), otherProps || {});
  return /*#__PURE__*/React.createElement(FlexBox, {
    flexAuto: "right",
    left: stringIsNullOrWhiteSpace(label || '') ? null : /*#__PURE__*/React.createElement(VerticalBox, {
      align: "center",
      alignJustify: "start",
      style: {
        height: '100%'
      }
    }, "".concat(label).concat(separator)),
    right: /*#__PURE__*/React.createElement(Select, otherSelectProps, isFunction(renderItemFunction) ? renderItemFunction() : null)
  });
}
function buildTreeSelect(_ref23) {
  var v = _ref23.value,
    _ref23$placeholder = _ref23.placeholder,
    placeholder = _ref23$placeholder === void 0 ? '' : _ref23$placeholder,
    _ref23$onChangeCallba = _ref23.onChangeCallback,
    onChangeCallback = _ref23$onChangeCallba === void 0 ? null : _ref23$onChangeCallba,
    _ref23$otherProps = _ref23.otherProps,
    otherProps = _ref23$otherProps === void 0 ? {} : _ref23$otherProps,
    _ref23$listData = _ref23.listData,
    listData = _ref23$listData === void 0 ? [] : _ref23$listData,
    _ref23$dataConvert = _ref23.dataConvert,
    dataConvert = _ref23$dataConvert === void 0 ? null : _ref23$dataConvert;
  var adjustOtherProps = _objectSpread(_objectSpread(_objectSpread({}, {
    style: {
      width: '100%'
    },
    showSearch: true,
    allowClear: true,
    treeLine: true,
    placeholder: placeholder
  }), otherProps || {}), {
    value: v || null
  });
  var listDataSource = isArray(listData) ? listData : [];
  var listDataAdjust = !isFunction(dataConvert) ? listDataSource : transformListData({
    list: listDataSource,
    convert: dataConvert,
    recursiveKey: 'children'
  });
  adjustOtherProps.treeData = listDataAdjust;
  adjustOtherProps.onChange = function (value, label, extra) {
    if (isFunction(onChangeCallback)) {
      onChangeCallback({
        value: value,
        label: label,
        extra: extra,
        treeData: listDataAdjust,
        listData: listData
      });
    }
  };
  return /*#__PURE__*/React.createElement(TreeSelect, adjustOtherProps);
}
function buildFormSelect(_ref24) {
  var label = _ref24.label,
    name = _ref24.name,
    renderItemFunction = _ref24.renderItemFunction,
    _ref24$helper = _ref24.helper,
    helper = _ref24$helper === void 0 ? null : _ref24$helper,
    _ref24$onChangeCallba = _ref24.onChangeCallback,
    onChangeCallback = _ref24$onChangeCallba === void 0 ? null : _ref24$onChangeCallba,
    _ref24$formItemLayout = _ref24.formItemLayout,
    formItemLayout = _ref24$formItemLayout === void 0 ? null : _ref24$formItemLayout,
    _ref24$required = _ref24.required,
    required = _ref24$required === void 0 ? false : _ref24$required,
    _ref24$otherProps = _ref24.otherProps,
    otherProps = _ref24$otherProps === void 0 ? null : _ref24$otherProps;
  var otherSelectProps = _objectSpread(_objectSpread({}, {
    placeholder: buildFieldDescription(label, '选择') || '请选择',
    style: {
      width: '100%'
    },
    onChange: function onChange(v, option) {
      if (isFunction(onChangeCallback)) {
        onChangeCallback(v, option);
      }
    }
  }), otherProps || {});
  var resultCheck = checkFromConfig({
    label: label,
    name: name,
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout || {}, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label, '选择')
    }]
  }), /*#__PURE__*/React.createElement(Select, otherSelectProps, isFunction(renderItemFunction) ? renderItemFunction() : null));
}
function buildSearchFormSelect(_ref25) {
  var label = _ref25.label,
    name = _ref25.name,
    options = _ref25.options,
    _ref25$helper = _ref25.helper,
    helper = _ref25$helper === void 0 ? null : _ref25$helper;
  var resultCheck = checkFromConfig({
    label: label,
    name: name,
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, {
    label: resultCheck.label,
    name: resultCheck.name,
    rules: [{
      required: false,
      message: buildFieldDescription(resultCheck.label, '选择')
    }],
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: buildFieldDescription(resultCheck.label, '选择'),
    style: {
      width: '100%'
    }
  }, options));
}
function buildFormNowTimeField(_ref26) {
  var _ref26$label = _ref26.label,
    label = _ref26$label === void 0 ? '添加时间' : _ref26$label,
    _ref26$helper = _ref26.helper,
    helper = _ref26$helper === void 0 ? '数据的添加时间' : _ref26$helper,
    _ref26$formItemLayout = _ref26.formItemLayout,
    formItemLayout = _ref26$formItemLayout === void 0 ? null : _ref26$formItemLayout;
  var _helper$label$formIte = _objectSpread(_objectSpread({}, {
      helper: '数据的添加时间',
      label: '添加时间',
      formItemLayout: null
    }), {
      label: label,
      helper: helper,
      formItemLayout: formItemLayout
    }),
    labelChanged = _helper$label$formIte.label,
    helperChanged = _helper$label$formIte.helper,
    formItemLayoutChanged = _helper$label$formIte.formItemLayout;
  var resultCheck = checkFromConfig({
    label: labelChanged || '添加时间',
    name: '',
    helper: helperChanged
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayoutChanged || {}, {
    label: resultCheck.label,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
  }), /*#__PURE__*/React.createElement(Input, {
    value: formatDatetime({
      data: new Date(),
      format: datetimeFormat.yearMonthDayHourMinute
    }),
    addonBefore: iconCollection.form,
    disabled: true,
    placeholder: buildFieldDescription(resultCheck.label)
  }));
}
function buildFormCreateTimeField(_ref27) {
  var _ref27$name = _ref27.name,
    name = _ref27$name === void 0 ? 'createTime' : _ref27$name,
    _ref27$helper = _ref27.helper,
    helper = _ref27$helper === void 0 ? '数据的添加时间' : _ref27$helper,
    _ref27$label = _ref27.label,
    label = _ref27$label === void 0 ? '添加时间' : _ref27$label,
    _ref27$formItemLayout = _ref27.formItemLayout,
    formItemLayout = _ref27$formItemLayout === void 0 ? null : _ref27$formItemLayout;
  var title = label || '添加时间';
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout || {}, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
  }), /*#__PURE__*/React.createElement(Input, {
    addonBefore: iconCollection.form,
    disabled: true,
    placeholder: buildFieldDescription(resultCheck.label)
  }));
}
function buildFormUpdateTimeField(_ref28) {
  var _ref28$name = _ref28.name,
    name = _ref28$name === void 0 ? 'updateTime' : _ref28$name,
    _ref28$helper = _ref28.helper,
    helper = _ref28$helper === void 0 ? '数据的最后修改时间' : _ref28$helper,
    _ref28$label = _ref28.label,
    label = _ref28$label === void 0 ? '最后修改时间' : _ref28$label,
    _ref28$formItemLayout = _ref28.formItemLayout,
    formItemLayout = _ref28$formItemLayout === void 0 ? null : _ref28$formItemLayout;
  var title = label || '最后修改时间';
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout || {}, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
  }), /*#__PURE__*/React.createElement(Input, {
    addonBefore: iconCollection.form,
    disabled: true,
    placeholder: buildFieldDescription(resultCheck.label)
  }));
}
function buildSearchInput(_ref29) {
  var label = _ref29.label,
    name = _ref29.name,
    _ref29$helper = _ref29.helper,
    helper = _ref29$helper === void 0 ? null : _ref29$helper,
    _ref29$icon = _ref29.icon,
    icon = _ref29$icon === void 0 ? iconCollection.form : _ref29$icon,
    _ref29$inputProps = _ref29.inputProps,
    inputProps = _ref29$inputProps === void 0 ? {} : _ref29$inputProps,
    _ref29$canOperate = _ref29.canOperate,
    canOperate = _ref29$canOperate === void 0 ? true : _ref29$canOperate,
    _ref29$formItemLayout = _ref29.formItemLayout,
    formItemLayout = _ref29$formItemLayout === void 0 ? {} : _ref29$formItemLayout;
  var title = label;
  var otherInputProps = _objectSpread(_objectSpread({}, {
    addonBefore: icon,
    placeholder: buildFieldDescription(title, '输入')
  }), inputProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
    }), /*#__PURE__*/React.createElement(Input, otherInputProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
  }), /*#__PURE__*/React.createElement(Input, otherInputProps));
}
function buildSearchInputNumber(_ref30) {
  var label = _ref30.label,
    name = _ref30.name,
    _ref30$helper = _ref30.helper,
    helper = _ref30$helper === void 0 ? null : _ref30$helper,
    _ref30$icon = _ref30.icon,
    icon = _ref30$icon === void 0 ? iconCollection.form : _ref30$icon,
    _ref30$inputProps = _ref30.inputProps,
    inputProps = _ref30$inputProps === void 0 ? {} : _ref30$inputProps,
    _ref30$canOperate = _ref30.canOperate,
    canOperate = _ref30$canOperate === void 0 ? true : _ref30$canOperate,
    _ref30$formItemLayout = _ref30.formItemLayout,
    formItemLayout = _ref30$formItemLayout === void 0 ? {} : _ref30$formItemLayout;
  var title = label;
  var otherInputProps = _objectSpread(_objectSpread({}, {
    addonBefore: icon,
    style: {
      width: '100%'
    },
    min: 0,
    placeholder: buildFieldDescription(title, '输入')
  }), inputProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
    }), /*#__PURE__*/React.createElement(InputNumber, otherInputProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
  }), /*#__PURE__*/React.createElement(InputNumber, otherInputProps));
}
function buildFormDisplay(_ref31) {
  var label = _ref31.label,
    content = _ref31.content,
    _ref31$formItemLayout = _ref31.formItemLayout,
    formItemLayout = _ref31$formItemLayout === void 0 ? {} : _ref31$formItemLayout,
    _ref31$useDisplayBoxS = _ref31.useDisplayBoxStyle,
    useDisplayBoxStyle = _ref31$useDisplayBoxS === void 0 ? true : _ref31$useDisplayBoxS;
  var title = label;
  var labelText = 'object';
  if (isObject(title)) {
    var text = 'label必须为文本';
    showRuntimeError({
      message: text
    });
    recordObject(label);
  } else {
    labelText = title;
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: labelText
  }), /*#__PURE__*/React.createElement("div", {
    style: useDisplayBoxStyle ? {
      padding: '4px 0 4px 0'
    } : {}
  }, content));
}
function buildFormHiddenWrapper(_ref32) {
  var children = _ref32.children,
    _ref32$hidden = _ref32.hidden,
    hidden = _ref32$hidden === void 0 ? true : _ref32$hidden;
  if (hidden) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'hidden'
      }
    }, children);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
}
function buildFormInputFieldData(_ref33) {
  var fieldData = _ref33.fieldData,
    _ref33$required = _ref33.required,
    required = _ref33$required === void 0 ? false : _ref33$required,
    _ref33$icon = _ref33.icon,
    icon = _ref33$icon === void 0 ? iconCollection.form : _ref33$icon,
    _ref33$inputProps = _ref33.inputProps,
    inputProps = _ref33$inputProps === void 0 ? {} : _ref33$inputProps,
    _ref33$canOperate = _ref33.canOperate,
    canOperate = _ref33$canOperate === void 0 ? true : _ref33$canOperate,
    _ref33$formItemLayout = _ref33.formItemLayout,
    formItemLayout = _ref33$formItemLayout === void 0 ? {} : _ref33$formItemLayout,
    _ref33$reminderPrefix = _ref33.reminderPrefix,
    reminderPrefix = _ref33$reminderPrefix === void 0 ? '输入' : _ref33$reminderPrefix,
    _ref33$hidden = _ref33.hidden,
    hidden = _ref33$hidden === void 0 ? false : _ref33$hidden;
  var _label$name$helper = _objectSpread(_objectSpread({}, {
      label: null,
      name: null,
      helper: null
    }), fieldData || {}),
    label = _label$name$helper.label,
    name = _label$name$helper.name,
    helper = _label$name$helper.helper;
  return buildFormInput({
    label: label || null,
    name: name || null,
    required: required,
    helper: helper || null,
    icon: icon,
    inputProps: inputProps,
    canOperate: canOperate,
    formItemLayout: formItemLayout,
    reminderPrefix: reminderPrefix,
    hidden: hidden
  });
}
function buildFormInput(_ref34) {
  var label = _ref34.label,
    name = _ref34.name,
    _ref34$required = _ref34.required,
    required = _ref34$required === void 0 ? false : _ref34$required,
    _ref34$helper = _ref34.helper,
    helper = _ref34$helper === void 0 ? null : _ref34$helper,
    _ref34$icon = _ref34.icon,
    icon = _ref34$icon === void 0 ? iconCollection.form : _ref34$icon,
    _ref34$inputProps = _ref34.inputProps,
    inputProps = _ref34$inputProps === void 0 ? {} : _ref34$inputProps,
    _ref34$canOperate = _ref34.canOperate,
    canOperate = _ref34$canOperate === void 0 ? true : _ref34$canOperate,
    _ref34$formItemLayout = _ref34.formItemLayout,
    formItemLayout = _ref34$formItemLayout === void 0 ? {} : _ref34$formItemLayout,
    _ref34$reminderPrefix = _ref34.reminderPrefix,
    reminderPrefix = _ref34$reminderPrefix === void 0 ? '输入' : _ref34$reminderPrefix,
    _ref34$hidden = _ref34.hidden,
    hidden = _ref34$hidden === void 0 ? false : _ref34$hidden;
  var title = label;
  var otherInputProps = _objectSpread(_objectSpread({}, {
    addonBefore: icon,
    placeholder: canOperate ? buildFieldDescription(title, reminderPrefix) : '暂无数据',
    disabled: !canOperate
  }), inputProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return buildFormHiddenWrapper({
      children: /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
        rules: [{
          required: required,
          message: buildFieldDescription(resultCheck.label)
        }]
      }), /*#__PURE__*/React.createElement(Input, otherInputProps)),
      hidden: hidden
    });
  }
  return buildFormHiddenWrapper({
    children: /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
      rules: [{
        required: required,
        message: buildFieldDescription(resultCheck.label)
      }]
    }), /*#__PURE__*/React.createElement(Input, otherInputProps)),
    hidden: hidden
  });
}
function buildFormSwitch(_ref35) {
  var label = _ref35.label,
    name = _ref35.name,
    _ref35$required = _ref35.required,
    required = _ref35$required === void 0 ? false : _ref35$required,
    _ref35$helper = _ref35.helper,
    helper = _ref35$helper === void 0 ? null : _ref35$helper,
    _ref35$otherProps = _ref35.otherProps,
    otherProps = _ref35$otherProps === void 0 ? {} : _ref35$otherProps,
    _ref35$canOperate = _ref35.canOperate,
    canOperate = _ref35$canOperate === void 0 ? true : _ref35$canOperate,
    _ref35$formItemLayout = _ref35.formItemLayout,
    formItemLayout = _ref35$formItemLayout === void 0 ? {} : _ref35$formItemLayout,
    _ref35$hidden = _ref35.hidden,
    hidden = _ref35$hidden === void 0 ? false : _ref35$hidden;
  var title = label;
  var otherSwitchProps = _objectSpread(_objectSpread({}, {
    disabled: !canOperate
  }), otherProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return buildFormHiddenWrapper({
      children: /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
        rules: [{
          required: required,
          message: buildFieldDescription(resultCheck.label)
        }]
      }), /*#__PURE__*/React.createElement(FlexBox, {
        flexAuto: "left",
        left: "\u662F\u5426\u5F00\u542F".concat(label, ":"),
        right: /*#__PURE__*/React.createElement(Switch, otherSwitchProps)
      })),
      hidden: hidden
    });
  }
  return buildFormHiddenWrapper({
    children: /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
      rules: [{
        required: required,
        message: buildFieldDescription(resultCheck.label)
      }]
    }), /*#__PURE__*/React.createElement(FlexBox, {
      flexAuto: "left",
      left: "\u662F\u5426\u5F00\u542F".concat(label, "\uFF1A"),
      right: /*#__PURE__*/React.createElement(Switch, otherSwitchProps)
    })),
    hidden: hidden
  });
}
function buildFormPassword(_ref36) {
  var label = _ref36.label,
    name = _ref36.name,
    _ref36$required = _ref36.required,
    required = _ref36$required === void 0 ? false : _ref36$required,
    _ref36$helper = _ref36.helper,
    helper = _ref36$helper === void 0 ? null : _ref36$helper,
    _ref36$icon = _ref36.icon,
    icon = _ref36$icon === void 0 ? iconCollection.form : _ref36$icon,
    _ref36$inputProps = _ref36.inputProps,
    inputProps = _ref36$inputProps === void 0 ? {} : _ref36$inputProps,
    _ref36$canOperate = _ref36.canOperate,
    canOperate = _ref36$canOperate === void 0 ? true : _ref36$canOperate,
    _ref36$formItemLayout = _ref36.formItemLayout,
    formItemLayout = _ref36$formItemLayout === void 0 ? {} : _ref36$formItemLayout;
  var title = label;
  var otherInputProps = _objectSpread(_objectSpread({}, {
    addonBefore: icon,
    placeholder: buildFieldDescription(title, '输入')
  }), inputProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
      rules: [{
        required: required,
        message: buildFieldDescription(resultCheck.label)
      }]
    }), /*#__PURE__*/React.createElement(Password, otherInputProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(Password, otherInputProps));
}
function buildFormOnlyShowText(_ref37) {
  var label = _ref37.label,
    value = _ref37.value,
    _ref37$helper = _ref37.helper,
    helper = _ref37$helper === void 0 ? null : _ref37$helper,
    _ref37$formItemLayout = _ref37.formItemLayout,
    formItemLayout = _ref37$formItemLayout === void 0 ? {} : _ref37$formItemLayout,
    _ref37$requiredForSho = _ref37.requiredForShow,
    requiredForShow = _ref37$requiredForSho === void 0 ? false : _ref37$requiredForSho;
  var title = label;
  var resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    className: requiredForShow ? styles.formItemOnlyShowText : null
    // style={{ marginBottom: 0 }}
    ,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: false,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), value);
}
function buildSyntaxHighlighter(_ref38) {
  var language = _ref38.language,
    value = _ref38.value,
    _ref38$other = _ref38.other,
    other = _ref38$other === void 0 ? {} : _ref38$other;
  var c = _objectSpread(_objectSpread({}, other || {}), {}, {
    showLineNumbers: false,
    wrapLines: false,
    wrapLongLines: true,
    language: language,
    style: oneDark
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, isObject(value) ? /*#__PURE__*/React.createElement(Prism, c, language === 'javascript' ? JSON.stringify(value || {}, null, '    ') : value) : /*#__PURE__*/React.createElement(Prism, c, language === 'javascript' ? JSON.stringify(JSON.parse(value || null), null, '    ') : value));
}
function buildJsonView(_ref39) {
  var value = _ref39.value,
    _ref39$theme = _ref39.theme,
    theme = _ref39$theme === void 0 ? 'monokai' : _ref39$theme;
  return /*#__PURE__*/React.createElement(React.Fragment, null, isObject(value) ? /*#__PURE__*/React.createElement(ReactJson, {
    src: value,
    theme: theme || 'monokai',
    name: false,
    displayDataTypes: false,
    displayObjectSize: false,
    enableClipboard: false
  }) : /*#__PURE__*/React.createElement(ReactJson, {
    src: JSON.parse(value || '{}'),
    theme: theme || 'monokai',
    name: false,
    displayDataTypes: false,
    displayObjectSize: false,
    enableClipboard: false
  }));
}
function buildFormInnerComponent(_ref40) {
  var label = _ref40.label,
    innerComponent = _ref40.innerComponent,
    _ref40$helper = _ref40.helper,
    helper = _ref40$helper === void 0 ? null : _ref40$helper,
    _ref40$formItemLayout = _ref40.formItemLayout,
    formItemLayout = _ref40$formItemLayout === void 0 ? {} : _ref40$formItemLayout,
    _ref40$requiredForSho = _ref40.requiredForShow,
    requiredForShow = _ref40$requiredForSho === void 0 ? false : _ref40$requiredForSho;
  var title = label;
  var resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    className: requiredForShow ? styles.formItemOnlyShowText : null,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: false,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), innerComponent);
}
function buildFormActionItem(_ref41) {
  var component = _ref41.component,
    _ref41$formItemLayout = _ref41.formItemLayout,
    formItemLayout = _ref41$formItemLayout === void 0 ? {} : _ref41$formItemLayout;
  if ((component || null) == null) {
    return null;
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, _objectSpread(_objectSpread({}, formItemLayout || {}), {
    colon: false
  }), {
    label: /*#__PURE__*/React.createElement("div", null)
  }), component);
}
function buildFormButton(_ref42) {
  var config = _ref42.config,
    _ref42$formItemLayout = _ref42.formItemLayout,
    formItemLayout = _ref42$formItemLayout === void 0 ? {} : _ref42$formItemLayout;
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, _objectSpread(_objectSpread({}, formItemLayout || {}), {
    colon: false
  }), {
    label: /*#__PURE__*/React.createElement("div", null)
  }), buildButton(config));
}
function buildFormOnlyShowSyntaxHighlighter(_ref43) {
  var language = _ref43.language,
    label = _ref43.label,
    value = _ref43.value,
    _ref43$helper = _ref43.helper,
    helper = _ref43$helper === void 0 ? null : _ref43$helper,
    _ref43$formItemLayout = _ref43.formItemLayout,
    formItemLayout = _ref43$formItemLayout === void 0 ? {} : _ref43$formItemLayout,
    _ref43$requiredForSho = _ref43.requiredForShow,
    requiredForShow = _ref43$requiredForSho === void 0 ? false : _ref43$requiredForSho,
    _ref43$otherProps = _ref43.otherProps,
    otherProps = _ref43$otherProps === void 0 ? {} : _ref43$otherProps;
  return buildFormInnerComponent({
    label: label,
    innerComponent: buildSyntaxHighlighter({
      language: language,
      value: value,
      other: otherProps || {}
    }),
    helper: helper,
    formItemLayout: formItemLayout,
    requiredForShow: requiredForShow
  });
}
function buildFormOnlyShowTextarea(_ref44) {
  var label = _ref44.label,
    value = _ref44.value,
    _ref44$helper = _ref44.helper,
    helper = _ref44$helper === void 0 ? null : _ref44$helper,
    _ref44$textAreaProps = _ref44.textAreaProps,
    textAreaProps = _ref44$textAreaProps === void 0 ? {
      disabled: true
    } : _ref44$textAreaProps,
    _ref44$formItemLayout = _ref44.formItemLayout,
    formItemLayout = _ref44$formItemLayout === void 0 ? {} : _ref44$formItemLayout;
  var title = label;
  var otherTextAreaProps = _objectSpread(_objectSpread({}, {
    placeholder: '暂无数据',
    value: stringIsNullOrWhiteSpace(value || '') ? '' : value
  }), textAreaProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: false,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(TextArea, otherTextAreaProps));
}
function buildFormText(_ref45) {
  var label = _ref45.label,
    value = _ref45.value,
    _ref45$helper = _ref45.helper,
    helper = _ref45$helper === void 0 ? null : _ref45$helper,
    _ref45$formItemLayout = _ref45.formItemLayout,
    formItemLayout = _ref45$formItemLayout === void 0 ? {} : _ref45$formItemLayout;
  var title = label;
  var resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: false,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), value);
}
function buildFormOnlyShowInput(_ref46) {
  var label = _ref46.label,
    value = _ref46.value,
    _ref46$helper = _ref46.helper,
    helper = _ref46$helper === void 0 ? null : _ref46$helper,
    _ref46$icon = _ref46.icon,
    icon = _ref46$icon === void 0 ? iconCollection.form : _ref46$icon,
    _ref46$inputProps = _ref46.inputProps,
    inputProps = _ref46$inputProps === void 0 ? {
      disabled: true
    } : _ref46$inputProps,
    _ref46$formItemLayout = _ref46.formItemLayout,
    formItemLayout = _ref46$formItemLayout === void 0 ? {} : _ref46$formItemLayout;
  var title = label;
  var otherInputProps = _objectSpread(_objectSpread({}, {
    addonBefore: icon,
    placeholder: '暂无数据',
    value: stringIsNullOrWhiteSpace(value || '') ? '' : value
  }), inputProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: '',
    helper: helper
  });
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: false,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(Input, otherInputProps));
}
function buildFormInputNumber(_ref47) {
  var label = _ref47.label,
    name = _ref47.name,
    _ref47$required = _ref47.required,
    required = _ref47$required === void 0 ? false : _ref47$required,
    _ref47$helper = _ref47.helper,
    helper = _ref47$helper === void 0 ? null : _ref47$helper,
    _ref47$icon = _ref47.icon,
    icon = _ref47$icon === void 0 ? iconCollection.form : _ref47$icon,
    _ref47$inputNumberPro = _ref47.inputNumberProps,
    inputNumberProps = _ref47$inputNumberPro === void 0 ? {} : _ref47$inputNumberPro,
    _ref47$canOperate = _ref47.canOperate,
    canOperate = _ref47$canOperate === void 0 ? true : _ref47$canOperate,
    _ref47$formItemLayout = _ref47.formItemLayout,
    formItemLayout = _ref47$formItemLayout === void 0 ? {} : _ref47$formItemLayout;
  var title = label;
  var otherInputNumberProps = _objectSpread(_objectSpread({}, {
    addonBefore: icon,
    style: {
      width: '100%'
    },
    min: 0,
    placeholder: buildFieldDescription(title, '输入'),
    disabled: !canOperate
  }), inputNumberProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
      rules: [{
        required: required,
        message: buildFieldDescription(resultCheck.label)
      }]
    }), /*#__PURE__*/React.createElement(InputNumber, otherInputNumberProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(InputNumber, otherInputNumberProps));
}
function buildFormTextArea(_ref48) {
  var label = _ref48.label,
    name = _ref48.name,
    _ref48$required = _ref48.required,
    required = _ref48$required === void 0 ? false : _ref48$required,
    _ref48$helper = _ref48.helper,
    helper = _ref48$helper === void 0 ? null : _ref48$helper,
    _ref48$textAreaProps = _ref48.textAreaProps,
    textAreaProps = _ref48$textAreaProps === void 0 ? {} : _ref48$textAreaProps,
    _ref48$canOperate = _ref48.canOperate,
    canOperate = _ref48$canOperate === void 0 ? true : _ref48$canOperate,
    _ref48$formItemLayout = _ref48.formItemLayout,
    formItemLayout = _ref48$formItemLayout === void 0 ? {} : _ref48$formItemLayout;
  var title = label;
  var otherTextAreaProps = _objectSpread(_objectSpread({}, {
    placeholder: buildFieldDescription(title, '输入'),
    disabled: !canOperate
  }), textAreaProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
      rules: [{
        required: required,
        message: buildFieldDescription(resultCheck.label)
      }]
    }), /*#__PURE__*/React.createElement(TextArea, otherTextAreaProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(TextArea, otherTextAreaProps));
}
function buildFormDatePicker(_ref49) {
  var label = _ref49.label,
    name = _ref49.name,
    _ref49$required = _ref49.required,
    required = _ref49$required === void 0 ? false : _ref49$required,
    _ref49$helper = _ref49.helper,
    helper = _ref49$helper === void 0 ? null : _ref49$helper,
    _ref49$datePickerProp = _ref49.datePickerProps,
    datePickerProps = _ref49$datePickerProp === void 0 ? {} : _ref49$datePickerProp,
    _ref49$canOperate = _ref49.canOperate,
    canOperate = _ref49$canOperate === void 0 ? true : _ref49$canOperate,
    _ref49$formItemLayout = _ref49.formItemLayout,
    formItemLayout = _ref49$formItemLayout === void 0 ? {} : _ref49$formItemLayout;
  var title = label;
  var otherDatePickerProps = _objectSpread(_objectSpread({}, {
    style: {
      width: '100%'
    },
    showTime: true,
    format: 'YYYY-MM-DD HH:mm:ss',
    inputReadOnly: true,
    placeholder: buildFieldDescription(title, '选择')
  }), datePickerProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
    }), /*#__PURE__*/React.createElement(DatePicker, otherDatePickerProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(DatePicker, otherDatePickerProps));
}
function buildFormTimePicker(_ref50) {
  var label = _ref50.label,
    name = _ref50.name,
    _ref50$required = _ref50.required,
    required = _ref50$required === void 0 ? false : _ref50$required,
    _ref50$helper = _ref50.helper,
    helper = _ref50$helper === void 0 ? null : _ref50$helper,
    _ref50$timePickerProp = _ref50.timePickerProps,
    timePickerProps = _ref50$timePickerProp === void 0 ? {} : _ref50$timePickerProp,
    _ref50$canOperate = _ref50.canOperate,
    canOperate = _ref50$canOperate === void 0 ? true : _ref50$canOperate,
    _ref50$formItemLayout = _ref50.formItemLayout,
    formItemLayout = _ref50$formItemLayout === void 0 ? {} : _ref50$formItemLayout;
  var title = label;
  var otherTimePickerProps = _objectSpread(_objectSpread({}, {
    style: {
      width: '100%'
    },
    inputReadOnly: true,
    placeholder: buildFieldDescription(title, '选择')
  }), timePickerProps || {});
  var resultCheck = checkFromConfig({
    label: title,
    name: name,
    helper: helper
  });
  if (!canOperate) {
    return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
      label: resultCheck.label,
      name: resultCheck.name,
      extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper)
    }), /*#__PURE__*/React.createElement(TimePicker, otherTimePickerProps));
  }
  return /*#__PURE__*/React.createElement(FormItem, _extends({}, formItemLayout, {
    label: resultCheck.label,
    name: resultCheck.name,
    extra: stringIsNullOrWhiteSpace(resultCheck.helper || '') ? null : buildFieldHelper(resultCheck.helper),
    rules: [{
      required: required,
      message: buildFieldDescription(resultCheck.label)
    }]
  }), /*#__PURE__*/React.createElement(TimePicker, otherTimePickerProps));
}
function buildColumnList(_ref51) {
  var columnList = _ref51.columnList,
    _ref51$attachedTarget = _ref51.attachedTargetName,
    attachedTargetName = _ref51$attachedTarget === void 0 ? '' : _ref51$attachedTarget;
  var list = [];
  (isArray(columnList) ? columnList : []).forEach(function (o) {
    var c = buildColumnItem({
      column: o,
      attachedTargetName: attachedTargetName
    });
    if ((c || null) != null) {
      var _hidden$c = _objectSpread(_objectSpread({}, {
          hidden: false
        }), c),
        hidden = _hidden$c.hidden;
      if (!hidden) {
        list.push(c);
      }
    }
  });
  return list;
}
function buildColumnItem(_ref52) {
  var columnConfig = _ref52.column,
    _ref52$attachedTarget = _ref52.attachedTargetName,
    attachedTargetName = _ref52$attachedTarget === void 0 ? '' : _ref52$attachedTarget;
  var d = _objectSpread({}, columnConfig);
  var _showHelper$placehold = _objectSpread(_objectSpread({}, {
      showHelper: false,
      placeholder: false,
      ellipsis: true
    }), columnConfig || {}),
    dataTarget = _showHelper$placehold.dataTarget,
    showHelper = _showHelper$placehold.showHelper,
    placeholder = _showHelper$placehold.placeholder;
  if (placeholder || false) {
    return d;
  }
  if ((dataTarget || null) == null) {
    var text = "\u9519\u8BEF\u7684\u5217\u914D\u7F6E,\u7F3A\u5C11dataTarget:".concat(JSON.stringify(stringIsNullOrWhiteSpace(attachedTargetName) ? {
      column: columnConfig
    } : {
      el: attachedTargetName,
      column: columnConfig
    }));
    showRuntimeError({
      message: text
    });
    recordText(text);
  } else {
    var label = dataTarget.label,
      name = dataTarget.name,
      helper = dataTarget.helper;
    if ((label || null) == null || (name || null) == null) {
      var _text2 = "\u9519\u8BEF\u7684\u5217\u914D\u7F6E\uFF0CdataTarget\u5185\u5BB9\u7F3A\u5931:".concat(JSON.stringify(stringIsNullOrWhiteSpace(attachedTargetName) ? {
        column: columnConfig
      } : {
        el: attachedTargetName,
        column: columnConfig
      }));
      showRuntimeError({
        message: _text2
      });
      recordText(_text2);
    } else {
      d.title = showHelper ? /*#__PURE__*/React.createElement(IconInfo, {
        icon: iconCollection.infoCircle,
        iconPosition: "right",
        iconTooltip: helper,
        text: label
      }) : label;
      d.dataIndex = name;
    }
  }
  var _align$showRichFacade = _objectSpread(_objectSpread({}, {
      align: 'center',
      showRichFacade: false,
      facadeMode: null,
      facadeModeBuilder: null,
      facadeConfig: {},
      facadeConfigBuilder: function facadeConfigBuilder() {},
      sorter: false
    }), d),
    align = _align$showRichFacade.align,
    showRichFacade = _align$showRichFacade.showRichFacade,
    facadeModeSource = _align$showRichFacade.facadeMode,
    facadeModeBuilder = _align$showRichFacade.facadeModeBuilder,
    facadeConfigSource = _align$showRichFacade.facadeConfig,
    facadeConfigBuilder = _align$showRichFacade.facadeConfigBuilder,
    sorter = _align$showRichFacade.sorter;
  d.align = align;
  d.sorter = sorter;
  if (!isFunction(d.render) && showRichFacade) {
    var _canCopy$copyPrompt$e = _objectSpread(_objectSpread({}, {
        canCopy: false,
        copyPrompt: '[点击复制]',
        emptyValue: null
      }), d),
      canCopy = _canCopy$copyPrompt$e.canCopy,
      copyPrompt = _canCopy$copyPrompt$e.copyPrompt,
      emptyValue = _canCopy$copyPrompt$e.emptyValue;
    var tooltipPlacement = 'top';
    if (align === 'left') {
      tooltipPlacement = 'topLeft';
    }
    if (align === 'right') {
      tooltipPlacement = 'topRight';
    }
    d.render = function (value, record, index) {
      var val = value;
      var facadeMode = facadeModeSource || '';
      if (isFunction(facadeModeBuilder)) {
        facadeMode = facadeModeBuilder(value, record, index) || facadeMode;
        facadeMode = stringIsNullOrWhiteSpace(facadeMode) ? '' : facadeMode;
      }
      var facadeConfig = facadeConfigSource || {};
      if (isFunction(facadeConfigBuilder)) {
        facadeConfig = _objectSpread(_objectSpread({}, facadeConfig), facadeConfigBuilder(value, record, index) || {});
      }
      var _color$valPrefix$valP = _objectSpread(_objectSpread({}, {
          color: null,
          valPrefix: '',
          valPrefixStyle: null,
          valStyle: null,
          separator: '：',
          separatorStyle: null,
          icon: null,
          iconPosition: 'left',
          addonAfter: null,
          addonBefore: null,
          datetimeFormat: datetimeFormat.yearMonthDayHourMinuteSecond,
          status: 'default',
          text: ''
        }), facadeConfig),
        color = _color$valPrefix$valP.color,
        valPrefix = _color$valPrefix$valP.valPrefix,
        valPrefixStyle = _color$valPrefix$valP.valPrefixStyle,
        valStyle = _color$valPrefix$valP.valStyle,
        separator = _color$valPrefix$valP.separator,
        separatorStyle = _color$valPrefix$valP.separatorStyle,
        icon = _color$valPrefix$valP.icon,
        iconPosition = _color$valPrefix$valP.iconPosition,
        addonAfter = _color$valPrefix$valP.addonAfter,
        addonBefore = _color$valPrefix$valP.addonBefore,
        datetimeFormatValue = _color$valPrefix$valP.datetimeFormat,
        status = _color$valPrefix$valP.status,
        text = _color$valPrefix$valP.text;
      var styleMerge = {};
      if (stringIsNullOrWhiteSpace(facadeMode) || facadeMode === columnFacadeMode.ellipsis) {
        if (isFunction(d.formatValue)) {
          val = d.formatValue(value, record, index);
        }
        if (stringIsNullOrWhiteSpace(val)) {
          return emptyValue;
        }
        styleMerge = _objectSpread(_objectSpread({}, styleMerge), (color || null) == null ? {} : {
          color: color
        });
        if (canCopy) {
          return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EllipsisCustom, {
            style: styleMerge,
            tooltip: {
              placement: tooltipPlacement
            },
            lines: 1,
            removeChildren: true,
            extraContent: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
              onClick: function onClick() {
                copyToClipboard(val);
              }
            }, replaceTargetText(val, '***', 2, 6)))
          }, val || emptyValue, " ", copyPrompt || '[点击复制]'));
        }
        return /*#__PURE__*/React.createElement(React.Fragment, null, (addonBefore || null) == null ? null : addonBefore, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon || null,
          iconPosition: iconPosition || 'left',
          text: val || emptyValue,
          textStyle: valStyle || null,
          textPrefix: valPrefix,
          textPrefixStyle: valPrefixStyle || null,
          separator: separator || '',
          separatorStyle: separatorStyle || null,
          style: styleMerge,
          tooltip: {
            placement: tooltipPlacement
          },
          ellipsis: true
        }), (addonAfter || null) == null ? null : addonAfter);
      }
      if (facadeMode === columnFacadeMode.datetime) {
        styleMerge = _objectSpread(_objectSpread({}, styleMerge), (color || null) == null ? {} : {
          color: color
        });
        val = stringIsNullOrWhiteSpace(val) ? '' : formatDatetime({
          data: val,
          format: datetimeFormatValue
        }) || '';
        return /*#__PURE__*/React.createElement(React.Fragment, null, (addonBefore || null) == null ? null : addonBefore, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon || null,
          iconPosition: iconPosition || 'left',
          text: val || emptyValue,
          textStyle: valStyle || null,
          textPrefix: valPrefix,
          textPrefixStyle: valPrefixStyle || null,
          separator: separator || '',
          separatorStyle: separatorStyle || null,
          style: styleMerge,
          tooltip: {
            placement: tooltipPlacement
          },
          ellipsis: true
        }), (addonAfter || null) == null ? null : addonAfter);
      }
      if (facadeMode === columnFacadeMode.money) {
        styleMerge = _objectSpread(_objectSpread({}, styleMerge), (color || null) == null ? {} : {
          color: color
        });
        val = stringIsNullOrWhiteSpace(val) ? '' : val;
        return /*#__PURE__*/React.createElement(React.Fragment, null, (addonBefore || null) == null ? null : addonBefore, /*#__PURE__*/React.createElement(IconInfo, {
          icon: icon || null,
          iconPosition: iconPosition || 'left',
          text: formatMoney(val) || emptyValue,
          textStyle: valStyle || null,
          textPrefix: valPrefix,
          textPrefixStyle: valPrefixStyle || null,
          separator: separator || '',
          separatorStyle: separatorStyle || null,
          style: styleMerge,
          tooltip: {
            placement: tooltipPlacement
          },
          ellipsis: true
        }), (addonAfter || null) == null ? null : addonAfter);
      }
      if (facadeMode === columnFacadeMode.image) {
        if (isFunction(d.formatValue)) {
          val = d.formatValue(value, record, index);
        }
        var _imageWidth$circle$bo = _objectSpread(_objectSpread({}, {
            imageWidth: '30px',
            circle: true,
            borderRadius: '3px',
            previewSimpleMask: true
          }), facadeConfig),
          imageWidth = _imageWidth$circle$bo.imageWidth,
          borderRadius = _imageWidth$circle$bo.borderRadius,
          circle = _imageWidth$circle$bo.circle,
          previewSimpleMask = _imageWidth$circle$bo.previewSimpleMask;
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }), /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("div", {
          style: _objectSpread(_objectSpread({}, {
            width: imageWidth
          }), circle ? {} : {
            borderRadius: borderRadius
          })
        }, /*#__PURE__*/React.createElement(ImageBox, {
          src: val || defaultEmptyImage,
          circle: circle,
          loadingEffect: true,
          errorOverlayVisible: true,
          showErrorIcon: false,
          alt: "",
          preview: !stringIsNullOrWhiteSpace(val),
          previewSimpleMask: previewSimpleMask
        }))), /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        })));
      }
      if (facadeMode === columnFacadeMode.badge) {
        if (isFunction(d.formatValue)) {
          val = d.formatValue(value, record, index);
        }
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Badge, {
          status: status,
          text: text
        }));
      }
      if (facadeMode === columnFacadeMode.dropdown) {
        if (!isFunction(d.configBuilder)) {
          return null;
        }
        var operateConfig = d.configBuilder(value, record, index);
        if ((operateConfig || null) == null) {
          return null;
        } else {
          return buildDropdown(operateConfig);
        }
      }
      throw new Error("\u65E0\u6548\u7684\u6E32\u67D3\u6A21\u5F0F\uFF1A".concat(facadeMode));
    };
  }
  return d;
}
function buildPlayer(_ref53) {
  var url = _ref53.url,
    _ref53$width = _ref53.width,
    width = _ref53$width === void 0 ? '100%' : _ref53$width,
    _ref53$height = _ref53.height,
    height = _ref53$height === void 0 ? 'auto' : _ref53$height,
    _ref53$controls = _ref53.controls,
    controls = _ref53$controls === void 0 ? true : _ref53$controls;
  return /*#__PURE__*/React.createElement(ReactPlayer, {
    width: width,
    height: height,
    url: url,
    controls: controls
  });
}

/**
 * 构建彩色文本
 */
function buildColorText(_ref54) {
  var _ref54$canCopy = _ref54.canCopy,
    canCopy = _ref54$canCopy === void 0 ? false : _ref54$canCopy,
    _ref54$randomSeed = _ref54.randomSeed,
    randomSeed = _ref54$randomSeed === void 0 ? 0 : _ref54$randomSeed,
    _ref54$seedOffset = _ref54.seedOffset,
    seedOffset = _ref54$seedOffset === void 0 ? 0 : _ref54$seedOffset,
    _ref54$randomColor = _ref54.randomColor,
    randomColor = _ref54$randomColor === void 0 ? false : _ref54$randomColor,
    _ref54$color = _ref54.color,
    color = _ref54$color === void 0 ? '' : _ref54$color,
    _ref54$textPrefix = _ref54.textPrefix,
    textPrefix = _ref54$textPrefix === void 0 ? null : _ref54$textPrefix,
    _ref54$textPrefixStyl = _ref54.textPrefixStyle,
    textPrefixStyle = _ref54$textPrefixStyl === void 0 ? null : _ref54$textPrefixStyl,
    _ref54$text = _ref54.text,
    text = _ref54$text === void 0 ? '' : _ref54$text,
    _ref54$separator = _ref54.separator,
    separator = _ref54$separator === void 0 ? '：' : _ref54$separator,
    _ref54$separatorStyle = _ref54.separatorStyle,
    separatorStyle = _ref54$separatorStyle === void 0 ? null : _ref54$separatorStyle,
    _ref54$wrapperBuilder = _ref54.wrapperBuilder,
    wrapperBuilder = _ref54$wrapperBuilder === void 0 ? null : _ref54$wrapperBuilder;
  var colorText = /*#__PURE__*/React.createElement(ColorText, {
    canCopy: canCopy || false,
    randomSeed: randomSeed || 0,
    seedOffset: seedOffset || 0,
    randomColor: randomColor || false,
    color: color || '',
    textPrefix: textPrefix || null,
    textPrefixStyle: textPrefixStyle || null,
    text: text || '',
    separator: separator || '：',
    separatorStyle: separatorStyle || null
  });
  if (!isFunction(wrapperBuilder)) {
    return colorText;
  }
  return wrapperBuilder(colorText);
}
function adjustTableExpandConfig(_ref55) {
  var list = _ref55.list,
    config = _ref55.config;
  if ((config || null) != null) {
    var _checkNeedExpander$ro = _objectSpread(_objectSpread({}, {
        // 判断当前列表数据，如若列表所有数据都不需要显示展开按钮，则忽略其他配置
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        checkNeedExpander: null,
        rowExpandable: false,
        expandPlaceholderIcon: /*#__PURE__*/React.createElement(BorderOuterOutlined, {
          style: {
            color: '#ccc'
          }
        }),
        expanderStyle: null,
        animalType: listViewConfig.expandAnimalType.none,
        expandIconRotate: true,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        expandIcon: function expandIcon(_ref56) {
          _ref56.expanded;
            _ref56.onExpand;
            _ref56.record;
          return iconCollection.rightCircle;
        },
        expandedRowRender: null
      }), config || null),
      checkNeedExpander = _checkNeedExpander$ro.checkNeedExpander,
      rowExpandable = _checkNeedExpander$ro.rowExpandable,
      expandPlaceholderIcon = _checkNeedExpander$ro.expandPlaceholderIcon,
      expanderStyle = _checkNeedExpander$ro.expanderStyle,
      expandAnimalType = _checkNeedExpander$ro.animalType,
      expandIconRotate = _checkNeedExpander$ro.expandIconRotate,
      expandIconCustom = _checkNeedExpander$ro.expandIcon,
      expandedRowRenderCustom = _checkNeedExpander$ro.expandedRowRender;
    var checkNeedExpanderResult = true;
    if (isBoolean(checkNeedExpander)) {
      checkNeedExpanderResult = checkNeedExpander;
    }
    if (isFunction(checkNeedExpander)) {
      var r = checkNeedExpander(list);
      if (isBoolean(checkNeedExpander)) {
        checkNeedExpanderResult = r;
      }
    }
    var expandableConfig = checkNeedExpanderResult ? {
      rowExpandable: rowExpandable,
      expandIcon: function expandIcon(_ref57) {
        var canExpand = _ref57.expandable,
          expanded = _ref57.expanded,
          onExpand = _ref57.onExpand,
          record = _ref57.record;
        if (!canExpand && (expandPlaceholderIcon || null) != null) {
          return expandPlaceholderIcon || null;
        }
        if (expandIconRotate) {
          return /*#__PURE__*/React.createElement(RotateBox, {
            rotate: expanded ? 90 : 0,
            duration: 200,
            onClick: function onClick(e) {
              return onExpand(record, e);
            }
          }, expandIconCustom({
            expanded: expanded,
            onExpand: onExpand,
            record: record
          }));
        }
        return expandIconCustom({
          expanded: expanded,
          onExpand: onExpand,
          record: record
        });
      },
      expandedRowRender: isFunction(expandedRowRenderCustom) ? function (record, index, indent, expanded) {
        var child = expandedRowRenderCustom(record, index, indent, expanded);
        if (expandAnimalType === listViewConfig.expandAnimalType.fade) {
          child = /*#__PURE__*/React.createElement(FadeBox, {
            show: expanded
          }, child);
        }
        if (expandAnimalType === listViewConfig.expandAnimalType.queue) {
          child = /*#__PURE__*/React.createElement(QueueBox, {
            show: expanded
          }, child);
        }
        return /*#__PURE__*/React.createElement("div", {
          style: expanderStyle || {}
        }, child);
      } : null
    } : {};
    return expandableConfig;
  }
  return null;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { adjustTableExpandConfig, buildAlert, buildButton, buildButtonGroup, buildColorText, buildColumnItem, buildColumnList, buildCustomGrid, buildCustomRadio, buildCustomSelect, buildDescriptionGrid, buildDropdown, buildDropdownButton, buildDropdownEllipsis, buildFormActionItem, buildFormButton, buildFormCreateTimeField, buildFormDatePicker, buildFormDisplay, buildFormHiddenWrapper, buildFormInnerComponent, buildFormInput, buildFormInputFieldData, buildFormInputNumber, buildFormNowTimeField, buildFormOnlyShowInput, buildFormOnlyShowSyntaxHighlighter, buildFormOnlyShowText, buildFormOnlyShowTextarea, buildFormPassword, buildFormRadio, buildFormSelect, buildFormSwitch, buildFormText, buildFormTextArea, buildFormTimePicker, buildFormUpdateTimeField, buildIconInfoList, buildJsonView, buildListViewItemActionSelect, buildListViewItemExtra, buildMenu, buildMenuHeaderRender, buildOptionItem, buildPageHeaderContent, buildPageHeaderTagWrapper, buildPageHeaderTitle, buildPlayer, buildRadioGroup, buildRadioItem, buildSearchFormSelect, buildSearchInput, buildSearchInputNumber, buildSyntaxHighlighter, buildTagList, buildTree, buildTreeSelect, empty, pageHeaderExtraContent };
