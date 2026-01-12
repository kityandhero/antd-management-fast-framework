import { Divider } from 'antd';
import classNames from 'classnames';
import React, { PureComponent } from 'react';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  toNumber,
} from 'easy-soft-utility';

import { buildDescriptionGrid } from '../FunctionComponent';

import styles from './index.less';

class HelpBox extends PureComponent {
  render() {
    const {
      style,
      title: titleValue,
      titleColor,
      showTitle,
      labelColor,
      textColor,
      showDivider,
      showNumber,
      labelWidth: labelWidthValue,
      list: listData,
      useBackground,
      hidden,
    } = {
      title: '',
      showTitle: true,
      showNumber: true,
      showDivider: true,
      labelWidth: null,
      list: [],
      useBackground: false,
      hidden: false,
      ...this.props,
    };

    if (hidden) {
      return null;
    }

    const title = titleValue || '帮助信息';
    let list = [];

    if (isArray(listData)) {
      list = listData.map((o, index) => {
        const d = {
          key: '',
          label: '',
          text: '',
          span: 1,
          labelStyle: null,
          contentStyle: null,
          canCopy: false,
          copyData: null,
          ...o,
        };

        d.key = `help_box_item_${index}`;
        d.no = index + 1;
        d.text = d.text || '';

        return d;
      });
    }

    const labelWidth = toNumber(labelWidthValue ?? null);

    const labelWidthStyle = labelWidth > 0 ? `${labelWidth}px` : 0;

    const customLabelWidth = labelWidth > 0;

    return (
      <div
        className={classNames(
          styles.helpBox,
          useBackground ? styles.helpBoxBackground : styles.helpBoxNoBackground,
        )}
        style={style}
      >
        {showTitle ? (
          showDivider ? (
            <Divider
              titlePlacement="left"
              plain
              style={{
                marginTop: 4,
                marginBottom: 4,
                color: titleColor || '#999',
              }}
            >
              {title}
            </Divider>
          ) : (
            <div
              style={{
                marginTop: '4px',
                marginBottom: '4px',
                color: titleColor || '#999',
                fontWeight: 'normal',
                fontSize: '14px',
                lineHeight: '22px',
                height: '22px',
              }}
            >
              {title}:
            </div>
          )
        ) : null}

        {/* {list.map((o) => {
          return (
            <div key={o.key} className={styles.helpItem}>
              <ColorText textPrefix={showNumber ? o.no : ''} text={o.text || ''} />
            </div>
          );
        })} */}

        {buildDescriptionGrid({
          list: list.map((o) => {
            const {
              key,
              no,
              label,
              text,
              labelStyle,
              contentStyle,
              span,
              canCopy,
              copyData,
            } = o;

            return {
              key: key,
              label: checkStringIsNullOrWhiteSpace(label)
                ? showNumber
                  ? no
                  : '•'
                : label,
              value: text,
              labelStyle: labelStyle || null,
              contentStyle: contentStyle || null,
              span,
              canCopy,
              copyData,
            };
          }),
          props: {
            bordered: false,
            colon: showNumber,
            column: 1,
            labelStyle: {
              width: customLabelWidth
                ? labelWidthStyle
                : showNumber
                  ? '22px'
                  : '12px',
              color: labelColor || '#999',
            },
            contentStyle: {
              color: textColor || '#999',
            },
          },
        })}
      </div>
    );
  }
}

HelpBox.defaultProps = {
  style: null,
  title: '帮助信息',
  titleColor: '#999',
  labelColor: '#999',
  textColor: '#999',
  showTitle: true,
  showNumber: true,
  labelWidth: null,
  list: [],
  useBackground: false,
  hidden: false,
};

export { HelpBox };
