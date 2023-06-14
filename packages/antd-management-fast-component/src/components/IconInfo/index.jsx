import { Col, Row, Tooltip, Typography } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isObject,
  isString,
  toNumber,
} from 'easy-soft-utility';

import { copyToClipboard } from 'antd-management-fast-common';

import { BaseComponent } from '../../bases';
import { VerticalBox } from '../VerticalBox';

const { Text } = Typography;

class IconInfo extends BaseComponent {
  copyDataToClipboard = () => {
    const { canCopy, text, copyData } = this.props;

    if (canCopy && !checkStringIsNullOrWhiteSpace(copyData || text)) {
      copyToClipboard(copyData || text);
    }
  };

  getStyle = () => {
    const { block } = this.props;

    return {
      display: block ? 'block' : 'inline-block',
      ...(block ? { width: '100%' } : {}),
    };
  };

  render() {
    const {
      direction: directionValue,
      responsive: responsiveValue,
      tooltip: tooltipValue,
      tooltipColor,
      tooltipPlacement,
      ellipsis: ellipsisValue,
      textPrefix,
      textPrefixStyle,
      text,
      textStyle,
      textFormat,
      separator,
      separatorStyle,
      icon,
      iconPosition,
      iconTooltip,
      onClick,
      canCopy,
      style: styleSource,
      iconStyle: iconStyleSource,
      ellipsisMaxWidth: ellipsisMaxWidthSource,
    } = this.props;

    const responsive = responsiveValue || false;
    const tooltip = tooltipValue || false;
    const ellipsis = ellipsisValue || false;

    const styleContainer = this.getStyle();

    const iconItem =
      (icon || null) == null ? null : (
        <span style={iconStyleSource}>{icon}</span>
      );

    let direction = directionValue || 'horizontal';

    if (direction !== 'horizontal' && direction !== 'vertical') {
      direction = 'horizontal';
    }

    let ellipsisMaxWidth = toNumber(ellipsisMaxWidthSource);

    ellipsisMaxWidth = ellipsisMaxWidth <= 0 ? 0 : ellipsisMaxWidth;

    const styleMerge = {
      ...styleSource,
      ...(canCopy || isFunction(onClick) ? { cursor: 'pointer' } : {}),
    };

    let textMerge = null;
    let tooltipTitle = null;
    let textAfterFormat = isString(text)
      ? isFunction(textFormat || null)
        ? textFormat(text)
        : text
      : text;

    // const textAfterFormatForShow = isObject(textStyle) ? (
    //   <Text style={{ ...styleMerge, ...textStyle, flex: 'auto' }}>
    //     {textAfterFormat || ''}
    //   </Text>
    // ) : (
    //   textAfterFormat || ''
    // );

    const textAfterFormatForShow = isString(textAfterFormat) ? (
      <Text
        style={{ ...styleMerge, ...textStyle, flex: 'auto' }}
        ellipsis={ellipsis}
      >
        {textAfterFormat || ''}
      </Text>
    ) : (
      textAfterFormat
    );

    const textAfterFormatForTooltip = isObject(textStyle) ? (
      <Text style={{ ...styleMerge, ...textStyle }}>{text || ''}</Text>
    ) : (
      text || ''
    );

    if (checkStringIsNullOrWhiteSpace(textPrefix)) {
      textMerge = textAfterFormatForShow;

      tooltipTitle = textAfterFormatForTooltip;
    } else {
      // const textPrefixAdjust = isObject(textPrefixStyle) ? (
      //   <Text style={{ ...styleMerge, ...textPrefixStyle, flex: 'auto' }}>
      //     {textPrefix || ''}
      //   </Text>
      // ) : (
      //   textPrefix || ''
      // );

      const textPrefixAdjust = (
        <Text style={{ ...styleMerge, ...textPrefixStyle, flex: 'auto' }}>
          {textPrefix || ''}
        </Text>
      );

      // const separatorAdjust = checkStringIsNullOrWhiteSpace(separator) ? (
      //   ''
      // ) : isObject(separatorStyle) ? (
      //   <Text style={{ ...styleMerge, ...separatorStyle }}>
      //     {separator || ':'}
      //   </Text>
      // ) : (
      //   separator || ':'
      // );

      const separatorAdjust = checkStringIsNullOrWhiteSpace(separator) ? (
        ''
      ) : (
        <Text style={{ ...styleMerge, ...separatorStyle, flex: 'auto' }}>
          {separator || ':'}
        </Text>
      );

      if (
        isString(textPrefixAdjust) &&
        isString(separatorAdjust) &&
        isString(textAfterFormatForShow)
      ) {
        const t = `${textPrefixAdjust}${separatorAdjust}${textAfterFormatForShow}`;

        textMerge = checkStringIsNullOrWhiteSpace(t) ? null : (
          <Text
            style={styleMerge}
            ellipsis={ellipsis}
          >{`${textPrefixAdjust}${separatorAdjust}${textAfterFormatForShow}`}</Text>
        );

        tooltipTitle = `${textPrefixAdjust}${separatorAdjust}${textAfterFormatForTooltip}`;
      } else {
        textMerge = (
          <>
            {textPrefixAdjust}
            {separatorAdjust}
            {textAfterFormatForShow}
          </>
        );

        tooltipTitle = (
          <>
            {textPrefixAdjust}
            {separatorAdjust}
            {textAfterFormatForTooltip}
          </>
        );
      }
    }

    const textCore = (
      <VerticalBox style={{ width: '100%' }}>{textMerge}</VerticalBox>
    );

    const textArea = tooltip ? (
      <Tooltip
        title={tooltipTitle}
        placement={tooltipPlacement}
        {...(checkStringIsNullOrWhiteSpace(tooltipColor)
          ? {}
          : { color: tooltipPlacement })}
      >
        {textCore}
      </Tooltip>
    ) : (
      textCore
    );

    let innerComponent = null;

    if (direction === 'horizontal') {
      innerComponent = responsive ? (
        (iconItem || null) == null ? (
          <Row gutter={8}>
            <Col
              style={styleMerge}
              onClick={() => {
                this.copyDataToClipboard();
              }}
            >
              {ellipsis ? (
                ellipsisMaxWidth > 0 ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      maxWidth: `${ellipsisMaxWidth}px`,
                    }}
                  >
                    {textArea}
                  </div>
                ) : (
                  textArea
                )
              ) : (
                textMerge
              )}
            </Col>
          </Row>
        ) : (
          <Row gutter={8}>
            {iconPosition === 'left' ? (
              <Col xl={4} lg={6} md={8} sm={24} xs={24}>
                {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                  iconItem
                ) : (
                  <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                )}
              </Col>
            ) : null}

