// 此文件将会从模板库自动更新，请勿改动此文件内容，如需增加或调整，请在tools.custom.jsx中进行。

import { Divider, Space } from 'antd';
import React from 'react';

import { getModelRemoteData } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  getValueByKey,
  hasKey,
  isArray,
  isEmptyArray,
  isEmptyObject,
  isNull,
} from 'easy-soft-utility';

import { cardConfig } from 'antd-management-fast-common';
import { buildButton, iconBuilder } from 'antd-management-fast-component';

import { keyValueEditModeCollection } from '../../customConfig';

export function getSexName(value) {
  let result = '未知';

  switch (`${value}`) {
    case '1': {
      result = '男';
      break;
    }

    case '2': {
      result = '女';
      break;
    }

    default: {
      break;
    }
  }

  return result;
}

export function getLogo() {
  const { data } = {
    data: {},
    ...getModelRemoteData('currentAccount'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { logo } = {
    logo: '',
    ...platform,
  };

  return logo;
}

export function getTitle() {
  const { data } = {
    data: {},
    ...getModelRemoteData('currentAccount'),
  };

  const { platform } = {
    platform: { logo: '' },
    ...data,
  };

  const { shortName } = {
    shortName: '',
    ...platform,
  };

  if (checkStringIsNullOrWhiteSpace(shortName)) {
    return '';
  }

  return shortName;
}

export function buildKeyTag(key) {
  return `${key}Tag`;
}

export function buildKeyValueNote({ label, name, helper = '' }) {
  return {
    label: label,
    name: `${name}Note`,
    helper: helper,
  };
}

export function buildKeyValueTag({ label, name, helper = '' }) {
  return {
    label: label,
    name: `${name}Tag`,
    helper: helper,
  };
}

export function buildKeyValueInstruction({ label, name, helper = '' }) {
  return {
    label: label,
    name: `${name}Instruction`,
    helper: helper,
  };
}

function appendFiledHelper({ data, fieldData: f }) {
  let { helper } = {
    helper: '',
    ...f,
  };

  if (checkStringIsNullOrWhiteSpace(helper)) {
    const o = buildKeyValueInstruction(f);

    const { name } = {
      name: '',
      ...o,
    };

    const v = getValueByKey({
      data: data,
      key: name,
    });

    if (!checkStringIsNullOrWhiteSpace(v)) {
      helper = v;
    }
  }

  return { ...f, helper };
}

export function buildInputDisplay({
  handleData,
  fieldData: f,
  hidden = false,
  inputIcon = iconBuilder.read(),
  value = '',
  editMode = keyValueEditModeCollection.string,
}) {
  return {
    lg: 24,
    type: cardConfig.contentItemType.onlyShowInput,
    icon: inputIcon || iconBuilder.read(),
    fieldData: appendFiledHelper({
      data: handleData,
      fieldData: f,
    }),
    value:
      value ||
      getValueByKey({
        data: handleData,
        key: f.name,
        convertBuilder: (v) => {
          let result = v;
          switch (editMode) {
            case keyValueEditModeCollection.time: {
              result = formatDatetime({
                data: v,
                format: datetimeFormat.hourMinute,
                defaultValue: '--',
              });
              break;
            }

            default: {
              result = v;
              break;
            }
          }

          return result;
        },
      }),
    hidden,
  };
}

export function buildInputItem({
  firstLoadSuccess,
  handleData,
  fieldData: f,
  hidden = false,
  inputIcon = iconBuilder.read(),
  icon = iconBuilder.form(),
  text = '更改配置',
  value = '',
  editMode = keyValueEditModeCollection.string,
  // eslint-disable-next-line no-unused-vars
  handleClick: handleClickSimple = ({ fieldData, editMode }) => {},
  extra = null,
}) {
  const extraExist = !(isNull(extra) || isEmptyObject(extra));

  let extraButton = null;

  if (extraExist) {
    const { extraText, extraIcon, extraAction } = {
      extraText: '',
      extraIcon: iconBuilder.form(),
      // eslint-disable-next-line no-unused-vars
      extraAction: ({ fieldData, editMode }) => {},
      ...extra,
    };

    extraButton = buildButton({
      style: {
        border: '0px solid #d9d9d9',
        backgroundColor: '#fafafa',
        height: '30px',
        paddingLeft: '0',
        paddingRight: '0',
      },
      icon: extraIcon,
      text: extraText,
      disabled: !firstLoadSuccess,
      handleClick: () => {
        extraAction({
          fieldData: appendFiledHelper({
            data: handleData,
            fieldData: f,
          }),
          editMode,
        });
      },
    });
  }

  return {
    lg: 24,
    type: cardConfig.contentItemType.onlyShowInput,
    icon: inputIcon || iconBuilder.read(),
    fieldData: appendFiledHelper({
      data: handleData,
      fieldData: f,
    }),
    value:
      value ||
      getValueByKey({
        data: handleData,
        key: f.name,
        convertBuilder: (v) => {
          let result = v;
          switch (editMode) {
            case keyValueEditModeCollection.time: {
              result = formatDatetime({
                data: v,
                format: datetimeFormat.hourMinute,
                defaultValue: '--',
              });
              break;
            }

            case keyValueEditModeCollection.datetime: {
              result = formatDatetime({
                data: v,
                format: datetimeFormat.yearMonthDayHourMinuteSecond,
                defaultValue: '--',
              });
              break;
            }

            default: {
              result = v;
              break;
            }
          }

          return result;
        },
      }),
    hidden,
    innerProps: {
      addonAfter: (
        <Space split={<Divider type="vertical" />}>
          {buildButton({
            style: {
              border: '0px solid #d9d9d9',
              backgroundColor: '#fafafa',
              height: '30px',
              paddingLeft: '0',
              paddingRight: '0',
            },
            icon: icon,
            text: text,
            disabled: !firstLoadSuccess,
            handleClick: () => {
              handleClickSimple({
                fieldData: appendFiledHelper({
                  data: handleData,
                  fieldData: f,
                }),
                editMode,
              });
            },
          })}

          {extraButton}
        </Space>
      ),
    },
  };
}

// arr是原数组，N是想分成多少个
export function splitToGroup(array, size) {
  let result = [];

  for (let index = 0; index < array.length; index += size) {
    result.push(array.slice(index, index + size));
  }

  return result;
}

function getFlowGraphTextStyle(level) {
  switch (level) {
    case 0: {
      return 20;
    }
    case 1: {
      return 16;
    }
    default: {
      return 14;
    }
  }
}

function getFlowGraphRootTextAttributes() {
  return {
    fontSize: getFlowGraphTextStyle(1),
    fontWeight: 'bold',
    fill: '#fff',
  };
}

function getFlowGraphSecondTextStyle() {
  return {
    fontSize: getFlowGraphTextStyle(2),
    color: '#000',
  };
}

function getFlowGraphRootNodeStyle() {
  return {
    fill: '#1E88E5',
    stroke: '#1E88E5',
    radius: 5,
  };
}

function getFlowGraphSecondNodeStyle() {
  return {
    fill: '#e8e8e8',
    stroke: '#e8e8e8',
    radius: 5,
  };
}

function calcFlowGraphStringLength(text) {
  let l = 0;

  for (let index = 0; index < text.length; index++) {
    if (text.codePointAt(index) > 0 && text.codePointAt(index) < 128) {
      l++;
    } else {
      l += 2;
    }
  }
  return l;
}

export function buildFlowGraphConfig() {
  return {
    height: 600,
    nodeCfg: {
      size: [40, 40],
      autoWidth: true,
      padding: 10,
      style: (item) => {
        const { level } = item.value;
        return {
          fill: 'transparent',
          stroke: 'transparent',
          radius: 4,
          cursor: 'pointer',
          ...(level === 0 ? getFlowGraphRootNodeStyle() : {}),
          ...(level === 1 ? getFlowGraphSecondNodeStyle() : {}),
        };
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
          stroke: '#96DEFF',
        },
      },
      label: {
        style: (cfg, group, type) => {
          const { level, href } = cfg.value;

          if (type !== 'name') {
            return {};
          }
          return {
            fontSize: getFlowGraphTextStyle(),
            cursor: 'pointer',
            fill: href ? '#1890ff' : '#000',
            ...(level === 0 ? getFlowGraphRootTextAttributes() : {}),
            ...(level === 1 ? getFlowGraphSecondTextStyle() : {}),
          };
        },
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    edgeCfg: {
      type: 'polyline',
      style: {
        stroke: '#000',
        endArrow: false,
      },
    },
    markerCfg: (cfg) => {
      const { level, direction } = cfg.value;
      const show = level !== 0 && cfg.children && cfg.children.length > 0;
      return {
        position: direction,
        show,
      };
    },
    layout: {
      type: 'mindmap',
      direction: 'H',
      getWidth: (cfg) => {
        const { name, level } = cfg.value;
        const fontSize = getFlowGraphTextStyle(level);
        const width = (fontSize * calcFlowGraphStringLength(name)) / 2;

        return width;
      },
      getHeight: () => {
        return 25;
      },
      getVGap: () => {
        return 20;
      },
      getHGap: () => {
        return 40;
      },
      getSide: (d) => {
        return d.data.value.direction === 'left' ? 'left' : 'right';
      },
    },
    autoFit: true,
    fitCenter: true,
    animate: true,
    minimapCfg: {
      show: true,
    },
    behaviors: ['drag-canvas', 'zoom-canvas'],
    onReady: (graph) => {
      graph.on('node:click', (event) => {
        const { item } = event;
        const { value } = item.get('model');

        if (value.href) {
          window.open(value.href);
        }
      });
    },
  };
}

export function buildFlowCaseFormInitialValues(
  listFormStorage,
  dataSchemaList,
) {
  const data = {};

  if (isArray(listFormStorage) && !isEmptyArray(listFormStorage)) {
    for (const o of listFormStorage) {
      try {
        data[o.name] = JSON.parse(o.value);
      } catch {
        data[o.name] = o.value;
      }
    }
  }

  if (!isArray(dataSchemaList) || isEmptyArray(dataSchemaList)) {
    return data;
  }

  for (const item of dataSchemaList) {
    const { name, type } = { name: '', type: '', ...item };

    if (checkStringIsNullOrWhiteSpace(name)) {
      continue;
    }

    if (checkStringIsNullOrWhiteSpace(type)) {
      continue;
    }

    if (hasKey(data, name)) {
      continue;
    }

    if (type === 'string') {
      data[name] = '';
    }

    if (type === 'number') {
      data[name] = '';
    }

    if (type === '[]') {
      data[name] = [];
    }
  }

  return data;
}
