import classNames from 'classnames';
import React from 'react';

import { AnchorLink } from '../AnchorLink';

import styles from './index.less';

const GlobalFooter = ({ className, links, copyright }) => {
  const clsString = classNames(styles.globalFooter, className);
  return (
    <footer className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map((link) => (
            <AnchorLink
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
              rel="noreferrer"
            >
              {link.title}
            </AnchorLink>
          ))}
        </div>
      )}
      {copyright && <div className={styles.copyright}>{copyright}</div>}
    </footer>
  );
};

export { GlobalFooter };