            <Col
              xl={20}
              lg={18}
              md={16}
              sm={24}
              xs={24}
              style={styleMerge}
              onClick={() => {
                this.copyDataToClipboard();
              }}
            >
              {ellipsis ? (
                ellipsisMaxWidth > 0 ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      maxWidth: `${ellipsisMaxWidth}px`,
                    }}
                  >
                    {textArea}
                  </div>
                ) : (
                  textArea
                )
              ) : (
                textMerge
              )}
            </Col>

            {iconPosition === 'left' ? null : (
              <Col xl={4} lg={6} md={8} sm={24} xs={24}>
                {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                  iconItem
                ) : (
                  <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                )}
              </Col>
            )}
          </Row>
        )
      ) : (iconItem || null) == null ? (
        <Row gutter={8}>
          <Col
            style={styleMerge}
            onClick={() => {
              this.copyDataToClipboard();
            }}
          >
            {ellipsis ? (
              ellipsisMaxWidth > 0 ? (
                <div
                  style={{
                    display: 'inline-flex',
                    maxWidth: `${ellipsisMaxWidth}px`,
                  }}
                >
                  {textArea}
                </div>
              ) : (
                textArea
              )
            ) : (
              textMerge
            )}
          </Col>
        </Row>
      ) : (
        <Row gutter={8} wrap={false}>
          {checkStringIsNullOrWhiteSpace(textMerge) ? (
            <Col>
              {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                iconItem
              ) : (
                <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
              )}
            </Col>
          ) : null}

          {!checkStringIsNullOrWhiteSpace(textMerge) &&
          iconPosition === 'left' ? (
            <Col flex="auto">
              {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                iconItem
              ) : (
                <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
              )}
            </Col>
          ) : null}

          {checkStringIsNullOrWhiteSpace(textMerge) ? null : (
            <Col
              style={styleMerge}
              onClick={() => {
                this.copyDataToClipboard();
              }}
            >
              {ellipsis ? (
                ellipsisMaxWidth > 0 ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      maxWidth: `${ellipsisMaxWidth}px`,
                    }}
                  >
                    {textArea}
                  </div>
                ) : (
                  textArea
                )
              ) : (
                textMerge
              )}
            </Col>
          )}

          {!checkStringIsNullOrWhiteSpace(textMerge) &&
          iconPosition !== 'left' ? (
            <Col flex="auto">
              {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                iconItem
              ) : (
                <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
              )}
            </Col>
          ) : null}
        </Row>
      );
    }

    if (direction === 'vertical') {
      innerComponent = (
        <Row justify="center">
          {(iconItem || null) == null ? null : (
            <Col span={24}>
              <Row>
                <Col flex="auto" />
                <Col
                  style={styleMerge}
                  onClick={() => {
                    this.copyDataToClipboard();
                  }}
                >
                  {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                    iconItem
                  ) : (
                    <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                  )}
                </Col>
                <Col flex="auto" />
              </Row>
            </Col>
          )}
          <Col span={24}>
            <Row>
              <Col flex="auto" />
              <Col
                style={styleMerge}
                onClick={() => {
                  this.copyDataToClipboard();
                }}
              >
                {ellipsis ? (
                  ellipsisMaxWidth > 0 ? (
                    <div
                      style={{
                        display: 'inline-flex',
                        maxWidth: `${ellipsisMaxWidth}px`,
                      }}
                    >
                      {textArea}
                    </div>
                  ) : (
                    textArea
                  )
                ) : (
                  textMerge
                )}
              </Col>
              <Col flex="auto" />
            </Row>
          </Col>
        </Row>
      );
    }

    if (innerComponent == null) {
      return null;
    }

    return (
      <div style={styleContainer} onClick={onClick}>
        {tooltip ? (
          <Tooltip
            title={tooltipTitle}
            placement={tooltipPlacement}
            {...(checkStringIsNullOrWhiteSpace(tooltipColor)
              ? {}
              : { color: tooltipPlacement })}
          >
            {innerComponent}
          </Tooltip>
        ) : (
          innerComponent
        )}
      </div>
    );
  }
}

IconInfo.defaultProps = {
  direction: 'horizontal',
  responsive: false,
  block: false,
  tooltip: false,
  tooltipColor: null,
  tooltipPlacement: 'top',
  ellipsis: true,
  icon: null,
  iconPosition: 'left',
  iconTooltip: '',
  canCopy: false,
  copyData: null,
  textPrefix: '',
  textPrefixStyle: null,
  text: '',
  textStyle: null,
  textFormat: null,
  separator: ': ',
  separatorStyle: null,
  style: {},
  iconStyle: {},
  ellipsisMaxWidth: 0,
};

export { IconInfo };
