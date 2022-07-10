import { Col, Image, Row, Spin } from 'antd';
import classNames from 'classnames';
import React from 'react';
import {
  EyeOutlined,
  LoadingOutlined,
  PictureOutlined,
} from '@ant-design/icons';

import CustomBase from '../../framework/CustomBase';
import { defaultEmptyImage } from '../../utils/constants';
import {
  isFunction,
  replace,
  stringIsNullOrWhiteSpace,
  trim,
} from '../../utils/tools';
import IconInfo from '../IconInfo';

import styles from './index.less';

class ImageBox extends CustomBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
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
        showErrorIcon: true,
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      src,
      aspectRatio,
      imageBoxStyle,
      borderRadius: borderRadiusValue,
      showMode: showModeValue,
      circle: circleValue,
      backgroundColor: backgroundColorValue,
      showOverlay: showOverlayValue,
      overlayText: overlayTextValue,
      loadingEffect: loadingEffectValue,
      errorOverlayVisible: errorOverlayVisibleValue,
      errorOverlayText: errorOverlayTextValue,
      showErrorIcon: showErrorIconValue,
    } = nextProps;

    let imageSrc = src || '';

    let aspectRatioVerify = aspectRatio || 1;

    const showOverlay = showOverlayValue || false;

    const showErrorIcon = showErrorIconValue && true;

    const errorOverlayVisible = errorOverlayVisibleValue || false;

    const errorOverlayText = errorOverlayTextValue || '加载失败';

    const loadingEffect = loadingEffectValue || false;

    const overlayText = overlayTextValue || '';

    aspectRatioVerify = aspectRatioVerify <= 0 ? 1 : aspectRatioVerify;

    // eslint-disable-next-line no-constant-condition
    const borderRadiusDefaultStyle = borderRadiusValue
      ? { borderRadius: '4px' }
      : {};

    const circle = circleValue || false;

    if (circle) {
      borderRadiusDefaultStyle.borderRadius = '50%';
    }

    if (trim(replace(imageSrc || '', ' ', '')) === '') {
      imageSrc = defaultEmptyImage;
    }

    const imageBoxStyleMerge = {
      ...imageBoxStyle,
      ...borderRadiusDefaultStyle,
      // ...(hide ? { display: "none" } : {})
    };

    const backgroundColor =
      (backgroundColorValue || null) == null
        ? {}
        : { backgroundColor: backgroundColorValue };

    const showMode = showModeValue || 'box';

    const result = {
      src: imageSrc,
      aspectRatio: aspectRatioVerify,
      showOverlay,
      loadingEffect,
      overlayText,
      borderRadiusDefaultStyle,
      circle,
      backgroundColor,
      showMode,
      imageBoxStyle: imageBoxStyleMerge,
      errorOverlayVisible,
      errorOverlayText,
      showErrorIcon,
    };

    const { src: srcPre, showErrorOverlay } = prevState;

    return {
      ...result,
      ...{ showErrorOverlay: srcPre === imageSrc ? showErrorOverlay : false },
    };
  }

  onImageLoadSuccess() {
    const { showOverlay: showOverlayValue, loadingEffect: loadingEffectValue } =
      this.props;

    const showOverlay = showOverlayValue || false;

    const loadingEffect = loadingEffectValue || false;

    if (loadingEffect && !showOverlay) {
      this.setState({
        loadSuccess: true,
        imageLoadSuccess: true,
      });
    }
  }

  onImageError() {
    const { hideWhenLoadError } = this.props;
    const { hide, errorOverlayVisible } = this.state;

    this.setState({
      hide: hideWhenLoadError ? true : hide,
      showErrorOverlay: errorOverlayVisible,
      loadSuccess: true,
      imageLoadSuccess: false,
    });
  }

  onImageClick() {
    const { clickAction } = this.props;

    if (isFunction(clickAction)) {
      clickAction();
    }
  }

  render() {
    const { fillHeight, preview, previewSimpleMask } = this.props;

    const {
      src,
      aspectRatio,
      imageBoxStyle,
      showMode,
      showOverlay,
      overlayText,
      loadingEffect,
      hide,
      loadSuccess,
      imageLoadSuccess,
      showErrorOverlay,
      errorOverlayText,
      showErrorIcon,
    } = this.state;

    if (hide) {
      return null;
    }

    const previewConfig =
      imageLoadSuccess && !stringIsNullOrWhiteSpace(src) && preview
        ? previewSimpleMask
          ? {
              mask: React.createElement(
                'div',
                {},
                React.createElement(EyeOutlined, null),
              ),
            }
          : true
        : false;

    if (showMode === 'loading' || showMode === 'box') {
      return (
        <div className={styles.imageBox} style={{ ...imageBoxStyle }}>
          {aspectRatio === 1 ? <div className={styles.placeholderBox} /> : null}

          {aspectRatio !== 1 ? (
            <div
              className={styles.placeholderBox}
              style={{ marginTop: `${aspectRatio * 100}%` }}
            />
          ) : null}

          {showOverlay ? (
            <div
              className={classNames(
                styles.overlayBox,
                styles.overlayTextBackground,
              )}
            >
              <Row
                type="flex"
                align="middle"
                justify="center"
                className={styles.overlayTextInner}
              >
                <Col>
                  <div className={styles.overlayText}>{overlayText}</div>
                </Col>
              </Row>
            </div>
          ) : null}

          {showMode === 'loading' ? (
            <div>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
              />
            </div>
          ) : null}

          {loadingEffect && !loadSuccess && !showOverlay ? (
            <div
              className={classNames(styles.overlayBox, styles.overlayLoading)}
            >
              <Row
                justify="space-around"
                align="middle"
                style={{ height: '100%' }}
              >
                <Col flex="auto" />
                <Col>
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 18 }} spin />
                    }
                  />
                </Col>
                <Col flex="auto" />
              </Row>
            </div>
          ) : null}

          {showErrorOverlay ? (
            <div
              className={classNames(
                styles.overlayBox,
                styles.overlayErrorBackground,
              )}
            >
              <Row
                justify="space-around"
                align="middle"
                style={{ height: '100%' }}
              >
                <Col flex="auto" />
                <Col>
                  {showErrorIcon ? (
                    <IconInfo
                      direction="vertical"
                      icon={<PictureOutlined className={styles.overlayIcon} />}
                      text={
                        <span className={styles.overlayText}>
                          {errorOverlayText}
                        </span>
                      }
                    />
                  ) : (
                    <span className={styles.overlayText}>
                      {errorOverlayText}
                    </span>
                  )}
                </Col>
                <Col flex="auto" />
              </Row>
              {/* <Row type="flex" align="middle" justify="center" className={styles.overlayTextInner}>
                <Col>
                  <IconInfo
                    direction="vertical"
                    icon={iconCollection.picture}
                    text={<div className={styles.overlayText}>{errorOverlayText}</div>}
                  />
                </Col>
              </Row> */}
            </div>
          ) : null}

          {showMode === 'box' ? (
            <Row
              justify="space-around"
              align="middle"
              className={classNames(
                styles.imageItem,
                loadingEffect && !showOverlay
                  ? !loadSuccess
                    ? styles.imageLoadAnimationInit
                    : styles.imageLoadAnimation
                  : '',
              )}
              style={imageBoxStyle}
            >
              <Col
                style={
                  fillHeight
                    ? { height: '100%', width: '100%' }
                    : { width: '100%' }
                }
              >
                <Image
                  className={fillHeight ? styles.fullHeight : null}
                  style={
                    imageLoadSuccess &&
                    !stringIsNullOrWhiteSpace(src) &&
                    preview
                      ? { cursor: 'pointer' }
                      : {}
                  }
                  width="100%"
                  height={fillHeight ? '100%' : null}
                  src={src}
                  onLoad={() => {
                    this.onImageLoadSuccess();
                  }}
                  onError={() => {
                    this.onImageError();
                  }}
                  onClick={() => {
                    this.onImageClick();
                  }}
                  alt=""
                  preview={previewConfig}
                />
              </Col>
            </Row>
          ) : null}
        </div>
      );
    }
    if (showMode === 'contentImage') {
      return (
        <div style={imageBoxStyle}>
          <div className={fillHeight ? styles.fullHeight : null}>
            <Image
              className={styles.contentImage}
              width="100%"
              style={
                imageLoadSuccess && !stringIsNullOrWhiteSpace(src) && preview
                  ? { cursor: 'pointer' }
                  : {}
              }
              src={src}
              onError={this.onImageError}
              onClick={this.onImageClick}
              alt=""
              preview={previewConfig}
            />
          </div>
        </div>
      );
    }

    return null;
  }
}

ImageBox.defaultProps = {
  fillHeight: true,
  preview: false,
  previewSimpleMask: false,
};

export default ImageBox;
