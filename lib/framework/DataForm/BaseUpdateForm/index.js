"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _tools = require("@/utils/tools");

var _DataLoad = _interopRequireDefault(require("../../DataSingleView/DataLoad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BaseUpdateForm = /*#__PURE__*/function (_DataSingleView) {
  _inherits(BaseUpdateForm, _DataSingleView);

  var _super = _createSuper(BaseUpdateForm);

  function BaseUpdateForm() {
    var _this;

    _classCallCheck(this, BaseUpdateForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.goToUpdateWhenProcessed = false;

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

    _this.validate = function (e) {
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

    return _this;
  }

  return BaseUpdateForm;
}(_DataLoad.default);

var _default = BaseUpdateForm;
exports.default = _default;