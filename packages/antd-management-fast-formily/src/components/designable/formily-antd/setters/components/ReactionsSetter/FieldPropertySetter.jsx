import { Menu } from 'antd';
import React, { useState } from 'react';
import { isPlainObj, reduce } from '@formily/shared';

import {
  MonacoInput,
  TextWidget,
  usePrefix,
} from 'antd-management-fast-design-react';

import { FieldProperties } from './properties';

const template = (code = null) => {
  if (!code) return;
  return code.trim();
};

const filterEmpty = (value) => {
  return reduce(
    value,
    (buf, value, key) => {
      if (!value || value === '{{}}') {
        return buf;
      }

      buf[key] = value;

      return buf;
    },
    {},
  );
};

const parseExpression = (expression) => {
  if (!expression) {
    return '';
  }

  return String(expression).match(/^{{([\S\s]*)}}$/)?.[1] || '';
};

export const FieldPropertySetter = (properties) => {
  const [selectKeys, setSelectKeys] = useState(['visible']);
  const prefix = usePrefix('field-property-setter');
  const value = { ...properties.value };

  const currentProperty = FieldProperties.find(
    (item) => item.key === selectKeys[0],
  );

  return (
    <div className={prefix}>
      <Menu
        mode="vertical"
        style={{
          width: 200,
          height: 300,
          paddingRight: 4,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        defaultSelectedKeys={selectKeys}
        selectedKeys={selectKeys}
        onSelect={({ selectedKeys }) => {
          setSelectKeys(selectedKeys);
        }}
        items={FieldProperties.map((key) => {
          if (isPlainObj(key)) {
            return {
              key: key.key,
              label: (
                <TextWidget
                  token={`SettingComponents.ReactionsSetter.${
                    key.token || key.key
                  }`}
                />
              ),
            };
          }

          return {
            key: key,
            label: (
              <TextWidget token={`SettingComponents.ReactionsSetter.${key}`} />
            ),
          };
        })}
      ></Menu>
      <div className={prefix + '-coder-wrapper'}>
        <div className={prefix + '-coder-start'}>
          {`$self.${selectKeys[0]} = (`}

          <span
            style={{
              fontSize: 14,
              marginLeft: 10,
              color: '#888',
              fontWeight: 'normal',
            }}
          >
            {'//'}{' '}
            <TextWidget token="SettingComponents.ReactionsSetter.expressionValueTypeIs" />{' '}
            {'`'}
            {currentProperty?.type}
            {'`'}
          </span>
        </div>
        <div className={prefix + '-coder'}>
          <MonacoInput
            key={selectKeys[0]}
            language="javascript.expression"
            extraLib={properties.extraLib}
            helpCode={template(currentProperty?.helpCode)}
            value={parseExpression(value[selectKeys[0]])}
            options={{
              lineNumbers: 'off',
              wordWrap: 'on',
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 0,
              minimap: {
                enabled: false,
              },
            }}
            onChange={(expression) => {
              properties.onChange?.(
                filterEmpty({
                  ...value,
                  [selectKeys[0]]: `{{${expression}}}`,
                }),
              );
            }}
          />
        </div>
        <div className={prefix + '-coder-end'}>{`)`}</div>
      </div>
    </div>
  );
};
