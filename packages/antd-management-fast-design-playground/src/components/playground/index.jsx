import React, { useMemo } from 'react';
import {
  createDesigner,
  GlobalRegistry,
  KeyCode,
  Shortcut,
} from '@designable/core';

import {
  ComponentTreeWidget,
  CompositePanel as CompositePanel2,
  Designer,
  DesignerToolsWidget,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  setNpmCDNRegistry,
  SettingsForm,
  SettingsPanel,
  StudioPanel,
  ToolbarPanel,
  ViewPanel,
  ViewportPanel,
  ViewToolsWidget,
  Workspace as WorkspaceReact,
  WorkspacePanel,
} from 'antd-management-fast-design-react';

import { saveSchema } from './service';
import {
  ActionsWidget,
  LogoWidget,
  MarkupSchemaWidget,
  PreviewWidget,
  SchemaEditorWidget,
} from './widgets';

const CompositePanel = CompositePanel2;
const Workspace = WorkspaceReact;
setNpmCDNRegistry('//unpkg.com');

GlobalRegistry.registerDesignerLocales({
  'zh-CN': {
    sources: {
      Inputs: '输入控件',
      Layouts: '布局组件',
      Arrays: '自增组件',
      Displays: '展示组件',
      HigherOrders: '高阶组件',
    },
  },
  'en-US': {
    sources: {
      Inputs: 'Inputs',
      Layouts: 'Layouts',
      Arrays: 'Arrays',
      Displays: 'Displays',
      HigherOrders: 'Higher-Orders',
    },
  },
});

/**
 * 使用外部数据设置 schema
 * @param {string} schema json string
 */
export function setSchemaWithExternalData(schema) {
  localStorage.setItem('formily-schema', schema);
}

export const Playground = (properties) => {
  const {
    inputs,
    layouts,
    arrays,
    displays,
    widgetComponents,
    onClose,
    afterLocalSave,
  } = {
    onClose: () => {},
    // eslint-disable-next-line no-unused-vars
    afterLocalSave: (data) => {},
    ...properties,
  };

  const engine = useMemo(
    () =>
      createDesigner({
        shortcuts: [
          new Shortcut({
            codes: [
              [KeyCode.Meta, KeyCode.S],
              [KeyCode.Control, KeyCode.S],
            ],
            handler(context) {
              saveSchema(context.engine);
            },
          }),
        ],
        rootComponentName: 'Form',
      }),
    [],
  );

  return (
    <Designer engine={engine}>
      <StudioPanel
        logo={<LogoWidget />}
        actions={
          <ActionsWidget onClose={onClose} afterLocalSave={afterLocalSave} />
        }
      >
        <CompositePanel>
          <CompositePanel.Item title="panels.Component" icon="Component">
            <ResourceWidget title="sources.Inputs" sources={inputs} />

            <ResourceWidget title="sources.Layouts" sources={layouts} />

            <ResourceWidget title="sources.Arrays" sources={arrays} />

            <ResourceWidget title="sources.Displays" sources={displays} />
          </CompositePanel.Item>

          <CompositePanel.Item title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanel.Item>

          <CompositePanel.Item title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanel.Item>
        </CompositePanel>
        <Workspace id="form">
          <WorkspacePanel>
            <ToolbarPanel>
              <DesignerToolsWidget />

              <ViewToolsWidget
                use={['DESIGNABLE', 'JSONTREE', 'MARKUP', 'PREVIEW']}
              />
            </ToolbarPanel>

            <ViewportPanel style={{ height: '100%' }}>
              <ViewPanel type="DESIGNABLE">
                {() => <ComponentTreeWidget components={widgetComponents} />}
              </ViewPanel>

              <ViewPanel type="JSONTREE" scrollable={false}>
                {(tree, onChange) => (
                  <SchemaEditorWidget tree={tree} onChange={onChange} />
                )}
              </ViewPanel>

              <ViewPanel type="MARKUP" scrollable={false}>
                {(tree) => <MarkupSchemaWidget tree={tree} />}
              </ViewPanel>

              <ViewPanel type="PREVIEW">
                {(tree) => <PreviewWidget tree={tree} />}
              </ViewPanel>
            </ViewportPanel>
          </WorkspacePanel>
        </Workspace>

        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm uploadAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" />
        </SettingsPanel>
      </StudioPanel>
    </Designer>
  );
};
