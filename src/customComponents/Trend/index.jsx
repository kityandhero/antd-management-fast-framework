import React from 'react';
import classNames from 'classnames';

import styles from './index.less';

const Trend = ({
  colorful = true,
  reverseColor = false,
  flag,
  icon,
  children,
  className,
  ...rest
}) => {
  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className,
  );
  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && <span className={styles[flag]}>{icon}</span>}
    </div>
  );
};

export default Trend;
