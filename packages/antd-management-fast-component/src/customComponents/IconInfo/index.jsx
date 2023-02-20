import { Col, Row, Tooltip } from 'antd';
import React, { PureComponent } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isObject,
  isString,
  toNumber,
} from 'easy-soft-utility';

import { copyToClipboard } from 'antd-management-fast-common';

import { Ellipsis } from '../Ellipsis';

const defaultValue = {
  direction: 'horizontal',
  responsive: false,
  tooltip: false,
  tooltipColor: null,
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

class IconInfo extends PureComponent {
  copyDataToClipboard = () => {
    const { canCopy, text, copyData } = this.props;

    if (canCopy && !checkStringIsNullOrWhiteSpace(copyData || text)) {
      copyToClipboard(copyData || text);
    }
  };

  getStyle = () => {
    return {
      display: 'inline-block',
    };
  };

  render() {
    const {
      direction: directionValue,
      responsive: responsiveValue,
      tooltip: tooltipValue,
      tooltipColor,
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
    } = { ...defaultValue, ...this.props };

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
    let textAfterFormat = isFunction(textFormat || null)
      ? textFormat(text)
      : text;

    const textAfterFormatForShow = isObject(textStyle) ? (
      <span style={textStyle}>{textAfterFormat || ''}</span>
    ) : (
      textAfterFormat || ''
    );

    const textAfterFormatForTooltip = isObject(textStyle) ? (
      <span style={textStyle}>{text || ''}</span>
    ) : (
      text || ''
    );

    if (checkStringIsNullOrWhiteSpace(textPrefix)) {
      textMerge = textAfterFormatForShow;

      tooltipTitle = textAfterFormatForTooltip;
    } else {
      const textPrefixAdjust = isObject(textPrefixStyle) ? (
        <span style={textPrefixStyle}>{textPrefix || ''}</span>
      ) : (
        textPrefix || ''
      );

      const separatorAdjust = checkStringIsNullOrWhiteSpace(separator) ? (
        ''
      ) : isObject(separatorStyle) ? (
        <span style={separatorStyle}>{separator || '：'}</span>
      ) : (
        separator || '：'
      );

      if (
        isString(textPrefixAdjust) &&
        isString(separatorAdjust) &&
        isString(textAfterFormatForShow)
      ) {
        textMerge = `${textPrefixAdjust}${separatorAdjust}${textAfterFormatForShow}`;

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

    if (direction === 'horizontal') {
      return (
        <>
          <div style={styleContainer} onClick={onClick}>
            {responsive ? (
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
                          <Ellipsis
                            tooltip={tooltip}
                            lines={1}
                            title={tooltipTitle}
                            color={tooltipColor}
                          >
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis
                          tooltip={tooltip}
                          lines={1}
                          title={tooltipTitle}
                          color={tooltipColor}
                        >
                          {textMerge}
                        </Ellipsis>
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
                          <Ellipsis
                            tooltip={tooltip}
                            lines={1}
                            title={tooltipTitle}
                            color={tooltipColor}
                          >
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis
                          tooltip={tooltip}
                          lines={1}
                          title={tooltipTitle}
                          color={tooltipColor}
                        >
                          {textMerge}
                        </Ellipsis>
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
                        <Ellipsis
                          tooltip={tooltip}
                          lines={1}
                          title={tooltipTitle}
                          color={tooltipColor}
                        >
                          {textMerge}
                        </Ellipsis>
                      </div>
                    ) : (
                      <Ellipsis
                        tooltip={tooltip}
                        lines={1}
                        title={tooltipTitle}
                        color={tooltipColor}
                      >
                        {textMerge}
                      </Ellipsis>
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
                          <Ellipsis
                            tooltip={tooltip}
                            lines={1}
                            title={tooltipTitle}
                            color={tooltipColor}
                          >
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis
                          tooltip={tooltip}
                          lines={1}
                          title={tooltipTitle}
                          color={tooltipColor}
                        >
                          {textMerge}
                        </Ellipsis>
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
            )}
          </div>
        </>
      );
    }

    if (direction === 'vertical') {
      return (
        <>
          <div style={styleContainer} onClick={onClick}>
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
                          <Ellipsis
                            tooltip={tooltip}
                            lines={1}
                            title={tooltipTitle}
                            color={tooltipColor}
                          >
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis
                          tooltip={tooltip}
                          lines={1}
                          title={tooltipTitle}
                          color={tooltipColor}
                        >
                          {textMerge}
                        </Ellipsis>
                      )
                    ) : (
                      textMerge
                    )}
                  </Col>
                  <Col flex="auto" />
                </Row>
              </Col>
            </Row>
          </div>
        </>
      );
    }

    return null;
  }
}

IconInfo.defaultProps = defaultValue;

export { IconInfo };
