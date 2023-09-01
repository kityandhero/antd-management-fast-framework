import { Input, Upload } from 'antd';
import cls from 'classnames';
import React, { useContext } from 'react';

import { IconWidget, usePrefix } from '../../../react';
import { SettingsFormContext } from '../../shared/context';

import './styles.less';

export const ImageInput = ({ className, style, ...properties }) => {
  const prefix = usePrefix('image-input');
  const context = useContext(SettingsFormContext);

  return (
    <div className={cls(prefix, className)} style={style}>
      <Input
        {...properties}
        onChange={(event) => {
          properties.onChange?.(event?.target?.['value']);
        }}
        prefix={
          <Upload
            action={context?.uploadAction}
            itemRender={() => null}
            maxCount={1}
            onChange={(parameters) => {
              const response = parameters.file?.response;
              const url =
                response?.url ||
                response?.downloadURL ||
                response?.imageURL ||
                response?.thumbUrl;

              if (!url) {
                return;
              }

              properties.onChange?.(url);
            }}
          >
            <IconWidget infer="CloudUpload" style={{ cursor: 'pointer' }} />
          </Upload>
        }
      />
    </div>
  );
};

const addBgValue = (value) => {
  if (/url\([^)]+\)/.test(value)) {
    return value;
  }

  return `url(${value})`;
};

const removeBgValue = (value) => {
  const matched = String(value).match(/url\(\s*([^)]+)\s*\)/);

  if (matched?.[1]) {
    return matched?.[1];
  }

  return value;
};

export const BackgroundImageInput = (properties) => {
  return (
    <ImageInput
      value={removeBgValue(properties.value)}
      onChange={(url) => {
        properties.onChange?.(addBgValue(url));
      }}
    />
  );
};
