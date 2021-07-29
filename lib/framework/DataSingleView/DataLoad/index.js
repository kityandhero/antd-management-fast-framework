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

var _tools = require('../../../utils/tools');

var _DataCore2 = _interopRequireDefault(require('../DataCore'));

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

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
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

var DataLoad = /*#__PURE__*/ (function(_DataCore) {
  _inherits(DataLoad, _DataCore);

  var _super = _createSuper(DataLoad);

  function DataLoad(props) {
    var _this;

    _classCallCheck(this, DataLoad);

    _this = _super.call(this, props);

    _this.doWorkWhenDidUpdate = function(preProps, preState, snapshot) {
      var urlParams = _this.state.urlParams;
      var urlParamsPrev = preState.urlParams;

      if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
        return;
      }

      var op = urlParams.op;
      var prevOp = urlParamsPrev.op;
      var dataLoading = _this.state.dataLoading;

      if (!dataLoading) {
        if (
          (prevOp === 'load' && op === 'update') ||
          _this.checkNeedUpdate(preProps, preState, snapshot)
        ) {
          if (_this.reloadByUrlOp) {
            _this.reloadData();
          }
        }
      }
    };

    _this.afterLoadSuccess = function(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    ) {
      _this.fillForm(metaData, metaListData, metaExtra, metaOriginalData);

      _this.doOtherAfterLoadSuccess(
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      );
    };

    _this.doOtherAfterLoadSuccess = function(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    ) {};

    _this.fillForm = function(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    ) {
      var initialValues = _this.buildInitialValues(
        metaData,
        metaListData,
        metaExtra,
        metaOriginalData,
      );

      var form = _this.getTargetForm();

      if (form != null) {
        form.setFieldsValue(initialValues);

        _this.afterFillForm(
          metaData,
          metaListData,
          metaExtra,
          metaOriginalData,
        );
      }
    };

    _this.afterFillForm = function(
      metaData,
      metaListData,
      metaExtra,
      metaOriginalData,
    ) {};

    _this.lastLoadParams = null;
    var defaultState = (0, _tools.defaultFormState)();
    _this.state = _objectSpread(_objectSpread({}, defaultState), {
      showReloadButton: true,
    });
    return _this;
  }

  _createClass(DataLoad, null, [
    {
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, prevState) {
        return (0, _tools.getDerivedStateFromPropsForUrlParams)(
          nextProps,
          prevState,
        );
      }, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    },
  ]);

  return DataLoad;
})(_DataCore2['default']);

var _default = DataLoad;
exports['default'] = _default;
