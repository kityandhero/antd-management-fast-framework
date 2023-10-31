import { Alert, Divider, Empty, Timeline, Typography } from 'antd';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
} from 'easy-soft-utility';

import { ColorText, FlexBox } from 'antd-management-fast-component';

const { Paragraph } = Typography;
function FlowProcessHistory(properties) {
  const { style, list, listItemConvert, nextData, nextDataConvert } =
    properties;

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

  return (
    <FlexBox
      style={{ ...style, height: '100%' }}
      flexAuto="right"
      left={<Divider type="vertical" style={{ height: '100%' }} />}
      right={
        <FlexBox
          style={{ height: '100%' }}
          flexAuto="bottom"
          topStyle={{
            paddingBottom: '6px',
          }}
          top={<Alert message="审批进度：" type="info" />}
          bottom={
            <div
              style={{
                height: '100%',

                position: 'relative',
              }}
            >
              <div
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
              </div>
            </div>
          }
        />
      }
    />
  );
}

FlowProcessHistory.defaultProps = {
  style: {},
  canEdit: true,
  list: [],
  listItemConvert: null,
  nextData: null,
  nextDataConvert: null,
};

export { FlowProcessHistory };
