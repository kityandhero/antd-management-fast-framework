"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/affix/style");

var _affix = _interopRequireDefault(require("antd/es/affix"));

require("antd/es/card/style");

var _card = _interopRequireDefault(require("antd/es/card"));

require("antd/es/space/style");

var _space = _interopRequireDefault(require("antd/es/space"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));

require("antd/es/switch/style");

var _switch = _interopRequireDefault(require("antd/es/switch"));

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _reactJsonView = _interopRequireDefault(require("react-json-view"));

var _reactSyntaxHighlighter = _interopRequireDefault(require("react-syntax-highlighter"));

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

var _EverySpace = _interopRequireDefault(require("../../customComponents/EverySpace"));

var _FlexText = _interopRequireDefault(require("../../customComponents/FlexText"));

var _FlexBox = _interopRequireDefault(require("../../customComponents/FlexBox"));

var _ImageUpload = _interopRequireDefault(require("../../customComponents/ImageUpload"));

var _VideoUpload = _interopRequireDefault(require("../../customComponents/VideoUpload"));

var _ImageBox = _interopRequireDefault(require("../../customComponents/ImageBox"));

var _HelpCard = _interopRequireDefault(require("../../customComponents/HelpCard"));

var _IconInfo = _interopRequireDefault(require("../../customComponents/IconInfo"));

var _FileBase64Upload = _interopRequireDefault(require("../../customComponents/FileBase64Upload"));

