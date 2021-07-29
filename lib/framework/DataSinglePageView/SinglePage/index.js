"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/list/style");

var _list = _interopRequireDefault(require("antd/es/list"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _tools = require("../../../utils/tools");

var _constants = require("../../../utils/constants");

var _Base2 = _interopRequireDefault(require("../../DataListView/Base"));

var _StandardTableCustom = _interopRequireDefault(require("../../../customComponents/StandardTableCustom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SinglePage = /*#__PURE__*/function (_Base) {
  _inherits(SinglePage, _Base);

  var _super = _createSuper(SinglePage);

  function SinglePage(props) {
    var _this;

    _classCallCheck(this, SinglePage);

    _this = _super.call(this, props);

    _this.handleFormReset = function () {
      var form = _this.getSearchForm();

      form.resetFields();

      _this.handleFormOtherReset();

      _this.setState({
        formValues: {},
        startTime: '',
        endTime: ''
      }, function () {
        _this.reloadData();
      });
    };

    _this.adjustLoadRequestParams = function (o) {
      return o || {};
    };

    _this.initLoadRequestParams = function () {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var d = o;
      var _this$state = _this.state,
          loadApiPath = _this$state.loadApiPath,
          formValues = _this$state.formValues,
          filters = _this$state.filters,
          sorter = _this$state.sorter;

      if ((loadApiPath || '') === '') {
        (0, _tools.showRuntimeErrorMessage)('loadApiPath需要配置');
        return d;
      }

      var _this$state2 = _this.state,
          startTimeAlias = _this$state2.startTimeAlias,
          endTimeAlias = _this$state2.endTimeAlias,
          startTime = _this$state2.startTime,
          endTime = _this$state2.endTime;

      if (!(0, _tools.stringIsNullOrWhiteSpace)(startTime)) {
        if (!(0, _tools.stringIsNullOrWhiteSpace)(startTimeAlias)) {
          d[startTimeAlias] = startTime;
        } else {
          d.startTime = startTime;
        }
      }

      if (!(0, _tools.stringIsNullOrWhiteSpace)(endTime)) {
        if (!(0, _tools.stringIsNullOrWhiteSpace)(endTimeAlias)) {
          d[endTimeAlias] = endTime;
        } else {
          d.endTime = endTime;
        }
      }

      d = _objectSpread(_objectSpread({}, d), _objectSpread(_objectSpread(_objectSpread({}, formValues || {}), filters || {}), sorter || {}));
      delete d.dateRange;
      return _this.adjustLoadRequestParams(d);
    };

    _this.handleSearch = function (e) {
      e.preventDefault();

      if (_this.checkWorkDoing()) {
        return;
      }

      var form = _this.getSearchForm();

      var validateFields = form.validateFields;
      validateFields().then(function (fieldsValue) {
        var values = _objectSpread(_objectSpread({}, fieldsValue), {}, {
          updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
        });

        _this.searchData({
          formValues: values
        });
      })["catch"](function (error) {
        var errorFields = error.errorFields;

        if (!(0, _tools.isUndefined)(errorFields)) {
          var m = [];
          Object.values(errorFields).forEach(function (o) {
            m.push(o.errors[0]);
          });
          var maxLength = 5;
          var beyondMax = false;

          if (m.length > maxLength) {
            m.length = maxLength;
            beyondMax = true;
          }

          var errorMessage = m.join(', ');

          if (beyondMax) {
            errorMessage += ' ...';
          }

          _message2["default"].warn(errorMessage);
        } else {
          (0, _tools.showRuntimeErrorMessage)(error);
        }
      });
    };

    _this.renderListView = function () {
      var _this$state3 = _this.state,
          metaOriginalData = _this$state3.metaOriginalData,
          dataLoading = _this$state3.dataLoading,
          reloading = _this$state3.reloading,
          processing = _this$state3.processing;

      var _ref = metaOriginalData || {
        list: []
      },
          list = _ref.list;

      return /*#__PURE__*/_react["default"].createElement(_spin["default"], {
        spinning: dataLoading || reloading || processing
      }, /*#__PURE__*/_react["default"].createElement(_list["default"], {
        itemLayout: _this.renderListViewItemLayout(),
        size: _this.renderListViewSize(),
        dataSource: list,
        renderItem: function renderItem(item, index) {
          return _this.renderListViewItem(item, index);
        }
      }));
    };

    _this.renderView = function () {
      var _this$state4 = _this.state,
          showSelect = _this$state4.showSelect,
          listViewMode = _this$state4.listViewMode;

      if (listViewMode === _constants.listViewModeCollection.table) {
        return _this.renderTableView();
      }

      if (listViewMode === _constants.listViewModeCollection.list) {
        if (showSelect) {
          (0, _tools.showRuntimeErrorMessage)('MultiListView显示模式下不支持选择');
        }

        return _this.renderListView();
      }

      (0, _tools.showRuntimeErrorMessage)('未知的显示模式');
      return null;
    };

    _this.renderTableView = function () {
      var _this$state5 = _this.state,
          tableScroll = _this$state5.tableScroll,
          showSelect = _this$state5.showSelect,
          selectedDataTableDataRows = _this$state5.selectedDataTableDataRows,
          metaOriginalData = _this$state5.metaOriginalData,
          dataLoading = _this$state5.dataLoading,
          processing = _this$state5.processing;

      var _this$buildTableConfi = _this.buildTableConfig(),
          styleSet = _this$buildTableConfi.styleSet,
          columns = _this$buildTableConfi.columns,
          expandable = _this$buildTableConfi.expandable;

      var standardTableCustomOption = {
        loading: dataLoading || processing,
        data: metaOriginalData || {
          list: []
        },
        showSelect: showSelect,
        pagination: false,
        selectedRows: selectedDataTableDataRows,
        columns: columns,
        onSelectRow: _this.handleSelectRows
      };

      if ((styleSet || null) != null) {
        standardTableCustomOption.style = styleSet;
      }

      if ((tableScroll || null) != null) {
        standardTableCustomOption.scroll = tableScroll;
      }

      standardTableCustomOption.expandable = _objectSpread(_objectSpread({}, {
        rowExpandable: false,
        expandedRowRender: null
      }), expandable || {});
      return /*#__PURE__*/_react["default"].createElement(_StandardTableCustom["default"], standardTableCustomOption);
    };

    _this.lastLoadParams = null;
    var defaultState = (0, _tools.defaultListState)();
    _this.state = _objectSpread(_objectSpread({}, _this.state), defaultState);
    return _this;
  }

  return SinglePage;
}(_Base2["default"]);

var _default = SinglePage;
exports["default"] = _default;