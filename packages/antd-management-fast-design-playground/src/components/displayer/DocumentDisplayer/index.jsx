import { Button, Space } from 'antd';
import React, { PureComponent } from 'react';
import ReactToPrint from 'react-to-print';

import { isArray, whetherString } from 'easy-soft-utility';

import { CenterBox, iconBuilder } from 'antd-management-fast-component';

import { DocumentContent } from './DocumentContent';

const colorDefault = '#000';

class DocumentDisplayer extends PureComponent {
  componentRef = null;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      designMode: true,
    };
  }

  setComponentRef = (reference) => {
    this.componentRef = reference;
  };

  reset = () => {
    const { schema, onChange: onChangeCallback } = this.props;

    if (isArray(schema)) {
      const schemaAdjust = schema.map((o) => {
        const {
          title,
          name: nameItem,
          type,
        } = {
          ...o,
        };

        return {
          title,
          name: nameItem,
          type,
          fullLine: whetherString.yes,
        };
      });

      onChangeCallback(schemaAdjust);
    } else {
      onChangeCallback(schema);
    }
  };

  openDesignMode = () => {
    this.setState({
      designMode: true,
    });
  };

  closeDesignMode = () => {
    this.setState({
      designMode: false,
    });
  };

  renderPrintContent = () => {
    return this.componentRef;
  };

  renderTrigger = () => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return (
      <Button type="dashed" icon={iconBuilder.file()} size="small">
        打印预览
      </Button>
    );
  };

  render() {
    const {
      schema,
      style,
      color,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
      onChange: onChangeCallback,
    } = this.props;
    const { designMode } = this.state;

    const p = {
      schema,
      style,
      color,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
      onChange: onChangeCallback,
    };

    return (
      <>
        <div
          style={{
            position: 'relative',
            height: '100%',
          }}
        >
          <div style={{ position: 'absolute', top: '00px', right: '80px' }}>
            <Space>
              {designMode ? (
                <Button
                  icon={iconBuilder.form()}
                  size="small"
                  onClick={this.closeDesignMode}
                >
                  关闭设计
                </Button>
              ) : null}

              {designMode ? (
                <Button
                  icon={iconBuilder.redo()}
                  size="small"
                  onClick={this.reset}
                >
                  重置设置
                </Button>
              ) : null}

              {designMode ? null : (
                <Button
                  icon={iconBuilder.form()}
                  size="small"
                  onClick={this.openDesignMode}
                >
                  开启设计
                </Button>
              )}

              {designMode ? null : (
                <ReactToPrint
                  content={this.renderPrintContent}
                  documentTitle="文档"
                  // onAfterPrint={this.handleAfterPrint}
                  // onBeforeGetContent={this.handleOnBeforeGetContent}
                  // onBeforePrint={this.handleBeforePrint}
                  removeAfterPrint
                  trigger={this.renderTrigger}
                />
              )}
            </Space>
          </div>

          <div>
            <CenterBox>
              <DocumentContent
                ref={this.setComponentRef}
                {...p}
                designMode={designMode}
              />
            </CenterBox>
          </div>
        </div>
      </>
    );
  }
}

DocumentDisplayer.defaultProps = {
  schema: {},
  style: null,
  color: colorDefault,
  title: '表格标题',
  titleContainerStyle: null,
  titleStyle: null,
  labelColumnWidth: 140,
  labelColumnStyle: null,
  labelContainerStyle: null,
  labelStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
  onChange: null,
};

export { DocumentDisplayer };
