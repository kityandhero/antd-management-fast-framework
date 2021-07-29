"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/back-top/style");

var _backTop = _interopRequireDefault(require("antd/es/back-top"));

require("antd/es/card/style");

var _card = _interopRequireDefault(require("antd/es/card"));

require("antd/es/list/style");

var _list = _interopRequireDefault(require("antd/es/list"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/alert/style");

var _alert = _interopRequireDefault(require("antd/es/alert"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

require("antd/es/badge/style");

var _badge = _interopRequireDefault(require("antd/es/badge"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _proLayout = require("@ant-design/pro-layout");

var _tools = require("../../../utils/tools");

var _constants = require("../../../utils/constants");

var _EverySpace = _interopRequireDefault(require("../../../customComponents/EverySpace"));

var _IconInfo = _interopRequireDefault(require("../../../customComponents/IconInfo"));

var _EllipsisCustom = _interopRequireDefault(require("../../../customComponents/EllipsisCustom"));

var _Ellipsis = _interopRequireDefault(require("../../../customComponents/Ellipsis"));

var _ImageBox = _interopRequireDefault(require("../../../customComponents/ImageBox"));

var _HelpCard = _interopRequireDefault(require("../../../customComponents/HelpCard"));

var _FunctionComponent = require("../../../customComponents/FunctionComponent");

var _DecorateAvatar = require("../../../customComponents/DecorateAvatar");

var _StandardTableCustom = require("../../../customComponents/StandardTableCustom");

var _AuthorizationWrapper2 = _interopRequireDefault(require("../../AuthorizationWrapper"));

var _DensityAction = _interopRequireDefault(require("../DensityAction"));

var _ColumnSetting = _interopRequireDefault(require("../ColumnSetting"));

var _BatchAction = _interopRequireDefault(require("../BatchAction"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var FormItem = _form["default"].Item;
var RangePicker = _datePicker["default"].RangePicker;

var ListBase = /*#__PURE__*/function (_AuthorizationWrapper) {
  _inherits(ListBase, _AuthorizationWrapper);

  var _super = _createSuper(ListBase);

  function ListBase(props) {
    var _this;

    _classCallCheck(this, ListBase);

    _this = _super.call(this, props);
    _this.formRef = /*#__PURE__*/_react["default"].createRef();

    _this.afterLoadSuccess = function (metaData, metaListData, metaExtra, metaOriginalData) {
      _this.doOtherAfterLoadSuccess(metaData, metaListData, metaExtra, metaOriginalData);
    };

    _this.doOtherAfterLoadSuccess = function (metaData, metaListData, metaExtra, metaOriginalData) {};

    _this.onDateRangeChange = function (dates, dateStrings) {
      _this.setState({
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
    };

    _this.handleSelectRows = function (rows) {
      _this.setState({
        selectedDataTableDataRows: rows
      });
    };

    _this.clearSelectRow = function () {
      _this.setState({
        selectedDataTableDataRows: []
      });
    };

    _this.setSearchFormFieldsValue = function (v) {
      var form = _this.getSearchForm();

      if (form != null) {
        form.setFieldsValue(v);

        _this.afterSetSearchFormFieldsValue(v);
      }
    };

    _this.afterSetSearchFormFieldsValue = function (v) {};

    _this.getPageName = function () {
      var pageName = _this.state.pageName;
      return pageName;
    };

    _this.getColumnWrapper = function () {
      return [];
    };

    _this.buildColumnFromWrapper = function () {
      var list = _this.getColumnWrapper() || [];
      return _this.buildColumnList(list);
    };

    _this.buildColumnList = function (list) {
      return ((0, _tools.isArray)(list) ? list : []).map(function (o) {
        return _this.buildColumnItem(o);
      });
    };

    _this.buildColumnItem = function (o) {
      var d = _objectSpread({}, o);

      var _showHelper$placehold = _objectSpread(_objectSpread({}, {
        showHelper: false,
        placeholder: false
      }), o || {}),
          dataTarget = _showHelper$placehold.dataTarget,
          showHelper = _showHelper$placehold.showHelper,
          placeholder = _showHelper$placehold.placeholder;

      if (placeholder || false) {
        return d;
      }

      if ((dataTarget || null) == null) {
        var text = "\u9519\u8BEF\u7684\u5217\u914D\u7F6E,\u7F3A\u5C11dataTarget:".concat(JSON.stringify({
          el: _this.constructor.name,
          column: o
        }));
        (0, _tools.showRuntimeErrorMessage)(text);
        (0, _tools.recordText)(text);
      } else {
        var label = dataTarget.label,
            name = dataTarget.name,
            helper = dataTarget.helper;

        if ((label || null) == null || (name || null) == null) {
          var _text = "\u9519\u8BEF\u7684\u5217\u914D\u7F6E\uFF0CdataTarget\u5185\u5BB9\u7F3A\u5931:".concat(JSON.stringify({
            column: o
          }));

          (0, _tools.showRuntimeErrorMessage)(_text);
          (0, _tools.recordText)(_text);
        } else {
          d.title = showHelper ? /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
            icon: /*#__PURE__*/_react["default"].createElement(_icons.InfoCircleOutlined, null),
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
        facadeConfig: {},
        facadeConfigBuilder: function facadeConfigBuilder() {},
        sorter: false
      }), d),
          align = _align$showRichFacade.align,
          showRichFacade = _align$showRichFacade.showRichFacade,
          facadeMode = _align$showRichFacade.facadeMode,
          facadeConfigSource = _align$showRichFacade.facadeConfig,
          facadeConfigBuilder = _align$showRichFacade.facadeConfigBuilder,
          sorter = _align$showRichFacade.sorter;

      d.align = align;
      d.sorter = sorter;

      if (!(0, _tools.isFunction)(d.render) && showRichFacade) {
        var _canCopy$emptyValue$d = _objectSpread(_objectSpread({}, {
          canCopy: false,
          emptyValue: null
        }), d),
            canCopy = _canCopy$emptyValue$d.canCopy,
            emptyValue = _canCopy$emptyValue$d.emptyValue;

        var tooltipPlacement = 'top';

        if (align === 'left') {
          tooltipPlacement = 'topLeft';
        }

        if (align === 'right') {
          tooltipPlacement = 'topRight';
        }

        d.render = function (value, record) {
          var val = value;
          var facadeConfig = facadeConfigSource || {};

          if ((0, _tools.isFunction)(facadeConfigBuilder)) {
            facadeConfig = _objectSpread(_objectSpread({}, facadeConfig), facadeConfigBuilder(value, record) || {});
          }

          if ((0, _tools.stringIsNullOrWhiteSpace)(facadeMode) || facadeMode === _constants.columnFacadeMode.ellipsis) {
            if ((0, _tools.isFunction)(d.formatValue)) {
              val = d.formatValue(value, record);
            }

            var _color$facadeConfig = _objectSpread(_objectSpread({}, {
              color: null
            }), facadeConfig),
                color = _color$facadeConfig.color;

            if ((0, _tools.stringIsNullOrWhiteSpace)(val)) {
              return emptyValue;
            }

            if (canCopy) {
              return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_EllipsisCustom["default"], {
                style: _objectSpread({}, (color || null) == null ? {} : {
                  color: color
                }),
                tooltip: {
                  placement: tooltipPlacement
                },
                lines: 1,
                removeChildren: true,
                extraContent: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("a", {
                  onClick: function onClick() {
                    (0, _tools.copyToClipboard)(val);
                  }
                }, (0, _tools.replaceTargetText)(val, '***', 2, 6)))
              }, val || emptyValue, " [\u70B9\u51FB\u590D\u5236]"));
            }

            return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
              style: _objectSpread({}, (color || null) == null ? {} : {
                color: color
              }),
              tooltip: {
                placement: tooltipPlacement
              },
              lines: 1
            }, val || emptyValue));
          }

          if (facadeMode === _constants.columnFacadeMode.datetime) {
            var _color$datetimeFormat = _objectSpread(_objectSpread({}, {
              color: null,
              datetimeFormat: _constants.datetimeFormat.yearMonthDayHourMinuteSecond
            }), facadeConfig),
                _color = _color$datetimeFormat.color,
                datetimeFormatValue = _color$datetimeFormat.datetimeFormat;

            val = (0, _tools.stringIsNullOrWhiteSpace)(val) ? '' : (0, _tools.formatDatetime)(val, datetimeFormatValue) || '';
            return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
              style: _objectSpread({}, (_color || null) == null ? {} : {
                color: _color
              }),
              tooltip: {
                placement: tooltipPlacement
              },
              lines: 1
            }, val || emptyValue));
          }

          if (facadeMode === _constants.columnFacadeMode.money) {
            var _color$facadeConfig2 = _objectSpread(_objectSpread({}, {
              color: null
            }), facadeConfig),
                _color2 = _color$facadeConfig2.color;

            val = (0, _tools.stringIsNullOrWhiteSpace)(val) ? '' : val;
            return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Ellipsis["default"], {
              style: _objectSpread({}, (_color2 || null) == null ? {} : {
                color: _color2
              }),
              tooltip: {
                placement: tooltipPlacement
              },
              lines: 1
            }, (0, _tools.formatMoney)(val) || emptyValue));
          }

          if (facadeMode === _constants.columnFacadeMode.image) {
            if ((0, _tools.isFunction)(d.formatValue)) {
              val = d.formatValue(value, record);
            }

            var _imageWidth$circle$pr = _objectSpread(_objectSpread({}, {
              imageWidth: '30px',
              circle: true,
              previewSimpleMask: true
            }), facadeConfig),
                imageWidth = _imageWidth$circle$pr.imageWidth,
                circle = _imageWidth$circle$pr.circle,
                previewSimpleMask = _imageWidth$circle$pr.previewSimpleMask;

            return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_row["default"], null, /*#__PURE__*/_react["default"].createElement(_col["default"], {
              flex: "auto"
            }), /*#__PURE__*/_react["default"].createElement(_col["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
              style: {
                width: imageWidth
              }
            }, /*#__PURE__*/_react["default"].createElement(_ImageBox["default"], {
              src: val || _constants.defaultEmptyImage,
              circle: circle,
              loadingEffect: true,
              errorOverlayVisible: true,
              showErrorIcon: false,
              alt: "",
              preview: !(0, _tools.stringIsNullOrWhiteSpace)(val),
              previewSimpleMask: previewSimpleMask
            }))), /*#__PURE__*/_react["default"].createElement(_col["default"], {
              flex: "auto"
            })));
          }

          if (facadeMode === _constants.columnFacadeMode.badge) {
            if ((0, _tools.isFunction)(d.formatValue)) {
              val = d.formatValue(value, record);
            }

            var _status$text$facadeCo = _objectSpread(_objectSpread({}, {
              status: 'default',
              text: ''
            }), facadeConfig),
                status = _status$text$facadeCo.status,
                _text2 = _status$text$facadeCo.text;

            return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_badge["default"], {
              status: status,
              text: _text2
            }));
          }

          throw new Error("\u65E0\u6548\u7684\u6E32\u67D3\u6A21\u5F0F\uFF1A".concat(facadeMode));
        };
      }

      return d;
    };

    _this.getColumn = function () {
      return _this.buildColumnFromWrapper();
    };

    _this.getColumnMerged = function () {
      var columns = [];

      var columnsSource = _this.getColumn();

      var columnsOtherConfigArray = _this.columnsOtherConfig || [];

      if ((0, _tools.isArray)(columnsOtherConfigArray)) {
        if (columnsOtherConfigArray.length > 0) {
          if (columnsSource.length !== columnsOtherConfigArray.length) {
            _this.restoreColumnsOtherConfigArray();
          } else {
            columnsSource.forEach(function (item, index) {
              var c = _objectSpread(_objectSpread({}, item), columnsOtherConfigArray[index]);

              var _ref = c || {
                show: true
              },
                  show = _ref.show;

              if (show) {
                columns.push(c);
              }
            });
          }
        } else {
          _this.restoreColumnsOtherConfigArray();

          columns = columnsSource;
        }
      } else {
        columns = columnsSource;
      }

      return columns;
    };

    _this.handleFormReset = function () {// 需要继承重载
    };

    _this.handleFormOtherReset = function () {};

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

    _this.getSearchForm = function () {
      return _this.formRef.current;
    };

    _this.buildSearchFormContent = function (config) {
      if ((config || null) == null) {
        return null;
      }

      var configData = _objectSpread(_objectSpread({}, {
        otherComponent: null,
        list: []
      }), config || {});

      var otherComponent = configData.otherComponent,
          list = configData.list;
      var listData = [];

      if ((0, _tools.isArray)(list)) {
        list.forEach(function (co) {
          listData.push(co);
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_row["default"], {
        gutter: 24
      }, listData.map(function (item, index) {
        return _this.buildSearchFormContentItem(item, index);
      })), otherComponent);
    };

    _this.buildSearchFormContentItem = function (contentItem, contentIndex) {
      var contentItemKey = "searchFormContent_key_".concat(contentIndex);

      var _lg$md$sm$xs$type$ico = _objectSpread(_objectSpread({}, {
        lg: 6,
        md: 12,
        sm: 24,
        xs: 24,
        type: '',
        icon: null,
        fieldData: {
          label: '',
          name: '',
          helper: ''
        },
        showHelper: false,
        component: null,
        otherProps: null
      }), contentItem || {}),
          lgValue = _lg$md$sm$xs$type$ico.lg,
          md = _lg$md$sm$xs$type$ico.md,
          sm = _lg$md$sm$xs$type$ico.sm,
          xs = _lg$md$sm$xs$type$ico.xs,
          type = _lg$md$sm$xs$type$ico.type,
          fieldDataValue = _lg$md$sm$xs$type$ico.fieldData,
          icon = _lg$md$sm$xs$type$ico.icon,
          showHelper = _lg$md$sm$xs$type$ico.showHelper,
          component = _lg$md$sm$xs$type$ico.component,
          otherProps = _lg$md$sm$xs$type$ico.otherProps;

      var fieldData = _objectSpread(_objectSpread({}, {
        label: '',
        name: '',
        helper: ''
      }), fieldDataValue || {});

      var lg = (lgValue || 6) <= 0 ? 6 : lgValue;
      lg = lg > 24 ? 24 : lg;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        key: contentItemKey,
        lg: lg || 6,
        md: md,
        sm: sm,
        xs: xs
      }, type === _constants.searchFormContentConfig.contentItemType.input ? _this.renderSearchInput(fieldData.label, fieldData.name, showHelper ? fieldData.helper : '', icon || /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {})) : null, type === _constants.searchFormContentConfig.contentItemType.inputNumber ? _this.renderSearchInputNumber(fieldData.label, fieldData.name, fieldData.helper, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {})) : null, type === _constants.searchFormContentConfig.contentItemType.datePicker ? _this.renderFormDatePicker(fieldData.label, fieldData.name, false, fieldData.helper, _objectSpread(_objectSpread({}, {}), otherProps || {})) : null, type === _constants.searchFormContentConfig.contentItemType.customRangePicker ? _this.renderSimpleFormRangePickerCore(contentItem.dateRangeFieldName, _objectSpread(_objectSpread({}, {}), otherProps || {})) : null, type === _constants.searchFormContentConfig.contentItemType.onlyShowInput ? _this.renderFormOnlyShowInput(fieldData.label, contentItem.value, fieldData.helper || '', contentItem.icon || /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), _objectSpread(_objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), {
        disabled: true
      })) : null, type === _constants.searchFormContentConfig.contentItemType.customSelect ? contentItem.component : null, type === _constants.searchFormContentConfig.contentItemType.customRadio ? contentItem.component : null, type === _constants.searchFormContentConfig.contentItemType.innerComponent ? _this.renderFormInnerComponent(fieldData.label, component, fieldData.helper, null, false) : null, type === _constants.searchFormContentConfig.contentItemType.component ? component || null : null);
    };

    _this.searchFormContentConfigData = function () {
      var dateRangeFieldName = _this.state.dateRangeFieldName;
      return {
        list: [{
          lg: 10,
          type: _constants.searchFormContentConfig.contentItemType.customRangePicker,
          dateRangeFieldName: dateRangeFieldName
        }, {
          lg: 6,
          type: _constants.searchFormContentConfig.contentItemType.component,
          component: _this.renderSimpleFormButtonCore()
        }]
      };
    };

    _this.renderSimpleFormButtonCore = function () {
      var _this$state = _this.state,
          dataLoading = _this$state.dataLoading,
          reloading = _this$state.reloading,
          searching = _this$state.searching;
      return /*#__PURE__*/_react["default"].createElement("span", {
        className: _index["default"].submitButtons
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        disabled: dataLoading || reloading || searching,
        type: "primary",
        onClick: function onClick(e) {
          _this.handleSearch(e);
        }
      }, searching ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.SearchOutlined, null), "\u67E5\u8BE2"), /*#__PURE__*/_react["default"].createElement(_button["default"], {
        disabled: dataLoading || reloading || searching,
        style: {
          marginLeft: 8
        },
        onClick: function onClick() {
          _this.handleFormReset();
        }
      }, reloading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.ReloadOutlined, null), "\u91CD\u7F6E"));
    };

    _this.renderSimpleFormButton = function () {
      var ColMd = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        md: ColMd,
        sm: 24
      }, _this.renderSimpleFormButtonCore());
    };

    _this.renderSimpleFormRangePickerCore = function (dateRangeFieldName) {
      var rangePickerProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var _this$state2 = _this.state,
          startTime = _this$state2.startTime,
          endTime = _this$state2.endTime;
      var valueList = [];

      if ((startTime || null) != null) {
        valueList.push((0, _tools.stringToMoment)(startTime));
      }

      if ((endTime || null) != null) {
        valueList.push((0, _tools.stringToMoment)(endTime));
      }

      var p = _objectSpread({}, _objectSpread({
        style: {
          width: '100%'
        },
        showTime: {
          format: 'HH:mm'
        },
        value: valueList,
        format: _constants.datetimeFormat.yearMonthDayHourMinute,
        placeholder: ['开始时间', '结束时间'],
        onChange: function onChange(dates, dateStrings) {
          _this.onDateRangeChange(dates, dateStrings);
        }
      }, rangePickerProps || {}));

      return /*#__PURE__*/_react["default"].createElement(FormItem, {
        label: dateRangeFieldName,
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(dateRangeFieldName, '选择')
        }]
      }, /*#__PURE__*/_react["default"].createElement(RangePicker, p));
    };

    _this.renderSimpleFormRangePicker = function (dateRangeFieldName) {
      var colLg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8;
      var rangePickerProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return /*#__PURE__*/_react["default"].createElement(_col["default"], {
        lg: colLg,
        md: 12,
        sm: 24,
        xs: 24
      }, _this.renderSimpleFormRangePickerCore(dateRangeFieldName, rangePickerProps));
    };

    _this.renderSimpleFormRow = function () {
      var searchFormContentConfigData = _this.searchFormContentConfigData();

      if ((searchFormContentConfigData || null) == null) {
        return null;
      }

      return _this.buildSearchFormContent(searchFormContentConfigData);
    };

    _this.renderSimpleFormInitialValues = function () {
      return {};
    };

    _this.renderSimpleForm = function () {
      var el = _this.renderSimpleFormRow();

      if ((el || null) == null) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_form["default"], {
        ref: _this.formRef,
        initialValues: _this.renderSimpleFormInitialValues(),
        onSubmit: _this.handleSearch,
        layout: "horizontal"
      }, el);
    };

    _this.renderForm = function () {
      return _this.renderSimpleForm();
    };

    _this.buildTableOtherConfig = function () {
      // 可以配置额外的Table属性
      return {};
    };

    _this.buildTableExpandableConfig = function () {
      // 可以配置额外的Table属性
      return {};
    };

    _this.restoreColumnsOtherConfigArray = function () {
      var columnsOtherConfigArray = _this.getColumn().map(function (item) {
        return {
          dataIndex: item.dataIndex,
          show: true,
          fixed: item.fixed || ''
        };
      });

      _this.columnsOtherConfig = columnsOtherConfigArray;
    };

    _this.buildTableConfig = function () {
      var tableSize = _this.state.tableSize;

      var columns = _this.getColumnMerged();

      var expandable = _this.buildTableExpandableConfig();

      return _objectSpread(_objectSpread({}, _this.buildTableOtherConfig()), {}, {
        columns: columns,
        size: tableSize,
        expandable: expandable
      });
    };

    _this.setTableSize = function (key) {
      _this.setState({
        tableSize: key
      });
    };

    _this.setColumnsMap = function (e) {
      if (Object.keys(e || {}).length === 0) {
        _this.restoreColumnsOtherConfigArray();
      } else {
        var columnsOtherConfigArrayChanged = (_this.columnsOtherConfig || []).map(function (item) {
          var dataIndex = item.dataIndex;

          if (!(0, _tools.isUndefined)(e[dataIndex])) {
            var d = e[dataIndex];
            d.show = (0, _tools.isUndefined)(d.show) ? true : d.show;
            return _objectSpread(_objectSpread({}, item), d);
          }

          return item;
        });
        _this.columnsOtherConfig = columnsOtherConfigArrayChanged;
      }

      var counterSetColumnsOtherConfig = _this.state.counterSetColumnsOtherConfig;

      _this.setState({
        counterSetColumnsOtherConfig: counterSetColumnsOtherConfig + 1
      });
    };

    _this.setSortKeyColumns = function (e) {};

    _this.getColumnsMap = function () {
      var o = {};
      (_this.columnsOtherConfig || []).forEach(function (item) {
        var dataIndex = item.dataIndex;

        var temp = _objectSpread(_objectSpread({}, {}), item);

        if (temp["delete"]) {
          temp["delete"]('dataIndex');
        }

        o["".concat(dataIndex)] = temp;
      });
      return o;
    };

    _this.onBatchActionSelect = function (key) {};

    _this.renderTable = function (config) {
      return null;
    };

    _this.renderAlertContent = function () {
      return '';
    };

    _this.renderAlertOption = function () {};

    _this.renderAboveTable = function () {
      var content = _this.renderAlertContent();

      var option = _this.renderAlertOption();

      if (!content && !option) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].alertContainor
      }, /*#__PURE__*/_react["default"].createElement(_alert["default"], {
        message: /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].alertInfo
        }, /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].alertContent
        }, content), option && /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].alertOption
        }, option)),
        type: "info",
        showIcon: true
      }));
    };

    _this.renderExtraButtonList = function () {
      return null;
    };

    _this.renderExtraAction = function () {
      var buttonList = _this.renderExtraButtonList();

      if ((0, _tools.isArray)(buttonList)) {
        var list = [];
        buttonList.forEach(function (eo, ei) {
          list.push(eo);

          if (ei !== buttonList.length - 1) {
            list.push('');
          }
        });
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, list.map(function (item, index) {
          var key = "extraAction_button_".concat(index);

          if ((0, _tools.stringIsNullOrWhiteSpace)(item)) {
            return /*#__PURE__*/_react["default"].createElement(_divider["default"], {
              key: key,
              type: "vertical"
            });
          }

          return /*#__PURE__*/_react["default"].createElement("span", {
            key: key
          }, item);
        }));
      }

      return null;
    };

    _this.renderBatchActionMenu = function () {
      return [];
    };

    _this.renderBatchAction = function () {
      var _this$state3 = _this.state,
          showSelect = _this$state3.showSelect,
          selectedDataTableDataRows = _this$state3.selectedDataTableDataRows;
      var selectRows = (0, _tools.isArray)(selectedDataTableDataRows) ? selectedDataTableDataRows : [];

      if (showSelect) {
        var batchActionMenu = _this.renderBatchActionMenu();

        if ((batchActionMenu || []).length > 0) {
          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_BatchAction["default"].Button, {
            onSelect: function onSelect(key) {
              _this.onBatchActionSelect(key);
            },
            menus: batchActionMenu,
            disabled: selectRows.length === 0
          }, "\u6279\u91CF\u64CD\u4F5C"), /*#__PURE__*/_react["default"].createElement(_divider["default"], {
            type: "vertical"
          }));
        }
      }

      return null;
    };

    _this.buildOtherTabProps = function () {
      var tabListAvailable = _this.getTabListAvailable();

      if (tabListAvailable.length > 0) {
        return {
          type: 'card',
          size: 'small',
          tabBarStyle: {
            marginBottom: 0
          },
          tabBarGutter: 3
        };
      }

      return null;
    };

    _this.adjustTabListAvailable = function (tabListAvailable) {
      return tabListAvailable;
    };

    _this.getTabListAvailable = function () {
      var tabListAvailable = [];
      (_this.tabList || []).forEach(function (o) {
        var v = typeof o.show === 'undefined' ? true : o.show === true;

        if (v) {
          tabListAvailable.push(o);
        }
      });
      return _this.adjustTabListAvailable(tabListAvailable);
    };

    _this.getTabActiveKey = function () {
      var _this$props = _this.props,
          match = _this$props.match,
          pathname = _this$props.location.pathname;
      return pathname.replace(/\//g, '-').replace("".concat(match.url.replace(/\//g, '-'), "-"), '').replace(/-/g, '/');
    };

    _this.handleTabChange = function (key) {};

    _this.onPageHeaderAvatarLoadErrorCallback = function () {
      _this.setState({
        avatarImageLoadResult: _DecorateAvatar.avatarImageLoadResultCollection.fail
      });
    };

    _this.pageHeaderActionExtraGroup = function () {
      return null;
    };

    _this.pageHeaderActionExtraEllipsis = function () {
      return null;
    };

    _this.pageHeaderAction = function () {
      var buttonGroupData = _this.pageHeaderActionExtraGroup();

      var ellipsisActionData = _this.pageHeaderActionExtraEllipsis();

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].buttonBox
      }, (0, _FunctionComponent.buildButtonGroup)(buttonGroupData), (ellipsisActionData || null) == null ? null : /*#__PURE__*/_react["default"].createElement(_divider["default"], {
        type: "vertical"
      }), (0, _FunctionComponent.buildDropdownEllipsis)(ellipsisActionData)));
    };

    _this.pageHeaderTagList = function () {
      return [];
    };

    _this.pageHeaderTag = function () {
      return (0, _FunctionComponent.buildTagList)({
        list: _this.pageHeaderTagList()
      });
    };

    _this.pageHeaderAvatar = function () {
      return null;
    };

    _this.pageHeaderTitlePrefix = function () {
      return '';
    };

    _this.pageHeaderSubTitle = function () {
      return null;
    };

    _this.pageHeaderContentGridData = function () {
      return [];
    };

    _this.pageHeaderContentGridConfig = function () {
      return {
        type: _constants.pageHeaderRenderType.descriptionGrid,
        list: _this.pageHeaderContentGridData()
      };
    };

    _this.pageHeaderContentParagraphData = function () {
      return [];
    };

    _this.pageHeaderContentParagraphConfig = function () {
      return {
        type: _constants.pageHeaderRenderType.paragraph,
        list: _this.pageHeaderContentParagraphData()
      };
    };

    _this.pageHeaderContentActionData = function () {
      return [];
    };

    _this.pageHeaderContentActionConfig = function () {
      return {
        type: _constants.pageHeaderRenderType.paragraph,
        list: _this.pageHeaderContentActionData()
      };
    };

    _this.pageHeaderContentData = function () {
      return {
        list: [_this.pageHeaderContentGridConfig(), _this.pageHeaderContentParagraphConfig(), _this.pageHeaderContentActionConfig()]
      };
    };

    _this.renderPageHeaderContent = function () {
      return (0, _FunctionComponent.pageHeaderContent)(_this.pageHeaderContentData() || {});
    };

    _this.pageHeaderExtraContentData = function () {
      return null;
    };

    _this.renderPageHeaderExtraContent = function () {
      return (0, _FunctionComponent.pageHeaderExtraContent)(_this.pageHeaderExtraContentData());
    };

    _this.renderCardExtraAction = function () {
      var _this$state4 = _this.state,
          tableSize = _this$state4.tableSize,
          refreshing = _this$state4.refreshing;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_DensityAction["default"], {
        tableSize: tableSize,
        setTableSize: function setTableSize(key) {
          _this.setTableSize(key);
        }
      }), /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
        title: "\u5237\u65B0\u672C\u9875"
      }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
        shape: "circle",
        style: {
          color: '#000',
          border: 0
        },
        loading: refreshing,
        icon: /*#__PURE__*/_react["default"].createElement(_icons.ReloadOutlined, null),
        onClick: function onClick() {
          _this.refreshData();
        }
      })), /*#__PURE__*/_react["default"].createElement(_ColumnSetting["default"], {
        columns: _this.getColumn(),
        columnsMap: _this.getColumnsMap(),
        setColumnsMap: function setColumnsMap(e) {
          _this.setColumnsMap(e);
        },
        setSortKeyColumns: function setSortKeyColumns(key) {
          _this.setSortKeyColumns(key);
        }
      }));
    };

    _this.renderListViewItem = function (record, index) {
      return /*#__PURE__*/_react["default"].createElement(_list["default"].Item, {
        actions: _this.renderListViewItemActions(record, index),
        extra: _this.renderListViewItemExtra(record, index)
      }, _this.renderListViewItemInner(record, index));
    };

    _this.renderListViewItemInner = function (record, index) {
      return null;
    };

    _this.renderListViewItemExtra = function (record, index) {
      return null;
    };

    _this.renderListViewItemActions = function (record, index) {
      var showListViewItemActionSelect = _this.state.showListViewItemActionSelect;

      var actionOthers = _this.renderListViewItemActionOthers(record, index);

      var actionSelect = [];

      if (showListViewItemActionSelect || false) {
        actionSelect = _this.renderListViewItemActionSelect(record, index);
      }

      if (actionSelect == null) {
        return _toConsumableArray((0, _tools.isArray)(actionOthers) ? actionOthers : []);
      }

      return [].concat(_toConsumableArray((0, _tools.isArray)(actionOthers) ? actionOthers : []), [actionSelect]);
    };

    _this.renderListViewItemActionOthers = function (record, index) {
      return null;
    };

    _this.renderListViewItemActionSelect = function (record, index) {
      return null;
    };

    _this.renderListViewItemLayout = function () {
      return 'horizontal';
    };

    _this.renderListViewSize = function () {
      return 'default';
    };

    _this.renderListView = function () {
      (0, _tools.showRuntimeErrorMessage)('需要重载实现renderListView');
      return null;
    };

    _this.buildWrapperTypeConfig = function () {
      return {
        mode: _constants.contentConfig.wrapperType.page
      };
    };

    _this.buildToolBarConfig = function () {
      return null;
    };

    _this.buildToolBar = function () {
      var config = _this.buildToolBarConfig();

      if ((config || null) == null) {
        return null;
      }

      var _stick$title$tools$co = _objectSpread(_objectSpread({}, {
        stick: false,
        title: '工具栏',
        tools: []
      }), config),
          stick = _stick$title$tools$co.stick,
          title = _stick$title$tools$co.title,
          tools = _stick$title$tools$co.tools;

      if (!(0, _tools.isArray)(tools)) {
        showErrorMessage('工具栏配置数据无效');
        recordObject(config);
        return null;
      }

      var toolList = tools.map(function (o, index) {
        return _objectSpread(_objectSpread({}, o), {
          key: "toolItem_".concat(index)
        });
      });

      var bar = /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          backgroundColor: 'rgb(240, 242, 245)'
        }
      }, /*#__PURE__*/_react["default"].createElement(_card["default"], {
        title: /*#__PURE__*/_react["default"].createElement(_IconInfo["default"], {
          icon: /*#__PURE__*/_react["default"].createElement(ToolOutlined, null),
          text: title || '工具栏'
        }),
        bordered: false,
        bodyStyle: {
          padding: 0
        },
        extra: /*#__PURE__*/_react["default"].createElement(Space, {
          split: /*#__PURE__*/_react["default"].createElement(_divider["default"], {
            type: "vertical"
          })
        }, toolList.map(function (o) {
          return /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
            key: o.key,
            title: o.title || ''
          }, o.component);
        }))
      }), /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
        size: 2,
        direction: "horizontal"
      }));

      if (isBoolean(stick) && stick) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(Affix, {
          offsetTop: 0
        }, bar), /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
          size: 20,
          direction: "horizontal"
        }));
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, bar, /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
        size: 20,
        direction: "horizontal"
      }));
    };

    _this.buildToolBarWrapper = function () {
      var toolBar = _this.buildToolBar();

      if ((toolBar || null) == null) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, toolBar);
    };

    _this.buildHelpConfig = function () {
      return null;
    };

    _this.buildHelp = function () {
      var formContentWrapperTypeConfig = _this.buildWrapperTypeConfig() || {
        mode: _constants.contentConfig.wrapperType.page
      };

      var configData = _objectSpread(_objectSpread({}, {
        mode: _constants.contentConfig.wrapperType.page
      }), formContentWrapperTypeConfig || {});

      var mode = configData.mode;

      var config = _this.buildHelpConfig();

      if ((config || null) == null) {
        return null;
      }

      var _title$showNumber$lis = _objectSpread(_objectSpread({}, {
        title: '操作帮助',
        showNumber: true,
        list: []
      }), config),
          title = _title$showNumber$lis.title,
          showNumber = _title$showNumber$lis.showNumber,
          list = _title$showNumber$lis.list;

      if (!(0, _tools.isArray)(list)) {
        showErrorMessage('帮助条目数据无效');
        recordObject(config);
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_HelpCard["default"], {
        border: mode !== _constants.contentConfig.wrapperType.model && mode !== _constants.contentConfig.wrapperType.drawer,
        compact: mode === _constants.contentConfig.wrapperType.model,
        helpBoxProps: {
          title: title || '操作帮助',
          showNumber: showNumber || false,
          list: list
        }
      });
    };

    _this.buildHelpWrapper = function () {
      var formContentWrapperTypeConfig = _this.buildWrapperTypeConfig() || {
        mode: _constants.contentConfig.wrapperType.page
      };

      var configData = _objectSpread(_objectSpread({}, {
        mode: _constants.contentConfig.wrapperType.page
      }), formContentWrapperTypeConfig || {});

      var mode = configData.mode;

      var help = _this.buildHelp();

      if ((help || null) == null) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, mode !== _constants.contentConfig.wrapperType.model ? /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
        size: 22,
        direction: "horizontal"
      }) : null, help);
    };

    _this.renderPageContent = function () {
      var _this$state5 = _this.state,
          listTitle = _this$state5.listTitle,
          renderSearchForm = _this$state5.renderSearchForm;

      var extraAction = _this.renderExtraAction();

      var searchForm = _this.renderForm();

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].containorBox
      }, _this.buildToolBarWrapper(), renderSearchForm && (searchForm || null) != null ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_card["default"], {
        bordered: false,
        className: _index["default"].containorSearch
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].tableListForm
      }, searchForm)), /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
        size: 24,
        direction: "horizontal"
      })) : null, /*#__PURE__*/_react["default"].createElement(_card["default"], {
        title: listTitle,
        headStyle: {
          borderBottom: '0px'
        },
        bodyStyle: {
          paddingTop: '0',
          paddingBottom: 10
        },
        bordered: false,
        className: _index["default"].containorTable,
        extra: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, extraAction, extraAction == null ? null : /*#__PURE__*/_react["default"].createElement(_divider["default"], {
          type: "vertical"
        }), _this.renderBatchAction(), _this.renderCardExtraAction())
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _index["default"].tableList
      }, _this.renderAboveTable(), _this.renderView())), _this.buildHelpWrapper());
    };

    _this.renderPageBody = function () {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _this.renderPageContent(), _this.renderOther());
    };

    _this.lastLoadParams = null;
    _this.columnsOtherConfig = [];
    var defaultState = (0, _tools.defaultListState)();
    _this.state = _objectSpread(_objectSpread(_objectSpread({}, _this.state), defaultState), {
      renderPageHeaderWrapper: true,
      listTitle: '检索结果',
      defaultAvatarIcon: /*#__PURE__*/_react["default"].createElement(_icons.PictureOutlined, null),
      avatarImageLoadResult: _DecorateAvatar.avatarImageLoadResultCollection.wait,
      showPageHeaderAvatar: false,
      tableSize: _StandardTableCustom.tableSizeConfig.middle,
      counterSetColumnsOtherConfig: 0,
      renderSearchForm: true,
      showListViewItemActionSelect: false
    });
    return _this;
  }

  _createClass(ListBase, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state6 = this.state,
          renderPageHeaderWrapper = _this$state6.renderPageHeaderWrapper,
          showPageHeaderAvatar = _this$state6.showPageHeaderAvatar,
          defaultAvatarIcon = _this$state6.defaultAvatarIcon,
          dataLoading = _this$state6.dataLoading,
          reloading = _this$state6.reloading,
          avatarImageLoadResult = _this$state6.avatarImageLoadResult;
      var tabListAvailable = this.getTabListAvailable();
      var avatarProps = showPageHeaderAvatar ? (0, _DecorateAvatar.decorateAvatar)(this.pageHeaderAvatar(), defaultAvatarIcon, showPageHeaderAvatar, dataLoading, reloading, avatarImageLoadResult, function () {
        _this2.onPageHeaderAvatarLoadErrorCallback();
      }) : null;

      if (renderPageHeaderWrapper || false) {
        return /*#__PURE__*/_react["default"].createElement(_proLayout.PageHeaderWrapper, {
          avatar: avatarProps,
          title: (0, _FunctionComponent.pageHeaderTitle)(this.getPageName(), this.pageHeaderTitlePrefix()),
          subTitle: this.pageHeaderSubTitle(),
          tags: (0, _FunctionComponent.pageHeaderTagWrapper)(this.pageHeaderTag()),
          extra: this.pageHeaderAction(),
          tabActiveKey: this.getTabActiveKey(),
          content: this.renderPageHeaderContent(),
          extraContent: this.renderPageHeaderExtraContent(),
          tabList: tabListAvailable,
          onTabChange: this.handleTabChange,
          tabProps: this.buildOtherTabProps()
        }, this.renderPageBody(), /*#__PURE__*/_react["default"].createElement(_backTop["default"], null));
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderPageBody(), /*#__PURE__*/_react["default"].createElement(_backTop["default"], null));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return (0, _tools.getDerivedStateFromPropsForUrlParams)(nextProps, prevState);
    }
  }]);

  return ListBase;
}(_AuthorizationWrapper2["default"]);

var _default = ListBase;
exports["default"] = _default;