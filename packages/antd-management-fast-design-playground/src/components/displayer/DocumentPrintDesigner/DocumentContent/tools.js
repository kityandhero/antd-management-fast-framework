import {
  canToNumber,
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  endsWith,
  filter,
  getGuid,
  getValueByKey,
  isArray,
  isEmptyArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
  startsWith,
  toLower,
  toNumber,
  toString,
  whetherNumber,
  whetherString,
  zeroString,
} from 'easy-soft-utility';

import {
  cellTypeCollection,
  fontFamilyCollection,
  highlightModeCollection,
  remarkName,
  remarkTitleDefault,
  valueDisplayModeCollection,
} from './constant';

export function adjustFirstPosition(v) {
  return (
    (isUndefined(v) || checkStringIsNullOrWhiteSpace(v) || toNumber(v) <= 0
      ? 0
      : 1) === whetherNumber.yes
  );
}

function analysisTarget({
  target,
  generalConfig,
  configureList,
  defaultValueDisplayMode = valueDisplayModeCollection.text,
  getKeyAction = null,
  getContentAction = null,
}) {
  if (!isFunction(getKeyAction)) {
    throw new Error('getKeyAction must be a function');
  }

  const key = getKeyAction(target);

  if (!isString(key)) {
    throw new Error('key must be string');
  }

  const targetAdjust = adjustTarget({
    key,
    target,
    configureList,
    defaultValueDisplayMode,
  });

  let {
    labelConfig = {},
    valueConfig = {},
    title,
    valueDisplayMode,
    enumList,
    extraData,
  } = targetAdjust;

  labelConfig = isObject(labelConfig) ? labelConfig : {};
  valueConfig = isObject(valueConfig) ? valueConfig : {};

  const { labelColor } = adjustGeneralConfig(generalConfig);

  const {
    firstPosition: firstPositionLabel,
    width: widthLabel,
    spanRow: spanRowLabel,
    spanColumn: spanColumnLabel,
    textAlign: textAlignLabel,
  } = {
    firstPosition: '1',
    spanRow: '1',
    spanColumn: '1',
    width: '0',
    textAlign: 'center',
    ...labelConfig,
  };

  const uniqueTagLabel = `${key}_label`;
  const uniqueTagValue = `${key}_value`;

  const firstPositionLabelAdjust = adjustFirstPosition(firstPositionLabel);

  const labelData = {
    uniqueTag: checkStringIsNullOrWhiteSpace(uniqueTagLabel)
      ? getGuid()
      : uniqueTagLabel,
    key,
    type: cellTypeCollection.label,
    highlightMode: highlightModeCollection.label,
    width: widthLabel,
    spanRow: spanRowLabel,
    spanColumn: spanColumnLabel,
    content: title,
    valueDisplayMode: valueDisplayModeCollection.text,
    firstPosition: firstPositionLabelAdjust
      ? whetherString.yes
      : whetherString.no,
    textAlign: textAlignLabel,
    enumList,
    textColor: labelColor,
  };

  const {
    firstPosition: firstPositionValue,
    width: widthValue,
    spanRow: spanRowValue,
    spanColumn: spanColumnValue,
    textAlign: textAlignValue,
  } = {
    firstPosition: '0',
    spanRow: '1',
    spanColumn: '1',
    width: '0',
    textAlign: 'left',
    ...valueConfig,
  };

  if (!isFunction(getContentAction)) {
    throw new Error('getContentAction must be a function');
  }

  const displayValue = getContentAction({
    data: extraData,
    valueDisplayMode,
  });

  const firstPositionValueAdjust = adjustFirstPosition(firstPositionValue);

  const valueData = {
    uniqueTag: checkStringIsNullOrWhiteSpace(uniqueTagValue)
      ? getGuid()
      : uniqueTagValue,
    key,
    type: cellTypeCollection.value,
    highlightMode: highlightModeCollection.value,
    width: widthValue,
    spanRow: spanRowValue,
    spanColumn: spanColumnValue,
    content: displayValue,
    valueDisplayMode,
    firstPosition: firstPositionValueAdjust
      ? whetherString.yes
      : whetherString.no,
    textAlign: textAlignValue,
    enumList,
    textColor: '#000',
  };

  return {
    firstPositionLabel: firstPositionLabelAdjust,
    labelData,
    firstPositionValue: firstPositionValueAdjust,
    valueData,
  };
}

export function getInitializeGeneral() {
  return {
    labelWidth: '160',
    gridColor: '#000000',
    labelColor: '#000000',
    titleSwitch: whetherString.yes,
    remarkTitle: remarkTitleDefault,
    remarkSwitch: whetherString.yes,
    qRCodeSwitch: whetherString.yes,
    serialNumberSwitch: whetherString.yes,
  };
}

