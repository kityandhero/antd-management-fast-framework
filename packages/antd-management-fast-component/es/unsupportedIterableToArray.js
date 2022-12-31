var unsupportedIterableToArrayExports = {};
var unsupportedIterableToArray = {
  get exports(){ return unsupportedIterableToArrayExports; },
  set exports(v){ unsupportedIterableToArrayExports = v; },
};

var arrayLikeToArrayExports = {};
var arrayLikeToArray = {
  get exports(){ return arrayLikeToArrayExports; },
  set exports(v){ arrayLikeToArrayExports = v; },
};

(function (module) {
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(arrayLikeToArray);

(function (module) {
  var arrayLikeToArray = arrayLikeToArrayExports;
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
  }
  module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(unsupportedIterableToArray);

export { arrayLikeToArrayExports as a, unsupportedIterableToArrayExports as u };
