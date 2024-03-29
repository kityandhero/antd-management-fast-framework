import { List } from 'antd';
import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';

import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { BaseComponent } from '../../bases';
import { iconBuilder } from '../Icon';

import styles from './index.less';

class TimeLineCustom extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.currentTime = null;
    this.currentPageStart = true;

    this.state = {
      list: [],
      pagination: {},
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProperties, previousState) {
    const {
      data: { list, pagination },
    } = nextProperties;

    return { list, pagination };
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenGetSnapshotBeforeUpdate = (preProperties, preState) => {
    this.currentTime = null;
    this.currentPageStart = true;

    return null;
  };

  getCreateTimeDatePart = (v) =>
    formatDatetime({
      data: v,
      format: datetimeFormat.yearMonthDay,
    });

  getCreateTimeTimePart = (v) =>
    formatDatetime({
      data: v,
      format: datetimeFormat.hourMinute,
    });

  handleTableChange = (pageNo, pageSize) => {
    const { onChange } = this.props;

    onChange(pageNo, pageSize);
  };

  renderPresetDateLabel = (v) => {
    this.currentTime = this.currentTime || v;
    const preTime = this.currentTime || v;
    if (
      !this.currentPageStart &&
      new Date(preTime).getDay() === new Date(v).getDay()
    ) {
      return false;
    }

    this.currentPageStart = false;
    this.currentTime = v;
    return (
      <div className={`${styles.timeLabel} ${styles.listItem}`}>
        <span className={styles.backgroundRed}>
          {this.getCreateTimeDatePart(v)}
        </span>
      </div>
    );
  };

  renderPresetInfo = (item) => {
    const {
      // iconStyle: iconStyleValue,
      // getBackgroundColorKey,
      getTime,
      getTitle,
      getDescription,
      getBottomLeft,
      getBottomRight,
      getIcon,
    } = this.props;

    // const iconStyle = {
    //   ...{
    //     backgroundColor: getRandomColor({
    //       seed: getBackgroundColorKey(item),
    //     }),
    //   },
    //   ...(iconStyleValue || {}),
    // };

    return (
      <div className={styles.listItem}>
        <span className={styles.fa}>
          <div className={styles.faInner}>
            <div
              className={styles.faInnerBg}
              //  style={iconStyle}
            />
            <div className={styles.faInnerBody}>{getIcon(item)}</div>
          </div>
        </span>
        <div className={styles.timeLineExItem}>
          <span className={styles.time}>
            <ClockCircleOutlined
              style={{
                marginLeft: '20px',
                position: 'inherit',
                width: '12px',
                height: '12px',
                lineHeight: '12px',
                fontSize: '12px',
                marginRight: '2px',
              }}
            />
            {this.getCreateTimeTimePart(getTime(item))}
          </span>
          <h3 className={styles.timeLineExHeader}>{getTitle(item)}</h3>
          <div
            className={styles.timeLineExBody}
            style={{
              fontSize: '13px',
            }}
          >
            {getDescription(item)}
          </div>
          <div className={styles.timeLineExFooter}>
            <span
              style={{
                fontSize: '13px',
              }}
            >
              {getBottomLeft(item)}
            </span>
            <span
              style={{
                marginLeft: '20px',
                fontSize: '13px',
              }}
            >
              {getBottomRight(item)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { loading, getDateLabel, showPagination } = this.props;
    const { list, pagination } = this.state;

    let paginationProperties = false;

    if (showPagination) {
      paginationProperties = {
        showSizeChanger: true,
        showQuickJumper: true,
        ...pagination,
        onChange: this.handleTableChange,
      };
    }

    return (
      <div className={styles.timeLineExBox}>
        <div className={`${styles.timeLineEx} ${styles.timeLineExInverse}`}>
          <List
            loading={loading}
            itemLayout="vertical"
            size="large"
            pagination={paginationProperties}
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                style={{
                  // paddingTop: '0px',
                  // paddingBottom: '0px',
                  padding: 0,
                  borderBottom: '0px',
                }}
              >
                <div>
                  {this.renderPresetDateLabel(getDateLabel(item))}
                  {this.renderPresetInfo(item)}
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

TimeLineCustom.defaultProps = {
  showPagination: false,

  iconStyle: {},
  links: [],
  getIcon: () => {
    return iconBuilder.message();
  },
  getBackgroundColorKey: () => {
    return '';
  },
  getDateLabel: () => {
    return '';
  },
  getTime: () => {
    return '';
  },
  getTitle: () => {
    return '';
  },
  getDescription: () => {
    return '';
  },
  getBottomLeft: () => {
    return '';
  },
  getBottomRight: () => {
    return '';
  },
};

export { TimeLineCustom };
