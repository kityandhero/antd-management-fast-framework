"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.tableSizeConfig = void 0;

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/alert/style");

var _alert = _interopRequireDefault(require("antd/es/alert"));

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./index.less"));

var _excluded = ["data", "loading", "rowKey", "size", "showSelect"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var tableSizeConfig = {
  middle: 'middle',
  small: 'small',
  large: 'large'
};
exports.tableSizeConfig = tableSizeConfig;

function initTotalList(columns) {
  var totalList = [];
  columns.forEach(function (column) {
    if (column.needTotal) {
      totalList.push(_objectSpread(_objectSpread({}, column), {}, {
        total: 0
      }));
    }
  });
  return totalList;
}

var StandardTableCustom = /*#__PURE__*/function (_PureComponent) {
  _inherits(StandardTableCustom, _PureComponent);

  var _super = _createSuper(StandardTableCustom);

  function StandardTableCustom(props) {
    var _this;

    _classCallCheck(this, StandardTableCustom);

    _this = _super.call(this, props);

    _this.handleRowSelectChange = function (selectedRowKeys, selectedRows) {
      var needTotalList = _this.state.needTotalList;
      needTotalList = needTotalList.map(function (item) {
        return _objectSpread(_objectSpread({}, item), {}, {
          total: (selectedRows || []).reduce(function (sum, val) {
            return sum + parseFloat(val[item.dataIndex], 10);
          }, 0)
        });
      });
      var onSelectRow = _this.props.onSelectRow;

      if (onSelectRow) {
        onSelectRow(selectedRows || []);
      }

      _this.setState({
        selectedRowKeys: selectedRowKeys,
        needTotalList: needTotalList
      });
    };

    _this.handleTableChange = function (pagination, filters, sorter) {
      var onChange = _this.props.onChange;

      if (onChange) {
        onChange(pagination, filters, sorter);
      }
    };

    _this.cleanSelectedKeys = function () {
      _this.handleRowSelectChange([], []);
    };

    var columns = props.columns;

    var _needTotalList = initTotalList(columns);

    _this.state = {
      selectedRowKeys: [],
      needTotalList: _needTotalList
    };
    return _this;
  }

  _createClass(StandardTableCustom, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          selectedRowKeys = _this$state.selectedRowKeys,
          needTotalList = _this$state.needTotalList;

      var _this$props = this.props,
          _this$props$data = _this$props.data,
          list = _this$props$data.list,
          pagination = _this$props$data.pagination,
          loading = _this$props.loading,
          rowKey = _this$props.rowKey,
          size = _this$props.size,
          showSelectOption = _this$props.showSelect,
          rest = _objectWithoutProperties(_this$props, _excluded);

      var paginationProps = _objectSpread({
        showSizeChanger: true,
        showQuickJumper: true
      }, pagination);

      var selectedRows = this.props.selectedRows;
      var showSelect = showSelectOption || false;
      var rowSelection = (selectedRows || []).length === 0 && !showSelect ? null : {
        selectedRowKeys: selectedRowKeys,
        onChange: this.handleRowSelectChange,
        getCheckboxProps: function getCheckboxProps(record) {
          return {
            disabled: record.disabled
          };
        }
      };
      var rowSelectionMessage = rowSelection === null ? '' : /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].tableAlert
      }, /*#__PURE__*/_react["default"].createElement(_alert["default"], {
        message: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, "\u5DF2\u9009\u62E9 ", /*#__PURE__*/_react["default"].createElement("a", {
          style: {
            fontWeight: 600
          }
        }, selectedRowKeys.length), " \u9879\xA0\xA0", needTotalList.map(function (item) {
          return /*#__PURE__*/_react["default"].createElement("span", {
            style: {
              marginLeft: 8
            },
            key: item.dataIndex
          }, item.title, "\u603B\u8BA1\xA0", /*#__PURE__*/_react["default"].createElement("span", {
            style: {
              fontWeight: 600
            }
          }, item.render ? item.render(item.total) : item.total));
        }), /*#__PURE__*/_react["default"].createElement("a", {
          onClick: this.cleanSelectedKeys,
          style: {
            marginLeft: 24
          }
        }, "\u6E05\u7A7A")),
        type: "info",
        showIcon: true
      }));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].standardTableCustom
      }, rowSelectionMessage, /*#__PURE__*/_react["default"].createElement(_spin["default"], {
        spinning: loading
      }, /*#__PURE__*/_react["default"].createElement(_table["default"], _extends({
        rowKey: rowKey || 'key' // loading={loading}
        ,
        size: size || tableSizeConfig.middle,
        rowSelection: rowSelection,
        dataSource: list,
        pagination: paginationProps,
        onChange: this.handleTableChange,
        defaultExpandAllRows: true
      }, rest))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps) {
      // clean state
      if ((nextProps.selectedRows || []).length === 0) {
        var needTotalList = initTotalList(nextProps.columns);
        return {
          selectedRowKeys: [],
          needTotalList: needTotalList
        };
      }

      return null;
    }
  }]);

  return StandardTableCustom;
}(_react.PureComponent);

var _default = StandardTableCustom;
exports["default"] = _default;