export function adjustGeneralConfig(o) {
  return {
    ...getInitializeGeneral(),
    ...o,
  };
}

export function getInitializeTitleConfig() {
  return {
    fontSize: '30',
    color: '#000000',
    bold: '0',
    fontFamily: 'fangsong',
  };
}

export function adjustTitleConfig(o) {
  const data = {
    ...getInitializeTitleConfig(),
    ...o,
  };

  const { fontFamily } = data;

  if (!checkInCollection(fontFamilyCollection, fontFamily)) {
    data.fontFamily = 'fangsong';
  }

  return data;
}

export function adjustCellConfig(data) {
  return {
    enumList: [],
    valueDisplayMode: valueDisplayModeCollection.text,
    firstPosition: whetherString.no,
    width: zeroString,
    spanRow: '1',
    spanColumn: '1',
    ...data,
  };
}

export function adjustConfigureList({
  generalConfig,
  configureList,
  formItems,
  applyList,
  attentionList,
  allApproveProcessList,
}) {
  const { remarkTitle } = adjustGeneralConfig(generalConfig);

  const configureListAdjust = isArray(configureList) ? configureList : [];

  const configureInitialList = [
    ...formItems.map((o) => {
      const { name } = { name: '', ...o };

      return adjustTarget({
        key: name,
        target: o,
        configureList: [],
        defaultValueDisplayMode: valueDisplayModeCollection.text,
      });
    }),
    ...applyList.map((o) => {
      const { nodeId } = { nodeId: '', ...o };

      return adjustTarget({
        key: nodeId,
        target: o,
        configureList: [],
        defaultValueDisplayMode: valueDisplayModeCollection.apply,
      });
    }),
    ...attentionList.map((o) => {
      const { nodeId } = { nodeId: '', ...o };

      return adjustTarget({
        key: nodeId,
        target: o,
        configureList: [],
        defaultValueDisplayMode: valueDisplayModeCollection.attention,
      });
    }),
    ...allApproveProcessList.map((o) => {
      const { nodeId } = { nodeId: '', ...o };

      return adjustTarget({
        key: nodeId,
        target: o,
        configureList: [],
        defaultValueDisplayMode: valueDisplayModeCollection.approval,
      });
    }),
    adjustTarget({
      key: remarkName,
      target: {
        title: checkStringIsNullOrWhiteSpace(remarkTitle)
          ? remarkTitleDefault
          : remarkTitle,
        name: remarkName,
      },
      configureList: [],
      defaultValueDisplayMode: valueDisplayModeCollection.remark,
    }),
  ];

  const configureKeyInitialList = configureInitialList.map((o) => {
    const { key } = { key: '', ...o };

    return key;
  });

  const configureFilterListAdjust = filter(configureListAdjust, (one) => {
    const { key } = {
      key: '',
      ...one,
    };

    return (
      !checkStringIsNullOrWhiteSpace(key) &&
      checkInCollection(configureKeyInitialList, key)
    );
  });

  const configureFilterKeyListAdjust = configureFilterListAdjust.map((o) => {
    const { key } = { key: '', ...o };

    return key;
  });

  for (const one of configureInitialList) {
    const { key } = one;

    if (checkInCollection(configureFilterKeyListAdjust, key)) {
      continue;
    }

    configureFilterListAdjust.push(one);
  }

  const configureFinalFilterList = configureFilterListAdjust.map((o) => {
    const { key } = {
      key: '',
      ...o,
    };

    const listFilter = filter(configureInitialList, (one) => {
      const { key: keyOne } = {
        key: '',
        ...one,
      };

      return keyOne === key;
    });

    if (isEmptyArray(listFilter)) {
      return o;
    }

    const first = listFilter[0];

    const { title: titleAdjust } = first;

    return {
      ...o,
      title: titleAdjust,
    };
  });

  return { configureList: configureFinalFilterList };
}

