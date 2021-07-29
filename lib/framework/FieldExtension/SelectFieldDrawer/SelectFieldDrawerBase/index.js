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

require('antd/es/message/style');

var _message2 = _interopRequireDefault(require('antd/es/message'));

var _tools = require('../../../../utils/tools');

var _constants = require('../../../../utils/constants');

var _SelectFieldBase2 = _interopRequireDefault(require('../SelectFieldBase'));

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

function _get(target, property, receiver) {
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }
  return object;
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

var SelectFieldInteractiveBase = /*#__PURE__*/ (function(_SelectFieldBase) {
  _inherits(SelectFieldInteractiveBase, _SelectFieldBase);

  var _super = _createSuper(SelectFieldInteractiveBase);

  function SelectFieldInteractiveBase(props) {
    var _this;

    _classCallCheck(this, SelectFieldInteractiveBase);

    _this = _super.call(this, props);

    _this.showSelect = function() {
      var selectMode = _this.props.selectMode;

      if (
        (0, _tools.toNumber)(selectMode) ===
        _constants.selectModeCollection.drawer
      ) {
        _this.showDrawer();
      }

      if (
        (0, _tools.toNumber)(selectMode) ===
        _constants.selectModeCollection.modal
      ) {
        _this.showModal();
      }
    };

    _this.showDrawer = function() {
      _this.setState({
        drawerVisible: true,
      });
    };

    _this.afterDrawerClose = function() {
      _this.setState({
        drawerVisible: false,
      });
    };

    _this.afterDrawerSelectSuccess = function(o) {
      _this.afterSelectSuccessCore(o);
    };

    _this.showModal = function() {
      _this.setState({
        modalVisible: true,
      });
    };

    _this.afterModalSelectSuccess = function(o) {
      _this.setState({
        modalVisible: false,
      });

      _this.afterSelectSuccessCore(o);
    };

    _this.afterModalCancel = function() {
      _this.setState({
        modalVisible: false,
      });
    };

    _this.afterSelectSuccessCore = function(o) {
      if ((o || null) == null) {
        var _ref = _this.getFieldData() || {
            fieldTitle: '',
            fieldPlaceholder: '请选择',
          },
          fieldTitle = _ref.fieldTitle,
          fieldPlaceholder = _ref.fieldPlaceholder;

        _message2['default'].warn(
          ''.concat(fieldPlaceholder).concat(fieldTitle),
        );

        return;
      }

      var afterSelect = _this.props.afterSelect;

      _this.setState({
        selectData: o,
      });

      if ((0, _tools.isFunction)(afterSelect)) {
        afterSelect(o);
      }
    };

    _this.renderSelectDrawer = function() {
      (0, _tools.showRuntimeErrorMessage)('需要实现 renderSelectDrawer 方法');
    };

    _this.renderSelectModal = function() {
      (0, _tools.showRuntimeErrorMessage)('需要实现 renderSelectModal 方法');
    };

    _this.renderOther = function() {
      var selectMode = _this.props.selectMode;

      if (
        (0, _tools.toNumber)(selectMode) ===
        _constants.selectModeCollection.drawer
      ) {
        return _this.renderSelectDrawer();
      }

      if (
        (0, _tools.toNumber)(selectMode) ===
        _constants.selectModeCollection.modal
      ) {
        return _this.renderSelectModal();
      }

      (0, _tools.showRuntimeErrorMessage)('无效的选择项渲染模式');
      return null;
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      drawerVisible: false,
      modalVisible: false,
    });
    return _this;
  }

  _createClass(SelectFieldInteractiveBase, null, [
    {
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, prevState) {
        return _get(
          _getPrototypeOf(SelectFieldInteractiveBase),
          'getDerivedStateFromProps',
          this,
        ).call(this, nextProps, prevState);
      },
    },
  ]);

  return SelectFieldInteractiveBase;
})(_SelectFieldBase2['default']);

SelectFieldInteractiveBase.defaultProps = {
  showClear: true,
  selectMode: _constants.selectModeCollection.drawer,
};
var _default = SelectFieldInteractiveBase;
exports['default'] = _default;
