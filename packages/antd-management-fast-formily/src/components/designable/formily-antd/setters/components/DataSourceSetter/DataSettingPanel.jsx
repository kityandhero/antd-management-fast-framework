import { Button } from 'antd';
import React, { Fragment, useMemo } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { ArrayItems, Form, FormItem, Input } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { observer } from '@formily/reactive-react';

import {
  TextWidget,
  usePrefix,
  ValueInput,
} from 'antd-management-fast-design-react';

import { Header } from './Header';
import { traverseTree } from './shared';

import './styles.less';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    ArrayItems,
    ValueInput,
  },
});

export const DataSettingPanel = observer((properties) => {
  const { allowExtendOption, effects, treeDataSource } = properties;
  const prefix = usePrefix('data-source-setter');

  const form = useMemo(() => {
    let values;

    traverseTree(treeDataSource.dataSource, (dataItem) => {
      if (dataItem.key === treeDataSource.selectedKey) {
        values = dataItem;
      }
    });

    return createForm({
      values,
      effects: effects,
    });
  }, [treeDataSource.selectedKey, treeDataSource.dataSource.length]);

  if (!treeDataSource.selectedKey)
    return (
      <Fragment>
        <Header
          title={
            <TextWidget token="SettingComponents.DataSourceSetter.nodeProperty" />
          }
          extra={null}
        />

        <div className={`${prefix + '-layout-item-content'}`}>
          <TextWidget token="SettingComponents.DataSourceSetter.pleaseSelectNode" />
        </div>
      </Fragment>
    );
  return (
    <Fragment>
      <Header
        title={
          <TextWidget token="SettingComponents.DataSourceSetter.nodeProperty" />
        }
        extra={
          allowExtendOption ? (
            <Button
              type="text"
              onClick={() => {
                form.setFieldState('map', (state) => {
                  state.value.push({});
                });
              }}
              icon={<PlusOutlined />}
            >
              <TextWidget token="SettingComponents.DataSourceSetter.addKeyValuePair" />
            </Button>
          ) : null
        }
      />
      <div className={`${prefix + '-layout-item-content'}`}>
        <Form form={form} labelWidth={60} wrapperWidth={160}>
          <SchemaField>
            <SchemaField.Array name="map" x-component="ArrayItems">
              <SchemaField.Object
                x-decorator="ArrayItems.Item"
                x-decorator-props={{ type: 'divide' }}
              >
                <SchemaField.String
                  title={
                    <TextWidget token="SettingComponents.DataSourceSetter.label" />
                  }
                  x-decorator="FormItem"
                  x-disabled={!allowExtendOption}
                  name="label"
                  x-component="Input"
                />

                <SchemaField.String
                  title={
                    <TextWidget token="SettingComponents.DataSourceSetter.value" />
                  }
                  x-decorator="FormItem"
                  name="value"
                  x-component="ValueInput"
                />

                <SchemaField.Void
                  x-component="ArrayItems.Remove"
                  x-visible={allowExtendOption}
                  x-component-props={{
                    style: {
                      margin: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  }}
                />
              </SchemaField.Object>
            </SchemaField.Array>
          </SchemaField>
        </Form>
      </div>
    </Fragment>
  );
});
