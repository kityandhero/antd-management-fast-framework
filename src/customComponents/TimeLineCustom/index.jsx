import React from 'react';
import moment from 'moment';
import { List } from 'antd';
import { ClockCircleOutlined, MessageOutlined } from '@ant-design/icons';

// import { getRandomColor } from '../../utils/tools';
import CustomBase from '../../framework/CustomBase';

import styles from './index.less';

class TimeLineCustom extends CustomBase {
  constructor(props) {
    super(props);

    this.currentTime = null;
    this.currentPageStart = true;

    this.state = {
      list: [],
      pagination: {},
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      data: { list, pagination },
    } = nextProps;

    return { list, pagination };
  }

  // eslint-disable-next-line no-unused-vars
  doWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    this.currentTime = null;
    this.currentPageStart = true;

    return null;
  };

  getCreateTimeDatePart = v => moment(v).format('YYYY-MM-DD');

  getCreateTimeTimePart = v => moment(v).format('HH:mm');

  handleTableChange = (pageNo, pageSize) => {
    const { onChange } = this.props;
    onChange(pageNo, pageSize);
  };

  renderDateLabel = v => {
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

  renderInfo = item => {
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
    //     backgroundColor: getRandomColor(getBackgroundColorKey(item)),
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

    let paginationProps = false;

    if (showPagination) {
      paginationProps = {
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
            pagination={paginationProps}
            dataSource={list}
            renderItem={item => (
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
                  {this.renderDateLabel(getDateLabel(item))}
                  {this.renderInfo(item)}
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
    return <MessageOutlined />;
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

export default TimeLineCustom;
