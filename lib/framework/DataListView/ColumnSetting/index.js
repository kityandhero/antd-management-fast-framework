"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.genColumnKey = void 0;

require("antd/es/popover/style");

var _popover = _interopRequireDefault(require("antd/es/popover"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = require("react-dnd-html5-backend");

var _DndItem = _interopRequireDefault(require("./DndItem"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["key", "dataIndex", "title", "fixed"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Backend = _reactDndHtml5Backend.HTML5Backend;
/**
 *  根据 key 和 dataIndex 生成唯一 id
 * @param key
 * @param dataIndex
 */

var genColumnKey = function genColumnKey(key, dataIndex) {
  if (key) {
    return key;
  }

  if (!key && dataIndex) {
    if (Array.isArray(dataIndex)) {
      return dataIndex.join('-');
    }

    return dataIndex;
  }

  return undefined;
};

exports.genColumnKey = genColumnKey;

var ToolTipIcon = function ToolTipIcon(_ref) {
  var title = _ref.title,
      show = _ref.show,
      children = _ref.children,
      columnKey = _ref.columnKey,
      fixed = _ref.fixed,
      columnsMap = _ref.columnsMap,
      setColumnsMap = _ref.setColumnsMap;

  if (show) {
    return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: title
    }, /*#__PURE__*/_react["default"].createElement("span", {
      onClick: function onClick() {
        var config = columnsMap[columnKey || ''] || {};

        var columnKeyMap = _objectSpread(_objectSpread({}, columnsMap), {}, _defineProperty({}, columnKey, _objectSpread(_objectSpread({}, config), {}, {
          fixed: fixed
        })));

        setColumnsMap(columnKeyMap);
      }
    }, children));
  }

  return null;
};

var CheckboxListItem = function CheckboxListItem(_ref2) {
  var columnKey = _ref2.columnKey,
      columnsMap = _ref2.columnsMap,
      title = _ref2.title,
      setColumnsMap = _ref2.setColumnsMap,
      fixed = _ref2.fixed;
  var columnsCollection = columnsMap || [];
  var config = columnsCollection[columnKey || 'null'] || {
    show: true
  };
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _index["default"].item,
    key: columnKey
  }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
    className: _index["default"].checkbox,
    onChange: function onChange(e) {
      if (columnKey) {
        var tempConfig = columnsCollection[columnKey || ''] || {};

        var newSetting = _objectSpread({}, tempConfig);

        if (e.target.checked) {
          delete newSetting.show;
        } else {
          newSetting.show = false;
        }

        var columnKeyMap = _objectSpread(_objectSpread({}, columnsCollection), {}, _defineProperty({}, columnKey, newSetting));

        if (setColumnsMap) {
          setColumnsMap(columnKeyMap);
        }
      }
    },
    checked: config.show !== false
  }, title), /*#__PURE__*/_react["default"].createElement("span", {
    className: _index["default"].option
  }, /*#__PURE__*/_react["default"].createElement(ToolTipIcon, {
    columnKey: columnKey,
    fixed: "left",
    title: "\u56FA\u5B9A\u5230\u5DE6\u8FB9",
    show: fixed !== 'left'
  }, /*#__PURE__*/_react["default"].createElement(_icons.PushpinOutlined, {
    style: {
      transform: 'rotate(-90deg)'
    }
  })), /*#__PURE__*/_react["default"].createElement(ToolTipIcon, {
    columnKey: columnKey,
    fixed: undefined,
    title: "\u53D6\u6D88\u56FA\u5B9A",
    show: !!fixed
  }, /*#__PURE__*/_react["default"].createElement(_icons.VerticalAlignMiddleOutlined, null)), /*#__PURE__*/_react["default"].createElement(ToolTipIcon, {
    columnKey: columnKey,
    fixed: "right",
    title: "\u56FA\u5B9A\u5230\u53F3\u8FB9",
    show: fixed !== 'right'
  }, /*#__PURE__*/_react["default"].createElement(_icons.PushpinOutlined, null))));
};

var CheckboxList = function CheckboxList(_ref3) {
  var list = _ref3.list,
      columnsMap = _ref3.columnsMap,
      setColumnsMap = _ref3.setColumnsMap,
      sortKeyColumns = _ref3.sortKeyColumns,
      setSortKeyColumns = _ref3.setSortKeyColumns,
      _ref3$showTitle = _ref3.showTitle,
      showTitle = _ref3$showTitle === void 0 ? true : _ref3$showTitle,
      listTitle = _ref3.title;
  var show = list && list.length > 0;

  if (!show) {
    return null;
  }

  var move = function move(id, targetIndex) {
    var newColumns = _toConsumableArray(sortKeyColumns);

    var findIndex = newColumns.findIndex(function (columnKey) {
      return columnKey === id;
    });
    var key = newColumns[findIndex];
    newColumns.splice(findIndex, 1);

    if (targetIndex === 0) {
      newColumns.unshift(key);
    } else {
      newColumns.splice(targetIndex, 0, key);
    }

    setSortKeyColumns(newColumns);
  };

  var listDom = list.map(function (_ref4, index) {
    var key = _ref4.key,
        dataIndex = _ref4.dataIndex,
        title = _ref4.title,
        fixed = _ref4.fixed,
        rest = _objectWithoutProperties(_ref4, _excluded);

    var columnKey = genColumnKey(key, dataIndex || rest.index);
    return /*#__PURE__*/_react["default"].createElement(_DndItem["default"], {
      index: index,
      id: "".concat(columnKey, "_").concat(rest.index),
      key: "".concat(columnKey || 'no', "_").concat(title),
      end: function end(id, targetIndex) {
        move(id, targetIndex);
      }
    }, /*#__PURE__*/_react["default"].createElement(CheckboxListItem, {
      setColumnsMap: setColumnsMap,
      columnKey: columnKey || "".concat(index),
      columnsMap: columnsMap,
      title: title,
      fixed: fixed
    }));
  });
  return /*#__PURE__*/_react["default"].createElement(_reactDnd.DndProvider, {
    backend: Backend
  }, showTitle && /*#__PURE__*/_react["default"].createElement("span", {
    className: _index["default"].title
  }, listTitle), listDom);
};