export function adjustTarget({
  key,
  target,
  configureList,
  defaultValueDisplayMode = valueDisplayModeCollection.text,
}) {
  if (checkStringIsNullOrWhiteSpace(key)) {
    return {};
  }

  const configureListAdjust = isArray(configureList) ? configureList : [];

  const filterList = filter(configureListAdjust, (one) => {
    const { key: keyItem } = one;

    return toString(keyItem) === key;
  });

  const o = {
    title: '',
    enumList: [],
    valueDisplayMode: defaultValueDisplayMode,
    ...target,
    extraData: target,
    key,
    labelConfig: {
      firstPosition: whetherString.yes,
      width: '0',
      spanRow: '1',
      spanColumn: '1',
    },
    valueConfig: {
      firstPosition: whetherString.no,
      width: '0',
      spanRow: '1',
      spanColumn: '1',
    },
  };

  if (isEmptyArray(filterList)) {
    return filterItemData(o);
  }

  const { valueDisplayMode } = o;

  const configure = filterList[0];

  let correctData = {};

  if (valueDisplayMode === valueDisplayModeCollection.remark) {
    const { title } = o;

    correctData = { title };
  }

  return filterItemData({
    ...o,
    ...configure,
    ...correctData,
  });
}

export function adjustSchemaData(schema) {
  const {
    general: generalConfig,
    title: titleConfig,
    items: configureList,
  } = {
    general: {},
    titleConfig: {},
    items: [],
    ...schema,
  };

  let configureListAdjust = [];

  if (isArray(configureList)) {
    configureListAdjust = configureList.map((o) => filterItemConfig(o));
  }

  return {
    generalConfig: {
      ...generalConfig,
    },
    titleConfig: {
      ...titleConfig,
    },
    configureList: [...configureListAdjust],
  };
}

export function buildRowCell({
  generalConfig,
  configureList,
  formItems,
  values,
  applyList,
  attentionList,
  approveList,
  remarkList,
}) {
  const { remarkTitle } = adjustGeneralConfig(generalConfig);

  const rows = [];
  let cells = [];

  const listAll = [];

  for (const o of formItems) {
    const { name = '' } = { name: '', ...o };

    listAll.push({ key: name, data: o, type: 'formItems' });
  }

  for (const o of applyList) {
    const { nodeId = '' } = {
      nodeId: '',
      ...o,
    };

    listAll.push({ key: nodeId, data: o, type: 'applyList' });
  }

  for (const o of attentionList) {
    const { nodeId = '' } = {
      nodeId: '',
      ...o,
    };

    listAll.push({ key: nodeId, data: o, type: 'attentionList' });
  }

  for (const o of approveList) {
    const { nodeId = '' } = {
      nodeId: '',
      ...o,
    };

    listAll.push({ key: nodeId, data: o, type: 'approveList' });
  }

  listAll.push({
    key: remarkName,
    data: {
      title: checkStringIsNullOrWhiteSpace(remarkTitle)
        ? remarkTitleDefault
        : remarkTitle,
      name: remarkName,
    },
    type: 'remark',
  });

  let listAllSorted = [];

  const configureKeyList = configureList.map((o) => {
    const { key } = { key: '', ...o };

    return key;
  });

  for (const key of configureKeyList) {
    const listTemplate = filter(listAll, (one) => {
      const { key: keyItem } = one;

      return toString(keyItem) === key;
    });

    if (listTemplate) {
      listAllSorted = [...listAllSorted, ...listTemplate];
    }
  }

  const listOther = filter(listAll, (one) => {
    const { key: keyItem } = one;

    return !checkInCollection(configureKeyList, keyItem);
  });

  listAllSorted = [...listAllSorted, ...listOther];

  for (const o of listAllSorted) {
    const { type, data: d } = o;

    if (type === 'formItems') {
      const { firstPositionLabel, labelData, firstPositionValue, valueData } =
        analysisTarget({
          target: d,
          generalConfig,
          configureList,
          defaultValueDisplayMode: valueDisplayModeCollection.text,
          getKeyAction: () => {
            const { name = '' } = { name: '', ...d };

            return name;
          },
          getContentAction: ({ data: one, valueDisplayMode }) => {
            return buildDisplayValue({
              data: one,
              valueDisplayMode,
              values,
            });
          },
        });

      if (firstPositionLabel) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(labelData);

      if (firstPositionValue) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(valueData);
    }

    if (type === 'applyList') {
      const { firstPositionLabel, labelData, firstPositionValue, valueData } =
        analysisTarget({
          target: d,
          generalConfig,
          configureList,
          defaultValueDisplayMode: valueDisplayModeCollection.apply,
          getKeyAction: () => {
            const { nodeId = '' } = {
              nodeId: '',
              ...d,
            };

            return nodeId;
          },
          getContentAction: ({ data: one }) => {
            const {
              note = '',
              signet = '',
              time = '',
            } = {
              note: '',
              signet: '',
              time: '',
              ...one,
            };

            return {
              note,
              signet,
              time,
            };
          },
        });

      if (firstPositionLabel) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(labelData);

      if (firstPositionValue) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(valueData);
    }

    if (type === 'attentionList') {
      const { firstPositionLabel, labelData, firstPositionValue, valueData } =
        analysisTarget({
          target: d,
          generalConfig,
          configureList,
          defaultValueDisplayMode: valueDisplayModeCollection.attention,
          getKeyAction: () => {
            const { nodeId = '' } = {
              nodeId: '',
              ...d,
            };

            return nodeId;
          },
          getContentAction: ({ data: one }) => {
            const {
              note = '',
              signet = '',
              time = '',
            } = {
              note: '',
              signet: '',
              time: '',
              ...one,
            };

            return {
              note,
              signet,
              time,
            };
          },
        });

      if (firstPositionLabel) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(labelData);

      if (firstPositionValue) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(valueData);
    }

    if (type === 'approveList') {
      const { firstPositionLabel, labelData, firstPositionValue, valueData } =
        analysisTarget({
          target: d,
          generalConfig,
          configureList,
          defaultValueDisplayMode: valueDisplayModeCollection.approval,
          getKeyAction: () => {
            const { nodeId = '' } = {
              nodeId: '',
              ...d,
            };

            return nodeId;
          },
          getContentAction: () => {
            const {
              note = '',
              signet = '',
              time = '',
            } = {
              note: '',
              signet: '',
              time: '',
              ...d,
            };

            return {
              note,
              signet,
              time,
            };
          },
        });

      if (firstPositionLabel) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(labelData);

      if (firstPositionValue) {
        if (isEmptyArray(cells)) {
          cells = [];
        } else {
          rows.push([...cells]);

          cells = [];
        }
      }

      cells.push(valueData);
    }

    if (type === 'remark') {
      const { remarkSwitch } = adjustGeneralConfig(generalConfig);

      if (
        canToNumber(remarkSwitch) &&
        toNumber(remarkSwitch) === whetherNumber.yes
      ) {
        const { firstPositionLabel, labelData, firstPositionValue, valueData } =
          analysisTarget({
            target: d,
            generalConfig,
            configureList,
            defaultValueDisplayMode: valueDisplayModeCollection.remark,
            getKeyAction: () => {
              return remarkName;
            },
            getContentAction: () => {
              return isArray(remarkList)
                ? remarkList.map((o) => toString(o)).join('')
                : toString(remarkList);
            },
          });

        if (firstPositionLabel) {
          if (isEmptyArray(cells)) {
            cells = [];
          } else {
            rows.push([...cells]);

            cells = [];
          }
        }

        cells.push(labelData);

        if (firstPositionValue) {
          if (isEmptyArray(cells)) {
            cells = [];
          } else {
            rows.push([...cells]);

            cells = [];
          }
        }

        cells.push(valueData);
      }
    }
  }

  if (isEmptyArray(cells)) {
    cells = [];
  } else {
    rows.push([...cells]);

    cells = [];
  }

  return rows;
}

