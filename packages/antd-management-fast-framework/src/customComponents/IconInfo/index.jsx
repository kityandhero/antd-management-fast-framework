import React, { PureComponent } from 'react';
import { Row, Col, Tooltip } from 'antd';

import { stringIsNullOrWhiteSpace, copyToClipboard } from '../../utils/tools';

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
  textPrefix: null,
  canCopy: false,
  text: '',
};

class IconInfo extends PureComponent {
  copyText = () => {
    const { canCopy, text } = this.props;

    if (canCopy && !stringIsNullOrWhiteSpace(text)) {
      copyToClipboard(text);
    }
  };

  render() {
    const {
      direction: directionValue,
      responsive: responsiveValue,
      tooltip: tooltipValue,
      ellipsis: ellipsisValue,
      text,
      textPrefix,
      icon,
      iconPosition,
      iconTooltip,
      onClick,
      canCopy,
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

    if (direction === 'horizontal') {
      return (
        <>
          <div className={styles.containor} onClick={onClick}>
            {responsive ? (
              (iconItem || null) == null ? (
                <Row gutter={8}>
                  <Col
                    style={canCopy ? { cursor: 'pointer' } : {}}
                    onClick={() => {
                      this.copyText();
                    }}
                  >
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {stringIsNullOrWhiteSpace(textPrefix)
                          ? null
                          : `${textPrefix}：`}{' '}
                        {text}
                      </Ellipsis>
                    ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                      text
                    ) : (
                      `${textPrefix}：${text}`
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
                    style={canCopy ? { cursor: 'pointer' } : {}}
                    onClick={() => {
                      this.copyText();
                    }}
                  >
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {stringIsNullOrWhiteSpace(textPrefix)
                          ? null
                          : `${textPrefix}：`}{' '}
                        {text}
                      </Ellipsis>
                    ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                      text
                    ) : (
                      `${textPrefix}：${text}`
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
                  style={canCopy ? { cursor: 'pointer' } : {}}
                  onClick={() => {
                    this.copyText();
                  }}
                >
                  {ellipsis ? (
                    <Ellipsis tooltip={tooltip} lines={1}>
                      {stringIsNullOrWhiteSpace(textPrefix)
                        ? null
                        : `${textPrefix}：`}{' '}
                      {text}
                    </Ellipsis>
                  ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                    text
                  ) : (
                    `${textPrefix}：${text}`
                  )}
                </Col>
              </Row>
            ) : (
              <Row gutter={8}>
                {iconPosition === 'left' ? (
                  <Col flex="auto">
                    {stringIsNullOrWhiteSpace(iconTooltip) ? (
                      iconItem
                    ) : (
                      <Tooltip title={iconTooltip}>{iconItem}</Tooltip>
                    )}
                  </Col>
                ) : null}

                <Col
                  style={canCopy ? { cursor: 'pointer' } : {}}
                  onClick={() => {
                    this.copyText();
                  }}
                >
                  {ellipsis ? (
                    <Ellipsis tooltip={tooltip} lines={1}>
                      {stringIsNullOrWhiteSpace(textPrefix)
                        ? null
                        : `${textPrefix}：`}{' '}
                      {text}
                    </Ellipsis>
                  ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                    text
                  ) : (
                    `${textPrefix}：${text}`
                  )}
                </Col>

                {iconPosition !== 'left' ? (
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
                      style={canCopy ? { cursor: 'pointer' } : {}}
                      onClick={() => {
                        this.copyText();
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
                    style={canCopy ? { cursor: 'pointer' } : {}}
                    onClick={() => {
                      this.copyText();
                    }}
                  >
                    {ellipsis ? (
                      <Ellipsis tooltip={tooltip} lines={1}>
                        {stringIsNullOrWhiteSpace(textPrefix)
                          ? null
                          : `${textPrefix}：`}{' '}
                        {text}
                      </Ellipsis>
                    ) : stringIsNullOrWhiteSpace(textPrefix) ? (
                      text
                    ) : (
                      `${textPrefix}：${text}`
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
