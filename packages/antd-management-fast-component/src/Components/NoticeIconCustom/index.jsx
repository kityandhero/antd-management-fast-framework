import { Badge, Popover, Spin, Tabs } from 'antd';
import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { BellOutlined } from '@ant-design/icons';

import { NoticeList } from './NoticeList';

import styles from './index.less';

const { TabPane } = Tabs;

class NoticeIcon extends PureComponent {
  static Tab = TabPane;

  onItemClick = (item, tabProperties) => {
    const { onItemClick } = this.props;
    onItemClick(item, tabProperties);
  };

  onTabChange = (tabType) => {
    const { onTabChange } = this.props;
    onTabChange(tabType);
  };

  getNotificationBox() {
    const { children, loading, locale, onClear } = this.props;
    if (!children) {
      return null;
    }
    const panes = React.Children.map(children, (child) => {
      const title =
        child.props.list && child.props.list.length > 0
          ? `${child.props.title} (${child.props.list.length})`
          : child.props.title;
      return (
        <TabPane tab={title} key={child.props.name}>
          <NoticeList
            {...child.props}
            data={child.props.list}
            onClick={(item) => this.onItemClick(item, child.props)}
            onClear={() => onClear(child.props.name)}
            title={child.props.title}
            locale={locale}
          />
        </TabPane>
      );
    });
    return (
      <Spin spinning={loading}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    );
  }

  render() {
    const {
      className,
      count,
      popupAlign,
      popupVisible,
      onPopupVisibleChange,
      bell,
    } = this.props;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <BellOutlined className={styles.icon} />;
    const trigger = (
      <span className={noticeButtonClass}>
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
    const popoverProperties = {};
    if ('popupVisible' in this.props) {
      popoverProperties.visible = popupVisible;
    }
    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProperties}
      >
        {trigger}
      </Popover>
    );
  }
}

NoticeIcon.defaultProps = {
  onItemClick: () => {},
  onPopupVisibleChange: () => {},
  onTabChange: () => {},
  onClear: () => {},
  loading: false,
  locale: {
    emptyText: 'No notifications',
    clear: 'Clear',
  },
  emptyImage:
    'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};

export default NoticeIcon;
