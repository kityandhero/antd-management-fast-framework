import { Avatar, Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';

import styles from './index.less';

const avatarSizeToClassName = (size) =>
  classNames(styles.avatarItem, {
    [styles.avatarItemLarge]: size === 'large',
    [styles.avatarItemSmall]: size === 'small',
    [styles.avatarItemMini]: size === 'mini',
  });

const AvatarList = ({
  children,
  size,
  maxLength,
  excessItemsStyle,
  ...other
}) => {
  const numberOfChildren = React.Children.count(children);
  const numberToShow =
    maxLength >= numberOfChildren ? numberOfChildren : maxLength;

  const childrenWithProperties = React.Children.toArray(children)
    .slice(0, numberToShow)
    .map((child) =>
      React.cloneElement(child, {
        size,
      }),
    );

  if (numberToShow < numberOfChildren) {
    const cls = avatarSizeToClassName(size);

    childrenWithProperties.push(
      <li key="exceed" className={cls}>
        <Avatar size={size} style={excessItemsStyle}>{`+${
          numberOfChildren - maxLength
        }`}</Avatar>
      </li>,
    );
  }

  return (
    <div {...other} className={styles.avatarList}>
      <ul> {childrenWithProperties} </ul>
    </div>
  );
};

const Item = ({ src, size, tips, onClick = () => {} }) => {
  const cls = avatarSizeToClassName(size);

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};

AvatarList.Item = Item;

export { AvatarList };
