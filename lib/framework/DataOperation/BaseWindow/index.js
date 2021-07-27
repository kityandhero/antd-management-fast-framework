"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _react = _interopRequireDefault(require("react"));

var _tools = require("@/utils/tools");

var _Base2 = _interopRequireDefault(require("../Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var BaseWindow = /*#__PURE__*/function (_Base) {
  _inherits(BaseWindow, _Base);

  var _super = _createSuper(BaseWindow);

  function BaseWindow() {
    var _this;

    _classCallCheck(this, BaseWindow);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.reloadWhenShow = false;
    _this.loadDataAfterMount = false;
    _this.formRef = /*#__PURE__*/_react.default.createRef();
    _this.submitWithForm = true;
    _this.goToUpdateWhenProcessed = false;

    _this.doWorkWhenDidUpdate = function (preProps, preState, snapshot) {
      var visiblePre = preState.visible;
      var visible = _this.state.visible;

      if (visible && !visiblePre) {
        var form = _this.getTargetForm();

        if (form != null) {
          form.resetFields();
        }

        _this.doOtherWhenChangeVisible(preProps, preState, snapshot);
      }
    };

    _this.doOtherWhenChangeVisible = function (preProps, preState, snapshot) {
      _this.executeAfterDoOtherWhenChangeVisible();
    };

    _this.executeAfterDoOtherWhenChangeVisible = function () {};

    _this.getTargetForm = function () {
      return _this.formRef.current;
    };

    _this.supplementSubmitRequestParams = function (o) {
      return o;
    };

    _this.afterLoadSuccess = function (metaData, metaListData, metaExtra, metaOriginalData) {
      _this.fillForm(metaData);

      _this.doOtherAfterLoadSuccess(metaData, metaListData, metaExtra, metaOriginalData);
    };

    _this.doOtherAfterLoadSuccess = function (metaData, metaListData, metaExtra, metaOriginalData) {};

    _this.fillForm = function (metaData, metaListData, metaExtra, metaOriginalData) {
      var initialValues = _this.buildInitialValues(metaData, metaListData, metaExtra, metaOriginalData);

      if (initialValues != null) {
        _this.setFormFieldsValue(initialValues);
      }
    };

    _this.setFormFieldsValue = function (v) {
      var form = _this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(v);

        _this.afterSetFieldsValue(v);
      }
    };

    _this.afterSetFieldsValue = function (v) {};

    _this.afterCheckSubmitRequestParams = function (o) {
      return o;
    };

    _this.execSubmitApi = function () {
      var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var afterSubmitCallback = arguments.length > 1 ? arguments[1] : undefined;
      var dispatch = _this.props.dispatch;
      var submitApiPath = _this.state.submitApiPath;

      if ((submitApiPath || '') === '') {
        (0, _tools.showRuntimeErrorMessage)("\u7F3A\u5C11 submitApiPath \u914D\u7F6E\uFF01");
        return;
      }

      var submitData = (0, _tools.pretreatmentRequestParams)(values || {});
      submitData = _this.supplementSubmitRequestParams(submitData);

      var checkResult = _this.checkSubmitData(submitData);

      submitData = _this.afterCheckSubmitRequestParams(submitData);

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
            }, function () {
              if ((0, _tools.isFunction)(afterSubmitCallback)) {
                afterSubmitCallback();
              }
            });
          }
        });
      }
    };

    _this.handleOkWithForm = function (e) {
      e.preventDefault();

      var form = _this.getTargetForm();

      if (form == null) {
        return;
      }

      var validateFields = form.validateFields;
      validateFields().then(function (values) {
        _this.execSubmitApi(values, function () {
          if (_this.goToUpdateWhenProcessed) {
            _this.reloadByUrl();
          }
        });
      }).catch(function (error) {
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

          _message2.default.warn(errorMessage);
        } else {
          (0, _tools.showRuntimeErrorMessage)(error);
        }
      });
    };

    _this.handleOk = function (e) {
      if (_this.submitWithForm) {
        _this.handleOkWithForm(e);
      } else {
        _this.execSubmitApi();
      }
    };

    _this.afterSubmitSuccess = function (singleData, listData, extraData, responseOriginalData, submitData) {
      _this.doAfterSubmitSuccess(singleData, listData, extraData, responseOriginalData, submitData);
    };

    _this.buildInitialValues = function (metaData, metaListData, metaExtra, metaOriginalData) {
      return null;
    };

    _this.handleCancel = function () {
      var afterCancel = _this.props.afterCancel;

      if ((0, _tools.isFunction)(afterCancel)) {
        afterCancel();
      }
    };

    _this.getFormClassName = function () {
      return null;
    };

    return _this;
  }

  _createClass(BaseWindow, null, [{
    key: "getDerivedStateFromProps",
    value: // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function getDerivedStateFromProps(nextProps, prevState) {
      var visible = nextProps.visible,
          externalData = nextProps.externalData;
      return {
        visible: visible,
        externalData: externalData
      };
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }]);

  return BaseWindow;
}(_Base2.default);

var _default = BaseWindow;
exports.default = _default;