import { _ as _extends } from '../../extends.js';
import { _ as _objectWithoutProperties } from '../../objectWithoutProperties.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { _ as _objectSpread } from '../../objectSpread2.js';
import { Alert, Spin, Table } from 'antd';
import { PureComponent } from 'react';
import { q as listViewConfig } from '../../constants.js';
import '@ant-design/icons';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../defineProperty.js';

var styles = undefined;

var _excluded = ["data", "loading", "rowKey", "size", "showSelect", "showPagination"];
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
        showPagination = _this$props.showPagination,
        rest = _objectWithoutProperties(_this$props, _excluded);
      var paginationProps = showPagination ? _objectSpread({
        showSizeChanger: true,
        showQuickJumper: true
      }, pagination) : false;
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
      var rowSelectionMessage = rowSelection === null ? '' : /*#__PURE__*/React.createElement("div", {
        className: styles.tableAlert
      }, /*#__PURE__*/React.createElement(Alert, {
        message: /*#__PURE__*/React.createElement(React.Fragment, null, "\u5DF2\u9009\u62E9", ' ', /*#__PURE__*/React.createElement("a", {
          style: {
            fontWeight: 600
          }
        }, selectedRowKeys.length), ' ', "\u9879\xA0\xA0", needTotalList.map(function (item) {
          return /*#__PURE__*/React.createElement("span", {
            style: {
              marginLeft: 8
            },
            key: item.dataIndex
          }, item.title, "\u603B\u8BA1\xA0", /*#__PURE__*/React.createElement("span", {
            style: {
              fontWeight: 600
            }
          }, item.render ? item.render(item.total) : item.total));
        }), /*#__PURE__*/React.createElement("a", {
          onClick: this.cleanSelectedKeys,
          style: {
            marginLeft: 24
          }
        }, "\u6E05\u7A7A")),
        type: "info",
        showIcon: true
      }));
      return /*#__PURE__*/React.createElement("div", {
        className: styles.standardTableCustom
      }, rowSelectionMessage, /*#__PURE__*/React.createElement(Spin, {
        spinning: loading
      }, /*#__PURE__*/React.createElement(Table, _extends({
        rowKey: rowKey || 'key'
        // loading={loading}
        ,
        size: size || listViewConfig.tableSize.middle,
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
}(PureComponent);
StandardTableCustom.defaultProps = {
  showPagination: true
};

export { StandardTableCustom as default };
