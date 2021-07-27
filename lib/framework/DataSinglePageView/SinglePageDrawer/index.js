"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/drawer/style");

var _drawer = _interopRequireDefault(require("antd/es/drawer"));

require("antd/es/list/style");

var _list = _interopRequireDefault(require("antd/es/list"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/tag/style");

var _tag = _interopRequireDefault(require("antd/es/tag"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/card/style");

var _card = _interopRequireDefault(require("antd/es/card"));

var _react = _interopRequireDefault(require("react"));

var _rcQueueAnim = _interopRequireDefault(require("rc-queue-anim"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

var _FunctionComponent = require("@/customComponents/FunctionComponent");

var _DensityAction = _interopRequireDefault(require("../../DataListView/DensityAction"));

var _ColumnSetting = _interopRequireDefault(require("../../DataListView/ColumnSetting"));

var _SinglePage2 = _interopRequireDefault(require("../SinglePage"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var SinglePageDrawer = /*#__PURE__*/function (_SinglePage) {
  _inherits(SinglePageDrawer, _SinglePage);

  var _super = _createSuper(SinglePageDrawer);

  function SinglePageDrawer(props) {
    var _this;

    _classCallCheck(this, SinglePageDrawer);

    _this = _super.call(this, props);
    _this.loadDataAfterMount = false;
    _this.reloadWhenShow = true;

    _this.doWorkWhenDidUpdate = function (preProps, preState, snapshot) {
      var visiblePre = preState.visible;
      var visible = _this.state.visible;

      if (visible && !visiblePre) {
        if (_this.reloadWhenShow) {
          var that = _assertThisInitialized(_this);

          setTimeout(function () {
            that.reloadData();
          }, 460);
        }

        _this.doOtherWhenChangeVisible(preProps, preState, snapshot);
      }
    };

    _this.doOtherWhenChangeVisible = function (preProps, preState, snapshot) {
      _this.executeAfterDoOtherWhenChangeVisible();
    };

    _this.executeAfterDoOtherWhenChangeVisible = function () {};

    _this.onClose = function () {
      var afterClose = _this.props.afterClose;

      if (typeof afterClose === 'function') {
        afterClose();
      }
    };

    _this.selectRecord = function (e, record) {
      var _this$props = _this.props,
          afterSelectSuccess = _this$props.afterSelectSuccess,
          hideDrawerAfterSelect = _this$props.hideDrawerAfterSelect;

      if ((0, _tools.isFunction)(afterSelectSuccess)) {
        afterSelectSuccess(record);
      }

      if (hideDrawerAfterSelect) {
        _this.hideDrawer();
      }
    };

    _this.renderTitleIcon = function () {
      return /*#__PURE__*/_react["default"].createElement(_icons.ReadOutlined, {
        className: _index["default"].titleIcon
      });
    };

    _this.hideDrawer = function () {
      _this.onClose();
    };

    _this.buildWrapperTypeConfig = function () {
      return {
        mode: _constants.contentConfig.wrapperType.drawer
      };
    };

    _this.renderViewContainor = function () {
      var _this$state = _this.state,
          reloadAnimalShow = _this$state.reloadAnimalShow,
          listTitle = _this$state.listTitle,
          tableSize = _this$state.tableSize,
          refreshing = _this$state.refreshing,
          listViewMode = _this$state.listViewMode,
          renderSearchForm = _this$state.renderSearchForm;

      var extraAction = _this.renderExtraAction();

      var searchForm = _this.renderForm();

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].tableList,
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'hidden'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].containorBox,
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        } : {}
      }, renderSearchForm && (searchForm || null) != null ? /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 0
        } : {}
      }, /*#__PURE__*/_react["default"].createElement(_card["default"], {
        bordered: false,
        className: _index["default"].containorSearch,
        bodyStyle: {
          padding: 0
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].tableListForm
      }, _this.renderForm())), /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: '1px',
          backgroundColor: '#f0f2f5'
        }
      })) : null, /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 'auto',
          overflow: 'hidden'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement(_card["default"], {
        title: /*#__PURE__*/_react["default"].createElement(_row["default"], null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "70px"
        }, " ", listTitle), /*#__PURE__*/_react["default"].createElement(_col["default"], {
          flex: "auto"
        }, /*#__PURE__*/_react["default"].createElement(_rcQueueAnim["default"], null, reloadAnimalShow ? /*#__PURE__*/_react["default"].createElement("div", {
          key: "3069dd18-f530-43ab-b96d-a86f8079358f"
        }, /*#__PURE__*/_react["default"].createElement(_tag["default"], {
          color: "gold"
        }, "\u5373\u5C06\u5237\u65B0")) : null))),
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        } : {},
        headStyle: {
          borderBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          flex: 0
        },
        bodyStyle: {
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          flex: 'auto',
          overflow: 'hidden' // height: 'calc(100vh - 103px)',

        },
        bordered: false,
        className: _index["default"].containorTable,
        extra: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, extraAction, extraAction == null ? null : /*#__PURE__*/_react["default"].createElement(_divider["default"], {
          type: "vertical"
        }), _this.renderBatchAction(), listViewMode === _constants.listViewModeCollection.table ? /*#__PURE__*/_react["default"].createElement(_DensityAction["default"], {
          tableSize: tableSize,
          setTableSize: function setTableSize(key) {
            _this.setTableSize(key);
          }
        }) : null, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
          title: "\u5237\u65B0\u672C\u9875"
        }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
          shape: "circle",
          className: _index["default"].iconAction,
          loading: refreshing,
          icon: /*#__PURE__*/_react["default"].createElement(_icons.ReloadOutlined, null),
          onClick: function onClick() {
            _this.refreshData();
          }
        })), listViewMode === _constants.listViewModeCollection.table ? /*#__PURE__*/_react["default"].createElement(_ColumnSetting["default"], {
          columns: _this.getColumn(),
          columnsMap: _this.getColumnsMap(),
          setColumnsMap: function setColumnsMap(e) {
            _this.setColumnsMap(e);
          },
          setSortKeyColumns: function setSortKeyColumns(key) {
            _this.setSortKeyColumns(key);
          }
        }) : null)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 0
        } : {}
      }, _this.renderAboveTable()), /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 'auto',
          overflow: 'hidden',
          paddingTop: 5
        } : {}
      }, _this.renderView()))))), _this.renderOther());
    };

    _this.renderContentContainor = function () {
      var _this$state2 = _this.state,
          listViewMode = _this$state2.listViewMode,
          renderSearchForm = _this$state2.renderSearchForm;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].contentContainor,
        style: _objectSpread(_objectSpread({}, listViewMode === _constants.listViewModeCollection.list ? {
          paddingBottom: 0,
          height: '100%',
          overflow: 'hidden'
        } : {
          paddingBottom: 0
        }), renderSearchForm ? {} : {
          paddingTop: 0
        })
      }, _this.renderViewContainor());
    };

    _this.renderDrawerInner = function () {
      var listViewMode = _this.state.listViewMode;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].mainContainor,
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'hidden'
        } : {}
      }, _this.renderContentContainor());
    };

    _this.renderListView = function () {
      var _this$state3 = _this.state,
          metaOriginalData = _this$state3.metaOriginalData,
          dataLoading = _this$state3.dataLoading,
          listViewMode = _this$state3.listViewMode;

      var _ref = metaOriginalData || {
        list: [],
        pagination: {}
      },
          list = _ref.list;

      var bottomBar = _this.renderListViewBottomBar();

      return /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 'auto',
          overflow: 'hidden'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement(_list["default"], {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          overflow: 'auto'
        } : {},
        loading: dataLoading,
        itemLayout: _this.renderListViewItemLayout(),
        dataSource: list // pagination={pagination}
        ,
        renderItem: function renderItem(item, index) {
          return _this.renderListViewItem(item, index);
        }
      })), (bottomBar || null) == null ? null : /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 0
        } : {}
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        } : {}
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: listViewMode === _constants.listViewModeCollection.list ? {
          flex: 'auto'
        } : {}
      }), bottomBar)));
    };

    _this.renderListViewBottomBar = function () {
      return null;
    };

    _this.renderListViewItemActionSelect = function (item, index) {
      var that = _assertThisInitialized(_this);

      return (0, _FunctionComponent.buildListViewItemActionSelect)({
        index: index,
        selectData: item,
        selectCallback: function selectCallback(e, data) {
          return that.selectRecord(e, data);
        }
      });
    };

    var s = _this.state;
    s.dataLoading = false;
    _this.state = _objectSpread(_objectSpread({}, s), {
      visible: false,
      reloadAnimalShow: false,
      listViewMode: _constants.listViewModeCollection.table,
      showListViewItemActionSelect: true
    });
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(SinglePageDrawer, [{
    key: "render",
    value: function render() {
      var widthDrawer = this.props.width;
      var _this$state4 = this.state,
          visible = _this$state4.visible,
          listViewMode = _this$state4.listViewMode;
      return /*#__PURE__*/_react["default"].createElement(_drawer["default"], {
        title: /*#__PURE__*/_react["default"].createElement("span", null, this.renderTitleIcon(), this.getPageName()),
        destroyOnClose: false,
        className: _index["default"].containorBox,
        width: widthDrawer,
        placement: "right",
        visible: visible || false,
        onClose: this.onClose,
        bodyStyle: {
          padding: 0
        }
      }, listViewMode === _constants.listViewModeCollection.list ? /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          height: 'calc(100vh - 55px)'
        }
      }, this.renderDrawerInner()) : this.renderDrawerInner());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var visible = nextProps.visible,
          externalData = nextProps.externalData;
      return {
        visible: visible,
        externalData: externalData
      };
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }]);

  return SinglePageDrawer;
}(_SinglePage2["default"]);

var _default = SinglePageDrawer;
exports["default"] = _default;