import { g as getDefaultExportFromCjs } from './_commonjsHelpers.js';
import { t as toPropertyKeyExports, _ as _typeofExports } from './toPropertyKey.js';

var classCallCheckExports = {};
var classCallCheck = {
  get exports(){ return classCallCheckExports; },
  set exports(v){ classCallCheckExports = v; },
};

(function (module) {
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(classCallCheck);
var _classCallCheck = /*@__PURE__*/getDefaultExportFromCjs(classCallCheckExports);

var createClassExports = {};
var createClass = {
  get exports(){ return createClassExports; },
  set exports(v){ createClassExports = v; },
};

(function (module) {
  var toPropertyKey = toPropertyKeyExports;
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(createClass);
var _createClass = /*@__PURE__*/getDefaultExportFromCjs(createClassExports);

var inheritsExports = {};
var inherits = {
  get exports(){ return inheritsExports; },
  set exports(v){ inheritsExports = v; },
};

var setPrototypeOfExports = {};
var setPrototypeOf = {
  get exports(){ return setPrototypeOfExports; },
  set exports(v){ setPrototypeOfExports = v; },
};

(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _setPrototypeOf(o, p);
  }
  module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(setPrototypeOf);

(function (module) {
  var setPrototypeOf = setPrototypeOfExports;
  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }
  module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(inherits);
var _inherits = /*@__PURE__*/getDefaultExportFromCjs(inheritsExports);

var possibleConstructorReturnExports = {};
var possibleConstructorReturn = {
  get exports(){ return possibleConstructorReturnExports; },
  set exports(v){ possibleConstructorReturnExports = v; },
};

var assertThisInitializedExports = {};
var assertThisInitialized = {
  get exports(){ return assertThisInitializedExports; },
  set exports(v){ assertThisInitializedExports = v; },
};

(function (module) {
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(assertThisInitialized);

(function (module) {
  var _typeof = _typeofExports["default"];
  var assertThisInitialized = assertThisInitializedExports;
  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return assertThisInitialized(self);
  }
  module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(possibleConstructorReturn);
var _possibleConstructorReturn = /*@__PURE__*/getDefaultExportFromCjs(possibleConstructorReturnExports);

var getPrototypeOfExports = {};
var getPrototypeOf = {
  get exports(){ return getPrototypeOfExports; },
  set exports(v){ getPrototypeOfExports = v; },
};

(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _getPrototypeOf(o);
  }
  module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(getPrototypeOf);
var _getPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(getPrototypeOfExports);

export { _inherits as _, _classCallCheck as a, _createClass as b, _getPrototypeOf as c, _possibleConstructorReturn as d };
