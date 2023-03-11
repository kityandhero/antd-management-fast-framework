import { Col, Image, Row, Spin } from 'antd';
import Animate from 'rc-animate';
import React from 'react';
import {
  EyeOutlined,
  LoadingOutlined,
  PictureOutlined,
} from '@ant-design/icons';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  replace,
  trim,
} from 'easy-soft-utility';

import { defaultEmptyImage } from 'antd-management-fast-common';

import { BaseComponent } from '../../BasicComponents';
import { IconInfo } from '../IconInfo';

const placeholderBoxStyle = {
  display: 'block',
  marginTop: '100%',
  marginLeft: '100%',
  content: '',
};

const overlayBoxStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '2',
  width: '100%',
  height: '100%',
  opacity: '0.65',
};

const overlayTextBackgroundStyle = {
  background: '#000',
};

const overlayErrorBackgroundStyle = {
  background: 'rgb(71 70 70)',
};

const overlayBoxIconStyle = {
  color: '#fff',
  fontSize: '22px',
};

const overlayBoxTextStyle = {
  color: '#fff',
  fontSize: '12px',
};

const imageItemStyle = {
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '1',
  width: '100%',
  height: '100%',
};

class ImageBox extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,

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
    };
  }

  static getDerivedStateFromProps(nextProperties, previousState) {
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
    } = nextProperties;

    let imageSource = src || '';

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
      ? {
          borderRadius: '4px',
          overflow: 'hidden',
        }
      : {};

    const circle = circleValue || false;

    if (circle) {
      borderRadiusDefaultStyle.borderRadius = '50%';
    }

    if (trim(replace(imageSource || '', ' ', '')) === '') {
      imageSource = defaultEmptyImage;
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
      src: imageSource,
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

    const { src: sourcePre, showErrorOverlay } = previousState;

    return {
      ...result,
      showErrorOverlay: sourcePre === imageSource ? showErrorOverlay : false,
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

  renderFurther() {
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
      imageLoadSuccess && !checkStringIsNullOrWhiteSpace(src) && preview
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
        <div
          style={{
            position: 'relative',
            display: 'block',
            width: '100%',
            overflow: 'hidden',
            ...imageBoxStyle,
          }}
        >
          <Animate transitionName="fade" transitionAppear>
            {aspectRatio === 1 ? (
              <div
                key="aspectRatio_1"
                style={{
                  ...placeholderBoxStyle,
                  ...imageBoxStyle,
                }}
              />
            ) : null}

            {aspectRatio === 1 ? null : (
              <div
                key="aspectRatio_0"
                style={{
                  ...placeholderBoxStyle,

                  marginTop: `${aspectRatio * 100}%`,
                }}
              />
            )}

            {showOverlay ? (
              <div
                key="showOverlay_1"
                style={{
                  ...overlayBoxStyle,
                  ...overlayTextBackgroundStyle,
                }}
              >
                <Row
                  type="flex"
                  align="middle"
                  justify="center"
                  style={{
                    height: '100%',
                  }}
                >
                  <Col>
                    <div style={overlayBoxTextStyle}>{overlayText}</div>
                  </Col>
                </Row>
              </div>
            ) : null}

            {showMode === 'loading' ? (
              <div key="loading_1">
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />}
                />
              </div>
            ) : null}

            {loadingEffect && !loadSuccess && !showOverlay ? (
              <div
                key="loading_2"
                style={{
                  ...overlayBoxStyle,
                }}
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
                key="showErrorOverlay_1"
                style={{
                  ...overlayBoxStyle,
                  ...overlayErrorBackgroundStyle,
                }}
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
                        icon={<PictureOutlined style={overlayBoxIconStyle} />}
                        text={
                          <span style={overlayBoxTextStyle}>
                            {errorOverlayText}
                          </span>
                        }
                      />
                    ) : (
                      <span style={overlayBoxTextStyle}>
                        {errorOverlayText}
                      </span>
                    )}
                  </Col>
                  <Col flex="auto" />
                </Row>
              </div>
            ) : null}

            {showMode === 'box' ? (
              <Row
                key="box_1"
                justify="space-around"
                align="middle"
                style={{
                  ...imageItemStyle,
                  ...(loadingEffect && !showOverlay
                    ? loadSuccess
                      ? {
                          opacity: '1',
                          transform: 'opacity 300ms',
                        }
                      : {
                          opacity: '0.01',
                        }
                    : {}),
                  ...imageBoxStyle,
                }}
              >
                <Col
                  style={
                    fillHeight
                      ? { height: '100%', width: '100%' }
                      : { width: '100%' }
                  }
                >
                  <Image
                    style={
                      imageLoadSuccess &&
                      !checkStringIsNullOrWhiteSpace(src) &&
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
          </Animate>
        </div>
      );
    }

    if (showMode === 'contentImage') {
      return (
        <div style={imageBoxStyle}>
          <div>
            <Image
              width="100%"
              style={{
                ...(imageLoadSuccess &&
                !checkStringIsNullOrWhiteSpace(src) &&
                preview
                  ? { cursor: 'pointer' }
                  : {}),

                display: 'block',
                width: '100%',
              }}
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

export { ImageBox };
