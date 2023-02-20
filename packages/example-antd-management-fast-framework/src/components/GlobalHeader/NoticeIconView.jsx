import { Tag } from 'antd';
import groupBy from 'lodash/groupBy';
// import moment from 'moment';
import { Component } from 'react';
import { connect } from '@umijs/max';

import {
  logDebug,
  showInfoMessage,
  showSuccessMessage,
} from 'easy-soft-utility';

import NoticeIcon from '../NoticeIcon';

import styles from './index.less';

class GlobalHeaderRight extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      const type = 'global/fetchNotices';

      logDebug(`model access: ${type}`);

      dispatch({
        type,
      });
    }
  }

  changeReadState = (clickedItem) => {
    const { id } = clickedItem;
    const { dispatch } = this.props;

    if (dispatch) {
      const changeNoticeReadStateType = 'global/changeNoticeReadState';

      logDebug(`model access: ${changeNoticeReadStateType}`);

      dispatch({
        type: changeNoticeReadStateType,
        payload: id,
      });
    }
  };

  handleNoticeClear = (title, key) => {
    const { dispatch } = this.props;

    showSuccessMessage({
      message: `${'清空了'} ${title}`,
    });

    if (dispatch) {
      const clearNoticesType = 'global/clearNotices';

      logDebug(`model access: ${clearNoticesType}`);

      dispatch({
        type: clearNoticesType,
        payload: key,
      });
    }
  };

  getNoticeData = () => {
    const { notices = [] } = this.props;

    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map((notice) => {
      const newNotice = { ...notice };

      // if (newNotice.datetime) {
      //   newNotice.datetime = moment(notice.datetime).utcOffset(8).fromNow();
      // }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData) => {
    const unreadMessage = {};
    for (const key of Object.keys(noticeData)) {
      const value = noticeData[key];

      if (!unreadMessage[key]) {
        unreadMessage[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMessage[key] = value.filter((item) => !item.read).length;
      }
    }
    return unreadMessage;
  };

  render() {
    const { fetchingNotices, onNoticeVisibleChange } = this.props;
    const noticeData = this.getNoticeData();
    const unreadMessage = this.getUnreadData(noticeData);
    return (
      <NoticeIcon
        className={styles.action}
        count={0}
        onItemClick={(item) => {
          this.changeReadState(item);
        }}
        loading={fetchingNotices}
        clearText="清空"
        viewMoreText="查看更多"
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() =>
          showInfoMessage({
            message: 'Click on view more',
          })
        }
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={unreadMessage.notification}
          list={noticeData.notification}
          title="通知"
          emptyText="你已查看所有通知"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="message"
          count={unreadMessage.message}
          list={noticeData.message}
          title="消息"
          emptyText="您已读完所有消息"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="event"
          title="待办"
          emptyText="你已完成所有待办"
          count={unreadMessage.event}
          list={noticeData.event}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ currentOperator, global, loading }) => ({
  currentOperator: currentOperator.currentOperator || null,
  collapsed: global.collapsed,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
