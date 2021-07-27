"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/image/style");

var _image = _interopRequireDefault(require("antd/es/image"));

require("antd/es/spin/style");

var _spin = _interopRequireDefault(require("antd/es/spin"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@ant-design/icons");

var _tools = require("@/utils/tools");

var _constants = require("@/utils/constants");

var _IconInfo = _interopRequireDefault(require("@/customComponents/IconInfo"));

var _CustomBase2 = _interopRequireDefault(require("../../framework/CustomBase"));

var _index = _interopRequireDefault(require("./index.less"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ImageBox = /*#__PURE__*/function (_CustomBase) {
  _inherits(ImageBox, _CustomBase);

  var _super = _createSuper(ImageBox);

  function ImageBox(props) {
    var _this;

    _classCallCheck(this, ImageBox);

    _this = _super.call(this, props);
    _this.state = _objectSpread(_objectSpread({}, _this.state), {
      src: '',
      aspectRatio: 1,
      borderRadiusDefaultStyle: {},
      imageBoxStyle: {},
      borderRadius: false,
      showMode: 'box',
      circle: false,
      backgroundColor: {},
      showOverlay: false,
      overlayText: '',
      loadingEffect: false,
      hide: false,
      loadSuccess: false,
      imageLoadSuccess: false,
      errorOverlayVisible: false,
      errorOverlayText: '加载失败',
      showErrorOverlay: false,
      showErrorIcon: true
    });
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-unused-vars


  _createClass(ImageBox, [{
    key: "onImageLoadSuccess",
    value: function onImageLoadSuccess() {
      var _this$props = this.props,
          showOverlayValue = _this$props.showOverlay,
          loadingEffectValue = _this$props.loadingEffect;
      var showOverlay = showOverlayValue || false;
      var loadingEffect = loadingEffectValue || false;

      if (loadingEffect && !showOverlay) {
        this.setState({
          loadSuccess: true,
          imageLoadSuccess: true
        });
      }
    }
  }, {
    key: "onImageError",
    value: function onImageError() {
      var hideWhenLoadError = this.props.hideWhenLoadError;
      var _this$state = this.state,
          hide = _this$state.hide,
          errorOverlayVisible = _this$state.errorOverlayVisible;
      this.setState({
        hide: hideWhenLoadError ? true : hide,
        showErrorOverlay: errorOverlayVisible,
        loadSuccess: true,
        imageLoadSuccess: false
      });
    }
  }, {
    key: "onImageClick",
    value: function onImageClick() {
      var clickAction = this.props.clickAction;

      if ((0, _tools.isFunction)(clickAction)) {
        clickAction();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          fillHeight = _this$props2.fillHeight,
          preview = _this$props2.preview,
          previewSimpleMask = _this$props2.previewSimpleMask;
      var _this$state2 = this.state,
          src = _this$state2.src,
          aspectRatio = _this$state2.aspectRatio,
          imageBoxStyle = _this$state2.imageBoxStyle,
          showMode = _this$state2.showMode,
          showOverlay = _this$state2.showOverlay,
          overlayText = _this$state2.overlayText,
          loadingEffect = _this$state2.loadingEffect,
          hide = _this$state2.hide,
          loadSuccess = _this$state2.loadSuccess,
          imageLoadSuccess = _this$state2.imageLoadSuccess,
          showErrorOverlay = _this$state2.showErrorOverlay,
          errorOverlayText = _this$state2.errorOverlayText,
          showErrorIcon = _this$state2.showErrorIcon;

      if (hide) {
        return null;
      }

      var previewConfig = imageLoadSuccess && !(0, _tools.stringIsNullOrWhiteSpace)(src) && preview ? previewSimpleMask ? {
        mask: /*#__PURE__*/_react.default.createElement('div', {}, /*#__PURE__*/_react.default.createElement(_icons.EyeOutlined, null))
      } : true : false;

      if (showMode === 'loading' || showMode === 'box') {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: _index.default.imageBox,
          style: _objectSpread({}, imageBoxStyle)
        }, aspectRatio === 1 ? /*#__PURE__*/_react.default.createElement("div", {
          className: _index.default.placeholderBox
        }) : null, aspectRatio !== 1 ? /*#__PURE__*/_react.default.createElement("div", {
          className: _index.default.placeholderBox,
          style: {
            marginTop: "".concat(aspectRatio * 100, "%")
          }
        }) : null, showOverlay ? /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(_index.default.overlayBox, _index.default.overlayTextBackground)
        }, /*#__PURE__*/_react.default.createElement(_row.default, {
          type: "flex",
          align: "middle",
          justify: "center",
          className: _index.default.overlayTextInner
        }, /*#__PURE__*/_react.default.createElement(_col.default, null, /*#__PURE__*/_react.default.createElement("div", {
          className: _index.default.overlayText
        }, overlayText)))) : null, showMode === 'loading' ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_spin.default, {
          indicator: /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, {
            style: {
              fontSize: 18
            },
            spin: true
          })
        })) : null, loadingEffect && !loadSuccess && !showOverlay ? /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(_index.default.overlayBox, _index.default.overlayLoading)
        }, /*#__PURE__*/_react.default.createElement(_row.default, {
          justify: "space-around",
          align: "middle",
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/_react.default.createElement(_col.default, {
          flex: "auto"
        }), /*#__PURE__*/_react.default.createElement(_col.default, null, /*#__PURE__*/_react.default.createElement(_spin.default, {
          indicator: /*#__PURE__*/_react.default.createElement(_icons.LoadingOutlined, {
            style: {
              fontSize: 18
            },
            spin: true
          })
        })), /*#__PURE__*/_react.default.createElement(_col.default, {
          flex: "auto"
        }))) : null, showErrorOverlay ? /*#__PURE__*/_react.default.createElement("div", {
          className: (0, _classnames.default)(_index.default.overlayBox, _index.default.overlayErrorBackground)
        }, /*#__PURE__*/_react.default.createElement(_row.default, {
          justify: "space-around",
          align: "middle",
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/_react.default.createElement(_col.default, {
          flex: "auto"
        }), /*#__PURE__*/_react.default.createElement(_col.default, null, showErrorIcon ? /*#__PURE__*/_react.default.createElement(_IconInfo.default, {
          direction: "vertical",
          icon: /*#__PURE__*/_react.default.createElement(_icons.PictureOutlined, {
            className: _index.default.overlayIcon
          }),
          text: /*#__PURE__*/_react.default.createElement("span", {
            className: _index.default.overlayText
          }, errorOverlayText)
        }) : /*#__PURE__*/_react.default.createElement("span", {
          className: _index.default.overlayText
        }, errorOverlayText)), /*#__PURE__*/_react.default.createElement(_col.default, {
          flex: "auto"
        }))) : null, showMode === 'box' ? /*#__PURE__*/_react.default.createElement(_row.default, {
          justify: "space-around",
          align: "middle",
          className: (0, _classnames.default)(_index.default.imageItem, loadingEffect && !showOverlay ? !loadSuccess ? _index.default.imageLoadAnimationInit : _index.default.imageLoadAnimation : ''),
          style: imageBoxStyle
        }, /*#__PURE__*/_react.default.createElement(_col.default, {
          style: fillHeight ? {
            height: '100%',
            width: '100%'
          } : {
            width: '100%'
          }
        }, /*#__PURE__*/_react.default.createElement(_image.default, {
          className: fillHeight ? _index.default.fullHeight : null,
          style: imageLoadSuccess && !(0, _tools.stringIsNullOrWhiteSpace)(src) && preview ? {
            cursor: 'pointer'
          } : {},
          width: "100%",
          height: fillHeight ? '100%' : null,
          src: src,
          onLoad: function onLoad() {
            _this2.onImageLoadSuccess();
          },
          onError: function onError() {
            _this2.onImageError();
          },
          onClick: function onClick() {
            _this2.onImageClick();
          },
          alt: "",
          preview: previewConfig
        }))) : null);
      }

      if (showMode === 'contentImage') {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: imageBoxStyle
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: fillHeight ? _index.default.fullHeight : null
        }, /*#__PURE__*/_react.default.createElement(_image.default, {
          className: _index.default.contentImage,
          width: "100%",
          style: imageLoadSuccess && !(0, _tools.stringIsNullOrWhiteSpace)(src) && preview ? {
            cursor: 'pointer'
          } : {},
          src: src,
          onError: this.onImageError,
          onClick: this.onImageClick,
          alt: "",
          preview: previewConfig
        })));
      }

      return null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var src = nextProps.src,
          aspectRatio = nextProps.aspectRatio,
          imageBoxStyle = nextProps.imageBoxStyle,
          borderRadiusValue = nextProps.borderRadius,
          showModeValue = nextProps.showMode,
          circleValue = nextProps.circle,
          backgroundColorValue = nextProps.backgroundColor,
          showOverlayValue = nextProps.showOverlay,
          overlayTextValue = nextProps.overlayText,
          loadingEffectValue = nextProps.loadingEffect,
          errorOverlayVisibleValue = nextProps.errorOverlayVisible,
          errorOverlayTextValue = nextProps.errorOverlayText,
          showErrorIconValue = nextProps.showErrorIcon;
      var imageSrc = src || '';
      var aspectRatioVerify = aspectRatio || 1;
      var showOverlay = showOverlayValue || false;
      var showErrorIcon = showErrorIconValue && true;
      var errorOverlayVisible = errorOverlayVisibleValue || false;
      var errorOverlayText = errorOverlayTextValue || '加载失败';
      var loadingEffect = loadingEffectValue || false;
      var overlayText = overlayTextValue || '';
      aspectRatioVerify = aspectRatioVerify <= 0 ? 1 : aspectRatioVerify; // eslint-disable-next-line no-constant-condition

      var borderRadiusDefaultStyle = borderRadiusValue || true ? {
        borderRadius: '4px'
      } : {};
      var circle = circleValue || false;

      if (circle) {
        borderRadiusDefaultStyle.borderRadius = '50%';
      }

      if ((0, _tools.trim)((0, _tools.replace)(imageSrc || '', ' ', '')) === '') {
        imageSrc = _constants.defaultEmptyImage;
      }

      var imageBoxStyleMerge = _objectSpread(_objectSpread({}, imageBoxStyle), borderRadiusDefaultStyle);

      var backgroundColor = (backgroundColorValue || null) == null ? {} : {
        backgroundColor: backgroundColorValue
      };
      var showMode = showModeValue || 'box';
      var result = {
        src: imageSrc,
        aspectRatio: aspectRatioVerify,
        showOverlay: showOverlay,
        loadingEffect: loadingEffect,
        overlayText: overlayText,
        borderRadiusDefaultStyle: borderRadiusDefaultStyle,
        circle: circle,
        backgroundColor: backgroundColor,
        showMode: showMode,
        imageBoxStyle: imageBoxStyleMerge,
        errorOverlayVisible: errorOverlayVisible,
        errorOverlayText: errorOverlayText,
        showErrorIcon: showErrorIcon
      };
      var srcPre = prevState.src,
          showErrorOverlay = prevState.showErrorOverlay;
      return _objectSpread(_objectSpread({}, result), {
        showErrorOverlay: srcPre === imageSrc ? showErrorOverlay : false
      });
    }
  }]);

  return ImageBox;
}(_CustomBase2.default);

ImageBox.defaultProps = {
  fillHeight: true,
  preview: false,
  previewSimpleMask: false
};
var _default = ImageBox;
exports.default = _default;