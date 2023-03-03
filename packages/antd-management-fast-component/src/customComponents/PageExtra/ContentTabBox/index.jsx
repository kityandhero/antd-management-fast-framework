import { Tabs } from 'antd';
import React from 'react';

import { isArray } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';

import styles from './index.less';

class ContentTabBox extends BaseComponent {
  renderFurther() {
    const { list, extraContent, onTabChange } = this.props;

    const listAdjust = isArray(list) ? list : [];

    const config =
      listAdjust.length > 0
        ? {
            // destroyInactiveTabPane: true,
            type: 'card',
            size: 'small',
            tabBarStyle: {
              marginBottom: 0,
              backgroundColor: '#fff',
              paddingTop: '16px',
              paddingLeft: '24px',
              paddingRight: '24px',
            },
            tabBarGutter: 3,
            animated: {
              inkBar: true,
              tabPane: true,
            },
            // activeKey: this.getTabActiveKey(),
            tabBarExtraContent: extraContent,
            items: listAdjust.map((o) => {
              return {
                // style: {
                //   padding: '24px',
                // },
                ...o,
              };
            }),
            onChange: onTabChange,
          }
        : {
            tabBarStyle: {
              marginBottom: 0,
            },
          };

    return (
      <div className={styles.contentTabBox}>
        <Tabs {...config} />
      </div>
    );
  }
}

ContentTabBox.defaultProps = {
  list: [],
  extraContent: null,
  onTabChange: null,
};

export { ContentTabBox };
