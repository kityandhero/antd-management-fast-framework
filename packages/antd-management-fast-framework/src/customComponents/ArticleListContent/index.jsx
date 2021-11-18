import React from 'react';
import moment from 'moment';
import { Avatar } from 'antd';

import { datetimeFormat } from '../../utils/constants';

import styles from './index.less';

const ArticleListContent = ({
  data: { content, updatedAt, avatar, owner, href },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
      <em>
        {moment(updatedAt)
          .utcOffset(8)
          .format(datetimeFormat.yearMonthDayHourMinute)}
      </em>
    </div>
  </div>
);

export default ArticleListContent;
