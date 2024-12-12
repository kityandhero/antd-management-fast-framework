import React, { PureComponent } from 'react';

import { canToNumber, isArray, isFunction, toNumber } from 'easy-soft-utility';

import {
  CenterBox,
  ColorText,
  FlexBox,
  ImageBox,
  VerticalBox,
} from 'antd-management-fast-component';

import { CellApply } from './Cells/CellApply';
import { CellAttention } from './Cells/CellAttention';
import {
  CellApproval,
  CellEnum,
  CellMoney,
  CellRemark,
  CellText,
} from './Cells';
import {
  colorDefault,
  colorStyle,
  documentTitleStyle,
  fontFamilyStyle,
  valueDisplayModeCollection,
} from './constant';
import { GeneralConfigBox } from './GeneralConfigBox';
import { adjustCellConfig } from './tools';

const defaultProperties = {
  printAreaId: '',
  showToolbar: true,
  showTitle: true,
  general: {},
  style: null,
  color: colorDefault,
  borderWidth: 1,
  borderColor: '#000',
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
      currentHighlighTag: '',
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

  // eslint-disable-next-line no-unused-vars
  onCellClick = ({ data, highlightMode, uniqueTag }) => {
    this.setState({
      currentHighlightMode: highlightMode,
      currentHighlighTag: uniqueTag,
    });
  };

  onGeneralChange = (o) => {
    const { general, onGeneralChange: onGeneralChangeCallback } = this.props;

    if (!isFunction(onGeneralChangeCallback)) {
      return;
    }

    onGeneralChangeCallback({ ...general, ...o });
  };

  onConfigChange = (item) => {
    const { onConfigChange: onConfigChangeCallback } = this.props;

    if (!isFunction(onConfigChangeCallback)) {
      return;
    }

    onConfigChangeCallback(adjustCellConfig(item));
  };

  render() {
    const {
      printAreaId,
      showToolbar,
      generalConfig,
      style,
      borderWidth,
      borderColor,
      title,
      titleContainerStyle,
      titleStyle,
      showTitle,
      rows,
      designMode,
      signetStyle,
    } = this.props;
    const { currentHighlighTag } = this.state;

    const rowCollection = isArray(rows) ? rows : [];

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
              <CenterBox>
                <GeneralConfigBox
                  data={generalConfig}
                  onChange={this.onGeneralChange}
                />
              </CenterBox>
            </div>
          ) : null}
        </div>

        <table
          style={{
            // borderTop: `1px solid ${color}`,
            ...style,
            width: '100%',
          }}
          border={borderWidth}
          // eslint-disable-next-line react/no-unknown-property
          bordercolor={borderColor}
        >
          <tbody>
            {rowCollection.map((o, index) => {
              return (
                <tr key={`tr_${index}`}>
                  {o.map((one, indexCell) => {
                    const {
                      uniqueTag,
                      content,
                      // width,
                      highlightMode,
                      spanRow,
                      spanColumn,
                      valueDisplayMode,
                    } = one;

                    if (valueDisplayMode === valueDisplayModeCollection.text) {
                      return (
                        <CellText
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    if (valueDisplayMode === valueDisplayModeCollection.money) {
                      return (
                        <CellMoney
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    if (valueDisplayMode === valueDisplayModeCollection.enum) {
                      return (
                        <CellEnum
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    if (valueDisplayMode === valueDisplayModeCollection.apply) {
                      return (
                        <CellApply
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          signetStyle={signetStyle}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    if (
                      valueDisplayMode === valueDisplayModeCollection.attention
                    ) {
                      return (
                        <CellAttention
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          signetStyle={signetStyle}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    if (
                      valueDisplayMode === valueDisplayModeCollection.approval
                    ) {
                      return (
                        <CellApproval
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          signetStyle={signetStyle}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    if (
                      valueDisplayMode === valueDisplayModeCollection.remark
                    ) {
                      return (
                        <CellRemark
                          key={`tr_${index}_td_${indexCell}`}
                          uniqueTag={uniqueTag}
                          highlighTag={currentHighlighTag}
                          content={content}
                          data={one || {}}
                          highlightMode={highlightMode}
                          designMode={designMode || false}
                          spanRow={spanRow}
                          spanColumn={spanColumn}
                          onClick={(o) => {
                            this.onCellClick(o);
                          }}
                          onConfigChange={this.onConfigChange}
                        />
                      );
                    }

                    return null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {this.buildFooter()}
      </div>
    );
  }
}

DocumentContent.defaultProps = {
  ...defaultProperties,
};

export { DocumentContent };

export { highlightModeCollection, nodeApply, nodeAttention } from './constant';
