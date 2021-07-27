import React from 'react';
import { connect, Link } from 'umi';

import { formatMessage } from '@/utils/tools';
import PageHeader from '@/components/PageHeader';
import MenuContext from '@/layouts/MenuContext';

import GridContent from './GridContent';
import styles from './index.less';

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => {
  return (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
      {top}
      <MenuContext.Consumer>
        {(value) => (
          <PageHeader
            wide={contentWidth === 'Fixed'}
            home={formatMessage({ id: 'menu.home' })}
            {...value}
            key="pageheader"
            {...restProps}
            linkElement={Link}
            itemRender={(item) => {
              if (item.locale) {
                return formatMessage({ id: item.locale });
              }
              return item.title;
            }}
          />
        )}
      </MenuContext.Consumer>
      {children ? (
        <div className={styles.content}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  );
};

export default connect(({ setting }) => ({
  contentWidth: setting.contentWidth,
}))(PageHeaderWrapper);
