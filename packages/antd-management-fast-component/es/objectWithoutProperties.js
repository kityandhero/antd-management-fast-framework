import { g as getDefaultExportFromCjs } from './_commonjsHelpers.js';

var objectWithoutPropertiesExports = {};
var objectWithoutProperties = {
  get exports(){ return objectWithoutPropertiesExports; },
  set exports(v){ objectWithoutPropertiesExports = v; },
};

var objectWithoutPropertiesLooseExports = {};
var objectWithoutPropertiesLoose = {
  get exports(){ return objectWithoutPropertiesLooseExports; },
  set exports(v){ objectWithoutPropertiesLooseExports = v; },
};

(function (module) {
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(objectWithoutPropertiesLoose);

(function (module) {
  var objectWithoutPropertiesLoose = objectWithoutPropertiesLooseExports;
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(objectWithoutProperties);
var _objectWithoutProperties = /*@__PURE__*/getDefaultExportFromCjs(objectWithoutPropertiesExports);

export { _objectWithoutProperties as _ };
