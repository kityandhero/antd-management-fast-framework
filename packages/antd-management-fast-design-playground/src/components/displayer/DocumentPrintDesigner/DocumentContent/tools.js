import {
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
  logConsole,
  startsWith,
  toLower,
  toNumber,
  toString,
  whetherNumber,
  whetherString,
  zeroString,
} from 'easy-soft-utility';

import {
  highlightModeCollection,
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
  } = targetAdjust;

  labelConfig = isObject(labelConfig) ? labelConfig : {};
  valueConfig = isObject(valueConfig) ? valueConfig : {};

  const {
    firstPosition: firstPositionLabel,
    spanRow: spanRowLabel,
    spanColumn: spanColumnLabel,
  } = {
    firstPosition: '1',
    spanRow: '1',
    spanColumn: '1',
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
    highlightMode: highlightModeCollection.label,
    spanRow: spanRowLabel,
    spanColumn: spanColumnLabel,
    content: title,
    valueDisplayMode: valueDisplayModeCollection.text,
  };

  // logConsole({ valueConfig, item }, 'analysisCell:valueConfig');

  const {
    firstPosition: firstPositionValue,
    spanRow: spanRowValue,
    spanColumn: spanColumnValue,
  } = {
    firstPosition: '0',
    spanRow: '1',
    spanColumn: '1',
    ...valueConfig,
  };

  if (!isFunction(getContentAction)) {
    throw new Error('getContentAction must be a function');
  }

  const displayValue = getContentAction({
    data: targetAdjust,
    valueDisplayMode,
  });

  const firstPositionValueAdjust = adjustFirstPosition(firstPositionValue);

  const valueData = {
    uniqueTag: checkStringIsNullOrWhiteSpace(uniqueTagValue)
      ? getGuid()
      : uniqueTagValue,
    key,
    highlightMode: highlightModeCollection.value,
    spanRow: spanRowValue,
    spanColumn: spanColumnValue,
    content: displayValue,
    valueDisplayMode,
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
    labelWidth: '0',
  };
}

export function getInitializeItem() {
  return {
    title: '',
    type: '',
    name: '',
    enumList: [],
    valueDisplayMode: valueDisplayModeCollection.text,
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
  configureList,
  formItems,
  applyList,
  attentionList,
  allApproveProcessList,
  remarkTitle,
  remarkName,
}) {
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
        title: remarkTitle,
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

  return { configureList: configureFilterListAdjust };
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
    return o;
  }

  const configure = filterList[0];

  return {
    ...o,
    ...configure,
  };
}

export function adjustSchemaData(schema) {
  const { general: generalConfig, items: configureList } = {
    general: {},
    items: [],
    ...schema,
  };

  return {
    generalConfig: {
      ...generalConfig,
    },
    configureList: [...configureList],
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
  remarkTitle,
  remarkName,
  remarkList,
}) {
  const rows = [];
  let cells = [];

  // 拼装表单项
  for (const o of formItems) {
    const { firstPositionLabel, labelData, firstPositionValue, valueData } =
      analysisTarget({
        target: o,
        configureList,
        defaultValueDisplayMode: valueDisplayModeCollection.text,
        getKeyAction: () => {
          const { name = '' } = { name: '', ...o };

          return name;
        },
        getContentAction: ({ data, valueDisplayMode }) => {
          return buildDisplayValue({
            data,
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

  // 拼装申请栏
  for (const o of applyList) {
    const { firstPositionLabel, labelData, firstPositionValue, valueData } =
      analysisTarget({
        target: o,
        configureList,
        defaultValueDisplayMode: valueDisplayModeCollection.apply,
        getKeyAction: () => {
          const { nodeId = '' } = {
            nodeId: '',
            ...o,
          };

          return nodeId;
        },
        getContentAction: ({ data }) => {
          const {
            note = '',
            signet = '',
            time = '',
          } = {
            note: '',
            signet: '',
            time: '',
            ...data,
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

  // 拼装经办栏
  for (const o of attentionList) {
    const { firstPositionLabel, labelData, firstPositionValue, valueData } =
      analysisTarget({
        target: o,
        configureList,
        defaultValueDisplayMode: valueDisplayModeCollection.attention,
        getKeyAction: () => {
          const { nodeId = '' } = {
            nodeId: '',
            ...o,
          };

          return nodeId;
        },
        getContentAction: ({ data }) => {
          const {
            note = '',
            signet = '',
            time = '',
          } = {
            note: '',
            signet: '',
            time: '',
            ...data,
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

  // 拼装审批栏
  for (const o of approveList) {
    const { firstPositionLabel, labelData, firstPositionValue, valueData } =
      analysisTarget({
        target: o,
        configureList,
        defaultValueDisplayMode: valueDisplayModeCollection.approval,
        getKeyAction: () => {
          const { nodeId = '' } = {
            nodeId: '',
            ...o,
          };

          return nodeId;
        },
        getContentAction: ({ data }) => {
          const {
            note = '',
            signet = '',
            time = '',
          } = {
            note: '',
            signet: '',
            time: '',
            ...data,
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

  // 拼装备注栏

  const { firstPositionLabel, labelData, firstPositionValue, valueData } =
    analysisTarget({
      target: {
        title: remarkTitle,
        name: remarkName,
      },
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
          checked: value == v || checkInCollection(vList, toString(value)),
        };
      })
    : isArray(enumList) &&
        !isEmptyArray(enumList) &&
        valueDisplayMode === valueDisplayModeCollection.text
      ? vText
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

    case valueDisplayModeCollection.approval: {
      return '审批';
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
