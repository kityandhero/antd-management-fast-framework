import { Button } from 'antd';
import React from 'react';
import ReactToPrint from 'react-to-print';

import { isArray, isFunction, toMd5 } from 'easy-soft-utility';

import {
  BaseComponent,
  buildButton,
  CenterBox,
  EverySpace,
  iconBuilder,
  PageExtra,
} from 'antd-management-fast-component';

import {
  adjustSchemaData,
  getInitializeGeneral,
  getInitializeItem,
} from './DocumentContent/tools';
import { DocumentContent } from './DocumentContent';

import styles from './index.less';

const { ToolBar } = PageExtra;

const colorDefault = '#000';

class DocumentPrintDesigner extends BaseComponent {
  componentRef = null;

  imageTargetRef = React.createRef();

  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      designMode: false,
      schemaTag: '',
      generalOriginal: {},
      itemsOriginal: [],
      general: {},
      items: [],
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const { schema } = nextProperties;
    const { schemaTag } = previousState;

    if (toMd5(JSON.stringify(schema || {})) != schemaTag) {
      const { general, items } = adjustSchemaData(schema);

      return {
        schemaTag: toMd5(JSON.stringify(schema || [])),
        general,
        items: [...items],
        generalOriginal: general,
        itemsOriginal: [...items],
      };
    }

    return null;
  }

  setComponentRef = (reference) => {
    this.componentRef = reference;
  };

  initializeDesign = () => {
    const { itemsOriginal } = this.state;

    if (isArray(itemsOriginal)) {
      const itemsAdjust = itemsOriginal.map((o) => {
        return {
          ...getInitializeItem(),
          ...o,
        };
      });

      this.setState({
        general: getInitializeGeneral(),
        items: [...itemsAdjust],
      });
    } else {
      this.setState({ general: getInitializeGeneral(), items: [] });
    }
  };

  reset = () => {
    const { generalOriginal, itemsOriginal } = this.state;

    this.setState({
      general: generalOriginal,
      items: [...itemsOriginal],
    });
  };

  onGeneralChange = (o) => {
    this.setState({ general: o || {} });
  };

  onItemsChange = (list) => {
    this.setState({ items: [...list] });
  };

  save = () => {
    const { onSave } = this.props;

    if (!isFunction(onSave)) {
      return;
    }

    const { general, items } = this.state;

    onSave({ general, items });
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
      <Button type="dashed" icon={iconBuilder.printer()} size="small">
        打印预览
      </Button>
    );
  };

  render() {
    const {
      showToolbar,
      showRemark,
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
      showTitle,
      approveList,
      remarkTitle,
      remarkName,
      remarkList,
    } = this.props;
    const { designMode, general, items } = this.state;

    const p = {
      showToolbar,
      showRemark,
      values,
      general,
      items,
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
      showTitle,
      approveList,
      remarkTitle,
      remarkName,
      remarkList,
      onGeneralChange: this.onGeneralChange,
      onItemsChange: this.onItemsChange,
    };

    return (
      <>
        <div className={styles.documentPrintDesigner}>
          <CenterBox>
            <div>
              {showToolbar ? (
                <EverySpace size={10} direction="horizontal" />
              ) : null}

              {showToolbar ? (
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
              ) : null}

              <EverySpace size={10} direction="horizontal" />

              <div ref={this.imageTargetRef}>
                <DocumentContent
                  ref={this.setComponentRef}
                  {...p}
                  designMode={designMode}
                />
              </div>
            </div>
          </CenterBox>

          <EverySpace size={10} direction="horizontal" />
        </div>
      </>
    );
  }
}

DocumentPrintDesigner.defaultProps = {
  values: {},
  schema: {},
  style: null,
  showToolbar: true,
  canDesign: false,
  color: colorDefault,
  title: '表格标题',
  titleContainerStyle: null,
  titleStyle: null,
  showTitle: true,
  labelColumnWidth: 140,
  labelColumnStyle: null,
  labelContainerStyle: null,
  labelStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
  approveList: [],
  showRemark: true,
  remarkTitle: '备注',
  remarkName: 'remark',
  remarkList: [],
  onChange: null,
};

export { DocumentPrintDesigner };
