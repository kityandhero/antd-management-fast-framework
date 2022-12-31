import { g as getDefaultExportFromCjs } from './_commonjsHelpers.js';

var _extendsExports = {};
var _extends$1 = {
  get exports(){ return _extendsExports; },
  set exports(v){ _extendsExports = v; },
};

(function (module) {
  function _extends() {
    module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
    return _extends.apply(this, arguments);
  }
  module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_extends$1);
var _extends = /*@__PURE__*/getDefaultExportFromCjs(_extendsExports);

export { _extends as _ };
