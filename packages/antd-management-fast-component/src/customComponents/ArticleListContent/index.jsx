import { Avatar } from 'antd';
import React from 'react';

import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { Link } from '../Link';

import styles from './index.less';

const ArticleListContent = ({
  data: { content, updatedAt, avatar, owner, href },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <Link href={href}>{owner}</Link> 发布在 <Link href={href}>{href}</Link>
      <em>
        {formatDatetime({
          data: updatedAt,
          format: datetimeFormat.yearMonthDayHourMinute,
        })}
      </em>
    </div>
  </div>
);

export { ArticleListContent };
