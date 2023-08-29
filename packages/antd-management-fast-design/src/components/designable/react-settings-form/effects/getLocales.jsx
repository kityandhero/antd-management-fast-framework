import React from 'react';
import { GlobalRegistry } from '@designable/core';
import { isStr } from '@designable/shared';
import { isVoidField, onFieldReact } from '@formily/core';

import { IconWidget } from '../../react';

const takeIcon = (message) => {
  if (!isStr(message)) {
    return;
  }

  const matched = message.match(/@([^\s:]+)(?:\s*:\s*([\S\s]+))?/);

  if (matched) {
    return [matched[1], matched[2]];
  }

  return;
};

const mapEnum = (dataSource) => (item, index) => {
  const label = dataSource[index] || dataSource[item.value] || item.label;
  const icon = takeIcon(label);

  return {
    ...item,
    value: item?.value ?? null,
    label: icon ? (
      <IconWidget infer={icon[0]} tooltip={icon[1]} />
    ) : (
      label?.label ?? label ?? 'Unknown'
    ),
  };
};

export const getLocales = (node) => {
  onFieldReact('*', (field) => {
    const path = field.path.toString().replaceAll(/\.[\d+]/g, '');
    const takeMessage = (property) => {
      const token = `settings.${path}${property ? `.${property}` : ''}`;
      return node.getMessage(token) || GlobalRegistry.getDesignerMessage(token);
    };
    const title = takeMessage('title') || takeMessage();
    const description = takeMessage('description');
    const tooltip = takeMessage('tooltip');
    const dataSource = takeMessage('dataSource');
    const placeholder = takeMessage('placeholder');

    if (title) {
      field.title = title;
    }

    if (description) {
      field.description = description;
    }

    if (tooltip) {
      field.decorator[1] = field.decorator[1] || [];
      field.decorator[1].tooltip = tooltip;
    }

    if (placeholder) {
      field.component[1] = field.component[1] || [];
      field.component[1].placeholder = placeholder;
    }

    if (!isVoidField(field)) {
      if (dataSource?.length) {
        field.dataSource = field.dataSource?.length
          ? field.dataSource.map(mapEnum(dataSource))
          : [...dataSource];
      } else {
        field.dataSource = field.dataSource?.filter(Boolean);
      }
    }
  });
};
