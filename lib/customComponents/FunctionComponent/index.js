"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageHeaderTitle = pageHeaderTitle;
exports.buildCustomGrid = buildCustomGrid;
exports.buildDescriptionGrid = buildDescriptionGrid;
exports.pageHeaderContent = pageHeaderContent;
exports.pageHeaderTagWrapper = pageHeaderTagWrapper;
exports.pageHeaderExtraContent = pageHeaderExtraContent;
exports.buildButtonGroup = buildButtonGroup;
exports.buildDropdownEllipsis = buildDropdownEllipsis;
exports.buildListViewItemExtra = buildListViewItemExtra;
exports.buildTagList = buildTagList;
exports.buildListViewItemActionSelect = buildListViewItemActionSelect;
exports.empty = empty;

require("antd/es/tag/style");

var _tag = _interopRequireDefault(require("antd/es/tag"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/dropdown/style");

var _dropdown = _interopRequireDefault(require("antd/es/dropdown"));

require("antd/es/menu/style");

var _menu = _interopRequireDefault(require("antd/es/menu"));

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/space/style");

var _space = _interopRequireDefault(require("antd/es/space"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/descriptions/style");

var _descriptions = _interopRequireDefault(require("antd/es/descriptions"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/typography/style");

var _typography = _interopRequireDefault(require("antd/es/typography"));

var _react = _interopRequireDefault(require("react"));

var _rcTexty = _interopRequireDefault(require("rc-texty"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

var _VerticalBox = _interopRequireDefault(require("@/customComponents/VerticalBox"));

var _ImageBox = _interopRequireDefault(require("@/customComponents/ImageBox"));

var _IconInfo = _interopRequireDefault(require("@/customComponents/IconInfo"));

var _FlexBox = _interopRequireDefault(require("@/customComponents/FlexBox"));

var _FlexText = _interopRequireDefault(require("@/customComponents/FlexText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Paragraph = _typography.default.Paragraph;
var ButtonGroup = _button.default.Group;
var Description = _descriptions.default.Item;

function pageHeaderTitle(pageName, headerTitlePrefix) {
  var headerTitlePrefixValue = headerTitlePrefix || '';
  var nameList = [];

  if ((0, _tools.isArray)(pageName)) {
    nameList = pageName.map(function (o, index) {
      return {
        key: "pageName_".concat(index),
        text: (0, _tools.toString)(o)
      };
    });
  } else {
    nameList = [{
      key: "pageName_1",
      text: (0, _tools.toString)(pageName)
    }];
  }

  return /*#__PURE__*/_react.default.createElement("span", {
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
  }, /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_col.default, null, (0, _tools.stringIsNullOrWhiteSpace)(headerTitlePrefixValue) ? '' : "".concat(headerTitlePrefixValue, "\uFF1A")), /*#__PURE__*/_react.default.createElement(_col.default, {
    flex: "auto"
  }, /*#__PURE__*/_react.default.createElement(_space.default, null, nameList.map(function (o) {
    return /*#__PURE__*/_react.default.createElement(_rcTexty.default, {
      key: o.key,
      type: "alpha",
      mode: "smooth"
    }, o.text);
  })))));
}

function buildCustomGrid(_ref) {
  var _ref$key = _ref.key,
      key = _ref$key === void 0 ? null : _ref$key,
      list = _ref.list,
      props = _ref.props;

  if ((0, _tools.isArray)(list)) {
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
      bordered: false,
      colon: true,
      size: null
    }), props || {}),
        title = _title$column$labelSt.title,
        columnSource = _title$column$labelSt.column,
        labelStyleSource = _title$column$labelSt.labelStyle,
        contentStyleSource = _title$column$labelSt.contentStyle,
        borderedSource = _title$column$labelSt.bordered,
        colonSource = _title$column$labelSt.colon,
        sizeSource = _title$column$labelSt.size;

    if (!(0, _tools.isNumber)(columnSource)) {
      column = 3;
    }

    column = (0, _tools.toNumber)(columnSource);

    if (column <= 0 || column >= 6) {
      column = 3;
    }

    var padding = '16px 24px';
    var paddingBottomNoBorder = '16px';
    var backgroundColor = '';

    if (sizeSource === 'middle') {
      padding = '12px 24px';
      paddingBottomNoBorder = '12px';
    }

    if (sizeSource === 'small') {
      padding = '8px 16px';
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
    var labelStyle = bordered ? _objectSpread(_objectSpread(_objectSpread({}, {
      width: '180px',
      borderRight: '1px solid #f0f0f0'
    }), labelStyleSource || {}), {
      padding: padding,
      backgroundColor: backgroundColor
    }) : {};
    var contentStyle = bordered ? _objectSpread(_objectSpread(_objectSpread({}, {
      padding: '16px 24px'
    }), contentStyleSource || {}), {
      padding: padding
    }) : {};
    return /*#__PURE__*/_react.default.createElement("div", {
      key: key
    }, /*#__PURE__*/_react.default.createElement("div", {
      style: {
        marginBottom: '8px',
        color: '#000000d9',
        fontWeight: 500,
        fontSize: '16px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    }, /*#__PURE__*/_react.default.createElement(_FlexText.default, {
      text: title
    })), /*#__PURE__*/_react.default.createElement(_row.default, {
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
      return /*#__PURE__*/_react.default.createElement(_col.default, _extends({
        key: item.key,
        style: itemStyle,
        label: item.label,
        span: columnSpan * (item.span || 1)
      }, item.props || {}), /*#__PURE__*/_react.default.createElement(_FlexBox.default, {
        flexAuto: "right",
        left: /*#__PURE__*/_react.default.createElement("div", {
          style: labelStyle
        }, "".concat(item.label).concat(colon ? '：' : '')),
        right: /*#__PURE__*/_react.default.createElement("div", {
          style: contentStyle
        }, item.value, item.canCopy && (item.canCopy || null) != null ? /*#__PURE__*/_react.default.createElement("a", {
          style: {
            marginLeft: '10px'
          },
          onClick: function onClick() {
            (0, _tools.copyToClipboard)(item.copyData || item.value);
          }
        }, "[\u590D\u5236]") : null)
      }));
    })));
  }

  return null;
}

function buildDescriptionGrid(_ref2) {
  var _ref2$key = _ref2.key,
      key = _ref2$key === void 0 ? null : _ref2$key,
      list = _ref2.list,
      props = _ref2.props;

  if ((0, _tools.isArray)(list)) {
    var dataList = list.map(function (o, index) {
      var d = _objectSpread(_objectSpread({}, {
        key: "item_".concat(index)
      }), o);

      return _objectSpread(_objectSpread({}, {
        canCopy: false
      }), d);
    });

    var _itemStyle = _objectSpread(_objectSpread({}, {
      itemStyle: null
    }), props || {}),
        itemStyle = _itemStyle.itemStyle;

    return /*#__PURE__*/_react.default.createElement(_descriptions.default, _extends({
      key: key
    }, props || {}), dataList.map(function (item) {
      var _emptyValue$item = _objectSpread(_objectSpread({}, {
        emptyValue: ''
      }), item),
          emptyValue = _emptyValue$item.emptyValue;

      return /*#__PURE__*/_react.default.createElement(Description, {
        key: item.key,
        label: item.label,
        span: item.span || 1,
        style: _objectSpread(_objectSpread({}, itemStyle), item.style || null)
      }, item.value || emptyValue, item.canCopy && (item.canCopy || null) != null ? /*#__PURE__*/_react.default.createElement("a", {
        style: {
          marginLeft: '10px'
        },
        disabled: (0, _tools.stringIsNullOrWhiteSpace)(item.value || emptyValue),
        onClick: function onClick() {
          if (!(0, _tools.stringIsNullOrWhiteSpace)(item.value || emptyValue)) {
            (0, _tools.copyToClipboard)(item.copyData || item.value);
          }
        }
      }, "[\u590D\u5236]") : null);
    }));
  }

  return null;
}

function pageHeaderContent(_ref3) {
  var list = _ref3.list;

  if (!(0, _tools.isArray)(list)) {
    return null;
  }

  var listData = list.map(function (o) {
    var d = _objectSpread(_objectSpread({}, {
      sort: 10000
    }), o);

    return _objectSpread({}, d);
  });
  listData = (0, _tools.sortBy)(listData, function (o) {
    return o.sort;
  });
  listData = listData.map(function (o, index) {
    var d = _objectSpread(_objectSpread({}, {}), o);

    d.key = "pageHeaderContentItemContainer_".concat(index);
    return _objectSpread({}, d);
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, listData.map(function (o) {
    var type = o.type,
        listItem = o.list;

    if (!(0, _tools.isArray)(listItem)) {
      return null;
    }

    if (type === _constants.pageHeaderRenderType.descriptionGrid) {
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

    if (type === _constants.pageHeaderRenderType.paragraph) {
      var listParagraph = listItem.map(function (one, index) {
        return _objectSpread(_objectSpread({}, {
          key: "".concat(o.key, "_paragraph_").concat(index)
        }), one);
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        key: "".concat(o.key, "_paragraph_container")
      }, listParagraph.map(function (item) {
        if ((0, _tools.stringIsNullOrWhiteSpace)(item.paragraph)) {
          return null;
        }

        return /*#__PURE__*/_react.default.createElement(Paragraph, {
          key: item.key
        }, item.paragraph);
      }));
    }

    if (type === _constants.pageHeaderRenderType.action) {
      var listAction = listItem.map(function (one, index) {
        return _objectSpread(_objectSpread({}, {
          key: "".concat(o.key, "_action_").concat(index)
        }), one);
      });
      return /*#__PURE__*/_react.default.createElement(_space.default, {
        key: "".concat(o.key, "_space")
      }, listAction.map(function (item) {
        return item.action;
      }));
    }

    return null;
  }));
}

function pageHeaderTagWrapper(Tags) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
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
  return /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_col.default, {
    xs: 24,
    sm: 12
  }, /*#__PURE__*/_react.default.createElement("div", null, "\u521B\u5EFA\u65E5\u671F"), /*#__PURE__*/_react.default.createElement("div", {
    style: textStyle
  }, (0, _tools.formatDatetime)(v.time, 'HH:mm:ss', '--'), /*#__PURE__*/_react.default.createElement("br", null), (0, _tools.formatDatetime)(v.time, 'YYYY-MM-DD'))), /*#__PURE__*/_react.default.createElement(_col.default, {
    xs: 24,
    sm: 12
  }, /*#__PURE__*/_react.default.createElement("div", null, v.textLabel), /*#__PURE__*/_react.default.createElement("div", {
    style: textStyle
  }, v.text)));
}

function buildButtonGroup(buttonGroupData) {
  if ((buttonGroupData || null) == null) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(ButtonGroup, null, (buttonGroupData.buttons || []).map(function (item) {
    var confirmMode = item.confirmMode,
        confirmProps = item.confirmProps;

    var _ref4 = item.buttonProps || {
      onClick: function onClick() {
        (0, _tools.showRuntimeErrorMessage)('缺少配置');
      }
    },
        disabled = _ref4.disabled,
        onClick = _ref4.onClick;

    if (!(confirmMode || false) || disabled) {
      return /*#__PURE__*/_react.default.createElement(_button.default, _extends({
        key: item.key
      }, item.buttonProps || {}), item.loading ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : item.icon, item.text || '');
    }

    var defaultConfirmProps = {
      title: '确定进行操作吗？',
      onConfirm: function onConfirm() {
        (0, _tools.showRuntimeErrorMessage)('缺少配置');
      },
      okText: '确定',
      cancelText: '取消'
    };

    var cp = _objectSpread(_objectSpread(_objectSpread({}, defaultConfirmProps), {
      onConfirm: onClick
    }), confirmProps || {});

    var buttonProps = item.buttonProps;
    delete cp.onClick;
    delete buttonProps.onClick;
    return /*#__PURE__*/_react.default.createElement(_popconfirm.default, _extends({}, cp || {}, {
      key: item.key
    }), /*#__PURE__*/_react.default.createElement(_button.default, buttonProps || {}, item.loading ? /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, null) : item.icon, item.text || ''));
  }), (buttonGroupData.menu || null) != null ? (buttonGroupData.menu.items || []).length > 0 ? /*#__PURE__*/_react.default.createElement(_dropdown.default, _objectSpread(_objectSpread(_objectSpread({}, {
    placement: 'bottomRight'
  }), buttonGroupData.menu.dropdownProps || {}), {
    overlay: /*#__PURE__*/_react.default.createElement(_menu.default, buttonGroupData.menu.props || {}, buttonGroupData.menu.items.map(function (item) {
      return /*#__PURE__*/_react.default.createElement(_menu.default.Item, _extends({}, item.props || {}, {
        key: item.key
      }), item.children);
    }))
  }), /*#__PURE__*/_react.default.createElement(_button.default, buttonGroupData.menu.buttonProps || {}, buttonGroupData.menu.children || /*#__PURE__*/_react.default.createElement(_icons.EllipsisOutlined, null))) : null : null);
}

function buildDropdownEllipsis(ellipsisActionData) {
  if ((ellipsisActionData || null) == null) {
    return null;
  }

  if (!(0, _tools.isArray)(ellipsisActionData.items)) {
    return null;
  }

  var menu = /*#__PURE__*/_react.default.createElement(_menu.default, ellipsisActionData.menuProps || {}, ellipsisActionData.items.map(function (item) {
    return /*#__PURE__*/_react.default.createElement(_menu.default.Item, _extends({}, item.props || {}, {
      key: item.key
    }), item.children);
  }));

  return /*#__PURE__*/_react.default.createElement(_tooltip.default, {
    key: (0, _tools.getGuid)(),
    placement: "top",
    title: "\u66F4\u591A\u64CD\u4F5C"
  }, /*#__PURE__*/_react.default.createElement(_dropdown.default, _extends({}, ellipsisActionData.dropdownProps || {}, {
    overlay: menu
  }), /*#__PURE__*/_react.default.createElement(_button.default, ellipsisActionData.buttonProps || {}, /*#__PURE__*/_react.default.createElement(_icons.EllipsisOutlined, {
    style: {
      fontSize: 20,
      verticalAlign: 'top'
    }
  }))));
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function buildListViewItemExtra(_ref5) {
  var align = _ref5.align,
      index = _ref5.index,
      imageUrl = _ref5.imageUrl,
      emptyImageUrl = _ref5.emptyImageUrl;
  return /*#__PURE__*/_react.default.createElement(_VerticalBox.default, {
    align: align || 'bottom',
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100px'
    }
  }, /*#__PURE__*/_react.default.createElement(_ImageBox.default, {
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

function buildTagList(_ref6) {
  var _ref6$list = _ref6.list,
      list = _ref6$list === void 0 ? [] : _ref6$list;

  if (!(0, _tools.isArray)(list)) {
    return null;
  }

  if (list.length === 0) {
    return null;
  }

  var tagList = list.map(function (o, index) {
    return _objectSpread(_objectSpread({}, {
      key: "pageHeaderTag_".concat(index),
      color: '#000',
      text: '未知'
    }), o || {});
  });
  return /*#__PURE__*/_react.default.createElement(_space.default, null, tagList.map(function (o) {
    return /*#__PURE__*/_react.default.createElement(_tag.default, {
      key: o.key,
      color: o.color
    }, /*#__PURE__*/_react.default.createElement(_rcTexty.default, {
      type: "left",
      mode: "smooth"
    }, o.text));
  }));
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function buildListViewItemActionSelect(_ref7) {
  var index = _ref7.index,
      selectData = _ref7.selectData,
      selectCallback = _ref7.selectCallback;

  if (!(0, _tools.isFunction)(selectCallback)) {
    (0, _tools.showRuntimeErrorMessage)('selectCallback 不是有效的回调函数');
  }

  return /*#__PURE__*/_react.default.createElement(_popconfirm.default, {
    placement: "topRight",
    title: "\u9009\u62E9\u6B64\u4FE1\u606F\uFF0C\u786E\u5B9A\u5417\uFF1F",
    onConfirm: function onConfirm(e) {
      if ((0, _tools.isFunction)(selectCallback)) {
        selectCallback(e, selectData);
      }
    },
    okText: "\u786E\u5B9A",
    cancelText: "\u53D6\u6D88"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "link"
  }, /*#__PURE__*/_react.default.createElement(_IconInfo.default, {
    icon: /*#__PURE__*/_react.default.createElement(_icons.ImportOutlined, null),
    text: "\u9009\u53D6"
  })));
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