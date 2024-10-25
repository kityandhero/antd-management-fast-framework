import React, { PureComponent } from 'react';

import {
  canToNumber,
  checkInCollection,
  filter,
  isArray,
  isEmptyArray,
  isFunction,
  toNumber,
  toString,
} from 'easy-soft-utility';

import {
  CenterBox,
  ColorText,
  FlexBox,
  ImageBox,
  VerticalBox,
} from 'antd-management-fast-component';

import { LineApply } from './Items/LineApply';
import { LineApprove } from './Items/LineApprove';
import {
  colorDefault,
  colorStyle,
  documentTitleStyle,
  fontFamilyStyle,
  labelFrontStyle,
  lineStyle,
  valueFrontStyle,
} from './constant';
import { GeneralConfigBox } from './GeneralConfigBox';
import { ItemConfigBox } from './ItemConfigBox';
import { LineItem, LineRemark } from './Items';
import {
  adjustItem,
  adjustItemCollection,
  adjustValueCollection,
} from './tools';

function transferNodeList(approveList, allApproveProcessList) {
  let nodeList = [];

  const approveListAdjust = isArray(approveList) ? approveList : [];
  const allApproveProcessListAdjust = isArray(allApproveProcessList)
    ? allApproveProcessList
    : [];

  if (isEmptyArray(allApproveProcessListAdjust)) {
    nodeList = [...approveListAdjust];
  } else {
    const approveNodeIdList = approveListAdjust.map((o) => o.nodeId);

    for (const one of allApproveProcessListAdjust) {
      const { nodeId } = {
        nodeId: '',
        ...one,
      };

      if (checkInCollection(approveNodeIdList, nodeId)) {
        const listFilter = filter(approveListAdjust, (item) => {
          const { nodeId: nodeIdItem } = {
            nodeId: '',
            ...item,
          };

          return nodeIdItem === nodeId;
        });

        if (listFilter.length > 0) {
          nodeList.push(listFilter[0]);
        } else {
          nodeList.push(one);
        }
      } else {
        nodeList.push(one);
      }
    }
  }

  const nodeListAdjust = nodeList.map((o) => {
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

  return nodeListAdjust;
}

const defaultProperties = {
  printAreaId: '',
  showToolbar: true,
  showRemark: true,
  showTitle: true,
  general: {},
  items: [],
  values: {},
  style: null,
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
  onItemsChange: null,
  onGeneralChange: null,
  designMode: false,
  useRemark: false,
  showApply: false,
  applyList: [],
  showAttention: false,
  attentionList: [],
  approveList: [],
  allApproveProcessList: [],
  remarkTitle: '备注',
  remarkName: 'remark',
  remarkList: [],
  showQRCode: false,
  qRCodeTitle: '防伪二维码:',
  qRCodeDescription: '扫码查看防伪标识',
  qRCodeImage: '',
  qRCodeHeight: 40,
  qRCodeStyle: {},
  showSerialNumber: false,
  serialNumberTitle: '流水号',
  serialNumberContent: '',
};

class DocumentContent extends PureComponent {
  constructor(properties) {
    super(properties);

    this.state = {
      ...this.state,
      currentItem: null,
      currentHighlightMode: '',
    };
  }

  buildFooter = () => {
    const {
      showQRCode,
      qRCodeTitle,
      qRCodeDescription,
      qRCodeImage,
      qRCodeHeight,
      qRCodeStyle,
      showSerialNumber,
      serialNumberTitle,
      serialNumberContent,
    } = this.props;

    const paddingTop = 8;

    const qRCodeHeightAdjust = canToNumber(qRCodeHeight)
      ? toNumber(qRCodeHeight)
      : defaultProperties.qRCodeHeight;

    if (!showQRCode && !showSerialNumber) {
      return null;
    }

    if (showQRCode && showSerialNumber) {
      return (
        <div
          style={{
            height: `${qRCodeHeightAdjust}px`,
            paddingTop: `${paddingTop}px`,
          }}
        >
          <FlexBox
            flexAuto="left"
            style={{ width: '100%' }}
            left={
              <FlexBox
                flexAuto="top"
                top={
                  <div>
                    <ColorText text={serialNumberTitle} />
                  </div>
                }
                bottom={
                  <div>
                    <ColorText text={serialNumberContent} />
                  </div>
                }
              />
            }
            right={
              <div style={{ ...qRCodeStyle, width: `${qRCodeHeightAdjust}px` }}>
                <ImageBox src={qRCodeImage} />
              </div>
            }
          />
        </div>
      );
    }

    if (showSerialNumber) {
      return (
        <div
          style={{
            height: '22px',
            paddingTop: `${paddingTop}px`,
          }}
        >
          <VerticalBox fillWidth>
            <FlexBox
              flexAuto="left"
              style={{ width: '100%' }}
              left={<ColorText text={serialNumberTitle} />}
              right={<ColorText text={serialNumberContent} />}
            />
          </VerticalBox>
        </div>
      );
    }

    if (showQRCode) {
      return (
        <div
          style={{
            height: `${qRCodeHeightAdjust}px`,
            paddingTop: `${paddingTop}px`,
          }}
        >
          <FlexBox
            flexAuto="left"
            style={{ width: '100%' }}
            left={
              <FlexBox
                flexAuto="top"
                top={
                  <div>
                    <ColorText text={qRCodeTitle} />
                  </div>
                }
                bottom={
                  <div>
                    <ColorText text={qRCodeDescription} />
                  </div>
                }
              />
            }
            right={
              <div style={{ ...qRCodeStyle, width: `${qRCodeHeightAdjust}px` }}>
                <ImageBox src={qRCodeImage} />
              </div>
            }
          />
        </div>
      );
    }
  };

  onCellClick = (o, highlightMode) => {
    this.setState({ currentItem: o, currentHighlightMode: highlightMode });
  };

  onGeneralChange = (o) => {
    const { general, onGeneralChange: onGeneralChangeCallback } = this.props;

    if (!isFunction(onGeneralChangeCallback)) {
      return;
    }

    onGeneralChangeCallback({ ...general, ...o });
  };

  onItemChange = (item) => {
    const { items, onItemsChange: onItemsChangeCallback } = this.props;

    if (!isFunction(onItemsChangeCallback)) {
      return;
    }

    if (isArray(items)) {
      const {
        name,
        fullLine,
        currencyDisplay,
        firstPosition,
        width,
        height,
        valueDisplayMode,
      } = adjustItem(item);

      let current = null;

      const itemsAdjust = items.map((o) => {
        const { name: nameItem } = o;

        if (nameItem === name) {
          current = {
            ...o,
            fullLine: toString(fullLine),
            currencyDisplay: toString(currencyDisplay),
            firstPosition: toString(firstPosition),
            width: toString(width),
            height: toString(height),
            valueDisplayMode: toString(valueDisplayMode),
          };

          return current;
        } else {
          return o;
        }
      });

      if (current != null) {
        this.setState({ currentItem: current });
      }

      onItemsChangeCallback(itemsAdjust);
    }
  };

  render() {
    const {
      printAreaId,
      showToolbar,
      showRemark,
      values: valuesSource,
      general,
      items: itemsSource,
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
      designMode,
      showApply,
      applyList,
      showAttention,
      attentionList,
      approveList,
      allApproveProcessList,
      remarkTitle,
      remarkName,
      remarkList,
      signetStyle,
    } = this.props;
    const { currentItem, currentHighlightMode } = this.state;

    const { name: currentName } = { name: '', ...currentItem };

    const values = adjustValueCollection(valuesSource);
    const items = adjustItemCollection(itemsSource);

    const lineAdjustStyle = {
      borderBottom: `1px solid ${color}`,
      ...lineStyle,
    };

    const labelBoxStyle = {
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '10px',
      paddingRight: '10px',
      borderLeft: `1px solid ${color}`,
      borderRight: `1px solid ${color}`,
      width: `${labelColumnWidth}px`,
      textAlign: 'center',
      ...labelFrontStyle,
      ...colorStyle,
      ...fontFamilyStyle,
      ...labelColumnStyle,
    };

    const valueBoxStyle = {
      borderRight: `1px solid ${color}`,
      ...valueFrontStyle,
      ...colorStyle,
      ...fontFamilyStyle,
      ...valueColumnStyle,
    };

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

    return (
      <div
        id={printAreaId || ''}
        style={{
          paddingLeft: '60px',
          paddingRight: '60px',
          ...(showToolbar ? { paddingBottom: '40px' } : { paddingBottom: '0' }),
          margin: '0 auto',
          width: '920px',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            ...titleContainerStyle,
            ...(showToolbar
              ? { paddingTop: '50px', paddingBottom: '10px' }
              : { paddingTop: '0', paddingBottom: '0' }),
            position: 'relative',
          }}
        >
          {showTitle ? (
            <CenterBox>
              <div
                style={{
                  textAlign: 'center',
                  ...documentTitleStyle,
                  ...colorStyle,
                  ...fontFamilyStyle,
                  ...titleStyle,
                }}
              >
                {title}
              </div>
            </CenterBox>
          ) : null}

          {designMode ? (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '44px',
                top: '2px',
                left: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
              }}
            >
              <FlexBox
                flexAuto="right"
                style={{
                  height: '100%',
                  marginLeft: '4px',
                }}
                left={
                  <CenterBox>
                    <GeneralConfigBox
                      data={general}
                      onChange={this.onGeneralChange}
                    />
                  </CenterBox>
                }
                right={
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'row-reverse',
                    }}
                  >
                    {currentItem == null ? null : (
                      <div style={{ height: '100%', marginRight: '4px' }}>
                        <CenterBox>
                          <ItemConfigBox
                            data={currentItem}
                            highlightMode={currentHighlightMode}
                            onChange={this.onItemChange}
                          />
                        </CenterBox>
                      </div>
                    )}
                  </div>
                }
              />
            </div>
          ) : null}
        </div>

        <div
          style={{
            borderTop: `1px solid ${color}`,
            ...style,
          }}
        >
          {items.map((item) => {
            let itemAdjust;

            if (isArray(item)) {
              if (item.length <= 0) {
                return null;
              } else {
                itemAdjust = item[0];
              }
            } else {
              itemAdjust = item;
            }

            const { key } = itemAdjust;

            return (
              <LineItem
                key={key}
                values={values}
                general={general}
                data={item}
                currentName={currentName}
                highlightMode={currentHighlightMode}
                designMode={designMode}
                lineStyle={lineAdjustStyle}
                labelBoxStyle={labelBoxStyle}
                valueBoxStyle={valueBoxStyle}
                labelContainerStyle={labelContainerStyle}
                valueContainerStyle={valueContainerStyle}
                onClick={(o, highlightMode) => {
                  this.onCellClick(o, highlightMode);
                }}
                onChange={this.onItemChange}
              />
            );
          })}

          {showApply &&
          isArray(applyListAdjust) &&
          !isEmptyArray(applyListAdjust)
            ? applyListAdjust.map((o, index) => {
                return (
                  <LineApply
                    key={`attention_item_${index}`}
                    data={o}
                    general={general}
                    currentName={currentName}
                    highlightMode={currentHighlightMode}
                    designMode={designMode}
                    lineStyle={lineAdjustStyle}
                    labelBoxStyle={labelBoxStyle}
                    valueBoxStyle={valueBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueContainerStyle={valueContainerStyle}
                    signetStyle={signetStyle}
                  />
                );
              })
            : null}

          {showAttention &&
          isArray(attentionListAdjust) &&
          !isEmptyArray(attentionListAdjust)
            ? attentionListAdjust.map((o, index) => {
                return (
                  <LineApprove
                    key={`attention_item_${index}`}
                    data={o}
                    general={general}
                    currentName={currentName}
                    highlightMode={currentHighlightMode}
                    designMode={designMode}
                    lineStyle={lineAdjustStyle}
                    labelBoxStyle={labelBoxStyle}
                    valueBoxStyle={valueBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueContainerStyle={valueContainerStyle}
                    signetStyle={signetStyle}
                  />
                );
              })
            : null}

          {isArray(nodeListAdjust)
            ? nodeListAdjust.map((o, index) => {
                return (
                  <LineApprove
                    key={`approve_item_${index}`}
                    data={o}
                    general={general}
                    currentName={currentName}
                    highlightMode={currentHighlightMode}
                    designMode={designMode}
                    lineStyle={lineAdjustStyle}
                    labelBoxStyle={labelBoxStyle}
                    valueBoxStyle={valueBoxStyle}
                    labelContainerStyle={labelContainerStyle}
                    valueContainerStyle={valueContainerStyle}
                    signetStyle={signetStyle}
                  />
                );
              })
            : null}

          {showRemark ? (
            <LineRemark
              title={remarkTitle}
              name={remarkName}
              value={
                isArray(remarkList)
                  ? remarkList.map((o) => toString(o)).join('')
                  : toString(remarkList)
              }
              general={general}
              currentName={currentName}
              highlightMode={currentHighlightMode}
              designMode={designMode}
              lineStyle={lineAdjustStyle}
              labelBoxStyle={labelBoxStyle}
              valueBoxStyle={valueBoxStyle}
              labelContainerStyle={labelContainerStyle}
              valueContainerStyle={valueContainerStyle}
            />
          ) : null}
        </div>

        {this.buildFooter()}
      </div>
    );
  }
}

DocumentContent.defaultProps = {
  ...defaultProperties,
};

export { DocumentContent };
