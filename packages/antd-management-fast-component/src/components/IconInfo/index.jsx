import { Col, Row, Tooltip, Typography } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
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
      ...(block ? {} : { paddingLeft: '4px' }),
      ...(block ? {} : { paddingRight: '4px' }),
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
        <VerticalBox>
          <span style={iconStyleSource}>{icon}</span>
        </VerticalBox>
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

    const tooltipTitle = `${isString(textPrefix) && !checkStringIsNullOrWhiteSpace(textPrefix) ? textPrefix : ''}${isString(textPrefix) && !checkStringIsNullOrWhiteSpace(textPrefix) && isString(separator) && !checkStringIsNullOrWhiteSpace(separator) ? separator : ''}${isString(text) && !checkStringIsNullOrWhiteSpace(text) ? text : ''}`;

    let textAfterFormat = isString(text)
      ? isFunction(textFormat || null)
        ? textFormat(text)
        : text
      : text;

    const textAfterFormatForShow =
      isString(textAfterFormat) &&
      !checkStringIsNullOrWhiteSpace(textAfterFormat) ? (
        <Text
          style={{ ...styleMerge, ...textStyle, flex: 'auto', minWidth: 0 }}
          ellipsis={ellipsis}
        >
          {textAfterFormat || ''}
        </Text>
      ) : (
        textAfterFormat
      );

    if (checkStringIsNullOrWhiteSpace(textPrefix)) {
      textMerge = textAfterFormatForShow;
    } else {
      const textPrefixAdjust = (
        <Text
          style={{
            ...styleMerge,
            ...textPrefixStyle,
            whiteSpace: 'nowrap',
            flex: '0 0 auto',
            minWidth: 0,
          }}
        >
          {textPrefix || ''}
        </Text>
      );

      const separatorAdjust = checkStringIsNullOrWhiteSpace(separator) ? (
        ''
      ) : (
        <Text
          style={{
            ...styleMerge,
            ...separatorStyle,
            whiteSpace: 'nowrap',
            flex: '0 0 auto',
            minWidth: 0,
          }}
        >
          {separator || ':'}
        </Text>
      );

      if (
        isString(textPrefixAdjust) &&
        isString(separatorAdjust) &&
        isString(textAfterFormatForShow)
      ) {
        const t = `${textPrefixAdjust}${separatorAdjust}${textAfterFormatForShow}`;

        if (checkStringIsNullOrWhiteSpace(t)) {
          textMerge = null;
        } else {
          textMerge = checkStringIsNullOrWhiteSpace(t) ? null : (
            <Text
              style={styleMerge}
              ellipsis={ellipsis}
            >{`${textPrefixAdjust}${separatorAdjust}${textAfterFormatForShow}`}</Text>
          );
        }
      } else {
        textMerge = (
          <>
            {textPrefixAdjust}
            {separatorAdjust}
            {textAfterFormatForShow}
          </>
        );
      }
    }

    const textCore =
      textMerge == null ? null : (
        <VerticalBox style={{ width: '100%' }}>{textMerge}</VerticalBox>
      );

    const textArea =
      tooltip && !checkStringIsNullOrWhiteSpace(tooltipTitle) ? (
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
              {ellipsis && textArea != null ? (
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
              {ellipsis && textArea != null ? (
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
            {ellipsis && textArea != null ? (
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
            <Col flex="0 0 auto">
              {checkStringIsNullOrWhiteSpace(iconTooltip) ? (
                iconItem
              ) : (
                <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
              )}
            </Col>
          ) : null}

          {checkStringIsNullOrWhiteSpace(textMerge) ? null : (
            <Col
              flex="1 1 auto"
              style={styleMerge}
              onClick={() => {
                this.copyDataToClipboard();
              }}
            >
              {ellipsis && textArea != null ? (
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
            <Col flex="0 0 auto">
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
                {ellipsis && textArea != null ? (
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
