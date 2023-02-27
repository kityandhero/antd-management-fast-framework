import React from 'react';

import { isArray, logExecute } from 'easy-soft-utility';

import { BaseComponent } from '../../BaseComponent';
import { AmfColumnItem } from '../ColumnItem';

class AmfColumnList extends BaseComponent {
  renderFurther() {
    logExecute('renderFurther', 'AmfColumnList');

    const { columnList, attachedTargetName } = this.props;

    const list = [];

    for (const o of isArray(columnList) ? columnList : []) {
      const c = (
        <AmfColumnItem
          columnConfig={o}
          attachedTargetName={attachedTargetName}
        />
      );

      if ((c || null) != null) {
        const { hidden } = {
          hidden: false,
          ...c,
        };

        if (!hidden) {
          list.push(c);
        }
      }
    }

    return list;
  }
}

AmfColumnList.defaultProps = {
  columnList: [],
  attachedTargetName: '',
};

export { AmfColumnList };
