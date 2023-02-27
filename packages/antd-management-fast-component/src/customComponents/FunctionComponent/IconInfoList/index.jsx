import React from 'react';

import { isArray } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { IconInfo } from '../../IconInfo';

class AmfIconInfoList extends BaseComponent {
  renderFurther() {
    const { list } = this.props;

    if (!isArray(list)) {
      return [];
    }

    if (list.length === 0) {
      return [];
    }

    const l = [];

    for (const [index, o] of list.entries()) {
      const { hidden, ...other } = {
        ...IconInfo.defaultProps,
        ...o,

        key: `icon_info_item_${index}`,
      };

      if (!hidden) {
        l.push({
          ...other,
        });
      }
    }

    if (l.length <= 0) {
      return [];
    }

    return l.map((o) => {
      const { key, ...other } = o;

      return <IconInfo key={key} {...other} />;
    });
  }
}

AmfIconInfoList.defaultProps = {
  list: [],
};

export { AmfIconInfoList };
