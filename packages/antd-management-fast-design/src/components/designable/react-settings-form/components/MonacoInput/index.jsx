import { Tooltip } from 'antd';
import cls from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { parse, parseExpression } from '@babel/parser';
import { uid } from '@designable/shared';
import Editor, { loader } from '@monaco-editor/react';

import { IconWidget, TextWidget, usePrefix, useTheme } from '../../../react';

import { initMonaco } from './config';
import { format } from './format';

import './styles.less';

export const MonacoInput = ({
  className,
  language,
  defaultLanguage,
  width,
  helpLink,
  helpCode,
  helpCodeViewWidth,
  height,
  onMount,
  onChange,
  ...properties
}) => {
  const [loaded, setLoaded] = useState(false);
  const theme = useTheme();
  const valueReference = useRef('');
  const validateReference = useRef(null);
  const submitReference = useRef(null);
  const declarationReference = useRef([]);
  const extraLibraryReference = useRef(null);
  const monacoReference = useRef();
  const editorReference = useRef();
  const computedLanguage = useRef(language || defaultLanguage);
  const realLanguage = useRef('');
  const unmountedReference = useRef(false);
  const changedReference = useRef(false);
  const uidReference = useRef(uid());
  const prefix = usePrefix('monaco-input');
  const input = properties.value || properties.defaultValue;

  useEffect(() => {
    unmountedReference.current = false;
    initMonaco();
    return () => {
      if (extraLibraryReference.current) {
        extraLibraryReference.current.dispose();
      }
      unmountedReference.current = true;
    };
  }, []);

  useEffect(() => {
    if (monacoReference.current && properties.extraLib) {
      updateExtraLibrary();
    }
  }, [properties.extraLib]);

  const updateExtraLibrary = () => {
    if (extraLibraryReference.current) {
      extraLibraryReference.current.dispose();
    }
    extraLibraryReference.current =
      monacoReference.current?.languages.typescript.typescriptDefaults.addExtraLib(
        properties.extraLib,
        `${uidReference.current}.d.ts`,
      );
  };

  const isFileLanguage = () => {
    const lang = computedLanguage.current;
    return lang === 'javascript' || lang === 'typescript';
  };

  const isExpLanguage = () => {
    const lang = computedLanguage.current;
    return lang === 'javascript.expression' || lang === 'typescript.expression';
  };

  const renderHelper = () => {
    const getHref = () => {
      if (typeof helpLink === 'string') return helpLink;
      if (isFileLanguage()) {
        return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript';
      }
      if (isExpLanguage()) {
        return 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators';
      }
    };
    if (helpLink === false) return null;
    const href = getHref();
    return (
      href && (
        <Tooltip
          title={
            <TextWidget token="SettingComponents.MonacoInput.helpDocument" />
          }
        >
          <div className={prefix + '-helper'}>
            <a target="_blank" href={href} rel="noreferrer">
              <IconWidget infer="Help" />
            </a>
          </div>
        </Tooltip>
      )
    );
  };

  const onMountHandler = (editor, monaco) => {
    editorReference.current = editor;
    monacoReference.current = monaco;
    onMount?.(editor, monaco);
    const model = editor.getModel();
    const currentValue = editor.getValue();
    model['getDesignerLanguage'] = () => computedLanguage.current;
    if (currentValue) {
      format(computedLanguage.current, currentValue)
        .then((content) => {
          editor.setValue(content);

          setLoaded(true);

          return;
        })
        .catch(() => {
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
    if (properties.extraLib) {
      updateExtraLibrary();
    }
    editor.onDidChangeModelContent(() => {
      onChangeHandler(editor.getValue());
    });
  };

  const submit = () => {
    clearTimeout(submitReference.current);
    submitReference.current = setTimeout(() => {
      onChange?.(valueReference.current);
    }, 1000);
  };

  const validate = () => {
    if (realLanguage.current === 'typescript') {
      clearTimeout(validateReference.current);
      validateReference.current = setTimeout(() => {
        try {
          if (valueReference.current) {
            if (isFileLanguage()) {
              parse(valueReference.current, {
                sourceType: 'module',
                plugins: ['typescript', 'jsx'],
              });
            } else if (isExpLanguage()) {
              parseExpression(valueReference.current, {
                plugins: ['typescript', 'jsx'],
              });
            }
          }
          monacoReference.current?.editor.setModelMarkers(
            editorReference.current?.getModel(),
            computedLanguage.current,
            [],
          );
          declarationReference.current =
            editorReference.current?.deltaDecorations(
              declarationReference.current,
              [
                {
                  range: monacoReference.current
                    ? new monacoReference.current.Range(1, 1, 1, 1)
                    : undefined,
                  options: {},
                },
              ],
            );
          submit();
        } catch (error_) {
          declarationReference.current =
            editorReference.current?.deltaDecorations(
              declarationReference.current,
              [
                {
                  range: monacoReference.current
                    ? new monacoReference.current.Range(
                        error_.loc.line,
                        error_.loc.column,
                        error_.loc.line,
                        error_.loc.column,
                      )
                    : undefined,
                  options: {
                    isWholeLine: true,
                    glyphMarginClassName: 'monaco-error-highline',
                  },
                },
              ],
            );
          monacoReference.current?.editor.setModelMarkers(
            editorReference.current?.getModel(),
            computedLanguage.current,
            [
              {
                code: '1003',
                severity: 8,
                startLineNumber: error_.loc.line,
                startColumn: error_.loc.column,
                endLineNumber: error_.loc.line,
                endColumn: error_.loc.column,
                message: error_.message,
              },
            ],
          );
        }
      }, 240);
    } else {
      submit();
      declarationReference.current = editorReference.current?.deltaDecorations(
        declarationReference.current,
        [
          {
            range: monacoReference.current
              ? new monacoReference.current.Range(1, 1, 1, 1)
              : undefined,
            options: {},
          },
        ],
      );
    }
  };

  const onChangeHandler = (value) => {
    changedReference.current = true;
    valueReference.current = value;
    validate();
  };
  computedLanguage.current = language || defaultLanguage;
  realLanguage.current = /javascript|typescript/gi.test(
    computedLanguage.current,
  )
    ? 'typescript'
    : computedLanguage.current;

  const renderHelpCode = () => {
    if (!helpCode) return null;
    return (
      <div
        className={prefix + '-view'}
        style={{ width: helpCodeViewWidth || '50%' }}
      >
        <Editor
          value={helpCode}
          theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={{
            ...properties.options,
            lineNumbers: 'off',
            readOnly: true,
            glyphMargin: false,
            folding: false,
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            minimap: {
              enabled: false,
            },
            tabSize: 2,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              alwaysConsumeMouseWheel: false,
            },
          }}
          width="100%"
          height="100%"
        />
      </div>
    );
  };

  return (
    <div
      className={cls(prefix, className, {
        loaded,
      })}
      style={{ width, height }}
    >
      {renderHelper()}
      <div className={prefix + '-view'}>
        <Editor
          {...properties}
          theme={theme === 'dark' ? 'monokai' : 'chrome-devtools'}
          defaultLanguage={realLanguage.current}
          language={realLanguage.current}
          options={{
            glyphMargin: true,
            ...properties.options,
            tabSize: 2,
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 5,
              horizontalScrollbarSize: 5,
              alwaysConsumeMouseWheel: false,
            },
          }}
          value={input}
          width="100%"
          height="100%"
          onMount={onMountHandler}
        />
      </div>
      {renderHelpCode()}
    </div>
  );
};

MonacoInput.loader = loader;
