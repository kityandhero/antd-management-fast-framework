"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

require("antd/es/avatar/style");

var _avatar = _interopRequireDefault(require("antd/es/avatar"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

var _DataCore2 = _interopRequireDefault(require("../../DataSingleView/DataCore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var BaseAddForm = /*#__PURE__*/function (_DataCore) {
  _inherits(BaseAddForm, _DataCore);

  var _super = _createSuper(BaseAddForm);

  function BaseAddForm(props) {
    var _this;

    _classCallCheck(this, BaseAddForm);

    _this = _super.call(this, props);
    _this.loadDataAfterMount = false;
    _this.formRef = /*#__PURE__*/_react["default"].createRef();

    _this.adjustWhenDidMount = function () {
      _this.fillForm();
    };

    _this.getTargetForm = function () {
      return _this.formRef.current;
    };

    _this.fillForm = function () {
      var initialValues = _this.buildInitialValues();

      if (initialValues == null) {
        var form = _this.getTargetForm();

        if (form != null) {
          form.setFieldsValue(initialValues);

          _this.afterSetFieldsValue(initialValues);
        }
      }
    };

    _this.afterFillForm = function (initialValues) {};

    _this.setFormFieldsValue = function (v) {
      var form = _this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(v);

        _this.afterSetFieldsValue(v);
      }
    };

    _this.afterSetFieldsValue = function (v) {};

    _this.handleFormReset = function () {
      var form = _this.getTargetForm();

      if (form == null) {
        return;
      }

      form.resetFields();

      _this.reloadData();
    };

    _this.supplementSubmitRequestParams = function (o) {
      return o;
    };

    _this.validate = function (e) {
      var dispatch = _this.props.dispatch;

      var form = _this.getTargetForm();

      var validateFields = form.validateFields;
      var submitApiPath = _this.state.submitApiPath;
      validateFields().then(function (values) {
        var submitData = (0, _tools.pretreatmentRequestParams)(values);
        submitData = _this.supplementSubmitRequestParams(submitData);

        var checkResult = _this.checkSubmitData(submitData);

        if (checkResult) {
          _this.setState({
            processing: true
          });

          dispatch({
            type: submitApiPath,
            payload: submitData
          }).then(function () {
            if (_this.mounted) {
              var remoteData = _this.getApiData(_this.props);

              var dataSuccess = remoteData.dataSuccess;

              if (dataSuccess) {
                var metaListData = remoteData.list,
                    metaData = remoteData.data,
                    metaExtra = remoteData.extra;

                _this.afterSubmitSuccess(metaData || null, metaListData || [], metaExtra || null, remoteData, submitData);
              } // eslint-disable-next-line react/no-unused-state


              _this.setState({
                processing: false
              });
            }
          });
        }
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

    _this.pageHeaderLogo = function () {
      return /*#__PURE__*/_react["default"].createElement(_avatar["default"], {
        shape: "square",
        icon: /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)
      });
    };

    _this.buildInitialValues = function () {
      var initialValues = {};
      initialValues[_constants.formNameCollection.createTime.name] = (0, _tools.formatDatetime)(new Date(), _constants.datetimeFormat.yearMonthDayHourMinute);
      return initialValues;
    };

    _this.renderModalInner = function () {
      var initialValues = _this.buildInitialValues();

      var formLayout = _this.buildFormLayout();

      var otherFormProps = _this.buildOtherFormProps();

      return /*#__PURE__*/_react["default"].createElement(_form["default"], _extends({
        ref: _this.formRef,
        layout: formLayout,
        initialValues: initialValues,
        className: _this.getFormClassName()
      }, otherFormProps), _this.formContent());
    };

    _this.buildNotificationDescription = function ( // eslint-disable-next-line @typescript-eslint/no-unused-vars
    singleData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extraData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    responseOriginalData, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    submitData) {
      return "\u6570\u636E\u5DF2\u7ECF\u4FDD\u5B58\u6210\u529F\uFF0C\u8BF7\u8FDB\u884C\u4E0B\u4E00\u6B65\u64CD\u4F5C\u3002";
    };

    var defaultState = (0, _tools.defaultFormState)();
    _this.state = _objectSpread(_objectSpread({}, defaultState), {
      dataLoading: false
    });
    return _this;
  }

  _createClass(BaseAddForm, null, [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return (0, _tools.getDerivedStateFromPropsForUrlParams)(nextProps, prevState);
    }
  }]);

  return BaseAddForm;
}(_DataCore2["default"]);

var _default = BaseAddForm;
exports["default"] = _default;