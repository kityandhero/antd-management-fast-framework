import { Button, InputNumber, Space } from 'antd';
import cls from 'classnames';
import React, { Fragment, useRef } from 'react';
import { CursorType, ScreenType } from '@designable/core';
import { observer } from '@formily/reactive-react';

import {
  useCursor,
  useHistory,
  usePrefix,
  useScreen,
  useWorkbench,
} from '../../hooks';
import { IconWidget } from '../IconWidget';

import './styles.less';

export const DesignerToolsWidget = observer((properties) => {
  const screen = useScreen();
  const cursor = useCursor();
  const workbench = useWorkbench();
  const history = useHistory();
  const sizeReference = useRef({});
  const prefix = usePrefix('designer-tools');

  const { use } = {
    use: ['HISTORY', 'CURSOR', 'SCREEN_TYPE'],
    ...properties,
  };

  const renderHistoryController = () => {
    if (!use?.includes('HISTORY')) return null;
    return (
      <Space.Compact size="small" style={{ marginRight: 20 }}>
        <Button
          size="small"
          disabled={!history?.allowUndo}
          onClick={() => {
            history.undo();
          }}
        >
          <IconWidget infer="Undo" />
        </Button>

        <Button
          size="small"
          disabled={!history?.allowRedo}
          onClick={() => {
            history.redo();
          }}
        >
          <IconWidget infer="Redo" />
        </Button>
      </Space.Compact>
    );
  };

  const renderCursorController = () => {
    if (workbench.type !== 'DESIGNABLE') {
      return null;
    }
    if (!use?.includes('CURSOR')) {
      return null;
    }

    return (
      <Space.Compact size="small" style={{ marginRight: 20 }}>
        <Button
          size="small"
          disabled={cursor.type === CursorType.Move}
          onClick={() => {
            cursor.setType(CursorType.Move);
          }}
        >
          <IconWidget infer="Move" />
        </Button>

        <Button
          size="small"
          disabled={cursor.type === CursorType.Selection}
          onClick={() => {
            cursor.setType(CursorType.Selection);
          }}
        >
          <IconWidget infer="Selection" />
        </Button>
      </Space.Compact>
    );
  };

  const renderResponsiveController = () => {
    if (!use?.includes('SCREEN_TYPE')) {
      return null;
    }
    if (screen.type !== ScreenType.Responsive) {
      return null;
    }

    return (
      <Fragment>
        <InputNumber
          size="small"
          value={screen.width}
          style={{ width: 70, textAlign: 'center' }}
          onChange={(value) => {
            sizeReference.current.width = value;
          }}
          onPressEnter={() => {
            screen.setSize(sizeReference.current.width, screen.height);
          }}
        />

        <IconWidget
          size={10}
          infer="Close"
          style={{ padding: '0 3px', color: '#999' }}
        />

        <InputNumber
          value={screen.height}
          size="small"
          style={{
            width: 70,
            textAlign: 'center',
            marginRight: 10,
          }}
          onChange={(value) => {
            sizeReference.current.height = value;
          }}
          onPressEnter={() => {
            screen.setSize(screen.width, sizeReference.current.height);
          }}
        />

        {(screen.width !== '100%' || screen.height !== '100%') && (
          <Button
            size="small"
            style={{ marginRight: 20 }}
            onClick={() => {
              screen.resetSize();
            }}
          >
            <IconWidget infer="Recover" />
          </Button>
        )}
      </Fragment>
    );
  };

  const renderScreenTypeController = () => {
    if (!use?.includes('SCREEN_TYPE')) {
      return null;
    }

    return (
      <Space.Compact size="small" style={{ marginRight: 20 }}>
        <Button
          size="small"
          disabled={screen.type === ScreenType.PC}
          onClick={() => {
            screen.setType(ScreenType.PC);
          }}
        >
          <IconWidget infer="PC" />
        </Button>

        <Button
          size="small"
          disabled={screen.type === ScreenType.Mobile}
          onClick={() => {
            screen.setType(ScreenType.Mobile);
          }}
        >
          <IconWidget infer="Mobile" />
        </Button>

        <Button
          size="small"
          disabled={screen.type === ScreenType.Responsive}
          onClick={() => {
            screen.setType(ScreenType.Responsive);
          }}
        >
          <IconWidget infer="Responsive" />
        </Button>
      </Space.Compact>
    );
  };

  const renderMobileController = () => {
    if (!use?.includes('SCREEN_TYPE')) {
      return null;
    }
    if (screen.type !== ScreenType.Mobile) {
      return;
    }

    return (
      <Button
        size="small"
        style={{ marginRight: 20 }}
        onClick={() => {
          screen.setFlip(!screen.flip);
        }}
      >
        <IconWidget
          infer="Flip"
          style={{
            transition: 'all .15s ease-in',
            transform: screen.flip ? 'rotate(-90deg)' : '',
          }}
        />
      </Button>
    );
  };

  return (
    <div style={properties.style} className={cls(prefix, properties.className)}>
      {renderHistoryController()}
      {renderCursorController()}
      {renderScreenTypeController()}
      {renderMobileController()}
      {renderResponsiveController()}
    </div>
  );
});

DesignerToolsWidget.defaultProps = {
  use: ['HISTORY', 'CURSOR', 'SCREEN_TYPE'],
};
