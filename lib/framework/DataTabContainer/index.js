"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _proLayout = require("@ant-design/pro-layout");

var _constants = require("@/utils/constants");

var _FunctionComponent = require("@/customComponents/FunctionComponent");

var _DecorateAvatar = require("@/customComponents/DecorateAvatar");

var _DataLoad = _interopRequireDefault(require("../DataSingleView/DataLoad"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataTabContainer = /*#__PURE__*/function (_DataSingleView) {
  _inherits(DataTabContainer, _DataSingleView);

  var _super = _createSuper(DataTabContainer);

  function DataTabContainer(props) {
    var _this;

    _classCallCheck(this, DataTabContainer);

    _this = _super.call(this, props);
    _this.needSetFormValueAfterLoad = false;
    _this.tabList = [];

    _this.doWorkWhenDidUpdate = function (preProps, preState, snapshot) {
      var urlParams = _this.state.urlParams;
      var urlParamsPrev = preState.urlParams;

      if ((urlParams || null) == null || (urlParamsPrev || null) == null) {
        return;
      }

      var op = urlParams.op;
      var prevOp = urlParamsPrev.op;
      var dataLoading = _this.state.dataLoading;

      if (!dataLoading) {
        if (prevOp === 'load' && op === 'update' || _this.checkNeedUpdate(preProps, preState, snapshot)) {
          _this.reloadData();

          var pathname = _this.props.location.pathname;

          _this.redirectToPath("".concat(pathname.replace('/update/', '/load/')));
        }
      }
    };

    _this.handleTabChange = function (key) {
      var match = _this.props.match;
      (_this.tabList || []).forEach(function (item) {
        if (item.key === key) {
          _this.redirectToPath("".concat(match.url.replace('/update', '/load'), "/").concat(item.key));
        }
      });
    };

    _this.adjustTabListAvailable = function (tabListAvailable) {
      return tabListAvailable;
    };

    _this.getTabActiveKey = function () {
      var _this$props = _this.props,
          match = _this$props.match,
          pathname = _this$props.location.pathname;
      return pathname.replace(/\//g, '-').replace("".concat(match.url.replace(/\//g, '-'), "-"), '').replace(/-/g, '/');
    };

    _this.buildInitialValues = function (metaData, metaListData, metaExtra, metaOriginalData) {
      return null;
    };

    _this.onPageHeaderAvatarLoadErrorCallback = function () {
      _this.setState({
        avatarImageLoadResult: _DecorateAvatar.avatarImageLoadResultCollection.fail
      });
    };

    _this.pageHeaderTagList = function () {
      return [];
    };

    _this.pageHeaderTag = function () {
      return (0, _FunctionComponent.buildTagList)({
        list: _this.pageHeaderTagList()
      });
    };

    _this.pageHeaderAvatar = function () {
      return null;
    };

    _this.pageHeaderTitlePrefix = function () {
      return '';
    };

    _this.pageHeaderSubTitle = function () {
      return null;
    };

    _this.pageHeaderContentGridData = function () {
      return [];
    };

    _this.pageHeaderContentGridConfig = function () {
      return {
        type: _constants.pageHeaderRenderType.descriptionGrid,
        list: _this.pageHeaderContentGridData()
      };
    };

    _this.pageHeaderContentParagraphData = function () {
      return [];
    };

    _this.pageHeaderContentParagraphConfig = function () {
      return {
        type: _constants.pageHeaderRenderType.paragraph,
        list: _this.pageHeaderContentParagraphData()
      };
    };

    _this.pageHeaderContentActionData = function () {
      return [];
    };

    _this.pageHeaderContentActionConfig = function () {
      return {
        type: _constants.pageHeaderRenderType.action,
        list: _this.pageHeaderContentActionData()
      };
    };

    _this.pageHeaderContentData = function () {
      return {
        list: [_this.pageHeaderContentGridConfig(), _this.pageHeaderContentParagraphConfig(), _this.pageHeaderContentActionConfig()]
      };
    };

    _this.pageHeaderExtraContentData = function () {
      return null;
    };

    _this.getTabListAvailable = function () {
      var tabListAvailable = [];
      (_this.tabList || []).forEach(function (o) {
        var v = typeof o.show === 'undefined' ? true : o.show === true;

        if (v) {
          tabListAvailable.push(o);
        }
      });
      return _this.adjustTabListAvailable(tabListAvailable);
    };

    _this.buildOtherTabProps = function () {
      var tabListAvailable = _this.getTabListAvailable();

      if (tabListAvailable.length > 0) {
        return {
          type: 'card',
          size: 'small',
          tabBarStyle: {
            marginBottom: 0
          },
          tabBarGutter: 3
        };
      }

      return null;
    };

    _this.getPageName = function () {
      var pageName = _this.state.pageName;
      return pageName;
    };

    _this.state = _objectSpread(_objectSpread({}, _this.state), {}, {
      defaultAvatarIcon: /*#__PURE__*/_react.default.createElement(_icons.PictureOutlined, null),
      avatarImageLoadResult: _DecorateAvatar.avatarImageLoadResultCollection.wait,
      showPageHeaderAvatar: true,
      customTabActiveKey: false
    });
    return _this;
  }

  _createClass(DataTabContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          pageName = _this$state.pageName,
          defaultAvatarIcon = _this$state.defaultAvatarIcon,
          showPageHeaderAvatar = _this$state.showPageHeaderAvatar,
          dataLoading = _this$state.dataLoading,
          reloading = _this$state.reloading,
          avatarImageLoadResult = _this$state.avatarImageLoadResult;
      var children = this.props.children;
      var customTabActiveKey = this.state.customTabActiveKey;
      var tabListAvailable = this.getTabListAvailable();
      var avatarProps = showPageHeaderAvatar ? (0, _DecorateAvatar.decorateAvatar)(this.pageHeaderAvatar(), defaultAvatarIcon, showPageHeaderAvatar, dataLoading, reloading, avatarImageLoadResult, function () {
        _this2.onPageHeaderAvatarLoadErrorCallback();
      }) : null;
      var pageHeaderContentDataConfig = this.pageHeaderContentData();

      if (customTabActiveKey) {
        return /*#__PURE__*/_react.default.createElement(_proLayout.PageHeaderWrapper, {
          className: _index.default.customContainor,
          avatar: avatarProps,
          title: (0, _FunctionComponent.pageHeaderTitle)(this.getPageName(), this.pageHeaderTitlePrefix()),
          subTitle: this.pageHeaderSubTitle(),
          tags: (0, _FunctionComponent.pageHeaderTagWrapper)(this.pageHeaderTag()),
          extra: this.pageHeaderAction() // eslint-disable-next-line no-restricted-globals
          ,
          tabActiveKey: this.getTabActiveKey(),
          content: (0, _FunctionComponent.pageHeaderContent)(pageHeaderContentDataConfig),
          extraContent: (0, _FunctionComponent.pageHeaderExtraContent)(this.pageHeaderExtraContent()),
          tabList: tabListAvailable // tabBarExtraContent={<Button>Extra Action</Button>}
          ,
          onTabChange: this.handleTabChange,
          tabProps: this.buildOtherTabProps() // onBack={() => {
          //   this.backToList();
          // }}

        }, children);
      }

      return /*#__PURE__*/_react.default.createElement(_proLayout.PageHeaderWrapper, {
        className: _index.default.customContainor,
        avatar: avatarProps,
        title: (0, _FunctionComponent.pageHeaderTitle)(pageName, this.pageHeaderTitlePrefix()),
        subTitle: this.pageHeaderSubTitle(),
        tags: (0, _FunctionComponent.pageHeaderTagWrapper)(this.pageHeaderTag()),
        extra: this.pageHeaderAction() // eslint-disable-next-line no-restricted-globals
        ,
        tabActiveKey: this.getTabActiveKey(),
        content: (0, _FunctionComponent.pageHeaderContent)(pageHeaderContentDataConfig),
        extraContent: (0, _FunctionComponent.pageHeaderExtraContent)(this.pageHeaderExtraContentData()),
        tabList: tabListAvailable // tabBarExtraContent={<Button>Extra Action</Button>}
        ,
        onTabChange: this.handleTabChange,
        tabProps: this.buildOtherTabProps() // onBack={() => {
        //   this.backToList();
        // }}

      }, children, this.renderOther());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      return _get(_getPrototypeOf(DataTabContainer), "getDerivedStateFromProps", this).call(this, nextProps, prevState);
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars

  }]);

  return DataTabContainer;
}(_DataLoad.default);

var _default = DataTabContainer;
exports.default = _default;