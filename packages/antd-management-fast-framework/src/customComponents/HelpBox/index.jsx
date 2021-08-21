import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Divider } from 'antd';

import { isArray, stringIsNullOrWhiteSpace, toNumber } from '../../utils/tools';

// import ColorText from '../ColorText';
import { buildDescriptionGrid } from '../FunctionComponent';

import styles from './index.less';

class HelpBox extends PureComponent {
  render() {
    const {
      title: titleValue,
      showTitle,
      showNumber,
      labelWidth: labelWidthValue,
      list: listData,
      useBackground,
    } = {
      ...{
        title: '',
        showTitle: true,
        showNumber: true,
        labelWidth: null,
        list: [],
        useBackground: false,
      },
      ...(this.props || {}),
    };

    const title = titleValue || '帮助信息';
    let list = [];

    if (isArray(listData)) {
      list = listData.map((o, index) => {
        const d = { ...{ key: '', label: '', text: '' }, ...o };

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
      >
        {showTitle ? (
          <Divider
            orientation="left"
            plain
            style={{
              marginTop: 4,
              marginBottom: 4,
              color: '#999',
            }}
          >
            {title}
          </Divider>
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
            return {
              key: o.key,
              label: stringIsNullOrWhiteSpace(o.label)
                ? showNumber
                  ? o.no
                  : '•'
                : o.label,
              value: o.text,
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
            },
            contentStyle: {
              color: '#999',
            },
            itemStyle: {
              paddingBottom: '4px',
            },
          },
        })}
      </div>
    );
  }
}

HelpBox.defaultProps = {
  title: '帮助信息',
  showTitle: true,
  showNumber: true,
  labelWidth: null,
  list: [],
  useBackground: false,
};

export default HelpBox;
