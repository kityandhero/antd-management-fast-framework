import { Button, Space, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';

import { isFunction } from 'easy-soft-utility';

import { TextWidget, useDesigner } from 'antd-management-fast-design-react';

import {
  loadInitialSchema,
  saveSchemaToLocal,
  schemaLocalKey,
} from '../service';

const supportLocales = new Set(['zh-cn', 'en-us', 'ko-kr']);

export const ActionsWidget = observer((properties) => {
  const { onClose, afterLocalSave } = {
    onClose: () => {},
    afterLocalSave: () => {},
    ...properties,
  };

  const designer = useDesigner();

  useEffect(() => {
    loadInitialSchema(designer);
  }, [designer]);

  useEffect(() => {
    if (!supportLocales.has(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
  }, []);

  return (
    <Space style={{ marginRight: 10 }}>
      <Tooltip title="存储数据到本地, 仅为临时存储, 不更新渲染">
        <Button
          type="primary"
          onClick={() => {
            saveSchemaToLocal(designer, true);
          }}
        >
          <SaveOutlined style={{ marginRight: '6px' }} />

          <TextWidget>Save</TextWidget>
        </Button>
      </Tooltip>

      <Tooltip title="保存设计数据到服务器">
        <Button
          type="primary"
          onClick={() => {
            saveSchemaToLocal(designer, false);

            if (isFunction(afterLocalSave)) {
              afterLocalSave(localStorage.getItem(schemaLocalKey));
            }
          }}
        >
          <SaveOutlined style={{ marginRight: '6px' }} />

          <TextWidget>RemoteSave</TextWidget>
        </Button>
      </Tooltip>

      <Button
        onClick={() => {
          if (isFunction(onClose)) {
            onClose();
          }
        }}
      >
        <CloseOutlined style={{ marginRight: '6px' }} />

        <TextWidget>Close</TextWidget>
      </Button>
    </Space>
  );
});
