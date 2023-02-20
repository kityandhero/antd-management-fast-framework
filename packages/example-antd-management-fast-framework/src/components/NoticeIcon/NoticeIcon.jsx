import { Badge, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React from 'react';
import { BellOutlined } from '@ant-design/icons';

import HeaderDropdown from '../HeaderDropdown';

import NoticeList from './NoticeList';

import styles from './index.less';

const { TabPane } = Tabs;

const NoticeIcon = (properties) => {
  const getNotificationBox = () => {
    const {
      children,
      loading,
      onClear,
      onTabChange,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText,
    } = properties;
    if (!children) {
      return null;
    }
    const panes = [];
    React.Children.forEach(children, (child) => {
      if (!child) {
        return;
      }
      const { list, title, count, tabKey, showClear, showViewMore } =
        child.props;
      const length_ = list && list.length > 0 ? list.length : 0;
      const messageCount = count || count === 0 ? count : length_;
      const tabTitle = messageCount > 0 ? `${title} (${messageCount})` : title;
      panes.push(
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            clearText={clearText}
            viewMoreText={viewMoreText}
            list={list}
            tabKey={tabKey}
            onClear={() => onClear && onClear(title, tabKey)}
            onClick={(item) => onItemClick && onItemClick(item, child.props)}
            onViewMore={(event) => onViewMore && onViewMore(child.props, event)}
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>,
      );
    });
    return (
      <>
        <Spin spinning={loading} delay={300}>
          <Tabs className={styles.tabs} onChange={onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </>
    );
  };

  const { className, count, bell, popupVisible, onPopupVisibleChange } =
    properties;

  const [visible, setVisible] = useMergedState(false, {
    value: popupVisible,
    onChange: onPopupVisibleChange,
  });
  const noticeButtonClass = classNames(className, styles.noticeButton);
  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
  const trigger = (
    <span className={classNames(noticeButtonClass, { opened: visible })}>
      <Badge
        count={count}
        style={{ boxShadow: 'none' }}
        className={styles.badge}
      >
        {NoticeBellIcon}
      </Badge>
    </span>
  );
  if (!notificationBox) {
    return trigger;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={styles.popover}
      trigger={['click']}
      open={visible}
      onVisibleChange={setVisible}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.defaultProps = {
  emptyImage:
    'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