var _Core2 = _interopRequireDefault(require("../Core"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
var Option = _select["default"].Option;
var TextArea = _input["default"].TextArea,
    Password = _input["default"].Password;
var RadioGroup = _radio["default"].Group;

var Common = /*#__PURE__*/function (_Core) {
  _inherits(Common, _Core);

  var _super = _createSuper(Common);

  function Common(props) {
    var _this;

    _classCallCheck(this, Common);

    _this = _super.call(this, props);
    _this.loadDataAfterMount = true;
    _this.lastRequestingData = {
      type: '',
      payload: {}
    };

    _this.doDidMountTask = function () {
      _this.adjustWhenDidMount();

      _this.init();
    };

    _this.checkNeedUpdate = function (preProps, preState, snapshot) {
      return false;
    };

    _this.getApiData = function (props) {
      (0, _tools.showRuntimeErrorMessage)('getApiData 方法需要重载实现');
      return {
        metaOriginalData: {
          dataSuccess: false
        }
      };
    };

    _this.initOther = function () {};

    _this.init = function () {
      if (_this.loadDataAfterMount) {
        _this.initLoad();
      }

      _this.initOther();
    };

    _this.beforeFirstLoadRequest = function (submitData) {};

    _this.beforeReLoadRequest = function (submitData) {};

    _this.beforeRequest = function (submitData) {};

    _this.afterGetFirstRequestResult = function (submitData, responseData) {};

    _this.afterGetRequestResult = function (submitData, responseData) {};

    _this.afterGetReLoadRequestResult = function (submitData, responseData) {};

    _this.initLoadRequestParams = function (o) {
      return o || {};
    };

    _this.supplementLoadRequestParams = function (o) {
      return o || {};
    };

    _this.checkLoadRequestParams = function (o) {
      return true;
    };

    _this.initLoad = function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var _this$state = _this.state,
          loadApiPath = _this$state.loadApiPath,
          firstLoadSuccess = _this$state.firstLoadSuccess,
          reloadingBefore = _this$state.reloading,
          dataLoading = _this$state.dataLoading,
          loadSuccess = _this$state.loadSuccess;

      try {
        if ((loadApiPath || '') === '') {
          (0, _tools.showRuntimeErrorMessage)('loadApiPath需要配置');

          _this.setState({
            dataLoading: false,
            loadSuccess: false,
            reloading: false,
            searching: false,
            refreshing: false,
            paging: false
          });

          return;
        }

        var submitData = _this.initLoadRequestParams() || {};
        submitData = (0, _tools.pretreatmentRequestParams)(submitData || {});
        submitData = _this.supplementLoadRequestParams(submitData || {});

        var checkResult = _this.checkLoadRequestParams(submitData || {});

        if (checkResult) {
          if (!firstLoadSuccess) {
            _this.beforeFirstLoadRequest(submitData || {});
          }

          if (reloadingBefore) {
            _this.beforeReLoadRequest(submitData || {});
          }

          _this.beforeRequest(submitData || {});

          if (dataLoading && !loadSuccess) {
            _this.initLoadCore(submitData || {}, callback);
          } else {
            _this.setState({
              dataLoading: true,
              loadSuccess: false
            }, function () {
              _this.initLoadCore(submitData || {}, callback);
            });
          }
        }
      } catch (error) {
        (0, _tools.recordText)({
          loadApiPath: loadApiPath
        });
        throw error;
      }
    };

    _this.adjustLoadApiPath = function () {
      return '';
    };

    _this.initLoadCore = function (requestData, callback) {
      var loadApiPath = '';

      try {
        var dispatch = _this.props.dispatch;

        var requestingDataPre = _this.getRequestingData();

        var loadApiCustomPath = _this.adjustLoadApiPath();

        var loadApiPathCustom = (0, _tools.stringIsNullOrWhiteSpace)(loadApiCustomPath) ? {} : {
          loadApiPath: loadApiCustomPath
        };

        var _this$state$loadApiPa = _objectSpread(_objectSpread({}, _this.state), loadApiPathCustom),
            loadApiPathValue = _this$state$loadApiPa.loadApiPath,
            firstLoadSuccess = _this$state$loadApiPa.firstLoadSuccess;

        loadApiPath = loadApiPathValue || ''; // 处理频繁的相同请求

        if (!(0, _tools.isEqual)(requestingDataPre, {
          type: loadApiPath,
          payload: requestData
        })) {
          _this.setRequestingData({
            type: loadApiPath,
            payload: requestData
          });

          dispatch({
            type: loadApiPath,
            payload: requestData
          }).then(function () {
            var metaOriginalData = _this.getApiData(_this.props);

            if ((0, _tools.isUndefined)(metaOriginalData)) {
              return;
            }

            _this.lastLoadParams = requestData;
            var dataSuccess = metaOriginalData.dataSuccess;

            if (dataSuccess) {
              var metaListData = metaOriginalData.list,
                  metaData = metaOriginalData.data,
                  metaExtra = metaOriginalData.extra;

              _this.setState({
                metaData: metaData || null,
                metaExtra: metaExtra || null,
                metaListData: metaListData || [],
                metaOriginalData: metaOriginalData
              });

              _this.afterLoadSuccess(metaData || null, metaListData || [], metaExtra || null, metaOriginalData);
            }

            var reloadingComplete = _this.state.reloading;

            if (reloadingComplete) {
              _this.afterReloadSuccess();

              _this.afterGetReLoadRequestResult(requestData, metaOriginalData);
            }

            _this.setState({
              dataLoading: false,
              loadSuccess: dataSuccess,
              reloading: false,
              searching: false,
              refreshing: false,
              paging: false
            });

            if (!firstLoadSuccess) {
              _this.setState({
                firstLoadSuccess: true
              }, function () {
                _this.afterFirstLoadSuccess();

                _this.afterGetFirstRequestResult(requestData, metaOriginalData);
              });
            }

            _this.afterGetRequestResult(requestData, metaOriginalData);

            if (typeof callback === 'function') {
              callback();
            }

            _this.clearRequestingData();
          })["catch"](function (res) {
            (0, _tools.recordObject)(res);
          });
        }
      } catch (error) {
        (0, _tools.recordObject)({
          loadApiPath: loadApiPath,
          requestData: requestData
        });
        throw error;
      }
    };

    _this.pageListData = function (otherState) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var s = _objectSpread(_objectSpread({}, otherState || {}), {
        paging: true
      });

      _this.setState(s, function () {
        _this.initLoad(callback);
      });
    };

    _this.reloadData = function (otherState) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var s = _objectSpread(_objectSpread({}, otherState || {}), {
        reloading: true
      });

      _this.setState(s, function () {
        _this.initLoad(callback);
      });
    };

    _this.searchData = function (otherState) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var s = _objectSpread(_objectSpread({}, otherState || {}), {
        searching: true
      });

      _this.setState(s, function () {
        _this.initLoad(callback);
      });
    };

    _this.refreshData = function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _this.setState({
        refreshing: true
      }, function () {
        _this.initLoad(callback);
      });
    };

    _this.reloadGlobalData = function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var dispatch = _this.props.dispatch;
      dispatch({
        type: 'global/getMetaData',
        payload: {
          force: true
        }
      }).then(function () {
        if ((0, _tools.isFunction)(callback)) {
          callback();
        }
      });
    };

    _this.afterFirstLoadSuccess = function () {};

    _this.afterLoadSuccess = function (metaData, metaListData, metaExtra, metaOriginalData) {};

    _this.afterReloadSuccess = function () {};

    _this.backToList = function () {
      var backPath = _this.state.backPath;

      _this.goToPath(backPath);
    };

    _this.renderOther = function () {
      return null;
    };

    _this.checkFromConfig = function (label, name, helper) {
      var labelText = 'object';
      var nameText = 'object';
      var helperText = 'object';

      if ((0, _tools.isObject)(label)) {
        (0, _tools.showRuntimeErrorMessage)('label必须为文本');
        (0, _tools.recordObject)(label);
      } else {
        labelText = label;
      }

      if ((0, _tools.isObject)(name)) {
        (0, _tools.showRuntimeErrorMessage)('name必须为文本');
        (0, _tools.recordObject)(name);
      } else {
        nameText = name;
      }

      if ((0, _tools.isObject)(helper)) {
        (0, _tools.showRuntimeErrorMessage)('helper必须为文本');
        (0, _tools.recordObject)(helper);
      } else {
        helperText = helper;
      }

      return {
        label: labelText,
        name: nameText,
        helper: helperText
      };
    };

    _this.renderFormNowTimeField = function (data) {
      var _helper$label$formIte = _objectSpread(_objectSpread({}, {
        helper: '数据的添加时间',
        label: '添加时间',
        formItemLayout: null
      }), data || {}),
          label = _helper$label$formIte.label,
          helper = _helper$label$formIte.helper,
          formItemLayout = _helper$label$formIte.formItemLayout;

      var title = label || '添加时间';

      var resultCheck = _this.checkFromConfig(title, '', helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout || {}, {
        label: resultCheck.label,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        value: (0, _tools.formatDatetime)(new Date(), _constants.datetimeFormat.yearMonthDayHourMinute),
        addonBefore: /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null),
        disabled: true,
        placeholder: (0, _tools.buildFieldDescription)(resultCheck.label)
      }));
    };

    _this.renderFormCreateTimeField = function () {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'createTime';
      var helper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '数据的添加时间';
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '添加时间';
      var formItemLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var title = label || '添加时间';

      var resultCheck = _this.checkFromConfig(title, name, helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout || {}, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        addonBefore: /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null),
        disabled: true,
        placeholder: (0, _tools.buildFieldDescription)(resultCheck.label)
      }));
    };

    _this.renderFormUpdateTimeField = function () {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'updateTime';
      var helper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '数据的最后修改时间';
      var label = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '最后修改时间';
      var formItemLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var title = label || '最后修改时间';

      var resultCheck = _this.checkFromConfig(title, name, helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout || {}, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], {
        addonBefore: /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null),
        disabled: true,
        placeholder: (0, _tools.buildFieldDescription)(resultCheck.label)
      }));
    };

    _this.renderFormRadioCore = function (listDataSource) {
      var adjustListDataCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var listData = listDataSource || [];

      if ((0, _tools.isFunction)(adjustListDataCallback)) {
        listData = adjustListDataCallback(listData);
      }

      var list = [];

      if (listData.length > 0) {
        listData.forEach(function (item) {
          var _name$flag$availabili = _objectSpread(_objectSpread({}, {
            name: '',
            flag: '',
            availability: _constants.whetherNumber.yes
          }), item || {}),
              name = _name$flag$availabili.name,
              flag = _name$flag$availabili.flag,
              availability = _name$flag$availabili.availability;

          list.push( /*#__PURE__*/_react["default"].createElement(_radio["default"], {
            key: "".concat(flag, "_").concat(name),
            value: flag,
            disabled: (0, _tools.toNumber)(availability) !== _constants.whetherNumber.yes
          }, name));
        });
        return list;
      }

      return null;
    };

    _this.renderFormOptionCore = function (listDataSource) {
      var adjustListDataCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var listData = listDataSource || [];

      if ((0, _tools.isFunction)(adjustListDataCallback)) {
        listData = adjustListDataCallback(listData);
      }

      var list = [];

      if (listData.length > 0) {
        listData.forEach(function (item) {
          var _name$flag$availabili2 = _objectSpread(_objectSpread({}, {
            name: '',
            flag: '',
            availability: _constants.whetherNumber.yes
          }), item || {}),
              name = _name$flag$availabili2.name,
              flag = _name$flag$availabili2.flag,
              availability = _name$flag$availabili2.availability;

          if ((0, _tools.stringIsNullOrWhiteSpace)((0, _tools.toString)(name))) {
            (0, _tools.showRuntimeErrorMessage)('name 不能为空');
          }

          if ((0, _tools.stringIsNullOrWhiteSpace)((0, _tools.toString)(flag))) {
            (0, _tools.showRuntimeErrorMessage)('flag 不能为空');
          }

          list.push( /*#__PURE__*/_react["default"].createElement(Option, {
            key: "".concat(flag, "_").concat(name),
            title: name,
            value: flag,
            disabled: (0, _tools.toNumber)(availability) !== _constants.whetherNumber.yes
          }, name));
        });
        return list;
      }

      return null;
    };

    _this.renderSearchInput = function (label, name) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null);
      var inputProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var canOperate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var formItemLayout = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var title = label;

      var otherInputProps = _objectSpread(_objectSpread({}, {
        addonBefore: icon,
        placeholder: (0, _tools.buildFieldDescription)(title, '输入')
      }), inputProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
        }), /*#__PURE__*/_react["default"].createElement(_input["default"], otherInputProps));
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], otherInputProps));
    };

    _this.renderSearchInputNumber = function (label, name) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var inputProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var canOperate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var formItemLayout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var title = label;

      var otherInputProps = _objectSpread(_objectSpread({}, {
        style: {
          width: '100%'
        },
        min: 0,
        placeholder: (0, _tools.buildFieldDescription)(title, '输入')
      }), inputProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
        }), /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], otherInputProps));
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
      }), /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], otherInputProps));
    };

    _this.renderFormDisplay = function (label, content) {
      var formItemLayout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var useDisplayBoxStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var title = label;
      var labelText = 'object';

      if ((0, _tools.isObject)(title)) {
        (0, _tools.showRuntimeErrorMessage)('label必须为文本');
        (0, _tools.recordObject)(label);
      } else {
        labelText = title;
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: labelText
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: useDisplayBoxStyle ? _index["default"].displayBox : null
      }, content));
    };

    _this.renderFormHiddenWrapper = function (children) {
      var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (hidden) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _index["default"].hidden
        }, children);
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children);
    };

    _this.renderFormInputFieldData = function (fieldData) {
      var required = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var icon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null);
      var inputProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var canOperate = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var formItemLayout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var reminderPrefix = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '输入';
      var hidden = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      return _this.renderFormInput(fieldData.label || null, fieldData.name || null, required, fieldData.helper || null, icon, inputProps, canOperate, formItemLayout, reminderPrefix, hidden);
    };

    _this.renderFormInput = function (label, name) {
      var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var icon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null);
      var inputProps = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var canOperate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var formItemLayout = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
      var reminderPrefix = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '输入';
      var hidden = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
      var title = label;

      var otherInputProps = _objectSpread(_objectSpread({}, {
        addonBefore: icon,
        placeholder: canOperate ? (0, _tools.buildFieldDescription)(title, reminderPrefix) : '暂无数据',
        disabled: !canOperate
      }), inputProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return _this.renderFormHiddenWrapper( /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
          rules: [{
            required: required,
            message: (0, _tools.buildFieldDescription)(resultCheck.label)
          }]
        }), /*#__PURE__*/_react["default"].createElement(_input["default"], otherInputProps)), hidden);
      }

      return _this.renderFormHiddenWrapper( /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], otherInputProps)), hidden);
    };

    _this.renderFormSwitch = function (label, name) {
      var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var otherProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var canOperate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var formItemLayout = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var hidden = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
      var title = label;

      var otherSwitchProps = _objectSpread(_objectSpread({}, {
        disabled: !canOperate
      }), otherProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return _this.renderFormHiddenWrapper( /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
          rules: [{
            required: required,
            message: (0, _tools.buildFieldDescription)(resultCheck.label)
          }]
        }), /*#__PURE__*/_react["default"].createElement(_FlexBox["default"], {
          left: "\u662F\u5426\u5F00\u542F".concat(label, ":"),
          right: /*#__PURE__*/_react["default"].createElement(_switch["default"], otherSwitchProps)
        })), hidden);
      }

      return _this.renderFormHiddenWrapper( /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(_FlexBox["default"], {
        left: "\u662F\u5426\u5F00\u542F".concat(label, "\uFF1A"),
        right: /*#__PURE__*/_react["default"].createElement(_switch["default"], otherSwitchProps)
      })), hidden);
    };

    _this.renderFormPassword = function (label, name) {
      var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var icon = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null);
      var inputProps = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var canOperate = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
      var formItemLayout = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
      var title = label;

      var otherInputProps = _objectSpread(_objectSpread({}, {
        addonBefore: icon,
        placeholder: (0, _tools.buildFieldDescription)(title, '输入')
      }), inputProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
          rules: [{
            required: required,
            message: (0, _tools.buildFieldDescription)(resultCheck.label)
          }]
        }), /*#__PURE__*/_react["default"].createElement(Password, otherInputProps));
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(Password, otherInputProps));
    };

    _this.renderFormOnlyShowText = function (label, value) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var formItemLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var requiredForShow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var title = label;

      var resultCheck = _this.checkFromConfig(title, (0, _tools.getGuid)(), helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        className: requiredForShow ? _index["default"].formItemOnlyShowText : null // style={{ marginBottom: 0 }}
        ,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), value);
    };

    _this.renderSyntaxHighlighter = function (language, value) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _tools.isObject)(value) ? /*#__PURE__*/_react["default"].createElement(_reactSyntaxHighlighter["default"], {
        showLineNumbers: true,
        wrapLines: true,
        lineProps: {
          style: {
            paddingBottom: 8
          }
        },
        language: language // style={docco}

      }, language === 'javascript' ? JSON.stringify(value || {}, null, '    ') : value) : /*#__PURE__*/_react["default"].createElement(_reactSyntaxHighlighter["default"], {
        showLineNumbers: true,
        wrapLines: true,
        lineProps: {
          style: {
            paddingBottom: 8
          }
        },
        language: language // style={docco}

      }, language === 'javascript' ? JSON.stringify(JSON.parse(value || null), null, '    ') : value));
    };

    _this.renderJsonView = function (value) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, (0, _tools.isObject)(value) ? /*#__PURE__*/_react["default"].createElement(_reactJsonView["default"], {
        src: value,
        theme: "monokai",
        name: false,
        displayDataTypes: false,
        displayObjectSize: false,
        enableClipboard: false
      }) : /*#__PURE__*/_react["default"].createElement(_reactJsonView["default"], {
        src: JSON.parse(value || '{}'),
        theme: "monokai",
        name: false,
        displayDataTypes: false,
        displayObjectSize: false,
        enableClipboard: false
      }));
    };

    _this.renderFormInnerComponent = function (label, innerComponent) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var formItemLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var requiredForShow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var title = label;

      var resultCheck = _this.checkFromConfig(title, (0, _tools.getGuid)(), helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        className: requiredForShow ? _index["default"].formItemOnlyShowText : null,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), innerComponent);
    };

    _this.renderFormOnlyShowSyntaxHighlighter = function (language, label, value) {
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var formItemLayout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var requiredForShow = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      return _this.renderFormInnerComponent(label, _this.renderSyntaxHighlighter(language, value), helper, formItemLayout, requiredForShow);
    };

    _this.renderFormOnlyShowTextarea = function (label, value) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var textAreaProps = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        disabled: true
      };
      var formItemLayout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var title = label;

      var otherTextAreaProps = _objectSpread(_objectSpread({}, {
        placeholder: '暂无数据',
        value: (0, _tools.stringIsNullOrWhiteSpace)(value || '') ? '' : value
      }), textAreaProps || {});

      var resultCheck = _this.checkFromConfig(title, (0, _tools.getGuid)(), helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(TextArea, otherTextAreaProps));
    };

    _this.renderFormText = function (label, value) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var formItemLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var title = label;

      var resultCheck = _this.checkFromConfig(title, (0, _tools.getGuid)(), helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), value);
    };

    _this.renderFormOnlyShowInput = function (label, value) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var icon = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null);
      var inputProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        disabled: true
      };
      var formItemLayout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var title = label;

      var otherInputProps = _objectSpread(_objectSpread({}, {
        addonBefore: icon,
        placeholder: '暂无数据',
        value: (0, _tools.stringIsNullOrWhiteSpace)(value || '') ? '' : value
      }), inputProps || {});

      var resultCheck = _this.checkFromConfig(title, (0, _tools.getGuid)(), helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(_input["default"], otherInputProps));
    };

    _this.renderFormInputNumber = function (label, name) {
      var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var inputNumberProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var canOperate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var formItemLayout = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var title = label;

      var otherInputNumberProps = _objectSpread(_objectSpread({}, {
        style: {
          width: '100%'
        },
        min: 0,
        placeholder: (0, _tools.buildFieldDescription)(title, '输入'),
        disabled: !canOperate
      }), inputNumberProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
          rules: [{
            required: required,
            message: (0, _tools.buildFieldDescription)(resultCheck.label)
          }]
        }), /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], otherInputNumberProps));
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(_inputNumber["default"], otherInputNumberProps));
    };

    _this.renderFormTextArea = function (label, name) {
      var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var textAreaProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var canOperate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var formItemLayout = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var title = label;

      var otherTextAreaProps = _objectSpread(_objectSpread({}, {
        placeholder: (0, _tools.buildFieldDescription)(title, '输入'),
        disabled: !canOperate
      }), textAreaProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
          rules: [{
            required: required,
            message: (0, _tools.buildFieldDescription)(resultCheck.label)
          }]
        }), /*#__PURE__*/_react["default"].createElement(TextArea, otherTextAreaProps));
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(TextArea, otherTextAreaProps));
    };

    _this.renderFormDatePicker = function (label, name) {
      var required = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var datePickerProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var canOperate = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var formItemLayout = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
      var title = label;

      var otherDatePickerProps = _objectSpread(_objectSpread({}, {
        style: {
          width: '100%'
        },
        showTime: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        inputReadOnly: true,
        placeholder: (0, _tools.buildFieldDescription)(title, '选择')
      }), datePickerProps || {});

      var resultCheck = _this.checkFromConfig(title, name, helper);

      if (!canOperate) {
        return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
          label: resultCheck.label,
          name: resultCheck.name,
          extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
        }), /*#__PURE__*/_react["default"].createElement(_datePicker["default"], otherDatePickerProps));
      }

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label)
        }]
      }), /*#__PURE__*/_react["default"].createElement(_datePicker["default"], otherDatePickerProps));
    };

    _this.renderFormSelect = function (label, name, renderOptionFunction) {
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var onChangeCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var formItemLayout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var otherProps = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

      var otherSelectProps = _objectSpread(_objectSpread({}, {
        placeholder: (0, _tools.buildFieldDescription)(label, '选择') || '请选择',
        style: {
          width: '100%'
        },
        onChange: function onChange(v, option) {
          if ((0, _tools.isFunction)(onChangeCallback)) {
            onChangeCallback(v, option);
          }
        }
      }), otherProps || {});

      var resultCheck = _this.checkFromConfig(label, name, helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout || {}, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label, '选择')
        }]
      }), /*#__PURE__*/_react["default"].createElement(_select["default"], otherSelectProps, (0, _tools.isFunction)(renderOptionFunction) ? renderOptionFunction() : null));
    };

    _this.renderFormRadio = function (label, name, renderOptionFunction) {
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var onChangeCallback = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var formItemLayout = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var required = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var otherProps = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;

      var otherRadioProps = _objectSpread(_objectSpread({}, {
        placeholder: (0, _tools.buildFieldDescription)(label, '选择'),
        style: {
          width: '100%'
        },
        onChange: function onChange(v, option) {
          if ((0, _tools.isFunction)(onChangeCallback)) {
            onChangeCallback(v, option);
          }
        }
      }), otherProps || {});

      var resultCheck = _this.checkFromConfig(label, name, helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, _extends({}, formItemLayout || {}, {
        label: resultCheck.label,
        name: resultCheck.name,
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper),
        rules: [{
          required: required,
          message: (0, _tools.buildFieldDescription)(resultCheck.label, '选择')
        }]
      }), /*#__PURE__*/_react["default"].createElement(RadioGroup, otherRadioProps, (0, _tools.isFunction)(renderOptionFunction) ? renderOptionFunction() : null));
    };

    _this.renderSearchFormSelect = function (label, name, options) {
      var helper = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var resultCheck = _this.checkFromConfig(label, name, helper);

      return /*#__PURE__*/_react["default"].createElement(FormItem, {
        label: resultCheck.label,
        name: resultCheck.name,
        rules: [{
          required: false,
          message: (0, _tools.buildFieldDescription)(resultCheck.label, '选择')
        }],
        extra: (0, _tools.stringIsNullOrWhiteSpace)(resultCheck.helper || '') ? null : (0, _tools.buildFieldHelper)(resultCheck.helper)
      }, /*#__PURE__*/_react["default"].createElement(_select["default"], {
        placeholder: (0, _tools.buildFieldDescription)(resultCheck.label, '选择'),
        style: {
          width: '100%'
        }
      }, options));
    };

    _this.whetherList = function () {
      var withUnlimited = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var global = _this.props.global;
      var whetherList = global.whetherList || [];

      if (withUnlimited) {
        return (0, _tools.refitCommonData)(whetherList, _constants.unlimitedWithStringFlag);
      }

      return (0, _tools.refitCommonData)(whetherList);
    };

    _this.getWhetherName = function (v) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if ((0, _tools.isInvalid)(v)) {
        return defaultValue;
      }

      var item = (0, _tools.searchFromList)('flag', "".concat(isNull((0, _tools.isUndefined)(v) ? null : v) ? '' : v), _this.whetherList(false));
      return item == null ? '未知' : item.name;
    };

    _this.renderWhetherOption = function (_ref) {
      var _ref$withUnlimited = _ref.withUnlimited,
          withUnlimited = _ref$withUnlimited === void 0 ? true : _ref$withUnlimited,
          _ref$adjustListDataCa = _ref.adjustListDataCallback,
          adjustListDataCallback = _ref$adjustListDataCa === void 0 ? null : _ref$adjustListDataCa;

      var listData = _this.whetherList(withUnlimited);

      return _this.renderFormOptionCore(listData, adjustListDataCallback);
    };

    _this.renderWhetherRadio = function (_ref2) {
      var _ref2$withUnlimited = _ref2.withUnlimited,
          withUnlimited = _ref2$withUnlimited === void 0 ? true : _ref2$withUnlimited,
          _ref2$adjustListDataC = _ref2.adjustListDataCallback,
          adjustListDataCallback = _ref2$adjustListDataC === void 0 ? null : _ref2$adjustListDataC;

      var listData = _this.whetherList(withUnlimited);

      return _this.renderFormRadioCore(listData, adjustListDataCallback);
    };

    _this.renderSearchWhetherFormItem = function (label, name) {
      var withUnlimited = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var title = label || '未知';

      if ((0, _tools.stringIsNullOrWhiteSpace)(label)) {
        (0, _tools.showRuntimeErrorMessage)('renderSearchWhetherFormItem need param label。');
      }

      if ((0, _tools.stringIsNullOrWhiteSpace)(name)) {
        (0, _tools.showRuntimeErrorMessage)('renderSearchWhetherFormItem need param name。');
      }

      return _this.renderSearchFormSelect(title, name, _this.renderWhetherOption(withUnlimited));
    };

    _this.renderFormWhetherSelect = function (label, name) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var onChangeCallback = arguments.length > 3 ? arguments[3] : undefined;
      var formItemLayout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var required = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var otherProps = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var title = label || '未知';

      if ((0, _tools.stringIsNullOrWhiteSpace)(label)) {
        (0, _tools.showRuntimeErrorMessage)('renderSearchWhetherFormItem need param label。');
      }

      if ((0, _tools.stringIsNullOrWhiteSpace)(name)) {
        (0, _tools.showRuntimeErrorMessage)('renderSearchWhetherFormItem need param name。');
      }

      return _this.renderFormSelect(title, name, function () {
        return _this.renderWhetherOption(false);
      }, helper, onChangeCallback, formItemLayout, required, otherProps);
    };

    _this.renderFormWhetherRadio = function (label, name) {
      var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var onChangeCallback = arguments.length > 3 ? arguments[3] : undefined;
      var formItemLayout = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var required = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
      var otherProps = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var title = label || '未知';

      if ((0, _tools.stringIsNullOrWhiteSpace)(label)) {
        (0, _tools.showRuntimeErrorMessage)('renderSearchWhetherFormItem need param label。');
      }

      if ((0, _tools.stringIsNullOrWhiteSpace)(name)) {
        (0, _tools.showRuntimeErrorMessage)('renderSearchWhetherFormItem need param name。');
      }

      return _this.renderFormRadio(title, name, function () {
        return _this.renderWhetherRadio(false);
      }, helper, onChangeCallback, formItemLayout, required, otherProps);
    };

    _this.getOtherButtonDisabled = function () {
      return false;
    };

    _this.getSaveButtonDisabled = function () {
      var _this$state2 = _this.state,
          dataLoading = _this$state2.dataLoading,
          processing = _this$state2.processing,
          loadSuccess = _this$state2.loadSuccess;

      if (_this.loadDataAfterMount) {
        return dataLoading || processing || !loadSuccess;
      }

      return processing;
    };

    _this.getSaveButtonLoading = function () {
      if (_this.loadDataAfterMount) {
        var _this$state3 = _this.state,
            dataLoading = _this$state3.dataLoading,
            loadSuccess = _this$state3.loadSuccess;
        return dataLoading || !loadSuccess;
      }

      return _this.loadDataAfterMount;
    };

    _this.getSaveButtonProcessing = function () {
      var processing = _this.state.processing;
      return processing;
    };

    _this.getSaveButtonIcon = function () {
      return /*#__PURE__*/_react["default"].createElement(_icons.SaveOutlined, null);
    };

    _this.getDisabledButtonIcon = function () {
      return /*#__PURE__*/_react["default"].createElement(_icons.SaveOutlined, null);
    };

    _this.renderDisabledButton = function () {
      var buttonText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return /*#__PURE__*/_react["default"].createElement(_button["default"], {
        type: "primary",
        disabled: true
      }, _this.getDisabledButtonIcon(), buttonText || '保存');
    };

    _this.renderSaveButton = function () {
      var buttonText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var onClick = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return _this.renderGeneralButton({
        text: buttonText || '保存',
        onClick: onClick == null ? function (e) {
          _this.validate(e);
        } : onClick
      });
    };

    _this.renderGeneralButton = function (_ref3) {
      var _ref3$key = _ref3.key,
          key = _ref3$key === void 0 ? null : _ref3$key,
          type = _ref3.type,
          size = _ref3.size,
          text = _ref3.text,
          icon = _ref3.icon,
          _onClick = _ref3.onClick;

      var buttonDisabled = _this.getSaveButtonDisabled();

      var buttonProcessing = _this.getSaveButtonProcessing();

      var ico = (icon || null) == null ? _this.getSaveButtonIcon() : icon;
      return /*#__PURE__*/_react["default"].createElement(_button["default"], {
        key: key || (0, _tools.getGuid)(),
        type: type || 'primary',
        size: size || null,
        disabled: buttonDisabled,
        onClick: function onClick(e) {
          if ((0, _tools.isFunction)(_onClick)) {
            _onClick(e);
          } else {
            (0, _tools.showErrorMessage)('onClick is not function');
          }
        }
      }, buttonProcessing ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : ico, text || 'button');
    };

    _this.buildOtherFormProps = function () {
      return {};
    };

    _this.renderRefreshButton = function () {
      var _this$state4 = _this.state,
          dataLoading = _this$state4.dataLoading,
          reloading = _this$state4.reloading,
          processing = _this$state4.processing,
          loadSuccess = _this$state4.loadSuccess;
      return /*#__PURE__*/_react["default"].createElement(_button["default"], {
        disabled: dataLoading || reloading || processing || !loadSuccess,
        onClick: _this.reloadData
      }, reloading ? /*#__PURE__*/_react["default"].createElement(_icons.LoadingOutlined, null) : /*#__PURE__*/_react["default"].createElement(_icons.ReloadOutlined, null), "\u5237\u65B0");
    };

    _this.getUploadTokenObject = function () {
      var text = '需要在继承中重新实现 getUploadTokenObject';
      (0, _tools.showRuntimeErrorMessage)(text);
      throw new Error(text);
    };

    _this.beforeVideoUpload = function (file) {
      var isVideo = file.type === 'video/mp4';

      if (!isVideo) {
        (0, _tools.showRuntimeErrorMessage)('请上传视频文件!');
      }

      var isLt3M = file.size / 1024 / 1024 < 3;

      if (!isLt3M) {
        (0, _tools.showRuntimeErrorMessage)('视频文件不能超过3MB!');
      }

      return isVideo && isLt3M;
    };

    _this.pretreatmentImageUploadRemoteResponse = function (response) {
      var text = '需要在继承中重新实现 pretreatmentImageUploadRemoteResponse';
      (0, _tools.showRuntimeErrorMessage)(text);
      throw new Error(text);
    };

    _this.pretreatmentFileBase64UploadRemoteResponse = function (response) {
      var text = '需要在继承中重新实现 pretreatmentFileBase64UploadRemoteResponse';
      (0, _tools.showRuntimeErrorMessage)(text);
      throw new Error(text);
    };

    _this.pretreatmentVideoUploadRemoteResponse = function (response) {
      var text = '需要在继承中重新实现 pretreatmentVideoUploadRemoteResponse';
      (0, _tools.showRuntimeErrorMessage)(text);
      throw new Error(text);
    };

    _this.buildFormContentWrapperTypeConfig = function () {
      return {
        mode: _constants.formContentConfig.wrapperType.page
      };
    };

    _this.buildFormContentToolBarConfig = function () {
      return null;
    };

    _this.buildFormContentToolBar = function () {
      var config = _this.buildFormContentToolBarConfig();

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
        (0, _tools.showErrorMessage)('工具栏配置数据无效');
        (0, _tools.recordObject)(config);
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
          icon: /*#__PURE__*/_react["default"].createElement(_icons.ToolOutlined, null),
          text: title || '工具栏'
        }),
        bordered: false,
        bodyStyle: {
          padding: 0
        },
        extra: /*#__PURE__*/_react["default"].createElement(_space["default"], {
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

      if ((0, _tools.isBoolean)(stick) && stick) {
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_affix["default"], {
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

    _this.buildFormContentToolBarWrapper = function () {
      var toolBar = _this.buildFormContentToolBar();

      if ((toolBar || null) == null) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, toolBar);
    };

    _this.buildFormContentHelpConfig = function () {
      return null;
    };

    _this.buildFormContentHelp = function () {
      var formContentWrapperTypeConfig = _this.buildFormContentWrapperTypeConfig() || {
        mode: _constants.formContentConfig.wrapperType.page
      };

      var configData = _objectSpread(_objectSpread({}, {
        mode: _constants.formContentConfig.wrapperType.page
      }), formContentWrapperTypeConfig || {});

      var mode = configData.mode;

      var config = _this.buildFormContentHelpConfig();

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
        (0, _tools.showErrorMessage)('帮助条目数据无效');
        (0, _tools.recordObject)(config);
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_HelpCard["default"], {
        border: mode !== _constants.formContentConfig.wrapperType.model && mode !== _constants.formContentConfig.wrapperType.drawer,
        compact: mode === _constants.formContentConfig.wrapperType.model,
        helpBoxProps: {
          title: title || '操作帮助',
          showNumber: showNumber || false,
          list: list
        }
      });
    };

    _this.buildFormContentHelpWrapper = function () {
      var formContentWrapperTypeConfig = _this.buildFormContentWrapperTypeConfig() || {
        mode: _constants.formContentConfig.wrapperType.page
      };

      var configData = _objectSpread(_objectSpread({}, {
        mode: _constants.formContentConfig.wrapperType.page
      }), formContentWrapperTypeConfig || {});

      var mode = configData.mode;

      var help = _this.buildFormContentHelp();

      if ((help || null) == null) {
        return null;
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, mode !== _constants.formContentConfig.wrapperType.model ? /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
        size: 22,
        direction: "horizontal"
      }) : null, help);
    };

    _this.buildFormContent = function (config) {
      var formContentWrapperTypeConfig = _this.buildFormContentWrapperTypeConfig() || {
        mode: _constants.formContentConfig.wrapperType.page
      };

      var configData = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, {
        mode: _constants.formContentConfig.wrapperType.page
      }), formContentWrapperTypeConfig || {}), {
        list: []
      }), config || {});

      var mode = configData.mode,
          list = configData.list;
      var listData = [];

      if ((0, _tools.isArray)(list)) {
        list.forEach(function (co, ci) {
          listData.push(co);

          if (ci !== list.length - 1) {
            listData.push('');
          }
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _this.buildFormContentToolBarWrapper(), listData.map(function (item, index) {
        var key = "formContent_key_".concat(index);

        if ((0, _tools.stringIsNullOrWhiteSpace)(item)) {
          return /*#__PURE__*/_react["default"].createElement(_EverySpace["default"], {
            key: key,
            size: 24,
            direction: "horizontal"
          });
        }

        var _title$extra$hidden$c = _objectSpread(_objectSpread({}, {
          title: '',
          extra: null,
          hidden: false,
          cardType: _constants.formContentConfig.cardType.normal,
          cardBodyStyle: {},
          items: [],
          otherComponent: null,
          formItemLayout: null
        }), item || {}),
            title = _title$extra$hidden$c.title,
            extra = _title$extra$hidden$c.extra,
            hidden = _title$extra$hidden$c.hidden,
            cardType = _title$extra$hidden$c.cardType,
            cardBodyStyle = _title$extra$hidden$c.cardBodyStyle,
            spinning = _title$extra$hidden$c.spinning,
            contentItems = _title$extra$hidden$c.items,
            otherComponent = _title$extra$hidden$c.otherComponent,
            formItemLayout = _title$extra$hidden$c.formItemLayout;

        if (hidden || false) {
          return null;
        }

        var _icon$text$subText$ad = _objectSpread(_objectSpread({}, {
          icon: /*#__PURE__*/_react["default"].createElement(_icons.ContactsOutlined, null),
          text: '',
          subText: '',
          addonBefore: null,
          addonAfter: null
        }), title || {}),
            icon = _icon$text$subText$ad.icon,
            text = _icon$text$subText$ad.text,
            subText = _icon$text$subText$ad.subText,
            titleAddonBefore = _icon$text$subText$ad.addonBefore,
            titleAddonAfter = _icon$text$subText$ad.addonAfter;

        var _affix$list = _objectSpread(_objectSpread({}, {
          affix: false,
          list: []
        }), extra || {}),
            affix = _affix$list.affix,
            extraItemList = _affix$list.list;

        var extraListData = [];

        if ((0, _tools.isArray)(extraItemList)) {
          extraItemList.forEach(function (eo, ei) {
            if ((eo || null) != null) {
              extraListData.push(eo);

              if (ei !== extraItemList.length - 1) {
                extraListData.push('');
              }
            }
          });
        }

        var extraItems = extraListData.map(function (extraItem, extraItemIndex) {
          var extraItemKey = "formContent_key_".concat(index, "_extra_").concat(extraItemIndex);

          if ((0, _tools.stringIsNullOrWhiteSpace)(extraItem)) {
            return /*#__PURE__*/_react["default"].createElement(_divider["default"], {
              key: extraItemKey,
              type: "vertical"
            });
          }

          return /*#__PURE__*/_react["default"].createElement("span", {
            key: extraItemKey
          }, extraItem);
        });
        var hasExtraItems = extraItems.length > 0;
        var cardTypeBodyStyle = {};

        if (cardType === _constants.formContentConfig.cardType.help) {
          cardTypeBodyStyle = {
            paddingTop: '12px',
            paddingBottom: '12px'
          };
        }

        return /*#__PURE__*/_react["default"].createElement(_card["default"], {
          key: key,
          title: index === 0 && mode !== _constants.formContentConfig.wrapperType.page ? null : (text || '') === '' && (subText || '') === '' ? null : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_FlexText["default"], {
            icon: icon || null,
            text: text || '',
            subText: subText || '',
            addonBefore: (titleAddonBefore || null) == null ? null : titleAddonBefore,
            addonAfter: (titleAddonAfter || null) == null ? null : titleAddonAfter
          })),
          bordered: false,
          extra: hasExtraItems ? mode === _constants.formContentConfig.wrapperType.page && affix ? /*#__PURE__*/_react["default"].createElement(_affix["default"], {
            offsetTop: 20
          }, /*#__PURE__*/_react["default"].createElement("div", null, extraItems)) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", null, extraItems)) : null,
          bodyStyle: mode === _constants.formContentConfig.wrapperType.model ? _objectSpread(_objectSpread(_objectSpread({}, cardBodyStyle || {}), cardTypeBodyStyle || {}), {
            paddingBottom: 0
          }) : _objectSpread(_objectSpread({}, cardBodyStyle || {}), cardTypeBodyStyle || {})
        }, /*#__PURE__*/_react["default"].createElement(_spin["default"], {
          spinning: spinning || false
        }, /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, _this.buildFormContentItem(mode, (0, _tools.isArray)(contentItems) ? contentItems.map(function (o) {
          return _objectSpread(_objectSpread({}, o), {
            formItemLayout: formItemLayout || null
          });
        }) : [], index), otherComponent || null)));
      }), _this.buildFormContentHelpWrapper());
    };

    _this.buildFormContentItem = function (mode, contentItems, contentIndex) {
      return /*#__PURE__*/_react["default"].createElement(_row["default"], {
        gutter: 24
      }, (0, _tools.isArray)(contentItems) ? contentItems.map(function (contentItem, contentItemIndex) {
        var contentItemKey = "formContent_key_".concat(contentIndex, "_content_").concat(contentItemIndex);

        var _lg$require$type$fiel = _objectSpread(_objectSpread({}, {
          lg: 6,
          require: false,
          type: '',
          fieldData: {
            label: '',
            name: '',
            helper: ''
          },
          hidden: false,
          canOperate: true,
          formItemLayout: null
        }), contentItem || {}),
            lgValue = _lg$require$type$fiel.lg,
            type = _lg$require$type$fiel.type,
            require = _lg$require$type$fiel.require,
            fieldDataValue = _lg$require$type$fiel.fieldData,
            hidden = _lg$require$type$fiel.hidden,
            canOperate = _lg$require$type$fiel.canOperate,
            formItemLayout = _lg$require$type$fiel.formItemLayout;

        if (hidden) {
          return null;
        }

        var fieldData = _objectSpread(_objectSpread({}, {
          label: '',
          name: '',
          helper: ''
        }), fieldDataValue || {});

        var lg = (lgValue || 6) < 12 && mode !== _constants.formContentConfig.wrapperType.page ? 12 : lgValue;
        lg = lg > 12 && mode !== _constants.formContentConfig.wrapperType.page ? 24 : lg;
        lg = lg > 24 ? 24 : lg;

        if (type === _constants.formContentConfig.contentItemType.imageUpload) {
          var uploadProps = _objectSpread(_objectSpread({}, contentItem.uploadProps || {}), {
            image: contentItem.image || '',
            action: contentItem.action || '',
            tokenSet: _this.getUploadTokenObject()
          });

          return /*#__PURE__*/_react["default"].createElement(_col["default"], {
            key: contentItemKey,
            lg: 24,
            md: 12,
            sm: 24,
            xs: 24
          }, /*#__PURE__*/_react["default"].createElement(_ImageUpload["default"], _extends({}, uploadProps, {
            pretreatmentRemoteResponse: _this.pretreatmentImageUploadRemoteResponse,
            afterUploadSuccess: function afterUploadSuccess(image) {
              if ((0, _tools.isFunction)(contentItem.afterUploadSuccess)) {
                contentItem.afterUploadSuccess(image);
              }
            },
            onItemChange: contentItem.onItemChange || null,
            onItemRemove: contentItem.onItemRemove || null
          })));
        }

        if (type === _constants.formContentConfig.contentItemType.imageShow) {
          var imageBoxContainorStyle = null;

          var imageBoxProps = _objectSpread(_objectSpread({}, {
            loadingEffect: true,
            errorOverlayVisible: true,
            showErrorIcon: false,
            alt: ''
          }), contentItem.imageBoxProps || {});

          if ((contentItem.imageBoxContainorStyle || null) != null) {
            imageBoxContainorStyle = contentItem.imageBoxContainorStyle;
          }

          var imageBox = /*#__PURE__*/_react["default"].createElement(_ImageBox["default"], _extends({
            src: contentItem.image || _constants.defaultEmptyImage,
            preview: !(0, _tools.stringIsEmpty)(contentItem.image || '')
          }, imageBoxProps));

          return /*#__PURE__*/_react["default"].createElement(_col["default"], {
            key: contentItemKey,
            lg: 24,
            md: 12,
            sm: 24,
            xs: 24
          }, imageBoxContainorStyle == null ? imageBox : /*#__PURE__*/_react["default"].createElement("div", {
            style: imageBoxContainorStyle
          }, imageBox));
        }

        if (type === _constants.formContentConfig.contentItemType.fileBase64Upload) {
          var _uploadProps = _objectSpread(_objectSpread({}, contentItem.uploadProps || {}), {
            fileBase64: contentItem.fileBase64 || '',
            action: contentItem.action || '',
            tokenSet: _this.getUploadTokenObject()
          });

          return /*#__PURE__*/_react["default"].createElement(_col["default"], {
            key: contentItemKey,
            lg: 24,
            md: 12,
            sm: 24,
            xs: 24
          }, _this.renderFormInnerComponent(fieldData.label, /*#__PURE__*/_react["default"].createElement(_FileBase64Upload["default"], _extends({}, _uploadProps, {
            pretreatmentRemoteResponse: _this.pretreatmentFileBase64UploadRemoteResponse,
            afterUploadSuccess: function afterUploadSuccess(fileBase64) {
              if ((0, _tools.isFunction)(contentItem.afterUploadSuccess)) {
                contentItem.afterUploadSuccess(fileBase64);
              }
            }
          })), fieldData.helper, null, require));
        }

        if (type === _constants.formContentConfig.contentItemType.videoUpload) {
          var _uploadProps2 = _objectSpread(_objectSpread({}, contentItem.uploadProps || {}), {
            video: contentItem.video || '',
            showPreview: contentItem.showPreview || false,
            action: contentItem.action || '',
            tokenSet: _this.getUploadTokenObject()
          });

          return /*#__PURE__*/_react["default"].createElement(_col["default"], {
            key: contentItemKey,
            lg: lg || 6,
            md: 12,
            sm: 24,
            xs: 24
          }, _this.renderFormInnerComponent(fieldData.label, /*#__PURE__*/_react["default"].createElement(_VideoUpload["default"], _extends({}, _uploadProps2, {
            pretreatmentRemoteResponse: _this.pretreatmentVideoUploadRemoteResponse,
            afterChangeSuccess: function afterChangeSuccess(video) {
              if ((0, _tools.isFunction)(contentItem.afterChangeSuccess)) {
                contentItem.afterChangeSuccess(video);
              }
            }
          })), fieldData.helper, formItemLayout, require));
        }

        return /*#__PURE__*/_react["default"].createElement(_col["default"], {
          key: contentItemKey,
          lg: lg || 6,
          md: 12,
          sm: 24,
          xs: 24
        }, type === _constants.formContentConfig.contentItemType.text ? _this.renderFormText(fieldData.label, contentItem.value || '', fieldData.helper, formItemLayout) : null, type === _constants.formContentConfig.contentItemType.input ? _this.renderFormInput(fieldData.label, fieldData.name, require, fieldData.helper, contentItem.icon || /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), canOperate, formItemLayout) : null, type === _constants.formContentConfig.contentItemType.password ? _this.renderFormPassword(fieldData.label, fieldData.name, require, fieldData.helper, contentItem.icon || /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), canOperate, formItemLayout) : null, type === _constants.formContentConfig.contentItemType.inputNumber ? _this.renderFormInputNumber(fieldData.label, fieldData.name, require, fieldData.helper, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), canOperate, formItemLayout) : null, type === _constants.formContentConfig.contentItemType["switch"] ? _this.renderFormSwitch(fieldData.label, fieldData.name, require, fieldData.helper, _objectSpread(_objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), {
          checked: contentItem.checked || false
        }), canOperate, formItemLayout) : null, type === _constants.formContentConfig.contentItemType.flexText ? /*#__PURE__*/_react["default"].createElement(_FlexText["default"], _objectSpread(_objectSpread({}, {
          style: {
            margin: '5px 0'
          }
        }), contentItem.flexTextProps || {})) : null, type === _constants.formContentConfig.contentItemType.onlyShowTextByFlexText ? /*#__PURE__*/_react["default"].createElement(_FlexText["default"], {
          style: {
            margin: '5px 0'
          },
          icon: null,
          textPrefix: fieldData.label || '',
          text: contentItem.value || ''
        }) : null, type === _constants.formContentConfig.contentItemType.datePicker ? _this.renderFormDatePicker(fieldData.label, fieldData.name, require, fieldData.helper, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), canOperate, formItemLayout) : null, type === _constants.formContentConfig.contentItemType.textarea ? _this.renderFormTextArea(fieldData.label, fieldData.name, require, fieldData.helper, _objectSpread(_objectSpread({}, {
          autoSize: {
            minRows: 3,
            maxRows: 5
          }
        }), contentItem.otherProps || {}), canOperate, formItemLayout) : null, type === _constants.formContentConfig.contentItemType.onlyShowTextarea ? _this.renderFormOnlyShowTextarea(fieldData.label, contentItem.value, fieldData.helper || '', _objectSpread(_objectSpread(_objectSpread({}, {
          autoSize: {
            minRows: 3,
            maxRows: 5
          }
        }), contentItem.otherProps || {}), {
          disabled: true,
          placeholder: "\u6682\u65E0".concat(fieldData.label, "\u4FE1\u606F")
        }), formItemLayout) : null, type === _constants.formContentConfig.contentItemType.onlyShowInput ? _this.renderFormOnlyShowInput(fieldData.label, contentItem.value, fieldData.helper || '', contentItem.icon || /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), _objectSpread(_objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), {
          disabled: true,
          placeholder: "\u6682\u65E0".concat(fieldData.label, "\u4FE1\u606F")
        }), formItemLayout) : null, type === _constants.formContentConfig.contentItemType.onlyShowInputDatetime ? _this.renderFormOnlyShowInput(fieldData.label, (0, _tools.formatDatetime)((0, _tools.toDatetime)(contentItem.value), _constants.datetimeFormat.yearMonthDayHourMinute), fieldData.helper || '', contentItem.icon || /*#__PURE__*/_react["default"].createElement(_icons.FormOutlined, null), _objectSpread(_objectSpread(_objectSpread({}, {}), contentItem.otherProps || {}), {
          disabled: true,
          placeholder: "\u6682\u65E0".concat(fieldData.label, "\u4FE1\u606F")
        }), formItemLayout) : null, type === _constants.formContentConfig.contentItemType.select ? _this.renderFormSelect(fieldData.label, fieldData.name, function () {
          return _this.renderFormOptionCore((0, _tools.refitCommonData)((0, _tools.isFunction)(contentItem.pretreatmentData) ? contentItem.pretreatmentData((0, _tools.isArray)(contentItem.listData) ? contentItem.listData : []) : (0, _tools.isArray)(contentItem.listData) ? contentItem.listData : []));
        }, fieldData.helper || '', (0, _tools.isFunction)(contentItem.onChangeCallback) ? contentItem.onChangeCallback : null, formItemLayout, true, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {})) : null, type === _constants.formContentConfig.contentItemType.whetherSelect ? _this.renderFormWhetherSelect(fieldData.label, fieldData.name, fieldData.helper, contentItem.onChangeCallback, formItemLayout, true, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {})) : null, type === _constants.formContentConfig.contentItemType.customSelect ? contentItem.component : null, type === _constants.formContentConfig.contentItemType.radio ? _this.renderFormSelect(fieldData.label, fieldData.name, function () {
          return _this.renderFormRadioCore((0, _tools.refitCommonData)((0, _tools.isArray)(contentItem.listData) ? contentItem.listData : []));
        }, fieldData.helper || '', (0, _tools.isFunction)(contentItem.onChangeCallback) ? contentItem.onChangeCallback : null, formItemLayout, true, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {})) : null, type === _constants.formContentConfig.contentItemType.whetherRadio ? _this.renderFormWhetherRadio(fieldData.label, fieldData.name, fieldData.helper, contentItem.onChangeCallback, formItemLayout, true, _objectSpread(_objectSpread({}, {}), contentItem.otherProps || {})) : null, type === _constants.formContentConfig.contentItemType.customRadio ? contentItem.component : null, type === _constants.formContentConfig.contentItemType.onlyShowText ? _this.renderFormOnlyShowText(fieldData.label, contentItem.value, ((0, _tools.isUndefined)(contentItem.showHelper) ? false : contentItem.showHelper || false) ? fieldData.helper || '' : '', formItemLayout) : null, type === _constants.formContentConfig.contentItemType.innerComponent ? _this.renderFormInnerComponent(fieldData.label, contentItem.component, fieldData.helper, formItemLayout, require) : null, type === _constants.formContentConfig.contentItemType.component ? contentItem.component || null : null, type === _constants.formContentConfig.contentItemType.jsonView ? _this.renderJsonView(contentItem.value) : null, type === _constants.formContentConfig.contentItemType.nowTime ? _this.renderFormNowTimeField({
          formItemLayout: formItemLayout
        }) : null);
      }) : null);
    };

    var defaultState = (0, _tools.defaultCommonState)();
    _this.state = _objectSpread(_objectSpread({}, defaultState), {
      backPath: '',
      videoUploading: false
    });
    return _this;
  }

  _createClass(Common, [{
    key: "getRequestingData",
    value: function getRequestingData() {
      return this.lastRequestingData;
    }
  }, {
    key: "setRequestingData",
    value: function setRequestingData(params, callback) {
      var d = params == null ? {
        type: '',
        payload: {}
      } : _objectSpread(_objectSpread({}, {
        type: '',
        payload: {}
      }), params);
      this.lastRequestingData = d;

      if ((0, _tools.isFunction)(callback)) {
        callback();
      }
    }
  }, {
    key: "clearRequestingData",
    value: function clearRequestingData() {
      this.setRequestingData({
        type: '',
        payload: {}
      });
    }
  }, {
    key: "checkWorkDoing",
    value: function checkWorkDoing() {
      var _this$state5 = this.state,
          dataLoading = _this$state5.dataLoading,
          reloading = _this$state5.reloading,
          searching = _this$state5.searching,
          refreshing = _this$state5.refreshing,
          paging = _this$state5.paging,
          processing = _this$state5.processing;

      if (dataLoading || reloading || searching || refreshing || paging || processing) {
        _message2["default"].info('数据正在处理中，请稍等一下再点哦');

        return true;
      }

      return false;
    }
  }, {
    key: "reloadByUrl",
    value: function reloadByUrl() {
      var pathname = this.props.location.pathname;
      this.redirectToPath(pathname.replace('/load/', '/update/'));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return (0, _tools.getDerivedStateFromPropsForUrlParams)(nextProps, prevState);
    }
  }]);

  return Common;
}(_Core2["default"]);

var _default = Common;
exports["default"] = _default;