export function adjustValueCollection(values, otherData = []) {
  let result = {};

  if (isArray(values)) {
    const v = {};

    for (const o of values) {
      const { name, value } = {
        name: '',
        value: '',
        ...o,
      };

      if (checkStringIsNullOrWhiteSpace(name)) {
        continue;
      }

      v[name] = value ?? '';
    }

    result = v;
  } else {
    result = values | {};
  }

  if (isArray(otherData) && !isEmptyArray(otherData)) {
    const o = adjustValueCollection(otherData, []);

    result = {
      ...result,
      ...o,
    };
  }

  return result;
}

export function buildDisplayValue({ data, valueDisplayMode, values }) {
  const { name, type, currencyDisplay, enumList } = { ...data };

  let v = '';
  let vList = [];

  if (endsWith(type, '[]') || startsWith(type, 'Array<')) {
    if (isArray(values[name])) {
      vList = values[name].map((o) => {
        return toString(o);
      });
    }

    if (!isArray(values[name]) && isString(values[name])) {
      try {
        const valueTemporary = JSON.parse(values[name]);

        if (isArray(valueTemporary)) {
          vList = valueTemporary.map((o) => {
            return toString(o);
          });
        }
      } catch {
        vList = [];
      }
    }

    v = isEmptyArray(vList) ? values[name] : vList.join(' ～ ');
  } else {
    v = getValueByKey({
      data: values,
      key: name,
      defaultValue: '',
    });
  }

  let vText = '';

  if (isArray(enumList) && !isEmptyArray(enumList)) {
    const selectList = filter(enumList, (one) => {
      const { value } = one;

      return toString(v) === toString(value);
    });

    if (!isEmptyArray(selectList)) {
      vText = selectList[0].label;
    }
  }

  return isArray(enumList) &&
    !isEmptyArray(enumList) &&
    valueDisplayMode === valueDisplayModeCollection.enum
    ? enumList.map((o) => {
        const { label, value } = o;

        return {
          label,
          value,
          checked: value == v || checkInCollection(vList, toString(value)),
        };
      })
    : isArray(enumList) &&
        !isEmptyArray(enumList) &&
        valueDisplayMode === valueDisplayModeCollection.text
      ? vText || '无'
      : currencyDisplay === whetherString.yes &&
          checkInCollection(['number', 'string'], toLower(type)) &&
          isNumber(toNumber(v))
        ? v
        : v;
}

