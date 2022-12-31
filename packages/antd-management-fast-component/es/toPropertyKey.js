import { g as getDefaultExportFromCjs } from './_commonjsHelpers.js';

var toPropertyKeyExports = {};
var toPropertyKey = {
  get exports(){ return toPropertyKeyExports; },
  set exports(v){ toPropertyKeyExports = v; },
};

var _typeofExports = {};
var _typeof$1 = {
  get exports(){ return _typeofExports; },
  set exports(v){ _typeofExports = v; },
};

(function (module) {
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  }
  module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof$1);
var _typeof = /*@__PURE__*/getDefaultExportFromCjs(_typeofExports);

var toPrimitiveExports = {};
var toPrimitive = {
  get exports(){ return toPrimitiveExports; },
  set exports(v){ toPrimitiveExports = v; },
};

(function (module) {
  var _typeof = _typeofExports["default"];
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toPrimitive);

(function (module) {
  var _typeof = _typeofExports["default"];
  var toPrimitive = toPrimitiveExports;
  function _toPropertyKey(arg) {
    var key = toPrimitive(arg, "string");
    return _typeof(key) === "symbol" ? key : String(key);
  }
  module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toPropertyKey);

export { _typeofExports as _, _typeof as a, toPropertyKeyExports as t };
