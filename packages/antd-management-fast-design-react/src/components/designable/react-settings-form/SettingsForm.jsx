import { Empty } from 'antd';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { cancelIdle, requestIdle } from '@designable/shared';
import { Form } from '@formily/antd-v5';
import { createForm } from '@formily/core';
import { observer } from '@formily/react';

import {
  IconWidget,
  NodePathWidget,
  useCurrentNode,
  useOperation,
  usePrefix,
  useSelected,
  useWorkbench,
} from '../react';

import { SettingsFormContext } from './shared/context';
import { getLocales, getSnapshot } from './effects';
import { SchemaField } from './SchemaField';

import './styles.less';

const GlobalState = {
  idleRequest: null,
};

export const SettingsForm = observer(
  (properties) => {
    const workbench = useWorkbench();
    const currentWorkspace =
      workbench?.activeWorkspace || workbench?.currentWorkspace;
    const currentWorkspaceId = currentWorkspace?.id;
    const operation = useOperation(currentWorkspaceId);
    const node = useCurrentNode(currentWorkspaceId);
    const selected = useSelected(currentWorkspaceId);
    const prefix = usePrefix('settings-form');
    const schema = node?.designerProps?.propsSchema;
    const isEmpty = !(
      node &&
      node.designerProps?.propsSchema &&
      selected.length === 1
    );

    const form = useMemo(() => {
      return createForm({
        initialValues: node?.designerProps?.defaultProps,
        values: node?.props,
        effects(form) {
          getLocales(node);
          getSnapshot(operation);
          properties.effects?.(form);
        },
      });
    }, [node, node?.props, schema, operation, isEmpty]);

    const render = () => {
      if (!isEmpty) {
        return (
          <div
            className={cls(prefix, properties.className)}
            style={properties.style}
            key={node.id}
          >
            <SettingsFormContext.Provider value={properties}>
              <Form
                form={form}
                colon={false}
                labelWidth={120}
                labelAlign="left"
                wrapperAlign="right"
                feedbackLayout="none"
                tooltipLayout="text"
              >
                <SchemaField
                  schema={schema}
                  components={properties.components}
                  scope={{ $node: node, ...properties.scope }}
                />
              </Form>
            </SettingsFormContext.Provider>
          </div>
        );
      }

      return (
        <div className={prefix + '-empty'}>
          <Empty />
        </div>
      );
    };
    const IconWidgetProvider = IconWidget.Provider;

    return (
      <IconWidgetProvider tooltip>
        <div className={prefix + '-wrapper'}>
          {!isEmpty && <NodePathWidget workspaceId={currentWorkspaceId} />}

          <div className={prefix + '-content'}>{render()}</div>
        </div>
      </IconWidgetProvider>
    );
  },
  {
    scheduler: (update) => {
      cancelIdle(GlobalState.idleRequest);
      GlobalState.idleRequest = requestIdle(update, {
        timeout: 500,
      });
    },
  },
);
