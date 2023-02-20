import { message, Tag } from 'antd';
import React from 'react';
import { useModel } from '@umijs/max';

import { formatDateIntervalWithNow, groupBy } from 'easy-soft-utility';

import NoticeIcon from './NoticeIcon';

import styles from './index.less';

const getNoticeData = (notices) => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }

  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.datetime) {
      newNotice.datetime = formatDateIntervalWithNow(notice.datetime);
    }

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

const getUnreadData = (noticeData) => {
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

const NoticeIconView = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const notices = [];

  const noticeData = getNoticeData(notices);
  const unreadMessage = getUnreadData(noticeData || {});

  return (
    <NoticeIcon
      className={styles.action}
      count={currentUser && currentUser.unreadCount}
      onItemClick={(item) => {
        console.log(item);
      }}
      onClear={(title, key) => console.log({ title, key })}
      loading={false}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => message.info('Click on view more')}
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
};

export default NoticeIconView;
