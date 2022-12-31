import { g as getDefaultExportFromCjs } from './_commonjsHelpers.js';
import { t as toPropertyKeyExports } from './toPropertyKey.js';

var definePropertyExports = {};
var defineProperty = {
  get exports(){ return definePropertyExports; },
  set exports(v){ definePropertyExports = v; },
};

(function (module) {
  var toPropertyKey = toPropertyKeyExports;
  function _defineProperty(obj, key, value) {
    key = toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(defineProperty);
var _defineProperty = /*@__PURE__*/getDefaultExportFromCjs(definePropertyExports);

export { _defineProperty as _, definePropertyExports as d };
