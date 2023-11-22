import { Button } from 'antd';
import React from 'react';
import ReactToPrint from 'react-to-print';

import { isArray, isFunction, toMd5, whetherString } from 'easy-soft-utility';

import {
  BaseComponent,
  buildButton,
  CenterBox,
  EverySpace,
  iconBuilder,
  PageExtra,
} from 'antd-management-fast-component';

import { DocumentContent } from './DocumentContent';

const { ToolBar } = PageExtra;

const colorDefault = '#000';

class DocumentDisplayer extends BaseComponent {
  componentRef = null;

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      designMode: false,
      schemaTag: '',
      schemaStorage: [],
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { schema } = nextProperties;
    const { schemaTag } = previousState;

    if (toMd5(JSON.stringify(schema || [])) != schemaTag) {
      return {
        schemaTag: toMd5(JSON.stringify(schema || [])),
        schemaStorage: schema || [],
      };
    }

    return null;
  }

  setComponentRef = (reference) => {
    this.componentRef = reference;
  };

  initializeDesign = () => {
    const { schema } = this.props;

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
          width: 0,
          height: 0,
          fullLine: whetherString.yes,
        };
      });

      this.setState({ schemaStorage: schemaAdjust });
    } else {
      this.setState({ schemaStorage: [] });
    }
  };

  reset = () => {
    const { schema } = this.props;

    this.setState({ schemaStorage: schema || [] });
  };

  onChange = (data) => {
    this.setState({ schemaStorage: data || [] });
  };

  save = () => {
    const { onSave } = this.props;

    if (isFunction(onSave)) {
      const { schemaStorage } = this.state;

      onSave(schemaStorage || []);
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
      values,
      style,
      color,
      canDesign,
      labelColumnWidth,
      labelColumnStyle,
      labelContainerStyle,
      valueColumnStyle,
      valueContainerStyle,
      title,
      titleContainerStyle,
      titleStyle,
    } = this.props;
    const { designMode, schemaStorage } = this.state;

    const p = {
      values,
      schema: schemaStorage,
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
      onChange: this.onChange,
    };

    return (
      <>
        <div>
          <CenterBox>
            <div>
              <EverySpace size={10} direction="horizontal" />

              <div style={{ borderRadius: '8px', overflow: 'hidden' }}>
                <ToolBar
                  stick={false}
                  title="操作栏"
                  tools={[
                    {
                      hidden: !canDesign || !designMode,
                      component: buildButton({
                        text: '关闭设计模式',
                        size: 'small',
                        icon: iconBuilder.closeCircle(),
                        handleClick: () => {
                          this.closeDesignMode();
                        },
                      }),
                    },
                    {
                      hidden: !canDesign || !designMode,
                      component: buildButton({
                        text: '初始化设计',
                        size: 'small',
                        icon: iconBuilder.clear(),
                        handleClick: () => {
                          this.initializeDesign();
                        },
                      }),
                    },
                    {
                      hidden: !canDesign || !designMode,
                      component: buildButton({
                        text: '重置设计',
                        size: 'small',
                        icon: iconBuilder.redo(),
                        handleClick: () => {
                          this.reset();
                        },
                      }),
                    },
                    {
                      hidden: !canDesign || !designMode,
                      component: buildButton({
                        text: '保存设计',
                        size: 'small',
                        type: 'primary',
                        icon: iconBuilder.save(),
                        handleClick: () => {
                          this.save();
                        },
                      }),
                    },
                    {
                      hidden: !canDesign || designMode,
                      component: buildButton({
                        text: '开启设计模式',
                        size: 'small',
                        icon: iconBuilder.desktop(),
                        handleClick: () => {
                          this.openDesignMode();
                        },
                      }),
                    },
                    {
                      hidden: designMode,
                      component: (
                        <ReactToPrint
                          content={this.renderPrintContent}
                          documentTitle="文档"
                          // onAfterPrint={this.handleAfterPrint}
                          // onBeforeGetContent={this.handleOnBeforeGetContent}
                          // onBeforePrint={this.handleBeforePrint}
                          removeAfterPrint
                          trigger={this.renderTrigger}
                        />
                      ),
                    },
                  ]}
                />
              </div>

              <EverySpace size={10} direction="horizontal" />

              <DocumentContent
                ref={this.setComponentRef}
                {...p}
                designMode={designMode}
              />
            </div>
          </CenterBox>

          <EverySpace size={10} direction="horizontal" />
        </div>
      </>
    );
  }
}

DocumentDisplayer.defaultProps = {
  values: {},
  schema: {},
  style: null,
  canDesign: false,
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
