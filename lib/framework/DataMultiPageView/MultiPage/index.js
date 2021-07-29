'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

require('antd/es/tooltip/style');

var _tooltip = _interopRequireDefault(require('antd/es/tooltip'));

require('antd/es/button/style');

var _button = _interopRequireDefault(require('antd/es/button'));

require('antd/es/spin/style');

var _spin = _interopRequireDefault(require('antd/es/spin'));

require('antd/es/list/style');

var _list = _interopRequireDefault(require('antd/es/list'));

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _react = _interopRequireDefault(require('react'));

var _icons = require('@ant-design/icons');

var _tools = require('../../../utils/tools');

var _constants = require('../../../utils/constants');

var _globalStorageAssist = require('../../../utils/globalStorageAssist');

var _Base2 = _interopRequireDefault(require('../../DataListView/Base'));

var _DensityAction = _interopRequireDefault(
  require('../../DataListView/DensityAction'),
);

var _ColumnSetting = _interopRequireDefault(
  require('../../DataListView/ColumnSetting'),
);

var _StandardTableCustom = _interopRequireDefault(
  require('../../../customComponents/StandardTableCustom'),
);

var _index = _interopRequireDefault(require('./index.less'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true },
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {}),
    );
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

var MultiPage = /*#__PURE__*/ (function(_Base) {
  _inherits(MultiPage, _Base);

  var _super = _createSuper(MultiPage);

  function MultiPage(props) {
    var _this;

    _classCallCheck(this, MultiPage);

    _this = _super.call(this, props);
    _this.lastLoadParams = null;
    _this.useParamsKey = true;

    _this.handleFormReset = function() {
      var checkWorkDoing =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : true;

      if (checkWorkDoing) {
        if (_this.checkWorkDoing()) {
          return;
        }
      }

      var form = _this.getSearchForm();

      var pageSize = _this.state.pageSize;
      form.resetFields();

      _this.handleFormOtherReset();

      _this.setState(
        {
          formValues: {},
          startTime: '',
          endTime: '',
          pageNo: 1,
          pageSize: pageSize,
        },
        function() {
          _this.reloadData();
        },
      );
    };

    _this.adjustLoadRequestParams = function(o) {
      return o || {};
    };

    _this.initLoadRequestParams = function(o) {
      var d = o || {};
      var _this$state = _this.state,
        paramsKey = _this$state.paramsKey,
        loadApiPath = _this$state.loadApiPath,
        formValues = _this$state.formValues,
        filters = _this$state.filters,
        sorter = _this$state.sorter;

      if ((loadApiPath || '') === '') {
        (0, _tools.showRuntimeErrorMessage)('loadApiPath需要配置');
        return d;
      }

      if (_this.useParamsKey) {
        if ((paramsKey || '') === '') {
          (0, _tools.showRuntimeErrorMessage)('paramsKey需要配置');
          return d;
        }

        d = (0, _globalStorageAssist.getParamsDataCache)(paramsKey);
        _this.useParamsKey = false;
      } else {
        var _this$state2 = _this.state,
          startTimeAlias = _this$state2.startTimeAlias,
          endTimeAlias = _this$state2.endTimeAlias,
          pageNo = _this$state2.pageNo,
          pageSize = _this$state2.pageSize,
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

        d = _objectSpread(
          _objectSpread({}, d),
          _objectSpread(
            _objectSpread(
              _objectSpread(_objectSpread({}, formValues || {}), filters || {}),
              {
                pageNo: pageNo,
                pageSize: pageSize,
              },
            ),
            sorter || {},
          ),
        );
        delete d.dateRange;
      }

      return _this.adjustLoadRequestParams(d);
    };

    _this.afterGetFirstRequestResult = function(submitData, responseData) {
      var form = _this.getSearchForm();

      var urlParams = _this.state.urlParams;
      var pageKey = 'no';

      if (urlParams != null) {
        pageKey = urlParams.pageKey || 'no';
      }

      var p = submitData;

      if (pageKey === 'key' && p != null) {
        if (p.startTime && p.endTime) {
          p.dateRange = [
            (0, _tools.dateToMoment)(p.startTime),
            (0, _tools.dateToMoment)(p.endTime),
          ]; // p.dateRange = `${p.startTime}-${p.endTime}`;
        }

        var d = form.getFieldsValue();
        Object.keys(d).forEach(function(key) {
          var c = p[key] === 0 ? 0 : p[key] || null;

          if (c != null) {
            var obj = {};
            obj[key] = (0, _tools.isNumber)(c) ? ''.concat(c) : c;
            form.setFieldsValue(obj);
          }
        });

        _this.adjustRenderLoadRequestParamsWithKey(d);
      }
    };

    _this.adjustRenderLoadRequestParamsWithKey = function(d) {};

    _this.afterGetRequestResult = function() {
      var paramsKey = _this.state.paramsKey;

      if (!(0, _tools.stringIsNullOrWhiteSpace)(paramsKey)) {
        (0, _globalStorageAssist.setParamsDataCache)(
          paramsKey,
          _this.lastLoadParams,
        );
      }
    };

    _this.handleSearch = function(e) {
      e.preventDefault();

      if (_this.checkWorkDoing()) {
        return;
      }

      var form = _this.getSearchForm();

      var validateFields = form.validateFields;
      var pageSize = _this.state.pageSize;
      validateFields()
        .then(function(fieldsValue) {
          var values = _objectSpread(
            _objectSpread({}, fieldsValue),
            {},
            {
              updatedAt:
                fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            },
          );

          _this.searchData({
            formValues: values,
            pageNo: 1,
            pageSize: pageSize,
          });
        })
        ['catch'](function(error) {
          var errorFields = error.errorFields;

          if (!(0, _tools.isUndefined)(errorFields)) {
            var m = [];
            Object.values(errorFields).forEach(function(o) {
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

            _message2['default'].warn(errorMessage);
          } else {
            (0, _tools.showRuntimeErrorMessage)(error);
          }
        });
    };

    _this.handleStandardTableChange = function(pagination, filtersArg, sorter) {
      if (_this.checkWorkDoing()) {
        return;
      }

      var formValues = _this.state.formValues;
      var filters = Object.keys(filtersArg).reduce(function(obj, key) {
        var newObj = _objectSpread({}, obj);

        newObj[key] = (0, _tools.getValue)(filtersArg[key]);
        return newObj;
      }, {});
      var params = {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        formValues: formValues,
        filters: filters,
      };

      if (sorter.field) {
        params.sorter = {
          sorter: ''.concat(sorter.field, '_').concat(sorter.order),
        };
      }

      _this.pageListData(params);
    };

    _this.handleListViewPaginationChange = function(page, pageSize) {
      if (_this.checkWorkDoing()) {
        return;
      }

      var formValues = _this.state.formValues;
      var params = {
        pageNo: page,
        pageSize: pageSize,
        formValues: formValues,
      };

      _this.pageListData(params);
    };

    _this.renderTableView = function() {
      var _this$state3 = _this.state,
        tableScroll = _this$state3.tableScroll,
        showSelect = _this$state3.showSelect,
        selectedDataTableDataRows = _this$state3.selectedDataTableDataRows,
        metaOriginalData = _this$state3.metaOriginalData,
        dataLoading = _this$state3.dataLoading,
        processing = _this$state3.processing;

      var _this$buildTableConfi = _this.buildTableConfig(),
        styleSet = _this$buildTableConfi.styleSet,
        columns = _this$buildTableConfi.columns,
        expandable = _this$buildTableConfi.expandable,
        size = _this$buildTableConfi.size;

      var standardTableCustomOption = {
        loading: dataLoading || processing,
        data: metaOriginalData || {
          list: [],
          pagination: {},
        },
        showSelect: showSelect,
        selectedRows: selectedDataTableDataRows,
        columns: columns,
        size: size,
        onSelectRow: _this.handleSelectRows,
        onChange: _this.handleStandardTableChange,
      };

      if ((styleSet || null) != null) {
        standardTableCustomOption.style = styleSet;
      }

      if ((tableScroll || null) != null) {
        standardTableCustomOption.scroll = tableScroll;
      }

      standardTableCustomOption.expandable = _objectSpread(
        _objectSpread({}, {}),
        expandable || {},
      );
      return /*#__PURE__*/ _react['default'].createElement(
        'div',
        {
          className: _index['default'].tableContainor,
        },
        /*#__PURE__*/ _react['default'].createElement(
          _StandardTableCustom['default'],
          standardTableCustomOption,
        ),
      );
    };

    _this.renderListView = function() {
      var _this$state4 = _this.state,
        metaOriginalData = _this$state4.metaOriginalData,
        dataLoading = _this$state4.dataLoading,
        reloading = _this$state4.reloading,
        processing = _this$state4.processing;

      var _ref = metaOriginalData || {
          list: [],
          pagination: {},
        },
        list = _ref.list,
        pagination = _ref.pagination;

      var paginationConfig = _objectSpread({}, pagination);

      paginationConfig.onChange = _this.handleListViewPaginationChange;
      return /*#__PURE__*/ _react['default'].createElement(
        _spin['default'],
        {
          spinning: dataLoading || reloading || processing,
        },
        /*#__PURE__*/ _react['default'].createElement(_list['default'], {
          itemLayout: _this.renderListViewItemLayout(),
          size: _this.renderListViewSize(),
          dataSource: list,
          pagination: paginationConfig,
          renderItem: function renderItem(item, index) {
            return _this.renderListViewItem(item, index);
          },
        }),
      );
    };

    _this.renderView = function() {
      var _this$state5 = _this.state,
        showSelect = _this$state5.showSelect,
        listViewMode = _this$state5.listViewMode;

      if (listViewMode === _constants.listViewModeCollection.table) {
        return _this.renderTableView();
      }

      if (listViewMode === _constants.listViewModeCollection.list) {
        if (showSelect) {
          (0, _tools.showRuntimeErrorMessage)(
            'MultiListView显示模式下不支持选择',
          );
        }

        return _this.renderListView();
      }

      (0, _tools.showRuntimeErrorMessage)('未知的显示模式');
      return null;
    };

    _this.renderCardExtraAction = function() {
      var _this$state6 = _this.state,
        listViewMode = _this$state6.listViewMode,
        tableSize = _this$state6.tableSize,
        refreshing = _this$state6.refreshing;

      if (listViewMode === _constants.listViewModeCollection.table) {
        return /*#__PURE__*/ _react['default'].createElement(
          _react['default'].Fragment,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _DensityAction['default'],
            {
              tableSize: tableSize,
              setTableSize: function setTableSize(key) {
                _this.setTableSize(key);
              },
            },
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _tooltip['default'],
            {
              title: '\u5237\u65B0\u672C\u9875',
            },
            /*#__PURE__*/ _react['default'].createElement(_button['default'], {
              shape: 'circle',
              style: {
                color: '#000',
                border: 0,
              },
              loading: refreshing,
              icon: /*#__PURE__*/ _react['default'].createElement(
                _icons.ReloadOutlined,
                null,
              ),
              onClick: function onClick() {
                _this.refreshData();
              },
            }),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _ColumnSetting['default'],
            {
              columns: _this.getColumn(),
              columnsMap: _this.getColumnsMap(),
              setColumnsMap: function setColumnsMap(e) {
                _this.setColumnsMap(e);
              },
              setSortKeyColumns: function setSortKeyColumns(key) {
                _this.setSortKeyColumns(key);
              },
            },
          ),
        );
      }

      return /*#__PURE__*/ _react['default'].createElement(
        _react['default'].Fragment,
        null,
        /*#__PURE__*/ _react['default'].createElement(
          _tooltip['default'],
          {
            title: '\u5237\u65B0\u672C\u9875',
          },
          /*#__PURE__*/ _react['default'].createElement(_button['default'], {
            shape: 'circle',
            style: {
              color: '#000',
              border: 0,
            },
            loading: refreshing,
            icon: /*#__PURE__*/ _react['default'].createElement(
              _icons.ReloadOutlined,
              null,
            ),
            onClick: function onClick() {
              _this.refreshData();
            },
          }),
        ),
      );
    };

    var defaultState = (0, _tools.defaultPageListState)();
    _this.state = _objectSpread(_objectSpread({}, _this.state), defaultState);
    return _this;
  }

  return MultiPage;
})(_Base2['default']);

var _default = MultiPage;
exports['default'] = _default;
