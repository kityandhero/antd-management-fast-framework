import { Avatar } from 'antd';
import React from 'react';

import { datetimeFormat, formatDatetime } from 'easy-soft-utility';

import { AnchorLink } from '../AnchorLink';

import styles from './index.less';

const ArticleListContent = ({
  data: { content, updatedAt, avatar, owner, href },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <Avatar src={avatar} size="small" />
      <AnchorLink href={href}>{owner}</AnchorLink> 发布在{' '}
      <AnchorLink href={href}>{href}</AnchorLink>
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