export function getValueDisplayModeText(valueDisplayMode) {
  switch (valueDisplayMode) {
    case valueDisplayModeCollection.text: {
      return '文本';
    }

    case valueDisplayModeCollection.enum: {
      return '选项';
    }

    case valueDisplayModeCollection.money: {
      return '金额';
    }

    case valueDisplayModeCollection.apply: {
      return '申请栏';
    }

    case valueDisplayModeCollection.attention: {
      return '经办栏';
    }

    case valueDisplayModeCollection.approval: {
      return '审批栏';
    }

    case valueDisplayModeCollection.remark: {
      return '备注';
    }

    default: {
      return '文本';
    }
  }
}

export function transferNodeList(approveList, allApproveProcessList) {
  let nodeList = [];

  const approveListAdjust = isArray(approveList) ? approveList : [];
  const allApproveProcessListAdjust = isArray(allApproveProcessList)
    ? allApproveProcessList
    : [];

  if (isEmptyArray(allApproveProcessListAdjust)) {
    nodeList = [...approveListAdjust];
  } else {
    const approveNodeIdList = approveListAdjust.map((o) => o.nodeId);

    for (const one of allApproveProcessListAdjust) {
      const { nodeId } = {
        nodeId: '',
        ...one,
      };

      if (checkInCollection(approveNodeIdList, nodeId)) {
        const listFilter = filter(approveListAdjust, (item) => {
          const { nodeId: nodeIdItem } = {
            nodeId: '',
            ...item,
          };

          return nodeIdItem === nodeId;
        });

        if (listFilter.length > 0) {
          nodeList.push(listFilter[0]);
        } else {
          nodeList.push(one);
        }
      } else {
        nodeList.push(one);
      }
    }
  }

  const nodeListAdjust = nodeList.map((o) => {
    const { nodeId, title, note, name, signet, time } = {
      title: '',
      note: '',
      name: '',
      signet: '',
      time: '',
      ...o,
    };

    return {
      nodeId,
      title,
      note,
      name,
      signet,
      time,
    };
  });

  return nodeListAdjust;
}

export function getFontFamilyName(fontFamily) {
  const o = toLower(fontFamily);

  switch (o) {
    case 'fangsong': {
      return '仿宋';
    }

    case 'fangsong_gb2312': {
      return '仿宋GB2312';
    }

    case 'fzxiaobiaosong-b05s': {
      return '方正小标宋';
    }

    default: {
      return '未知';
    }
  }
}

export function filterItemConfig(o) {
  const { title, enumList, valueDisplayMode, key, labelConfig, valueConfig } = {
    title: '',
    enumList: [],
    valueDisplayMode: valueDisplayModeCollection.text,
    key: '',
    labelConfig: {
      firstPosition: whetherString.yes,
      width: '0',
      spanRow: '1',
      spanColumn: '1',
    },
    valueConfig: {
      firstPosition: whetherString.no,
      width: '0',
      spanRow: '1',
      spanColumn: '1',
    },
    ...o,
  };

  return {
    title,
    enumList,
    valueDisplayMode,
    key,
    labelConfig,
    valueConfig,
  };
}

export function filterItemData(o) {
  const {
    title,
    enumList,
    valueDisplayMode,
    key,
    labelConfig,
    valueConfig,
    extraData,
  } = {
    title: '',
    enumList: [],
    valueDisplayMode: valueDisplayModeCollection.text,
    key: '',
    extraData: {},
    labelConfig: {
      firstPosition: whetherString.yes,
      width: '0',
      spanRow: '1',
      spanColumn: '1',
    },
    valueConfig: {
      firstPosition: whetherString.no,
      width: '0',
      spanRow: '1',
      spanColumn: '1',
    },
    ...o,
  };

  return {
    title,
    enumList,
    valueDisplayMode,
    key,
    labelConfig,
    valueConfig,
    extraData,
  };
}
