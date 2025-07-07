import { Switch, Tooltip } from 'antd';
import React from 'react';
import generatePDF from 'react-to-pdf';

import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  filter,
  isArray,
  isFunction,
  logException,
  showOpenMessage,
  showSimpleErrorMessage,
  showSimpleWarningMessage,
  toMd5,
  toString,
} from 'easy-soft-utility';

import {
  BaseComponent,
  buildButton,
  CenterBox,
  EverySpace,
  FadeBox,
  iconBuilder,
  PageExtra,
  SyntaxHighlighter,
  VerticalBox,
} from 'antd-management-fast-component';

import { valueDisplayModeCollection } from './DocumentContent/constant';
import {
  adjustConfigureList,
  adjustSchemaData,
  adjustValueCollection,
  buildRowCell,
  filterItemConfig,
  getInitializeGeneral,
  getInitializeTitleConfig,
  transferNodeList,
} from './DocumentContent/tools';
import { DocumentContent, highlightModeCollection } from './DocumentContent';

import styles from './index.less';

const { ToolBar } = PageExtra;

const colorDefault = '#000';

const defaultProperties = {
  values: {},
  schema: {},
  style: null,
  showToolbar: true,
  canDesign: false,
  showIndependentPrint: false,
  color: colorDefault,
  title: '表格标题',
  titleContainerStyle: null,
  titleStyle: null,
  labelColumnWidth: 140,
  labelColumnStyle: null,
  labelContainerStyle: null,
  labelStyle: null,
  signetStyle: null,
  valueColumnStyle: null,
  valueContainerStyle: null,
  valueStyle: null,
  formItems: [],
  showApply: false,
  applyList: [],
  showAttention: false,
  attentionList: [],
  approveList: [],
  allApproveProcessList: [],
  showRemark: true,
  remarkList: [],
  qRCodeImage: '',
  qRCodeTitle: '防伪二维码:',
  qRCodeDescription: '扫码查看防伪标识',
  qRCodeHeight: 40,
  qRCodeStyle: {},
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
      configDrawerVisible: false,
      debugSwitch: false,
      designMode: false,
      configureBuildTag: '',
      configureList: [],
      generalConfig: {},
      titleConfig: {},
      generalConfigOriginal: {},
      formItemsOriginal: [],
      formItems: [],
      documentTempUrl: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const {
      schema,
      formItems,
      applyList,
      attentionList,
      allApproveProcessList,
    } = nextProperties;
    const { configureBuildTag } = previousState;

    const dataWillBuild = {
      schema,
      formItems,
      applyList,
      attentionList,
      allApproveProcessList,
    };

    const configureBuildTagNext = toMd5(JSON.stringify(dataWillBuild || {}));

    let data = {};

    if (configureBuildTagNext != configureBuildTag) {
      const {
        generalConfig,
        titleConfig,
        configureList: configureSourceList,
      } = adjustSchemaData(schema);

      const { configureList } = adjustConfigureList({
        generalConfig,
        configureList: configureSourceList,
        formItems,
        applyList,
        attentionList,
        allApproveProcessList,
      });

      data = {
        configureBuildTag: configureBuildTagNext,
        generalConfig: { ...generalConfig },
        generalConfigOriginal: { ...generalConfig },
        titleConfig: { ...titleConfig },
        titleConfigOriginal: { ...titleConfig },
        configureList: [...configureList],
        formItems: [...formItems],
        formItemsOriginal: [...formItems],
        documentTempUrl: '',
      };
    }

    return {
      ...data,
    };
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
    const { formItems, applyList, attentionList, allApproveProcessList } =
      this.props;

    const generalConfig = getInitializeGeneral();

    const { configureList } = adjustConfigureList({
      generalConfig,
      configureList: [],
      formItems,
      applyList,
      attentionList,
      allApproveProcessList,
    });

    this.setState({
      generalConfig,
      titleConfig: getInitializeTitleConfig(),
      configureList: [...configureList],
    });
  };

  reset = () => {
    const {
      schema,
      formItems,
      applyList,
      attentionList,
      allApproveProcessList,
    } = this.props;

    const { generalConfigOriginal, titleConfigOriginal } = this.state;

    const { generalConfig, configureList: configureSourceList } =
      adjustSchemaData(schema);

    const { configureList } = adjustConfigureList({
      generalConfig: generalConfig,
      configureList: configureSourceList,
      formItems,
      applyList,
      attentionList,
      allApproveProcessList,
    });

    this.setState({
      generalConfig: generalConfigOriginal,
      titleConfig: titleConfigOriginal,
      configureList: [...configureList],
    });
  };

  onGeneralChange = (o) => {
    this.setState({ generalConfig: o || {} });
  };

  onTitleConfigChange = (o) => {
    this.setState({ titleConfig: o || {} });
  };

  onConfigChange = (o) => {
    const { configureList } = this.state;

    const {
      key: configKey,
      highlightMode: configHighlightMode,
      valueDisplayMode,
      firstPosition,
      width,
      height,
      spanRow,
      spanColumn,
    } = {
      key: '',
      highlightMode: '',
      valueDisplayMode: valueDisplayModeCollection.text,
      ...o,
    };

    if (checkStringIsNullOrWhiteSpace(configKey)) {
      showSimpleErrorMessage('配置项的 key 不能为空');

      return;
    }

    if (checkStringIsNullOrWhiteSpace(configHighlightMode)) {
      showSimpleErrorMessage('配置项的 highlightMode 不能为空');

      return;
    }

    if (
      !checkInCollection(
        [highlightModeCollection.label, highlightModeCollection.value],
        configHighlightMode,
      )
    ) {
      showSimpleErrorMessage(
        `配置项的 highlightMode 值无效 -> ${configHighlightMode}`,
      );

      return;
    }

    let existConfig = false;
    const configureChangedList = [];

    for (const config of configureList) {
      const { key } = { key: '', ...config };

      const data = { ...config };

      if (key !== configKey) {
        configureChangedList.push(data);

        continue;
      }

      if (configHighlightMode === highlightModeCollection.label) {
        data.labelConfig = {
          ...data.labelConfig,
          firstPosition: toString(firstPosition),
          width: toString(width),
          height: toString(height),
          spanRow: toString(spanRow),
          spanColumn: toString(spanColumn),
        };
      }

      if (configHighlightMode === highlightModeCollection.value) {
        data.valueDisplayMode = valueDisplayMode;

        data.valueConfig = {
          ...data.valueConfig,
          firstPosition: toString(firstPosition),
          width: toString(width),
          height: toString(height),
          spanRow: toString(spanRow),
          spanColumn: toString(spanColumn),
        };
      }

      configureChangedList.push(data);

      existConfig = true;
    }

    if (!existConfig) {
      showSimpleWarningMessage(`未匹配到配置项的 key -> ${configKey}`);

      return;
    }

    this.setState({ configureList: [...configureChangedList] });
  };

  onSortChange = (list) => {
    const { configureList } = this.state;

    const listKey = list.map((o) => {
      const { key } = { key: '', ...o };

      return key;
    });

    const filterSort = filter(configureList, (one) => {
      const { key: keyItem } = one;

      return checkInCollection(listKey, keyItem);
    });

    const filterNoSort = filter(configureList, (one) => {
      const { key: keyItem } = one;

      return !checkInCollection(listKey, keyItem);
    });

    let listChanged = [];

    for (const key of listKey) {
      const l = filter(filterSort, (one) => {
        const { key: keyItem } = one;

        return toString(keyItem) === key;
      });

      listChanged = [...listChanged, ...l];
    }

    listChanged = [...listChanged, ...filterNoSort];

    this.setState({ configureList: [...listChanged] });
  };

  save = () => {
    const { onSave } = {
      ...defaultProperties,
      ...this.props,
    };

    if (!isFunction(onSave)) {
      return;
    }

    const { generalConfig, titleConfig, configureList } = this.state;

    onSave({
      general: generalConfig,
      title: titleConfig,
      items: configureList,
    });
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

  openConfigDrawer = () => {
    this.setState({
      configDrawerVisible: true,
    });
  };

  closeConfigDrawer = () => {
    this.setState({
      configDrawerVisible: false,
    });
  };

  buildRowCollection = () => {
    const {
      showRemark,
      values: valuesSource,
      formItems,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      allApproveProcessList,
      remarkList,
    } = this.props;
    const { generalConfig, configureList } = this.state;

    const { values, valueTexts } = adjustValueCollection(valuesSource);

    const nodeListAdjust = transferNodeList(approveList, allApproveProcessList);

    const applyListAdjust = (isArray(applyList) ? applyList : []).map((o) => {
      const { nodeId, title, note, name, signet, time } = {
        title: '',
        note: '',
        name: '',
        signet: '',
        time: '',
        ...o,
      };

      return {
        nodeId,
        title,
        note,
        name,
        signet,
        time,
      };
    });

    const attentionListAdjust = (
      isArray(attentionList) ? attentionList : []
    ).map((o) => {
      const { nodeId, title, note, name, signet, time } = {
        title: '',
        note: '',
        name: '',
        signet: '',
        time: '',
        ...o,
      };

      return {
        nodeId,
        title,
        note,
        name,
        signet,
        time,
      };
    });

    const rows = buildRowCell({
      generalConfig,
      configureList,
      formItems,
      values,
      valueTexts,
      applyList: showApply ? applyListAdjust : [],
      attentionList: showAttention ? attentionListAdjust : [],
      approveList: nodeListAdjust,
      remarkList: showRemark ? remarkList : [],
    });

    return { rows };
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
      showApply,
      showIndependentPrint,
      applyList,
      showAttention,
      attentionList,
      allApproveProcessList,
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
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      serialNumberTitle,
      serialNumberContent,
    } = {
      ...defaultProperties,
      ...this.props,
    };
    const {
      configDrawerVisible,
      debugSwitch,
      designMode,
      generalConfig,
      titleConfig,
      configureList,
      formItems,
    } = this.state;

    const { rows } = this.buildRowCollection();

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
                        hidden: !designMode,
                        component: (
                          <VerticalBox>
                            <div>
                              <Tooltip
                                placement="top"
                                title={'开启调试后, 界面将会略有卡顿'}
                              >
                                <Switch
                                  checkedChildren="调式-开"
                                  unCheckedChildren="调式-关"
                                  defaultChecked={debugSwitch}
                                  // size="small"
                                  onChange={() => {
                                    this.setState({
                                      debugSwitch: !debugSwitch,
                                    });
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </VerticalBox>
                        ),
                      },
                      {
                        hidden:
                          !debugSwitch || configDrawerVisible || !designMode,
                        component: buildButton({
                          text: '开启数据配置板',
                          size: 'small',
                          icon: iconBuilder.closeCircle(),
                          handleClick: () => {
                            this.openConfigDrawer();
                          },
                        }),
                      },
                      {
                        hidden:
                          !debugSwitch || !configDrawerVisible || !designMode,
                        component: buildButton({
                          text: '关闭数据配置板',
                          size: 'small',
                          icon: iconBuilder.closeCircle(),
                          handleClick: () => {
                            this.closeConfigDrawer();
                          },
                        }),
                      },
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

              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <DocumentContent
                  printAreaId={that.getPrintId()}
                  showToolbar={showToolbar}
                  designMode={designMode}
                  generalConfig={generalConfig}
                  style={style}
                  color={color}
                  labelColumnWidth={labelColumnWidth}
                  labelColumnStyle={labelColumnStyle}
                  labelContainerStyle={labelContainerStyle}
                  valueColumnStyle={valueColumnStyle}
                  valueContainerStyle={valueContainerStyle}
                  title={title}
                  titleContainerStyle={titleContainerStyle}
                  titleStyle={titleStyle}
                  titleConfig={titleConfig}
                  configureList={configureList}
                  rows={rows}
                  signetStyle={signetStyle}
                  qRCodeTitle={qRCodeTitle}
                  qRCodeDescription={qRCodeDescription}
                  qRCodeImage={qRCodeImage}
                  qRCodeHeight={qRCodeHeight}
                  qRCodeStyle={qRCodeStyle}
                  serialNumberTitle={serialNumberTitle}
                  serialNumberContent={serialNumberContent}
                  onGeneralChange={this.onGeneralChange}
                  onTitleConfigChange={this.onTitleConfigChange}
                  onConfigChange={(o) => {
                    this.onConfigChange(o);
                  }}
                  onSortChange={(list) => {
                    this.onSortChange(list);
                  }}
                />

                {!showToolbar && showIndependentPrint ? (
                  <Tooltip title="立即打印文档">
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        padding: '10px',
                        zIndex: 100,
                        fontSize: '18px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
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
                      }}
                    >
                      {iconBuilder.printer()}
                    </div>
                  </Tooltip>
                ) : null}

                {debugSwitch ? (
                  <FadeBox
                    visible={configDrawerVisible}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: '#ccc',
                      zIndex: '101',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: '#fff',
                        padding: '16px 16px 26px 16px',
                        borderRadius: '10px',
                        overflow: 'hidden',
                      }}
                    >
                      <SyntaxHighlighter
                        language="js"
                        value={JSON.stringify(
                          {
                            generalConfig,
                            titleConfig,
                            configureList,
                            formItems,
                            showApply,
                            applyList,
                            showAttention,
                            attentionList,
                            allApproveProcessList,
                            showRemark,
                            values,
                            rows,
                          },
                          null,
                          2,
                        )}
                        other={{ showLineNumbers: true, wrapLines: true }}
                        style={{
                          height: '100%',
                          marginLeft: '0px',
                          marginRight: '0px',
                        }}
                      />
                    </div>
                  </FadeBox>
                ) : null}
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

const filterDocumentPrintDesignerItemConfig = filterItemConfig;

export { DocumentPrintDesigner };

export { nodeApply, nodeAttention } from './DocumentContent';
export {
  CellApply,
  CellApproval,
  CellAttention,
  CellBase,
  CellEnum,
  CellMoney,
  CellRemark,
  CellText,
} from './DocumentContent/Cells';
export { filterDocumentPrintDesignerItemConfig };
