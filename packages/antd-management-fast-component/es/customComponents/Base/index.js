import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { _ as _slicedToArray } from '../../slicedToArray.js';
import { _ as _objectSpread } from '../../objectSpread2.js';
import nprogress from 'nprogress';
import { Component } from 'react';
import { d as defaultSettingsLayoutCustom } from '../../defaultSettingsSpecial.js';
import { i as isObject, a as isFunction, r as recordError, b as recordDebug, g as goToPath, c as redirectToPath, d as getGuid, s as showInfoMessage, e as isEqual, f as defaultBaseState } from '../../tools.js';
import '../../_commonjsHelpers.js';
import '../../toPropertyKey.js';
import '../../unsupportedIterableToArray.js';
import '../../defineProperty.js';
import '../../constants.js';
import '@ant-design/icons';
import '../../core.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import 'antd';
import 'array-move';
import 'copy-to-clipboard';
import 'moment';
import 'numeral';
import 'nzh';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function filterModel(props) {
  var result = _objectSpread({}, props);
  delete result.loading;
  Object.entries(result).forEach(function (o) {
    var _o = _slicedToArray(o, 2),
      k = _o[0],
      v = _o[1];
    if (isObject(v)) {
      if (!!v.fromRemote) {
        delete result[k];
      }
    }
  });
  return result;
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(a, b) {
  return isEqual(a, b);
}
var Base = /*#__PURE__*/function (_Component) {
  _inherits(Base, _Component);
  var _super = _createSuper(Base);
  /**
   *显示render次数开关，用于开发时候调试页面渲染性能
   */

  /**
   * 用于组件内数据循环构建 key 时附加唯一前缀，有助于提升页面执行效率
   */

  function Base(props) {
    var _this;
    _classCallCheck(this, Base);
    _this = _super.call(this, props);
    _this.mounted = false;
    _this.showRenderCountInConsole = false;
    _this.renderCount = 0;
    _this.keyPrefix = '';
    _this.doDidMountTask = function () {};
    _this.doOtherCheckComponentUpdate = function (nextProps, nextState) {
      return null;
    };
    _this.doWhenGetSnapshotBeforeUpdate = function (preProps, preState) {
      return null;
    };
    _this.doWorkWhenDidUpdate = function (preProps, preState, snapshot) {};
    _this.beforeDidMount = function () {};
    _this.afterDidMount = function () {};
    _this.beforeUnmount = function () {};
    _this.afterUnmount = function () {};
    _this.getDispatch = function () {
      if (isObject(_this.props)) {
        var dispatch = _this.props.dispatch;
        if (isFunction(dispatch)) {
          return dispatch;
        }
      }
      var text = 'please override getDispatch, and return a function';
      recordError(text);
      throw new Error(text);
    };
    _this.getDispatchWrapper = function () {
      var dispatch = _this.getDispatch();
      if (!isFunction(dispatch)) {
        recordError('dispatch not a function, please check getDispatch');
      }
      return dispatch;
    };
    _this.dispatchApi = function (_ref) {
      var type = _ref.type,
        payload = _ref.payload;
      var dispatch = _this.getDispatchWrapper();
      recordDebug("modal access: ".concat(type));
      return dispatch({
        type: type,
        payload: payload
      });
    };
    _this.goToPath = function (path) {
      var location = {
        pathname: path
      };
      if (defaultSettingsLayoutCustom.getUseNprogress()) {
        nprogress.inc();
        setTimeout(function () {
          nprogress.done();
        }, 400);
      }
      goToPath(location);
    };
    _this.redirectToPath = function (path) {
      var location = {
        pathname: path
      };
      if (defaultSettingsLayoutCustom.getUseNprogress()) {
        nprogress.inc();
        setTimeout(function () {
          nprogress.done();
        }, 400);
      }
      redirectToPath(location);
    };
    _this.checkHasMore = function (pageNo, pageSize, total) {
      if ((total || 0) <= 0) {
        return false;
      }
      return (pageNo || 0) * (pageSize || 0) < (total || 0);
    };
    _this.mounted = false;
    var defaultState = defaultBaseState();
    _this.state = defaultState;
    _this.keyPrefix = getGuid();
    return _this;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _createClass(Base, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.beforeDidMount();
      this.mounted = true;
      this.doDidMountTask();
      this.afterDidMount();
    }

    // eslint-disable-next-line react/sort-comp
  }, {
    key: "getSnapshotBeforeUpdate",
    value: function getSnapshotBeforeUpdate(preProps, preState) {
      return this.doWhenGetSnapshotBeforeUpdate(preProps, preState);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(preProps, preState, snapshot) {
      this.doWorkWhenDidUpdate(preProps, preState, snapshot);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _dispatchComplete$nex = _objectSpread(_objectSpread({}, {
          dispatchComplete: true
        }), nextState),
        dispatchComplete = _dispatchComplete$nex.dispatchComplete;
      if (!!!dispatchComplete) {
        return false;
      }
      var checkComponentUpdate = this.doOtherCheckComponentUpdate(nextProps, nextState);
      if ((checkComponentUpdate || null) != null) {
        return !!checkComponentUpdate;
      }
      var nextPropsIgnoreModel = filterModel(nextProps);
      var currentPropsIgnoreModel = filterModel(this.props);
      return !shallowEqual(nextPropsIgnoreModel, currentPropsIgnoreModel) || !shallowEqual(nextState, this.state);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.beforeUnmount();
      this.mounted = false;
      this.setState = function () {};
      this.afterUnmount();
    }
  }, {
    key: "showRenderCount",
    value: function showRenderCount() {
      if (this.showRenderCountInConsole) {
        this.renderCount += 1;
        var text = "render frequency: ".concat(this.renderCount);
        showInfoMessage({
          message: text
        });
      }
    }

    /**
     * check loading progress,if loading or load fail,return false,else return true
     * @returns bool
     */
  }, {
    key: "checkLoadingProgress",
    value: function checkLoadingProgress() {
      var _this$state = this.state,
        dataLoading = _this$state.dataLoading,
        loadSuccess = _this$state.loadSuccess;
      return dataLoading || !loadSuccess;
    }

    /**
     * check operability,if loading or or processing or load fail,return false,else return true
     * @returns bool
     */
  }, {
    key: "checkOperability",
    value: function checkOperability() {
      var _this$state2 = this.state,
        dataLoading = _this$state2.dataLoading,
        processing = _this$state2.processing,
        loadSuccess = _this$state2.loadSuccess;
      return dataLoading || processing || !loadSuccess;
    }

    /**
     * check in progress,if loading or or processing,return false,else return true
     * @returns bool
     */
  }, {
    key: "checkInProgress",
    value: function checkInProgress() {
      var _this$state3 = this.state,
        dataLoading = _this$state3.dataLoading,
        processing = _this$state3.processing;
      return dataLoading || processing;
    }
  }, {
    key: "renderFurther",
    value: function renderFurther() {
      return null;
    }
  }, {
    key: "render",
    value: function render() {
      this.showRenderCount();
      return this.renderFurther();
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return null;
    }
  }]);
  return Base;
}(Component);

export { Base as default };
