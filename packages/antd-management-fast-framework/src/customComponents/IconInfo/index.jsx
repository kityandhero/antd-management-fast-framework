import React, { PureComponent } from 'react';
import { Row, Col, Tooltip } from 'antd';

import {
  stringIsNullOrWhiteSpace,
  copyToClipboard,
  toNumber,
  isObject,
  isFunction,
  isString,
} from '../../utils/tools';

import Ellipsis from '../Ellipsis';

import styles from './index.less';

const defaultValue = {
  direction: 'horizontal',
  responsive: false,
  tooltip: false,
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
  separator: '：',
  separatorStyle: null,
  style: null,
  ellipsisWidth: 0,
};

class IconInfo extends PureComponent {
  copyDataToClipboard = () => {
    const { canCopy, text, copyData } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(copyData || text)) {
      copyToClipboard(copyData || text);
    }
  };

  render() {
    const {
      direction: directionValue,
      responsive: responsiveValue,
      tooltip: tooltipValue,
      ellipsis: ellipsisValue,
      textPrefix,
      textPrefixStyle,
      text,
      textStyle,
      separator,
      separatorStyle,
      icon,
      iconPosition,
      iconTooltip,
      onClick,
      canCopy,
      style: styleSource,
      ellipsisWidth: ellipsisWidthSource,
    } = { ...defaultValue, ...(this.props || {}) };

    const responsive = responsiveValue || false;
    const tooltip = tooltipValue || false;
    const ellipsis = ellipsisValue || false;

    const iconItem =
      (icon || null) == null ? null : (
        <span className={styles.iconBox}>{icon}</span>
      );

    let direction = directionValue || 'horizontal';

    if (direction !== 'horizontal' && direction !== 'vertical') {
      direction = 'horizontal';
    }

    let ellipsisWidth = toNumber(ellipsisWidthSource);

    ellipsisWidth = ellipsisWidth <= 0 ? 0 : ellipsisWidth;

    const styleMerge = {
      ...(styleSource || {}),
      ...(canCopy || isFunction(onClick) ? { cursor: 'pointer' } : {}),
    };

    let textMerge = null;

    if (stringIsNullOrWhiteSpace(textPrefix)) {
      textMerge = !isObject(textStyle) ? (
        text || ''
      ) : (
        <span style={textStyle}>{text || ''}</span>
      );
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

      const textAdjust = !isObject(textStyle) ? (
        text || ''
      ) : (
        <span style={textStyle}>{text || ''}</span>
      );

      if (
        isString(textPrefixAdjust) &&
        isString(separatorAdjust) &&
        isString(textAdjust)
      ) {
        textMerge = `${textPrefixAdjust}${separatorAdjust}${textAdjust}`;
      } else {
        textMerge = (
          <>
            {textPrefixAdjust}
            {separatorAdjust}
            {textAdjust}
          </>
        );
      }
    }

    if (direction === 'horizontal') {
      return (
        <>
          <div className={styles.containor} onClick={onClick}>
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
                      ellipsisWidth > 0 ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            width: `${ellipsisWidth}px`,
                          }}
                        >
                          <Ellipsis tooltip={tooltip} lines={1}>
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis tooltip={tooltip} lines={1}>
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
                      ellipsisWidth > 0 ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            width: `${ellipsisWidth}px`,
                          }}
                        >
                          <Ellipsis tooltip={tooltip} lines={1}>
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis tooltip={tooltip} lines={1}>
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
                    ellipsisWidth > 0 ? (
                      <div
                        style={{
                          display: 'inline-flex',
                          width: `${ellipsisWidth}px`,
                        }}
                      >
                        <Ellipsis tooltip={tooltip} lines={1}>
                          {textMerge}
                        </Ellipsis>
                      </div>
                    ) : (
                      <Ellipsis tooltip={tooltip} lines={1}>
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
                      ellipsisWidth > 0 ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            width: `${ellipsisWidth}px`,
                          }}
                        >
                          <Ellipsis tooltip={tooltip} lines={1}>
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis tooltip={tooltip} lines={1}>
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
          <div className={styles.containor} onClick={onClick}>
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
                      ellipsisWidth > 0 ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            width: `${ellipsisWidth}px`,
                          }}
                        >
                          <Ellipsis tooltip={tooltip} lines={1}>
                            {textMerge}
                          </Ellipsis>
                        </div>
                      ) : (
                        <Ellipsis tooltip={tooltip} lines={1}>
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
