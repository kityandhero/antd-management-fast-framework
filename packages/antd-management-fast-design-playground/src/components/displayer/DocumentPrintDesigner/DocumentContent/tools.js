import { Checkbox, Col, Row } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  endsWith,
  filter,
  getValueByKey,
  isArray,
  isEmptyArray,
  isString,
  toString,
  whetherString,
} from 'easy-soft-utility';

import { VerticalBox } from 'antd-management-fast-component';

import {
  colorStyle,
  defaultConfig,
  fontFamilyStyle,
  valueDisplayModeCollection,
} from './constant';

export function getInitializeGeneral() {
  return {
    labelWidth: defaultConfig.labelWidth,
  };
}

export function getInitializeItem() {
  return {
    title: '',
    type: '',
    name: '',
    enumList: [],
    fullLine: defaultConfig.fullLine,
    firstPosition: defaultConfig.firstPosition,
    width: defaultConfig.width,
    minHeight: defaultConfig.minHeight,
  };
}

export function adjustItem(o) {
  const data = {
    title: '',
    type: '',
    name: '',
    enumList: defaultConfig.enumList,
    fullLine: defaultConfig.fullLine,
    firstPosition: defaultConfig.firstPosition,
    width: defaultConfig.width,
    minHeight: defaultConfig.minHeight,
    ...o,
  };

  const { fullLine } = data;

  if (fullLine == whetherString.yes) {
    data.firstPosition = whetherString.no;
  }

  return data;
}

export function adjustSchemaData(schema) {
  const { general, items } = {
    general: {},
    items: [],
    ...schema,
  };

  const list = [];

  for (const [key, value] of Object.entries(items)) {
    let {
      title,
      type,
      name,
      enumList,
      fullLine,
      firstPosition,
      width,
      minHeight,
      valueDisplayMode,
    } = adjustItem(value);

    if (
      valueDisplayMode !== valueDisplayModeCollection.enum &&
      valueDisplayMode !== valueDisplayModeCollection.text
    ) {
      valueDisplayMode = valueDisplayModeCollection.text;

      if (isArray(enumList) && !isEmptyArray(enumList)) {
        valueDisplayMode = valueDisplayModeCollection.enum;
      }
    }

    list.push({
      key: `document_index_${key}`,
      title,
      type,
      name,
      enumList,
      fullLine,
      firstPosition,
      width,
      minHeight,
      valueDisplayMode,
    });
  }

  return {
    general: {
      labelWidth: defaultConfig.labelWidth,
      ...general,
    },
    items: list,
  };
}

export function adjustItemCollection(items, other = []) {
  let itemsAdjust = [];

  itemsAdjust = isArray(items) ? items : [];

  if (isArray(other) && !isEmptyArray(other)) {
    itemsAdjust = [...itemsAdjust, ...other];
  }

  if (isEmptyArray(itemsAdjust)) {
    return [];
  }

  const list = [];

  let listTemplate = [];

  for (const [key, value] of Object.entries(itemsAdjust)) {
    let {
      title,
      type,
      name,
      enumList,
      fullLine,
      firstPosition,
      width,
      minHeight,
      valueDisplayMode,
    } = adjustItem(value);

    if (
      valueDisplayMode !== valueDisplayModeCollection.enum &&
      valueDisplayMode !== valueDisplayModeCollection.text
    ) {
      valueDisplayMode = valueDisplayModeCollection.text;

      if (isArray(enumList) && !isEmptyArray(enumList)) {
        valueDisplayMode = valueDisplayModeCollection.enum;
      }
    }

    if (fullLine === whetherString.yes) {
      if (listTemplate.length > 0) {
        list.push([...listTemplate]);

        listTemplate = [];
      }

      list.push({
        key: `document_index_${key}`,
        title,
        type,
        name,
        enumList,
        fullLine,
        firstPosition,
        width,
        minHeight,
        valueDisplayMode,
      });
    } else {
      if (firstPosition === whetherString.yes && listTemplate.length > 0) {
        list.push([...listTemplate]);

        listTemplate = [];
      }

      listTemplate.push({
        key: `document_index_${key}`,
        title,
        type,
        name,
        enumList,
        fullLine,
        firstPosition,
        width,
        minHeight,
        valueDisplayMode,
      });
    }
  }

  if (listTemplate.length > 0) {
    list.push([...listTemplate]);

    listTemplate = [];
  }

  return list;
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

export function buildDisplayValue(data, values) {
  const { name, type, enumList, valueDisplayMode } = { ...data };

  let v = '';

  if (endsWith(type, '[]')) {
    let vList = [];

    if (isArray(values[name])) {
      vList = values[name];
    }

    if (!isArray(values[name]) && isString(values[name])) {
      try {
        const valueTemporary = JSON.parse(values[name]);

        if (isArray(valueTemporary)) {
          vList = valueTemporary;
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
    valueDisplayMode === valueDisplayModeCollection.enum ? (
    <Row style={{ height: '100%' }} wrap>
      {enumList.map((o, index) => {
        const { label, value } = o;

        return (
          <Col key={`${name}_${index}`}>
            <VerticalBox>
              <Checkbox
                value={value}
                checked={value == v}
                style={{
                  fontSize: '16px',
                  ...fontFamilyStyle,
                  ...colorStyle,
                }}
              >
                {label}
              </Checkbox>
            </VerticalBox>
          </Col>
        );
      })}
    </Row>
  ) : isArray(enumList) &&
    !isEmptyArray(enumList) &&
    valueDisplayMode === valueDisplayModeCollection.text ? (
    <VerticalBox>
      <div>{vText}</div>
    </VerticalBox>
  ) : (
    <VerticalBox>
      <div>{v}</div>
    </VerticalBox>
  );
}

export function getValueDisplayModeText(valueDisplayMode) {
  switch (valueDisplayMode) {
    case valueDisplayModeCollection.text: {
      return '文本';
    }

    case valueDisplayModeCollection.enum: {
      return '选项';
    }

    default: {
      return '文本';
    }
  }
}