var GroupCheckboxList = function GroupCheckboxList(_ref5) {
  var localColumns = _ref5.localColumns,
      columnsMap = _ref5.columnsMap,
      setColumnsMap = _ref5.setColumnsMap,
      setSortKeyColumns = _ref5.setSortKeyColumns;
  var rightList = [];
  var leftList = [];
  var list = [];
  localColumns.forEach(function (item) {
    var fixed = item.fixed;

    if (fixed === 'left') {
      leftList.push(item);
      return;
    }

    if (fixed === 'right') {
      rightList.push(item);
      return;
    }

    list.push(item);
  });
  var showRight = rightList && rightList.length > 0;
  var showLeft = leftList && leftList.length > 0;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _index["default"].list
  }, /*#__PURE__*/_react["default"].createElement(CheckboxList, {
    key: "list-leftList",
    title: "\u56FA\u5B9A\u5728\u5DE6\u4FA7",
    list: leftList,
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap
  }), /*#__PURE__*/_react["default"].createElement(CheckboxList, {
    key: "list-list",
    list: list,
    title: "\u4E0D\u56FA\u5B9A",
    columnsMap: columnsMap,
    showTitle: showLeft || showRight,
    setColumnsMap: setColumnsMap
  }), /*#__PURE__*/_react["default"].createElement(CheckboxList, {
    key: "list-rightList",
    title: "\u56FA\u5B9A\u5728\u53F3\u4FA7",
    list: rightList,
    columnsMap: columnsMap,
    setColumnsMap: setColumnsMap,
    setSortKeyColumns: setSortKeyColumns
  }));
};

var ColumnSetting = function ColumnSetting(props) {
  var localColumns = props.columns || [];
  var columnsMap = props.columnsMap,
      setColumnsMap = props.setColumnsMap,
      setSortKeyColumns = props.setSortKeyColumns;
  /**
   * 设置全部选中，或全部未选中
   * @param show
   */

  var setAllSelectAction = function setAllSelectAction() {
    var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var columnKeyMap = {};
    localColumns.forEach(function (_ref6) {
      var key = _ref6.key,
          fixed = _ref6.fixed,
          dataIndex = _ref6.dataIndex;
      var columnKey = genColumnKey(key, dataIndex);

      if (columnKey) {
        columnKeyMap[columnKey] = {
          show: show,
          fixed: fixed
        };
      }
    });

    if (setColumnsMap) {
      setColumnsMap(columnKeyMap);
    }
  };

  var selectKeys = Object.values(columnsMap || []).filter(function (value) {
    return !value || value.show === false;
  });
  var indeterminate = selectKeys.length > 0 && selectKeys.length !== localColumns.length;
  return /*#__PURE__*/_react["default"].createElement("span", {
    className: _index["default"].columnSetting
  }, /*#__PURE__*/_react["default"].createElement(_popover["default"], {
    arrowPointAtCenter: true,
    title: /*#__PURE__*/_react["default"].createElement("div", {
      className: _index["default"].topTitle
    }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"], {
      indeterminate: indeterminate,
      checked: selectKeys.length === 0 && selectKeys.length !== localColumns.length,
      onChange: function onChange(e) {
        if (e.target.checked) {
          setAllSelectAction();
        } else {
          setAllSelectAction(false);
        }
      }
    }, "\u5217\u5C55\u793A"), /*#__PURE__*/_react["default"].createElement("a", {
      onClick: function onClick() {
        setColumnsMap({});
        setSortKeyColumns([]);
      }
    }, "\u91CD\u7F6E")),
    trigger: "click",
    placement: "bottomRight",
    content: /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(GroupCheckboxList, {
      localColumns: localColumns,
      columnsMap: columnsMap,
      setColumnsMap: setColumnsMap,
      setSortKeyColumns: setSortKeyColumns
    }))
  }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
    title: "\u5217\u8BBE\u7F6E"
  }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
    shape: "circle",
    style: {
      border: 0,
      color: '#000000'
    },
    icon: /*#__PURE__*/_react["default"].createElement(_icons.SettingOutlined, null)
  }))));
};

var _default = ColumnSetting;
exports["default"] = _default;