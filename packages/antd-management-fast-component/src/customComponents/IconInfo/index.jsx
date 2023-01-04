import { Col, Row, Tooltip } from 'antd';
import React, { PureComponent } from 'react';

import {
  copyToClipboard,
  isFunction,
  isObject,
  isString,
  stringIsNullOrWhiteSpace,
  toNumber,
} from 'antd-management-fast-common/es/utils/tools';

import Ellipsis from '../Ellipsis';

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

    if (canCopy && !stringIsNullOrWhiteSpace(copyData || text)) {
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
    } = { ...defaultValue, ...(this.props || {}) };

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
      ...(styleSource || {}),
      ...(canCopy || isFunction(onClick) ? { cursor: 'pointer' } : {}),
    };

    let textMerge = null;
    let tooltipTitle = null;
    let textAfterFormat = isFunction(textFormat || null)
      ? textFormat(text)
      : text;

    const textAfterFormatForShow = !isObject(textStyle) ? (
      textAfterFormat || ''
    ) : (
      <span style={textStyle}>{textAfterFormat || ''}</span>
    );

    const textAfterFormatForTooltip = !isObject(textStyle) ? (
      text || ''
    ) : (
      <span style={textStyle}>{text || ''}</span>
    );

    if (stringIsNullOrWhiteSpace(textPrefix)) {
      textMerge = textAfterFormatForShow;

      tooltipTitle = textAfterFormatForTooltip;
    } else {
      const textPrefixAdjust = !isObject(textPrefixStyle) ? (
        textPrefix || ''
      ) : (
        <span style={textPrefixStyle}>{textPrefix || ''}</span>
      );

      const separatorAdjust = stringIsNullOrWhiteSpace(separator) ? (
        ''
      ) : !isObject(separatorStyle) ? (
        separator || '：'
      ) : (
        <span style={separatorStyle}>{separator || '：'}</span>
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
                      {stringIsNullOrWhiteSpace(iconTooltip) ? (
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

                  {iconPosition !== 'left' ? (
                    <Col xl={4} lg={6} md={8} sm={24} xs={24}>
                      {stringIsNullOrWhiteSpace(iconTooltip) ? (
                        iconItem
                      ) : (
                        <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                      )}
                    </Col>
                  ) : null}
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
                {stringIsNullOrWhiteSpace(textMerge) ? (
                  <Col>
                    {stringIsNullOrWhiteSpace(iconTooltip) ? (
                      iconItem
                    ) : (
                      <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                    )}
                  </Col>
                ) : null}

                {!stringIsNullOrWhiteSpace(textMerge) &&
                iconPosition === 'left' ? (
                  <Col flex="auto">
                    {stringIsNullOrWhiteSpace(iconTooltip) ? (
                      iconItem
                    ) : (
                      <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                    )}
                  </Col>
                ) : null}

                {!stringIsNullOrWhiteSpace(textMerge) ? (
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
                ) : null}

                {!stringIsNullOrWhiteSpace(textMerge) &&
                iconPosition !== 'left' ? (
                  <Col flex="auto">
                    {stringIsNullOrWhiteSpace(iconTooltip) ? (
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
                      {stringIsNullOrWhiteSpace(iconTooltip) ? (
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

export default IconInfo;
