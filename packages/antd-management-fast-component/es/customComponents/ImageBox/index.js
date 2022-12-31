import { _ as _objectSpread } from '../../objectSpread2.js';
import { _ as _inherits, a as _classCallCheck, b as _createClass, c as _getPrototypeOf, d as _possibleConstructorReturn } from '../../getPrototypeOf.js';
import { Row, Col, Spin, Image } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { EyeOutlined, LoadingOutlined, PictureOutlined } from '@ant-design/icons';
import { o as defaultEmptyImage } from '../../constants.js';
import { a as isFunction, h as stringIsNullOrWhiteSpace, H as trim, I as replace } from '../../tools.js';
import CustomBase from '../CustomBase/index.js';
import IconInfo from '../IconInfo/index.js';
import '../../_commonjsHelpers.js';
import '../../defineProperty.js';
import '../../toPropertyKey.js';
import 'array-move';
import 'copy-to-clipboard';
import 'lodash';
import 'moment';
import 'numeral';
import 'nzh';
import 'qs';
import 'queue';
import 'randomcolor';
import 'umi';
import 'uuid';
import '../../core.js';
import 'path-to-regexp';
import '../Ellipsis/index.js';
import '../../extends.js';
import '../../objectWithoutProperties.js';

var styles = undefined;

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      if (isFunction(clickAction)) {
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
      var previewConfig = imageLoadSuccess && !stringIsNullOrWhiteSpace(src) && preview ? previewSimpleMask ? {
        mask: /*#__PURE__*/React.createElement('div', {}, /*#__PURE__*/React.createElement(EyeOutlined, null))
      } : true : false;
      if (showMode === 'loading' || showMode === 'box') {
        return /*#__PURE__*/React.createElement("div", {
          className: styles.imageBox,
          style: _objectSpread({}, imageBoxStyle)
        }, aspectRatio === 1 ? /*#__PURE__*/React.createElement("div", {
          className: styles.placeholderBox
        }) : null, aspectRatio !== 1 ? /*#__PURE__*/React.createElement("div", {
          className: styles.placeholderBox,
          style: {
            marginTop: "".concat(aspectRatio * 100, "%")
          }
        }) : null, showOverlay ? /*#__PURE__*/React.createElement("div", {
          className: classNames(styles.overlayBox, styles.overlayTextBackground)
        }, /*#__PURE__*/React.createElement(Row, {
          type: "flex",
          align: "middle",
          justify: "center",
          className: styles.overlayTextInner
        }, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("div", {
          className: styles.overlayText
        }, overlayText)))) : null, showMode === 'loading' ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Spin, {
          indicator: /*#__PURE__*/React.createElement(LoadingOutlined, {
            style: {
              fontSize: 18
            },
            spin: true
          })
        })) : null, loadingEffect && !loadSuccess && !showOverlay ? /*#__PURE__*/React.createElement("div", {
          className: classNames(styles.overlayBox, styles.overlayLoading)
        }, /*#__PURE__*/React.createElement(Row, {
          justify: "space-around",
          align: "middle",
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }), /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement(Spin, {
          indicator: /*#__PURE__*/React.createElement(LoadingOutlined, {
            style: {
              fontSize: 18
            },
            spin: true
          })
        })), /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }))) : null, showErrorOverlay ? /*#__PURE__*/React.createElement("div", {
          className: classNames(styles.overlayBox, styles.overlayErrorBackground)
        }, /*#__PURE__*/React.createElement(Row, {
          justify: "space-around",
          align: "middle",
          style: {
            height: '100%'
          }
        }, /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }), /*#__PURE__*/React.createElement(Col, null, showErrorIcon ? /*#__PURE__*/React.createElement(IconInfo, {
          direction: "vertical",
          icon: /*#__PURE__*/React.createElement(PictureOutlined, {
            className: styles.overlayIcon
          }),
          text: /*#__PURE__*/React.createElement("span", {
            className: styles.overlayText
          }, errorOverlayText)
        }) : /*#__PURE__*/React.createElement("span", {
          className: styles.overlayText
        }, errorOverlayText)), /*#__PURE__*/React.createElement(Col, {
          flex: "auto"
        }))) : null, showMode === 'box' ? /*#__PURE__*/React.createElement(Row, {
          justify: "space-around",
          align: "middle",
          className: classNames(styles.imageItem, loadingEffect && !showOverlay ? !loadSuccess ? styles.imageLoadAnimationInit : styles.imageLoadAnimation : ''),
          style: imageBoxStyle
        }, /*#__PURE__*/React.createElement(Col, {
          style: fillHeight ? {
            height: '100%',
            width: '100%'
          } : {
            width: '100%'
          }
        }, /*#__PURE__*/React.createElement(Image, {
          className: fillHeight ? styles.fullHeight : null,
          style: imageLoadSuccess && !stringIsNullOrWhiteSpace(src) && preview ? {
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
        return /*#__PURE__*/React.createElement("div", {
          style: imageBoxStyle
        }, /*#__PURE__*/React.createElement("div", {
          className: fillHeight ? styles.fullHeight : null
        }, /*#__PURE__*/React.createElement(Image, {
          className: styles.contentImage,
          width: "100%",
          style: imageLoadSuccess && !stringIsNullOrWhiteSpace(src) && preview ? {
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
      aspectRatioVerify = aspectRatioVerify <= 0 ? 1 : aspectRatioVerify;

      // eslint-disable-next-line no-constant-condition
      var borderRadiusDefaultStyle = borderRadiusValue ? {
        borderRadius: '4px'
      } : {};
      var circle = circleValue || false;
      if (circle) {
        borderRadiusDefaultStyle.borderRadius = '50%';
      }
      if (trim(replace(imageSrc || '', ' ', '')) === '') {
        imageSrc = defaultEmptyImage;
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
}(CustomBase);
ImageBox.defaultProps = {
  fillHeight: true,
  preview: false,
  previewSimpleMask: false
};

export { ImageBox as default };
