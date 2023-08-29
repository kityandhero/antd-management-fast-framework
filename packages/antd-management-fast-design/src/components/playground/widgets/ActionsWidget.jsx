import { Button, Radio, Space } from 'antd';
import React, { useEffect } from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';

import { TextWidget, useDesigner } from '../../designable/react';
import { loadInitialSchema, saveSchema } from '../service';

const supportLocales = new Set(['zh-cn', 'en-us', 'ko-kr']);

export const ActionsWidget = observer(() => {
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
      <Button href="https://designable-fusion.formilyjs.org">
        Alibaba Fusion
      </Button>

      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
          { label: '한국어', value: 'ko-kr' },
        ]}
        onChange={(event) => {
          GlobalRegistry.setDesignerLanguage(event.target.value);
        }}
      />

      <Button href="https://github.com/alibaba/designable" target="_blank">
        <GithubOutlined />
        Github
      </Button>

      <Button
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>

      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer);
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  );
});
