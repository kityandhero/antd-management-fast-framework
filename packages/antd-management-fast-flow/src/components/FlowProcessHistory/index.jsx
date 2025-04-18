import { Alert, Divider, Empty, Timeline, Typography } from 'antd';
import React from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
} from 'easy-soft-utility';

import {
  ColorText,
  FlexBox,
  ScrollFacadeBox,
} from 'antd-management-fast-component';

const { Paragraph } = Typography;
function FlowProcessHistory(properties) {
  const {
    style,
    title: boxTitle,
    showTitle,
    showLeftDivider,
    list,
    listItemConvert,
    nextData,
    nextDataConvert,
  } = {
    style: {},
    title: '审批进度',
    showTitle: false,
    showLeftDivider: false,
    canEdit: true,
    list: [],
    listItemConvert: null,
    nextData: null,
    nextDataConvert: null,
    ...properties,
  };

  const nextDataAdjust =
    nextData == null
      ? null
      : isFunction(nextDataConvert)
        ? nextDataConvert(nextData)
        : nextData;

  const l = (isArray(list) ? list : []).map((o) => {
    return isFunction(listItemConvert) ? listItemConvert(o) : o;
  });

  if (nextDataAdjust != null) {
    l.push(nextDataAdjust);
  }

  let inner = null;

  if (l.length <= 0) {
    inner = <Empty />;
  } else {
    const count = l.length;

    const listItem = l.map((o, index) => {
      const {
        titlePrefix,
        title,
        notePrefix,
        note,
        resultPrefix,
        result,
        operatorNamePrefix,
        operatorName,
        timePrefix,
        time,
        icon,
        color,
        compact,
      } = {
        titlePrefix: '审批节点',
        icon: null,
        color: null,
        notePrefix: '审批备注',
        resultPrefix: '审批结果',
        operatorNamePrefix: '审批人',
        timePrefix: '审批时间',
        compact: false,
        ...o,
      };

      return {
        color:
          color ||
          (nextDataAdjust == null
            ? count === index + 1
              ? 'blue'
              : 'gray'
            : 'gray'),
        dot: icon,
        children: (
          <>
            {checkStringIsNullOrWhiteSpace(title) ? null : (
              <Paragraph>
                <ColorText
                  separatorStyle={{ padding: '0 4px 0 2px' }}
                  textPrefix={titlePrefix}
                  text={title}
                />
              </Paragraph>
            )}

            {compact || checkStringIsNullOrWhiteSpace(result) ? null : (
              <Paragraph>
                <ColorText
                  separatorStyle={{ padding: '0 4px 0 2px' }}
                  textPrefix={resultPrefix}
                  text={result}
                />
              </Paragraph>
            )}

            {compact || checkStringIsNullOrWhiteSpace(operatorName) ? null : (
              <Paragraph>
                <ColorText
                  separatorStyle={{ padding: '0 4px 0 2px' }}
                  textPrefix={operatorNamePrefix}
                  text={operatorName}
                />
              </Paragraph>
            )}

            {compact || checkStringIsNullOrWhiteSpace(note) ? null : (
              <Paragraph>
                <ColorText
                  separatorStyle={{ padding: '0 4px 0 2px' }}
                  textPrefix={notePrefix}
                  text={note || '无备注'}
                />
              </Paragraph>
            )}

            {compact || checkStringIsNullOrWhiteSpace(time) ? null : (
              <Paragraph>
                <ColorText
                  separatorStyle={{ padding: '0 4px 0 2px' }}
                  textPrefix={timePrefix}
                  text={time}
                />
              </Paragraph>
            )}
          </>
        ),
      };
    });

    inner = <Timeline reverse style={{ marginTop: '10px' }} items={listItem} />;
  }

  const rightComponent = (
    <FlexBox
      style={{ height: '100%' }}
      flexAuto="bottom"
      topStyle={{
        paddingBottom: '6px',
      }}
      top={showTitle ? <Alert message={`${boxTitle}：`} type="info" /> : null}
      bottom={
        showTitle ? (
          <div
            style={{
              height: '100%',
              position: 'relative',
            }}
          >
            <ScrollFacadeBox
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                paddingLeft: '6px',
                paddingRight: '6px',
                height: '100%',
                width: '100%',
                overflowY: 'auto',
              }}
            >
              {inner}
            </ScrollFacadeBox>
          </div>
        ) : (
          inner
        )
      }
    />
  );

  if (!showLeftDivider) {
    return rightComponent;
  }

  return (
    <FlexBox
      style={{ ...style, height: '100%' }}
      flexAuto="right"
      left={<Divider type="vertical" style={{ height: '100%' }} />}
      right={rightComponent}
    />
  );
}

export { FlowProcessHistory };
