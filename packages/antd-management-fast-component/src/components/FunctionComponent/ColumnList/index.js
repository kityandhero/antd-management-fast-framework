import { Badge, Col, Row } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  formatMoney,
  isArray,
  isFunction,
  logError,
  replaceWithKeep,
  showSimpleRuntimeError,
  stringifyJson,
} from 'easy-soft-utility';

import {
  columnFacadeMode,
  copyToClipboard,
  defaultEmptyImage,
} from 'antd-management-fast-common';

import { AnchorLink } from '../../AnchorLink';
import { CenterBox } from '../../CenterBox';
import { ElasticityDropdown } from '../../ElasticityDropdown';
import { EllipsisCustom } from '../../EllipsisCustom';
import { FlexBox } from '../../FlexBox';
import { iconBuilder } from '../../Icon';
import { IconInfo } from '../../IconInfo';
import { ImageBox } from '../../ImageBox';

export function buildColumnItem({
  column: columnConfig,
  attachedTargetName = '',
}) {
  const d = { ...columnConfig };

  const { dataTarget, showHelper, placeholder } = {
    showHelper: false,
    placeholder: false,
    ellipsis: true,
    ...columnConfig,
  };

  if (placeholder || false) {
    return d;
  }

  if ((dataTarget || null) == null) {
    const text = `错误的列配置, 缺少dataTarget:${stringifyJson(
      checkStringIsNullOrWhiteSpace(attachedTargetName)
        ? {
            column: columnConfig,
          }
        : {
            el: attachedTargetName,
            column: columnConfig,
          },
    )}`;

    showSimpleRuntimeError(text);

    logError(text);
  } else {
    const { label, name, helper } = dataTarget;

    if ((label || null) == null || (name || null) == null) {
      const text = `错误的列配置, dataTarget内容缺失:${stringifyJson(
        checkStringIsNullOrWhiteSpace(attachedTargetName)
          ? {
              column: columnConfig,
            }
          : {
              el: attachedTargetName,
              column: columnConfig,
            },
      )}`;

      showSimpleRuntimeError(text);

      logError(text);
    } else {
      d.title = showHelper ? (
        <IconInfo
          icon={iconBuilder.infoCircle()}
          iconPosition="right"
          iconTooltip={helper}
          text={label}
        />
      ) : (
        label
      );
      d.dataIndex = name;
    }
  }

  const {
    align,
    showRichFacade,
    facadeMode: facadeModeSource,
    facadeModeBuilder,
    facadeConfig: facadeConfigSource,
    facadeConfigBuilder,
    sorter,
  } = {
    align: 'center',
    showRichFacade: false,
    facadeMode: null,
    facadeModeBuilder: null,
    facadeConfig: {},
    facadeConfigBuilder: () => {},
    sorter: false,
    ...d,
  };

  d.align = align;
  d.sorter = sorter;

  if (!isFunction(d.render) && showRichFacade) {
    const { canCopy, copyPrompt, emptyValue } = {
      canCopy: false,
      copyPrompt: '[点击复制]',
      emptyValue: null,
      ...d,
    };

    let tooltipPlacement = 'top';

    if (align === 'left') {
      tooltipPlacement = 'topLeft';
    }

    if (align === 'right') {
      tooltipPlacement = 'topRight';
    }

    d.render = (value, record, index) => {
      let v = value;

      let facadeMode = facadeModeSource || '';

      if (isFunction(facadeModeBuilder)) {
        facadeMode = facadeModeBuilder(value, record, index) || facadeMode;

        facadeMode = checkStringIsNullOrWhiteSpace(facadeMode)
          ? ''
          : facadeMode;
      }

      let facadeConfig = facadeConfigSource || {};

      if (isFunction(facadeConfigBuilder)) {
        facadeConfig = {
          ...facadeConfig,
          ...facadeConfigBuilder(value, record, index),
        };
      }

      const {
        color,
        valPrefix,
        valPrefixStyle,
        valStyle,
        separator,
        separatorStyle,
        icon,
        iconStyle,
        iconPosition,
        addonAfter,
        addonBefore,
        datetimeFormat: datetimeFormatValue,
        status,
        text,
        showTooltip,
        onClick,
      } = {
        color: null,
        valPrefix: '',
        valPrefixStyle: null,
        valStyle: null,
        separator: ':',
        separatorStyle: null,
        icon: null,
        iconStyle: null,
        iconPosition: 'left',
        addonAfter: null,
        addonBefore: null,
        datetimeFormat: datetimeFormat.yearMonthDayHourMinuteSecond,
        status: 'default',
        text: '',
        onClick: null,
        showTooltip: true,
        ...facadeConfig,
      };

      let styleMerge = {};

      if (
        checkStringIsNullOrWhiteSpace(facadeMode) ||
        facadeMode === columnFacadeMode.ellipsis
      ) {
        if (isFunction(d.formatValue)) {
          v = d.formatValue(value, record, index);
        }

        if (checkStringIsNullOrWhiteSpace(v)) {
          return emptyValue;
        }

        styleMerge = {
          ...styleMerge,
          ...((color || null) == null ? {} : { color }),
        };

        if (canCopy) {
          return (
            <>
              <EllipsisCustom
                style={styleMerge}
                tooltip={{ placement: tooltipPlacement }}
                lines={1}
                removeChildren
                extraContent={
                  <>
                    <AnchorLink
                      style={{ width: '100%' }}
                      onClick={() => {
                        copyToClipboard(v);
                      }}
                    >
                      {replaceWithKeep(v, '***', 2, 6)}
                    </AnchorLink>
                  </>
                }
              >
                {v || emptyValue} {copyPrompt || '[点击复制]'}
              </EllipsisCustom>
            </>
          );
        }

        const component = (
          <Row gutter={8} wrap={false}>
            {(addonBefore || null) == null ? null : (
              <Col flex="0 0 auto">{addonBefore}</Col>
            )}

            <Col flex="1 1 auto">
              <IconInfo
                block
                icon={icon || null}
                iconStyle={iconStyle}
                iconPosition={iconPosition || 'left'}
                text={v || emptyValue}
                textStyle={valStyle || null}
                textPrefix={valPrefix}
                textPrefixStyle={valPrefixStyle || null}
                separator={separator || ''}
                separatorStyle={separatorStyle || null}
                style={styleMerge}
                tooltip={showTooltip}
                tooltipPlacement={tooltipPlacement}
                ellipsis
                onClick={() => {
                  if (!isFunction(onClick)) {
                    return;
                  }

                  onClick(value, record, index);
                }}
              />
            </Col>

            {(addonAfter || null) == null ? null : (
              <Col flex="0 0 auto">{addonAfter}</Col>
            )}
          </Row>
        );

        return align === 'center' ? (
          <CenterBox>{component}</CenterBox>
        ) : (
          component
        );
      }

      if (facadeMode === columnFacadeMode.datetime) {
        styleMerge = {
          ...styleMerge,
          ...((color || null) == null ? {} : { color }),
        };

        v = checkStringIsNullOrWhiteSpace(v)
          ? ''
          : formatDatetime({
              data: v,
              format: datetimeFormatValue,
            }) || '';

        return (
          <>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon || null}
              iconPosition={iconPosition || 'left'}
              text={v || emptyValue}
              textStyle={valStyle || null}
              textPrefix={valPrefix}
              textPrefixStyle={valPrefixStyle || null}
              separator={separator || ''}
              separatorStyle={separatorStyle || null}
              style={styleMerge}
              tooltip={showTooltip}
              tooltipPlacement={tooltipPlacement}
              ellipsis
            />

            {(addonAfter || null) == null ? null : addonAfter}
          </>
        );
      }

      if (facadeMode === columnFacadeMode.color) {
        v = checkStringIsNullOrWhiteSpace(v) ? '' : v;

        return (
          <>
            <div style={styleMerge}>
              <FlexBox
                flexAuto="right"
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  padding: '2px',
                }}
                left={
                  <CenterBox>
                    <div
                      style={{
                        backgroundColor: v,
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        width: '20px',
                        height: '20px',
                        overflow: 'hidden',
                      }}
                    />
                  </CenterBox>
                }
                right={<CenterBox>{v || '无色值'}</CenterBox>}
              />
            </div>
          </>
        );
      }

      if (facadeMode === columnFacadeMode.money) {
        styleMerge = {
          ...styleMerge,
          ...((color || null) == null ? {} : { color }),
        };

        v = checkStringIsNullOrWhiteSpace(v) ? '' : v;

        return (
          <>
            {(addonBefore || null) == null ? null : addonBefore}

            <IconInfo
              icon={icon || null}
              iconPosition={iconPosition || 'left'}
              text={formatMoney(v) || emptyValue}
              textStyle={valStyle || null}
              textPrefix={valPrefix}
              textPrefixStyle={valPrefixStyle || null}
              separator={separator || ''}
              separatorStyle={separatorStyle || null}
              style={styleMerge}
              tooltip={showTooltip}
              tooltipPlacement={tooltipPlacement}
              ellipsis
            />

            {(addonAfter || null) == null ? null : addonAfter}
          </>
        );
      }

      if (facadeMode === columnFacadeMode.image) {
        if (isFunction(d.formatValue)) {
          v = d.formatValue(value, record, index);
        }

        const { imageWidth, borderRadius, circle, previewSimpleMask } = {
          imageWidth: '30px',
          circle: true,
          borderRadius: '3px',

          previewSimpleMask: true,
          ...facadeConfig,
        };

        return (
          <>
            <Row>
              <Col flex="auto" />
              <Col>
                <div
                  style={{
                    width: imageWidth,
                    overflow: 'hidden',
                    ...(circle ? {} : { borderRadius }),
                  }}
                >
                  <ImageBox
                    src={v || defaultEmptyImage}
                    circle={circle}
                    loadingEffect
                    errorOverlayVisible
                    showErrorIcon={false}
                    alt=""
                    preview={!checkStringIsNullOrWhiteSpace(v)}
                    previewSimpleMask={previewSimpleMask}
                  />
                </div>
              </Col>
              <Col flex="auto" />
            </Row>
          </>
        );
      }

      if (facadeMode === columnFacadeMode.badge) {
        if (isFunction(d.formatValue)) {
          v = d.formatValue(value, record, index);
        }

        return (
          <>
            <Badge status={status} text={text} />
          </>
        );
      }

      if (facadeMode === columnFacadeMode.dropdown) {
        if (!isFunction(d.configBuilder)) {
          return null;
        }

        const operateConfig = d.configBuilder(value, record, index);

        return (operateConfig || null) == null ? null : (
          <ElasticityDropdown {...operateConfig} />
        );
      }

      throw new Error(`无效的渲染模式:${facadeMode}`);
    };
  }

  return d;
}

export function buildColumnList({ columnList, attachedTargetName = '' }) {
  const list = [];

  for (const o of isArray(columnList) ? columnList : []) {
    const c = buildColumnItem({
      column: o,
      attachedTargetName,
    });

    if ((c || null) != null) {
      const { hidden } = {
        hidden: false,
        ...c,
      };

      if (!hidden) {
        list.push(c);
      }
    }
  }

  return list;
}
