import React from 'react';

import { BaseComponent } from '../../../bases';
import { Item } from '../Item';

class ActionItem extends BaseComponent {
  renderFurther() {
    const { action, formItemLayout = {}, hidden = false } = this.props;

    return (
      <Item
        {...{ ...formItemLayout, colon: false }}
        label={<div />}
        hidden={hidden}
      >
        {action}
      </Item>
    );
  }
}

ActionItem.defaultProps = {
  action: null,
  formItemLayout: {},
  hidden: false,
};

export { ActionItem };
