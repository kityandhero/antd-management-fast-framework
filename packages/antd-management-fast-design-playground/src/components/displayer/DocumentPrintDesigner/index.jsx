import React from 'react';
import generatePDF from 'react-to-pdf';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  logException,
  showOpenMessage,
  toMd5,
} from 'easy-soft-utility';

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

const defaultProperties = {
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
  signetStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
  showApply: false,
  applyList: [],
  showAttention: false,
  attentionList: [],
  approveList: [],
  allApproveProcessList: [],
  showRemark: true,
  remarkTitle: '备注',
  remarkName: 'remark',
  remarkList: [],
  showQRCode: false,
  qRCodeImage: '',
  qRCodeTitle: '防伪二维码:',
  qRCodeDescription: '扫码查看防伪标识',
  qRCodeHeight: 40,
  qRCodeStyle: {},
  showSerialNumber: false,
  serialNumberTitle: '流水号',
  serialNumberContent: '',
  onChange: null,
};

// function printDocument(o) {
//   useReactToPrint(o);
// }

class DocumentPrintDesigner extends BaseComponent {
  printButtonCanOperate = true;

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
        documentTempUrl: '',
      };
    }

    return null;
  }

  getPrintId = () => {
    return `${this.keyPrefix}_printBox`;
  };

  getPrintContainerId = () => {
    return `${this.keyPrefix}_printBoxContainer`;
  };

  getTargetDocumentElement = () => {
    const targetId = this.getPrintId();

    // eslint-disable-next-line unicorn/prefer-query-selector
    return document.getElementById(targetId);
  };

  generateDocument = () => {
    const options = {
      method: 'build',
      filename: 'document.pdf',
      page: {
        // margin: 20,
      },
    };

    const that = this;

    that.printButtonCanOperate = false;

    that.setState(
      {
        documentTempUrl: '',
      },
      () => {
        generatePDF(that.getTargetDocumentElement, options)
          .then((o) => {
            console.log(o);

            that.setState({
              documentTempUrl: o.output('bloburi'),
            });

            return;
          })
          .catch((error) => {
            that.setState({
              documentTempUrl: '',
            });

            that.printButtonCanOperate = true;

            logException(error);
          });
      },
    );
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
    const { onSave } = {
      ...defaultProperties,
      ...this.props,
    };

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

  renderPrintContainer = () => {
    const { documentTempUrl } = this.state;

    const that = this;

    if (checkStringIsNullOrWhiteSpace(documentTempUrl)) {
      that.printButtonCanOperate = true;

      return null;
    }

    return (
      <div
        style={{
          display: 'none',
        }}
      >
        <iframe
          src={documentTempUrl}
          onLoad={(event) => {
            event.target.contentWindow.print();

            that.printButtonCanOperate = true;
          }}
        />
      </div>
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
      signetStyle,
      showTitle,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      allApproveProcessList,
      remarkTitle,
      remarkName,
      remarkList,
      showQRCode,
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      showSerialNumber,
      serialNumberTitle,
      serialNumberContent,
    } = {
      ...defaultProperties,
      ...this.props,
    };
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
      signetStyle,
      showTitle,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      allApproveProcessList,
      remarkTitle,
      remarkName,
      remarkList,
      showQRCode,
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      showSerialNumber,
      serialNumberTitle,
      serialNumberContent,
      onGeneralChange: this.onGeneralChange,
      onItemsChange: this.onItemsChange,
    };

    const that = this;

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
                        hidden: !canDesign || designMode,
                        component: buildButton({
                          text: '打印预览',
                          size: 'small',
                          icon: iconBuilder.printer(),
                          handleClick: () => {
                            if (!that.printButtonCanOperate) {
                              return;
                            }

                            showOpenMessage({
                              text: '打印准备中，需要一点点时间，请稍等',
                              duration: 600,
                              onClose: () => {
                                setTimeout(() => {
                                  this.generateDocument();
                                }, 320);
                              },
                            });
                          },
                        }),
                      },
                    ]}
                  />
                </div>
              ) : null}

              <EverySpace size={10} direction="horizontal" />

              <div>
                <DocumentContent
                  printAreaId={that.getPrintId()}
                  {...p}
                  designMode={designMode}
                />
              </div>

              {that.renderPrintContainer()}
            </div>
          </CenterBox>

          <EverySpace size={10} direction="horizontal" />
        </div>
      </>
    );
  }
}

DocumentPrintDesigner.defaultProps = {
  ...defaultProperties,
};

export { DocumentPrintDesigner };
